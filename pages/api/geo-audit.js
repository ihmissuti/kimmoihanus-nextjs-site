/**
 * Public GEO Audit API
 * Provides AI search visibility audits via a simple public endpoint.
 *
 * Usage:
 *   POST /api/geo-audit
 *   Body: { "url": "https://example.com" }
 *
 * Optional: Pass API key for higher rate limits
 *   Header: Authorization: Bearer <api_key>
 *
 * This endpoint is designed to be called by:
 * - Cursor skills (kimmo-geo-audit)
 * - MCP servers (@kimmoihanus/geo-tools)
 * - Direct API calls
 */

import { performGeneralAudit, extractSchemas, extractSemanticStructure } from '@/lib/llmAuditCore';
import * as cheerio from 'cheerio';

// Rate limiting (simple in-memory, use Redis in production)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute for anonymous

function checkRateLimit(ip, hasApiKey) {
  const limit = hasApiKey ? 30 : RATE_LIMIT_MAX;
  const now = Date.now();
  const key = `${ip}:${hasApiKey ? 'auth' : 'anon'}`;

  const record = rateLimits.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + RATE_LIMIT_WINDOW;
  }

  if (record.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }

  record.count++;
  rateLimits.set(key, record);
  return { allowed: true };
}

async function fetchPage(url) {
  // Try direct fetch first (works for most sites)
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KimmoGEOBot/1.0; +https://kimmoihanus.com/tools)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (res.ok) {
      return await res.text();
    }
  } catch (e) {
    console.error('[geo-audit] Direct fetch failed:', e.message);
  }

  // If OXYLABS credentials are available, use them
  const oxyUsername = process.env.OXYLABS_WEB_UNBLOCKER_USERNAME || process.env.OXYLABS_USERNAME;
  const oxyPassword = process.env.OXYLABS_WEB_UNBLOCKER_PASSWORD || process.env.OXYLABS_PASSWORD;

  if (oxyUsername && oxyPassword) {
    try {
      const { HttpsProxyAgent } = await import('https-proxy-agent');
      const agent = new HttpsProxyAgent(`https://${oxyUsername}:${oxyPassword}@unblock.oxylabs.io:60000`);

      const originalTLS = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

      try {
        const res = await fetch(url, {
          agent,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        });

        if (res.ok) {
          return await res.text();
        }
      } finally {
        if (originalTLS !== undefined) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalTLS;
        } else {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        }
      }
    } catch (e) {
      console.error('[geo-audit] Oxylabs fetch failed:', e.message);
    }
  }

  throw new Error('Failed to fetch page');
}

export default async function handler(req, res) {
  // CORS headers for public API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const hasApiKey = req.headers.authorization?.startsWith('Bearer ');

  const rateCheck = checkRateLimit(ip, hasApiKey);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: rateCheck.retryAfter,
    });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Fetch the page
    const html = await fetchPage(url);

    // Run comprehensive audit using llmAuditCore
    const auditResult = await performGeneralAudit(url, html);

    return res.status(200).json({
      success: true,
      ...auditResult,
      _meta: {
        version: '1.1.0',
        timestamp: new Date().toISOString(),
        aiPowered: !!process.env.GEMINI_API_KEY,
        by: 'Kimmo Ihanus - kimmoihanus.com/tools',
      },
    });
  } catch (error) {
    console.error('[geo-audit] Error:', error);
    return res.status(500).json({
      error: 'Failed to analyze URL',
      message: error.message,
    });
  }
}

/**
 * Public Schema Optimizer API
 * Generates optimized Schema.org JSON-LD based on page content.
 *
 * Usage:
 *   POST /api/schema-optimize
 *   Body: { "url": "https://example.com" }
 *
 * Returns existing schemas and optimized suggestions.
 */

import { extractSchemas, performSchemaAudit } from '@/lib/llmAuditCore';
import * as cheerio from 'cheerio';

// Rate limiting
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ip, hasApiKey) {
  const limit = hasApiKey ? 20 : RATE_LIMIT_MAX;
  const now = Date.now();
  const key = `${ip}:schema:${hasApiKey ? 'auth' : 'anon'}`;

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

function generateSchemaTemplates(pageData, pageType, existingTypes) {
  const templates = [];
  const domain = new URL(pageData.url).hostname;

  // Organization template
  if (!existingTypes.includes('Organization') && !existingTypes.includes('LocalBusiness')) {
    templates.push({
      type: 'Organization',
      priority: 'high',
      reason: 'Every site should have Organization schema for brand identity',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: pageData.ogSiteName || '[Company Name]',
          url: `https://${domain}`,
          logo: pageData.ogImage || `https://${domain}/logo.png`,
          description: pageData.description || '[Company description]',
          sameAs: [
            'https://github.com/[org]',
            'https://twitter.com/[handle]',
            'https://linkedin.com/company/[company]',
          ],
        },
        null,
        2
      ),
    });
  }

  // Article template
  if (pageType === 'article' && !existingTypes.includes('Article') && !existingTypes.includes('BlogPosting')) {
    templates.push({
      type: 'Article',
      priority: 'high',
      reason: 'Blog/article pages should have Article schema for rich results',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: pageData.ogTitle || pageData.h1 || pageData.title,
          description: pageData.ogDescription || pageData.description,
          image: pageData.ogImage,
          author: {
            '@type': 'Person',
            name: '[Author Name]',
          },
          publisher: {
            '@type': 'Organization',
            name: pageData.ogSiteName || '[Publisher]',
          },
        },
        null,
        2
      ),
    });
  }

  // SoftwareApplication template
  if (
    (pageType === 'product' || pageType === 'homepage') &&
    !existingTypes.includes('Product') &&
    !existingTypes.includes('SoftwareApplication')
  ) {
    templates.push({
      type: 'SoftwareApplication',
      priority: 'medium',
      reason: 'Product/devtool pages benefit from SoftwareApplication schema',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: pageData.ogTitle || pageData.h1 || pageData.title,
          description: pageData.ogDescription || pageData.description,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Cross-platform',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available',
          },
        },
        null,
        2
      ),
    });
  }

  // FAQPage template
  if (!existingTypes.includes('FAQPage')) {
    templates.push({
      type: 'FAQPage',
      priority: 'high',
      reason: 'FAQ content helps LLMs find answers to common questions',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '[Common question from your content]',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '[Answer to the question]',
              },
            },
          ],
        },
        null,
        2
      ),
    });
  }

  // HowTo template
  if (pageType === 'documentation' && !existingTypes.includes('HowTo')) {
    templates.push({
      type: 'HowTo',
      priority: 'medium',
      reason: 'Documentation pages benefit from HowTo schema for step visibility',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: pageData.h1 || pageData.title,
          description: pageData.description,
          step: [
            { '@type': 'HowToStep', name: 'Step 1', text: '[Extract from content]' },
            { '@type': 'HowToStep', name: 'Step 2', text: '[Extract from content]' },
          ],
        },
        null,
        2
      ),
    });
  }

  // WebSite template for homepage
  if (pageType === 'homepage' && !existingTypes.includes('WebSite')) {
    templates.push({
      type: 'WebSite',
      priority: 'medium',
      reason: 'Homepage should have WebSite schema',
      jsonLd: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: pageData.ogSiteName || pageData.title,
          url: `https://${domain}`,
        },
        null,
        2
      ),
    });
  }

  return templates;
}

async function fetchPage(url) {
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
    throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    throw new Error(`Failed to fetch: ${e.message}`);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const html = await fetchPage(url);

    // Use llmAuditCore for schema analysis
    const schemaAudit = await performSchemaAudit(url, html);

    // Generate templates based on audit
    const templates = generateSchemaTemplates(schemaAudit.pageData, schemaAudit.pageType, schemaAudit.existingTypes);

    // Build optimized combined schema
    const optimizedGraph = [...schemaAudit.existingSchemas];

    // Add high-priority recommendations as templates
    const highPriorityTemplates = templates.filter((t) => t.priority === 'high');

    const optimizedJsonLd = {
      '@context': 'https://schema.org',
      '@graph': optimizedGraph,
    };

    return res.status(200).json({
      success: true,
      url,
      pageType: schemaAudit.pageType,
      existing: {
        count: schemaAudit.existingSchemas.length,
        types: schemaAudit.existingTypes,
        schemas: schemaAudit.existingSchemas,
        jsonLd: schemaAudit.existingJsonLd,
      },
      qualityScore: schemaAudit.qualityScore,
      recommendations: schemaAudit.recommendations,
      templates,
      optimized: {
        jsonLd: JSON.stringify(optimizedJsonLd, null, 2),
        implementation: `<script type="application/ld+json">\n${JSON.stringify(optimizedJsonLd, null, 2)}\n</script>`,
      },
      _meta: {
        version: '1.1.0',
        timestamp: new Date().toISOString(),
        validationUrl: 'https://validator.schema.org/',
        by: 'Kimmo Ihanus - kimmoihanus.com/tools',
      },
    });
  } catch (error) {
    console.error('[schema-optimize] Error:', error);
    return res.status(500).json({
      error: 'Failed to analyze URL',
      message: error.message,
    });
  }
}

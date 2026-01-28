/**
 * LLM Audit Core Logic
 * Adapted from Superlines' llmAuditCore for public GEO tools.
 *
 * Provides comprehensive AI search visibility audits using:
 * - Gemini API for AI-powered analysis
 * - Cheerio for HTML parsing
 * - Robust schema extraction (JSON-LD, Microdata, Next.js)
 */

import * as cheerio from 'cheerio';

/* -------------------------------------------------------------------------- */
/*                              CONFIGURATION                                  */
/* -------------------------------------------------------------------------- */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = 'gemini-2.0-flash';

/* -------------------------------------------------------------------------- */
/*                            HTML PROCESSING                                  */
/* -------------------------------------------------------------------------- */

/**
 * Extract clean content-only HTML for content analysis
 */
function extractContentOnlyHtml(html) {
  try {
    const $ = cheerio.load(html);

    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('template').remove();
    $('iframe').remove();
    $('svg').remove();
    $('canvas').remove();
    $('link').remove();
    $('meta').remove();
    $('head').remove();

    $('*').each((_, el) => {
      const $el = $(el);
      const attrs = Object.keys(el.attribs || {});
      attrs.forEach((attr) => {
        if (attr.startsWith('data-') || attr === 'id' || attr === 'class') {
          $el.removeAttr(attr);
        }
      });
    });

    const body = $('body');
    const cleanHtml = body.length ? body.html() || '' : $.html();
    const withoutComments = cleanHtml.replace(/<!--[\s\S]*?-->/g, '');
    return withoutComments.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  } catch (error) {
    console.error('[extractContentOnlyHtml] Error:', error);
    return html;
  }
}

/**
 * Remove schema scripts for technical audit
 */
function removeSchemaScripts(html) {
  try {
    const $ = cheerio.load(html);
    $('script[type="application/ld+json"]').remove();
    $('style').remove();
    $('[style]').removeAttr('style');
    $('noscript').remove();
    return $.html();
  } catch (error) {
    return html;
  }
}

/* -------------------------------------------------------------------------- */
/*                           SCHEMA EXTRACTION                                 */
/* -------------------------------------------------------------------------- */

/**
 * Clean JSON-LD string to handle parsing issues
 */
function cleanJsonLd(raw) {
  let result = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];
    if (escaped) {
      result += char;
      escaped = false;
      continue;
    }
    if (char === '\\') {
      result += char;
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      result += char;
      continue;
    }
    if (inString) {
      const code = char.charCodeAt(0);
      if (code === 10) result += '\\n';
      else if (code === 13) result += '\\r';
      else if (code === 9) result += '\\t';
      else if (code < 32) result += `\\u${code.toString(16).padStart(4, '0')}`;
      else result += char;
    } else {
      const code = char.charCodeAt(0);
      if (code >= 32 || code === 10 || code === 13 || code === 9) result += char;
    }
  }
  return result;
}

/**
 * Flatten schema @graph into individual nodes
 */
function flattenSchema(schema) {
  const results = [];
  if (!schema || typeof schema !== 'object') return results;

  if (Array.isArray(schema['@graph'])) {
    for (const node of schema['@graph']) {
      results.push(...flattenSchema(node));
    }
  } else if (schema['@type']) {
    results.push(schema);
  } else if (Array.isArray(schema)) {
    for (const item of schema) {
      results.push(...flattenSchema(item));
    }
  }
  return results;
}

/**
 * Extract Schema.org type from itemtype URL
 */
function getSchemaType(itemType) {
  const match = itemType.match(/schema\.org\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Extract Microdata node as JSON-LD
 */
function extractMicrodataNode($, $el, itemType) {
  const schema = {};
  const schemaType = getSchemaType(itemType);
  if (!schemaType) return null;

  schema['@type'] = schemaType;

  $el.find('[itemprop]').each((_, propEl) => {
    const $prop = $(propEl);
    const parentItemscope = $prop.closest('[itemscope]');
    if (!parentItemscope.is($el)) return;

    const propName = $prop.attr('itemprop');
    if (!propName) return;

    let value;
    if ($prop.attr('itemscope') !== undefined) {
      value = extractMicrodataNode($, $prop, $prop.attr('itemtype') || '');
    } else {
      const tagName = ($prop.prop('tagName') || '').toLowerCase();
      if (tagName === 'meta') value = $prop.attr('content');
      else if (tagName === 'a' || tagName === 'link') value = $prop.attr('href');
      else if (tagName === 'img') value = $prop.attr('src');
      else if (tagName === 'time') value = $prop.attr('datetime') || $prop.text().trim();
      else value = $prop.text().trim();
    }

    if (value === undefined || value === null || value === '') return;

    if (schema[propName] !== undefined) {
      if (!Array.isArray(schema[propName])) schema[propName] = [schema[propName]];
      schema[propName].push(value);
    } else {
      schema[propName] = value;
    }
  });

  // FAQPage special handling
  if (schemaType === 'FAQPage') {
    const mainEntity = [];
    $el.find('[itemtype*="Question"]').each((_, qEl) => {
      const $q = $(qEl);
      const question = { '@type': 'Question' };

      const $name = $q.find('[itemprop="name"]').first();
      if ($name.length) question.name = $name.text().trim();

      const $answerScope = $q.find('[itemtype*="Answer"]').first();
      if ($answerScope.length) {
        const $answerText = $answerScope.find('[itemprop="text"]').first();
        question.acceptedAnswer = {
          '@type': 'Answer',
          text: $answerText.length ? $answerText.text().trim() : $answerScope.text().trim(),
        };
      }

      if (question.name && question.acceptedAnswer) mainEntity.push(question);
    });
    if (mainEntity.length > 0) schema.mainEntity = mainEntity;
  }

  // BreadcrumbList special handling
  if (schemaType === 'BreadcrumbList') {
    const itemListElement = [];
    $el.find('[itemtype*="ListItem"]').each((_, liEl) => {
      const $li = $(liEl);
      const listItem = { '@type': 'ListItem' };

      const $position = $li.find('[itemprop="position"]').first();
      if ($position.length) listItem.position = parseInt($position.attr('content') || $position.text().trim(), 10);

      const $name = $li.find('[itemprop="name"]').first();
      if ($name.length) listItem.name = $name.text().trim();

      const $item = $li.find('[itemprop="item"]').first();
      if ($item.length) listItem.item = $item.attr('href') || $item.text().trim();

      if (listItem.position !== undefined || listItem.name || listItem.item) {
        itemListElement.push(listItem);
      }
    });
    if (itemListElement.length > 0) schema.itemListElement = itemListElement;
  }

  return schema;
}

/**
 * Extract Microdata schemas from HTML
 */
function extractMicrodataSchemas($) {
  const schemas = [];

  $('[itemscope][itemtype]').each((_, el) => {
    const $el = $(el);
    const itemType = $el.attr('itemtype');
    if ($el.parents('[itemscope]').length > 0) return;

    const schema = extractMicrodataNode($, $el, itemType || '');
    if (schema && schema['@type']) {
      schemas.push(schema);
    }
  });

  return schemas;
}

/**
 * Comprehensive schema extraction - JSON-LD, Microdata, Next.js
 */
export function extractSchemas(html) {
  const out = [];
  const seenJsonStrings = new Set();

  const addNode = (node, source) => {
    const jsonStr = JSON.stringify(node);
    if (!seenJsonStrings.has(jsonStr)) {
      seenJsonStrings.add(jsonStr);
      out.push(node);
    }
  };

  let $ = null;
  try {
    $ = cheerio.load(html);

    // JSON-LD extraction
    const selectors = [
      'script[type="application/ld+json"]',
      "script[type='application/ld+json']",
      'script[type*="ld+json"]',
    ];

    for (const selector of selectors) {
      $(selector).each((_, el) => {
        const raw = $(el).text();
        if (!raw || raw.trim().length === 0) return;

        try {
          let json;
          try {
            json = JSON.parse(raw);
          } catch {
            json = JSON.parse(cleanJsonLd(raw));
          }

          for (const node of flattenSchema(json)) {
            addNode(node, 'JSON-LD');
          }
        } catch {}
      });
    }

    // Microdata extraction
    try {
      const microdataSchemas = extractMicrodataSchemas($);
      for (const schema of microdataSchemas) {
        addNode(schema, 'Microdata');
      }
    } catch {}

    // Next.js __NEXT_DATA__ extraction
    const nextDataScript = $('#__NEXT_DATA__');
    if (nextDataScript.length > 0) {
      try {
        const nextDataRaw = nextDataScript.text();
        if (nextDataRaw) {
          const nextData = JSON.parse(nextDataRaw);

          const findSchemas = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            if (Array.isArray(obj)) {
              obj.forEach((item, i) => findSchemas(item, `${path}[${i}]`));
              return;
            }

            if (obj['@type'] && (obj['@context'] || obj.name || obj.url || obj.mainEntity)) {
              for (const node of flattenSchema(obj)) {
                addNode(node, 'NextData');
              }
              return;
            }

            for (const key of Object.keys(obj)) {
              if (['schema', 'jsonLd', 'ldJson', 'structuredData', 'seo', 'head'].includes(key.toLowerCase())) {
                findSchemas(obj[key], `${path}.${key}`);
              } else if (key === 'pageProps' || key === 'props') {
                findSchemas(obj[key], `${path}.${key}`);
              }
            }
          };

          findSchemas(nextData);
        }
      } catch {}
    }
  } catch {}

  // Regex fallback
  try {
    const regex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let match;

    while ((match = regex.exec(html)) !== null) {
      const rawJson = match[1];
      if (!rawJson || rawJson.trim().length === 0) continue;

      try {
        let json;
        try {
          json = JSON.parse(rawJson);
        } catch {
          json = JSON.parse(cleanJsonLd(rawJson));
        }

        for (const node of flattenSchema(json)) {
          addNode(node, 'Regex');
        }
      } catch {}
    }
  } catch {}

  return out;
}

/* -------------------------------------------------------------------------- */
/*                            SEMANTIC STRUCTURE                               */
/* -------------------------------------------------------------------------- */

export function extractSemanticStructure($) {
  const structure = {
    semanticElements: {
      header: $('header').length,
      nav: $('nav').length,
      main: $('main').length,
      article: $('article').length,
      section: $('section').length,
      aside: $('aside').length,
      footer: $('footer').length,
    },
    headingStructure: {
      h1: $('h1').length,
      h2: $('h2').length,
      h3: $('h3').length,
      h4: $('h4').length,
      h5: $('h5').length,
      h6: $('h6').length,
    },
    contentElements: {
      paragraphs: $('p').length,
      lists: $('ul, ol').length,
      tables: $('table').length,
      figures: $('figure').length,
      images: $('img').length,
      codeBlocks: $('pre code').length,
    },
    accessibilityElements: {
      imagesWithAlt: $('img[alt]').length,
      imagesWithoutAlt: $('img:not([alt])').length,
      ariaLabels: $('[aria-label]').length,
      landmarks: $('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]').length,
    },
  };

  // Extract heading hierarchy
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const $el = $(el);
    headings.push({
      level: el.name || 'unknown',
      text: $el.text().trim().substring(0, 100),
    });
  });

  return {
    ...structure,
    headingHierarchy: headings.slice(0, 20),
    hasSemanticHTML5:
      structure.semanticElements.main > 0 ||
      structure.semanticElements.article > 0 ||
      structure.semanticElements.section > 0,
  };
}

/* -------------------------------------------------------------------------- */
/*                              GEMINI API                                     */
/* -------------------------------------------------------------------------- */

async function callGemini(prompt, systemInstruction, options = {}) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const url = `${GEMINI_ENDPOINT}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: options.temperature || 0.2,
      maxOutputTokens: options.maxTokens || 2000,
      ...(options.responseSchema && {
        responseMimeType: 'application/json',
        responseSchema: options.responseSchema,
      }),
    },
  };

  if (systemInstruction) {
    body.systemInstruction = { role: 'system', parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/* -------------------------------------------------------------------------- */
/*                              AUDIT PROMPTS                                  */
/* -------------------------------------------------------------------------- */

const SYSTEM_TECHNICAL = `You are an expert in AI Search technical optimization.
Current date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RULES:
- Analyze HTML structure, metadata, heading structure, accessibility, and technical SEO
- IGNORE JSON-LD schemas (analyzed separately)
- Use ONLY provided data
- Output structured markdown`;

const SYSTEM_CONTENT = `You are an expert in AI-optimized content strategy.
Current date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RULES:
- Analyze only content structure and quality
- No technical elements
- Score 0-100 based on AI search best practices
- Be specific with examples`;

const SYSTEM_SCHEMA = `You are a Schema.org structured data expert.
Current date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

RULES:
- Extract REAL data from HTML only
- No placeholders or dummy data
- Enrich existing schemas, don't replace
- Every node needs 3+ real properties
- Return valid JSON-LD`;

const OUTPUT_STRUCTURE = `
Provide your analysis in this structure:

## Strengths
- List positive aspects found

## Weaknesses  
- List issues and gaps

## Recommendations
- Provide specific, actionable improvements

## Score
**IMPORTANT**: Provide a numeric score from 0-100:
Score: [number]`;

/* -------------------------------------------------------------------------- */
/*                              SCORE EXTRACTION                               */
/* -------------------------------------------------------------------------- */

function extractScore(text, context = 'unknown') {
  const patterns = [/Score:\s*(\d+)/i, /Score\s*[:\-]\s*(\d+)/i, /(\d+)\s*\/\s*100/, /(\d+)\s*out of\s*100/i];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const score = parseInt(match[1]);
      if (score >= 0 && score <= 100) {
        return score;
      }
    }
  }

  console.warn(`[extractScore:${context}] No valid score found, using fallback`);
  return 50;
}

/* -------------------------------------------------------------------------- */
/*                            AUDIT FUNCTIONS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Technical audit - HTML structure, metadata, headings
 */
export async function performTechnicalAudit(url, rawHtml) {
  const $ = cheerio.load(rawHtml);
  const semantic = extractSemanticStructure($);
  const schemas = extractSchemas(rawHtml);

  // Basic technical data (always available)
  const technicalData = {
    url,
    isHttps: url.startsWith('https://'),
    title: $('title').text() || null,
    metaDescription: $('meta[name="description"]').attr('content') || null,
    h1Count: $('h1').length,
    h1Text: $('h1').first().text().trim() || null,
    hasCanonical: $('link[rel="canonical"]').length > 0,
    canonical: $('link[rel="canonical"]').attr('href') || null,
    codeBlockCount: $('pre code').length,
    wordCount: $('body').text().split(/\s+/).filter(Boolean).length,
    ogTitle: $('meta[property="og:title"]').attr('content') || null,
    ogDescription: $('meta[property="og:description"]').attr('content') || null,
    ogImage: $('meta[property="og:image"]').attr('content') || null,
    semantic,
    schemaCount: schemas.length,
    schemaTypes: [...new Set(schemas.map((s) => s['@type']))],
  };

  // If Gemini is available, get AI analysis
  let aiAnalysis = '';
  let score = 50;

  if (GEMINI_API_KEY) {
    try {
      const htmlForAnalysis = removeSchemaScripts(rawHtml).substring(0, 80000);

      const prompt = `Technical audit for: ${url}

HTML (schemas removed, first 80k chars):
\`\`\`html
${htmlForAnalysis}
\`\`\`

${OUTPUT_STRUCTURE}`;

      aiAnalysis = await callGemini(prompt, SYSTEM_TECHNICAL, {
        temperature: 0.1,
        maxTokens: 2500,
      });
      score = extractScore(aiAnalysis, 'technical');
    } catch (error) {
      console.error('[performTechnicalAudit] Gemini error:', error.message);
    }
  }

  // Rule-based scoring fallback
  if (!aiAnalysis) {
    score = 0;
    if (technicalData.isHttps) score += 15;
    if (technicalData.h1Count === 1) score += 15;
    if (technicalData.metaDescription) score += 10;
    if (technicalData.hasCanonical) score += 5;
    if (semantic.hasSemanticHTML5) score += 15;
    if (technicalData.schemaCount > 0) score += 20;
    if (technicalData.codeBlockCount > 0) score += 10;
    if (technicalData.wordCount > 500) score += 10;
  }

  return {
    technical: technicalData,
    analysis: aiAnalysis,
    score,
    schemas,
  };
}

/**
 * Content audit - content quality analysis
 */
export async function performContentAudit(url, rawHtml) {
  let analysis = '';
  let score = 50;

  if (GEMINI_API_KEY) {
    try {
      const contentHtml = extractContentOnlyHtml(rawHtml).substring(0, 100000);

      const prompt = `Content audit for: ${url}

Content HTML (cleaned):
\`\`\`html
${contentHtml}
\`\`\`

${OUTPUT_STRUCTURE}`;

      analysis = await callGemini(prompt, SYSTEM_CONTENT, {
        temperature: 0.2,
        maxTokens: 2000,
      });
      score = extractScore(analysis, 'content');
    } catch (error) {
      console.error('[performContentAudit] Gemini error:', error.message);
    }
  }

  return { analysis, score };
}

/**
 * Schema audit - extraction and optimization suggestions
 */
export async function performSchemaAudit(url, rawHtml) {
  const existingSchemas = extractSchemas(rawHtml);
  const $ = cheerio.load(rawHtml);

  // Extract page data for schema generation
  const pageData = {
    url,
    title: $('title').text().trim() || null,
    description: $('meta[name="description"]').attr('content') || null,
    ogTitle: $('meta[property="og:title"]').attr('content') || null,
    ogDescription: $('meta[property="og:description"]').attr('content') || null,
    ogImage: $('meta[property="og:image"]').attr('content') || null,
    ogSiteName: $('meta[property="og:site_name"]').attr('content') || null,
    h1: $('h1').first().text().trim() || null,
  };

  // Detect page type
  const urlLower = url.toLowerCase();
  let pageType = 'general';
  if (urlLower.includes('/blog') || urlLower.includes('/post')) pageType = 'article';
  else if (urlLower.includes('/product')) pageType = 'product';
  else if (urlLower.includes('/doc') || urlLower.includes('/guide')) pageType = 'documentation';
  else if (urlLower.includes('/about')) pageType = 'about';
  else if (urlLower.includes('/pricing')) pageType = 'pricing';
  else if (urlLower === '/' || urlLower.endsWith('.com') || urlLower.endsWith('.com/')) pageType = 'homepage';

  // Build recommendations
  const existingTypes = existingSchemas.map((s) => s['@type']);
  const recommendations = [];

  if (!existingTypes.includes('Organization') && !existingTypes.includes('LocalBusiness')) {
    recommendations.push({
      type: 'Organization',
      priority: 'high',
      reason: 'Every site should have Organization schema',
    });
  }

  if (!existingTypes.includes('FAQPage') && $('*:contains("?")').length > 5) {
    recommendations.push({
      type: 'FAQPage',
      priority: 'high',
      reason: 'FAQ content detected - add FAQPage schema for AI visibility',
    });
  }

  if (pageType === 'article' && !existingTypes.includes('Article') && !existingTypes.includes('BlogPosting')) {
    recommendations.push({
      type: 'Article',
      priority: 'high',
      reason: 'Blog/article pages should have Article schema',
    });
  }

  if (pageType === 'documentation' && !existingTypes.includes('HowTo') && !existingTypes.includes('TechArticle')) {
    recommendations.push({
      type: 'HowTo',
      priority: 'medium',
      reason: 'Documentation benefits from HowTo schema',
    });
  }

  // Calculate quality score
  let qualityScore = 0;
  if (existingSchemas.length > 0) qualityScore += 30;
  if (existingTypes.includes('Organization')) qualityScore += 20;
  if (existingTypes.includes('FAQPage')) qualityScore += 20;
  if (existingTypes.some((t) => ['Article', 'Product', 'SoftwareApplication'].includes(t))) qualityScore += 15;
  if (recommendations.length === 0) qualityScore += 15;

  return {
    existingSchemas,
    existingTypes,
    pageType,
    pageData,
    recommendations,
    qualityScore,
    existingJsonLd:
      existingSchemas.length > 0
        ? JSON.stringify(
            {
              '@context': 'https://schema.org',
              '@graph': existingSchemas,
            },
            null,
            2
          )
        : null,
  };
}

/**
 * General audit - combines all three audits
 */
export async function performGeneralAudit(url, rawHtml) {
  // Run audits in parallel where possible
  const [technical, content, schema] = await Promise.all([
    performTechnicalAudit(url, rawHtml),
    performContentAudit(url, rawHtml),
    performSchemaAudit(url, rawHtml),
  ]);

  // Calculate overall score
  const technicalWeight = 0.35;
  const contentWeight = 0.35;
  const schemaWeight = 0.3;

  const overallScore = Math.round(
    technical.score * technicalWeight + content.score * contentWeight + schema.qualityScore * schemaWeight
  );

  // Build recommendations list
  const allRecommendations = [];

  // Technical recommendations
  if (!technical.technical.metaDescription) {
    allRecommendations.push({
      priority: 'medium',
      category: 'technical',
      issue: 'Missing meta description',
      action: 'Add a clear meta description',
    });
  }
  if (technical.technical.h1Count !== 1) {
    allRecommendations.push({
      priority: 'medium',
      category: 'technical',
      issue: technical.technical.h1Count === 0 ? 'No H1 tag' : 'Multiple H1 tags',
      action: 'Ensure exactly one H1 tag per page',
    });
  }

  // Schema recommendations
  for (const rec of schema.recommendations) {
    allRecommendations.push({
      priority: rec.priority,
      category: 'schema',
      issue: `Missing ${rec.type} schema`,
      action: rec.reason,
    });
  }

  return {
    url,
    overallScore,
    grade:
      overallScore >= 85 ? 'A' : overallScore >= 70 ? 'B' : overallScore >= 55 ? 'C' : overallScore >= 40 ? 'D' : 'F',
    technical: {
      score: technical.score,
      data: technical.technical,
      analysis: technical.analysis,
    },
    content: {
      score: content.score,
      analysis: content.analysis,
    },
    schema: {
      score: schema.qualityScore,
      existingCount: schema.existingSchemas.length,
      existingTypes: schema.existingTypes,
      recommendations: schema.recommendations,
      existingJsonLd: schema.existingJsonLd,
    },
    recommendations: allRecommendations,
    summary: {
      strengths: [
        technical.technical.isHttps && 'HTTPS enabled',
        technical.technical.h1Count === 1 && 'Proper H1 structure',
        technical.technical.schemaCount > 0 && `${technical.technical.schemaCount} schema(s) found`,
        technical.technical.semantic?.hasSemanticHTML5 && 'Semantic HTML5',
        technical.technical.codeBlockCount > 0 && `${technical.technical.codeBlockCount} code examples`,
      ].filter(Boolean),
      gaps: allRecommendations.filter((r) => r.priority === 'high').map((r) => r.issue),
    },
  };
}

/**
 * AI-based comprehensive scoring (requires Gemini)
 */
export async function evaluateAISearchScore(input) {
  if (!GEMINI_API_KEY) {
    return { score: 50, reasoning: 'AI scoring unavailable - using rule-based score' };
  }

  try {
    const prompt = `Evaluate this webpage's AI Search optimization (0-100).

URL: ${input.url}

Technical Score: ${input.technicalScore}/100
Content Score: ${input.contentScore}/100
Schema Score: ${input.schemaScore}/100

Schemas found: ${input.schemaTypes?.join(', ') || 'None'}
Has semantic HTML5: ${input.hasSemanticHTML5}
Code examples: ${input.codeBlockCount}
Word count: ${input.wordCount}

Provide a fair, rigorous overall score where:
- 0-40: Poor AI visibility
- 40-60: Basic implementation  
- 60-75: Good optimization
- 75-85: Very good
- 85-100: Excellent to exceptional

Return JSON: { "score": 75, "reasoning": "explanation" }`;

    const response = await callGemini(prompt, null, {
      temperature: 0.3,
      maxTokens: 300,
      responseSchema: {
        type: 'object',
        properties: {
          score: { type: 'number' },
          reasoning: { type: 'string' },
        },
        required: ['score', 'reasoning'],
      },
    });

    const parsed = JSON.parse(response);
    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      reasoning: parsed.reasoning || 'No reasoning provided',
    };
  } catch (error) {
    console.error('[evaluateAISearchScore] Error:', error.message);
    return { score: 50, reasoning: 'AI scoring failed - using default' };
  }
}

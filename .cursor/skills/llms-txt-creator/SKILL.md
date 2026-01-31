---
name: llms-txt-creator
description: Create and maintain llms.txt files for AI crawlers following the official specification. Use when setting up AI-friendly documentation indexes, creating machine-readable content maps, or helping websites become more discoverable by LLMs like ChatGPT, Perplexity, and Gemini.
---

# llms.txt Creator

Create standardized llms.txt files that help AI systems discover, understand, and cite your content accurately, following the official llms.txt specification from llmstxt.org.

## What is llms.txt?

The llms.txt file is a standardized markdown document hosted at a website's root path (e.g., `https://example.com/llms.txt`). It serves as a curated index for LLMs, providing:

- Concise summaries of the site's purpose
- Critical contextual details about the brand/product
- Prioritized links to machine-readable resources

Think of it as the third layer next to existing standards:

| File          | Purpose                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| `robots.txt`  | Explains what crawlers may access                                           |
| `sitemap.xml` | Lists URLs for indexing                                                     |
| `llms.txt`    | Tells LLMs which content is most important and where to find clean versions |

## Why llms.txt Matters

- AI context windows are too small to handle most websites in their entirety
- Converting complex HTML pages into LLM-friendly text is difficult
- llms.txt provides curated, expert-level information in a single location
- Particularly important for development environments where LLMs need quick access to documentation

## Official Format Specification

The llms.txt file follows a specific markdown format (from llmstxt.org):

```markdown
# [Project/Company Name]

> [One-sentence description - blockquote with key information]

[Optional paragraphs with more detailed information]

## [Section Name]

- [Link title](https://url): Optional description

## Optional

- [Link title](https://url): Secondary resources that can be skipped
```

### Required Elements

1. **H1 header** - The name of the project or site (only required element)
2. **Blockquote** - Short summary with key information
3. **File lists** - Markdown lists with hyperlinks under H2 headers

### Section Types

| Section      | Purpose                 | Example Content                      |
| ------------ | ----------------------- | ------------------------------------ |
| **Docs**     | Technical documentation | API references, tutorials            |
| **Product**  | Product information     | Features, pricing                    |
| **Policies** | Terms and conditions    | Privacy, returns, SLAs               |
| **Support**  | Help resources          | FAQs, troubleshooting                |
| **Optional** | Secondary content       | Can be skipped if context is limited |

The "Optional" section has special meaning: URLs provided there can be skipped if a shorter context is needed.

## Creating llms.txt Step-by-Step

### Step 1: Audit High-Value Content

Identify the pages that matter most for AI-driven questions:

**Ask:** "If someone asked an AI about this topic, which pages should it read first?"

**Priority content:**

- Core documentation and API references
- Pricing, plans, and usage rules
- Policies (returns, SLAs, compliance)
- Critical onboarding or integration guides
- Key product/feature pages

### Step 2: Create Clean Markdown Versions

llms.txt works best when linking to content that is:

- Free of navigation clutter and cookie banners
- Structured with headings, code blocks, and short paragraphs
- Focused on a single topic or task

**Recommended approach:**
For each priority page, create a `.md` version at the same path:

- `/docs/api` → `/docs/api.md`
- `/pricing` → `/pricing.md`

### Step 3: Write the llms.txt File

```markdown
# [Brand Name]

> [Clear one-sentence description of what you do]

Key terms: [important concepts, product names, technologies]

## Docs

- [Getting Started](https://example.com/docs/quickstart.md): Quick setup guide
- [API Reference](https://example.com/docs/api.md): Complete API documentation

## Product

- [Features](https://example.com/features.md): Platform capabilities
- [Pricing](https://example.com/pricing.md): Current pricing tiers

## Support

- [FAQ](https://example.com/faq.md): Common questions answered
- [Troubleshooting](https://example.com/troubleshooting.md): Issue resolution

## Optional

- [Blog](https://example.com/blog.md): Industry insights
- [Changelog](https://example.com/changelog.md): Product updates
```

### Step 4: Deploy and Test

1. Upload file to domain root: `https://yourdomain.com/llms.txt`
2. Verify accessibility in browser
3. Test by asking AI assistants about your product

## Complete Examples

### SaaS Company Example

```markdown
# Acme Analytics

> Acme Analytics is a business intelligence platform that helps companies track, visualize, and act on their data in real-time.

Key terms: BI, business intelligence, data visualization, dashboards, real-time analytics, data connectors, SQL queries.

## Documentation

- [Getting Started](https://acme.com/docs/quickstart.md): Set up your first dashboard in 5 minutes
- [API Reference](https://acme.com/docs/api.md): Complete REST API documentation with authentication
- [Data Connectors](https://acme.com/docs/connectors.md): Supported integrations and setup guides
- [SQL Reference](https://acme.com/docs/sql.md): Custom query syntax and examples

## Product

- [Features](https://acme.com/features.md): Platform capabilities and use cases
- [Pricing](https://acme.com/pricing.md): Current pricing tiers and features
- [Integrations](https://acme.com/integrations.md): Available connectors and partners

## Support

- [FAQ](https://acme.com/faq.md): Frequently asked questions
- [Troubleshooting](https://acme.com/troubleshooting.md): Common issues and solutions
- [Status](https://status.acme.com): System status and uptime

## Optional

- [Blog](https://acme.com/blog.md): Industry insights and tutorials
- [Changelog](https://acme.com/changelog.md): Product updates and release notes
- [Case Studies](https://acme.com/cases.md): Customer success stories
```

### E-Commerce Company Example

```markdown
# Nordic Outdoor

> Nordic Outdoor is a sustainable outdoor gear retailer specializing in hiking, camping, and winter sports equipment from Scandinavian brands.

Key terms: outdoor gear, hiking equipment, camping gear, sustainable outdoor, Scandinavian design, winter sports.

## Products

- [Hiking Gear](https://nordicoutdoor.com/hiking.md): Backpacks, boots, trekking poles
- [Camping Equipment](https://nordicoutdoor.com/camping.md): Tents, sleeping bags, cookware
- [Winter Sports](https://nordicoutdoor.com/winter.md): Skis, snowboards, cold weather gear

## Customer Support

- [Shipping Info](https://nordicoutdoor.com/shipping.md): Delivery times and costs by region
- [Returns Policy](https://nordicoutdoor.com/returns.md): 60-day return window and process
- [Size Guide](https://nordicoutdoor.com/sizing.md): Measurement guides for all product types
- [FAQ](https://nordicoutdoor.com/faq.md): Common questions answered

## Sustainability

- [Our Commitment](https://nordicoutdoor.com/sustainability.md): Environmental initiatives and goals
- [Repair Service](https://nordicoutdoor.com/repair.md): Product repair and recycling programs

## Optional

- [Brand Stories](https://nordicoutdoor.com/brands.md): Partner brand backgrounds
- [Gear Guides](https://nordicoutdoor.com/guides.md): How to choose equipment
```

### Documentation Site Example

```markdown
# FastAPI Framework

> FastAPI is a modern, fast web framework for building APIs with Python based on standard Python type hints.

Key terms: Python, API, REST, async, type hints, Pydantic, OpenAPI, Swagger, JSON Schema.

Important notes:

- FastAPI is built on Starlette and Pydantic
- Requires Python 3.8+
- Async-first but supports sync operations

## Getting Started

- [Tutorial](https://fastapi.tiangolo.com/tutorial/index.html.md): Step-by-step guide to building your first API
- [Installation](https://fastapi.tiangolo.com/tutorial/installation.html.md): Setup and requirements

## Core Concepts

- [Path Parameters](https://fastapi.tiangolo.com/tutorial/path-params.html.md): URL path variables
- [Query Parameters](https://fastapi.tiangolo.com/tutorial/query-params.html.md): URL query string handling
- [Request Body](https://fastapi.tiangolo.com/tutorial/body.html.md): JSON request parsing with Pydantic
- [Response Model](https://fastapi.tiangolo.com/tutorial/response-model.html.md): Response serialization

## Advanced

- [Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies.html.md): Dependency injection system
- [Security](https://fastapi.tiangolo.com/tutorial/security.html.md): Authentication and authorization
- [Background Tasks](https://fastapi.tiangolo.com/tutorial/background-tasks.html.md): Async task processing

## Optional

- [Deployment](https://fastapi.tiangolo.com/deployment.html.md): Production deployment guides
- [Alternatives](https://fastapi.tiangolo.com/alternatives.html.md): Comparison with other frameworks
```

## Writing Effective Descriptions

Each link should have a brief description (10-20 words) explaining:

- What the page contains
- When/why an AI should reference it

**Good descriptions:**

```markdown
- [API Reference](url.md): Complete REST API documentation with authentication and rate limits
- [Pricing](url.md): Current pricing tiers, features included, and enterprise options
- [Returns Policy](url.md): 60-day return window, exceptions, and refund process
```

**Poor descriptions:**

```markdown
- [API Reference](url.md): API docs
- [Pricing](url.md): Pricing information
- [Returns](url.md): Return stuff
```

## Best Practices

### Do:

1. **Keep it curated, not comprehensive** - Only include your most important pages
2. **Update when docs change** - Stale llms.txt reduces trust
3. **Use consistent terminology** - Match terms used in your actual content
4. **Test with LLMs** - Ask AI assistants about your product and check if responses improve
5. **Link to clean markdown** - Avoid linking to pages heavy with JavaScript/navigation

### Don't:

1. **List every page** - This defeats the purpose of curation
2. **Link to noisy HTML** - Full of layout code, ads, and navigation
3. **Forget to update** - When documentation changes, update llms.txt
4. **Use vague descriptions** - They don't help AI understand content purpose
5. **Include login-required pages** - AI can't access authenticated content

## Companion Files

### llms-full.txt

Some sites create an expanded version with full content:

```markdown
# Project Name

> Description

## Section

<document>
[Full content of linked document embedded here]
</document>
```

This is useful for providing complete context without requiring additional requests.

### Markdown page versions

Create `.md` versions of key pages at the same URL with `.md` appended:

- `/docs/api` → `/docs/api.md`
- `/pricing` → `/pricing.md`

## Validation Checklist

After creating llms.txt, verify:

- [ ] File is accessible at `https://yourdomain.com/llms.txt`
- [ ] H1 header contains brand/company name
- [ ] Blockquote provides clear one-sentence description
- [ ] Key terms include important concepts and product names
- [ ] All linked URLs are valid and return 200
- [ ] Linked content is clean, structured markdown
- [ ] Optional section exists for secondary content
- [ ] Descriptions are concise but informative (10-20 words)
- [ ] File is valid markdown (no syntax errors)
- [ ] No authentication-required pages included

## Testing Your llms.txt

After deployment, test effectiveness:

1. **Direct verification**: Visit `https://yourdomain.com/llms.txt` in browser
2. **AI testing**: Ask AI assistants questions about your product
3. **Monitor changes**: Track if AI responses improve over time
4. **Competitor comparison**: Check if competitors have llms.txt files

## Integration with Other Standards

llms.txt complements existing web standards:

| Standard    | Relationship                                                         |
| ----------- | -------------------------------------------------------------------- |
| robots.txt  | llms.txt provides content guidance; robots.txt provides access rules |
| sitemap.xml | sitemap lists all pages; llms.txt curates the most important ones    |
| Schema.org  | Schema describes page content; llms.txt links to documentation       |

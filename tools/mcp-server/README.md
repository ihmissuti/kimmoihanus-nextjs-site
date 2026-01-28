# @kimmoihanus/geo-tools

MCP server for Generative Engine Optimization (GEO) - AI search visibility tools.

Connect Claude Desktop, Cursor, or any MCP-compatible client to audit websites for AI visibility, generate optimized schemas, and evaluate devtools for the agent era.

[Quick Start](#quick-start) • [Available Tools](#available-tools) • [About GEO](#about-geo)

## What is this?

GEO (Generative Engine Optimization) is the practice of optimizing content and technical infrastructure so AI systems like ChatGPT, Perplexity, and Claude can find, understand, and recommend your products.

This MCP server provides tools to:

- 📊 **Audit webpages** for AI search visibility
- 🏷️ **Generate schemas** optimized for LLM understanding
- 🔧 **Score devtools** for AI agent compatibility
- 📋 **Get recommendations** to improve AI visibility

## Quick Start

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "geo-tools": {
      "command": "npx",
      "args": ["-y", "@kimmoihanus/geo-tools"]
    }
  }
}
```

Restart Claude Desktop and look for the hammer icon (🔨).

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "geo-tools": {
      "command": "npx",
      "args": ["-y", "@kimmoihanus/geo-tools"]
    }
  }
}
```

### Global Installation

```bash
npm install -g @kimmoihanus/geo-tools
```

Then configure:

```json
{
  "mcpServers": {
    "geo-tools": {
      "command": "kimmo-geo-tools"
    }
  }
}
```

## Available Tools

### `webpage_geo_audit`

Audit a webpage for AI search visibility. Analyzes schema markup, content structure, and technical factors.

```
Audit https://example.com for AI visibility
```

Returns:

- Overall GEO score (0-100)
- Grade (A-F)
- Strengths and gaps analysis
- Technical factors (schema, headings, code blocks, etc.)

### `generate_schema`

Generate optimized Schema.org markup for AI visibility.

```
Generate organization schema for my company "Acme Inc" at https://acme.com
```

Supported types:

- `organization` - Company/brand schema
- `software` - SoftwareApplication for devtools
- `person` - Personal brand schema
- `faq` - FAQPage for common questions
- `howto` - HowTo for tutorials/guides

### `agent_friendly_score`

Evaluate a developer tool for AI agent compatibility.

```
Score Resend for agent-friendliness
```

Evaluates:

- SDK & API design (30 pts)
- Documentation quality (25 pts)
- Training data presence (20 pts)
- MCP integration (15 pts)
- Time to working (10 pts)

### `geo_recommendations`

Get prioritized recommendations based on an audit.

```
Give me GEO recommendations based on the audit results
```

Returns actionable improvements sorted by impact.

## Example Queries

### Full GEO Audit Flow

```
1. Audit https://myproduct.com for AI visibility

2. Generate organization and software schemas for my product

3. What are the top 3 things I should fix to improve my AI search presence?
```

### DevTool Evaluation

```
Compare the agent-friendliness of Resend vs SendGrid
```

### Schema Generation

```
Generate FAQ schema for these questions:
- How do I get started?
- What's the pricing?
- How does authentication work?
```

## About GEO

GEO is bigger than "SEO for ChatGPT." It's about understanding that AI assistants now make infrastructure decisions for developers.

When a developer asks Cursor to "add email functionality," the AI:

1. Picks the service
2. Writes the integration
3. Runs the install command

The tools that AI can understand and work with get recommended. The tools it can't work with become invisible.

**The new funnel:**

- ~~Marketing → Landing → Docs → Trial → Conversion~~
- Problem → AI suggestion → `npm install` → Subscription

Learn more:

- [The new developer funnel](https://kimmoihanus.com/posts/007-generative-engine-optimization-boring-services)
- [The MCP leaderboard](https://kimmoihanus.com/posts/009-mcp-leaderboard-how-dev-tools-stack-up-for-ai-agents)

## Author

**Kimmo Ihanus**

- Website: [kimmoihanus.com](https://kimmoihanus.com)
- GitHub: [@kimmoihanus](https://github.com/kimmoihanus)
- Twitter: [@kimmoihanus](https://twitter.com/kimmoihanus)

## License

MIT

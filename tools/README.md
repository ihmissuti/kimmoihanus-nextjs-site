# Kimmo's GEO Tools

A collection of tools, MCP servers, and Cursor skills for Generative Engine Optimization (GEO).

## What's Here

### 📁 `/skills` - Cursor Skills

Markdown-based skills that teach AI assistants my methodologies. Copy to `~/.cursor/skills/` or `.cursor/skills/` in your project.

| Skill                        | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `kimmo-geo-audit`            | Audit websites for AI search visibility       |
| `kimmo-schema-optimizer`     | Generate Schema.org markup for LLM visibility |
| `kimmo-agent-friendly-score` | Score devtools for AI agent compatibility     |

**Installation:**

```bash
# Personal (available in all projects)
cp -r skills/* ~/.cursor/skills/

# Project (shared with team)
cp -r skills/* .cursor/skills/
```

### 📦 `/mcp-server` - MCP Server

An npm package that provides GEO tools via the Model Context Protocol.

```bash
npm install -g @ihmissuti/geo-tools
```

**Tools included:**

- `webpage_geo_audit` - Audit pages for AI visibility
- `generate_schema` - Create optimized Schema.org markup
- `agent_friendly_score` - Evaluate devtools for agents
- `geo_recommendations` - Get prioritized improvements

See [mcp-server/README.md](mcp-server/README.md) for setup instructions.

## The Philosophy

85% of developers now use AI tools regularly. When an AI assistant recommends a tool, that tool wins distribution no marketing budget can buy.

**The new funnel:**

```
Traditional: Marketing → Landing → Docs → Trial → Conversion
Agent:       Problem → AI suggestion → npm install → Subscription
```

These tools help you understand and optimize for this new reality.

### What Makes Something "Agent-Friendly"?

1. **SDK-first design** - Documentation leads with working code
2. **Training data presence** - Tool appears in GitHub, Stack Overflow, blogs
3. **MCP integration** - AI can interact directly with your service
4. **Parseable documentation** - Clear headings, code blocks, consistent format
5. **Quick time-to-working** - Install to "it works" in under 5 minutes

## Related Writing

- [The new developer funnel: AI picks, you subscribe](https://kimmoihanus.com/posts/007-generative-engine-optimization-boring-services)
- [The MCP leaderboard: How dev tools stack up for AI agents](https://kimmoihanus.com/posts/009-mcp-leaderboard-how-dev-tools-stack-up-for-ai-agents)

## Author

**Kimmo Ihanus**

- [kimmoihanus.com](https://kimmoihanus.com)
- [@ihmissuti](https://github.com/ihmissuti) on GitHub
- [@kimmoihanus](https://twitter.com/kimmoihanus) on Twitter

## License

MIT

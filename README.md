# Kimmo Ihanus

Personal website and blog built with Next.js. Features blog posts, project showcases, and graphics gallery.

**Live site:** [kimmoihanus.com](https://kimmoihanus.com)

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
/
├── components/     # React components
├── css/           # Tailwind CSS and custom styles
├── graphics/      # Graphics markdown content
├── lib/           # Utility functions and hooks
├── pages/         # Next.js pages and API routes
├── posts/         # Blog post markdown files
├── prose/         # Static prose content (about, intro)
├── public/        # Static assets and images
├── tools/         # GEO tools and MCP server
└── .cursor/skills/ # Cursor AI skills
```

## Tools

The `/tools` directory contains Generative Engine Optimization (GEO) tools.

### Cursor Skills (`/tools/skills`)

Markdown-based skills that teach AI assistants GEO methodologies:

| Skill                        | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `kimmo-geo-audit`            | Audit websites for AI search visibility       |
| `kimmo-schema-optimizer`     | Generate Schema.org markup for LLM visibility |
| `kimmo-agent-friendly-score` | Score devtools for AI agent compatibility     |

### MCP Server (`/tools/mcp-server`)

An npm package providing GEO tools via Model Context Protocol:

```bash
npm install -g @ihmissuti/geo-tools
```

See [tools/README.md](tools/README.md) for full documentation.

## Cursor Skills

The `.cursor/skills` directory contains project-specific AI skills:

| Skill         | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `create-post` | Create new blog posts with proper structure                 |
| `geo-content` | Write AI Search optimized articles using GEO best practices |
| `nextjs-dev`  | Next.js development conventions for this project            |

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Generate sitemap
npm run postbuild
```

## Author

**Kimmo Ihanus**

- [kimmoihanus.com](https://kimmoihanus.com)
- [@ihmissuti](https://github.com/ihmissuti) on GitHub

---
title: 'The GEO opportunity: why boring services are the next big disruption'
date: 2026-01-21
---

## Resend is boring. It's also one of the most exciting products in tech right now.

Here's a number that caught my attention: Resend just hit [1.4 million weekly npm downloads](https://resend.com/blog/1-million-users), closing in on market leader SendGrid's 1.65 million. That's a 7.4x growth in a single year.

Resend sends emails. That's it. Boring, right?

The data hints at why. Looking at AI search analytics from [Superlines](https://www.superlines.io), an interesting pattern emerges: while SendGrid still leads in raw AI visibility (5.6% share of voice vs Resend's 1.5%), Resend shows a striking difference in sentiment. Roughly 89% of Resend mentions are positive recommendations, compared to around 20% for SendGrid.

It's a narrow dataset, but the signal is worth considering: AI assistants may not just be mentioning tools—they could be actively favoring the ones with cleaner developer experience.

## The developer behavior

According to the [JetBrains Developer Ecosystem Survey 2025](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/), 85% of developers now regularly use AI tools for coding, and 62% rely on at least one AI coding assistant or agent. The [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai) shows that 51% of professional developers use AI tools daily.

These tools don't just help write code—they make infrastructure decisions. When a developer asks Cursor or Claude to "add email functionality," the AI picks the service, writes the integration, and often runs the install command.

Changes in the traditional funnel:

**Traditional:** Marketing → Landing page → Docs → Trial → Evaluation → Conversion

**Agent funnel:** Problem → AI suggestion → `npm install` → Subscription

## GEO is bigger than content optimization

We've been talking about GEO (Generative Engine Optimization) as if it's just "SEO for ChatGPT"—optimizing content so that AI systems cite and recommend your products.

That's part of it. But it misses the bigger picture.

GEO expands to a whole new level when businesses start to consider the infrastructure layer where AI operates to find and process information.

In ecommerce the battle will happen over visibility, discovery, schemas, UCP protocols, and agentic shopping. There are many steps before a purchase, and each one is an optimization opportunity.

But in devtools? The battle is already won or lost at the moment of code generation.

## AI-native builders

[Lovable went from $0 to $100 million ARR](https://lovable.dev/blog/agent) in just eight months. [Bolt.new generated over 1 million websites](https://www.netlify.com/press/bolt-netlify-1-million-ai-generated-websites/) in five months.

These platforms are creating a new class of builders—people who can ship products without traditional programming skills. They're building time trackers, dating apps, productivity tools, and MVPs of all kinds.

And every single one of these projects needs the boring stuff: email, authentication, payments, database, logging, error tracking, tunnels for local development.

If an AI assistant defaults to your solution across millions of projects being built, you've won distribution that no marketing budget can buy.

## MCP changes everything

The [Model Context Protocol (MCP)](https://www.thoughtworks.com/insights/blog/generative-ai/model-context-protocol-mcp-impact-2025) has been called one of the key stories of 2025. It's an open standard that lets AI systems connect directly to external applications—and it's reshaping how tools get discovered and used.

There are now tens of thousands of MCP servers available, curated on directories like [MCP.so](https://mcp.so). Resend has one. Mailgun has one. The tools that don't? They're invisible to agents.

This creates a new competitive dynamic. The [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar) notes that MCP "brought agentic AI into the mainstream much faster than the industry may have expected."

When Cursor or Claude can directly interact with your service through an MCP server, you're not just in the conversation—you're in the workflow.

## What makes a service "agent-friendly"?

Looking at what's working, patterns emerge:

**1. SDK-first design.** Documentation leads with working code, not feature lists. APIs are consistent and predictable. Type definitions are complete.

**2. Training data presence.** The tool appears in GitHub repos, Stack Overflow answers, and technical blogs that are in LLM training data. This creates a self-reinforcing cycle.

**3. MCP integration.** A working MCP server that lets AI assistants interact directly with the service.

**4. Parseable documentation.** Not just well-written docs—docs structured in ways that AI can extract and act on. Clear headings, code blocks, consistent formatting.

**5. Quick time-to-working.** From install to "it works" in under 5 minutes. No complex onboarding flows.

## How leading companies can and should defend themselves

If you're an established player, you're not helpless. But you need to act strategically:

- **Restructure documentation for AI consumption.** Your docs were written for humans browsing. Rewrite them for AI parsing.

- **Open your data to LLM crawlers.** Don't hide tutorials and integration guides behind logins.

- **Invest in support channels that generate training data.** Public Discord servers, Stack Overflow engagement, GitHub discussions—these become training data. Private support tickets don't.

- **Build official MCP servers.** If AI assistants can't interact with your service, you don't exist in the agent workflow.

## The opportunity in boring

Every "boring" infrastructure service is now up for grabs:

- **Email:** Resend vs SendGrid
- **Auth:** Clerk vs Auth0
- **Tunnels:** ngrok vs alternatives
- **Payments:** Stripe (already dominant)
- **Database:** Supabase, PlanetScale, Neon
- **Error tracking:** Sentry vs newcomers
- **Logging:** The next disruption?
  etc.

I'd pick a category where incumbents have complex SDKs, confusing docs, or legacy architectures. Build the cleanest possible developer experience. Ship an MCP server. Be the answer when an AI assistant is asked "what should I use for X?"

## Join the party!

Pick a "boring" service in your domain. Now ask: How would an AI agent evaluate this vs competitors?

That's your GEO strategy.

I bet that the companies that understand this will have higher chances of winning in the near future. The companies that don't will wonder why their market share is disappearing despite having "better features.

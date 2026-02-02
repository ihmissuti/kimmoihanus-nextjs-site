---
title: 'Google Calendar as an LLM orchestrator'
date: 2026-02-02
---

## Marketing runs on unsexy tasks. I built the unsexy solution.

Most of marketing is invisible grunt work.

SEO & GEO reports. Competitor monitoring. Content performance checks. Citation tracking. Weekly analytics summaries.

Most of this is not creative or always strategic. But it still takes time even with all the new fancy LLM toys.

AI assistants help. I use Claude etc. constantly. But here's the friction: every time I need to run a recurring analysis task, I have to remember to do it, open the chat, re-explain the context, and wait for results. The cognitive overhead adds up.

There are many productivity tools available. Then Clawdbot. OpenClaw. Various "agentic" schedulers. You can spin up a complex solution with Cursor. But they all require learning a new interface, setting up workflows, and maintaining yet another system. For basic recurring tasks, it feels like overkill.

So I built something simple.

## What if the calendar was the interface?

Calendars are already where I schedule everything. Meetings. Deadlines. Reminders. What if the calendar could also schedule AI tasks?

The idea: create a Google Calendar event with `[AGENT]` in the title. Write the task in the description. At the scheduled time, an agent picks it up, executes it with Claude and MCP tools (SEO, GEO, search, marketing data etc.), and writes the results back into the event notes.

That's it. No new interface. No complex workflow builder. Just calendar events that happen to be intelligent.

![Google Calendar with AI agent events - scheduling automated tasks](/blog/images/calendar-ma.png)

## How it works

The architecture is deliberately simple:

**1. Tag events for processing**

Any event containing `[AGENT]` triggers the bot:

```
Title: [AGENT] Weekly GEO Report
Description: Analyze our website's AI search visibility this week.
Compare with previous weeks and identify trends.
```

**2. Bot polls the calendar**

A Python daemon checks for upcoming `[AGENT]` events. When it finds one in the processing window, it extracts the prompt from the title and description.

**3. Claude executes with MCP tools**

The agent has access to real tools:

- **Web scraping** (Oxylabs, Bright Data)
- **Search** (Google SERP via Oxylabs)
- **Analytics** (Superlines for AI search visibility, DataForSEO for keyword research)
- **Documentation** (Context7 for API lookups)

It's not just answering questions—it's actually doing research.

**4. Results saved back to the event**

The agent's response gets appended to the calendar event description with a timestamp:

```
---
📝 Agent Notes (2026-02-02 09:00):
AI Search Visibility Report for week of Jan 27-Feb 2:

Brand visibility increased 12% week-over-week...
[full analysis follows]
```

**5. Recurring events have memory**

For recurring events (weekly reports, daily checks), the agent retrieves previous notes and uses them as context. It builds on past work instead of starting fresh.

## The MCP stack that makes it useful

The agent isn't just a ChatGPT wrapper. It has actual tools:

| Category     | Tools                | What it does                                          |
| ------------ | -------------------- | ----------------------------------------------------- |
| Web Scraping | Oxylabs, Bright Data | Scrape any URL, bypass bot detection                  |
| Search       | Oxylabs AI Search    | Google results with optional content extraction       |
| AI Analytics | Superlines           | Track brand visibility in ChatGPT, Perplexity, Claude |
| SEO          | DataForSEO           | SERP analysis, keyword research                       |
| Docs         | Context7             | Look up library documentation                         |

When I ask it to "analyze our competitor's pricing page," it actually fetches and parses the page. When I ask for keyword research, it queries real SEO APIs.

## Tasks I now schedule instead of doing manually

Here's what's running on my calendar right now:

**Daily (8:00 AM):**

- `[AGENT] AEO News Digest` — searches for trending articles, Reddit discussions, and news about AI Search Optimization, Answer Engine Optimization, and GEO from the past 24 hours. Picks one relevant source and summarizes it.

**Daily (14:00):**

- `[AGENT] Competitor Monitoring` — scrapes product updates, new features, and launches from competitors in the AI Search Visibility space (Profound, Searchable, Semrush, Ahrefs, Peec AI, etc.)
- `[AGENT] Sales Lead Generation` — picks a random brand from our AI search data, analyzes their visibility insights, scrapes their website, and drafts personalized outreach (email + LinkedIn versions)

**Weekly (Monday 9:00 AM):**

- `[AGENT] Citation Gap Analysis` — finds prompts where we're cited, identifies the top competing URL dominating that query, scrapes it to understand why it ranks, then suggests improvements to our own content based on GEO best practices
- `[AGENT] Newsletter Draft` — scrapes our latest published article and transforms it into a newsletter format

**Weekly (Wednesday 10:00 AM):**

- `[AGENT] GEO Article Generation` — searches trending discussions about AEO/GEO on Reddit and forums, identifies a topic we should cover, pulls internal data from our analytics, scrapes external sources for supporting insights, and drafts a full article matching our existing style

The results sit in my calendar. I can review them during my morning routine. No extra dashboard. No context switching.

## Why not just use [existing tool]?

Valid question. Here's my reasoning:

**ChatGPT/Claude directly:** Great for interactive work. Terrible for recurring automation. I don't want to remember to run the same prompt every Monday.

**Zapier/Make.com:** Good for basic automations. But orchestrating multi-step AI tasks with tool calls gets complex fast. And expensive.

**Dedicated agent platforms:** Most are designed for building complex workflows. I don't need complex. I need "run this analysis on Tuesday."

**Custom cron jobs:** No interface. Hard to manage. When something breaks, I won't notice.

The calendar solves the interface problem. Everyone knows how to create, move, and manage calendar events. It's the simplest possible scheduling UI that already exists.

## The code is embarrassingly simple

The entire implementation is:

- `main.py` — Event loop that polls calendar and orchestrates processing
- `calendar_client.py` — Google Calendar API wrapper
- `agent.py` — Claude agent with MCP tool definitions
- `storage.py` — SQLite for persisting notes and memory
- `api_clients.py` — Direct API fallbacks when MCP isn't available

It runs on a $5/month server. Or locally with a cron job. Or in Docker on Fly.io.

The Google Calendar API handles authentication, recurring event management, and synchronization across devices. I didn't have to build any of that.

## What I learned

**1. The interface matters more than the capability.**

The Claude API could already do everything this bot does. What was missing wasn't capability—it was a zero-friction way to schedule recurring tasks. The calendar is that interface.

**2. Memory for recurring events is the killer feature.**

Weekly reports that build on previous weeks. Competitor monitoring that tracks changes over time. The agent knowing what it found last time changes it from "answering a question" to "doing a job."

**3. Tool access changes everything.**

An agent that can only answer questions is limited. An agent that can scrape websites, query SEO APIs, and fetch real-time data is actually useful for work.

**4. Boring tools win.**

No complex DAGs. No visual workflow builders. No orchestration layers. Just calendar events that trigger tasks. It's not exciting. But it works, and I actually use it.

## The unsexy future

There's a gap between "AI can do amazing things" and "AI is doing amazing things for me every day."

The gap isn't intelligence. It's integration. How does the AI know what to do? How does it remember context? How does it fit into existing workflows?

For me, the answer turned out to be the most boring tool imaginable: the calendar.

I'm not claiming this is the future of AI orchestration. It's probably too simple for complex workflows. But for the boring, recurring, "I just need this to happen every week" tasks?

It's working.

---

**Discussion questions:**

1. What recurring tasks would you automate if the scheduling interface was trivial?
2. Is "calendar as orchestrator" genuinely useful or just a quirky hack?
3. What's the minimum viable memory an AI agent needs for recurring tasks?

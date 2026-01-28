#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import * as cheerio from "cheerio";

// Tool input schemas
const WebpageAuditSchema = z.object({
  url: z.string().url().describe("URL of the webpage to audit for AI visibility"),
});

const SchemaGeneratorSchema = z.object({
  type: z.enum(["organization", "software", "person", "faq", "howto"]).describe("Type of schema to generate"),
  data: z.record(z.any()).describe("Data to populate the schema (name, description, url, etc.)"),
});

const AgentFriendlyScoreSchema = z.object({
  tool_name: z.string().describe("Name of the devtool to evaluate"),
  tool_url: z.string().url().describe("URL of the devtool"),
  check_mcp: z.boolean().default(true).describe("Whether to check for MCP server"),
  check_npm: z.boolean().default(true).describe("Whether to check npm presence"),
});

const CompetitorAnalysisSchema = z.object({
  domain: z.string().describe("Your domain to analyze"),
  competitors: z.array(z.string()).describe("List of competitor domains"),
  category: z.string().describe("Product category (e.g., 'email api', 'authentication')"),
});

// Schema.org templates
const schemaTemplates = {
  organization: (data: Record<string, any>) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name || "[Company Name]",
    url: data.url || "https://example.com",
    logo: data.logo || `${data.url}/logo.png`,
    description: data.description || "[Company description]",
    sameAs: data.sameAs || [],
    contactPoint: data.contactPoint || {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: data.email || "support@example.com",
    },
  }),

  software: (data: Record<string, any>) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name || "[Product Name]",
    applicationCategory: data.category || "DeveloperApplication",
    operatingSystem: data.os || "Cross-platform",
    description: data.description || "[Product description]",
    url: data.url || "https://example.com",
    author: {
      "@type": "Organization",
      name: data.authorName || "[Company Name]",
    },
    offers: {
      "@type": "Offer",
      price: data.price || "0",
      priceCurrency: "USD",
      description: data.offerDescription || "Free tier available",
    },
    featureList: data.features || [],
    programmingLanguage: data.languages || ["JavaScript", "TypeScript"],
  }),

  person: (data: Record<string, any>) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name || "[Full Name]",
    jobTitle: data.jobTitle || "[Job Title]",
    url: data.url || "https://example.com",
    sameAs: data.sameAs || [],
    knowsAbout: data.expertise || [],
    worksFor: data.company
      ? {
          "@type": "Organization",
          name: data.company,
        }
      : undefined,
  }),

  faq: (data: Record<string, any>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (data.questions || []).map((q: any) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }),

  howto: (data: Record<string, any>) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name || "How to [accomplish task]",
    description: data.description || "[Brief overview]",
    step: (data.steps || []).map((s: any, i: number) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    tool: data.tool
      ? {
          "@type": "SoftwareApplication",
          name: data.tool,
        }
      : undefined,
  }),
};

// GEO Audit scoring functions
function calculateGeoScore(analysis: Record<string, any>): number {
  let score = 0;

  // Schema presence (25 points)
  if (analysis.hasSchema) score += 15;
  if (analysis.hasOrganizationSchema) score += 5;
  if (analysis.hasFAQSchema) score += 5;

  // Content structure (25 points)
  if (analysis.hasH1) score += 10;
  if (analysis.hasProperHeadingHierarchy) score += 10;
  if (analysis.hasMetaDescription) score += 5;

  // Technical (25 points)
  if (analysis.isHttps) score += 10;
  if (analysis.hasSitemap) score += 5;
  if (analysis.allowsAIBots) score += 10;

  // Content quality indicators (25 points)
  if (analysis.hasCodeBlocks) score += 10;
  if (analysis.wordCount > 500) score += 5;
  if (analysis.wordCount > 1000) score += 5;
  if (analysis.hasInternalLinks) score += 5;

  return Math.min(100, score);
}

function getGrade(score: number): string {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

// Create MCP server
const server = new Server(
  {
    name: "kimmo-geo-tools",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "webpage_geo_audit",
      description:
        "Audit a webpage for AI search visibility (GEO). Analyzes schema markup, content structure, and technical factors that affect how LLMs perceive and recommend your content.",
      inputSchema: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "URL of the webpage to audit",
          },
        },
        required: ["url"],
      },
    },
    {
      name: "generate_schema",
      description:
        "Generate optimized Schema.org markup for AI visibility. Creates JSON-LD structured data for organizations, software products, people, FAQs, or how-to guides.",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["organization", "software", "person", "faq", "howto"],
            description: "Type of schema to generate",
          },
          data: {
            type: "object",
            description: "Data to populate the schema",
          },
        },
        required: ["type", "data"],
      },
    },
    {
      name: "agent_friendly_score",
      description:
        "Evaluate a developer tool for AI agent compatibility. Scores based on SDK design, documentation quality, MCP integration, and training data presence.",
      inputSchema: {
        type: "object",
        properties: {
          tool_name: {
            type: "string",
            description: "Name of the devtool",
          },
          tool_url: {
            type: "string",
            description: "URL of the devtool",
          },
          check_mcp: {
            type: "boolean",
            default: true,
            description: "Check for MCP server existence",
          },
          check_npm: {
            type: "boolean",
            default: true,
            description: "Check npm presence",
          },
        },
        required: ["tool_name", "tool_url"],
      },
    },
    {
      name: "geo_recommendations",
      description:
        "Get actionable GEO recommendations based on an audit. Provides prioritized list of improvements to increase AI search visibility.",
      inputSchema: {
        type: "object",
        properties: {
          audit_results: {
            type: "object",
            description: "Results from webpage_geo_audit",
          },
        },
        required: ["audit_results"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "webpage_geo_audit": {
      const { url } = WebpageAuditSchema.parse(args);

      try {
        // Try the public API first (more comprehensive analysis)
        try {
          const apiResponse = await fetch("https://kimmoihanus.com/api/geo-audit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });
          
          if (apiResponse.ok) {
            const apiResult = await apiResponse.json();
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(apiResult, null, 2),
                },
              ],
            };
          }
        } catch {
          // API unavailable, fall back to local analysis
        }

        // Fallback: Local analysis
        const response = await fetch(url, {
          headers: {
            "User-Agent": "KimmoGEOTools/1.0 (+https://kimmoihanus.com/tools)",
          },
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        // Analyze the page
        const analysis = {
          url,
          isHttps: url.startsWith("https://"),
          hasSchema: $('script[type="application/ld+json"]').length > 0,
          hasOrganizationSchema: html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"'),
          hasFAQSchema: html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'),
          hasH1: $("h1").length > 0,
          hasProperHeadingHierarchy: $("h1").length === 1 && $("h2").length > 0,
          hasMetaDescription: $('meta[name="description"]').length > 0,
          metaDescription: $('meta[name="description"]').attr("content") || null,
          title: $("title").text() || null,
          hasCodeBlocks: $("pre code, code").length > 0,
          codeBlockCount: $("pre code").length,
          wordCount: $("body").text().split(/\s+/).length,
          hasInternalLinks: $('a[href^="/"], a[href^="' + new URL(url).origin + '"]').length > 0,
          hasSitemap: false, // Would need additional check
          allowsAIBots: true, // Would need robots.txt check
          schemaTypes: [] as string[],
        };

        // Extract schema types
        $('script[type="application/ld+json"]').each((_, el) => {
          try {
            const json = JSON.parse($(el).html() || "{}");
            if (json["@type"]) {
              analysis.schemaTypes.push(json["@type"]);
            }
          } catch {
            // Ignore parse errors
          }
        });

        const score = calculateGeoScore(analysis);
        const grade = getGrade(score);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  score,
                  grade,
                  analysis,
                  summary: {
                    strengths: [
                      analysis.isHttps && "HTTPS enabled",
                      analysis.hasSchema && "Has Schema.org markup",
                      analysis.hasH1 && "Proper H1 tag",
                      analysis.hasCodeBlocks && "Has code examples",
                    ].filter(Boolean),
                    gaps: [
                      !analysis.hasSchema && "Missing Schema.org markup",
                      !analysis.hasFAQSchema && "No FAQ schema (high impact for AI)",
                      !analysis.hasProperHeadingHierarchy && "Heading hierarchy issues",
                      !analysis.hasMetaDescription && "Missing meta description",
                    ].filter(Boolean),
                  },
                  _source: "local-fallback",
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error auditing ${url}: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }
    }

    case "generate_schema": {
      const { type, data } = SchemaGeneratorSchema.parse(args);
      const generator = schemaTemplates[type];

      if (!generator) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown schema type: ${type}`,
            },
          ],
          isError: true,
        };
      }

      const schema = generator(data);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                schema,
                implementation: `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`,
                validation_url: "https://validator.schema.org/",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "agent_friendly_score": {
      const { tool_name, tool_url, check_mcp, check_npm } = AgentFriendlyScoreSchema.parse(args);

      // This would integrate with external APIs in production
      // For now, return a framework for manual evaluation
      const evaluation = {
        tool: tool_name,
        url: tool_url,
        framework: {
          sdk_design: {
            max_points: 30,
            criteria: [
              "SDK available for major languages (10 pts)",
              "Consistent, predictable API (10 pts)",
              "Complete TypeScript definitions (5 pts)",
              "Clear error messages (5 pts)",
            ],
          },
          documentation: {
            max_points: 25,
            criteria: [
              "Docs lead with working code (10 pts)",
              "Copy-paste examples work (5 pts)",
              "Parseable structure (5 pts)",
              "No login walls (5 pts)",
            ],
          },
          training_data: {
            max_points: 20,
            criteria: [
              "GitHub repos using tool (8 pts)",
              "Stack Overflow presence (6 pts)",
              "Tutorial coverage (6 pts)",
            ],
          },
          mcp_integration: {
            max_points: 15,
            criteria: [
              "Official MCP server exists (10 pts)",
              "MCP server maintained (3 pts)",
              "MCP server discoverable (2 pts)",
            ],
            check_urls: check_mcp
              ? [`https://mcp.so/search?q=${encodeURIComponent(tool_name)}`, `${tool_url}/docs` + " (search for MCP)"]
              : [],
          },
          time_to_working: {
            max_points: 10,
            criteria: [
              "Install to hello world <5 min (5 pts)",
              "No complex onboarding (3 pts)",
              "Sensible defaults (2 pts)",
            ],
          },
        },
        npm_check: check_npm ? `https://www.npmjs.com/search?q=${encodeURIComponent(tool_name)}` : null,
        instructions:
          "Use this framework to manually score the tool. Sum the points from each category for a total score out of 100.",
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(evaluation, null, 2),
          },
        ],
      };
    }

    case "geo_recommendations": {
      const auditResults = args?.audit_results as Record<string, any>;

      if (!auditResults) {
        return {
          content: [
            {
              type: "text",
              text: "Please provide audit_results from webpage_geo_audit",
            },
          ],
          isError: true,
        };
      }

      const recommendations = [];
      const analysis = auditResults.analysis || auditResults;

      // High priority recommendations
      if (!analysis.hasSchema) {
        recommendations.push({
          priority: "high",
          action: "Add Schema.org markup",
          impact: "Major improvement in AI understanding",
          implementation: "Use generate_schema tool to create Organization and relevant schemas",
        });
      }

      if (!analysis.hasFAQSchema) {
        recommendations.push({
          priority: "high",
          action: "Add FAQ schema",
          impact: "LLMs often surface FAQ content when answering related queries",
          implementation: "Convert top support questions into FAQPage schema",
        });
      }

      if (!analysis.hasProperHeadingHierarchy) {
        recommendations.push({
          priority: "medium",
          action: "Fix heading hierarchy",
          impact: "Helps LLMs understand content structure",
          implementation: "Ensure single H1, followed by H2s, then H3s",
        });
      }

      if (!analysis.hasCodeBlocks && analysis.url?.includes("doc")) {
        recommendations.push({
          priority: "high",
          action: "Add code examples",
          impact: "Critical for devtools - AI needs working code to recommend",
          implementation: "Add copy-pasteable code blocks to key pages",
        });
      }

      if (!analysis.hasMetaDescription) {
        recommendations.push({
          priority: "medium",
          action: "Add meta description",
          impact: "Provides summary for AI to extract",
          implementation: 'Add <meta name="description" content="..."> with clear value prop',
        });
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                recommendations,
                summary: {
                  high_priority: recommendations.filter((r) => r.priority === "high").length,
                  medium_priority: recommendations.filter((r) => r.priority === "medium").length,
                  current_score: auditResults.score,
                  potential_score: Math.min(100, (auditResults.score || 50) + recommendations.length * 10),
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Kimmo GEO Tools MCP server running");
}

main().catch(console.error);

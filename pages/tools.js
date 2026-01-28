import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

const tools = [
  {
    name: 'GEO Audit API',
    type: 'REST API',
    description:
      'Public API for AI search visibility audits. Analyze any URL for schema markup, technical SEO, content structure, and get prioritized recommendations.',
    features: ['Instant GEO scoring', 'Schema detection', 'Technical analysis', 'Actionable recommendations'],
    links: {
      docs: '/api/geo-audit',
    },
    install: 'curl -X POST https://kimmoihanus.com/api/geo-audit -d \'{"url":"https://example.com"}\'',
  },
  {
    name: 'Schema Optimizer API',
    type: 'REST API',
    description:
      'Generate optimized Schema.org JSON-LD for any webpage. Detects page type, extracts existing schemas, and provides ready-to-implement templates.',
    features: ['Page type detection', 'Existing schema extraction', 'Optimized templates', 'Copy-paste JSON-LD'],
    links: {
      docs: '/api/schema-optimize',
    },
    install: 'curl -X POST https://kimmoihanus.com/api/schema-optimize -d \'{"url":"https://example.com"}\'',
  },
  {
    name: '@kimmoihanus/geo-tools',
    type: 'MCP Server',
    description:
      'Model Context Protocol server for Generative Engine Optimization. Connects Claude, Cursor, or any MCP client to GEO tools.',
    features: ['Claude/Cursor integration', 'Uses GEO API backend', 'Schema generation', 'Agent-friendly scoring'],
    links: {
      npm: 'https://www.npmjs.com/package/@kimmoihanus/geo-tools',
      github: 'https://github.com/kimmoihanus/geo-tools-mcp',
    },
    install: 'npm install -g @kimmoihanus/geo-tools',
  },
  {
    name: 'kimmo-geo-audit',
    type: 'Cursor Skill',
    description:
      'Audit websites for AI search visibility and Generative Engine Optimization (GEO). Teaches AI assistants how to analyze LLM presence and recommend improvements.',
    features: [
      'LLM visibility analysis',
      'Technical GEO scoring',
      'Competitor comparison',
      'Actionable recommendations',
    ],
    links: {
      github: 'https://github.com/kimmoihanus/geo-tools-mcp/tree/main/skills/kimmo-geo-audit',
    },
  },
  {
    name: 'kimmo-schema-optimizer',
    type: 'Cursor Skill',
    description:
      'Generate and optimize Schema.org structured data for AI/LLM visibility. Provides templates and best practices for rich results and AI search engines.',
    features: [
      'Organization schemas',
      'SoftwareApplication schemas',
      'FAQPage for AI discovery',
      'HowTo for tutorials',
    ],
    links: {
      github: 'https://github.com/kimmoihanus/geo-tools-mcp/tree/main/skills/kimmo-schema-optimizer',
    },
  },
  {
    name: 'kimmo-agent-friendly-score',
    type: 'Cursor Skill',
    description:
      'Score developer tools and SaaS products for AI agent compatibility. Evaluates SDK design, documentation, MCP integration, and training data presence.',
    features: [
      '100-point scoring framework',
      'SDK & API evaluation',
      'MCP integration check',
      'Competitor benchmarking',
    ],
    links: {
      github: 'https://github.com/kimmoihanus/geo-tools-mcp/tree/main/skills/kimmo-agent-friendly-score',
    },
  },
];

function ToolCard({ tool }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {tool.type}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{tool.description}</p>

      <div className="mb-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500 mb-2">
          Features
        </h4>
        <ul className="grid grid-cols-2 gap-1">
          {tool.features.map((feature) => (
            <li key={feature} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {tool.install && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500 mb-2">
            Install
          </h4>
          <code className="block text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded font-mono text-gray-800 dark:text-gray-200">
            {tool.install}
          </code>
        </div>
      )}

      <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        {tool.links.npm && (
          <a
            href={tool.links.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            npm →
          </a>
        )}
        {tool.links.github && (
          <a
            href={tool.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <Wrapper>
      <NextSeo
        title="GEO Tools - MCP Servers & Cursor Skills by Kimmo Ihanus"
        description="Free tools for Generative Engine Optimization (GEO). MCP servers and Cursor skills to audit AI visibility, generate schemas, and evaluate devtools for the agent era."
      />

      <Heading className="mb-4">GEO Tools</Heading>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Free tools for Generative Engine Optimization. MCP servers and Cursor skills to help you understand and optimize
        how AI systems perceive and recommend your products.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Why GEO Matters</h2>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            85% of developers now use AI tools regularly. When a developer asks Cursor to "add email functionality," the
            AI picks the service, writes the integration, and runs the install command.
          </p>

          <p>
            <strong>The new funnel:</strong>
          </p>
          <ul>
            <li>
              <s>Marketing → Landing → Docs → Trial → Conversion</s>
            </li>
            <li>Problem → AI suggestion → npm install → Subscription</li>
          </ul>

          <p>
            The tools that AI can understand and work with get recommended. The tools it can't work with become
            invisible. These tools help you audit and optimize for this new reality.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/posts/007-generative-engine-optimization-boring-services">
            <a className="text-blue-600 dark:text-blue-400 hover:underline">Read: The new developer funnel →</a>
          </Link>
          <Link href="/posts/009-mcp-leaderboard-how-dev-tools-stack-up-for-ai-agents">
            <a className="text-blue-600 dark:text-blue-400 hover:underline">Read: The MCP leaderboard →</a>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

Tools.favicon = '🛠️';

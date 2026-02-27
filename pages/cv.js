import { NextSeo } from 'next-seo';
import { useRef } from 'react';

export default function CV() {
  const cvRef = useRef(null);

  const handleDownloadPDF = () => {
    console.log('PDF button clicked');
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopy = async () => {
    const cvText = `KIMMO IHANUS
Co-Founder & CTO | AI Search Pioneer | Technical Founder

Helsinki, Finland
kimmo@superlines.io | kimmoihanus.com | linkedin.com/in/kimmo-ihanus-8175aa56

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY

Technical founder and AI expert with 15+ years of experience in AI, marketing, and data. Co-founder & CTO of Superlines, building Europe's leading AI Search Analytics platform. AI-native developer since before "vibe coding" was a thing - among the first teams in the Nordics to gain access to OpenAI's GPT-3 in 2020. Single-handedly developed the Superlines platform utilizing 100+ AI agents for analysis and insights.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXPERIENCE

CO-FOUNDER & CTO | Superlines
Oct 2023 – Present | Global | AI Search Intelligence Platform

• Defined and executed the full product and AI strategy for Europe's leading AI Search Analytics platform, tracking brand visibility across ChatGPT, Perplexity, Gemini, Claude, and Google AI Mode
• Single-handedly architected and developed the platform, deploying 100+ individual AI agents for analysis, insights, and automated reporting — a real-world enterprise AI portfolio in production
• Developed and communicated AI strategy to investors, enterprise clients, and media; featured in Helsingin Sanomat, Talouselämä, and Markkinointiuutiset
• Built API and MCP (Model Context Protocol) support enabling agentic, multi-system AI workflows for client integrations
• Selected for Google's AI Startup Program and NVIDIA's Inception program; secured pre-seed funding from investors
• Responsible for sales, client support, and marketing alongside technical leadership

GROWTH LEAD | Cronvall
2021 – Oct 2023 | Helsinki, Finland | B2B Marketplace Startup, GTM, performance marketing

• Led demand generation, performance marketing, and SEO/SEM strategy across enterprise accounts
• Built and scaled a HubSpot marketing automation system; led a cross-functional marketing team
• Advised leadership on AI adoption opportunities in marketing workflows

CO-FOUNDER | Grew Oy
2020 – 2021 | Helsinki, Finland | AI-Powered Marketing Technology

• Founded AI-focused marketing technology company; launched first AI-powered SaaS product to the US market prior to ChatGPT's existence (2021)
• Early access to GPT-3 (2020) — among the first teams in the Nordics to build production AI applications on top of large language models
• Developed a patent-pending privacy-first location detection system using edge neural networks (published in HackerNoon)

SENIOR GROWTH HACKER / GROWTH LEAD | Avaus
2016 – Aug 2020 | Helsinki, Finland | Nordic Marketing Technology Consultancy

• Over a decade driving growth strategy and marketing technology transformation for major Nordic and international enterprise clients
• Among the earliest adopters of AI and algorithmic marketing at scale in the Nordics, integrating ML-driven personalisation and automation into client marketing stacks
• Built growth teams from scratch, established methodologies, and delivered executive-level recommendations on technology investment priorities
• Led multi-stakeholder projects requiring alignment across business, technology, and marketing functions

GROWTH MARKETER | Yousician
2016 | Helsinki, Finland | Consumer Technology / SaaS

• Implemented data-driven email onboarding programmes using Mixpanel for one of Finland's most successful consumer apps

GROWTH HACKER | Avaus
2010 – Sep 2016 | Helsinki, Finland | Marketing Automation, Loyalty Programs, Growth Hacking

• Optimized user journeys and marketing communications
• Led marketing automation implementation projects
• Coordinated loyalty program development
• Ran rapid data-driven experiments

IKEA FAMILY SPECIALIST | IKEA
2009 | Helsinki, Finland | Marketing Automation, Loyalty Programs, Growth Hacking

• Optimized user journeys and marketing communications
• Led marketing automation implementation projects
• Coordinated loyalty program development
• Ran rapid data-driven experiments

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS & TOOLS

Languages & Frameworks: JavaScript, Node.js, React, Vue.js, Next.js, Tailwind CSS
AI/ML: OpenAI APIs, GPT models, Brain.js, Neural Networks, MCP (Model Context Protocol)
Databases: MongoDB, Firebase, PostgreSQL, Supabase, ClickHouse, etc.
Cloud & DevOps: Heroku, Vercel, Google Cloud, Fly.io, Cloudflare, etc.
Marketing Tech: HubSpot, Marketing Automation, various analytics tools, SEO/SEM etc.
Other: REST APIs, WebSockets, Socket.io, Mapbox

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECTS & PRODUCTS

Superlines (superlines.io) - AI Search Analytics platform for marketers
AI Search Index (aisearchindex.com) - Analytics for AI traffic detection
EmailMCP (emailmcp.co) - AI assistant built on Model Context Protocol
ConsoleChat.io (consolechat.io) - Viral project featured on HackerNews
We Became Shadows (webecameshadows.com) - Multiplayer social deduction game with AI bots
Hacker-AI (hacker-ai.com) - ML-powered HackerNews title predictor
pointNG (pointng.io) - Privacy-first location detection using edge ML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION

Bachelor of Business Administration
Laurea University of Applied Sciences | 2005 - 2009

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEDIA & RECOGNITION

• Featured in Helsingin Sanomat - "Sata ajatusta tekoälystä" (hs.fi/visio/art-2000011333578.html)
• Featured in Talouselämä - AI Search visibility insights (talouselama.fi/uutiset/a/6f5337ec-37d7-4aef-ab4b-b6d60e54bab0)
• Featured in Markkinointiuutiset - Superlines global expansion (markkinointiuutiset.fi)
• Published in HackerNoon - "Turning Users Invisible: Edge ML in Privacy-First Location Detection" (hackernoon.com/turning-users-invisible-edge-machine-learning-in-privacy-first-location-detection-k1a34tj)
• Speaker at CX Masterclass - "AI Search Optimisation Today" (shirute.com/cxmasterclass/who/kimmo-ihanus/)
• ConsoleChat.io featured on HackerNews front page

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGES

Finnish (Native)
English (Fluent)
`;

    try {
      await navigator.clipboard.writeText(cvText);
      alert('CV copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NextSeo
        title="CV - Kimmo Ihanus"
        description="Co-Founder & CTO at Superlines. AI Search Pioneer and Technical Founder with 15+ years of experience."
      />

      {/* Print-only styles and action buttons */}
      <style jsx global>{`
        @media print {
          .no-print,
          footer,
          nav,
          .nav,
          header.nav {
            display: none !important;
          }
          .cv-container header {
            display: block !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Action buttons */}
      <div className="no-print sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex gap-4 justify-end">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy as Text
          </button>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            title="Select 'Save as PDF' in the print dialog"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Save as PDF
          </button>
        </div>
      </div>

      {/* CV Content */}
      <div ref={cvRef} className="cv-container max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 pb-8 border-b-2 border-gray-900 dark:border-gray-100">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">KIMMO IHANUS</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium mb-4">
            Co-Founder & CTO | AI Search Pioneer | Technical Founder
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
            <span>📍 Helsinki, Finland</span>
            <a href="mailto:kimmo@superlines.io" className="hover:text-gray-900 dark:hover:text-gray-100">
              ✉️ kimmo@superlines.io
            </a>
            <a href="https://www.kimmoihanus.com" className="hover:text-gray-900 dark:hover:text-gray-100">
              🌐 kimmoihanus.com
            </a>
            <a
              href="https://www.linkedin.com/in/kimmo-ihanus-8175aa56/"
              className="hover:text-gray-900 dark:hover:text-gray-100"
            >
              💼 LinkedIn
            </a>
            <a href="https://x.com/ihmissuti" className="hover:text-gray-900 dark:hover:text-gray-100">
              𝕏 @ihmissuti
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">Summary</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Technical founder and AI expert with 15+ years of experience in AI, marketing, and data. Co-founder & CTO of{' '}
            <strong>Superlines</strong>, building Europe's leading AI Search Analytics platform. AI-native developer
            since before "vibe coding" was a thing — among the first teams in the Nordics to gain access to OpenAI's
            GPT-3 in 2020. Single-handedly developed the Superlines platform utilizing <strong>100+ AI agents</strong>{' '}
            for analysis and insights. Heavy user of MCP tools and agentic workflows.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-gray-900 dark:text-gray-100">
            Experience
          </h2>

          <ExperienceItem
            title="Co-Founder & CTO"
            company="Superlines"
            companyUrl="https://www.superlines.io"
            period="Oct 2023 – Present"
            location="Global | AI Search Intelligence Platform"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                Defined and executed the full product and AI strategy for Europe's leading AI Search Analytics platform,
                tracking brand visibility across ChatGPT, Perplexity, Gemini, Claude, and Google AI Mode
              </li>
              <li>
                Single-handedly architected and developed the platform, deploying 100+ individual AI agents for
                analysis, insights, and automated reporting — a real-world enterprise AI portfolio in production
              </li>
              <li>
                Developed and communicated AI strategy to investors, enterprise clients, and media; featured in
                Helsingin Sanomat, Talouselämä, and Markkinointiuutiset
              </li>
              <li>
                Built API and MCP (Model Context Protocol) support enabling agentic, multi-system AI workflows for
                client integrations
              </li>
              <li>
                Selected for <strong>Google's AI Startup Program</strong> and{' '}
                <strong>NVIDIA's Inception program</strong>; secured pre-seed funding from investors
              </li>
              <li>Responsible for sales, client support, and marketing alongside technical leadership</li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="Growth Lead"
            company="Cronvall"
            companyUrl="https://www.cronvall.com"
            period="2021 – Oct 2023"
            location="Helsinki, Finland | B2B Marketplace Startup, GTM, performance marketing"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Led demand generation, performance marketing, and SEO/SEM strategy across enterprise accounts</li>
              <li>Built and scaled a HubSpot marketing automation system; led a cross-functional marketing team</li>
              <li>Advised leadership on AI adoption opportunities in marketing workflows</li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="Co-Founder"
            company="Grew Oy"
            period="2020 – 2021"
            location="Helsinki, Finland | AI-Powered Marketing Technology"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                Founded AI-focused marketing technology company; launched first AI-powered SaaS product to the US market
                prior to ChatGPT's existence (2021)
              </li>
              <li>
                Early access to GPT-3 (2020) — among the first teams in the Nordics to build production AI applications
                on top of large language models
              </li>
              <li>
                Developed a patent-pending privacy-first location detection system using edge neural networks (published
                in HackerNoon)
              </li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="Senior Growth Hacker / Growth Lead"
            company="Avaus"
            companyUrl="https://www.avaus.com"
            period="2016 – Aug 2020"
            location="Helsinki, Finland | Nordic Marketing Technology Consultancy"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                Over a decade driving growth strategy and marketing technology transformation for major Nordic and
                international enterprise clients
              </li>
              <li>
                Among the earliest adopters of AI and algorithmic marketing at scale in the Nordics, integrating
                ML-driven personalisation and automation into client marketing stacks
              </li>
              <li>
                Built growth teams from scratch, established methodologies, and delivered executive-level
                recommendations on technology investment priorities
              </li>
              <li>
                Led multi-stakeholder projects requiring alignment across business, technology, and marketing functions
              </li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="Growth Marketer"
            company="Yousician"
            companyUrl="https://www.yousician.com"
            period="2016"
            location="Helsinki, Finland | Consumer Technology / SaaS"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                Implemented data-driven email onboarding programmes using Mixpanel for one of Finland's most successful
                consumer apps
              </li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="Growth Hacker"
            company="Avaus"
            companyUrl="https://www.avaus.com"
            period="2010 – Sep 2016"
            location="Helsinki, Finland | Marketing Automation, Loyalty Programs, Growth Hacking"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Optimized user journeys and marketing communications</li>
              <li>Led marketing automation implementation projects</li>
              <li>Coordinated loyalty program development</li>
              <li>Ran rapid data-driven experiments</li>
            </ul>
          </ExperienceItem>

          <ExperienceItem
            title="IKEA FAMILY Specialist"
            company="IKEA"
            period="2009"
            location="Helsinki, Finland | Marketing Automation, Loyalty Programs, Growth Hacking"
          >
            <ul className="list-disc list-outside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Optimized user journeys and marketing communications</li>
              <li>Led marketing automation implementation projects</li>
              <li>Coordinated loyalty program development</li>
              <li>Ran rapid data-driven experiments</li>
            </ul>
          </ExperienceItem>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <SkillCategory title="Languages & Frameworks">
              JavaScript, Node.js, React, Vue.js, Next.js, Tailwind CSS, HTML/CSS
            </SkillCategory>
            <SkillCategory title="AI/ML">
              OpenAI APIs, GPT models, Brain.js, Neural Networks, MCP (Model Context Protocol), AI Agents
            </SkillCategory>
            <SkillCategory title="Databases & Cloud">
              MongoDB, Firebase, PostgreSQL, Heroku, Vercel, Google Cloud, AWS
            </SkillCategory>
            <SkillCategory title="Marketing Tech">
              HubSpot, Marketing Automation, Analytics, SEO/SEM, Performance Marketing
            </SkillCategory>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">
            Products & Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <ProjectItem name="Superlines" url="https://www.superlines.io">
              AI Search Analytics platform for marketers
            </ProjectItem>
            <ProjectItem name="AI Search Index" url="https://www.aisearchindex.com">
              Analytics for AI traffic detection
            </ProjectItem>
            <ProjectItem name="EmailMCP" url="https://emailmcp.co">
              AI assistant built on Model Context Protocol
            </ProjectItem>
            <ProjectItem name="ConsoleChat.io" url="https://consolechat.io">
              Viral project featured on HackerNews front page
            </ProjectItem>
            <ProjectItem name="We Became Shadows" url="https://www.webecameshadows.com">
              Multiplayer social deduction game with AI bots powered by Claude
            </ProjectItem>
            <ProjectItem name="Hacker-AI" url="https://hacker-ai.com">
              ML-powered HackerNews title predictor
            </ProjectItem>
            <ProjectItem name="pointNG" url="https://pointng.io">
              Privacy-first location detection using edge ML
            </ProjectItem>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">
            Education
          </h2>
          <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-4">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Bachelor of Business Administration</h3>
            <p className="text-gray-600 dark:text-gray-400">Laurea University of Applied Sciences • 2005 - 2009</p>
          </div>
        </section>

        {/* Media & Recognition */}
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">
            Media & Recognition
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              📰 Featured in{' '}
              <a href="https://www.hs.fi/visio/art-2000011333578.html" className="font-semibold hover:underline">
                Helsingin Sanomat
              </a>{' '}
              — "Sata ajatusta tekoälystä" (100 thoughts on AI)
            </li>
            <li>
              📰 Featured in{' '}
              <a
                href="https://www.talouselama.fi/uutiset/a/6f5337ec-37d7-4aef-ab4b-b6d60e54bab0"
                className="font-semibold hover:underline"
              >
                Talouselämä
              </a>{' '}
              — AI Search visibility insights for Finnish companies
            </li>
            <li>
              📰 Featured in{' '}
              <a
                href="https://www.markkinointiuutiset.fi/artikkelit/suomalainen-markkinoijille-suunnattu-tekoaly-startup-hamuaa-vauhdilla-globaaleille-markkinoille"
                className="font-semibold hover:underline"
              >
                Markkinointiuutiset
              </a>{' '}
              — Superlines global expansion at Slush
            </li>
            <li>
              📝 Published in{' '}
              <a
                href="https://hackernoon.com/turning-users-invisible-edge-machine-learning-in-privacy-first-location-detection-k1a34tj"
                className="font-semibold hover:underline"
              >
                HackerNoon
              </a>{' '}
              — "Turning Users Invisible: Edge ML in Privacy-First Location Detection"
            </li>
            <li>
              🎯 Selected for <strong>Google's AI Startup Program</strong>
            </li>
            <li>
              🎤 Speaker at{' '}
              <a
                href="https://www.shirute.com/cxmasterclass/who/kimmo-ihanus/"
                className="font-semibold hover:underline"
              >
                CX Masterclass
              </a>{' '}
              — "AI Search Optimisation Today"
            </li>
            <li>
              🔥 ConsoleChat.io featured on <strong>HackerNews front page</strong>
            </li>
          </ul>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-gray-900 dark:text-gray-100">
            Languages
          </h2>
          <div className="flex gap-8">
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Finnish</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">Native</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">English</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">Fluent</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, companyUrl, period, location, badge, children }) {
  return (
    <div className="mb-6 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
      <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
        {badge && (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="text-gray-600 dark:text-gray-400 mb-2">
        {companyUrl ? (
          <a href={companyUrl} className="font-semibold hover:underline">
            {company}
          </a>
        ) : (
          <span className="font-semibold">{company}</span>
        )}
        <span className="mx-2">•</span>
        <span>{period}</span>
        <span className="mx-2">•</span>
        <span>{location}</span>
      </div>
      {children}
    </div>
  );
}

function SkillCategory({ title, children }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
      <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
    </div>
  );
}

function ProjectItem({ name, url, children }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
      <a href={url} className="font-semibold text-gray-900 dark:text-gray-100 hover:underline">
        {name}
      </a>
      <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
    </div>
  );
}

CV.favicon = '📄';

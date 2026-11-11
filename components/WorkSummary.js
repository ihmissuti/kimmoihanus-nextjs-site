// The short work history that used to sit on the front page.
export default function WorkSummary() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-6">Work in short</h2>
      <div className="space-y-6">
        <ExperienceItem
          role="Co-Founder & CTO"
          company="Superlines"
          companyUrl="https://www.superlines.io"
          period="Oct 2023 - Present"
        >
          Pioneering AI search and LLM agents. Built the agentic infrastructure and created the distribution channels
          for Superlines that reached global adoption. First to launch an "AI Visibility Tracker" before the wider rise
          of GEO tools.
        </ExperienceItem>

        <ExperienceItem
          role="Growth Lead"
          company="Cronvall"
          companyUrl="https://www.cronvall.com"
          period="Aug 2021 - Oct 2023"
        >
          First in-house marketer: ramped up performance marketing and growth operations. GTM operations to Estonia and
          Germany.
        </ExperienceItem>

        <ExperienceItem role="Co-Founder" company="Grew" period="Sep 2020 - Jul 2021">
          Invented and programmed a privacy-friendly location detection algorithm using neural networks in the browser.
          Patented in EU and US. First in the Nordics to gain access to OpenAI's commercial GPT model and created a
          Google Ads-based SaaS tool.
        </ExperienceItem>

        <ExperienceItem
          role="Senior Growth Hacker"
          company="Avaus"
          companyUrl="https://www.avaus.com"
          period="Sep 2016 - Aug 2020"
        >
          Key player in ramping up growth hacking offering. Built internal AI tools that were eventually sold as SaaS to
          clients. Ramped up the Avaus-X innovation team. Built THE house band.
        </ExperienceItem>

        <ExperienceItem
          role="Growth Marketer"
          company="Yousician"
          companyUrl="https://www.yousician.com"
          period="Jun 2016 - Sep 2016"
        >
          Built a retention-driving user onboarding program with Mixpanel for new app users.
        </ExperienceItem>

        <ExperienceItem
          role="Consultant"
          company="Avaus"
          companyUrl="https://www.avaus.com"
          period="Feb 2010 - Jun 2016"
        >
          First in the Nordics to operate enterprise-level marketing automation systems. Involved in major loyalty
          program implementations in the Nordics.
        </ExperienceItem>
      </div>
    </div>
  );
}

function ExperienceItem({ role, company, companyUrl, period, children }) {
  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold text-gray-900 dark:text-gray-100">{role}</span>
        <span className="text-gray-400">at</span>
        {companyUrl ? (
          <a href={companyUrl} className="font-semibold text-gray-900 dark:text-gray-100 hover:underline">
            {company}
          </a>
        ) : (
          <span className="font-semibold text-gray-900 dark:text-gray-100">{company}</span>
        )}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{period}</div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

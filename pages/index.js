import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getPosts } from '@/lib/posts';
import { getGraphics } from '@/lib/graphics';
import { projects, featuredTracks } from '@/lib/music';

import Intro from '@/prose/intro.md';
import GraphicPreview from '@/components/GraphicsPreview';
import MusicProjectCard from '@/components/MusicProjectCard';
import TrackCard from '@/components/TrackCard';
import styles from '@/css/graphics.module.css';
import PostListItem from '@/components/PostListItem';

export async function getStaticProps() {
  const [posts, graphics] = await Promise.all([getPosts(), getGraphics()]);

  return {
    props: {
      posts: posts.slice(0, 5),
      graphics: graphics.slice(0, 5),
    },
  };
}

export default function Home({ posts, graphics }) {
  return (
    <div className="mt-8">
      <NextSeo
        title="Kimmo Ihanus"
        description="Music producer and songwriter from Helsinki, Finland. Indie rock, rap, reggae, progressive house, black metal and everything in between — released as ihmissuti, Cometfall, Amzart, erizou, halogeist, Shaky Dope, rotwurm and DJ KLMA. Also builds AI tools like Superlines."
      />
      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">Kimmo Ihanus</h1>
          <div className="prose font-medium leading-relaxed mb-4 text-gray-600">
            <Intro />
          </div>
        </div>
      </div>

      {/* Music stage — always dark, styled after the artist sites */}
      <div className="music-stage">
        <div className="max-w-3xl mx-auto p-4 py-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#e8622c' }}>
            My ideas brought alive — Helsinki, FI
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Music</h2>
          <p className="mb-10 max-w-2xl" style={{ color: '#9ca3af' }}>
            Tracks span genres, projects and artist names. Some grew from ideas I had 20 years ago. Some are oven-fresh.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-12">
            {projects.map((project) => (
              <MusicProjectCard key={project.name} project={project} />
            ))}
          </div>

          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: '#e8622c' }}>
              Listen
            </p>
            {featuredTracks.map((track, i) => (
              <TrackCard key={track.title} track={track} index={i} />
            ))}
          </div>

          <Link href="/music">
            <a className="font-mono text-sm uppercase tracking-widest text-white hover:underline">
              All songs, stories &amp; demos →
            </a>
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
        </div>
        <ul className="mb-4">
          {posts.map((post) => {
            return <PostListItem key={post.title} post={post} href="/posts/[slug]" as={`/posts/${post.nextPath}`} />;
          })}
        </ul>
        <Link href="/posts">
          <a className="text-sm text-gray-600 dark:text-gray-300 font-medium">All Posts</a>
        </Link>

        {/* Work Section */}
        <div className="mt-14 mb-12">
          <h2 className="text-2xl font-bold mb-6">Work</h2>
          <div className="space-y-6">
            <ExperienceItem
              role="Co-Founder & CTO"
              company="Superlines"
              companyUrl="https://www.superlines.io"
              period="Oct 2023 - Present"
            >
              Pioneering AI search and LLM agents. Built the agentic infrastructure and created the distribution
              channels for Superlines that reached global adoption. First to launch an "AI Visibility Tracker" before
              the wider rise of GEO tools.
            </ExperienceItem>

            <ExperienceItem
              role="Growth Lead"
              company="Cronvall"
              companyUrl="https://www.cronvall.com"
              period="Aug 2021 - Oct 2023"
            >
              First in-house marketer: ramped up performance marketing and growth operations. GTM operations to Estonia
              and Germany.
            </ExperienceItem>

            <ExperienceItem role="Co-Founder" company="Grew" period="Sep 2020 - Jul 2021">
              Invented and programmed a privacy-friendly location detection algorithm using neural networks in the
              browser. Patented in EU and US. First in the Nordics to gain access to OpenAI's commercial GPT model and
              created a Google Ads-based SaaS tool.
            </ExperienceItem>

            <ExperienceItem
              role="Senior Growth Hacker"
              company="Avaus"
              companyUrl="https://www.avaus.com"
              period="Sep 2016 - Aug 2020"
            >
              Key player in ramping up growth hacking offering. Built internal AI tools that were eventually sold as
              SaaS to clients. Ramped up the Avaus-X innovation team. Built THE house band.
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
          <div className="mt-4">
            <Link href="/cv">
              <a className="text-sm text-gray-600 dark:text-gray-300 font-medium hover:underline">View full CV →</a>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className={'max-w-5xl mx-auto mb-6 p-4'}>
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Things I build</h3>
          </div>
        </div>
        <Project
          title="Superlines"
          image="/superlines_2.png"
          buttonText="Visit Website"
          buttonUrl="https://www.superlines.io"
        >
          <div className="mb-4">
            AI Search Analytics for Marketers. Track and improve your brand's visibility across all major AI platforms
            like ChatGPT, Perplexity, Google AI Mode and more. Trusted by forward-thinking marketing teams globally.
          </div>
        </Project>

        <Project
          title="AI Search Index"
          image="/ui_1.png"
          buttonText="Visit Website"
          buttonUrl="https://www.aisearchindex.com"
          flipped
        >
          <div className="mb-4">
            Analytics that shows your AI traffic. ChatGPT, Perplexity, Claude and other AI agents visit your website
            every day. Traditional analytics can't see them. AI Search Index identifies 50+ AI crawlers and shows
            real-time agent vs human traffic split.
          </div>
        </Project>

        <Project title="EmailMCP" image="/emailmcp.png" buttonText="Visit Website" buttonUrl="https://emailmcp.co">
          <div className="mb-4">
            Your personal AI assistant that lives in your inbox. Research anything, remember everything, and never
            forget with reminders. Built on MCP (Model Context Protocol), the same standard powering Claude Desktop.
          </div>
        </Project>
        <Project
          title="ConsoleChat.io"
          image="/consolechat.png"
          buttonText="Visit Website"
          buttonUrl="https://consolechat.io"
          flipped
        >
          <div className="mb-4">
            This project went viral and was featured on HackerNews. ConsoleChat turns the browser's console into a
            global real-time chat. If you're browsing a site that uses ConsoleChat.io you don't need to install any
            software - just open up your console and join the pit!
          </div>
        </Project>

        <Project
          title="We Became Shadows"
          image="/IMG_2424.jpg"
          buttonText="Visit Website"
          buttonUrl="https://game.webecameshadows.com"
        >
          <div className="mb-4">
            A multiplayer social deduction game where an AI hive mind called &ldquo;The Organism&rdquo; infiltrates a
            persistent chat world with bots that learn to mimic humans. Drop in, chat, and figure out who&rsquo;s real
            &mdash; but accuse wrong and you&rsquo;re out. Powered by Claude, built with Node.js and Socket.IO.
          </div>
        </Project>
      </div>
      <div className="py-12 max-w-5xl mx-auto mb-8 p-4">
        <h2 className="font-bold text-2xl mb-4">Graphics</h2>
        <p className="mb-8">
          Created in 2015 with mobile apps—before AI art generators existed. Just an iPhone, creative apps, and
          imagination.{' '}
          <Link href="/graphics">
            <a className="underline">See the full collection.</a>
          </Link>
        </p>
        <div className="grid gap-4 md:gap-8 grid-cols-3 md:grid-cols-5">
          {graphics.map((graphic) => (
            <Link key={graphic.slug} href="/graphics/[slug]" as={`/graphics/${graphic.slug}`}>
              <a className={styles['graphic-preview']}>
                <GraphicPreview graphic={graphic} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Project({ title, image, children, buttonUrl, buttonText, flipped = false }) {
  return (
    <div className={`py-12 ${flipped ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
      <div className={`max-w-5xl mx-auto px-4 md:px-0 md:flex ${flipped ? 'flex-row-reverse' : ''}`}>
        <div className="mb-8 md:mb-0 md:w-1/2 md:px-4">
          <h2 className="text-xl tracking-tight leading-10 font-bold sm:leading-none">
            <a href={buttonUrl}>{title}</a>
          </h2>
          <div className="mt-3 mb-3 text-base sm:mt-5 md:mt-5 md:mb-5">{children}</div>
          <span className="inline-flex rounded-md shadow-sm">
            <span className="inline-flex rounded-md shadow-sm">
              <a
                href={buttonUrl}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                {buttonText}
              </a>
            </span>
          </span>
        </div>
        <div className="md:w-1/2  md:px-4">
          <img
            loading="lazy"
            className="shadow-xl"
            src={
              image ||
              'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80'
            }
            alt=""
          />
        </div>
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

Home.favicon = '🎸';

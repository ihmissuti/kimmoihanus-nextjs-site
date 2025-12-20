import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { getPosts } from '@/lib/posts';
import { getGraphics } from '@/lib/graphics';

import Intro from '@/prose/intro.md';
import GraphicPreview from '@/components/GraphicsPreview';
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
        description="A hacker and a maker with over 10-years experience in helping companies to create better services with marketing technology. I'm a Co-Founder who codes with node.js and javascript at Grew."
      />
      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">Kimmo Ihanus</h1>
          <div className="prose font-medium leading-relaxed mb-4 text-gray-600">
            <Intro />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-4xl font-bold mb-4">Posts</h2>
        </div>
        <ul className="mb-4">
          {posts.map((post) => {
            return <PostListItem key={post.title} post={post} href="/posts/[slug]" as={`/posts/${post.nextPath}`} />;
          })}
        </ul>
        <Link href="/posts">
          <a className="text-sm text-gray-600 dark:text-gray-300 font-medium">All Posts</a>
        </Link>
      </div>
      <div>
        <div className={'max-w-5xl mx-auto mb-6 p-4'}>
          <div className="mt-12">
            <h3 className="text-4xl font-bold mb-4">Projects I build</h3>
          </div>
        </div>
        <Project
          title="Superlines"
          image="/superlines_2.png"
          status="Launched"
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
          status="Launched"
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

        <Project
          title="EmailMCP"
          image="/emailmcp.png"
          status="Launched"
          buttonText="Visit Website"
          buttonUrl="https://emailmcp.co"
        >
          <div className="mb-4">
            Your personal AI assistant that lives in your inbox. Research anything, remember everything, and never
            forget with reminders. Built on MCP (Model Context Protocol), the same standard powering Claude Desktop.
          </div>
        </Project>
        {/* <Project
          title="pointNG"
          image="/pointng_main_page.png"
          status="Prototype"
          buttonText="Visit Website"
          buttonUrl="https://www.pointng.io"
        >
          pointNG is a machine learning based innovation (patent pending) that uses neural networks to detect user location securely in the browser. I built the algorithms with <a href="https://www.brain.js.org">Brain.js</a> machine learning models and invented the "chaining" method that makes running neural networks possible and light in a browser environment.
        </Project> */}
        {/* <Project
          title="Hacker-AI"
          image="/hacker_ai.png"
          status="Launched"
          buttonText="Visit Website"
          buttonUrl="https://www.hacker-ai.com"
          flipped
        >
          <div className="mb-4">
          Hacker-AI uses machine learning to predict the success of Hacker News post titles. If you're uncertain about what title to use, trust statistical mathematics! Pre-test your "Show HN" titles and increase your chances of hitting high points in Hacker News. Built with <a href="https://brain.js.org">Brain.js</a>
          </div>
        </Project> */}
        <Project
          title="ConsoleChat.io"
          image="/consolechat.png"
          status="Launched"
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
          status="Launched"
          buttonText="Visit Website"
          buttonUrl="https://www.webecameshadows.com"
        >
          <div className="mb-4">
            A location-based web game built with Mapbox, node.js and socket.io. Escape and defend your position against
            bots that seek you on a real-life map.
          </div>
        </Project>
        {/* <Project
          title="Pixtu"
          image="/pixtu.png"
          status="Prototype"
          buttonText="Visit Website"
          buttonUrl="https://www.pixtu.io"
          flipped
        >
          Cookieless real-time lead conversion optimization tool that predicts whether your website visitors will buy or bounce. Read more from <a href="https://ihmissuti.medium.com/real-time-website-visitor-conversion-prediction-ddc13553a61a" target="_blank">this blog</a>.
        </Project> */}
        {/* <Project
          title="abtestcalculation.com"
          image="/abtestcalculation.png"
          status="Launched"
          buttonText="Visit Website"
          buttonUrl="http://www.abtestcalculation.com"
        >
          Calculate the results of your A/B or multivariate test and estimate the required duration to achieve statistical significance. Built with Vue.js
        </Project> */}
        {/* <Project
          title="Emobot.io"
          status="Prototype"
          buttonText="Visit Website"
          buttonUrl="https://emobot.io"
          image="/emo.png"
          flipped
        >
         Emotional chatbot that reacts to love confessions and insults. Made with <a href="https://www.rivescript.com/" target="_blank">RiveScript.</a>
        </Project> */}
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

function Project({ title, image, children, status, buttonUrl, buttonText, flipped = false }) {
  return (
    <div className={`py-12 ${flipped ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
      <div className={`max-w-5xl mx-auto px-4 md:px-0 md:flex ${flipped ? 'flex-row-reverse' : ''}`}>
        <div className="mb-8 md:mb-0 md:w-1/2 md:px-4">
          <div className="flex">
            <h2 className="inline-flex text-xl tracking-tight leading-10 font-bold sm:leading-none mr-4">
              <a href={buttonUrl}>{title}</a>
            </h2>
            <ProjectBadge>{status}</ProjectBadge>
          </div>
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

function ProjectBadge({ children }) {
  const color = getColor();

  function getColor() {
    if (/progress/i.test(children)) {
      return 'bg-yellow-100 text-yellow-800';
    }

    if (/launch/i.test(children)) {
      return 'bg-green-100 text-green-800';
    }

    return 'bg-gray-100 text-gray-800';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 ${color} m-auto ml-0`}
    >
      {children}
    </span>
  );
}

Home.favicon = '💾';

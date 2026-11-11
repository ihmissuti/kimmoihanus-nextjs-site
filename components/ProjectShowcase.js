export default function ProjectShowcase({ title, image, children, buttonUrl, buttonText, flipped = false }) {
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

export function ThingsIBuild() {
  return (
    <div>
      <div className={'max-w-5xl mx-auto mb-6 p-4'}>
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Things I build</h3>
        </div>
      </div>
      <ProjectShowcase
        title="Superlines"
        image="/superlines_2.png"
        buttonText="Visit Website"
        buttonUrl="https://www.superlines.io"
      >
        <div className="mb-4">
          AI Search Analytics for Marketers. Track and improve your brand's visibility across all major AI platforms
          like ChatGPT, Perplexity, Google AI Mode and more. Trusted by forward-thinking marketing teams globally.
        </div>
      </ProjectShowcase>

      <ProjectShowcase
        title="AI Search Index"
        image="/ui_1.png"
        buttonText="Visit Website"
        buttonUrl="https://www.aisearchindex.com"
        flipped
      >
        <div className="mb-4">
          Analytics that shows your AI traffic. ChatGPT, Perplexity, Claude and other AI agents visit your website every
          day. Traditional analytics can't see them. AI Search Index identifies 50+ AI crawlers and shows real-time
          agent vs human traffic split.
        </div>
      </ProjectShowcase>

      <ProjectShowcase
        title="EmailMCP"
        image="/emailmcp.png"
        buttonText="Visit Website"
        buttonUrl="https://emailmcp.co"
      >
        <div className="mb-4">
          Your personal AI assistant that lives in your inbox. Research anything, remember everything, and never forget
          with reminders. Built on MCP (Model Context Protocol), the same standard powering Claude Desktop.
        </div>
      </ProjectShowcase>
      <ProjectShowcase
        title="ConsoleChat.io"
        image="/consolechat.png"
        buttonText="Visit Website"
        buttonUrl="https://consolechat.io"
        flipped
      >
        <div className="mb-4">
          This project went viral and was featured on HackerNews. ConsoleChat turns the browser's console into a global
          real-time chat. If you're browsing a site that uses ConsoleChat.io you don't need to install any software -
          just open up your console and join the pit!
        </div>
      </ProjectShowcase>

      <ProjectShowcase
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
      </ProjectShowcase>
    </div>
  );
}

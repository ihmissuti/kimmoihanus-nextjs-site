import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import AboutText from '@/prose/about.md';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { personSchema } from '@/lib/personSchema';

const PAGE_URL = 'https://kimmoihanus.com/about';
const PAGE_TITLE = 'About Kimmo Ihanus';
const PAGE_DESCRIPTION =
  'Kimmo Ihanus — Helsinki songwriter behind Cometfall and rotwurm, and co-founder & CTO of Superlines.';
const OG_IMAGE = 'https://kimmoihanus.com/emo.png';

const faqs = [
  {
    question: 'Who is Kimmo Ihanus?',
    answer:
      'Kimmo Ihanus is a Helsinki songwriter and technical founder. He is the songwriter behind Cometfall and rotwurm, also releases as Amzart, Napalm Cunt, erizou and halogeist, and is co-founder and CTO of Superlines.',
  },
  {
    question: 'What is Superlines, and what did you build there?',
    answer:
      'Superlines is an AI search analytics platform that tracks brand visibility across ChatGPT, Perplexity, Gemini, Claude, and Google AI Mode. Kimmo Ihanus built the agentic infrastructure: more than 100 AI agents, plus the API and MCP.',
  },
  {
    question: 'Who is behind Cometfall?',
    answer:
      'Kimmo Ihanus is behind Cometfall. Cometfall is his solo project. There are no other members and no invented ones.',
  },
  {
    question: 'Do you use AI to make the music?',
    answer:
      'Yes. Kimmo Ihanus writes and composes the songs on guitar, bass or MIDI, and AI performs and produces them from his demos. It is not a prompt-and-publish pipeline. The long version is in Can You Make Real Music With AI? at https://kimmoihanus.com/posts/014-can-you-make-real-music-with-ai.',
  },
  {
    question: 'Are you available to talk about GEO / AI search?',
    answer:
      'Yes. Kimmo Ihanus is available to talk about GEO, AI search, growth, and also music or press. Reach him on X at https://x.com/ihmissuti, LinkedIn, or kimmo@superlines.io.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function About() {
  return (
    <Wrapper>
      <NextSeo
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical={PAGE_URL}
        openGraph={{
          url: PAGE_URL,
          title: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          type: 'profile',
          images: [{ url: OG_IMAGE, width: 512, height: 512, alt: 'Kimmo Ihanus' }],
          profile: {
            firstName: 'Kimmo',
            lastName: 'Ihanus',
          },
        }}
        twitter={{
          handle: '@ihmissuti',
          site: '@ihmissuti',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema({ url: PAGE_URL })) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <div className="flex items-start gap-5 mb-8">
        <img src="/emo.png" alt="Kimmo Ihanus" width={96} height={96} className="w-24 h-24 rounded-lg flex-shrink-0" />
        <Heading>Kimmo Ihanus</Heading>
      </div>

      <div className="prose">
        <AboutText />

        <h2>FAQ</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>
              {faq.question === 'Do you use AI to make the music?' ? (
                <>
                  Yes. Kimmo Ihanus writes and composes the songs on guitar, bass or MIDI, and AI performs and produces
                  them from his demos. It is not a prompt-and-publish pipeline. The long version is in{' '}
                  <Link href="/posts/014-can-you-make-real-music-with-ai">
                    <a>Can You Make Real Music With AI?</a>
                  </Link>
                  .
                </>
              ) : faq.question === 'Are you available to talk about GEO / AI search?' ? (
                <>
                  Yes. Kimmo Ihanus is available to talk about GEO, AI search, growth, and also music or press. Reach
                  him on <a href="https://x.com/ihmissuti">X</a>,{' '}
                  <a href="https://www.linkedin.com/in/kimmo-ihanus-8175aa56/">LinkedIn</a>, or{' '}
                  <a href="mailto:kimmo@superlines.io">kimmo@superlines.io</a>.
                </>
              ) : (
                faq.answer
              )}
            </p>
          </div>
        ))}

        <h2>Get in touch</h2>
        <p>GEO, AI search, growth — and music or press. Same inbox.</p>
        <ul>
          <li>
            <a href="https://x.com/ihmissuti">X @ihmissuti</a>
          </li>
          <li>
            <a href="https://github.com/ihmissuti">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kimmo-ihanus-8175aa56/">LinkedIn</a>
          </li>
          <li>
            <a href="mailto:kimmo@superlines.io">kimmo@superlines.io</a>
          </li>
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/cv">
          <a className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            View full CV →
          </a>
        </Link>
      </div>
    </Wrapper>
  );
}

About.favicon = '👾';

import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import AboutText from '@/prose/about.md';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function About() {
  return (
    <Wrapper>
      <NextSeo
        title="About Kimmo Ihanus"
        description="Co-Founder & CTO at Superlines. Technical founder and AI expert with 15+ years of experience in AI, marketing, and data."
      />
      <Heading className="mb-8">Technical Founder & AI Expert from Helsinki, Finland.</Heading>

      <div className="prose">
        <AboutText />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link href="/cv">
          <a className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            View Full CV →
          </a>
        </Link>
      </div>
    </Wrapper>
  );
}

About.favicon = '👾';

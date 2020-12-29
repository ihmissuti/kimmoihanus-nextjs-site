import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import AboutText from '@/prose/about.md';
import { NextSeo } from 'next-seo';

export default function About() {
  return (
    <Wrapper>
      <NextSeo
        title="About Kimmo Ihanus"
        description="A Full Stack Hacker from Helsinki, Finland."
      />
      <Heading className="mb-8">A Full Stack Hacker from Helsinki, Finland.</Heading>

      <div className="prose">
        <AboutText />
      </div>
    </Wrapper>
  );
}

About.favicon = '👾';

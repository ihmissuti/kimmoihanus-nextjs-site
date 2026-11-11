import Link from 'next/link';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { getPosts } from '@/lib/posts';
import { getGraphics } from '@/lib/graphics';
import { spearheadProjects } from '@/lib/music';
import { releasesFor } from '@/lib/releases';
import { personSchema } from '@/lib/personSchema';

import GraphicPreview from '@/components/GraphicsPreview';
import MusicProjectCard from '@/components/MusicProjectCard';
import styles from '@/css/graphics.module.css';
import PostListItem from '@/components/PostListItem';

const DESCRIPTION =
  'Songwriter behind Cometfall and rotwurm, from Helsinki. I write and compose the songs on guitar, bass or MIDI, and AI performs and produces them from my demos. Also Co-Founder & CTO at Superlines.';

export async function getStaticProps() {
  const [posts, graphics] = await Promise.all([getPosts(), getGraphics()]);
  const releases = Object.fromEntries(spearheadProjects.map((project) => [project.slug, releasesFor(project.slug)]));

  return {
    props: {
      posts: posts.slice(0, 5),
      graphics: graphics.slice(0, 5),
      releases,
    },
  };
}

export default function Home({ posts, graphics, releases }) {
  return (
    <div className="mt-8">
      <NextSeo title="Kimmo Ihanus" description={DESCRIPTION} canonical="https://kimmoihanus.com/" />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
      </Head>
      <div className="max-w-3xl mx-auto mb-6 p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">Kimmo Ihanus</h1>
          <p className="text-2xl font-bold leading-snug mb-4">
            Songwriter behind Cometfall and rotwurm. Helsinki, Finland.
          </p>
          <p className="font-medium leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
            I write and compose the songs on guitar, bass or MIDI. AI performs and produces them from my demos.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Also: Co-Founder &amp; CTO at{' '}
            <a href="https://www.superlines.io" className="underline">
              Superlines
            </a>
            .{' '}
            <Link href="/cv">
              <a className="font-medium hover:underline">Work &amp; CV →</a>
            </Link>{' '}
            <Link href="/about">
              <a className="font-medium hover:underline ml-2">About me →</a>
            </Link>
          </p>
        </div>
      </div>

      {/* Music stage — always dark, styled after the artist sites */}
      <div className="music-stage">
        <div className="max-w-3xl mx-auto p-4 py-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#e8622c' }}>
            My ideas brought alive — Helsinki, FI
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-10">Music</h2>

          <div className="space-y-6 mb-12">
            {spearheadProjects.map((project) => (
              <MusicProjectCard
                key={project.name}
                project={project}
                size="featured"
                releases={releases[project.slug]}
              />
            ))}
          </div>

          <Link href="/music">
            <a className="font-mono text-sm uppercase tracking-widest text-white hover:underline">
              Amzart, Napalm Cunt, erizou, halogeist, demos &amp; song stories →
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

Home.favicon = '🎸';

import Heading from '@/components/Heading';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Graphic from '@/components/Graphics';
import { useKeyboard } from '@/lib/use-keyboard';
import { NextSeo } from 'next-seo';
import styles from '@/css/graphics.module.css';
import GraphicPreview from '@/components/GraphicsPreview';
import { useEffect } from 'react';
import { useMedia } from '@/lib/use-media';
import { getGraphics } from '@/lib/graphics';
import Wrapper from '@/components/Wrapper';

Modal.setAppElement('#__next');

export async function getStaticProps() {
  const graphics = await getGraphics();

  return {
    props: {
      graphics,
    },
  };
}

export default function Graphics({ graphics }) {
  const router = useRouter();

  const isModalOpen = Boolean(router.query.graphicSlug);
  const isScrollActive = Boolean(router.query.graphicSlugScroll);

  const graphicLinkParam = useMedia(['(min-width: 768px)'], ['graphicSlug'], 'graphicSlugScroll');

  useKeyboard('ArrowRight', () => navigateGraphic());
  useKeyboard('ArrowLeft', () => navigateGraphic(-1));

  useEffect(() => {
    if (router.query.graphicSlugScroll) {
      const item = document.getElementById(router.query.graphicSlugScroll);
      window.scroll({ top: item.offsetTop });
    }
  }, [router.query.graphicSlugScroll]);

  /**
   * Allow the user to navigate the graphics on desktop using arrow keys.
   *
   * @param {number} direction
   */
  function navigateGraphic(direction = 1) {
    if (!isModalOpen || !graphics) return;

    const currentGraphic = router.query.graphicSlug;
    const index = graphics.findIndex((graphic) => graphic.slug === currentGraphic);

    if (index + direction === graphics.length || index + direction == -1) return;

    const newSlug = graphics[index + direction].slug;

    router.push(`/graphics?graphicSlug=${newSlug}`, `/graphics/${newSlug}`, { shallow: true });
  }

  return (
    <Wrapper>
      <NextSeo title="Graphics" />
      <Heading className="mb-8">Graphics</Heading>

      <p className="mb-8">
        Back in 2015—years before AI image generators like DALL-E and Midjourney existed—I discovered the creative
        potential of mobile photo editing apps. Armed with just an iPhone, iPad, and apps like Pixite, I spent countless
        hours crafting these surreal compositions. A reminder that creative experimentation doesn't require the latest
        tech.
      </p>

      {isScrollActive ? (
        <ul className="-mx-4 bg-white">
          {graphics.map((graphic) => (
            <li id={graphic.slug} key={graphic.slug} className="mb-4">
              <Graphic graphic={graphic} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-3 mt-4 gap-1 md:gap-6 -mx-4 md:mx-0">
          {graphics.map((graphic) => (
            <Link
              key={graphic.slug}
              href={`/graphics?${graphicLinkParam}=${graphic.slug}`}
              as={`/graphics/${graphic.slug}`}
              shallow={true}
            >
              <a className={styles['graphic-preview']}>
                <GraphicPreview graphic={graphic} />
              </a>
            </Link>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => router.push('/graphics')}
        contentLabel="Graphic modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0',
            right: 'auto',
            bottom: 'auto',
            padding: 0,
            border: 'none',
            width: '65vw',
          },
        }}
      >
        <Graphic
          slug={router.query.graphicSlug}
          graphic={graphics.find((graphic) => graphic.slug === router.query.graphicSlug)}
        />
      </Modal>
    </Wrapper>
  );
}

Graphics.favicon = '🖌️';

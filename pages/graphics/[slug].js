import { getGraphics, getGraphic } from '@/lib/graphics';
import Graphic from '@/components/Graphics';
import { NextSeo } from 'next-seo';

export async function getStaticPaths() {
  const graphics = await getGraphics();
  const paths = graphics.map((graphic) => ({
    params: {
      slug: graphic.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const graphic = await getGraphic(slug);

  return {
    props: {
      graphic,
    },
  };
}

export default function GraphicView({ graphic }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <NextSeo
        title={`Graphic from ${new Date(graphic.date).toDateString()}`}
        openGraph={{ images: [{ url: graphic.image }] }}
        description={graphic.bodyRaw}
      />
      <Graphic className="shadow mx-auto" graphic={graphic} />
    </div>
  );
}

GraphicView.favicon = '📸';

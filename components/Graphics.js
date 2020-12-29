import Loading from './Loading';
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { HiShare } from 'react-icons/hi'
import { mergeClasses } from '@/lib/utils';
import styles from '@/css/graphics.module.css';

export default function Graphics({ graphic, className }) {
  if (!graphic) return <Loading />;

  return (
    <div className={mergeClasses('md:flex w-full', styles.graphic, className)}>
      <div
        className="md:w-2/3 flex-grow-0 flex items-center justify-center bg-black overflow-hidden"
        style={{ maxHeight: '95vh' }}
      >
        <GraphicMedia graphic={graphic} />
      </div>
      <div className="md:w-1/3 flex-shrink-0 p-4 bg-white dark:bg-gray-800">
        <article className="flex flex-col justify-between h-full">
          <div className="mb-2 prose text-sm" dangerouslySetInnerHTML={{ __html: graphic.body }}></div>

          <footer>
            <GraphicActions
              graphic={graphic}
            />
            <time className="text-xs text-gray-800 dark:text-gray-200" dateTime={graphic.date}>
              {new Date(graphic.date).toLocaleDateString()}
            </time>
          </footer>
        </article>
      </div>
    </div>
  );
}

function GraphicMedia({ graphic, onDoubleClick }) {
  if (graphic.video) return <GraphicVideoMedia graphic={graphic} />;

  return (
    <img
      src={graphic.image}
      alt={graphic.alt || 'Graphics from Josh Larson'}
      loading="lazy"
      onDoubleClick={onDoubleClick}
    />
  );
}

function GraphicVideoMedia({ graphic }) {
  if (/youtube/.test(graphic.video)) {
    return <YouTubeVideo graphic={graphic} />;
  }

  if (/vimeo/.test(graphic.video)) {
    return <VimeoVideo graphic={graphic} />;
  }

  return <p className="text-white">Player not yet supported.</p>;
}

function YouTubeVideo({ graphic }) {
  const videoId = new URL(graphic.video).searchParams.get('v');

  return (
    <iframe
      width="640"
      height="390"
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

function VimeoVideo({ graphic }) {
  const videoId = new URL(graphic.video).pathname.replace(/^\//, '');
  return (
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      width="640"
      height="390"
      frameBorder="0"
      webkitallowfullscreen
      mozallowfullscreen
      allowFullScreen
    ></iframe>
  );
}

function GraphicActions({ graphic }) {


  const canShare = Boolean(navigator.share);

  async function share() {
    const url = `https://${new URL(window.location).hostname}/graphics/${graphic.slug}`;
    const graphicDate = new Date(graphic.date).toDateString();

    try {
      await navigator.share({
        url,
        title: `Graphic from ${graphicDate}`,
        text: `Check out this Graphic from ${graphicDate}`,
      });
    } catch (e) {
      // Share sheet was probably closed
    }
  }

  return (
    <div className="mb-2 text-sm">
      <div className="flex items-center mb-1">
        {canShare && (
          <button onClick={share}>
            <HiShare className="w-7 h-7 mr-2 dark:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}

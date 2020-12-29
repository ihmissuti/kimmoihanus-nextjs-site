import styles from '@/css/graphics.module.css';
import { HiHeart } from 'react-icons/hi'
import { HiPlay } from 'react-icons/hi'

export default function GraphicPreview({ graphic }) {
  return (
    <div className="pt-full h-0 relative overflow-hidden">
      <img
        src={graphic.image}
        alt="Preview of Graphic"
        loading="lazy"
        className="max-w-none absolute w-full h-full inset-0 object-cover object-center"
      />
      <TypeOverlay graphic={graphic} />
    </div>
  );
}


function TypeOverlay({ graphic }) {
  return (
    <div className="top-0 right-0 absolute p-2">
      <TypeIcon graphic={graphic} />
    </div>
  );
}

function TypeIcon({ graphic }) {
  const classList = 'w-5 h-5 text-white fill-current opacity-75';

  if (graphic.video) {
    return <HiPlay className={classList} />;
  }

  return null;
}

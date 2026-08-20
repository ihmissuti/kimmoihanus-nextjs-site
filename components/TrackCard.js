import { useState } from 'react';
import { soundcloudEmbed } from '@/lib/music';

// Dark numbered track card matching the artist-site track lists
// (e.g. "01 Eight Hundred — Listen on SoundCloud ↗" on ihmissuti.com).
export default function TrackCard({ track, index }) {
  const [showDemo, setShowDemo] = useState(false);
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="rounded-lg p-6 mb-6 border" style={{ backgroundColor: '#0d0d0d', borderColor: '#262626' }}>
      <div className="flex items-baseline gap-3 mb-4">
        {typeof index === 'number' && (
          <span className="font-mono text-sm" style={{ color: '#525252' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <h3 className="text-xl font-bold tracking-tight text-white flex-1">{track.title}</h3>
        {track.project && (
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#6b7280' }}>
            as {track.project}
          </span>
        )}
      </div>

      <div className="mb-4">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          loading="lazy"
          src={soundcloudEmbed(track.soundcloudUrl)}
          className="rounded"
          title={track.title}
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {track.demoSoundcloudUrl && (
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 music-stage-link"
          >
            <span className={`inline-block transform transition-transform ${showDemo ? 'rotate-90' : ''}`}>
              &#9654;
            </span>
            Based on demo: {track.demoName}
          </button>
        )}

        {track.story && (
          <button
            onClick={() => setShowStory(!showStory)}
            className="font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 music-stage-link"
          >
            <span className={`inline-block transform transition-transform ${showStory ? 'rotate-90' : ''}`}>
              &#9654;
            </span>
            Behind the song
          </button>
        )}
      </div>

      {showDemo && track.demoSoundcloudUrl && (
        <div className="mt-3">
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            loading="lazy"
            src={soundcloudEmbed(track.demoSoundcloudUrl)}
            className="rounded"
            title={`${track.demoName} (demo)`}
          />
        </div>
      )}

      {showStory && track.story && (
        <div className="mt-4 pl-4 border-l-2" style={{ borderColor: '#262626' }}>
          <p className="text-sm italic mb-3" style={{ color: '#9ca3af' }}>
            {track.story.subtitle}
          </p>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#d1d5db' }}>
            {track.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

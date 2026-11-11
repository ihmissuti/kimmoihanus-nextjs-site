// Dark "stage" tile matching the artist sites (amzartmusic.com,
// ihmissuti.com, cometfallmusic.com): near-black surface, per-project
// accent color, monospace uppercase labels.

import { formatReleaseDate } from '@/lib/releases';

const SOCIAL_KINDS = ['instagram', 'tiktok', 'youtube'];

function linkKind(link) {
  if (link.kind) return link.kind;
  const label = (link.label || '').toLowerCase();
  if (label === 'spotify' || label === 'listen') return 'spotify';
  if (label === 'website' || label === 'artist site' || label === 'site') return 'site';
  if (label === 'instagram') return 'instagram';
  if (label === 'tiktok') return 'tiktok';
  if (label === 'youtube') return 'youtube';
  if (label === 'soundcloud') return 'soundcloud';
  return 'other';
}

function SocialIcon({ kind }) {
  const common = {
    className: 'w-4 h-4',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  };

  if (kind === 'instagram') {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.2 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    );
  }

  if (kind === 'tiktok') {
    return (
      <svg {...common}>
        <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v2.4c-1.5 0-2.9-.5-4.1-1.3v6.7c0 3.4-2.6 6.2-6 6.5A6.3 6.3 0 0 1 3 15.7c.3-3.4 3.2-6 6.6-6 .4 0 .9 0 1.3.1v2.6a3.7 3.7 0 0 0-1.3-.2 3.6 3.6 0 0 0-3.6 4 3.6 3.6 0 0 0 6.1 2.5V3h2.4z" />
      </svg>
    );
  }

  if (kind === 'youtube') {
    return (
      <svg {...common}>
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.6V8.8l6.2 3.4-6.2 3.4z" />
      </svg>
    );
  }

  return null;
}

function ReleaseRow({ label, release, accent }) {
  if (!release) return null;
  const title = release.spotify_url ? (
    <a href={release.spotify_url} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
      {release.title}
    </a>
  ) : (
    <span className="text-white">{release.title}</span>
  );
  return (
    <p>
      <span className="font-mono text-xs uppercase tracking-widest mr-2" style={{ color: accent }}>
        {label}
      </span>
      {title}
      <span style={{ color: '#9ca3af' }}>
        {' '}
        · {release.label || (release.type === 'album' ? 'album' : 'single')} · {formatReleaseDate(release.date)}
      </span>
    </p>
  );
}

export default function MusicProjectCard({ project, size = 'featured', releases = null }) {
  const accent = project.accent || '#e8622c';
  const compact = size === 'compact';
  const links = project.links || [];
  const listen = links.find((link) => {
    const kind = linkKind(link);
    return kind === 'spotify' || kind === 'soundcloud';
  });
  const site = links.find((link) => linkKind(link) === 'site');
  const socials = links.filter((link) => SOCIAL_KINDS.includes(linkKind(link))).slice(0, 3);
  const extras = links.filter((link) => {
    const kind = linkKind(link);
    return !['spotify', 'soundcloud', 'site', ...SOCIAL_KINDS].includes(kind);
  });

  const cardStyle = project.walled
    ? { backgroundColor: '#080000', borderColor: '#3d1510' }
    : { backgroundColor: '#0d0d0d', borderColor: '#262626' };

  return (
    <div className={`rounded-lg flex flex-col border ${compact ? 'p-4' : 'p-6 md:p-8'}`} style={cardStyle}>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3 className={`font-black tracking-tight text-white ${compact ? 'text-lg' : 'text-3xl'}`}>{project.name}</h3>
        {project.comingSoon && (
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#6b7280' }}>
            Coming soon
          </span>
        )}
      </div>

      {!compact && project.genres && project.genres.length > 0 && (
        <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>
          {project.genres.join(' · ')}
        </p>
      )}

      <p className={`flex-1 ${compact ? 'text-sm mb-3' : 'mb-5'}`} style={{ color: '#9ca3af' }}>
        {project.tagline}
      </p>

      {!compact && releases && (releases.latest || releases.next) && (
        <div className="mb-6 space-y-2 text-sm" style={{ color: '#d1d5db' }}>
          <ReleaseRow label="Latest" release={releases.latest} accent={accent} />
          <ReleaseRow label="Next" release={releases.next} accent={accent} />
        </div>
      )}

      {(listen || site || socials.length > 0 || extras.length > 0) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {listen && (
            <a
              href={listen.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest transition-colors music-stage-link"
            >
              {listen.label} ↗
            </a>
          )}
          {site && (
            <a
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest transition-colors music-stage-link"
            >
              {site.label} ↗
            </a>
          )}
          {extras.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest transition-colors music-stage-link"
            >
              {link.label} ↗
            </a>
          ))}
          {socials.length > 0 && (
            <div className="flex items-center gap-3 ml-auto">
              {socials.map((link) => (
                <a
                  key={linkKind(link)}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors music-stage-link"
                  aria-label={`${project.name} on ${link.label}`}
                >
                  <SocialIcon kind={linkKind(link)} />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Dark "stage" tile matching the artist sites (amzartmusic.com,
// ihmissuti.com, cometfallmusic.com): near-black surface, per-project
// accent color, monospace uppercase labels.
export default function MusicProjectCard({ project }) {
  const accent = project.accent || '#e8622c';

  return (
    <div className="rounded-lg p-5 flex flex-col border" style={{ backgroundColor: '#0d0d0d', borderColor: '#262626' }}>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3 className="text-xl font-black tracking-tight text-white">{project.name}</h3>
        {project.home && (
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#6b7280' }}>
            Home base
          </span>
        )}
        {project.comingSoon && (
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#6b7280' }}>
            Coming soon
          </span>
        )}
      </div>
      {project.genres && project.genres.length > 0 && (
        <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>
          {project.genres.join(' · ')}
        </p>
      )}
      <p className="text-sm mb-5 flex-1" style={{ color: '#9ca3af' }}>
        {project.tagline}
      </p>
      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {project.links.map((link) => (
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
        </div>
      )}
    </div>
  );
}

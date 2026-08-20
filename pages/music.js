import MusicProjectCard from '@/components/MusicProjectCard';
import TrackCard from '@/components/TrackCard';
import { projects, tracks, orphanGenres } from '@/lib/music';
import { NextSeo } from 'next-seo';

function SectionHeading({ eyebrow, children }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: '#e8622c' }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white">{children}</h2>
    </div>
  );
}

export default function Music() {
  return (
    <div className="music-stage">
      <NextSeo
        title="Music - Kimmo Ihanus"
        description="The music of Kimmo Ihanus (ihmissuti) — indie rock, rap, reggae, progressive house, black metal and everything in between, released across projects like Cometfall, Amzart, erizou, halogeist, Shaky Dope, rotwurm and DJ KLMA. Listen on Spotify and SoundCloud, and read the stories behind the songs."
      />

      <div className="max-w-3xl mx-auto p-4 py-16">
        {/* Hero */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#e8622c' }}>
            Kimmo Ihanus — My ideas brought alive
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-5">Music</h1>
          <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: '#737373' }}>
            Indie rock · Rap · Reggae · Progressive house · Alt rock · Everything in between
          </p>
          <p className="mb-4 max-w-2xl" style={{ color: '#9ca3af' }}>
            Tracks span genres, projects and artist names. Some grew from ideas I had 20 years ago. Some are oven-fresh.
          </p>
          <p style={{ color: '#9ca3af' }}>Made in Helsinki, Finland. 🇫🇮</p>
        </div>

        <section className="mb-16">
          <SectionHeading eyebrow="Projects">Artists &amp; projects</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <MusicProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="No fixed address">Orphan songs &amp; genres</SectionHeading>
          <p className="mb-6 max-w-2xl" style={{ color: '#9ca3af' }}>
            Not everything fits a project. These songs and genre experiments live in the{' '}
            <a
              href="https://soundcloud.com/ihmissuti"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              main SoundCloud
            </a>{' '}
            without a home of their own.
          </p>
          <ul className="space-y-3">
            {orphanGenres.map((genre) => (
              <li key={genre.label} className="pl-4 border-l-2" style={{ borderColor: '#262626' }}>
                <span className="font-medium text-white">{genre.label}</span>
                {genre.detail && (
                  <span className="text-sm" style={{ color: '#9ca3af' }}>
                    {' '}
                    — {genre.detail}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="From demo to full production">Songs &amp; stories</SectionHeading>
          <p className="mb-8 max-w-2xl" style={{ color: '#9ca3af' }}>
            A selection of tracks from the ihmissuti catalogue. Open &quot;Based on demo&quot; to hear the original
            rough recording, or &quot;Behind the song&quot; to read where it came from.
          </p>
          {tracks.map((track, i) => (
            <TrackCard key={track.title} track={track} index={i} />
          ))}
        </section>

        <section>
          <SectionHeading eyebrow="Process">How the music gets made</SectionHeading>
          <div className="space-y-4 max-w-2xl" style={{ color: '#9ca3af' }}>
            <p>
              I write the lyrics and build the melodies and structures with guitar, MIDI, tab, home recording,
              GarageBand and rehearsal-room recordings. Most vocals and final production are done with Suno. Some tracks
              use MIDI and demo recordings dating back to 2005. Most are brand new.
            </p>
            <p>
              Lyrics take inspiration from literature, cosmic ideas, imaginary characters, psychedelia, horror fantasy —
              or just words put in an order that feels right for the song. Writers I keep coming back to: Dylan Thomas
              and Christopher Buehlman.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

Music.favicon = '\uD83C\uDFB5';

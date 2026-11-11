import MusicProjectCard from '@/components/MusicProjectCard';
import TrackCard from '@/components/TrackCard';
import {
  spearheadProjects,
  otherProjects,
  archiveProjects,
  storyGroups,
  orphanGenres,
  demosPlaylist,
} from '@/lib/music';
import { releasesFor } from '@/lib/releases';
import { NextSeo } from 'next-seo';

export async function getStaticProps() {
  const releases = Object.fromEntries(
    [...spearheadProjects, ...otherProjects]
      .filter((project) => !project.hideReleases)
      .map((project) => [project.slug, releasesFor(project.slug)])
  );
  return { props: { releases } };
}

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

export default function Music({ releases }) {
  return (
    <div className="music-stage">
      <NextSeo
        title="Music - Kimmo Ihanus"
        description="Cometfall and rotwurm, plus Amzart, Napalm Cunt, erizou, halogeist and my own demos. How the songs are made, and the stories behind them. Helsinki, Finland."
      />

      <div className="max-w-3xl mx-auto p-4 py-16">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#e8622c' }}>
            Kimmo Ihanus — My ideas brought alive
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">Music</h1>
          <p className="mb-4 max-w-2xl text-lg" style={{ color: '#d1d5db' }}>
            I release under a few names. The two I&apos;m pushing now are Cometfall and rotwurm. The other projects and
            my own demos are below.
          </p>
          <p className="mb-4 max-w-2xl" style={{ color: '#9ca3af' }}>
            I write and compose the songs on guitar, bass or MIDI. AI performs and produces them from my demos.
          </p>
          <p style={{ color: '#9ca3af' }}>Made in Helsinki, Finland. 🇫🇮</p>
        </div>

        <section className="mb-16">
          <SectionHeading eyebrow="2026">Cometfall &amp; rotwurm</SectionHeading>
          <div className="space-y-6">
            {spearheadProjects.map((project) => (
              <MusicProjectCard
                key={project.name}
                project={project}
                size="featured"
                releases={releases[project.slug]}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="Also releasing as">Other projects</SectionHeading>
          <div className="space-y-6">
            {otherProjects.map((project) => (
              <MusicProjectCard
                key={project.name}
                project={project}
                size="featured"
                releases={releases[project.slug] || null}
              />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <SectionHeading eyebrow="No AI">My own demos</SectionHeading>
          <div className="rounded-lg border p-6 md:p-8" style={{ backgroundColor: '#0d0d0d', borderColor: '#262626' }}>
            <h3 className="font-black tracking-tight text-white text-2xl mb-2">{demosPlaylist.title}</h3>
            <p className="mb-5" style={{ color: '#9ca3af' }}>
              {demosPlaylist.description}
            </p>
            <a
              href={demosPlaylist.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest transition-colors music-stage-link"
            >
              SoundCloud playlist ↗
            </a>
          </div>
        </section>

        <section className="mb-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#737373' }}>
            Older and smaller names
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {archiveProjects.map((project) => (
              <MusicProjectCard key={project.name} project={project} size="compact" />
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
          <p className="mb-10 max-w-2xl" style={{ color: '#9ca3af' }}>
            Tracks that carry a story — from the projects I&apos;m pushing now, then a few from the archive. Open
            &quot;Based on demo&quot; to hear the original rough recording, or &quot;Behind the song&quot; to read where
            it came from.
          </p>
          {storyGroups.map((group) => (
            <div key={group.heading} className="mb-10">
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: '#737373' }}>
                {group.heading}
              </p>
              {group.tracks.map((track) => (
                <TrackCard key={track.title} track={track} showProject={false} />
              ))}
            </div>
          ))}
        </section>

        <section>
          <SectionHeading eyebrow="Process">How the music gets made</SectionHeading>
          <div className="space-y-4 max-w-2xl" style={{ color: '#9ca3af' }}>
            <p>
              I write and compose the songs. Melodies and structures start on guitar, bass, MIDI, tab, home recording,
              GarageBand and rehearsal-room recordings. AI performs and produces them from those demos: most vocals and
              the final production are done with Suno. Some tracks use MIDI and demo recordings dating back to 2005.
              Most are brand new.
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

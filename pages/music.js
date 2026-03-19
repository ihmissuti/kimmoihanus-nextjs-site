import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

const tracks = [
  {
    title: 'Lunar',
    sunoId: '533e5e69-4c3d-4124-b29c-e97e80985523',
    demoSoundcloudUrl: 'https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A245771692',
    demoName: 'Space Odysseia',
    story: {
      subtitle: '10 Years in the Making',
      paragraphs: [
        'Some songs come together quickly. This one took ten years.',
        'In 2016 I came up with a simple bass line that I got kind of obsessed with. At the time I thought it would work as a nu-metal or rap track, but as I kept adding elements to it the direction slowly shifted toward pop-rock with a danceable groove.',
        'The original demo had the bass played pretty badly, but I never bothered fixing it \u2014 I just kept building on top of it anyway.',
        'The track sat unfinished for years until 2026 when I decided to finally wrap it up. I wrote some lyrics that are admittedly a bit cheesy, produced the vocals with Suno, and the result ended up being pretty much exactly what I had in mind when I first started messing around with that bass line a decade ago.',
        'Better late than never.',
      ],
    },
  },
  {
    title: 'Orange Jang',
    sunoId: 'a9684a18-a43c-48b7-94b9-25abba784d13',
    demoSoundcloudUrl: 'https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A245848382',
    demoName: 'Orange Jang',
    story: {
      subtitle: 'Chasing a Bigger Sound',
      paragraphs: [
        'Orange Jang was originally recorded around 2016. It all started with the melody you can hear in the background during the final climax of the demo \u2014 that was the seed the whole song grew from.',
        'Once that melody existed, the rest of the pieces came together surprisingly easily. In my head, the song was complete pretty quickly.',
        'The problem was getting it to actually sound the way it sounded in my head. I wanted something big \u2014 movie soundtrack big. For years I kept coming back to it, trying different approaches, but it never quite got there.',
        'Now it finally sounds like it should.',
      ],
    },
  },
  {
    title: 'Ash in the Hourglass',
    sunoId: '5aa2d232-29e6-4745-86a4-04158ba035bf',
    demoSoundcloudUrl: 'https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A173887372',
    demoName: 'Camp Song',
    story: {
      subtitle: 'The Best Thing That Came Out of Me',
      paragraphs: [
        'This song was originally recorded in 2015. The first thing I came up with was the guitar melody that kicks in right after the intro. To be honest, I still think it\u2019s one of the best things that has musically come out of me.',
        'Once that melody was there, the rest of the song followed easily. Our band\u2019s keyboard player \u2014 who is a far better bass, guitar, and all-around player than me \u2014 helped with the original demo. He played the drums and the slide guitars, and helped mix it by running the whole thing through cassette, which I think works brilliantly.',
        'I actually think the overall atmosphere of the original demo is better than the latest version. But in the new version I managed to produce singing vocals that I\u2019d always imagined this song should have. That was the missing piece.',
      ],
    },
  },
];

function TrackCard({ track }) {
  const [showDemo, setShowDemo] = useState(false);
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{track.title}</h3>

      <div className="mb-4">
        <iframe
          src={`https://suno.com/embed/${track.sunoId}`}
          width="100%"
          height="240"
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded"
          title={track.title}
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
        >
          <span className={`inline-block transform transition-transform ${showDemo ? 'rotate-90' : ''}`}>&#9654;</span>
          Based on demo: {track.demoName}
        </button>

        {track.story && (
          <button
            onClick={() => setShowStory(!showStory)}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
          >
            <span className={`inline-block transform transition-transform ${showStory ? 'rotate-90' : ''}`}>
              &#9654;
            </span>
            Behind the song
          </button>
        )}
      </div>

      {showDemo && (
        <div className="mt-3">
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${track.demoSoundcloudUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
            className="rounded"
            title={`${track.demoName} (demo)`}
          />
        </div>
      )}

      {showStory && track.story && (
        <div className="mt-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">{track.story.subtitle}</p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {track.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Music() {
  return (
    <Wrapper>
      <NextSeo
        title="Music - Kimmo Ihanus"
        description="Songs and demos by Kimmo Ihanus. From bass line ideas to finished tracks — listen to the music and read the stories behind them."
      />

      <Heading className="mb-4">Music</Heading>

      <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
        These songs started as rough demos recorded on phones and in GarageBand sessions, and eventually became full
        productions with the help of AI tools like Suno. Click "Based on demo" to hear what they sounded like before.
      </p>

      <section className="mb-12">
        {tracks.map((track) => (
          <TrackCard key={track.title} track={track} />
        ))}
      </section>
    </Wrapper>
  );
}

Music.favicon = '\uD83C\uDFB5';

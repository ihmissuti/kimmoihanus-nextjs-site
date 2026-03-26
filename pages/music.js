import Wrapper from '@/components/Wrapper';
import Heading from '@/components/Heading';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

const tracks = [
  {
    title: 'Eight Hundred',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/eight-hundred',
    demoSoundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/800mg-demo',
    demoName: '800mg',
    story: {
      subtitle: 'Golden Stripes and Painkillers',
      paragraphs: [
        'For a long time I\'d been playing around with a simple guitar melody that shifts between two parts. I never actually thought about turning it into a full song until I heard LL Cool J\'s "30 Decembers", which samples riffs and melodies from Wigwam\'s "Lucky Golden Stripes and Starpose". That\'s when I decided to try to use these guitars in a rap song — I just sucked at making one.',
        'The original guitar demo was called 800mg. Not because I was into substances or anything like that, but because during the time I recorded it, I had a really bad case of tendonitis in my arm from nonstop coding, rehearsing, and recording. I had a prescription for some basic painkillers, and the dosage was 800 mg. I noticed the "800 mg" printed on the prescription paper lying nearby and used it as the file name when I saved the demo.',
        'Later, when I started writing the lyrics, I kept recycling that "Eight Hundred" theme and even put some "Golden Stripes" themes in there. In the lyrics, we\'re flexing the idea that "Eight Hundred is a lot," leaving it open for everyone to interpret in their own way.',
      ],
    },
  },
  {
    title: 'Lunar',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/lunar',
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
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/the-orange-jang',
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
    title: 'Summer Breeze',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/summer-breeze',
    demoSoundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/summer-breeze-demo',
    demoName: 'Summer Breeze (demo)',
    story: {
      subtitle: 'From Death Metal to Feel-Good Pop Rock',
      paragraphs: [
        '"Summer Breeze" is the kind of track that would probably never end up on my own playlist considering the style and genre, but I still consider it a really cool song that I\u2019ve always wanted to finish.',
        'The main riff is really old, and the original demos were recorded back in 2014. The whole song has essentially been there since those early days: the instruments, lyrics, and vocal melodies. I just never managed to fully produce it until now.',
        'What finally made it possible was using Suno to sing the missing vocals, based on the demo melodies and lyrics I had recorded.',
        'I\u2019m no Katy Perry, obviously, but maybe it distantly sounds a little like one of her songs.',
      ],
    },
  },
  {
    title: 'Ash in the Hourglass',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/ash-in-the-hourglass',
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
  {
    title: 'Afterslit',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/afterslit',
    demoSoundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/afterslit-demo',
    demoName: 'Afterslit (demo)',
    story: {
      subtitle: 'Blues, Garage Rock, and Mud',
      paragraphs: [
        'Afterslit was recorded in 2015. The song relies on this blues and garage rock riff that just rolls throughout the whole thing.',
        'I still think the original demo has a kind of cool, muddy sound to it \u2014 although my playing on it is not anywhere near satisfying.',
      ],
    },
  },
  {
    title: 'Let Me Go',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/let-me-go',
    story: {
      subtitle: 'Force Feed the Cat',
      paragraphs: [
        '"Let Me Go" was originally recorded between 2012 and 2014 under the project name "Force Feed the Cat." The name came from a ridiculous moment when a large group of people at a beach, party, or some festival (I don\u2019t remember exactly) were all drinking from the same bucket, and someone shouted, "We are force-feeding a cat!"',
        'Anyway, the original demo wasn\u2019t as punchy and groovy as the final version. It had a calmer vibe and leaned heavily on the melodies. Then one weekend, we headed to my parents\u2019 summer cottage to play and record our songs. The place had a killer sound thanks to its old wooden floors, ceilings, and roof. We started jamming the song there, and the space gave it a punchier, more driven feel.',
        'I already had some lyrics for the verses that started with "I don\u2019t want to be alone in the dark\u2026". The lines just felt like a natural fit with the rhythm and the melody. For the chorus, our guitarist and singer started throwing out random lines like "I\u2019m running down with you," "Sell myself," "Sell my soul," "Sell my photograph," and so on. Those fragments came together to form the choruses in the cottage demos.',
        'The final song was made with Suno by mashing up the original home demo with the cottage recordings and remixing everything around the lyrics.',
      ],
    },
  },
  {
    title: 'Hollow Eyes',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/hollow-eyes',
    story: {
      subtitle: 'A Song That Probably Shouldn\u2019t Exist',
      paragraphs: [
        'This is the kind of song that probably shouldn\u2019t exist. Like many of the slower rock songs I\u2019ve written, it doesn\u2019t represent what I usually listen to \u2014 but maybe that\u2019s exactly why it interests me.',
        '"Hollow Eyes" was first recorded as a rehearsal demo around 2014, back when it was always called ROT. I don\u2019t remember why.',
        'Unlike almost everything else I write, this one didn\u2019t start with a guitar or bass riff. It started with a vocal melody I just began humming. The chorus followed, then the guitars and lyrics came in one go. I thought it was kind of cheesy, but in a strange way I still liked it. Since the lyrics came out so quickly, I figure they must mean something.',
        'I brought it to our rock trio, Dog Day Sunrise (never forget), and we eventually rehearsed it, recorded some takes, and played it live once at Zoom bar in Hyvink\u00e4\u00e4. Then ROT disappeared for years.',
        'Recently I decided to revisit it, produce and master the track properly, use Suno to recreate the vocals from the original demos, and remix the whole thing.',
        'I\u2019m really happy that Hollow Eyes, a.k.a. ROT, has finally found its place.',
      ],
    },
  },
  {
    title: 'Pretty Boy',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/pretty-boy',
    story: {
      subtitle: 'Chasing Song 2 by Blur',
      paragraphs: [
        'I\'ve always wanted to do something at least a bit similar to Song 2 by Blur. "Pretty Boy" is what I tried, but it\'s a song I never played for anyone. Or at least never seriously pitched to any of my bandmates. I think it was because I always wanted to record the vocals myself, and was partly ashamed that they fell far short of the level the song deserved.',
        'After remixing the original demo with Suno, I finally got what I was after: that laid-back, almost lazy feel in the verses, paired with a chorus that still hits.',
      ],
    },
  },
  {
    title: 'Self Raping Worm',
    soundcloudUrl: 'https%3A//soundcloud.com/rotwurm/self-raping-worm-instrumental',
    story: {
      subtitle: "The Best Song I've Ever Written",
      paragraphs: [
        'Around 2004 my friend and I formed a two-man band. A song I wrote during this time was called "Self Raping Worm" and it was a story of a maggot defiling himself, as we took inspiration from the fact that many worms in nature can breed without a companion. The song was a full 8-minute black & death metal song that had multiple melodic sections and a headbanging chorus. We took inspiration from bands such as Decapitated, Dimmu Borgir, Cadaver, Berzerker, Ulver, Macabre, Bloodbath (especially "Eaten") but also Pink Floyd, Kingston Wall etc.',
        "I still think this is the best and most complete song I've ever written, but it has not yet been recorded or produced into a version that I could release.",
        "I'm so attached to the melodies in the song, so I decided to take the instrumental parts and do a bit of remixing. You can hear them in this track.",
      ],
    },
  },
  {
    title: 'Underground Human Flesh Store',
    soundcloudUrl: 'https%3A//soundcloud.com/rotwurm/underground-human-flesh-store',
    story: {
      subtitle: 'Twenty Years of Gore',
      paragraphs: [
        'This song was originally composed around 2006\u20132008. I had a clear vision for it from the start, but it took until 2026 to finally nail the lyrics, vocals, and song structure into the kind of gore level I originally wished for.',
      ],
    },
  },
  {
    title: 'Losing Time',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/losing-time',
    story: {
      subtitle: 'Rock Riffs Stitched Together',
      paragraphs: [
        '"Losing Time" was originally just a bunch of rock riffs stitched together. But who cares, they work really well.',
        "I'm still not happy with the verses, honestly. They feel a bit juvenile, telling the story of a man on death row in an old western town waiting for the gallows. The lyrics also have little to do with what the chorus is saying. That said, the chorus just works and for some reason I'm obsessed with the line \"Boy you're losing time\".",
      ],
    },
  },
  {
    title: 'Organic Heat (silloin tällöin)',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/organic-heat-silloin-taelloein',
    story: {
      subtitle: 'Four Guys at Sziget Festival',
      paragraphs: [
        'Back in 2011, four guys ended up at Sziget Festival. We all played in different bands but shared a thing for roots and reggae. Somewhere between the stages and the late nights, we decided to start a band together: Ever Flowing Stream of Organic Pleasures.',
        'The plan was simple: each of us writes one reggae song, and we record them together.',
        'Organic Heat ended up being a weird mix of jazzy guitar+bass and rap \u2014 but anyways, this was my contribution.',
      ],
    },
  },
  {
    title: 'Burn Down',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/burn-down',
    story: {
      subtitle: 'Three Chords and a Folk Mood',
      paragraphs: [
        'The inspiration for Burn Down came from Finnish "rautalanka" style, Tuomari Nurmio, and The Greenhornes. In the final piece those elements aren\u2019t so prominent anymore, but the song just started working pretty well as a slightly moody rock tune with a bit of a folk vibe.',
        'The whole song only has three chords, but the transitions between them create the backbone for the singing vocals that play with it.',
      ],
    },
  },
  {
    title: 'Together We Are (Little Monsters)',
    soundcloudUrl: 'https%3A//soundcloud.com/ihmissuti/together-we-are-little',
    story: {
      subtitle: 'A Patchwork of Riffs',
      paragraphs: [
        'It\u2019s hard to tell the year when this was composed \u2014 it\u2019s really a glue-and-stitch of multiple guitar riffs that I enjoy. But they work really well together!',
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
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${track.soundcloudUrl}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
          className="rounded"
          title={track.title}
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {track.demoSoundcloudUrl && (
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center gap-2"
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

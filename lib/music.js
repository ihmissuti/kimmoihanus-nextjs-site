// Shared music catalogue used by the homepage and /music.
// Projects follow the SoundCloud bio: soundcloud.com/ihmissuti
// Track list curated Aug 2026 from SoundCloud play counts and the
// Spotify for Artists release calendar.

export const projects = [
  {
    name: 'ihmissuti',
    tagline:
      "The mother project — mostly indie rock and dreamy pop, plus ideas and experimental songs that haven't found a home yet, including production on Japanese and Finnish tracks. Two decades of songwriting live here.",
    genres: ['Indie rock', 'Dreamy pop', 'Experimental'],
    accent: '#e8622c',
    home: true,
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/1BuOyEmJD4M6n5lkAKtNkS' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/ihmissuti' },
      { label: 'YouTube', href: 'https://www.youtube.com/@ihmissuti' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@ihmissuti' },
      { label: 'Instagram', href: 'https://www.instagram.com/ihmissutiproject' },
      { label: 'Website', href: 'https://ihmissuti.com' },
    ],
  },
  {
    name: 'Cometfall',
    tagline:
      'Alternative space rock — lyrics about the cosmos, outer worlds and powers beyond imagination. The trippy stuff, meant to be played loud.',
    genres: ['Space rock', 'Alt rock', 'Progressive'],
    accent: '#8fd8d2',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/2HQ9MRr9LEem4ZTzJM8KsN' },
      { label: 'Instagram', href: 'https://instagram.com/cometfallmusic' },
      { label: 'Website', href: 'https://cometfallmusic.com' },
    ],
  },
  {
    name: 'Amzart',
    tagline:
      'Experimental rap. Guitar and piano melodies blended with darker, psychedelic themes drawn from life, fantasy horror, poetry (Dylan Thomas era), literature and imagined characters moving through those spaces.',
    genres: ['Experimental rap', 'Underground hip hop'],
    accent: '#d4a95a',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/2IA9euRzwuly5CuCNEypCJ' },
      { label: 'Website', href: 'https://amzartmusic.com' },
    ],
  },
  {
    name: 'erizou',
    tagline:
      "EDM ideas in Spanish. I don't natively speak the language, but it fits dance and pop too well not to use — progressive house, reggaeton and cosmic dance music for the sweaty floor.",
    genres: ['Progressive house', 'Reggaeton', 'EDM'],
    accent: '#ff4fa3',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/7GY9sAyIvttsZav3Xtn6v1' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@erizou_' },
      { label: 'Instagram', href: 'https://www.instagram.com/erizou_official' },
      { label: 'Website', href: 'https://erizou.com' },
    ],
  },
  {
    name: 'halogeist',
    tagline:
      'Trippy industrial electronic — steel-cold textures, hypnotic grooves and psychedelic lyrics from the borderlines of imagination and all the weird things I see and hear.',
    genres: ['Industrial electronic', 'Progressive house'],
    accent: '#6fc3df',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/5uajUWjmTDxgSvWDUFSWuQ' },
      { label: 'Instagram', href: 'https://www.instagram.com/halogeistmusic' },
      { label: 'Website', href: 'https://halogeist.com' },
    ],
  },
  {
    name: 'Shaky Dope',
    tagline: 'Reggae with a Finnish melancholic touch.',
    genres: ['Reggae'],
    accent: '#63c132',
    links: [{ label: 'SoundCloud', href: 'https://soundcloud.com/ihmissuti' }],
  },
  {
    name: 'rotwurm',
    tagline: 'Black metal, pagan metal and blackgaze. Underground, extreme, uncompromising.',
    genres: ['Black metal', 'Pagan metal', 'Blackgaze'],
    accent: '#c0392b',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/6RT5OJAnN0no67CO9kX3UA' },
      { label: 'SoundCloud', href: 'https://soundcloud.com/rotwurm' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@rotwurm' },
      { label: 'Website', href: 'https://rotwurm.com' },
    ],
  },
  {
    name: 'DJ KLMA',
    tagline: 'Phonk and rap in Finnish. #suomirap #suomiphonk',
    genres: ['Phonk', 'Suomirap'],
    accent: '#a06bff',
    links: [{ label: 'SoundCloud', href: 'https://soundcloud.com/djklma' }],
  },
  {
    name: 'Mönjä',
    tagline: 'A newer project, still taking shape. No releases out yet.',
    accent: '#9aa0a6',
    comingSoon: true,
    links: [],
  },
];

// One-off songs and genre experiments that live in the main SoundCloud
// without a dedicated project.
export const orphanGenres = [
  {
    label: 'Finnish rock and pop',
    detail: 'Influenced by Don Huonot, Tehosekoitin and "rautalanka" — Pelottavia muotoja, Satoi koko päivän.',
  },
  {
    label: 'Suomirap, soul, jazz and funk fusion',
    detail: 'Organic Heat.',
  },
  { label: 'Hard rock and stadium rock' },
  { label: 'Art rock' },
  { label: 'Pop soul' },
  {
    label: 'Funk rock rap',
    detail: 'Me the Dolphin — "Speed to the Morning".',
  },
];

export const tracks = [
  {
    title: 'Burn Down',
    featured: true,
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/burn-down',
    spotifyUrl: 'https://open.spotify.com/track/2v1ZJlAZ9WCFy9FImryhZe',
    story: {
      subtitle: 'Three Chords and a Folk Mood',
      paragraphs: [
        'The inspiration for Burn Down came from Finnish "rautalanka" style, Tuomari Nurmio, and The Greenhornes. In the final piece those elements aren\u2019t so prominent anymore, but the song just started working pretty well as a slightly moody rock tune with a bit of a folk vibe.',
        'The whole song only has three chords, but the transitions between them create the backbone for the singing vocals that play with it.',
      ],
    },
  },
  {
    title: "Now It's My Turn",
    project: 'Cometfall',
    featured: true,
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/now-its-my-turn',
  },
  {
    title: 'Paper Radio',
    project: 'Cometfall',
    featured: true,
    upcoming: 'Sep 10, 2026',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/cometfall-paper-radio',
  },
  {
    title: 'Come Up for Air',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/come-up-for-air',
  },
  {
    title: 'Cántame',
    project: 'erizou',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/ca-ntame',
    spotifyUrl: 'https://open.spotify.com/track/1d3x2hBppw08tpzukKQ3f1',
  },
  {
    title: "Don't Slip Quiet",
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/dont-slip-quiet-1',
  },
  {
    title: 'I Should Be Furious',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/i-should-be-furious',
    spotifyUrl: 'https://open.spotify.com/track/3pn6iJG2uNZkVfa8FEhXfI',
  },
  {
    title: 'Rain That Pours Sideways',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/rain-that-pours-sideways',
  },
  {
    title: 'Afterslit',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/afterslit-1',
    story: {
      subtitle: 'Blues, Garage Rock, and Mud',
      paragraphs: [
        'Afterslit was recorded in 2015. The song relies on this blues and garage rock riff that just rolls throughout the whole thing.',
        'I still think the original demo has a kind of cool, muddy sound to it \u2014 although my playing on it is not anywhere near satisfying.',
      ],
    },
  },
  {
    title: 'Fold',
    project: 'Cometfall',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/the-fold',
    spotifyUrl: 'https://open.spotify.com/track/2lfEdIKtsQ5NQ5UA20fZzu',
  },
  {
    title: 'I Forgot How to Move',
    project: 'Cometfall',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/i-forgot-how-to-move',
  },
  {
    title: 'Satoi koko päivän',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/satoi-koko-pa-iva-n',
  },
  {
    title: 'Eight Hundred',
    project: 'Amzart',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/eight-hundred',
    spotifyUrl: 'https://open.spotify.com/track/1yxmHOrF7O4j1AFS0Xl2Hb',
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
    title: 'Buried Elsewhere',
    project: 'Cometfall',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/space-odysseya',
    spotifyUrl: 'https://open.spotify.com/track/3KDi45x4FNfoosxt9JQ6aw',
    demoSoundcloudUrl: 'https://soundcloud.com/ihmissuti/space-odysseia',
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
    title: 'The Orange Jang',
    project: 'Cometfall',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/the-orange-jang',
    spotifyUrl: 'https://open.spotify.com/track/2jvvZx6hP59o1nzrz8GjV1',
    demoSoundcloudUrl: 'https://soundcloud.com/ihmissuti/orange-jang',
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
    upcoming: 'Sep 3, 2026',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/summer-breeze',
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
    title: 'Hollow Eyes',
    soundcloudUrl: 'https://soundcloud.com/ihmissuti/hollow-eyes',
    spotifyUrl: 'https://open.spotify.com/track/5Ei0PkFomgATRQ9IPAdn1V',
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
    title: 'Black Star',
    project: 'rotwurm',
    upcoming: 'Aug 27, 2026',
    soundcloudUrl: 'https://soundcloud.com/rotwurm/black-star',
  },
  {
    title: 'Self Raping Worm',
    project: 'rotwurm',
    soundcloudUrl: 'https://soundcloud.com/rotwurm/self-raping-worm-1',
    demoSoundcloudUrl: 'https://soundcloud.com/rotwurm/self-raping-worm',
    demoName: 'Self Raping Worm (instrumental)',
    story: {
      subtitle: "The Best Song I've Ever Written",
      paragraphs: [
        'Around 2004 my friend and I formed a two-man band. A song I wrote during this time was called "Self Raping Worm" and it was a story of a maggot defiling himself, as we took inspiration from the fact that many worms in nature can breed without a companion. The song was a full 8-minute black & death metal song that had multiple melodic sections and a headbanging chorus. We took inspiration from bands such as Decapitated, Dimmu Borgir, Cadaver, Berzerker, Ulver, Macabre, Bloodbath (especially "Eaten") but also Pink Floyd, Kingston Wall etc.',
        "I still think this is the best and most complete song I've ever written. In 2026 it finally got a fully produced version, released as a rotwurm single.",
        'The instrumental remix that started the revival is still up too \u2014 you can hear the original melodies in it.',
      ],
    },
  },
  {
    title: 'Underground Human Flesh Store',
    project: 'rotwurm',
    soundcloudUrl: 'https://soundcloud.com/rotwurm/underground-human-flesh-store',
    story: {
      subtitle: 'Twenty Years of Gore',
      paragraphs: [
        'This song was originally composed around 2006\u20132008. I had a clear vision for it from the start, but it took until 2026 to finally nail the lyrics, vocals, and song structure into the kind of gore level I originally wished for.',
      ],
    },
  },
];

export const featuredTracks = tracks.filter((track) => track.featured);

export function soundcloudEmbed(url) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    url
  )}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
}

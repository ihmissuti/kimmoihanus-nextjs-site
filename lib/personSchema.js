// schema.org Person for Kimmo Ihanus, used on / and /about.
// Music profile URLs come from the artists' artist.yaml files via
// data/releases.json; only those and the personal profiles below are listed.
import { allArtists } from '@/lib/releases';
import { projects } from '@/lib/music';

const SITE = 'https://kimmoihanus.com';
export const PERSON_ID = `${SITE}/#person`;

const PERSONAL_PROFILES = [
  'https://www.linkedin.com/in/kimmo-ihanus-8175aa56',
  'https://github.com/ihmissuti',
  'https://x.com/ihmissuti',
  'https://www.superlines.io/about/',
  'https://soundcloud.com/ihmissuti',
];

// Project order on the site. ihmissuti is not featured as an artist.
const PROJECT_SLUGS = ['cometfall', 'rotwurm', 'amzart', 'napalm-cunt', 'erizou', 'halogeist'];
const PERSON_SAME_AS_HOSTS = ['open.spotify.com', 'youtube.com', 'instagram.com'];

function displayName(slug, fallback) {
  const project = projects.find((p) => p.slug === slug);
  return project ? project.name : fallback;
}

function musicGroup(slug) {
  const artist = allArtists[slug];
  if (!artist) return null;
  const group = {
    '@type': 'MusicGroup',
    name: displayName(slug, artist.name),
    url: artist.website || artist.spotify,
    genre: artist.genres,
    foundingLocation: { '@type': 'Place', name: 'Helsinki, Finland' },
    sameAs: artist.same_as,
  };
  if (artist.founded) group.foundingDate = String(artist.founded);
  if (artist.founders && artist.founders.length) {
    group.founder = artist.founders.map((name) =>
      name === 'Kimmo Ihanus' ? { '@id': PERSON_ID } : { '@type': 'Person', name }
    );
  } else {
    group.founder = { '@id': PERSON_ID };
  }
  return group;
}

function personSameAs() {
  const urls = [...PERSONAL_PROFILES];
  PROJECT_SLUGS.forEach((slug) => {
    const artist = allArtists[slug];
    if (!artist) return;
    if (artist.website) urls.push(artist.website);
    artist.same_as
      .filter((url) => PERSON_SAME_AS_HOSTS.some((host) => url.includes(host)))
      .forEach((url) => urls.push(url));
  });
  return [...new Set(urls)];
}

export function personSchema({ url = SITE } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Kimmo Ihanus',
    url,
    image: `${SITE}/emo.png`,
    description: 'Songwriter behind Cometfall and rotwurm, from Helsinki. Co-Founder & CTO at Superlines.',
    jobTitle: ['Songwriter', 'Co-Founder & CTO'],
    email: 'kimmo@superlines.io',
    worksFor: {
      '@type': 'Organization',
      name: 'Superlines',
      url: 'https://www.superlines.io',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Helsinki',
      addressCountry: 'FI',
    },
    memberOf: PROJECT_SLUGS.map(musicGroup).filter(Boolean),
    sameAs: personSameAs(),
  };
}

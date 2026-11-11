// Release data exported from the music-projects repo:
//   python3 tools/site-kimmoihanus/export.py   (in ~/Music/music-projects)
// writes data/releases.json. Latest / next are recomputed here against the
// build date, so a rebuild after a release day rolls forward even if the
// export is a few days old.
import data from '@/data/releases.json';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatReleaseDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

export function artistData(slug) {
  return data.artists[slug] || null;
}

export function releasesFor(slug, today = isoToday()) {
  const artist = artistData(slug);
  if (!artist) return { latest: null, next: null };
  const all = [...(artist.released || []), ...(artist.upcoming || [])];
  const released = all.filter((r) => r.date <= today).sort((a, b) => b.date.localeCompare(a.date));
  const upcoming = all.filter((r) => r.date > today).sort((a, b) => a.date.localeCompare(b.date));
  return { latest: released[0] || null, next: upcoming[0] || null };
}

export const releasesGenerated = data.generated;
export const allArtists = data.artists;

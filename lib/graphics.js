import { promises as fs } from 'fs';
import path from 'path';
import frontmatter from 'front-matter';
import marked from 'marked';

const GRAPHICS_PATH = path.resolve(process.cwd(), 'graphics');

export async function getGraphic(slug) {
  const content = await fs.readFile(path.resolve(GRAPHICS_PATH, `${slug}.md`), 'utf-8');
  const { attributes, body } = frontmatter(content);

  return {
    slug,
    body: marked(body),
    bodyRaw: body,
    ...attributes,
    image: await getImage(attributes),
    date: attributes.date.toString(),
  };
}

export async function getGraphics() {
  const paths = await fs.readdir(GRAPHICS_PATH);
  const graphics = await Promise.all(paths.map(async (p) => await getGraphic(p.replace(/\.md/, ''))));

  return graphics.sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getImage(graphic) {
  if (graphic.image) return graphic.image;

  if (graphic.video) {
    if (graphic.video.includes('youtube.com')) {
      const id = new URL(graphic.video).searchParams.get('v');
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }

    if (graphic.video.includes('vimeo')) {
      const id = new URL(graphic.video).pathname.replace(/^\//, '');

      try {
        const res = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
        const data = await res.json();

        return data[0].thumbnail_large;
      } catch (e) {
        return '';
      }
    }
  }
}

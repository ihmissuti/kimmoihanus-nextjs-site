const fs = require('fs');
const globby = require('globby');
const prettier = require('prettier');
const RSS = require('rss');
const frontmatter = require('front-matter');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const siteUrl = 'https://www.kimmoihanus.com';

  /**
   * Let's start with the Sitemap!
   */

  // Start with posts
  const posts = await globby(['posts/*{.mdx,.md}']);

  let sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  posts.forEach((post) => {
    const path = post.replace(/\.mdx?$/, '');
    sitemap += `<url><loc>${siteUrl}/${path}</loc></url>`;
  });

  const rss = new RSS({
    title: 'Kimmo Ihanus',
    site_url: siteUrl,
  });

  posts.forEach((p) => {
    const postPath = p.replace(/\.mdx?$/, '');
    const body = fs.readFileSync(p, 'utf-8');
    const { attributes: post } = frontmatter(body);

    if (post.externalUrl) return;

    rss.item({
      title: post.title,
      guid: `/posts/${postPath}`,
      url: `${siteUrl}/${postPath}`,
      author: 'Kimmo Ihanus',
      date: post.date,
    });
  });

  const xmlFeed = rss.xml({ indent: true });

  fs.writeFileSync('public/rss-feed.xml', xmlFeed);
})();

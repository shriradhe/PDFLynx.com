import express from 'express';

const router = express.Router();

// Clean URL slugs - must match client tools
const toolSlugs = [
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
  'pdf-to-jpg',
  'jpg-to-pdf',
  'rotate-pdf',
  'add-watermark',
  'unlock-pdf',
  'protect-pdf',
  'add-page-numbers',
  'word-to-pdf',
  'pdf-to-word',
];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/all-tools', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/faq', priority: '0.5', changefreq: 'monthly' },
];

// Blog posts - sync with client blogPosts.js or fetch from DB
const blogSlugs = ['how-to-merge-pdfs', 'compress-pdf-without-losing-quality', 'best-pdf-tools-online'];

const DOMAIN = process.env.DOMAIN || 'https://pdflynx.com';

router.get('/sitemap.xml', (req, res) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${page.path}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Tool pages (clean URLs)
  toolSlugs.forEach((slug) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${slug}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Blog posts
  blogSlugs.forEach((slug) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/blog/${slug}</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.set('Cache-Control', 'public, max-age=3600');
  res.send(xml);
});

router.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard
Disallow: /login
Disallow: /register

Sitemap: ${DOMAIN}/sitemap.xml
`;
  res.set('Content-Type', 'text/plain');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(robots);
});

export default router;

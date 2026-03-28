/**
 * Clean URL slug mapping for SEO-friendly routes
 * Maps: /merge-pdf -> tool id 'merge'
 */

export const SLUG_TO_ID = {
  'merge-pdf': 'merge',
  'split-pdf': 'split',
  'compress-pdf': 'compress',
  'pdf-to-jpg': 'pdf-to-jpg',
  'jpg-to-pdf': 'jpg-to-pdf',
  'word-to-pdf': 'word-to-pdf',
  'pdf-to-word': 'pdf-to-word', // placeholder for future
  'rotate-pdf': 'rotate',
  'add-watermark': 'watermark',
  'unlock-pdf': 'unlock',
  'protect-pdf': 'protect',
  'add-page-numbers': 'page-numbers',
};

export const ID_TO_SLUG = Object.fromEntries(
  Object.entries(SLUG_TO_ID).map(([slug, id]) => [id, slug])
);

export const getAllToolSlugs = () => Object.keys(SLUG_TO_ID);
export const getToolIdBySlug = (slug) => SLUG_TO_ID[slug];
export const getSlugByToolId = (id) => ID_TO_SLUG[id] || id;

/**
 * Central SEO Configuration
 * Used across frontend and can be synced with backend for sitemap/robots
 */

export const SEO_CONFIG = {
  domain: import.meta.env.VITE_APP_DOMAIN || 'https://pdflynx.com',
  defaultTitle: 'pdflynx - Free Online PDF Tools | Merge, Split, Convert PDF',
  defaultDescription: 'Every tool you need to work with PDFs. Merge, split, compress, convert, rotate, unlock PDFs free online. No installation required. 100% secure.',
  siteName: 'pdflynx',
  ogImage: '/pdflynx-logo-512.png',
  twitterHandle: '@pdflynx',
  locales: {
    en: { path: '', hreflang: 'en' },
    hi: { path: '/hi', hreflang: 'hi' },
    es: { path: '/es', hreflang: 'es' },
  },
  defaultLocale: 'en',
  analytics: {
    ga4Id: import.meta.env.VITE_GA4_ID || '',
  },
};

export const getCanonicalUrl = (path = '', locale = SEO_CONFIG.defaultLocale) => {
  const base = SEO_CONFIG.domain;
  const localePath = locale === 'en' ? '' : SEO_CONFIG.locales[locale]?.path || '';
  return `${base}${localePath}${path}`.replace(/([^:]\/)\/+/g, '$1');
};

export const getFullUrl = (path, locale = SEO_CONFIG.defaultLocale) => 
  getCanonicalUrl(path, locale);

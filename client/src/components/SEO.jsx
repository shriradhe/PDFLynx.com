import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, getCanonicalUrl } from '../config/seo.config';
import {
  createWebApplicationSchema,
  createSoftwareApplicationSchema,
  createFAQPageSchema,
  createBreadcrumbSchema,
} from '../utils/structuredData';

/**
 * Production-grade SEO component
 * Dynamic meta tags, canonical, OG, Twitter, JSON-LD schemas, hreflang
 */
export default function SEO({
  title,
  description,
  url = '/',
  type = 'website',
  image = SEO_CONFIG.ogImage,
  locale = SEO_CONFIG.defaultLocale,
  alternates = [], // [{ href, hreflang }]
  toolSchema = null,
  faqSchema = null,
  breadcrumbItems = null,
  featureList = null,
  noindex = false,
}) {
  const canonicalUrl = getCanonicalUrl(url, locale);
  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;
  const fullDescription =
    description || SEO_CONFIG.defaultDescription;
  const metaDescription =
    fullDescription.length > 160
      ? fullDescription.slice(0, 157) + '...'
      : fullDescription;
  const ogImageUrl = `${SEO_CONFIG.domain}${image}`;

  const defaultSchema = createWebApplicationSchema({
    name: SEO_CONFIG.siteName,
    description: fullDescription,
    path: url,
    featureList,
  });

  const schemaToInject = toolSchema || defaultSchema;
  const schemas = [schemaToInject];
  if (faqSchema?.length) {
    schemas.push(createFAQPageSchema(faqSchema));
  }
  if (breadcrumbItems?.length) {
    schemas.push(createBreadcrumbSchema(breadcrumbItems));
  }

  // hreflang: only when alternates provided (e.g. i18n). Add alternates prop for multi-lang.
  const hreflangLinks = alternates.length ? alternates : [];

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={`${locale}_${locale.toUpperCase()}`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      {SEO_CONFIG.twitterHandle && (
        <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      )}

      {/* hreflang for i18n - pass alternates prop when localized versions exist */}
      {hreflangLinks.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

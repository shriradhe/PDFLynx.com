/**
 * JSON-LD Structured Data generators for SEO
 * WebApplication, SoftwareApplication, FAQPage, BreadcrumbList
 */

import { SEO_CONFIG, getCanonicalUrl } from '../config/seo.config';

export const createWebApplicationSchema = (options = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: options.name || SEO_CONFIG.siteName,
  url: options.url || getCanonicalUrl(options.path || '/'),
  description: options.description || SEO_CONFIG.defaultDescription,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  ...(options.featureList && { featureList: options.featureList }),
});

export const createSoftwareApplicationSchema = (tool) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.title,
  url: getCanonicalUrl(`/${tool.slug || tool.id}`),
  description: tool.description,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: tool.features || [tool.description],
});

export const createFAQPageSchema = (faqs, toolName = '') => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: (faqs || []).map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

export const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: (items || []).map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? getCanonicalUrl(item.url) : undefined,
  })),
});

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.domain,
});

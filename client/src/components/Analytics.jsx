import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../config/seo.config';

/**
 * Google Analytics 4 integration
 * Set VITE_GA4_ID in .env to enable
 */
export default function Analytics() {
  const location = useLocation();
  const gaId = SEO_CONFIG.analytics?.ga4Id;

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return;

    // Load gtag script
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', gaId, { send_page_view: false });
    }

    // Track page view on route change
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [gaId, location.pathname, location.search]);

  return null;
}

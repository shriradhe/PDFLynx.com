import compression from 'compression';

export const applySEOMiddleware = (app) => {
  // GZIP compression - enable for all responses > 1KB
  app.use(
    compression({
      level: 6,
      threshold: 1024,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
      },
    })
  );

  // Security & SEO headers
  app.use((req, res, next) => {
    // HTTPS redirect (enable in production behind reverse proxy)
    if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    // Cache Control
    if (req.path.startsWith('/api')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    } else if (req.path.startsWith('/uploads')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    } else if (['/sitemap.xml', '/robots.txt'].includes(req.path)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    next();
  });
};

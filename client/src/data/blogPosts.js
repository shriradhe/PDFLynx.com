/**
 * Blog posts for SEO traffic
 * Can be moved to CMS/Markdown later
 */

export const blogPosts = [
  {
    id: 'how-to-merge-pdfs',
    slug: 'how-to-merge-pdfs',
    title: 'How to Merge PDFs Online – Step by Step Guide',
    excerpt: 'Learn how to combine multiple PDF files into one document online. Free, fast, and no software required.',
    content: `
Merging PDFs is one of the most common document tasks. Whether you're combining reports for a presentation, 
consolidating invoices, or creating a single document from multiple scans, our free Merge PDF tool makes it easy.

## Why Merge PDFs Online?
Online PDF mergers eliminate the need for desktop software. You can combine files from any device—laptop, 
tablet, or phone—without installing anything. Our tool processes your files in the cloud and delivers a 
single, merged PDF in seconds.

## How to Merge PDFs in 3 Steps
1. **Upload** – Drag and drop your PDF files or click to select. You can add as many as you need.
2. **Reorder** – Arrange files in the correct order by dragging them. The merged PDF will follow this sequence.
3. **Merge & Download** – Click "Merge PDF" and download your combined document.

## Tips for Best Results
- Ensure all files are valid PDFs before uploading.
- Check the page order before merging—you can always reorder.
- For large batches, merge in groups of 20–30 files for faster processing.

[Use our free Merge PDF tool →](/merge-pdf)
    `,
    publishedAt: '2024-01-15',
    category: 'PDF Tips',
  },
  {
    id: 'compress-pdf-without-losing-quality',
    slug: 'compress-pdf-without-losing-quality',
    title: 'How to Compress a PDF Without Losing Quality',
    excerpt: 'Reduce PDF file size while keeping text and images sharp. Learn best practices for PDF compression.',
    content: `
Large PDF files can be a problem—they're slow to upload, hard to email, and eat up storage. 
Compressing PDFs solves these issues, but many worry about quality loss. Here's how to compress 
without sacrificing readability.

## What Happens When You Compress a PDF?
Compression works by optimizing images (reducing resolution where appropriate) and removing 
redundant data. Text and vector graphics are typically preserved with no visible change. 
For image-heavy PDFs, we use smart algorithms that balance size and clarity.

## When to Compress
- Before emailing (many servers limit attachments to 25MB)
- For web uploads and cloud storage
- To speed up sharing and loading

## Best Practices
- Keep originals for archival; compress copies for sharing.
- For scanned documents, moderate compression usually keeps text readable.
- For design-heavy PDFs, test the output before finalizing.

[Compress your PDF now →](/compress-pdf)
    `,
    publishedAt: '2024-01-20',
    category: 'PDF Tips',
  },
  {
    id: 'best-pdf-tools-online',
    slug: 'best-pdf-tools-online',
    title: 'Best Free PDF Tools Online in 2024',
    excerpt: 'A curated list of the best free online PDF tools for merging, splitting, compressing, and converting.',
    content: `
PDFs are everywhere—contracts, reports, forms, ebooks—and you need the right tools to work with them. 
Here are the essential free PDF tools everyone should have bookmarked.

## Essential PDF Tools
- **Merge PDF** – Combine multiple documents into one.
- **Split PDF** – Extract pages or split into separate files.
- **Compress PDF** – Reduce file size for email and storage.
- **PDF to JPG** – Convert pages to images for presentations.
- **JPG to PDF** – Turn images into a single PDF.

## Why Choose Online Tools?
No installation, no subscription, and they work on any device. Our tools run in the browser and process 
files securely, with automatic deletion after 2 hours. You get professional results without the hassle.

[Explore all our PDF tools →](/all-tools)
    `,
    publishedAt: '2024-01-25',
    category: 'Guides',
  },
];

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((p) => p.slug === slug);

export const getRecentPosts = (limit = 5) =>
  [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, limit);

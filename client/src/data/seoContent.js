/**
 * SEO Content Engine - 800-1200 words per tool
 * Structured for H1, H2, keyword variations, FAQs
 */

export const getToolSeoContent = (toolId) => {
  const contentMap = {
    merge: {
      h1: 'Merge PDF Online Free - Combine PDF Files in Seconds',
      keywords: ['merge PDF', 'combine PDF', 'PDF merger', 'merge PDF online free', 'join PDF files', 'combine PDF files online'],
      howTo: `Using our free Merge PDF tool is incredibly simple. First, click the upload area or drag and drop your PDF files directly onto the page. You can select multiple PDFs at once—there's no limit to how many files you can combine. Once uploaded, you'll see a preview of your files in the order they'll be merged. You can easily reorder them by dragging and dropping; simply click and hold any file, then move it to your preferred position. When you're satisfied with the order, click the "Merge PDF" button. Our servers will process your documents securely and within seconds, you'll have a single, combined PDF ready to download. No registration required, no watermarks, and completely free.`,
      features: [
        'Combine unlimited PDF files in one merge',
        'Drag-and-drop reordering for perfect page sequence',
        'No file size limits for standard users',
        'Cloud-based processing - works on any device',
        '100% free with no hidden fees or subscriptions',
        'SSL encrypted - your files stay private',
        'Auto-delete: files purged from servers after 2 hours',
        'Works on Windows, Mac, Linux, iOS, and Android',
      ],
      benefits: [
        'Save time: Merge dozens of documents in seconds instead of manually copying pages',
        'Professional results: Maintain PDF quality with no compression or quality loss',
        'Flexibility: Combine reports, invoices, contracts, and presentations effortlessly',
        'Accessibility: No software installation - use any browser from anywhere',
      ],
      faqs: [
        {
          q: 'Is the PDF merge tool free to use?',
          a: 'Yes, our Merge PDF tool is completely free. You can combine as many PDF files as you need without any cost, registration, or watermarks. We believe essential document tools should be accessible to everyone.',
        },
        {
          q: 'Is it safe to merge PDFs online?',
          a: 'Absolutely. We use 256-bit SSL encryption for all file transfers. Your documents are processed in a secure environment and automatically deleted from our servers within 2 hours. We never store, share, or access your files for any purpose other than merging.',
        },
        {
          q: 'What is the maximum number of PDFs I can merge?',
          a: 'You can merge as many PDF files as you need in a single operation. For optimal performance, we recommend merging up to 50 files or 100MB total per session. For larger batches, you can run multiple merge operations.',
        },
        {
          q: 'Can I reorder PDF pages before merging?',
          a: 'Yes! Once you upload your PDFs, you can drag and drop them to change the order. The merged PDF will reflect the order you set. This makes it easy to combine documents in the exact sequence you need.',
        },
      ],
    },
    split: {
      h1: 'Split PDF Online Free - Extract Pages from PDF',
      keywords: ['split PDF', 'extract PDF pages', 'split PDF online free', 'separate PDF', 'PDF splitter', 'divide PDF'],
      howTo: `Splitting a PDF has never been easier. Upload your PDF file by clicking the drop zone or dragging your file onto the page. Our tool will automatically load and display your document. You have two options: split by page ranges or split each page into a separate file. For custom ranges, enter values like "1-5, 8, 11-13" in the optional field—this extracts pages 1 through 5, page 8, and pages 11 through 13 as separate PDFs. Leave the field blank to split every page into its own file. Click "Split PDF" and within moments you'll receive a ZIP file containing all your split PDFs, ready to download. The process is free, fast, and requires no sign-up.`,
      features: [
        'Split by custom page ranges (e.g., 1-5, 8, 11-13)',
        'Extract every page as a separate PDF',
        'No file size limits for standard splitting',
        'Batch processing - split large documents quickly',
        'Preserves original PDF quality',
        'Download as ZIP for multiple outputs',
        'Works with password-protected PDFs (enter password when prompted)',
        'Cross-platform: use from any device or browser',
      ],
      benefits: [
        'Extract specific sections: Pull out just the pages you need from lengthy documents',
        'Organize content: Separate chapters, appendices, or forms into individual files',
        'Reduce file size: Split large PDFs to share only relevant portions via email',
        'Archive selectively: Save and organize pages without the full document',
      ],
      faqs: [
        {
          q: 'Can I split a PDF for free?',
          a: 'Yes, our Split PDF tool is 100% free. There are no hidden charges, subscriptions, or premium features. You can split as many PDFs as you need with full functionality.',
        },
        {
          q: 'How do I split specific pages from a PDF?',
          a: 'Use the optional "Custom Ranges" field. Enter page numbers and ranges separated by commas. For example: "1-3, 7, 10-12" will create separate PDFs for pages 1-3, page 7, and pages 10-12.',
        },
        {
          q: 'Are my files secure when splitting PDFs online?',
          a: 'Yes. All uploads use SSL encryption. Files are processed in an isolated environment and permanently deleted from our servers within 2 hours. We do not retain copies or use your documents for any other purpose.',
        },
        {
          q: 'Can I split a password-protected PDF?',
          a: 'Yes. When you upload a password-protected PDF, you will be prompted to enter the password. Once verified, the split operation will proceed normally.',
        },
      ],
    },
    compress: {
      h1: 'Compress PDF Online Free - Reduce PDF File Size',
      keywords: ['compress PDF', 'reduce PDF size', 'PDF compressor', 'shrink PDF', 'compress PDF online free', 'smaller PDF'],
      howTo: `Compressing your PDF is straightforward. Upload your PDF file by dragging it onto the drop zone or clicking to select it. Our compression engine analyzes your document and applies smart optimization—reducing file size while preserving text clarity and image quality. We use advanced algorithms that compress images and remove redundant data without visible quality loss for most documents. Click "Compress PDF" and the optimized file will be ready in seconds. You can compare the before and after file sizes. There's no registration, no watermarks, and the service is completely free. Perfect for email attachments, cloud storage, or meeting file size limits.`,
      features: [
        'Smart compression - balances quality and file size',
        'No visible quality loss for most documents',
        'Compress by up to 70% in many cases',
        'Preserves text and vector graphics perfectly',
        'Optimizes embedded images automatically',
        'One-click compression - no settings needed',
        'Secure: files deleted after 2 hours',
        'Works with PDFs of any size',
      ],
      benefits: [
        'Email-friendly: Reduce PDF size to meet attachment limits',
        'Faster sharing: Smaller files upload and download quicker',
        'Storage savings: Save space in cloud drives and local storage',
        'Web optimization: Use smaller PDFs on websites for faster loading',
      ],
      faqs: [
        {
          q: 'Does compressing a PDF reduce quality?',
          a: 'Our compression uses intelligent algorithms that minimize quality loss. For text-heavy PDFs, you typically see no visible difference. For image-heavy documents, we optimize images to reduce size while keeping them sharp. You can always keep your original if needed.',
        },
        {
          q: 'How much can I compress a PDF?',
          a: 'Compression depends on the content. Text-only PDFs may compress 50-70%. Image-heavy PDFs often see 30-60% reduction. We prioritize quality, so we never aggressively compress to the point of degradation.',
        },
        {
          q: 'Is PDF compression free?',
          a: 'Yes, our Compress PDF tool is completely free. No registration, no limits on usage, and no watermarks on your compressed files.',
        },
        {
          q: 'Will compressing a PDF affect editing or printing?',
          a: 'No. Compressed PDFs remain fully editable and printable. They maintain their structure, links, and form fields. The compression primarily optimizes embedded images and removes redundant data.',
        },
      ],
    },
    'pdf-to-jpg': {
      h1: 'PDF to JPG Converter - Convert PDF to Images Online Free',
      keywords: ['PDF to JPG', 'PDF to image', 'convert PDF to JPG', 'PDF to JPEG', 'PDF to picture', 'extract images from PDF'],
      howTo: `Converting PDF to JPG is simple. Upload your PDF by dragging it onto the drop zone or clicking to select. Our converter will process each page and transform them into high-quality JPG images. Once complete, you'll receive a ZIP file containing all the images—one JPG per PDF page. The conversion happens entirely in your browser for privacy, so your files never leave your device. Download the ZIP, extract the images, and use them in presentations, websites, or anywhere you need image format. No sign-up required, completely free, and works with multi-page PDFs.`,
      features: [
        'Convert each PDF page to a separate JPG image',
        'High-quality output - crisp, clear images',
        'Client-side processing for maximum privacy',
        'Handles multi-page PDFs - all pages converted',
        'Download as ZIP for easy organization',
        'No file size limits for standard use',
        'Works offline-capable in supported browsers',
        'Free and unlimited conversions',
      ],
      benefits: [
        'Web and social: Use PDF content as images for websites, social media, or thumbnails',
        'Presentations: Insert PDF pages as images in PowerPoint or Google Slides',
        'Editing: Edit PDF content in image editors like Photoshop',
        'Sharing: Send individual pages as images via messaging apps',
      ],
      faqs: [
        {
          q: 'Is PDF to JPG conversion free?',
          a: 'Yes, our PDF to JPG converter is 100% free. Convert as many PDFs as you need with no registration or hidden fees.',
        },
        {
          q: 'Where are my files processed?',
          a: 'PDF to JPG conversion runs in your browser. Your PDF never leaves your device, offering maximum privacy and security.',
        },
        {
          q: 'What quality are the JPG outputs?',
          a: 'We output high-quality JPG images that faithfully represent your PDF pages. Resolution is maintained for clear text and graphics.',
        },
        {
          q: 'Can I convert a multi-page PDF?',
          a: 'Yes. Each page becomes a separate JPG file. All images are bundled in a ZIP for easy download.',
        },
      ],
    },
    'jpg-to-pdf': {
      h1: 'JPG to PDF Converter - Convert Images to PDF Online Free',
      keywords: ['JPG to PDF', 'image to PDF', 'convert JPG to PDF', 'JPEG to PDF', 'photos to PDF', 'images to PDF converter'],
      howTo: `Converting images to PDF takes seconds. Upload your JPG, JPEG, or PNG files by dragging them onto the drop zone or clicking to select. You can add multiple images—they'll be combined into a single PDF in the order you upload them. Use the interface to reorder images by dragging if needed. Click "JPG to PDF" and our tool will create a professional PDF with your images, one per page. You can adjust orientation and margins in the options. The resulting PDF is ready to print, share, or archive. No registration, no watermarks, and completely free. Ideal for converting scanned documents, photos, or screenshots into a single PDF.`,
      features: [
        'Convert JPG, JPEG, and PNG to PDF',
        'Combine multiple images into one PDF',
        'Drag-and-drop reordering',
        'Adjustable orientation and margins',
        'One image per page layout',
        'High-quality output preservation',
        'Supports batch conversion',
        'No sign-up or installation required',
      ],
      benefits: [
        'Document creation: Turn photos of documents into a single PDF',
        'Portfolio building: Combine artwork or design samples into one file',
        'Archiving: Preserve images in a universal, printable format',
        'Email-ready: Single PDF instead of multiple image attachments',
      ],
      faqs: [
        {
          q: 'Can I convert multiple images to one PDF?',
          a: 'Yes. Upload multiple JPG or PNG files and they will be combined into a single PDF, with each image on its own page. You can reorder them before converting.',
        },
        {
          q: 'What image formats are supported?',
          a: 'We support JPG, JPEG, and PNG. These cover the vast majority of image files you might need to convert.',
        },
        {
          q: 'Is the JPG to PDF converter free?',
          a: 'Yes, it is completely free. No registration, no watermarks, and no usage limits.',
        },
        {
          q: 'Will image quality be preserved?',
          a: 'Yes. We preserve the original quality of your images when converting to PDF. The output PDF will look sharp and professional.',
        },
      ],
    },
    rotate: {
      h1: 'Rotate PDF Online Free - Rotate PDF Pages',
      keywords: ['rotate PDF', 'rotate PDF pages', 'rotate PDF online', 'flip PDF', 'change PDF orientation'],
      howTo: `Rotating PDF pages is quick and easy. Upload your PDF by dragging it onto the drop zone or clicking to select. Our tool loads your document and allows you to rotate pages 90 degrees clockwise or counterclockwise. You can rotate all pages at once or select specific pages for rotation. Click "Rotate PDF" and the corrected document will be ready to download in seconds. Perfect for fixing scans that were captured sideways or adjusting document orientation. The process is free, requires no registration, and preserves full PDF quality.`,
      features: [
        'Rotate all pages or select specific pages',
        '90° clockwise and counterclockwise',
        'Preserves PDF quality',
        'Fast processing',
        'No registration required',
        'Secure file handling',
        'Works on all devices',
      ],
      benefits: [
        'Fix scanned documents with wrong orientation',
        'Prepare PDFs for printing or presentation',
        'Correct accidentally rotated pages',
      ],
      faqs: [
        { q: 'Is rotating PDF free?', a: 'Yes, our Rotate PDF tool is completely free with no registration required.' },
        { q: 'Can I rotate only some pages?', a: 'Yes, you can choose to rotate all pages or select specific pages for rotation.' },
      ],
    },
    watermark: {
      h1: 'Add Watermark to PDF Online Free',
      keywords: ['add watermark to PDF', 'PDF watermark', 'watermark PDF', 'stamp PDF', 'text watermark PDF'],
      howTo: `Adding a watermark to your PDF is simple. Upload your PDF, enter your watermark text (e.g., "DRAFT", "CONFIDENTIAL"), and click to process. The watermark will be applied across your pages with adjustable typography, transparency, and position. Download your watermarked PDF instantly. Free and secure.`,
      features: [
        'Text and image watermark support',
        'Customizable typography and transparency',
        'Position control',
        'Batch processing',
      ],
      benefits: ['Protect documents', 'Mark drafts', 'Brand documents'],
      faqs: [
        { q: 'Is the watermark tool free?', a: 'Yes, completely free.' },
        { q: 'Can I use an image as a watermark?', a: 'Yes, you can add text or image watermarks.' },
      ],
    },
    unlock: {
      h1: 'Unlock PDF Online Free - Remove PDF Password',
      keywords: ['unlock PDF', 'remove PDF password', 'unlock PDF online', 'decrypt PDF', 'PDF password removal'],
      howTo: `To unlock a password-protected PDF, upload the file and enter the correct password. Our tool will remove the restriction and provide you with an editable, printable copy. Your file is processed securely and deleted after 2 hours. Free and private.`,
      features: [
        'Remove user and owner passwords',
        'Preserve document content',
        'Secure processing',
        'Auto-delete after processing',
      ],
      benefits: ['Edit locked PDFs', 'Print restricted documents', 'Merge unlocked PDFs'],
      faqs: [
        { q: 'Is unlocking PDF legal?', a: 'Yes, if you have the password and legal rights to the document.' },
        { q: 'What if I forgot the password?', a: 'We cannot help recover forgotten passwords. Only the password holder can unlock.' },
      ],
    },
    protect: {
      h1: 'Protect PDF Online Free - Add Password to PDF',
      keywords: ['protect PDF', 'password protect PDF', 'encrypt PDF', 'lock PDF', 'secure PDF'],
      howTo: `Protect your PDF with a password in seconds. Upload your file, set a strong password, and click to encrypt. The PDF will be secured so only users with the password can open or edit it. Download your protected PDF. Free and secure.`,
      features: [
        'User and owner password support',
        'Strong encryption',
        'Preserve all content',
        'Instant processing',
      ],
      benefits: ['Confidential documents', 'Share sensitive data', 'Comply with privacy requirements'],
      faqs: [
        { q: 'What encryption is used?', a: 'We use industry-standard PDF encryption (AES-256 when supported).' },
        { q: 'Can I remove the password later?', a: 'Yes, use our Unlock PDF tool with the password to remove protection.' },
      ],
    },
    'word-to-pdf': {
      h1: 'Word to PDF Online Free - Convert DOC to PDF',
      keywords: [
        'word to pdf',
        'convert word to pdf',
        'doc to pdf',
        'docx to pdf',
        'word document to pdf',
        'online word to pdf free',
      ],
      howTo: `Convert your Word documents to PDF in seconds. Upload your .doc or .docx file using the drop zone, and our converter will transform it into a clean, print-ready PDF that preserves formatting and layout as closely as possible. After processing, download your new PDF directly from the page. This Word to PDF tool requires no software installation and no registration for conversion. For best results, use standard page sizes and avoid heavy tracking changes or complex embedded objects. Your file is handled securely and automatically deleted from our servers after a short time window.`,
      features: [
        'Convert .doc and .docx files to PDF online',
        'Keeps formatting as close as possible',
        'Fast, browser-based conversion workflow',
        'No installation or special software required',
        'Free conversion with no hidden charges',
        'Secure uploads with encrypted transfers',
        'Auto-delete for added privacy',
      ],
      benefits: [
        'Share documents safely without editing',
        'Send reports, resumes, and forms as universal PDFs',
        'Make printing and exporting more consistent',
        'Avoid formatting shifts across different Word versions',
      ],
      faqs: [
        { q: 'Is Word to PDF free to use?', a: 'Yes. Upload a .doc or .docx file and convert to PDF with no sign-up and no cost.' },
        { q: 'Do I need Microsoft Word installed?', a: 'No. The conversion is handled on our server and delivered as a PDF download.' },
        { q: 'Will my formatting stay the same?', a: 'We preserve layout and styling as accurately as possible, but results can vary for complex documents. Testing with your sample file is recommended.' },
        { q: 'How do I convert?', a: 'Select your Word file, click Word to PDF, then download the resulting PDF when processing completes.' },
      ],
    },
    'pdf-to-word': {
      h1: 'PDF to Word Online Free - Convert PDF to DOCX',
      keywords: [
        'pdf to word',
        'convert pdf to word',
        'pdf to docx',
        'pdf to doc',
        'online pdf to word free',
        'extract text from pdf',
      ],
      howTo: `Turn a PDF into an editable Word document. Upload your PDF file, and our PDF to Word converter will generate a .docx file you can open and edit in Microsoft Word or compatible apps. This tool is designed for quick conversion for everyday workflows such as rewriting, editing, or reusing content. After conversion, download your DOCX file instantly. No installation is needed. If your PDF is scanned or image-based, OCR may not work perfectly depending on the source document; for text-based PDFs, results are typically more accurate.`,
      features: [
        'Convert PDFs to editable DOCX format',
        'Download the converted Word file quickly',
        'Works without installing any software',
        'Free conversion with secure handling',
        'Preserves content structure where possible',
        'Auto-delete for privacy',
      ],
      benefits: [
        'Edit existing PDF content in Word',
        'Reuse text for documents, reports, and drafts',
        'Improve collaboration across teams using Word workflows',
        'Reduce manual copy-paste effort',
      ],
      faqs: [
        { q: 'Is PDF to Word free?', a: 'Yes. Convert your PDF to an editable Word document at no cost and without registration.' },
        { q: 'What file types can I upload?', a: 'This tool accepts PDF files. For scanned documents, quality depends on the PDF content.' },
        { q: 'Will I be able to edit the output?', a: 'Yes. The converter produces a DOCX file designed for editing in Word-compatible software.' },
        { q: 'Where is my file processed?', a: 'Your file is processed on our server and removed afterward for privacy.' },
      ],
    },
    'page-numbers': {
      h1: 'Add Page Numbers to PDF Online Free',
      keywords: ['add page numbers to PDF', 'PDF page numbers', 'number PDF pages', 'PDF numbering'],
      howTo: `Add page numbers to your PDF easily. Upload your document, choose position (top/bottom, left/center/right), set font and size, and click to process. Page numbers will be applied to every page. Download your numbered PDF. Free and fast.`,
      features: [
        'Custom position and style',
        'Font and size options',
        'Batch processing',
        'Professional output',
      ],
      benefits: ['Organize long documents', 'Print with page references', 'Academic and legal formatting'],
      faqs: [
        { q: 'Is adding page numbers free?', a: 'Yes, completely free.' },
        { q: 'Can I choose the starting number?', a: 'Yes, you can set custom starting numbers and formats.' },
      ],
    },
  };

  return contentMap[toolId] || {
    h1: 'PDF Tool',
    keywords: ['PDF tool', 'online PDF'],
    howTo: 'Use our PDF tool by uploading your file and following the on-screen instructions.',
    features: ['Easy to use', 'Free', 'Secure'],
    benefits: ['Convenient', 'Fast', 'Reliable'],
    faqs: [
      { q: 'Is it free?', a: 'Yes.' },
      { q: 'Is it secure?', a: 'Yes, we use encryption and auto-delete files.' },
    ],
  };
};

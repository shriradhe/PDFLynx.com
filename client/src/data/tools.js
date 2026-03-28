import { 
  FilePlus2, SplitSquareHorizontal, Minimize2, 
  FileText, Image as ImageIcon, FileImage, 
  RefreshCw, Droplets, Unlock, Lock, 
  ListOrdered, Hash 
} from 'lucide-react';

export const tools = [
  {
    id: 'merge',
    slug: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    icon: FilePlus2,
    color: 'text-red-500',
    bg: 'bg-red-50',
    endpoint: '/pdf/merge',
    multiple: true,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'split',
    slug: 'split-pdf',
    title: 'Split PDF',
    description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    icon: SplitSquareHorizontal,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    endpoint: '/pdf/split',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'compress',
    slug: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing for maximal PDF quality.',
    icon: Minimize2,
    color: 'text-green-500',
    bg: 'bg-green-50',
    endpoint: '/pdf/compress',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    icon: FileImage,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    endpoint: '/pdf/pdf-to-jpg', // Need to implement in backend, fallback for now
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Adjust orientation and margins. Convert JPG images to PDF in seconds.',
    icon: ImageIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    endpoint: '/pdf/jpg-to-pdf',
    multiple: true,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }
  },
  {
    id: 'rotate',
    slug: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once.',
    icon: RefreshCw,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    endpoint: '/pdf/rotate',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'watermark',
    slug: 'add-watermark',
    title: 'Add Watermark',
    description: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.',
    icon: Droplets,
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    endpoint: '/pdf/watermark',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'unlock',
    slug: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    icon: Unlock,
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    endpoint: '/pdf/unlock',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'protect',
    slug: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Encrypt your PDF with a password to keep sensitive data confidential.',
    icon: Lock,
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    endpoint: '/pdf/protect',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'page-numbers',
    slug: 'add-page-numbers',
    title: 'Add Page Numbers',
    description: 'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.',
    icon: Hash,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    endpoint: '/pdf/number',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] }
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Word documents (.doc, .docx) to a clean, printable PDF in seconds. Works online and is free.',
    icon: FileText,
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    endpoint: '/pdf/word-to-pdf',
    multiple: false,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  },
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert your PDF into an editable Word document (.docx). Upload and download your converted file instantly.',
    icon: FileText,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    endpoint: '/pdf/pdf-to-word',
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
  }
];

/** Get tool by slug (e.g. 'merge-pdf') or by id */
export const getToolBySlug = (slug) => 
  tools.find((t) => t.slug === slug || t.id === slug);

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const faqs = [
  { q: 'Are your PDF tools free?', a: 'Yes, all our PDF tools are free to use. No registration required for most tools.' },
  { q: 'Are my files secure?', a: 'Yes. We use SSL encryption and automatically delete all files from our servers within 2 hours of processing.' },
  { q: 'Do I need to create an account?', a: 'No. You can use merge, split, compress, convert, and other tools without signing up. Accounts are optional for saving history.' },
  { q: 'What file size limits apply?', a: 'Standard limits apply per tool. For large files, we recommend splitting operations.' },
];

export default function Faq() {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="FAQ" description="Frequently asked questions about pdflynx. Free PDF merge, split, compress, convert tools." url="/faq" faqSchema={faqs} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h2>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
          <p className="pt-4">
            <Link to="/all-tools" className="text-primary font-medium hover:underline">Explore all PDF tools →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

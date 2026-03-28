import { Link } from 'react-router-dom';
import { tools } from '../data/tools';

export default function Footer() {
  const toolLinks = tools.map((t) => ({
    title: t.title,
    slug: t.slug || t.id,
  }));

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tools */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((t) => (
                <li key={t.slug}>
                  <Link to={`/${t.slug}`} className="text-gray-600 hover:text-primary transition-colors">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/all-tools" className="text-gray-600 hover:text-primary">All Tools</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-primary">Login</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-primary">Register</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Use</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              pdflynx provides free online PDF tools. Your files are processed securely and
              automatically deleted after 2 hours. No registration required for most tools.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} pdflynx. Free PDF tools for everyone.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Terms of Use" description="Terms of use for pdflynx. Free PDF tools for personal and commercial use." url="/terms" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Use</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-6 text-gray-600">
          <p>By using pdflynx, you agree to these terms.</p>
          <h2 className="text-xl font-bold text-gray-900">Acceptable Use</h2>
          <p>You may use our tools for lawful purposes only. Do not upload content you do not have rights to.</p>
          <h2 className="text-xl font-bold text-gray-900">Service</h2>
          <p>We provide PDF tools as-is. We strive for uptime but do not guarantee uninterrupted service.</p>
          <p className="pt-4">
            <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Privacy Policy"
        description="Our privacy policy explains how we handle your PDF files and personal data. Files are auto-deleted after 2 hours."
        url="/privacy"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 space-y-6 text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2 className="text-xl font-bold text-gray-900">File Handling</h2>
          <p>Your uploaded PDF files are processed on our servers and automatically deleted within 2 hours. We do not store, share, or use your files for any purpose other than the operation you request.</p>
          <h2 className="text-xl font-bold text-gray-900">Data We Collect</h2>
          <p>When you create an account, we store your email and a hashed password. Usage analytics may collect anonymous data such as page views and tool usage to improve our service.</p>
          <h2 className="text-xl font-bold text-gray-900">Security</h2>
          <p>All file transfers use SSL encryption. We follow industry best practices to protect your data.</p>
          <p className="pt-4">
            <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

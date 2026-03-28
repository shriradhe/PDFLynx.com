import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { getToolBySlug } from '../data/tools';
import { getToolSeoContent } from '../data/seoContent';
import Dropzone from '../components/Dropzone';
import api from '../services/api';
import { Settings, Lock, FileText, ArrowRight } from 'lucide-react';
import { convertPdfToJpg } from '../utils/pdfToJpg';
import SEO from '../components/SEO';
import { createSoftwareApplicationSchema } from '../utils/structuredData';
import { SEO_CONFIG } from '../config/seo.config';

const ToolPage = ({ tool: toolProp }) => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const tool = toolProp || getToolBySlug(slug) || tools.find((t) => t.id === id);
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  const [password, setPassword] = useState('');
  const [splitRanges, setSplitRanges] = useState('');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

  useEffect(() => {
    if (!tool && (id || slug)) {
      navigate('/');
    } else if (tool) {
      setFiles([]);
      setResultUrl(null);
      setError(null);
    }
  }, [tool, id, slug, navigate]);

  const handleDrop = (acceptedFiles) => {
    if (!tool) return;
    if (tool.multiple) {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    } else {
      setFiles([acceptedFiles[0]]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (!tool || files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    if (tool.id === 'pdf-to-jpg') {
      try {
        const zipBlob = await convertPdfToJpg(files[0]);
        const url = URL.createObjectURL(zipBlob);
        setResultUrl(url);
      } catch (err) {
        setError(err.message || 'Failed to convert PDF to JPG');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append(tool.multiple ? 'files' : 'file', file);
    });
    if (['protect', 'unlock'].includes(tool.id)) {
      if (!password && tool.id === 'unlock') {
        setError('Password is required to unlock');
        setIsProcessing(false);
        return;
      }
      formData.append('password', password);
    }
    if (tool.id === 'split') formData.append('ranges', splitRanges);
    if (tool.id === 'watermark') formData.append('text', watermarkText);

    try {
      const response = await api.post(tool.endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success && response.data.downloadUrl) {
        setResultUrl(response.data.downloadUrl);
      } else if (response.data.success && response.data.files) {
        setResultUrl(response.data.files[0]);
      } else {
        setError('Processing failed on server.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!tool) return null;

  const Icon = tool.icon;
  const seoContent = getToolSeoContent(tool.id);
  const pageSlug = tool.slug || tool.id;
  const pageUrl = `/${pageSlug}`;

  const toolSchema = createSoftwareApplicationSchema({
    ...tool,
    features: seoContent.features,
  });

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'All Tools', url: '/all-tools' },
    { name: tool.title, url: pageUrl },
  ];

  const metaDescription =
    seoContent.keywords?.length &&
    (tool.description + ' Free online. ' + seoContent.keywords.slice(0, 3).join(', ') + '. No signup required.').length <= 160
      ? tool.description + ' Free online. ' + seoContent.keywords.slice(0, 3).join(', ') + '. No signup required.'
      : tool.description;

  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-8 px-4 sm:px-6 lg:px-8">
      <SEO
        title={`${tool.title} - Free Online`}
        description={metaDescription}
        url={pageUrl}
        toolSchema={toolSchema}
        faqSchema={seoContent.faqs}
        breadcrumbItems={breadcrumbItems}
      />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1 text-gray-500">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/all-tools" className="hover:text-primary">All Tools</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{tool.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-4">
            <Icon className={`w-10 h-10 ${tool.color}`} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            {seoContent.h1 || tool.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{tool.description}</p>
        </div>

        {/* Workspace */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col relative">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 font-medium border-b border-red-100 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                &times;
              </button>
            </div>
          )}

          {!resultUrl && (
            <div className="p-8 flex-1 flex flex-col justify-center">
              {files.length === 0 ? (
                <Dropzone
                  onDrop={handleDrop}
                  accept={tool.accept}
                  multiple={tool.multiple}
                  title={`Select ${tool.id === 'jpg-to-pdf' ? 'Images' : 'PDF file'}`}
                />
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Files ({files.length})</h3>
                    <button
                      onClick={() => setFiles([])}
                      className="text-sm text-gray-500 hover:text-red-500 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 overflow-y-auto max-h-60 p-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative group flex flex-col items-center text-center"
                      >
                        <button
                          onClick={() => removeFile(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10"
                        >
                          &times;
                        </button>
                        <FileText className="text-gray-400 w-12 h-12 mb-2" />
                        <p className="text-xs text-gray-600 truncate w-full font-medium" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ))}
                    {tool.multiple && (
                      <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-primary hover:bg-red-50 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept={Object.keys(tool.accept).join(',')}
                          onChange={(e) => handleDrop(Array.from(e.target.files))}
                          className="hidden"
                        />
                        <span className="text-3xl text-gray-400 mb-2">+</span>
                        <span className="text-sm font-medium text-gray-500">Add more</span>
                      </label>
                    )}
                  </div>

                  {(tool.id === 'split' || tool.id === 'protect' || tool.id === 'unlock' || tool.id === 'watermark') && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="text-sm font-bold text-gray-700 uppercase mb-4 flex items-center">
                        <Settings className="w-4 h-4 mr-2" /> Options
                      </h4>
                      {(tool.id === 'protect' || tool.id === 'unlock') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                          <div className="flex items-center">
                            <Lock className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                              placeholder={tool.id === 'protect' ? 'Enter new password' : 'Enter unlock password'}
                            />
                          </div>
                        </div>
                      )}
                      {tool.id === 'split' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Ranges (Optional)</label>
                          <input
                            type="text"
                            value={splitRanges}
                            onChange={(e) => setSplitRanges(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="e.g. 1-5,8,11-13 (Leave blank to split all)"
                          />
                        </div>
                      )}
                      {tool.id === 'watermark' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                          <input
                            type="text"
                            value={watermarkText}
                            onChange={(e) => setWatermarkText(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="CONFIDENTIAL"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-auto text-center">
                    <button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="bg-primary hover:bg-primary-dark text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          {tool.title} <ArrowRight className="ml-2 w-6 h-6" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {resultUrl && (
            <div className="p-12 flex-1 flex flex-col justify-center items-center text-center bg-gray-50">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Task completed successfully!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Your files have been processed and are ready to be downloaded.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={resultUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={resultUrl.startsWith('blob:') ? `${tool.id}-result.zip` : undefined}
                  className="bg-primary hover:bg-primary-dark text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-colors inline-block"
                >
                  Download File
                </a>
                <button
                  onClick={() => {
                    setFiles([]);
                    setResultUrl(null);
                  }}
                  className="bg-white border-2 border-primary text-primary hover:bg-red-50 text-lg font-bold py-4 px-10 rounded-full transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SEO Rich Content - 800-1200 words structure */}
        <section className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">How to Use</h2>
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">{seoContent.howTo}</p>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Features</h2>
          <ul className="list-disc pl-6 mb-8 text-lg text-gray-600 space-y-2">
            {seoContent.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Benefits</h2>
          <ul className="list-disc pl-6 mb-8 text-lg text-gray-600 space-y-2">
            {seoContent.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {seoContent.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-xl font-bold text-gray-800">{faq.q}</h3>
                <p className="text-gray-600 mt-2">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Internal linking */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">More PDF Tools</h3>
            <div className="flex flex-wrap gap-2">
              {tools
                .filter((t) => t.id !== tool.id)
                .slice(0, 5)
                .map((t) => (
                  <Link
                    key={t.id}
                    to={`/${t.slug || t.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full text-sm font-medium transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
              <Link
                to="/all-tools"
                className="px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-full text-sm font-medium transition-colors"
              >
                View All Tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolPage;

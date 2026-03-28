import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';

export default function AllTools() {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="All PDF Tools - Free Online PDF Converter & Editor"
        description="Complete list of free PDF tools: merge, split, compress, convert JPG to PDF, PDF to JPG, rotate, watermark, unlock, protect, add page numbers. All tools 100% free."
        url="/all-tools"
        breadcrumbItems={[
          { name: 'Home', url: '/' },
          { name: 'All Tools', url: '/all-tools' },
        ]}
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
          All PDF Tools – Free Online
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Every PDF tool you need in one place. Merge, split, compress, convert, rotate, and more.
          No installation. No registration. 100% free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const slug = tool.slug || tool.id;
            return (
              <Link
                key={tool.id}
                to={`/${slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center border border-transparent hover:border-primary/20 group"
              >
                <div className={`p-4 rounded-full ${tool.bg} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-10 h-10 ${tool.color}`} strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{tool.description}</p>
                <span className="mt-4 text-primary font-medium text-sm">
                  Use {tool.title} →
                </span>
              </Link>
            );
          })}
        </div>

        <section className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our PDF Tools?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our suite of PDF tools helps you merge PDFs, split documents, compress file sizes,
            convert between PDF and JPG, rotate pages, add watermarks, unlock and protect PDFs,
            and add page numbers—all from your browser. No software to install, no subscriptions,
            and your files are automatically deleted from our servers after processing.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you need to combine reports for work, extract pages from a contract, reduce
            PDF size for email, or convert images to PDF, we have the right tool. Every tool is
            free, secure, and works on any device.
          </p>
        </section>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="pdflynx - Free Online PDF Tools" 
        description="Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks."
        url="/"
      />
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Every tool you need to work with PDFs in one place</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
        <p className="mt-4">
          <Link to="/all-tools" className="text-primary font-medium hover:underline">View all PDF tools →</Link>
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const slug = tool.slug || tool.id;
          return (
            <Link 
              to={`/${slug}`} 
              key={tool.id}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center cursor-pointer border border-transparent hover:border-gray-200 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-primary transition-colors"></div>
              <Icon className={`w-12 h-12 ${tool.color} mb-4`} strokeWidth={1.5} />
              <h3 className="text-lg font-bold text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

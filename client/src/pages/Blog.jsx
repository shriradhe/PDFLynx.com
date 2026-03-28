import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="PDF Blog - Tips, Guides & How-To"
        description="Learn how to merge, split, compress, and convert PDFs. Free guides and tips for working with PDF files online."
        url="/blog"
        breadcrumbItems={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">PDF Tips & Guides</h1>
        <p className="text-xl text-gray-600 mb-12">
          How-to guides and best practices for working with PDFs online.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              <span className="text-sm text-primary font-medium">{post.category}</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-primary font-medium hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

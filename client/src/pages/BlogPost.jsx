import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blogPosts';
import SEO from '../components/SEO';

/** Simple markdown-like renderer: ## for h2, [text](url) for links */
function renderContent(text) {
  const blocks = text.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-gray-900">{block.slice(3)}</h2>;
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(Boolean);
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 my-4 text-gray-600">
          {items.map((item, j) => (
            <li key={j}>{item.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>
          ))}
        </ul>
      );
    }
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIdx = 0;
    let match;
    while ((match = linkRegex.exec(block)) !== null) {
      parts.push(block.slice(lastIdx, match.index));
      parts.push(
        match[2].startsWith('/') ? (
          <Link key={match.index} to={match[2]} className="text-primary hover:underline font-medium">{match[1]}</Link>
        ) : (
          <a key={match.index} href={match[2]} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">{match[1]}</a>
        )
      );
      lastIdx = linkRegex.lastIndex;
    }
    parts.push(block.slice(lastIdx));
    return <p key={i} className="text-gray-600 leading-relaxed my-4">{parts}</p>;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        breadcrumbItems={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-primary font-medium hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>
        <span className="text-sm text-primary font-medium">{post.category}</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-6">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{post.excerpt}</p>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          {renderContent(post.content)}
        </div>
      </article>
    </div>
  );
}

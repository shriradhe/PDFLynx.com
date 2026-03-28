import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import { tools } from './data/tools';
import useAuthStore from './store/authStore';

// Lazy load pages for code splitting & performance
const Home = lazy(() => import('./pages/Home'));
const AllTools = lazy(() => import('./pages/AllTools'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Faq = lazy(() => import('./pages/Faq'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function LoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
    </div>
  );
}

function App() {
  const { fetchMe } = useAuthStore();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <Navbar />
        <main className="flex flex-col flex-1 w-full bg-[#f3f0e8]">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all-tools" element={<AllTools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Clean URL routes: /merge-pdf, /split-pdf, etc.
                  Pass tool via element — literal paths have no :slug param, so useParams().slug was always undefined. */}
              {tools.map((t) => (
                <Route
                  key={t.id}
                  path={`/${t.slug || t.id}`}
                  element={<ToolPage tool={t} />}
                />
              ))}

              {/* Legacy /tool/:id redirects to clean URL */}
              <Route
                path="/tool/:id"
                element={<LegacyToolRedirect />}
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

function LegacyToolRedirect() {
  const { id } = useParams();
  const tool = tools.find((t) => t.id === id);
  const slug = tool?.slug || tool?.id;
  return slug ? <Navigate to={`/${slug}`} replace /> : <Navigate to="/" replace />;
}

export default App;

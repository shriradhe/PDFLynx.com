import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/pdflynx-logo.svg" alt="pdflynx" className="h-8 w-8" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">pdflynx</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-primary cursor-pointer font-medium">Home</Link>
          <Link to="/all-tools" className="text-gray-600 hover:text-primary cursor-pointer font-medium">All Tools</Link>
          <Link to="/blog" className="text-gray-600 hover:text-primary cursor-pointer font-medium">Blog</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary cursor-pointer font-medium">Dashboard</Link>
              <span className="text-gray-500">|</span>
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button 
                onClick={logout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-300 cursor-pointer transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary cursor-pointer font-medium">Login</Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary-dark cursor-pointer transition-colors">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

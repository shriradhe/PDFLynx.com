import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.history) {
      setHistory(user.history || []);
      setLoading(false);
    } else if (user) {
      // Fetch full user data including history
      api.get('/auth/me').then(res => {
        setHistory(res.data.history || []);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) {
    return <div className="p-8 text-center text-xl">Please login to view dashboard.</div>;
  }

  return (
    <div className="flex-1 w-full bg-[#f3f0e8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Processing History</h3>
          </div>
          {loading ? (
            <div className="p-6 text-center">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="p-6 text-center text-gray-500">You haven't processed any files yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {history.slice().reverse().map((item, idx) => (
                <li key={idx} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.tool}</p>
                    <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <a 
                      href={`http://localhost:5000/uploads/${item.filename}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-primary hover:text-primary-dark text-sm font-medium"
                    >
                      Download Again
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

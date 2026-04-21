import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 transition-colors duration-200">
      <nav className="bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-slate-950/30 border-b border-slate-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-indigo-600/10 text-indigo-300">
                <CheckSquare className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">TaskFlow AI</p>
                <p className="text-base font-semibold text-slate-100">Smart Productivity Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex flex-col text-right">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Signed in as</span>
                <span className="text-sm text-slate-200 font-medium">{user?.name}</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-slate-900/70 border border-slate-800 text-slate-200 hover:bg-slate-800 transition"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/70 text-slate-200 hover:bg-slate-800 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;

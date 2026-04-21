import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { CheckSquare, Loader2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      toast.success('Logged in successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to login';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] items-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="inline-flex items-center justify-center rounded-3xl bg-indigo-600/15 p-4 mb-8">
              <CheckSquare className="h-8 w-8 text-indigo-300" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome back to TaskFlow AI
            </h1>
            <p className="mt-5 max-w-xl text-slate-300 text-lg leading-8">
              Securely sign in and manage your tasks with AI-powered suggestions, progress insights, and a beautifully polished productivity dashboard.
            </p>

            <div className="mt-10 grid gap-4">
              <div className="rounded-3xl bg-slate-950/70 p-5 border border-slate-700/80">
                <div className="flex items-center gap-3 text-slate-100">
                  <ShieldCheck className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm">Secure login with JWT and bcrypt</span>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-5 border border-slate-700/80">
                <div className="flex items-center gap-3 text-slate-100">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm">AI-driven task suggestions for better planning</span>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-5 border border-slate-700/80">
                <div className="flex items-center gap-3 text-slate-100">
                  <ArrowRight className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm">Modern dashboard UX built for real work</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-indigo-300">Sign in</p>
              <h2 className="mt-4 text-3xl font-bold text-white">Access your smart productivity workspace</h2>
              <p className="mt-3 text-slate-400">Enter your credentials to continue building a better task workflow.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-3xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : 'Sign in'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">
              New to TaskFlow AI?{' '}
              <Link to="/register" className="font-semibold text-indigo-300 hover:text-indigo-200">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

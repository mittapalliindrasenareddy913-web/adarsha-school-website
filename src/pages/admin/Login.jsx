import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import SEO from '../../components/SEO';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      setLoading(false);
      if (res && res.success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex items-center justify-center p-4 font-sans">
      <SEO title="Admin Login | Adarsha High School CMS" />

      <div className="w-full max-w-md bg-white border border-amber-200/80 rounded-3xl p-8 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-sm font-black">
            <ShieldCheck className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Adarsha CMS Portal</h1>
          <p className="text-xs text-slate-600">School Management System Authentication</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.com"
                className="w-full pl-11 pr-4 py-3 bg-white border border-amber-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-white border border-amber-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>LOG IN TO CMS</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-slate-500 hover:text-amber-800 transition-colors font-semibold">
            ← Back to Public School Website
          </a>
        </div>

      </div>
    </div>
  );
}

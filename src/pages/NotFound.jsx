import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight, Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <SEO title="Page Not Found (404)" description="The page you are looking for does not exist." />

      <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-3">
        404 — Page Not Found
      </h1>

      <p className="text-base sm:text-xl text-slate-300 max-w-md font-normal leading-relaxed mb-8">
        Looks like this page took a different route.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 py-4 px-8 rounded-2xl font-extrabold text-sm text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-xl transition-all"
      >
        <Home className="w-4 h-4" />
        <span>BACK TO HOME</span>
      </Link>
    </div>
  );
}

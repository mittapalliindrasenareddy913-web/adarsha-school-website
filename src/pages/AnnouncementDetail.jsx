import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import SEO from '../components/SEO';
import { Calendar, ArrowLeft, AlertCircle } from 'lucide-react';

export default function AnnouncementDetail() {
  const { slug } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotice() {
      setLoading(true);
      const data = await api.getAnnouncementBySlug(slug);
      setAnnouncement(data);
      setLoading(false);
    }
    loadNotice();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B192C] text-white flex items-center justify-center pt-24 font-sans">
        <p className="text-sm font-bold text-amber-400 animate-pulse">Loading Notice Details...</p>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-[#0B192C] text-white flex flex-col items-center justify-center pt-24 space-y-4 font-sans">
        <h2 className="text-2xl font-black">Announcement Not Found</h2>
        <Link to="/announcements" className="px-6 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs">
          BACK TO ANNOUNCEMENTS
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO title={`${announcement.title} | Adarsha E.M. School`} description={announcement.shortDescription} />

      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 bg-[#0B192C] text-white overflow-hidden border-b border-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notice Board</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded text-xs font-extrabold uppercase tracking-wider bg-[#0B192C] text-amber-400 border border-amber-500/20">
              {announcement.category}
            </span>

            {announcement.priority === 'High' && (
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#991B1B] bg-rose-50 border border-rose-200 px-3 py-1 rounded">
                <AlertCircle className="w-3.5 h-3.5" />
                Urgent Notice
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            {announcement.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold pt-1">
            <Calendar className="w-4 h-4 text-[#D97706]" />
            <span>Published: {announcement.dateFormatted || announcement.date}</span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 sm:p-10 rounded-lg border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-[#0B192C] border-b border-slate-100 pb-3">
            Official Notice Details
          </h2>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
            {announcement.fullDescription || announcement.shortDescription}
          </p>
        </div>
      </section>

    </div>
  );
}

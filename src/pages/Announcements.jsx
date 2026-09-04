import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { Calendar, ChevronRight, AlertCircle } from 'lucide-react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getAnnouncements();
      if (data) setAnnouncements(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="School Announcements & Official Notices | Adarsha E.M. School"
        description="Stay updated with official notices, exam timetables, holiday schedules, and admission alerts from Adarsha E.M. School."
      />

      <PageHero
        eyebrow="ANNOUNCEMENTS & NOTICES"
        title="Official School Updates"
        subtitle="Stay informed with real-time notice board announcements, exam schedules, and circulars."
        bgImage={images.announcementDefault}
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <SectionHeading
          badge="NOTICE BOARD"
          title="Recent Announcements"
          subtitle="Click on any notice to read the complete circular details."
        />

        <div className="space-y-4">
          {announcements.map((ann, idx) => (
            <div
              key={ann.id || idx}
              className="bg-white p-6 sm:p-7 rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col sm:flex-row items-start justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0B192C] text-amber-400 border border-amber-500/20">
                    {ann.category || 'NOTICE'}
                  </span>

                  {ann.priority === 'High' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#991B1B] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3 h-3" />
                      URGENT
                    </span>
                  )}

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    {ann.dateFormatted || ann.date}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0B192C]">
                  {ann.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ann.shortDescription || ann.fullDescription}
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  to={`/announcements/${ann.slug || ann.id}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-xs bg-[#0B192C] hover:bg-[#1E3E62] text-white transition-colors"
                >
                  <span>Read Circular</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

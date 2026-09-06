import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { Calendar, ChevronRight } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getEvents();
      if (data) setEvents(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="School Events & Functions | Adarsha High School"
        description="Explore upcoming annual day galas, sports meets, science fairs, and school celebrations at Adarsha High School."
      />

      <PageHero
        eyebrow="EVENTS & CELEBRATIONS"
        title="Life beyond the classroom."
        subtitle="Annual cultural galas, sports day competitions, science exhibitions, and national day parades."
        badgeBg="bg-orange-600"
        badgeBorder="border-orange-400/40"
        badgeIcon={Calendar}
        gradientTo="to-orange-950/60"
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="SCHOOL CALENDAR"
          title="Events & Functions"
          subtitle="Discover upcoming and past school celebrations."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev, idx) => (
            <div key={ev.id || idx} className="bg-white rounded-lg border border-slate-200 border-t-2 border-t-orange-600 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-orange-950 flex flex-col items-center justify-center p-6 text-center text-white">
                  {ev.coverImage || ev.imageUrl || ev.url ? (
                    <>
                      <img
                        src={ev.coverImage || ev.imageUrl || ev.url}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400 mx-auto shadow-inner">
                        <Calendar className="w-7 h-7" />
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase">{ev.name}</h4>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B192C] text-orange-400 text-[10px] font-extrabold uppercase tracking-wider border border-orange-500/30">
                    {ev.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-600">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>{ev.dateFormatted || ev.date}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0B192C] group-hover:text-[#1E3E62] transition-colors">
                    {ev.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {ev.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/events/${ev.slug || ev.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-xs bg-slate-100 hover:bg-[#0B192C] hover:text-white text-slate-800 transition-colors"
                >
                  <span>View Event Details & Media</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

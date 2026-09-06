import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { Trophy, Award, Medal, Sparkles } from 'lucide-react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getAchievements();
      if (data) setAchievements(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Student Achievements & Milestones | Adarsha High School"
        description="Celebrating student performance across board exams, sports championships, and cultural awards at Adarsha High School."
      />

      <PageHero
        eyebrow="MILESTONES & HONORS"
        title="Moments worth celebrating."
        subtitle="Recognizing outstanding student accomplishments across academic board exams, athletics tournaments, science fairs, and cultural arts."
        badgeBg="bg-amber-500"
        badgeBorder="border-amber-400/50"
        badgeIcon={Trophy}
        gradientTo="to-amber-950/60"
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="ACHIEVEMENTS TIMELINE"
          title="Celebrating Excellence"
          subtitle="A timeline of milestones accomplished by our students and school community."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach, idx) => {
            const isTopHonor = idx === 0 || ach.category?.toLowerCase().includes('excellence') || ach.category?.toLowerCase().includes('distinction');
            
            return (
              <div key={ach.id || idx} className="bg-white rounded-lg border border-slate-200 border-t-2 border-t-amber-500 shadow-xs overflow-hidden flex flex-col justify-between group">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-amber-950 flex flex-col items-center justify-center p-6 text-center text-white">
                  {ach.image || ach.imageUrl || ach.url ? (
                    <>
                      <img
                        src={ach.image || ach.imageUrl || ach.url}
                        alt={ach.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase">{ach.title}</h4>
                    </div>
                  )}

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-[#0B192C] text-amber-400 text-xs font-extrabold shadow-xs border border-amber-500/30">
                      {ach.year}
                    </span>

                    {/* Limited Crimson Distinction Tag for top honors */}
                    {isTopHonor && (
                      <span className="px-2.5 py-0.5 rounded bg-rose-950/80 text-rose-300 text-[10px] font-bold border border-rose-700/50 uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <Medal className="w-3 h-3 text-rose-400" />
                        <span>High Distinction</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-7 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 block">
                      {ach.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0B192C] group-hover:text-[#1E3E62] transition-colors">
                    {ach.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { CheckCircle2, Building2 } from 'lucide-react';

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getFacilities();
      if (data) setFacilities(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Campus Facilities & Infrastructure | Adarsha High School"
        description="Explore smart classrooms, science laboratories, computer hub, sports complex, and campus security at Adarsha High School."
      />

      <PageHero
        eyebrow="INFRASTRUCTURE"
        title="A place designed for discovery."
        subtitle="Our campus features modern interactive smart classrooms, science labs, computer workstations, library, and sports grounds."
        badgeBg="bg-green-600"
        badgeBorder="border-emerald-400/40"
        badgeIcon={Building2}
        gradientTo="to-emerald-950/60"
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="CAMPUS SHOWCASE"
          title="Modern Learning Spaces"
          subtitle="Explore the key facilities built to foster student growth, safety, and physical well-being."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {facilities.map((fac, idx) => (
            <div key={fac.id || idx} className="bg-white rounded-lg border border-slate-200 border-t-2 border-t-green-600 shadow-xs overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-60 overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white">
                  {fac.image || fac.imageUrl || fac.url ? (
                    <>
                      <img
                        src={fac.image || fac.imageUrl || fac.url}
                        alt={fac.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-bold text-white uppercase">{fac.title}</h4>
                    </div>
                  )}
                  
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded bg-[#0B192C] text-emerald-400 text-xs font-extrabold shadow-xs border border-emerald-500/20">
                    {fac.title}
                  </span>
                </div>

                <div className="p-7 space-y-4">
                  <h3 className="text-2xl font-black text-[#0B192C]">{fac.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{fac.description}</p>

                  {fac.features && fac.features.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                        Key Infrastructure Features:
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                        {fac.features.map((ft, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{ft}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

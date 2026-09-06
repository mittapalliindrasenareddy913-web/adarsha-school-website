import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { User } from 'lucide-react';

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await api.getFaculty();
      if (data) setFaculty(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Faculty & Educators Directory | Adarsha High School"
        description="Meet the dedicated teaching faculty and department educators at Adarsha High School."
      />

      <PageHero
        eyebrow="FACULTY DIRECTORY"
        title="Empowered Educators"
        subtitle="Dedicated teaching faculty committed to nurturing individual student potential, critical thinking, and moral values."
        badgeBg="bg-indigo-600"
        badgeBorder="border-indigo-400/40"
        badgeIcon={User}
        gradientTo="to-indigo-950/60"
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="TEACHING TEAM"
          title="Meet Our Faculty"
          subtitle="Qualified educators guiding primary, middle, and secondary students."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((teacher, idx) => (
            <div key={teacher.id || idx} className="bg-white rounded-lg border border-slate-200 border-t-2 border-t-indigo-600 shadow-xs hover:shadow-md overflow-hidden transition-all group space-y-4 p-6 text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto bg-slate-100 border-2 border-indigo-500/40 flex items-center justify-center shadow-xs">
                {teacher.photo || teacher.imageUrl || teacher.url ? (
                  <img
                    src={teacher.photo || teacher.imageUrl || teacher.url}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <User className="w-14 h-14 text-indigo-600/70" />
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#0B192C]">{teacher.name}</h3>
                <span className="text-xs font-extrabold text-indigo-600 block mt-0.5">{teacher.designation}</span>
                <span className="text-[11px] text-slate-500 block">{teacher.qualification} • {teacher.subject}</span>
              </div>

              {teacher.bio && (
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <p>{teacher.bio}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

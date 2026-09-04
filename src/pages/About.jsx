import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, BookOpen } from 'lucide-react';

export default function About() {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await api.getSiteSettings();
      if (data) setSiteData(data);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="About Our School | Adarsha E.M. School"
        description="Learn about Adarsha E.M. School history, leadership values, educational vision, and mission in Kadiri."
      />

      <PageHero
        eyebrow="OUR STORY & PHILOSOPHY"
        title="More than a school. A foundation for life."
        subtitle="Adarsha E.M. School provides a structured, supportive learning environment dedicated to developing curious, responsible, and ethical students."
        bgImage={siteData?.leadershipPhoto || images.aboutCampus}
        badgeBg="bg-emerald-600"
        badgeBorder="border-emerald-400/40"
        gradientTo="to-emerald-950/60"
      />

      {/* Leadership Desk Message */}
      <section id="leadership" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden shadow-md border border-slate-200 bg-white p-2">
              {siteData?.leadershipPhoto ? (
                <img
                  src={siteData.leadershipPhoto}
                  alt="Leadership Desk"
                  className="w-full h-[280px] sm:h-[420px] object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-[280px] sm:h-[420px] rounded-lg bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold">Correspondent / Principal Desk</h4>
                  <p className="text-xs text-slate-300">Adarsha E.M. School, Kadiri</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                  Leadership Message
                </span>
                <h4 className="text-xl font-extrabold">Correspondent / Principal Desk</h4>
                <p className="text-xs text-slate-300">Adarsha E.M. School, Kadiri</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              align="left"
              badge="LEADERSHIP VISION"
              title="Guiding Young Minds Towards Excellence"
              subtitle="Education is not merely the accumulation of facts, but the training of the mind to think and character to lead."
            />

            <p className="text-slate-700 text-base leading-relaxed">
              Welcome to Adarsha E.M. School. Our mission is to nurture confident, ethically grounded, and intellectually curious young minds. We provide a safe, supportive environment where academic rigor meets joyful discovery.
            </p>

            <p className="text-slate-700 text-base leading-relaxed">
              Our dedicated teaching faculty encourages every child to explore their unique talents, develop problem-solving skills, and practice discipline and empathy in daily campus life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-emerald-600 shadow-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0B192C]">Safe Campus</h4>
                  <p className="text-xs text-slate-500">24/7 security & staff guidance</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-teal-600 shadow-xs flex items-start gap-3">
                <Award className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0B192C]">Academic Rigor</h4>
                  <p className="text-xs text-slate-500">Structured English curriculum</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-16 sm:py-24 bg-[#0B192C] text-white border-y border-slate-800 px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="p-8 rounded-lg bg-[#1E3E62]/40 border border-emerald-500/20 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be a leading educational institution in the region recognized for fostering academic excellence, moral integrity, and modern technological readiness in young learners.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-[#1E3E62]/40 border border-teal-500/20 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To empower every student through conceptual learning, disciplined habits, sports participation, and moral values in a supportive, safe educational atmosphere.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="OUR CORE VALUES"
          title="Pillars That Shape Character"
          subtitle="The moral foundation underlying every classroom lesson and co-curricular activity."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(siteData?.values || [
            { name: "Excellence", desc: "Striving for high standards in academic and personal growth." },
            { name: "Integrity", desc: "Upholding honesty, respect, and ethical principles in all actions." },
            { name: "Curiosity", desc: "Encouraging continuous questioning, discovery, and active learning." },
            { name: "Compassion", desc: "Fostering empathy, kindness, and strong community responsibility." }
          ]).map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-lg bg-white border border-slate-200 border-t-2 border-t-emerald-600 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-extrabold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B192C]">{val.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

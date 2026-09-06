import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, BookOpen, Calendar, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

import { useSiteSettings } from '../context/SiteContext';

export default function About() {
  const { siteSettings } = useSiteSettings();
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await api.getSiteSettings();
      if (data) setSiteData(data);
    }
    loadData();
  }, []);

  const site = siteSettings || siteData;
  const about = site?.about || {};

  // Paragraph helper
  const renderParagraphs = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((p, idx) => (
      <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4 last:mb-0">
        {p.trim()}
      </p>
    ));
  };

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="About Our School | Adarsha High School"
        description="Learn about Adarsha High School history, leadership values, educational vision, and mission in Thamballapalle."
      />

      <PageHero
        eyebrow="OUR STORY & PHILOSOPHY"
        title="More than a school. A foundation for life."
        subtitle={about.heroSubtitle || "Adarsha High School provides a structured, supportive learning environment dedicated to developing curious, responsible, and ethical students."}
        bgImage={about.aboutImage || siteData?.leadershipPhoto || images.aboutCampus}
        badgeBg="bg-emerald-600"
        badgeBorder="border-emerald-400/40"
        gradientTo="to-emerald-950/60"
      />

      {/* 1. LEADERSHIP DESK MESSAGE */}
      <section id="leadership" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28 space-y-12">
        <SectionHeading
          badge="LEADERSHIP DESK"
          title="Guiding Young Minds Towards Excellence"
          subtitle="Education is not merely the accumulation of facts, but the training of the mind to think and character to lead."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* DIRECTOR PROFILE */}
          {(siteData?.leadership?.correspondent?.enabled ?? true) && (() => {
            const corr = siteData?.leadership?.correspondent || {};
            const photo = corr.photo || siteData?.leadershipPhoto;
            return (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between p-5 space-y-5">
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    {photo ? (
                      <img
                        src={photo}
                        alt={corr.name || "Director"}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                        <Award className="w-12 h-12 text-emerald-400 opacity-80" />
                        <h4 className="text-base font-extrabold tracking-wide uppercase">DIRECTOR PHOTO</h4>
                        <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                          Photo can be uploaded via Admin CMS
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-[#0B192C]/90 px-2.5 py-1 rounded border border-emerald-500/30 inline-block mb-1">
                        DIRECTOR
                      </span>
                      <h4 className="text-lg font-extrabold text-white">{corr.name || "Director Desk"}</h4>
                      <p className="text-xs text-slate-300">{corr.designation && corr.designation !== 'Correspondent' ? corr.designation : "Director"}</p>
                    </div>
                  </div>

                  {corr.quote && (
                    <p className="text-xs italic font-semibold text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      "{corr.quote}"
                    </p>
                  )}

                  {corr.message ? (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {corr.message}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Welcome to Adarsha High School. Our mission is to nurture confident, ethically grounded, and intellectually curious young minds in a supportive learning environment.
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Adarsha High School, Thamballapalle</span>
                </div>
              </div>
            );
          })()}

          {/* PRINCIPAL PROFILE */}
          {(siteData?.leadership?.principal?.enabled ?? true) && (() => {
            const prin = siteData?.leadership?.principal || {};
            const photo = prin.photo;
            return (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between p-5 space-y-5">
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    {photo ? (
                      <img
                        src={photo}
                        alt={prin.name || "Principal"}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-emerald-950 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                        <Award className="w-12 h-12 text-emerald-400 opacity-80" />
                        <h4 className="text-base font-extrabold tracking-wide uppercase">PRINCIPAL PHOTO</h4>
                        <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                          Photo can be uploaded via Admin CMS
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-[#0B192C]/90 px-2.5 py-1 rounded border border-emerald-500/30 inline-block mb-1">
                        PRINCIPAL
                      </span>
                      <h4 className="text-lg font-extrabold text-white">{prin.name || "Principal Desk"}</h4>
                      <p className="text-xs text-slate-300">{prin.designation || "Principal"}</p>
                    </div>
                  </div>

                  {prin.quote && (
                    <p className="text-xs italic font-semibold text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      "{prin.quote}"
                    </p>
                  )}

                  {prin.message ? (
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {prin.message}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our dedicated teaching faculty encourages every student to explore their unique strengths, master academic fundamentals, and practice discipline and empathy daily.
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Adarsha High School, Thamballapalle</span>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 2. INTRODUCTION & HISTORY (LONG-FORM STORY) */}
      {(about.introduction || about.history) && (
        <section id="story" className="py-16 sm:py-24 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <SectionHeading
              badge="OUR FOUNDATION"
              title="Building Character & Academic Excellence"
              subtitle="The history, origin, and community values shaping Adarsha High School."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {about.introduction && (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B192C]">Welcome & Introduction</h3>
                  <div>{renderParagraphs(about.introduction)}</div>
                </div>
              )}

              {about.history && (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B192C]">School History & Growth</h3>
                  <div>{renderParagraphs(about.history)}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. MILESTONES & JOURNEY TIMELINE */}
      {Array.isArray(about.journey) && about.journey.length > 0 && (
        <section id="timeline" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <SectionHeading
            badge="OUR JOURNEY"
            title="Key Historical Milestones"
            subtitle="Evolution of Adarsha High School over the years."
          />

          <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
            {about.journey.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white shadow-xs" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                  {item.year}
                </span>
                <h4 className="text-lg font-extrabold text-[#0B192C]">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 4. VISION & MISSION */}
      <section id="vision" className="py-16 sm:py-24 bg-[#0B192C] text-white border-y border-slate-800 px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="p-8 rounded-2xl bg-[#1E3E62]/40 border border-emerald-500/20 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {about.vision || "To be a leading educational institution in the region recognized for fostering academic excellence, moral integrity, and modern technological readiness in young learners."}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#1E3E62]/40 border border-teal-500/20 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {about.mission || "To empower every student through conceptual learning, disciplined habits, sports participation, and moral values in a supportive, safe educational atmosphere."}
            </p>
          </div>

        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="OUR CORE VALUES"
          title="Pillars That Shape Character"
          subtitle="The moral foundation underlying every classroom lesson and co-curricular activity."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(about.values?.length ? about.values : (siteData?.values || [
            { name: "Excellence", desc: "Striving for high standards in academic and personal growth." },
            { name: "Integrity", desc: "Upholding honesty, respect, and ethical principles in all actions." },
            { name: "Curiosity", desc: "Encouraging continuous questioning, discovery, and active learning." },
            { name: "Compassion", desc: "Fostering empathy, kindness, and strong community responsibility." }
          ])).map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 border-t-4 border-t-emerald-600 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-extrabold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-extrabold text-[#0B192C]">{val.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. EDUCATIONAL PHILOSOPHY & TEACHING APPROACH */}
      {(about.philosophy || about.approach) && (
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <SectionHeading
              badge="ACADEMIC METHODOLOGY"
              title="Educational Philosophy & Teaching Approach"
              subtitle="How we teach, mentor, and inspire student learning."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {about.philosophy && (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                  <h3 className="text-xl font-extrabold text-[#0B192C]">Educational Philosophy</h3>
                  <div>{renderParagraphs(about.philosophy)}</div>
                </div>
              )}

              {about.approach && (
                <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                  <h3 className="text-xl font-extrabold text-[#0B192C]">Teaching & Learning Approach</h3>
                  <div>{renderParagraphs(about.approach)}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. STUDENT DEVELOPMENT & ADDITIONAL INFO */}
      {(about.studentDevelopment || about.additionalInfo) && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {about.studentDevelopment && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0B192C]">Student Development & Holistic Care</h3>
                <div>{renderParagraphs(about.studentDevelopment)}</div>
              </div>
            )}

            {about.additionalInfo && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0B192C]">Recognition & Institutional Details</h3>
                <div>{renderParagraphs(about.additionalInfo)}</div>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

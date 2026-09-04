import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, PhoneCall } from 'lucide-react';
import { schoolData } from '../data/schoolData';
import { motion } from 'framer-motion';
import { useSiteSettings } from '../context/SiteContext';

export default function CTASection() {
  const { siteSettings } = useSiteSettings();
  const yearText = siteSettings?.admissionAcademicYear || '2026–27';

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
        
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Admissions Open {yearText}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Give Your Child the <span className="text-amber-400">Right Start</span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Begin your child's journey toward knowledge, confidence and lifelong success at Adarsha High School, Thamballapalle.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admissions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-extrabold text-base text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-xl hover:shadow-amber-500/25 active:scale-95 transition-all"
            >
              <span>Enquire About Admissions</span>
              <ChevronRight className="w-5 h-5" />
            </Link>

            <a
              href={`tel:${schoolData.contact.phonePrimary}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-bold text-base text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 backdrop-blur-sm transition-all"
            >
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

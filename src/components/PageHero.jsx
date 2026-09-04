import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  bgImage,
  badgeBg = "bg-amber-500",
  badgeBorder = "border-amber-400/40",
  badgeIcon: BadgeIcon = Sparkles,
  gradientTo = "to-[#1E3E62]/80"
}) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#0B192C] text-white overflow-hidden border-b border-slate-800 font-sans">
      {/* Background Image Overlay */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/90 ${gradientTo}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest ${badgeBg} text-white shadow-xs mb-4 border ${badgeBorder}`}
          >
            {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-white" />}
            <span>{eyebrow}</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

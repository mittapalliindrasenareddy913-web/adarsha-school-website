import React from 'react';

export default function SectionHeading({ badge, title, subtitle, align = "center", className = "" }) {
  const alignClass = align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";

  return (
    <div className={`flex flex-col ${alignClass} mb-8 sm:mb-12 ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-widest bg-[#0B192C] text-amber-400 border border-amber-500/30 shadow-xs mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{badge}</span>
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B192C] tracking-tight leading-[1.12]">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

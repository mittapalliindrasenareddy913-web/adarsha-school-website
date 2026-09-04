import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import { Palette, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function ThemeExplorer() {
  const { themes, activeThemeId, changeTheme } = useTheme();
  const navigate = useNavigate();

  const handleSelectTheme = (themeId) => {
    changeTheme(themeId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title="10 Natural School Themes | Adarsha E.M. School"
        description="Visual Theme Exploration — Compare 10 Natural, Light, Warm, Human-Friendly Color Systems for Adarsha E.M. School."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Banner Heading */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>NATURAL & HUMAN-FRIENDLY VISUAL EXPLORATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            10 Natural, Light & Warm School Color Themes
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Designed for an authentic Indian school experience — airy, warm, friendly, and student-focused. Every theme keeps 100% of Adarsha E.M. School's content, pages, and functionality intact.
          </p>
        </div>

        {/* 10 Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((t) => {
            const isActive = t.id === activeThemeId;
            return (
              <div
                key={t.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-amber-400 ring-2 ring-amber-400/50 shadow-xl scale-[1.02]'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Active Indicator Badge */}
                {isActive && (
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CURRENTLY ACTIVE PREVIEW</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Theme Header */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800">
                      {t.colorFamily} Palette
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">
                      {t.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 italic mt-0.5">
                      "{t.tagline}"
                    </p>
                  </div>

                  {/* Color Swatches Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Color Swatches
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: t.swatches.primary }}
                        />
                        <span className="text-[9px] text-slate-500">Primary</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: t.swatches.secondary }}
                        />
                        <span className="text-[9px] text-slate-500">Secondary</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: t.swatches.accent }}
                        />
                        <span className="text-[9px] text-slate-500">Accent</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: t.swatches.ctaBg }}
                        />
                        <span className="text-[9px] text-slate-500">CTA</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-slate-200 shadow-inner"
                          style={{ backgroundColor: t.swatches.background }}
                        />
                        <span className="text-[9px] text-slate-500">Bg</span>
                      </div>
                    </div>
                  </div>

                  {/* Design Specs Summary */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Personality:</span>
                      <span className="font-semibold text-right text-slate-900">{t.personality}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Card Geometry:</span>
                      <span className="font-mono text-emerald-800 font-bold">{t.styles.cardRadius}</span>
                    </div>
                  </div>

                  {/* UI Mini Components Mock */}
                  <div className="p-4 rounded-2xl border border-slate-200 space-y-3 shadow-inner" style={{ backgroundColor: t.swatches.background }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Live Component Preview
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold ${t.styles.pillRadius} ${t.styles.badgeStyle}`}>
                        Sample Badge
                      </span>
                      <button
                        className={`px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all ${t.styles.btnRadius}`}
                        style={{ backgroundColor: t.swatches.ctaBg }}
                      >
                        Action Button
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preview CTA Button */}
                <button
                  onClick={() => handleSelectTheme(t.id)}
                  className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md'
                      : 'bg-slate-900 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <span>PREVIEW HOMEPAGE IN {t.shortName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

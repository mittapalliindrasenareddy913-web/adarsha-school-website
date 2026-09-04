import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Palette, Eye, EyeOff, Sparkles, ChevronRight, LayoutGrid } from 'lucide-react';

export default function ThemeSwitcherBar() {
  const { activeThemeId, activeTheme, themes, changeTheme, switcherHidden, toggleSwitcherVisibility } = useTheme();
  const location = useLocation();

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Theme Preview Control Center">
      {/* Minimized Toggle Button when hidden */}
      {switcherHidden && (
        <button
          onClick={toggleSwitcherVisibility}
          className="fixed bottom-5 right-5 z-[100] px-4 py-2.5 rounded-full bg-slate-950/90 text-amber-400 border border-amber-400/40 shadow-2xl flex items-center gap-2 text-xs font-bold hover:scale-105 transition-all backdrop-blur-md"
          title="Open Theme Exploration Switcher"
        >
          <Palette className="w-4 h-4 text-amber-400" />
          <span>SHOW 10 THEME PREVIEW BAR</span>
          <Eye className="w-3.5 h-3.5 ml-1" />
        </button>
      )}

      {/* Main Floating Dock */}
      {!switcherHidden && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl bg-slate-950/95 text-white border border-slate-700/80 rounded-2xl p-3 shadow-2xl backdrop-blur-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Left Info Label */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                    CLIENT PREVIEW MODE
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
                    10 Color Systems
                  </span>
                </div>
                <h4 className="text-xs font-extrabold text-white">
                  Active: <span className="text-amber-300">{activeTheme.name}</span> — {activeTheme.tagline}
                </h4>
              </div>
            </div>

            {/* Middle Color Swatch Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none py-1 px-2 bg-slate-900/80 rounded-xl border border-slate-800">
              {themes.map((t) => {
                const isActive = t.id === activeThemeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-400/50 scale-105'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={`${t.name}: ${t.tagline}`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: t.swatches.primary }}
                    />
                    <span className="text-[11px] whitespace-nowrap">{t.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/theme-explorer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/15 transition-all"
                title="View Full Theme Explorer & Specs Catalog"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Theme Catalog</span>
              </Link>

              <button
                onClick={toggleSwitcherVisibility}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                title="Hide bar for clean screenshots"
              >
                <EyeOff className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </aside>
  );
}

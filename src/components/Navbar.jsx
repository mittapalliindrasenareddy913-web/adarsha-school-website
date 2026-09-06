import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Building2,
  Users,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  BellRing
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteContext';
import { api } from '../services/api';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [tickerAnnouncements, setTickerAnnouncements] = useState([]);
  
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState({
    about: false,
    academics: false,
    campus: false
  });

  const location = useLocation();
  const { siteSettings } = useSiteSettings();

  const schoolName = siteSettings?.schoolName || 'Adarsha High School';
  const primaryPhone = String(siteSettings?.contact?.phonePrimary || '+91 8222844480');
  const primaryEmail = String(siteSettings?.contact?.email || 'info@adarshaschool.in');
  const workingHours = String(siteSettings?.contact?.workingHours || 'Mon - Sat: 8:30 AM – 4:30 PM');
  const rawLandmark = String(siteSettings?.location?.landmark || siteSettings?.location?.address || 'Cross Road, Thamballapalle');
  const addressShort = rawLandmark.replace(/Near Main Road,\s*Kadiri/gi, 'Cross Road, Thamballapalle').replace(/Kadiri/gi, 'Thamballapalle');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch active announcements for the responsive notice ticker
  useEffect(() => {
    async function loadTicker() {
      try {
        const anns = await api.getAnnouncements();
        if (Array.isArray(anns) && anns.length > 0) {
          const now = new Date();
          const valid = anns.filter(item => {
            if (item.status && item.status !== 'published') return false;
            if (item.startDate && new Date(item.startDate) > now) return false;
            if (item.endDate && new Date(item.endDate) <= now) return false;
            const mode = item.displayMode || (item.showPopup ? 'Popup' : 'Scrolling Bar');
            return mode === 'Scrolling Bar' || mode === 'Both' || !item.displayMode;
          });
          setTickerAnnouncements(valid);
        }
      } catch (err) {
        setTickerAnnouncements([]);
      }
    }
    loadTicker();
  }, []);

  // Auto close menu on route change & handle body scroll lock when open
  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded({ about: false, academics: false, campus: false });
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMobileAccordion = (key) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 font-sans shadow-md bg-white">
      
      {/* 1. TOP UTILITY BAR (Matching Reference Desktop & Mobile) */}
      <div className="bg-[#0B192C] text-slate-200 text-[11px] font-medium py-2 px-3 sm:px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Mobile Utility Bar: THAMBALLAPALLE, AP (Left) | Phone (Right) */}
          <div className="flex items-center gap-1.5 text-slate-200 font-extrabold sm:hidden">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="uppercase tracking-wider">THAMBALLAPALLE, AP</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-400 font-extrabold sm:hidden">
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`}>{primaryPhone}</a>
          </div>

          {/* Desktop Utility Bar: Full Location + Contacts */}
          <div className="hidden sm:flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold">{addressShort}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">State Board Recognized • High School</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300 shrink-0">
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-bold text-amber-400"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{primaryPhone}</span>
              </a>
            )}

            {primaryEmail && (
              <a
                href={`mailto:${primaryEmail}`}
                className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{primaryEmail}</span>
              </a>
            )}

            {workingHours && (
              <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                <span>{workingHours}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION NAVBAR */}
      <div
        className={`bg-white border-b border-slate-200 transition-all duration-200 ${
          scrolled ? 'py-2.5 shadow-xs' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            {siteSettings?.logo ? (
              <img
                src={siteSettings.logo}
                alt={schoolName}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-lg transition-transform group-hover:scale-105 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#0B192C] text-amber-400 flex items-center justify-center font-black shadow-xs transition-transform group-hover:scale-105 shrink-0 border border-slate-800">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-xl font-black tracking-tight text-[#0B192C] group-hover:text-blue-900 transition-colors truncate uppercase">
                {schoolName}
              </span>
            </div>
          </Link>

          {/* Desktop Direct Main Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/'
                  ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                  : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
              }`}
            >
              Home
            </Link>

            {/* ABOUT Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/about"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  location.pathname === '/about'
                    ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                    : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1 z-50"
                  >
                    <Link
                      to="/about"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">About School</div>
                      <div className="text-[10px] text-slate-500 font-normal">Our story, campus, & history</div>
                    </Link>
                    <Link
                      to="/about#leadership"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Leadership & Management</div>
                      <div className="text-[10px] text-slate-500 font-normal">Director & Principal desk</div>
                    </Link>
                    <Link
                      to="/about#vision"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Vision & Mission</div>
                      <div className="text-[10px] text-slate-500 font-normal">Core educational philosophy</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACADEMICS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academics')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to="/academics"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  location.pathname === '/academics'
                    ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                    : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
                }`}
              >
                <span>Academics</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>

              <AnimatePresence>
                {activeDropdown === 'academics' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1 z-50"
                  >
                    <Link
                      to="/academics"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Curriculum Overview</div>
                      <div className="text-[10px] text-slate-500 font-normal">CBSE / State syllabus framework</div>
                    </Link>
                    <Link
                      to="/academics#primary"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Primary Level</div>
                      <div className="text-[10px] text-slate-500 font-normal">Grades I – V foundational learning</div>
                    </Link>
                    <Link
                      to="/academics#middle"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Middle Level</div>
                      <div className="text-[10px] text-slate-500 font-normal">Grades VI – VIII conceptual clarity</div>
                    </Link>
                    <Link
                      to="/academics#secondary"
                      className="block px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <div className="font-extrabold">Secondary Level</div>
                      <div className="text-[10px] text-slate-500 font-normal">Grades IX – X board readiness</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CAMPUS LIFE Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('campus')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                  ['/facilities', '/faculty', '/gallery'].includes(location.pathname)
                    ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                    : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
                }`}
              >
                <span>Campus Life</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'campus' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1 z-50"
                  >
                    <Link
                      to="/facilities"
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold">Facilities</div>
                        <div className="text-[10px] text-slate-500">Labs, library, sports & transport</div>
                      </div>
                    </Link>

                    <Link
                      to="/faculty"
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <Users className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold">Faculty</div>
                        <div className="text-[10px] text-slate-500">Qualified educator directory</div>
                      </div>
                    </Link>

                    <Link
                      to="/gallery"
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <ImageIcon className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold">Gallery</div>
                        <div className="text-[10px] text-slate-500">Campus photos & celebrations</div>
                      </div>
                    </Link>

                    <Link
                      to="/facilities#activities"
                      className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-800 hover:bg-slate-100 hover:text-[#0B192C] transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-[#0B192C] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-extrabold">Activities</div>
                        <div className="text-[10px] text-slate-500">Co-curricular & sports clubs</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/achievements"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/achievements'
                  ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                  : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
              }`}
            >
              Achievements
            </Link>

            <Link
              to="/events"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/events'
                  ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                  : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
              }`}
            >
              Events
            </Link>

            <Link
              to="/admissions"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/admissions'
                  ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                  : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
              }`}
            >
              Admissions
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/contact'
                  ? 'bg-blue-50 text-[#0B192C] font-extrabold border-b-2 border-[#0B192C]'
                  : 'text-slate-700 hover:text-[#0B192C] hover:bg-slate-100/70'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: ENQUIRE NOW Button + Mobile Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/admissions"
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs bg-[#D97706] hover:bg-[#B45309] text-white shadow-xs active:scale-95 transition-all uppercase tracking-wider"
            >
              <span>ENQUIRE NOW</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-[#0B192C]" /> : <Menu className="w-5 h-5 text-[#0B192C]" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. RESPONSIVE NOTICE TICKER (100% VISIBLE ON BOTH DESKTOP AND MOBILE) */}
      {tickerAnnouncements.length > 0 && (
        <div className="bg-[#D97706] text-white text-xs font-bold py-2 px-3 sm:px-4 overflow-hidden border-b border-amber-600/40 relative z-30 w-full max-w-full">
          <div className="max-w-7xl mx-auto flex items-center gap-2.5 w-full min-w-0">
            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-[#0B192C] text-amber-400 text-[10px] font-black uppercase tracking-wider shadow-xs">
              <BellRing className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>NOTICE</span>
            </div>
            
            <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0 relative">
              <div className="animate-marquee gap-6 inline-flex items-center">
                {(() => {
                  const list = tickerAnnouncements;
                  let itemsToRender = list;
                  if (list.length === 1) {
                    itemsToRender = [list[0], list[0], list[0], list[0]];
                  } else if (list.length === 2) {
                    itemsToRender = [...list, ...list, ...list, ...list];
                  } else {
                    itemsToRender = [...list, ...list];
                  }
                  return itemsToRender.map((item, idx) => (
                    <Link
                      key={`${item._id || item.id || idx}-${idx}`}
                      to="/announcements"
                      className="inline-flex items-center gap-2 text-white hover:underline cursor-pointer mr-8 shrink-0"
                    >
                      <span className="font-extrabold px-1.5 py-0.5 rounded bg-black/20 text-[9px] uppercase tracking-wider">
                        {item.category || 'NOTICE'}
                      </span>
                      <span className="font-bold text-xs">{item.title}</span>
                      {item.shortDescription && (
                        <span className="opacity-90 font-normal text-xs hidden sm:inline">
                          ({item.shortDescription})
                        </span>
                      )}
                    </Link>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOBILE NAVIGATION DRAWER (lg:hidden) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white text-slate-900 pt-16 pb-24 px-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-4">
              
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
                  ADARSHA HIGH SCHOOL
                </span>
                <h2 className="text-xl font-extrabold text-[#0B192C]">
                  School Navigation Menu
                </h2>
              </div>

              <div className="space-y-1">
                <Link to="/" className="block py-2.5 text-sm font-bold text-slate-900 border-b border-slate-100">
                  Home
                </Link>

                {/* About Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleMobileAccordion('about')}
                    className="w-full py-2.5 flex items-center justify-between text-sm font-bold text-slate-900"
                  >
                    <span>About School</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.about ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded.about && (
                    <div className="pl-4 pb-2 space-y-1 text-xs text-slate-600">
                      <Link to="/about" className="block py-1 font-semibold hover:text-[#0B192C]">About School</Link>
                      <Link to="/about#leadership" className="block py-1 font-semibold hover:text-[#0B192C]">Leadership & Management</Link>
                      <Link to="/about#vision" className="block py-1 font-semibold hover:text-[#0B192C]">Vision & Mission</Link>
                    </div>
                  )}
                </div>

                {/* Academics Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleMobileAccordion('academics')}
                    className="w-full py-2.5 flex items-center justify-between text-sm font-bold text-slate-900"
                  >
                    <span>Academics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.academics ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded.academics && (
                    <div className="pl-4 pb-2 space-y-1 text-xs text-slate-600">
                      <Link to="/academics" className="block py-1 font-semibold hover:text-[#0B192C]">Curriculum Overview</Link>
                      <Link to="/academics#primary" className="block py-1 font-semibold hover:text-[#0B192C]">Primary Level (I - V)</Link>
                      <Link to="/academics#middle" className="block py-1 font-semibold hover:text-[#0B192C]">Middle Level (VI - VIII)</Link>
                      <Link to="/academics#secondary" className="block py-1 font-semibold hover:text-[#0B192C]">Secondary Level (IX - X)</Link>
                    </div>
                  )}
                </div>

                {/* Campus Life Accordion */}
                <div className="border-b border-slate-100">
                  <button
                    onClick={() => toggleMobileAccordion('campus')}
                    className="w-full py-2.5 flex items-center justify-between text-sm font-bold text-slate-900"
                  >
                    <span>Campus Life</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.campus ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded.campus && (
                    <div className="pl-4 pb-2 space-y-1 text-xs text-slate-600">
                      <Link to="/facilities" className="block py-1 font-semibold hover:text-[#0B192C]">Campus Facilities</Link>
                      <Link to="/faculty" className="block py-1 font-semibold hover:text-[#0B192C]">Faculty Directory</Link>
                      <Link to="/gallery" className="block py-1 font-semibold hover:text-[#0B192C]">Photo Gallery</Link>
                      <Link to="/facilities#activities" className="block py-1 font-semibold hover:text-[#0B192C]">Activities & Clubs</Link>
                    </div>
                  )}
                </div>

                <Link to="/achievements" className="block py-2.5 text-sm font-bold text-slate-900 border-b border-slate-100">
                  Achievements
                </Link>
                <Link to="/events" className="block py-2.5 text-sm font-bold text-slate-900 border-b border-slate-100">
                  Events & Functions
                </Link>
                <Link to="/admissions" className="block py-2.5 text-sm font-bold text-slate-900 border-b border-slate-100">
                  Admissions
                </Link>
                <Link to="/contact" className="block py-2.5 text-sm font-bold text-slate-900 border-b border-slate-100">
                  Contact
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-3">
              <Link
                to="/admissions"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-xs bg-[#D97706] text-white shadow-md uppercase tracking-wider"
              >
                <span>APPLY FOR ADMISSION</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              {primaryPhone && (
                <p className="text-center text-xs text-slate-500 font-semibold">
                  Admission Helpline: {primaryPhone}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

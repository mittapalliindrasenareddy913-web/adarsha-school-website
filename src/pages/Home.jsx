import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { images } from '../data/images';

// Static Data Fallbacks
import { siteContent } from '../data/siteContent';
import { academicsData } from '../data/academics';
import { facilitiesData } from '../data/facilities';
import { achievementsData } from '../data/achievements';
import { eventsData } from '../data/events';
import { announcementsData } from '../data/announcements';
import { galleryData } from '../data/gallery';

import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ImageLightbox from '../components/ImageLightbox';
import VideoPlayerModal from '../components/VideoPlayerModal';

import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  BookOpen,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Building2,
  Users,
  Laptop,
  X
} from 'lucide-react';

export default function Home() {
  const [siteData, setSiteData] = useState(null);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [academics, setAcademics] = useState(null);

  // Lightbox & Video Player modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImagesOverride, setLightboxImagesOverride] = useState(null);

  const campusLifeScrollRef = useRef(null);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ url: '', title: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const site = await api.getSiteSettings();
        const evs = await api.getEvents();
        const anns = await api.getAnnouncements();
        const gal = await api.getGallery();
        const ach = await api.getAchievements();
        const facs = await api.getFacilities();
        const acs = await api.getAcademics();

        if (site) setSiteData(site);
        if (Array.isArray(evs) && evs.length) setEvents(evs);
        if (Array.isArray(anns) && anns.length) setAnnouncements(anns);
        if (Array.isArray(gal) && gal.length) setGallery(gal);
        if (Array.isArray(ach) && ach.length) setAchievements(ach);
        if (Array.isArray(facs) && facs.length) setFacilities(facs);
        if (acs) setAcademics(acs);
      } catch (err) {
        console.warn('Backend API connection note:', err.message);
      }
    }
    loadData();
  }, []);

  // Dynamic Content Collections with Fallbacks
  const displaySite = siteData || siteContent;

  const heroTagline = displaySite?.home?.heroTagline || displaySite?.tagline || "Shaping Curious Minds. Building Confident Futures.";
  const heroSubTagline = displaySite?.home?.heroSubTagline || displaySite?.subTagline || "An environment where young minds learn, explore, create, and prepare for tomorrow with quality education in Thamballapalle.";

  const displayStats = (siteData?.stats?.length ? siteData.stats : siteContent.stats) || [];
  const displayAcademics = (academics?.levels?.length ? academics.levels : (Array.isArray(academics) && academics.length ? academics : academicsData.levels)) || [];
  const displayFacilities = (facilities?.length ? facilities : facilitiesData) || [];
  const displayEvents = (events?.length ? events : eventsData) || [];
  const displayAnnouncements = (announcements?.length ? announcements : announcementsData) || [];
  const displayGallery = (gallery?.length ? gallery : galleryData) || [];
  const displayAchievements = (achievements?.length ? achievements : achievementsData) || [];

  // Announcement Filtering: Only PUBLISHED & current time >= start & current time < end
  const now = new Date();
  const validAnnouncements = (displayAnnouncements || []).filter(item => {
    if (item.status && item.status !== 'published') return false;

    if (item.startDate) {
      const start = new Date(item.startDate);
      if (now < start) return false;
    }
    if (item.endDate) {
      const end = new Date(item.endDate);
      if (now >= end) return false;
    }
    return true;
  });

  const activePopupNotice = validAnnouncements.find(item => {
    const mode = item.displayMode || (item.showPopup ? 'Popup' : 'None');
    const isPopupAllowed = mode === 'Popup' || mode === 'Both' || item.showPopup;
    if (!isPopupAllowed) return false;
    const isDismissed = sessionStorage.getItem(`closed_popup_${item._id || item.id}`);
    return !isDismissed;
  });

  const [popupNotice, setPopupNotice] = useState(null);

  useEffect(() => {
    if (activePopupNotice) {
      setPopupNotice(activePopupNotice);
    }
  }, [activePopupNotice?._id || activePopupNotice?.id]);

  // Exclude faculty/teachers/staff/personal portraits & logos/emblems from Campus Life tiles
  const excludedCategories = ['faculty', 'teachers', 'staff', 'profile', 'personal', 'portrait', 'logo', 'emblem', 'brand', 'hero', 'header'];
  const campusLifePhotos = (displayGallery || []).filter(item => {
    const isImage = !item.type || item.type === 'image' || item.type === 'photo';
    const isPublished = !item.status || item.status === 'published';
    const hasUrl = Boolean(item.url || item.imageUrl || item.src);
    const categoryClean = (item.category || '').trim().toLowerCase();
    const isAllowedCategory = !excludedCategories.includes(categoryClean);

    const titleClean = (item.title || item.originalName || item.caption || '').toLowerCase();
    const isLogoOrEmblem = titleClean.includes('logo') || titleClean.includes('emblem') || titleClean.includes('chatgpt image');

    return isImage && isPublished && hasUrl && isAllowedCategory && !isLogoOrEmblem;
  });

  const [isCampusHovered, setIsCampusHovered] = useState(false);

  useEffect(() => {
    if (!campusLifePhotos || campusLifePhotos.length <= 1) return;

    const autoScrollInterval = setInterval(() => {
      if (isCampusHovered) return;
      if (campusLifeScrollRef.current) {
        const container = campusLifeScrollRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(autoScrollInterval);
  }, [campusLifePhotos.length, isCampusHovered]);

  const scrollCampusLeft = () => {
    if (campusLifeScrollRef.current) {
      campusLifeScrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollCampusRight = () => {
    if (campusLifeScrollRef.current) {
      campusLifeScrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleImgError = (e) => {
    e.currentTarget.src = images.aboutCampus;
  };

  const admissionYear = siteData?.admissionAcademicYear || siteData?.admissionYear || '2026–2027';

  return (
    <div className="font-sans min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <SEO
        title="Adarsha High School | Thamballapalle, Andhra Pradesh"
        description="Official portal of Adarsha High School, Thamballapalle. Providing quality education combining academic rigor, smart learning tools, and traditional values."
      />

      {/* ==================================================
          1. FULL-WIDTH PHOTOGRAPHIC HERO SECTION (DESKTOP & MOBILE)
         ================================================== */}
      <section className="relative min-h-[380px] sm:min-h-[500px] lg:min-h-[560px] flex items-center justify-start bg-[#0B192C] text-white overflow-hidden py-6 sm:py-12 px-4 sm:px-8 lg:px-16 border-b border-slate-800">
        
        {/* Dynamic Cloudflare R2 Hero Background (Uploaded by Principal/Admin in Admin Panel) */}
        {(displaySite?.home?.heroMediaType || siteData?.heroMediaType) === 'R2_VIDEO' && (displaySite?.home?.heroVideoUrl || siteData?.heroVideoUrl) ? (
          <video
            src={displaySite?.home?.heroVideoUrl || siteData.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60 sm:opacity-75 transition-all duration-700"
            style={{ backgroundImage: `url(${displaySite?.home?.heroImage || siteData?.heroImage || images.heroBg})` }}
          />
        )}
        
        {/* Cinematic Left-to-Right Overlay (Desktop: Left text readability, Mobile: Lighter gradient so hero photo is clearly visible) */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#0B192C]/80 via-[#0B192C]/45 to-black/20" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          
          {/* DESKTOP & TABLET CONTENT (Left-Aligned Photographic Hero - No Dark Panel) */}
          <div className="hidden sm:flex flex-col items-start justify-center max-w-2xl text-left space-y-6">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#0B192C]/80 backdrop-blur-md text-amber-400 border border-amber-500/30 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ADARSHA HIGH SCHOOL • THAMBALLAPALLE, AP</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-sans drop-shadow-md">
              {heroTagline}
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed max-w-xl drop-shadow-xs">
              {heroSubTagline}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-lg font-extrabold text-xs sm:text-sm bg-[#D97706] hover:bg-[#B45309] text-white shadow-xl transition-all uppercase tracking-wider hover:scale-[1.02]"
              >
                <span>APPLY FOR ADMISSION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/academics"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-lg font-extrabold text-xs sm:text-sm bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/80 shadow-md transition-all uppercase tracking-wider hover:scale-[1.02]"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* MOBILE HERO CONTENT */}
          <div className="sm:hidden text-center space-y-4 pb-4 pt-4 px-2 w-full mx-auto">
            <h1 className="text-xl font-black tracking-tight leading-snug text-white font-sans drop-shadow-md">
              {heroTagline}
            </h1>
            <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-xs mx-auto drop-shadow-xs">
              {heroSubTagline}
            </p>

            <div className="flex flex-col gap-3 pt-1 max-w-xs mx-auto">
              <Link
                to="/admissions"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-extrabold text-xs bg-[#D97706] active:bg-[#B45309] text-white shadow-xl uppercase tracking-wider"
              >
                <span>APPLY FOR ADMISSION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/academics"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-extrabold text-xs bg-black/30 backdrop-blur-md text-white border border-white/80 shadow-md uppercase tracking-wider"
              >
                <span>EXPLORE PROGRAMS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. INSTITUTIONAL HIGHLIGHT STRIP (Requirement #9)
         ================================================== */}
      <section className="bg-[#0B192C] text-white py-5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          
          <div className="flex items-center gap-3 px-4 py-1.5">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">STATE BOARD RECOGNIZED</h4>
              <p className="text-[11px] text-slate-300">Quality education you can trust</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-1.5 pt-3 sm:pt-1.5">
            <BookOpen className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">ENGLISH MEDIUM EDUCATION</h4>
              <p className="text-[11px] text-slate-300">Building strong foundations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-1.5 pt-3 lg:pt-1.5">
            <Laptop className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">MODERN LEARNING</h4>
              <p className="text-[11px] text-slate-300">Technology • Innovation • Growth</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-1.5 pt-3 lg:pt-1.5">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">STUDENT DEVELOPMENT</h4>
              <p className="text-[11px] text-slate-300">Values • Discipline • Success</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. ABOUT ADARSHA & PRINCIPAL DESK
         ================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] block">
              LEADERSHIP DESK
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] leading-tight">
              Guided by Experienced Educational Leadership
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Dedicated leadership nurturing academic rigor, character development, and holistic student growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* 1. DIRECTOR PROFILE */}
            {(displaySite?.leadership?.correspondent?.enabled ?? true) && (() => {
              const corr = displaySite?.leadership?.correspondent || {};
              const photo = corr.photo || displaySite?.leadershipPhoto || siteData?.leadershipPhoto;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between p-4 sm:p-5 space-y-4">
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                      {photo ? (
                        <img
                          src={photo}
                          alt={corr.name || "Director"}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                          <GraduationCap className="w-12 h-12 text-amber-400 opacity-80" />
                          <h4 className="text-base font-extrabold tracking-wide uppercase">DIRECTOR PHOTO</h4>
                          <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                            Photo can be uploaded via Admin CMS
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-[#0B192C]/90 px-2.5 py-1 rounded border border-amber-500/30 inline-block mb-1">
                          DIRECTOR
                        </span>
                        <h4 className="text-base font-extrabold text-white">{corr.name || "Director Desk"}</h4>
                        <p className="text-xs text-slate-300">{corr.designation && corr.designation !== 'Correspondent' ? corr.designation : "Director"}</p>
                      </div>
                    </div>

                    {corr.quote && (
                      <p className="text-xs italic font-semibold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                        "{corr.quote}"
                      </p>
                    )}

                    {corr.message && (
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {corr.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Adarsha High School, Thamballapalle</span>
                  </div>
                </div>
              );
            })()}

            {/* 2. PRINCIPAL PROFILE */}
            {(displaySite?.leadership?.principal?.enabled ?? true) && (() => {
              const prin = displaySite?.leadership?.principal || {};
              const photo = prin.photo;
              return (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between p-4 sm:p-5 space-y-4">
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                      {photo ? (
                        <img
                          src={photo}
                          alt={prin.name || "Principal"}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                          <GraduationCap className="w-12 h-12 text-amber-400 opacity-80" />
                          <h4 className="text-base font-extrabold tracking-wide uppercase">PRINCIPAL PHOTO</h4>
                          <span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                            Photo can be uploaded via Admin CMS
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-[#0B192C]/90 px-2.5 py-1 rounded border border-amber-500/30 inline-block mb-1">
                          PRINCIPAL
                        </span>
                        <h4 className="text-base font-extrabold text-white">{prin.name || "Principal Desk"}</h4>
                        <p className="text-xs text-slate-300">{prin.designation || "Principal"}</p>
                      </div>
                    </div>

                    {prin.quote && (
                      <p className="text-xs italic font-semibold text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                        "{prin.quote}"
                      </p>
                    )}

                    {prin.message && (
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {prin.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Adarsha High School, Thamballapalle</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. ACADEMICS (Requirement #11)
         ================================================== */}
      {displayAcademics && displayAcademics.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-slate-200 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeading
            badge="ACADEMICS"
            title="Learning Designed for Every Stage"
            subtitle="Empowering students from foundational primary years to secondary board examination success."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {displayAcademics.slice(0, 3).map((lvl, idx) => {
              const levelImage = lvl.image || lvl.url || images[lvl.imageKey] || images.primarySchool;
              const levelAnchor = idx === 0 ? '#primary' : idx === 1 ? '#middle' : '#secondary';

              return (
                <div
                  key={lvl.id || idx}
                  className="bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {levelImage ? (
                        <img
                          src={levelImage}
                          alt={lvl.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0B192C] to-[#1E3E62] flex flex-col items-center justify-center text-white p-4 space-y-2">
                          <GraduationCap className="w-10 h-10 text-amber-400 opacity-80" />
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">{lvl.title}</span>
                        </div>
                      )}
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#0B192C] text-amber-400 text-[10px] font-extrabold shadow-xs">
                        {lvl.grades}
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#D97706]" />
                        <h3 className="text-lg font-black text-[#0B192C]">
                          {lvl.title}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {lvl.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      to={`/academics${levelAnchor}`}
                      className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-lg font-bold text-xs bg-slate-100 hover:bg-[#0B192C] hover:text-white text-slate-800 transition-colors"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================================================
          5. CAMPUS LIFE (Requirement #12)
         ================================================== */}
      {campusLifePhotos && campusLifePhotos.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#0B192C] text-white border-y border-slate-800 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 block mb-1">
                  CAMPUS LIFE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Life Beyond the Classroom
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <button
                  onClick={scrollCampusLeft}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:bg-[#D97706] transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollCampusRight}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center hover:bg-[#D97706] transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Image Tiles Showing Category Names */}
            <div
              ref={campusLifeScrollRef}
              onMouseEnter={() => setIsCampusHovered(true)}
              onMouseLeave={() => setIsCampusHovered(false)}
              className="flex items-center gap-5 overflow-x-auto scrollbar-none py-2 px-1 relative min-w-0 max-w-full scroll-smooth"
            >
              {campusLifePhotos.map((photo, idx) => (
                <div
                  key={photo.id || photo._id || idx}
                  onClick={() => {
                    setLightboxImagesOverride(campusLifePhotos);
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="w-[280px] sm:w-[340px] h-[200px] sm:h-[230px] shrink-0 relative rounded-lg overflow-hidden bg-slate-900 border border-slate-700 shadow-md cursor-pointer group"
                >
                  <img
                    src={photo.url || photo.imageUrl || photo.src}
                    onError={handleImgError}
                    alt={photo.category || "Campus Life"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider bg-[#0B192C] text-amber-400 border border-amber-500/30 inline-block">
                      {photo.category || 'CAMPUS'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ==================================================
          6. OUR FACILITIES (Requirement #13)
         ================================================== */}
      {displayFacilities && displayFacilities.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          
          {/* Centered Top Heading Block (Above Photos / Cards in Middle) */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
              OUR FACILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C]">
              A Campus Designed for Growth
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Our campus infrastructure includes interactive smart classrooms, science laboratories, computer workstations, library, and sports grounds.
            </p>
            <div className="pt-2">
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-lg font-bold text-xs bg-[#0B192C] hover:bg-[#1E3E62] text-white shadow-xs transition-all"
              >
                <span>EXPLORE CAMPUS →</span>
              </Link>
            </div>
          </div>

          {/* Facility Cards Grid (4 Columns on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayFacilities.slice(0, 4).map((fac, idx) => (
              <div key={fac.id || idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group">
                <div className="relative h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                  {fac.image || fac.imageUrl || fac.url ? (
                    <img
                      src={fac.image || fac.imageUrl || fac.url}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#0B192C] flex flex-col items-center justify-center text-white p-4 space-y-2">
                      <Building2 className="w-8 h-8 text-amber-400 opacity-75" />
                      <span className="text-xs font-extrabold text-slate-200">{fac.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="text-sm font-extrabold text-[#0B192C]">{fac.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{fac.description}</p>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* ==================================================
          7. ACHIEVEMENTS (Requirement #14)
         ================================================== */}
      {displayAchievements && displayAchievements.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F1F5F9] border-y border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
                  ACHIEVEMENTS
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C]">
                  Celebrating Student Excellence
                </h2>
              </div>

              <Link
                to="/achievements"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B192C] hover:text-[#D97706] transition-colors"
              >
                <span>VIEW ALL ACHIEVEMENTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayAchievements.slice(0, 3).map((ach, idx) => (
                <div key={ach.id || idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs space-y-3 p-5">
                  {ach.image || ach.imageUrl ? (
                    <div className="h-36 rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <img src={ach.image || ach.imageUrl} alt={ach.title} className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded bg-[#0B192C] text-amber-400 font-extrabold text-[10px]">
                      {ach.year}
                    </span>
                    <span className="font-extrabold uppercase text-[#D97706] text-[10px]">
                      {ach.category}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#0B192C]">{ach.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-3">{ach.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ==================================================
          8. EVENTS (Requirement #15)
         ================================================== */}
      {displayEvents && displayEvents.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
                EVENTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C]">
                What's Happening at Adarsha
              </h2>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B192C] hover:text-[#D97706] transition-colors"
            >
              <span>VIEW ALL EVENTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayEvents.slice(0, 3).map((ev, idx) => (
              <div key={ev.id || idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {ev.coverImage || ev.imageUrl ? (
                      <img
                        src={ev.coverImage || ev.imageUrl}
                        alt={ev.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0B192C] to-slate-900 flex flex-col items-center justify-center text-white p-4 space-y-2">
                        <Calendar className="w-8 h-8 text-amber-400 opacity-80" />
                        <span className="text-xs font-bold text-slate-300">{ev.dateFormatted || ev.date}</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0B192C] text-amber-400 text-[10px] font-extrabold uppercase tracking-wider">
                      {ev.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D97706]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ev.dateFormatted || ev.date}</span>
                    </div>
                    <h4 className="text-base font-extrabold text-[#0B192C]">{ev.name}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3">{ev.shortDescription}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/events/${ev.slug || ev.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-bold text-xs bg-slate-100 hover:bg-[#0B192C] hover:text-white text-slate-800 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* ==================================================
          10. ADMISSIONS CTA (Requirement #17)
         ================================================== */}
      <section className="py-12 sm:py-16 bg-[#0B192C] text-white border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">
              ADMISSIONS OPEN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Admissions Open for {admissionYear}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Empower your child with quality education, modern learning tools, and strong moral values in Thamballapalle.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/admissions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-xs bg-[#D97706] hover:bg-[#B45309] text-white shadow-sm transition-all"
            >
              <span>APPLY FOR ADMISSION →</span>
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-xs bg-transparent hover:bg-white/10 text-white border border-white/40 transition-all"
            >
              <span>ENQUIRE NOW →</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Lightbox Modal Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => {
          setLightboxOpen(false);
          setLightboxImagesOverride(null);
        }}
        images={lightboxImagesOverride || campusLifePhotos}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />

      {/* Video Modal Component */}
      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={selectedVideo.url}
        title={selectedVideo.title}
      />

      {/* Announcement Popup Modal */}
      {popupNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-sans">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl p-6 max-w-lg w-full relative space-y-4 text-slate-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                sessionStorage.setItem(`closed_popup_${popupNotice._id || popupNotice.id}`, 'true');
                setPopupNotice(null);
              }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              aria-label="Close Announcement"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0B192C] text-amber-400">
                {popupNotice.category || 'NOTICE'}
              </span>
              {popupNotice.priority === 'High' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#991B1B] text-white">
                  URGENT
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-[#0B192C]">
              {popupNotice.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {popupNotice.shortDescription || popupNotice.fullDescription}
            </p>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => {
                  sessionStorage.setItem(`closed_popup_${popupNotice._id || popupNotice.id}`, 'true');
                  setPopupNotice(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Close
              </button>

              <Link
                to="/announcements"
                onClick={() => {
                  sessionStorage.setItem(`closed_popup_${popupNotice._id || popupNotice.id}`, 'true');
                  setPopupNotice(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#D97706] text-white font-bold text-xs hover:bg-[#B45309] transition-colors inline-flex items-center gap-1.5"
              >
                <span>View Notice Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ImageLightbox from '../components/ImageLightbox';
import { CheckCircle2, MonitorPlay, Brain, GraduationCap, Images, BookOpen } from 'lucide-react';

export default function Academics() {
  const [academics, setAcademics] = useState(null);

  // Lightbox State for Level Gallery
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await api.getAcademics();
      if (data) setAcademics(data);
    }
    loadData();
  }, []);

  const handleOpenLevelGallery = (lvl) => {
    let galleryList = [];

    if (Array.isArray(lvl.galleryImages) && lvl.galleryImages.length > 0) {
      const galleryItems = lvl.galleryImages.map((url, i) => ({
        url: typeof url === 'string' ? url : url.url,
        title: `${lvl.title} Photo ${i + 1}`,
        caption: `${lvl.title} (${lvl.grades})`
      }));

      const mainImgUrl = lvl.image || lvl.url;
      if (mainImgUrl && !lvl.galleryImages.includes(mainImgUrl)) {
        galleryList = [{ url: mainImgUrl, title: `${lvl.title} Main Photo`, caption: `${lvl.title} (${lvl.grades})` }, ...galleryItems];
      } else {
        galleryList = galleryItems;
      }
    } else if (lvl.image || lvl.url) {
      galleryList = [{
        url: lvl.image || lvl.url,
        title: lvl.title,
        caption: `${lvl.title} (${lvl.grades})`
      }];
    }

    if (galleryList.length > 0) {
      setLightboxImages(galleryList);
      setLightboxIndex(0);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Academic Programs & Curriculum | Adarsha High School"
        description="Explore the structured academic levels (Primary, Middle, High School) and pedagogy at Adarsha High School."
      />

      <PageHero
        eyebrow="ACADEMIC EXCELLENCE"
        title="Designed for curious minds."
        subtitle="Our curriculum blends conceptual clarity with practical inquiry, ensuring every student develops critical thinking and lifelong learning habits."
        badgeBg="bg-blue-600"
        badgeBorder="border-sky-400/40"
        badgeIcon={BookOpen}
        gradientTo="to-blue-950/60"
      />

      {/* Learning Philosophy */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-slate-200 border-t-4 border-t-blue-600 shadow-sm space-y-6">
          <SectionHeading
            align="left"
            badge="PEDAGOGY"
            title="Our Learning Philosophy"
            subtitle={academics?.overview || "Empowering students through structured learning, conceptual clarity, and disciplined habits."}
          />

          <p className="text-slate-700 text-base leading-relaxed">
            {academics?.philosophy || "At Adarsha High School, we prioritize conceptual mastery over rote memorization. Our teachers use interactive learning aids, regular assessment cycles, and individual mentoring to ensure steady academic growth."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-slate-200 border-l-4 border-l-blue-600 space-y-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <h4 className="font-extrabold text-[#0B192C]">Conceptual Clarity</h4>
              <p className="text-xs text-slate-600">Focusing on deep understanding over rote memorization.</p>
            </div>

            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-slate-200 border-l-4 border-l-sky-500 space-y-2">
              <MonitorPlay className="w-6 h-6 text-sky-600" />
              <h4 className="font-extrabold text-[#0B192C]">Digital Smart Aids</h4>
              <p className="text-xs text-slate-600">Audio-visual learning modules for engaging lessons.</p>
            </div>

            <div className="p-5 rounded-lg bg-[#F8FAFC] border border-slate-200 border-l-4 border-l-blue-700 space-y-2">
              <GraduationCap className="w-6 h-6 text-blue-700" />
              <h4 className="font-extrabold text-[#0B192C]">Continuous Assessment</h4>
              <p className="text-xs text-slate-600">Regular progress tracking and teacher guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Stages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="ACADEMIC STAGES"
          title="Structured Education Levels"
          subtitle="Empowering every age group with tailored pedagogy and key skills."
        />

        <div className="space-y-8">
          {academics?.levels?.map((lvl, idx) => {
            const displayImg = (lvl.galleryImages && lvl.galleryImages.length > 0 && !lvl.image)
              ? (typeof lvl.galleryImages[0] === 'string' ? lvl.galleryImages[0] : lvl.galleryImages[0].url)
              : (lvl.image || lvl.url);
            
            const totalPhotos = (lvl.galleryImages?.length || 0) + (lvl.image ? 1 : 0);
            const anchorId = lvl.id === 'primary' ? 'primary' : lvl.id === 'middle' ? 'middle' : lvl.id === 'secondary' || lvl.id === 'high' ? 'secondary' : lvl.id;

            return (
              <div
                key={lvl.id || idx}
                id={anchorId}
                className={`bg-white rounded-lg border border-slate-200 border-l-4 border-l-blue-600 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-28 ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image or Clean Institutional Card */}
                <div
                  onClick={() => handleOpenLevelGallery(lvl)}
                  className={`lg:col-span-5 h-64 lg:h-full min-h-[300px] relative overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-blue-950 flex flex-col items-center justify-center p-6 text-center text-white ${
                    totalPhotos > 0 ? 'cursor-pointer group' : ''
                  }`}
                >
                  {displayImg ? (
                    <>
                      <img
                        src={displayImg}
                        alt={lvl.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#0B192C]/90 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 shadow-sm group-hover:bg-blue-600 transition-colors">
                        <Images className="w-4 h-4 text-sky-400 group-hover:text-white" />
                        <span>{totalPhotos > 1 ? `View Gallery (${totalPhotos})` : 'Expand Photo'}</span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mx-auto shadow-inner">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold uppercase tracking-wider">{lvl.title}</h4>
                      <p className="text-xs text-sky-200/80">{lvl.grades}</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-7 p-8 sm:p-10 space-y-4">
                  <span className="px-3 py-1 rounded bg-[#0B192C] text-sky-400 border border-sky-500/30 text-xs font-extrabold shadow-xs inline-block">
                    {lvl.grades}
                  </span>

                  <h3 className="text-2xl font-black text-[#0B192C]">{lvl.title}</h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">{lvl.description}</p>

                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pt-2">
                    Key Curriculum Focus Areas:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700">
                    {lvl.highlights.map((kf, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />

    </div>
  );
}

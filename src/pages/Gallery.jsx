import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import ImageLightbox from '../components/ImageLightbox';
import { Image as ImageIcon, Play, Video } from 'lucide-react';

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await api.getGallery();
      if (data) setGallery(data);
    }
    loadData();
  }, []);

  const categories = ['All', 'Campus', 'Classrooms', 'Events', 'Sports', 'Activities'];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Campus Photo & Media Gallery | Adarsha E.M. School"
        description="Browse photo highlights of Adarsha E.M. School classrooms, sports events, science labs, and cultural celebrations."
      />

      <PageHero
        eyebrow="VISUAL SHOWCASE"
        title="Campus life in pictures."
        subtitle="Take a visual tour of our classrooms, science labs, sports meets, and student activity workshops."
        badgeBg="bg-cyan-600"
        badgeBorder="border-cyan-400/40"
        badgeIcon={ImageIcon}
        gradientTo="to-cyan-950/60"
      />

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white border border-cyan-500 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const itemUrl = item.url || item.imageUrl || item.src;
              const isVideo = item.type === 'video' || Boolean(itemUrl && itemUrl.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i));

              return (
                <div
                  key={item.id || item._id || idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-[#0B192C] via-[#1E3E62] to-cyan-950 border border-slate-200 shadow-xs cursor-pointer group"
                >
                  {itemUrl ? (
                    <>
                      {isVideo ? (
                        <video
                          src={itemUrl}
                          className="w-full h-full object-cover pointer-events-none"
                          muted
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={itemUrl}
                          alt={item.title || "Adarsha Campus Photo"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                      {/* Play Button Overlay for Videos */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-[#D97706]/90 hover:bg-[#B45309] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 fill-current ml-1" />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-2">
                      {isVideo ? <Video className="w-8 h-8 text-cyan-400" /> : <ImageIcon className="w-8 h-8 text-cyan-400" />}
                      <h4 className="text-sm font-bold truncate">{item.title || "Campus Media"}</h4>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#0B192C] text-cyan-400 border border-cyan-500/30 uppercase mb-1 inline-block">
                      {item.category || (isVideo ? 'VIDEO' : 'CAMPUS')}
                    </span>
                    {item.title && <h3 className="text-sm font-extrabold truncate">{item.title}</h3>}
                    {item.caption && <p className="text-xs text-slate-300 line-clamp-1">{item.caption}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-lg border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-[#0B192C]">Media Gallery Empty</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Photos uploaded through the Admin Panel will be categorized and displayed here.
            </p>
          </div>
        )}

      </section>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredItems}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />

    </div>
  );
}

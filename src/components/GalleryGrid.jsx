import React, { useState } from 'react';
import { images } from '../data/images';
import ImageLightbox from './ImageLightbox';
import { ZoomIn, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryGrid({ limit = null, showFilters = true }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ["All", "Campus", "Classrooms", "Events", "Sports", "Activities"];

  const filteredImages = activeCategory === "All"
    ? images.gallery
    : images.gallery.filter((img) => img.category === activeCategory);

  const displayedImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  const handlePrev = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? displayedImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setLightboxIndex((prevIndex) => 
      prevIndex === displayedImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Category Filter Tabs */}
      {showFilters && (
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Image Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {displayedImages.map((img, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-soft hover:shadow-xl cursor-pointer border border-slate-200/80 aspect-4/3"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-slate-950 mb-2">
                  {img.category}
                </span>
                <h4 className="text-base font-bold leading-snug drop-shadow-sm">
                  {img.title}
                </h4>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <ImageLightbox
          selectedImage={displayedImages[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

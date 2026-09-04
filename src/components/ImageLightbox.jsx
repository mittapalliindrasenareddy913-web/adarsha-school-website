import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageLightbox({
  selectedImage,
  onClose,
  onPrev,
  onNext,
  isOpen,
  images = [],
  currentIndex = 0,
  setCurrentIndex
}) {
  // Support both prop patterns cleanly
  const activeImage = selectedImage || (isOpen && images && images.length > 0 ? images[currentIndex] : null);
  const showModal = Boolean(selectedImage || (isOpen && activeImage));

  const totalCount = selectedImage?.total || (images ? images.length : 0);
  const currentNum = selectedImage?.index || (currentIndex + 1);

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else if (setCurrentIndex && images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (setCurrentIndex && images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, onClose, onPrev, onNext, setCurrentIndex, images.length]);

  if (!showModal || !activeImage) return null;

  const imageUrl = activeImage.url || activeImage.src || (typeof activeImage === 'string' ? activeImage : '');
  const titleText = activeImage.title || activeImage.name || 'School Photo';
  const categoryText = activeImage.category || activeImage.type || '';
  const captionText = activeImage.caption || activeImage.description || '';

  const isVideo = activeImage.type === 'video' || Boolean(imageUrl && imageUrl.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i));
  const isYouTube = imageUrl?.includes('youtube.com') || imageUrl?.includes('youtu.be');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6"
        onClick={onClose}
      >
        <div 
          className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                {categoryText && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {categoryText}
                  </span>
                )}
                {totalCount > 0 && (
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                    {isVideo ? 'Video' : 'Photo'} {currentNum} / {totalCount}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {titleText}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Media Container */}
          <div className="relative flex-grow flex items-center justify-center p-4 bg-slate-950 overflow-hidden min-h-[300px]">
            {isYouTube ? (
              <iframe
                src={imageUrl}
                title={titleText}
                className="w-full h-[65vh] max-w-4xl border-0 rounded-lg shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVideo ? (
              <video
                src={imageUrl}
                controls
                autoPlay
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-md"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={imageUrl}
                alt={titleText}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-md select-none"
              />
            )}

            {/* Previous Button */}
            {totalCount > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md border border-slate-700/60 shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Next Button */}
            {totalCount > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md border border-slate-700/60 shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Footer Caption */}
          {captionText && (
            <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs sm:text-sm text-center">
              {captionText}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

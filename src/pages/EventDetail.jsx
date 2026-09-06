import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import ImageLightbox from '../components/ImageLightbox';
import VideoPlayerModal from '../components/VideoPlayerModal';
import { Calendar, MapPin, Clock, ArrowLeft, Play, Sparkles } from 'lucide-react';

export default function EventDetail() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lightbox & Video Player modal states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ url: '', title: '' });

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      const data = await api.getEventBySlug(slug);
      setEvent(data);
      setLoading(false);
    }
    loadEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B192C] text-white flex items-center justify-center pt-24 font-sans">
        <p className="text-sm font-bold text-amber-400 animate-pulse">Loading Event Details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0B192C] text-white flex flex-col items-center justify-center pt-24 space-y-4 font-sans">
        <h2 className="text-2xl font-black">Event Not Found</h2>
        <Link to="/events" className="px-6 py-3 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs">
          BACK TO EVENTS
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO title={`${event.name} | Adarsha High School`} description={event.shortDescription} />

      {/* Hero Cover */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 bg-[#0B192C] text-white overflow-hidden border-b border-slate-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(${event.coverImage || event.url || images.eventDefault})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/90 via-[#0B192C]/80 to-[#0B192C]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-extrabold bg-[#1E3E62] text-amber-400 border border-amber-500/20">
            <span>{event.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white max-w-4xl leading-tight">
            {event.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D97706]" />
              <span>{event.dateFormatted || event.date}</span>
            </div>

            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>{event.time}</span>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        <div className="bg-white p-6 sm:p-10 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-black text-[#0B192C]">About Event</h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Photo Gallery Section */}
        {event.photos && event.photos.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-[#0B192C] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D97706]" />
              <span>Event Photo Gallery</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.photos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative h-60 rounded-lg overflow-hidden bg-[#0B192C] border border-slate-200 cursor-pointer group shadow-xs"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  {photo.caption && (
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold truncate">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Gallery Section */}
        {event.videos && event.videos.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-[#0B192C] flex items-center gap-2">
              <Play className="w-5 h-5 text-[#1E3E62]" />
              <span>Event Video Highlights</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {event.videos.map((vid, idx) => (
                <div
                  key={vid.id || idx}
                  onClick={() => {
                    setSelectedVideo({ url: vid.videoUrl, title: vid.title });
                    setVideoModalOpen(true);
                  }}
                  className="relative h-60 rounded-lg overflow-hidden bg-[#0B192C] border border-slate-800 cursor-pointer group shadow-md"
                >
                  <img
                    src={vid.thumbnail || event.coverImage}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D97706] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-sm font-bold">{vid.title}</h4>
                    <p className="text-xs text-slate-300 truncate">{vid.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Lightbox & Video Player Modals */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={event.photos || []}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />

      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={selectedVideo.url}
        title={selectedVideo.title}
      />

    </div>
  );
}

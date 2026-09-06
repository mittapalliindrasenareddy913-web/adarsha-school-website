import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteContext';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function FloatingButtons() {
  const { siteSettings, getWhatsAppUrl } = useSiteSettings();

  const primaryPhone = String(siteSettings?.contact?.phonePrimary || '+91 98765 43210');
  const whatsappUrl = getWhatsAppUrl('Hello Adarsha High School, I would like to enquire about admissions.');

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden group-hover:inline-block text-xs font-extrabold pr-1 transition-all">
          WhatsApp Enquiry
        </span>
      </a>

      {/* Floating Mobile Sticky Action Bar (Only visible on small screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-3 rounded-lg font-bold text-xs bg-[#0B192C] text-white flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call Now</span>
        </a>

        <Link
          to="/admissions"
          className="flex-1 py-2.5 px-3 rounded-lg font-bold text-xs bg-[#D97706] text-white flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Enquire Now</span>
        </Link>
      </div>
    </>
  );
}

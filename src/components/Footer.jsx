import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteContext';
import { GraduationCap, MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight, MessageSquare } from 'lucide-react';

export default function Footer() {
  const { siteSettings } = useSiteSettings();

  const schoolName = siteSettings?.schoolName || 'Adarsha E.M. School';
  const address = String(siteSettings?.location?.address || 'Cross Road, Thamballapalle, Andhra Pradesh, India');
  const phonePrimary = String(siteSettings?.contact?.phonePrimary || '+91 98765 43210');
  const phoneSecondary = siteSettings?.contact?.phoneSecondary ? String(siteSettings.contact.phoneSecondary) : '';
  const whatsappNumber = String(siteSettings?.contact?.whatsappNumber || '919876543210');
  const email = String(siteSettings?.contact?.email || 'info@adarshaemschool.edu.in');
  const admissionsEmail = String(siteSettings?.contact?.admissionsEmail || siteSettings?.contact?.email || 'admissions@adarshaemschool.edu.in');
  const workingHours = String(siteSettings?.contact?.workingHours || 'Monday to Saturday: 8:30 AM – 4:30 PM');
  const googleMapsUrl = String(siteSettings?.location?.googleMapsUrl || 'https://maps.app.goo.gl/SkHq86FABbvmB51J6');

  const devText = siteSettings?.developerCredit?.text || 'Designed & Developed by';
  const devBrand = siteSettings?.developerCredit?.brandName || 'ISR WEBDESIGN';
  const devWebsite = siteSettings?.developerCredit?.website && siteSettings.developerCredit.website !== '#'
    ? siteSettings.developerCredit.website
    : 'https://isrwebdesign.com/';

  return (
    <footer className="font-sans bg-[#0B192C] text-slate-100 border-t border-slate-800">
      
      {/* Top Banner Accent Divider */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0B192C] via-[#D97706] to-[#1E3E62]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: School Identity & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              {siteSettings?.logo ? (
                <img
                  src={siteSettings.logo}
                  alt={schoolName}
                  className="w-10 h-10 object-contain rounded-lg shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-black bg-[#1E3E62] text-amber-400 border border-slate-700 shadow-sm shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  {schoolName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Thamballapalle, Andhra Pradesh
                </span>
              </div>
            </Link>

            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-white">
              Shaping Curious Minds. <br />
              <span className="text-amber-400">Building Confident Futures.</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-normal">
              Providing structured education in Thamballapalle with academic rigor, digital smart learning aids, and traditional Indian moral values.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs bg-[#D97706] hover:bg-[#B45309] text-white shadow-sm transition-all"
              >
                <span>ADMISSION ENQUIRY</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Our School</Link></li>
              <li><Link to="/academics" className="hover:text-amber-400 transition-colors">Academics</Link></li>
              <li><Link to="/facilities" className="hover:text-amber-400 transition-colors">Campus Facilities</Link></li>
              <li><Link to="/faculty" className="hover:text-amber-400 transition-colors">Faculty Directory</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Academics & Admissions Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li><Link to="/achievements" className="hover:text-amber-400 transition-colors">Student Achievements</Link></li>
              <li><Link to="/events" className="hover:text-amber-400 transition-colors">Events & Functions</Link></li>
              <li><Link to="/announcements" className="hover:text-amber-400 transition-colors">Notice Board</Link></li>
              <li><Link to="/admissions" className="hover:text-amber-400 transition-colors">Admission Process</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Information</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information & Location */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              Campus Location & Contact
            </h4>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span className="leading-relaxed">{address}</span>
              </div>

              {phonePrimary && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-amber-400" />
                  <a href={`tel:${phonePrimary.replace(/\s+/g, '')}`} className="hover:text-amber-400 font-bold">
                    {phonePrimary} {phoneSecondary ? ` / ${phoneSecondary}` : ''}
                  </a>
                </div>
              )}

              {whatsappNumber && (
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 shrink-0 text-emerald-400" />
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 font-bold text-slate-300"
                  >
                    WhatsApp Helpline: +{whatsappNumber.replace(/\D/g, '')}
                  </a>
                </div>
              )}

              {email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-amber-400" />
                  <a href={`mailto:${email}`} className="hover:text-amber-400">{email}</a>
                </div>
              )}

              {workingHours && (
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <span>{workingHours}</span>
                </div>
              )}
            </div>

            {googleMapsUrl && (
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline"
                >
                  <span>View Google Maps Location</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {schoolName}, Thamballapalle. All Rights Reserved.
          </div>

          <div>
            {devText}{' '}
            <a
              href={devWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:underline transition-colors"
            >
              {devBrand}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, PhoneCall, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSiteSettings } from '../context/SiteContext';

export default function Contact() {
  const { siteSettings, getWhatsAppUrl } = useSiteSettings();
  const siteData = siteSettings;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setResponseState(null);

    try {
      const res = await api.submitContactEnquiry(formData);
      setLoading(false);
      if (res && res.success) {
        setResponseState(res);
      } else {
        setResponseState({
          success: false,
          message: res?.message || 'Unable to send message. Please check your details and try again.'
        });
      }
    } catch (err) {
      setLoading(false);
      setResponseState({
        success: false,
        message: err?.message || 'Something went wrong. Please check your connection and try again.'
      });
    }
  };

  return (
    <div className="font-sans bg-[#F8FAFC] text-[#0F172A] pb-20">
      <SEO
        title="Contact Us & Campus Location | Adarsha E.M. School"
        description="Get in touch with Adarsha E.M. School administration in Kadiri. Campus address, phone numbers, email, and Google Maps directions."
      />

      <PageHero
        eyebrow="CONTACT US"
        title="Let's start a conversation."
        subtitle="We welcome parents, visitors, and prospective families to get in touch with our school administration."
        badgeBg="bg-teal-600"
        badgeBorder="border-teal-400/40"
        badgeIcon={MapPin}
        gradientTo="to-teal-950/60"
      />

      {/* Main Grid: Details & Form */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Quick Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              align="left"
              badge="REACH OUT"
              title="Campus Contact Information"
              subtitle="Our administration desk is available during official working hours to answer your queries."
            />

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-teal-600 shadow-xs">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0B192C] mb-1">Campus Address</h4>
                  <p>{siteData?.location?.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-teal-600 shadow-xs">
                <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0B192C] mb-1">Helpline Phone</h4>
                  <p>{siteData?.contact?.phonePrimary}</p>
                  {siteData?.contact?.phoneSecondary && <p>{siteData?.contact?.phoneSecondary}</p>}
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-teal-600 shadow-xs">
                <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0B192C] mb-1">Email Queries</h4>
                  <p>{siteData?.contact?.email}</p>
                  {siteData?.contact?.admissionsEmail && <p>{siteData?.contact?.admissionsEmail}</p>}
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-slate-200 border-l-4 border-l-teal-600 shadow-xs">
                <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0B192C] mb-1">Office Hours</h4>
                  <p>{siteData?.contact?.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {siteData?.contact?.phonePrimary && (
                <a
                  href={`tel:${siteData.contact.phonePrimary}`}
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg font-bold text-xs bg-[#0B192C] text-white hover:bg-[#1E3E62] transition-colors shadow-xs"
                >
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span>CALL NOW</span>
                </a>
              )}

              <a
                href={getWhatsAppUrl('Hello Adarsha E.M. School, I would like to enquire about campus details.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>

              {siteData?.location?.googleMapsUrl && (
                <a
                  href={siteData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-lg font-bold text-xs bg-[#D97706] text-white hover:bg-[#B45309] transition-colors shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>GET DIRECTIONS</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form / Success Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-md space-y-6">
            {responseState?.success ? (
              <div className="p-8 rounded-lg bg-emerald-50 border border-emerald-200 text-slate-900 shadow-xs space-y-6 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded border border-emerald-300 inline-block mb-2">
                    ✓ Message Sent Successfully
                  </span>
                  <h3 className="text-2xl font-black text-[#0B192C]">
                    Message Received!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Thank you for contacting Adarsha E.M. School. We will get back to you soon.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-emerald-200 shadow-xs max-w-sm mx-auto space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    REFERENCE / TICKET NUMBER
                  </span>
                  <div className="text-2xl font-black font-mono text-[#0B192C] tracking-wider">
                    {responseState.ticketId}
                  </div>
                  <span className="text-[10px] text-slate-400 block">Keep this ticket number for tracking your inquiry.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResponseState(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 rounded-lg font-bold text-xs text-white bg-[#0B192C] hover:bg-[#1E3E62] shadow-xs transition-all inline-flex items-center gap-2"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
                    SEND A MESSAGE
                  </span>
                  <h3 className="text-2xl font-black text-[#0B192C]">
                    Direct Contact Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you.
                  </p>
                </div>

                {responseState && !responseState.success && (
                  <div className="p-4 rounded-lg border border-rose-200 bg-rose-50 text-rose-900 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{responseState.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={loading}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        disabled={loading}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        disabled={loading}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        disabled={loading}
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject of message"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      disabled={loading}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message or inquiry here..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-bold text-sm text-white bg-[#0B192C] hover:bg-[#1E3E62] shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4 text-amber-400" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-md h-96 bg-white p-2">
          <iframe
            title="Adarsha E.M. School Location Map"
            src={siteData?.location?.embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-lg"
          />
        </div>
      </section>

    </div>
  );
}

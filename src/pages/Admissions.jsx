import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { images } from '../data/images';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { useSiteSettings } from '../context/SiteContext';
import { CheckCircle2, ChevronDown, Send, Sparkles, FileText, Phone, AlertCircle } from 'lucide-react';

const faqs = [
  {
    q: "What academic grades are open for admission?",
    a: "Admissions are offered for Pre-Primary (Nursery to UKG), Primary (Grade 1 to 5), and High School (Grade 6 to 10) levels, subject to seat availability per grade."
  },
  {
    q: "What is the procedure for campus interaction?",
    a: "After submitting an online or offline inquiry, parents and students are invited for an informal interaction with our academic counselors to assess learning readiness and grade placement."
  },
  {
    q: "What documents are required during enrollment?",
    a: "Essential documents include the student's original Birth Certificate, Aadhaar card copies, recent passport photographs, and Transfer Certificate (TC) from the previous recognized school (if applicable)."
  },
  {
    q: "What are the school working hours for office inquiries?",
    a: "The administrative office operates Monday to Saturday from 8:30 AM to 4:30 PM (closed on Sundays and public holidays)."
  }
];

export default function Admissions() {
  const { siteSettings } = useSiteSettings();
  const [activeFaq, setActiveFaq] = useState(null);
  
  const admissionYear = siteSettings?.admissionAcademicYear || siteSettings?.admissionYear || '2026–2027';

  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    targetClass: 'Pre-Primary',
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
      const res = await api.submitAdmissionEnquiry(formData);
      setLoading(false);
      if (res && res.success) {
        setResponseState(res);
      } else {
        setResponseState({
          success: false,
          message: res?.message || 'Unable to log admission enquiry. Please check your details and try again.'
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
        title={`Admission Academic Year ${admissionYear} | Adarsha High School`}
        description={`Submit an admission enquiry for Academic Session ${admissionYear} at Adarsha High School, Thamballapalle.`}
      />

      <PageHero
        eyebrow={`ADMISSIONS OPEN ${admissionYear}`}
        title="Begin your child's educational journey."
        subtitle="We invite parents to partner with us in shaping a bright, disciplined, and fulfilling future for every child."
        badgeBg="bg-amber-600"
        badgeBorder="border-amber-400/40"
        badgeIcon={Sparkles}
        gradientTo="to-amber-950/60"
      />

      {/* Admission Process Steps */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          badge="4-STEP PROCESS"
          title="How Admission Works"
          subtitle="A simple, transparent process to welcome your child into our school community."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { step: "01", title: "ENQUIRE", desc: "Submit the online inquiry form below or visit our campus office in Thamballapalle." },
            { step: "02", title: "APPLY", desc: "Complete the official registration form with student certificates." },
            { step: "03", title: "INTERACT", desc: "Informal interaction session to review student readiness and grade placement." },
            { step: "04", title: "JOIN", desc: "Confirm fee formalities, document verification, and seat allotment." }
          ].map((st, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white border border-slate-200 border-t-2 border-t-amber-600 shadow-xs space-y-3">
              <span className="text-xl font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded inline-block">{st.step}</span>
              <h3 className="text-lg font-extrabold text-[#0B192C]">{st.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Admission Enquiry Form UI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form / Success Card Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-lg border border-slate-200 shadow-md space-y-6">
            {responseState?.success ? (
              <div className="p-8 rounded-lg bg-emerald-50 border border-emerald-200 text-slate-900 shadow-sm space-y-6 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded border border-emerald-300 inline-block mb-2">
                    ✓ Admission Enquiry Submitted
                  </span>
                  <h3 className="text-2xl font-black text-[#0B192C]">
                    Thank you! Enquiry Received.
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Your admission inquiry for Academic Year {admissionYear} has been logged in our system. Our admissions desk will contact you shortly.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-emerald-200 shadow-xs max-w-sm mx-auto space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    OFFICIAL REFERENCE NUMBER
                  </span>
                  <div className="text-2xl font-black font-mono text-[#0B192C] tracking-wider">
                    {responseState.referenceId}
                  </div>
                  <span className="text-[10px] text-slate-400 block">Please save this reference number for future communication.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResponseState(null);
                      setFormData({
                        parentName: '',
                        studentName: '',
                        phone: '',
                        email: '',
                        targetClass: 'Pre-Primary',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 rounded-lg font-bold text-xs text-white bg-[#0B192C] hover:bg-[#1E3E62] shadow-sm transition-all inline-flex items-center gap-2"
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#D97706] block mb-1">
                    ADMISSIONS OPEN {admissionYear}
                  </span>
                  <h3 className="text-2xl font-black text-[#0B192C]">
                    Submit an Admission Enquiry
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill in the details below. Our admissions coordinator will reach out to you.
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
                      <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        disabled={loading}
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Enter parent full name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Student Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        disabled={loading}
                        value={formData.studentName}
                        onChange={handleChange}
                        placeholder="Enter child name"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / Phone Number *</label>
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
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Class Grade *</label>
                    <select
                      name="targetClass"
                      disabled={loading}
                      value={formData.targetClass}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] bg-white disabled:opacity-60"
                    >
                      <option value="Pre-Primary">Pre-Primary (Nursery to UKG)</option>
                      <option value="Primary">Primary (Grade 1 to 5)</option>
                      <option value="High School">High School (Grade 6 to 10)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Additional Query / Notes</label>
                    <textarea
                      name="message"
                      rows="3"
                      disabled={loading}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mention any specific queries or background details..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B192C] disabled:opacity-60"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-bold text-sm text-white bg-[#D97706] hover:bg-[#B45309] shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Submitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT ADMISSION ENQUIRY</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Required Documents Checklist Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-lg bg-[#0B192C] text-white space-y-4 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400">
                <FileText className="w-5 h-5" />
                <h4 className="text-base font-extrabold">Required Documents Checklist</h4>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Original Birth Certificate of the Student (with copy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Transfer Certificate (TC) from previous school (if applicable)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Aadhaar Card copies of Student and Parents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Recent Passport-size Photographs of Student (4 copies)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Previous Academic Report Card / Marksheet</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <SectionHeading
          badge="FREQUENTLY ASKED QUESTIONS"
          title="Common Admission Queries"
          subtitle="Find quick answers regarding admission rules, requirements, and procedures."
        />

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs cursor-pointer transition-all"
              >
                <div className="p-4 flex items-center justify-between font-bold text-[#0B192C] text-sm">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

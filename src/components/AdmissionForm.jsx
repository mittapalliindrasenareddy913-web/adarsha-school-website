import React, { useState } from 'react';
import { schoolData } from '../data/schoolData';
import { 
  User, 
  Phone, 
  Mail, 
  BookOpen, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    grade: 'Grade I',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const gradeOptions = [
    "Nursery / Pre-KG",
    "LKG / UKG",
    "Grade I",
    "Grade II",
    "Grade III",
    "Grade IV",
    "Grade V",
    "Grade VI",
    "Grade VII",
    "Grade VIII",
    "Grade IX",
    "Grade X"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = "Student's full name is required";
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Parent/Guardian name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedRef = 'ADM-' + Math.floor(100000 + Math.random() * 900000);
      setRefId(generatedRef);
    }, 1000);
  };

  const resetForm = () => {
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      email: '',
      grade: 'Grade I',
      message: ''
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-5 sm:p-8 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-6 max-w-xl w-full mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Enquiry Received
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Thank You for Your Enquiry!
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            We have received your admission request for <strong className="text-slate-900">{formData.studentName}</strong> ({formData.grade}). Our admission counselor in Thamballapalle will contact you shortly.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-1.5 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 shrink-0">Reference ID:</span>
            <span className="font-mono font-bold text-blue-900 truncate">{refId}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 shrink-0">Parent Name:</span>
            <span className="font-semibold truncate">{formData.parentName}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-slate-500 shrink-0">Phone:</span>
            <span className="font-semibold truncate">{formData.phone}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`https://wa.me/${schoolData.contact.whatsappNumber}?text=Hello%20Adarsha%20High%20School,%20I%20have%20submitted%20admission%20enquiry%20Ref:%20${refId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="truncate">Instant WhatsApp Chat</span>
          </a>
          <button
            onClick={resetForm}
            className="py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Admission Enquiry Form
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fill out the form below and our academic team will guide you through the process.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Student Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Student's Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Rahul Kumar"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.studentName 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-900 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.studentName && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.studentName}</span>
            </p>
          )}
        </div>

        {/* Parent Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Parent / Guardian Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="e.g. S. Suresh Reddy"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.parentName 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-900 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.parentName && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.parentName}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +91 9876543210"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-900 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. parent@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-slate-200 focus:border-blue-900 focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      {/* Grade Interested In */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Class / Grade Seeking Admission <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
          >
            {gradeOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Additional Information / Message (Optional)
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Mention any specific queries regarding transportation, curriculum, or sports..."
          className="w-full p-3 rounded-xl text-sm bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Admission Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-400 text-center">
        Demo Mode: Submissions demonstrate frontend validation & confirmation state without server storage.
      </p>
    </form>
  );
}

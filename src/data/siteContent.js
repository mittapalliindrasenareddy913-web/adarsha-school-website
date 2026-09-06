// Centralized Site Content & Copy Configuration
// All copy, location references, contact placeholders, and branding credits reside here.
// In Phase 2, this file can be replaced by API calls to `getSiteSettings()`.

export const siteContent = {
  schoolName: "Adarsha High School",
  schoolFullName: "Adarsha High School",
  tagline: "Bringing corporate-standard education to every child at affordable and accessible fees.",
  subTagline: "కార్పొరేట్ స్థాయి విద్యను అందుబాటు ఫీజులతో ప్రతి విద్యార్థికి అందించడమే మా లక్ష్యం",
  
  // Home CMS Sub-Object
  home: {
    heroTagline: "Bringing corporate-standard education to every child at affordable and accessible fees.",
    heroSubTagline: "కార్పొరేట్ స్థాయి విద్యను అందుబాటు ఫీజులతో ప్రతి విద్యార్థికి అందించడమే మా లక్ష్యం",
    heroMediaType: "R2_VIDEO",
    heroImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80",
    heroVideoUrl: "https://pub-178f89930dcd42dc9acf32d9cb439925.r2.dev/school/hero/adarsha-school-video-2556c2ed-06fc-4864-a5e4-609446c81df2.mp4",
    heroYouTubeUrl: "",
    aboutSectionHeading: "Welcome to Adarsha High School",
    aboutText: "At Adarsha High School, we foster an educational culture that balances conceptual understanding with moral values, physical well-being, and creative expression. Every student is encouraged to discover their unique strengths in a safe, inspiring environment."
  },

  // Hero Copy
  hero: {
    eyebrow: "ADARSHA HIGH SCHOOL • THAMBALLAPALLE, AP",
    headlineLine1: "Bringing corporate-standard education",
    headlineLine2: "to every child at affordable fees.",
    subheadline: "కార్పొరేట్ స్థాయి విద్యను అందుబాటు ఫీజులతో ప్రతి విద్యార్థికి అందించడమే మా లక్ష్యం",
    primaryCtaText: "EXPLORE OUR SCHOOL",
    primaryCtaLink: "/about",
    secondaryCtaText: "ADMISSIONS",
    secondaryCtaLink: "/admissions",
    scrollIndicatorText: "SCROLL TO EXPLORE"
  },

  // Experience Section
  experience: {
    eyebrow: "THE ADARSHA EXPERIENCE",
    headlineLine1: "Learning is more than",
    headlineLine2: "what happens inside a classroom.",
    description: "At Adarsha High School, we foster an educational culture that balances conceptual understanding with moral values, physical well-being, and creative expression. Every student is encouraged to discover their unique strengths in a safe, inspiring environment.",
    ctaText: "Discover Our Story",
    ctaLink: "/about"
  },

  // Location & Contact
  location: {
    address: "Cross Road, Thamballapalle, Andhra Pradesh, India",
    landmark: "Cross Road, Thamballapalle",
    googleMapsUrl: "https://maps.app.goo.gl/SkHq86FABbvmB51J6",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.6!2d78.4483544!3d13.8244027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2455cd9c3208f%3A0xed5d454df6a552a5!2sAdarsha%20E.M%20school!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    note: "Official location"
  },

  contact: {
    phonePrimary: "+91 8222844480",
    phoneSecondary: "",
    whatsappNumber: "+91 8222844480",
    email: "info@adarshaschool.in",
    admissionsEmail: "info@adarshaschool.in",
    workingHours: "Monday to Saturday: 8:30 AM – 4:30 PM",
    isPlaceholder: false
  },

  // Developer Branding (Easily editable)
  developerCredit: {
    text: "Designed & Developed by",
    brandName: "ISR WEBDESIGN",
    website: "https://isrwebdesign.com/"
  },

  // Why Adarsha Interactive Panels
  whyAdarsha: [
    {
      id: "01",
      title: "ACADEMIC EXCELLENCE",
      subtitle: "Conceptual Rigor & Critical Thinking",
      description: "Structured curriculum emphasizing foundational clarity, inquiry-driven learning, and strong analytical problem-solving skills.",
      image: ""
    },
    {
      id: "02",
      title: "CHARACTER & VALUES",
      subtitle: "Integrity, Discipline & Ethics",
      description: "Instilling deep respect, empathy, personal discipline, and civic responsibility alongside academic achievements.",
      image: ""
    },
    {
      id: "03",
      title: "SPORTS & CREATIVITY",
      subtitle: "Physical Fitness & Expression",
      description: "Balanced emphasis on sports Drills, outdoor athletics, performing arts, and creative workshops for holistic growth.",
      image: ""
    },
    {
      id: "04",
      title: "TECHNOLOGY & INNOVATION",
      subtitle: "Digital Literacy & Smart Tools",
      description: "Audio-visual learning aids, IT literacy labs, and modern teaching tools preparing students for a digital world.",
      image: ""
    },
    {
      id: "05",
      title: "SAFE & CARING ENVIRONMENT",
      subtitle: "Security & Nurturing Atmosphere",
      description: "Monitored campus premises, dedicated staff supervision, and a supportive atmosphere where every child feels valued.",
      image: ""
    }
  ],

  // Core Values
  values: [
    { name: "Excellence", desc: "Striving for high standards in academic and personal growth." },
    { name: "Integrity", desc: "Upholding honesty, respect, and ethical principles in all actions." },
    { name: "Curiosity", desc: "Encouraging continuous questioning, discovery, and active learning." },
    { name: "Compassion", desc: "Fostering empathy, kindness, and strong community responsibility." }
  ],

  // Stats Placeholders (Supporting dynamic values when available)
  stats: [
    { label: "Years of Educational Service", value: "20+", note: "Editable placeholder stat" },
    { label: "Enrolled Students", value: "850+", note: "Editable placeholder stat" },
    { label: "Qualified Faculty", value: "45+", note: "Editable placeholder stat" },
    { label: "Co-Curricular Activities", value: "15+", note: "Editable placeholder stat" }
  ]
};

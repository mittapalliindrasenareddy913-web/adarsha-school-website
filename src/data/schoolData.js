// Centralized school data configuration for Adarsha E.M. School client demo.
// Factual details verified from Google Maps location: Adarsha E.M. School, Thamballapalle, Andhra Pradesh.
// Unverified metrics (phone numbers, specific affiliations, staff names) are clearly marked with demo placeholders.

export const schoolData = {
  name: "Adarsha E.M. School",
  fullName: "Adarsha English Medium School",
  tagline: "Empowering Young Minds, Building Bright Futures",
  shortTagline: "Nurturing Character & Academic Excellence",
  
  // Location & Contact (Verified Google Maps details + marked demo phone/email)
  location: {
    address: "Cross Road, Thamballapalle, Andhra Pradesh, India",
    landmark: "Cross Road, Thamballapalle",
    lat: 13.8244027,
    lng: 78.4483544,
    googleMapsUrl: "https://maps.app.goo.gl/SkHq86FABbvmB51J6",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.6!2d78.4483544!3d13.8244027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2455cd9c3208f%3A0xed5d454df6a552a5!2sAdarsha%20E.M%20school!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  contact: {
    phonePrimary: "+91 98765 43210", // Demo phone number
    phoneSecondary: "",
    whatsappNumber: "919876543210",
    email: "info@adarshaemschool.edu.in", // Demo email
    admissionsEmail: "admissions@adarshaemschool.edu.in",
    workingHours: "Monday to Saturday: 8:30 AM – 4:30 PM (Closed on Sundays & Public Holidays)",
    isPhoneDemo: true,
    isEmailDemo: true,
  },

  // Developer Branding (Easily replaceable)
  developerCredit: {
    text: "Designed & Developed by",
    brandName: "WebCraft Studio", // Change this to your agency/company name!
    website: "#"
  },

  // Navigation Links
  navLinks: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Facilities", path: "/facilities" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Achievements", path: "/achievements" },
    { name: "Contact", path: "/contact" }
  ],

  // Key Statistics (Placeholder metrics marked clearly for management review)
  stats: [
    { label: "Years of Educational Commitment", value: "20+", icon: "Award", note: "Demo Stat — Subject to Verification" },
    { label: "Enrolled Students", value: "850+", icon: "Users", note: "Demo Stat — Subject to Verification" },
    { label: "Qualified Educators", value: "45+", icon: "GraduationCap", note: "Demo Stat — Subject to Verification" },
    { label: "Pass Result Rate", value: "98%", icon: "TrendingUp", note: "Demo Stat — Subject to Verification" }
  ],

  // Why Choose Us
  whyChooseUs: [
    {
      id: "educators",
      title: "Experienced Educators",
      description: "Dedicated and passionate teaching faculty committed to nurturing individual potential and intellectual growth.",
      icon: "UserCheck",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: "smart-learning",
      title: "Smart Classroom Learning",
      description: "Digital audio-visual aids and modern teaching tools making complex concepts intuitive and engaging.",
      icon: "MonitorPlay",
      color: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "holistic",
      title: "Holistic Development",
      description: "Balanced emphasis on academics, arts, physical fitness, ethics, and leadership skills.",
      icon: "Sparkles",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "safety",
      title: "Safe & Supportive Campus",
      description: "24/7 CCTV security surveillance, structured access control, and a compassionate learning atmosphere.",
      icon: "ShieldCheck",
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      id: "sports",
      title: "Sports & Physical Fitness",
      description: "Spacious sports grounds, structured physical education curriculum, and regular athletics training.",
      icon: "Trophy",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      id: "values",
      title: "Strong Moral Values",
      description: "Instilling discipline, respect, empathy, and social responsibility alongside academic preparation.",
      icon: "HeartHandshake",
      color: "bg-teal-50 text-teal-700 border-teal-200"
    }
  ],

  // Academic Stages
  academics: {
    overview: "Our academic curriculum blends conceptual clarity with practical inquiry, ensuring every student develops critical thinking and lifelong learning habits.",
    levels: [
      {
        id: "primary",
        title: "Primary School",
        grades: "Grades I to V (Foundational)",
        description: "Focuses on foundational literacy, numeracy, active curiosity, creative art, and motor skill development.",
        keyFocus: ["Activity-Based Learning", "Language & Communication Skills", "Basic Environmental Science", "Art & Moral Science"],
        icon: "Baby",
        imageKey: "primarySchool"
      },
      {
        id: "middle",
        title: "Middle School",
        grades: "Grades VI to VIII (Preparatory)",
        description: "Transition towards structured subject specialization, scientific inquiry, logic, problem-solving, and team projects.",
        keyFocus: ["Mathematics & Integrated Science", "Social Studies & Geography", "Computer Literacy & Coding", "Co-Curricular Clubs"],
        icon: "BookOpen",
        imageKey: "middleSchool"
      },
      {
        id: "high",
        title: "High School / Secondary",
        grades: "Grades IX to X (Secondary Preparation)",
        description: "Comprehensive exam preparation, analytical skill refinement, career awareness, and competitive academic foundation.",
        keyFocus: ["Board Curriculum Alignment", "Science & Mathematics Labs", "Mock Examinations & Assessments", "Personality & Career Guidance"],
        icon: "GraduationCap",
        imageKey: "highSchool"
      }
    ]
  },

  // Facilities
  facilitiesList: [
    {
      id: "smart-class",
      title: "Smart Classrooms",
      description: "Well-ventilated classrooms fitted with modern projectors, smart interactive screens, and ergonomic furniture.",
      icon: "Tv",
      imageKey: "smartClassroom",
      features: ["Interactive Smart Boards", "High-Speed Internet Access", "Ergonomic Student Seating", "Optimal Natural Lighting"]
    },
    {
      id: "science-lab",
      title: "Science Laboratories",
      description: "Equipped physics, chemistry, and biology labs allowing students to conduct experiments safely under expert guidance.",
      icon: "FlaskConical",
      imageKey: "scienceLab",
      features: ["High-grade Microscopes", "Safety Apparatus & Fume Hoods", "Individual Student Workstations", "Comprehensive Chemical Stock"]
    },
    {
      id: "computer-lab",
      title: "Computer & IT Lab",
      description: "State-of-the-art computer center with updated operating systems, high-speed broadband, and programming software.",
      icon: "Laptop",
      imageKey: "computerLab",
      features: ["Latest Desktop PCs", "Supervised Internet Surfing", "Coding & Multimedia Software", "Power Backup Generators"]
    },
    {
      id: "library",
      title: "Library & Knowledge Resource Hub",
      description: "Quiet reading environment featuring thousands of academic books, encyclopedias, children's literature, and periodicals.",
      icon: "Library",
      imageKey: "library",
      features: ["Extensive Book Collection", "Daily Newspapers & Periodicals", "Dedicated Reading Area", "Digital Resource Catalog"]
    },
    {
      id: "playground",
      title: "Sports Complex & Playground",
      description: "Dedicated sports ground for athletics, cricket, volleyball, football, badminton, and physical fitness exercises.",
      icon: "Activity",
      imageKey: "playground",
      features: ["Outdoor Game Courts", "Athletics Running Track", "Indoor Games Room (Chess, Carrom)", "Qualified Physical Instructors"]
    },
    {
      id: "transport",
      title: "School Transport Fleet",
      description: "Safe, comfortable school buses covering major routes in Thamballapalle and surrounding towns with dedicated attendants.",
      icon: "Bus",
      imageKey: "transportation",
      features: ["GPS Tracking Facilities", "Trained Drivers & Bus Attendants", "Emergency First Aid Kits", "Structured Route Timings"]
    },
    {
      id: "safety",
      title: "Campus Security & CCTV",
      description: "Round-the-clock security monitoring with HD CCTV cameras covering entrance gates, hallways, playgrounds, and common zones.",
      icon: "ShieldAlert",
      imageKey: "safetySecurity",
      features: ["24/7 Guarded Entry Gates", "CCTV Monitoring Room", "Fire Extinguishers & Drills", "Strict Visitor Verification"]
    },
    {
      id: "activity-room",
      title: "Creative Arts & Activity Rooms",
      description: "Dedicated spaces for music, dance, visual arts, craft workshops, and theatrical dramatics training.",
      icon: "Palette",
      imageKey: "activityRooms",
      features: ["Musical Instruments Room", "Art & Craft Supplies", "Performing Arts Stage Area", "Exhibition Display Boards"]
    }
  ],

  // School Life Sections
  schoolLife: [
    {
      title: "Sports & Athletics",
      desc: "Annual sports meets, intra-school leagues, and fitness drills developing teamwork and endurance.",
      icon: "Trophy"
    },
    {
      title: "Cultural Celebrations",
      desc: "Vibrant festivals, Annual Day galas, musical concerts, and theatrical plays celebrating rich Indian heritage.",
      icon: "Music"
    },
    {
      title: "Academic Competitions",
      desc: "Science fairs, math olympiads, spelling bees, and inter-house debate challenges.",
      icon: "Brain"
    },
    {
      title: "Social & Environmental Clubs",
      desc: "Tree plantation drives, cleanliness campaigns, and community welfare initiatives fostering civic pride.",
      icon: "Trees"
    }
  ],

  // Achievements
  achievementsList: [
    {
      id: 1,
      category: "Academic Excellence",
      title: "Outstanding Board Result Distinction",
      description: "Consistent high scoring pass rate in secondary board examinations with several distinction rankings.",
      year: "2024–2025",
      badge: "Demo Achievement",
      icon: "Award"
    },
    {
      id: 2,
      category: "Sports Championship",
      title: "District Level Athletics Trophy",
      description: "Student relay and sprint teams secured podium finishes in district inter-school tournaments.",
      year: "2024",
      badge: "Demo Achievement",
      icon: "Trophy"
    },
    {
      id: 3,
      category: "Science & Innovation",
      title: "Regional Science Fair First Prize",
      description: "Student environmental project model recognized for innovative renewable energy design.",
      year: "2023",
      badge: "Demo Achievement",
      icon: "Lightbulb"
    },
    {
      id: 4,
      category: "Cultural Arts",
      title: "State Level Patriotic Song & Dance Award",
      description: "School cultural troupe won accolades for traditional folk dance performance.",
      year: "2024",
      badge: "Demo Achievement",
      icon: "Sparkles"
    }
  ],

  // Admission Process Flow
  admissionSteps: [
    {
      step: "01",
      title: "Inquiry & Campus Tour",
      description: "Submit an online enquiry form or visit our campus in Thamballapalle to meet our academic counselors."
    },
    {
      step: "02",
      title: "Application Registration",
      description: "Obtain and fill out the official school application form with necessary details and student documents."
    },
    {
      step: "03",
      title: "Interaction & Readiness Assessment",
      description: "An informal interactive session with student and parents to assess learning readiness and grade placement."
    },
    {
      step: "04",
      title: "Admission Confirmation & Enrollment",
      description: "Upon selection, complete fee formality and document verification to secure seat allotment."
    }
  ],

  // Required Admission Documents
  requiredDocuments: [
    "Original Birth Certificate of the Student (with self-attested photocopy)",
    "Transfer Certificate (TC) from previous recognized school (for Grade II and above)",
    "Report Card / Marksheet of the last academic year attended",
    "Aadhaar Card copies of Student and Parents",
    "Recent Passport-size Photographs of Student (4 copies) and Parents (2 copies each)",
    "Community / Caste Certificate (if applicable for record maintenance)"
  ],

  // Management & Leadership Message
  principalMessage: {
    name: "Correspondent / Principal",
    title: "Leadership Desk",
    quote: "Education is not merely the accumulation of facts, but the training of the mind to think, moral courage to act, and character to lead.",
    message: "Welcome to Adarsha High School, Thamballapalle. Our mission is to nurture confident, ethically grounded, and intellectually curious young minds. We provide a safe, supportive environment where academic rigor meets joyful discovery. We invite parents to partner with us in shaping a bright and fulfilling future for every child.",
    imageKey: "principal"
  },

  // Social Links (Demo placeholders)
  socials: [
    { name: "Facebook", url: "https://facebook.com", icon: "Facebook", isDemo: true },
    { name: "Instagram", url: "https://instagram.com", icon: "Instagram", isDemo: true },
    { name: "YouTube", url: "https://youtube.com", icon: "Youtube", isDemo: true },
    { name: "WhatsApp", url: "https://wa.me/919876543210", icon: "MessageSquare", isDemo: true }
  ]
};

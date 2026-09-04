# Adarsha E.M. School — Client Demo Website

A premium, modern, professional, and fully responsive school website demo built for **Adarsha E.M. School**, located in **Kadiri, Anantapur District, Andhra Pradesh, India**.

---

## 🌟 Key Features

- **Real Multi-Page Routing**: Powered by `react-router-dom` v6 with smooth scroll restoration.
- **Client Demo Ready**: Factual location information verified from Google Maps (`13.8244, 78.4483`). Unverified metrics (phone numbers, specific staff names, fees) are clearly marked with subtle `DemoNotice` badges.
- **Centralized Data & Image Management**:
  - `src/data/schoolData.js` — Change school name, tagline, contact numbers, address, stats, navigation links, and developer agency attribution.
  - `src/data/images.js` — Single source of truth for all campus, classroom, science lab, library, sports, and gallery photos.
- **Header & Mobile Navigation**: Sticky header with scroll compacting, top contact bar, CTA button, and animated mobile drawer menu.
- **Interactive Lightbox Gallery**: Fullscreen image modal with category filtering (Campus, Classrooms, Events, Sports, Activities), Next/Previous navigation, and captions.
- **Validated Forms**: Premium Admission Enquiry and Contact forms with real-time validation, loading states, and animated success confirmation cards.
- **Floating Action Buttons**: Persistent WhatsApp enquiry button and sticky mobile Call Now bar.
- **Embedded Google Maps**: Real location map centered on Kadiri, AP with "Get Directions" link.

---

## 🛠️ Technology Stack

- **React 19**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide React** (Icons)
- **Framer Motion** (Smooth Page & Component Animations)
- **React Router DOM v6**

---

## 📂 Page Breakdown

1. **Home (`/`)**: 10 comprehensive sections (Hero, About, Why Choose Us, Academics, Facilities, School Life, Achievements, Gallery Preview, Admission CTA, Contact Preview).
2. **About Us (`/about`)**: School heritage, Vision & Mission, Core Values, Leadership Message.
3. **Academics (`/academics`)**: Academic philosophy, grade-wise curriculum breakdown (Primary, Middle, Secondary), modern teaching methodology.
4. **Facilities (`/facilities`)**: 8 visual facility cards with hover zoom effects (Smart Classrooms, Science Lab, Computer Lab, Library, Sports Complex, Transport Fleet, Security/CCTV, Activity Rooms).
5. **Admissions (`/admissions`)**: 4-step admission flow, documents checklist, interactive admission enquiry form, WhatsApp helpline.
6. **Gallery (`/gallery`)**: Filterable masonry image grid with interactive fullscreen Lightbox.
7. **Achievements (`/achievements`)**: Showcase of academic board results, sports championships, and science fairs.
8. **Contact Us (`/contact`)**: Location details, interactive contact form, clickable Call/WhatsApp/Directions buttons, embedded Google Maps.
9. **404 Not Found (`*`)**: Custom school-themed error page.

---

## 🚀 How to Run the Project Locally

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production preview
npm run build
npm run preview
```

---

## ✏️ How to Customize Branding & Agency Name

To update the developer/agency credit in the footer:
1. Open `src/data/schoolData.js`.
2. Locate `developerCredit`:
   ```javascript
   developerCredit: {
     text: "Designed & Developed by",
     brandName: "Your Agency Name", // Change this string
     website: "https://your-agency-website.com"
   }
   ```

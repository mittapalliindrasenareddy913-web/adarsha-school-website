import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';

import { ThemeProvider } from './context/ThemeContext';
import { SiteProvider } from './context/SiteContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Facilities from './pages/Facilities';
import Admissions from './pages/Admissions';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import Faculty from './pages/Faculty';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Contact from './pages/Contact';
import ThemeExplorer from './pages/ThemeExplorer';
import NotFound from './pages/NotFound';

// Admin CMS Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import HomeContentAdmin from './pages/admin/HomeContentAdmin';
import AboutAdmin from './pages/admin/AboutAdmin';
import AcademicsAdmin from './pages/admin/AcademicsAdmin';
import FacilitiesAdmin from './pages/admin/FacilitiesAdmin';
import FacultyAdmin from './pages/admin/FacultyAdmin';
import AchievementsAdmin from './pages/admin/AchievementsAdmin';
import PhotosAdmin from './pages/admin/PhotosAdmin';
import VideosAdmin from './pages/admin/VideosAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import EventsAdmin from './pages/admin/EventsAdmin';
import AnnouncementsAdmin from './pages/admin/AnnouncementsAdmin';
import AdmissionsAdmin from './pages/admin/AdmissionsAdmin';
import ContactEnquiriesAdmin from './pages/admin/ContactEnquiriesAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <SiteProvider>
        <AdminAuthProvider>
          <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
            <ScrollToTopOnRoute />
            
            {/* Render Public Header Navbar only on public pages */}
            {!isAdminRoute && <Navbar />}

            {/* Main Route Viewport */}
            <main className="flex-grow">
              <Routes>
                {/* PUBLIC WEBSITE ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:slug" element={<EventDetail />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/announcements/:slug" element={<AnnouncementDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/theme-explorer" element={<ThemeExplorer />} />

                {/* ADMIN CMS ROUTES */}
                <Route path="/admin/login" element={<Login />} />
                
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="content/home" element={<HomeContentAdmin />} />
                  <Route path="content/about" element={<AboutAdmin />} />
                  <Route path="content/academics" element={<AcademicsAdmin />} />
                  <Route path="content/facilities" element={<FacilitiesAdmin />} />
                  <Route path="content/faculty" element={<FacultyAdmin />} />
                  <Route path="content/achievements" element={<AchievementsAdmin />} />
                  
                  <Route path="media/photos" element={<PhotosAdmin />} />
                  <Route path="media/videos" element={<VideosAdmin />} />
                  <Route path="gallery" element={<GalleryAdmin />} />
                  
                  <Route path="events" element={<EventsAdmin />} />
                  <Route path="announcements" element={<AnnouncementsAdmin />} />
                  <Route path="admissions" element={<AdmissionsAdmin />} />
                  <Route path="contact-enquiries" element={<ContactEnquiriesAdmin />} />
                  <Route path="settings" element={<SettingsAdmin />} />
                </Route>

                {/* 404 NOT FOUND */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Render Public Footer, Floating Buttons & ScrollToTop only on public pages */}
            {!isAdminRoute && (
              <>
                <Footer />
                <FloatingButtons />
                <ScrollToTop />
              </>
            )}
          </div>
        </AdminAuthProvider>
      </SiteProvider>
    </ThemeProvider>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard,
  Home,
  BookOpen,
  UserCheck,
  Building,
  GraduationCap,
  Trophy,
  Image,
  Video,
  Grid,
  Calendar,
  BellRing,
  Inbox,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';

const sidebarGroups = [
  {
    title: "DASHBOARD",
    items: [
      { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard }
    ]
  },
  {
    title: "CONTENT",
    items: [
      { name: "Home Content", path: "/admin/content/home", icon: Home },
      { name: "About School", path: "/admin/content/about", icon: BookOpen },
      { name: "Leadership Desk", path: "/admin/content/leadership", icon: UserCheck },
      { name: "Academics", path: "/admin/content/academics", icon: GraduationCap },
      { name: "Facilities", path: "/admin/content/facilities", icon: Building },
      { name: "Faculty", path: "/admin/content/faculty", icon: GraduationCap },
      { name: "Achievements", path: "/admin/content/achievements", icon: Trophy }
    ]
  },
  {
    title: "MEDIA",
    items: [
      { name: "Photos", path: "/admin/media/photos", icon: Image },
      { name: "Videos", path: "/admin/media/videos", icon: Video },
      { name: "Gallery", path: "/admin/gallery", icon: Grid }
    ]
  },
  {
    title: "EVENTS",
    items: [
      { name: "Functions & Events", path: "/admin/events", icon: Calendar }
    ]
  },
  {
    title: "COMMUNICATION",
    items: [
      { name: "Announcements & Notices", path: "/admin/announcements", icon: BellRing }
    ]
  },
  {
    title: "ENQUIRIES",
    items: [
      { name: "Admission Enquiries", path: "/admin/admissions", icon: Inbox },
      { name: "Contact Enquiries", path: "/admin/contact-enquiries", icon: MessageSquare }
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Website Settings", path: "/admin/settings", icon: Settings }
    ]
  }
];

export default function AdminSidebar({ closeMobile, unreadCounts = {} }) {
  const location = useLocation();
  const { logout } = useAdminAuth();

  return (
    <aside className="w-64 bg-white border-r border-amber-200/70 flex flex-col justify-between h-full text-slate-800 font-sans">
      
      {/* Top Header Logo */}
      <div className="p-6 border-b border-amber-200/70 bg-[#fdf6e2]/40 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            CMS
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="text-[10px] text-amber-800 font-semibold">Adarsha E.M. School</p>
          </div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {sidebarGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70 px-3 block mb-2">
              {group.title}
            </span>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              const unreadNum = item.path === '/admin/admissions'
                ? unreadCounts?.unreadAdmissions
                : item.path === '/admin/contact-enquiries'
                ? unreadCounts?.unreadContacts
                : 0;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobile}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-800'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {Boolean(unreadNum && unreadNum > 0) && (
                    <span className="shrink-0 ml-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-xs">
                      {unreadNum}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-amber-200/70 bg-[#fdf6e2]/30 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-white hover:text-amber-900 border border-transparent hover:border-amber-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-amber-700" />
          <span>Preview Public Site</span>
        </a>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Session</span>
        </button>
      </div>

    </aside>
  );
}

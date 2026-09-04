import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { useAdminAuth } from '../context/AdminAuthContext';
import { api } from '../services/api';
import { Menu, ExternalLink, User, ShieldCheck, Bell, X } from 'lucide-react';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin } = useAdminAuth();

  const [unreadCounts, setUnreadCounts] = useState({ unreadAdmissions: 0, unreadContacts: 0, totalUnread: 0 });
  const [toastMsg, setToastMsg] = useState('');

  const fetchUnreadCounts = async (isInitial = false) => {
    try {
      const res = await api.adminGetUnreadCounts();
      if (res && res.success) {
        setUnreadCounts(prev => {
          const newTotal = res.totalUnread;
          if (isInitial && newTotal > 0) {
            setToastMsg(`You have ${newTotal} new/unread enquiries.`);
          } else if (!isInitial && newTotal > prev.totalUnread) {
            setToastMsg(`New admission enquiry received!`);
          }
          return {
            unreadAdmissions: res.unreadAdmissions,
            unreadContacts: res.unreadContacts,
            totalUnread: res.totalUnread
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnreadCounts(true);
    const interval = setInterval(() => {
      fetchUnreadCounts(false);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex font-sans">
      
      {/* Desktop Permanent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <AdminSidebar unreadCounts={unreadCounts} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 w-64 max-w-[85vw] h-full bg-white shadow-2xl">
            <AdminSidebar unreadCounts={unreadCounts} closeMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Navbar */}
        <header className="bg-white border-b border-amber-200/70 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-amber-50 text-slate-700 border border-amber-200 hover:bg-amber-100 shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-amber-900 uppercase tracking-widest truncate">
                CMS Production Environment
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Notification Bell Badge */}
            <Link
              to="/admin/admissions"
              className="relative p-2 rounded-xl bg-amber-50 text-slate-800 border border-amber-200 hover:bg-amber-100 transition-all flex items-center justify-center"
              title="Admission Enquiries Notifications"
            >
              <Bell className="w-4 h-4 text-amber-900" />
              {unreadCounts.totalUnread > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-rose-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
                  {unreadCounts.totalUnread}
                </span>
              )}
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 border border-amber-400 hover:bg-amber-400 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </a>

            <div className="flex items-center gap-2 sm:gap-3 border-l border-amber-200/80 pl-3 sm:pl-4">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left min-w-0">
                <span className="text-xs font-bold text-slate-900 block leading-none truncate">
                  {admin?.email || 'Administrator'}
                </span>
                <span className="text-[10px] text-amber-800 font-semibold">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Floating Notification Toast */}
        {toastMsg && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-2xl bg-slate-900 text-white text-xs font-bold flex items-center justify-between shadow-lg border border-amber-400/30 animate-bounce">
            <div className="flex items-center gap-2 min-w-0">
              <Bell className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
              <span className="truncate">{toastMsg}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/admin/admissions"
                onClick={() => setToastMsg('')}
                className="px-3 py-1 bg-amber-400 text-slate-950 rounded-lg text-[10px] font-extrabold hover:bg-amber-300 transition-colors uppercase tracking-wider"
              >
                View Enquiries
              </Link>
              <button onClick={() => setToastMsg('')} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Page Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-[#faf8f5]">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ refreshUnread: fetchUnreadCounts }} />
          </div>
        </main>

      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import {
  Image,
  Video,
  BellRing,
  Calendar,
  GraduationCap,
  Trophy,
  Inbox,
  MessageSquare,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.adminGetDashboardStats();
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-amber-800 font-bold text-sm">
        Loading Real-Time Analytics Dashboard...
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Admin CMS Dashboard" />

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">System Overview</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Real-time content metrics and system activity log from MongoDB</p>
      </div>

      {/* All 8 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Photos</span>
            <Image className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalPhotos || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Videos</span>
            <Video className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalVideos || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Notices</span>
            <BellRing className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalAnnouncements || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Events</span>
            <Calendar className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.upcomingEvents || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Faculty</span>
            <GraduationCap className="w-4 h-4 text-sky-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalFaculty || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Achievements</span>
            <Trophy className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.totalAchievements || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Admission Enquiries</span>
            <Inbox className="w-4 h-4 text-amber-800" />
          </div>
          <div className="text-3xl font-extrabold text-amber-950">{stats?.admissionEnquiries || 0}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Messages</span>
            <MessageSquare className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats?.contactEnquiries || 0}</div>
        </div>

      </div>

      {/* Activity Log & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Activity Log Feed */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-amber-200/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Recent Activity Log</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">MongoDB Audit Trail</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data?.recentActivity?.length > 0 ? (
              data.recentActivity.map((log) => (
                <div key={log._id} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-100 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-amber-800 font-bold">{log.action}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {log.details && <p className="text-slate-600 text-[11px]">{log.details}</p>}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No activity recorded yet.</p>
            )}
          </div>
        </div>

        {/* Upcoming Events Preview */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-amber-200/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Upcoming Events</span>
            </h3>
          </div>

          <div className="space-y-3">
            {data?.upcomingEventList?.length > 0 ? (
              data.upcomingEventList.map((ev) => (
                <div key={ev._id} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-100 text-xs space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-950 inline-block border border-amber-200">
                    {ev.category}
                  </span>
                  <h4 className="font-bold text-slate-900">{ev.name}</h4>
                  <p className="text-[10px] text-slate-600">{ev.dateFormatted} • {ev.location}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No upcoming events scheduled.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

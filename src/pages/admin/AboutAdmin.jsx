import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Save, BookOpen } from 'lucide-react';

export default function AboutAdmin() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.adminGetSettings();
        if (res.success) setSettings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      const res = await api.adminUpdateSettings(settings);
      setSaving(false);
      if (res.success) {
        setSettings(res.data);
        setMsg('About School settings updated!');
      } else {
        setMsg('Failed to update.');
      }
    } catch (err) {
      setSaving(false);
      setMsg('Server error while saving.');
    }
  };

  if (loading) return <div className="p-8 text-amber-400 font-bold text-sm">Loading About Settings...</div>;

  return (
    <div className="space-y-8 font-sans">
      <SEO title="About School Manager | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">About School Content Manager</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Manage school story, leadership vision, and values.</p>
      </div>

      {msg && <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">{msg}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">School Full Name</label>
          <input type="text" value={settings?.schoolFullName || ''} onChange={(e) => setSettings({ ...settings, schoolFullName: e.target.value })} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm" />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Leadership Desk Quote / Subtitle</label>
          <textarea rows="2" value={settings?.subTagline || ''} onChange={(e) => setSettings({ ...settings, subTagline: e.target.value })} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"></textarea>
        </div>

        <button type="submit" disabled={saving} className="px-8 py-4 rounded-2xl font-bold text-xs bg-amber-400 text-slate-950 shadow-xl flex items-center gap-2">
          <Save className="w-4 h-4" />
          <span>SAVE ABOUT PAGE CONTENT</span>
        </button>
      </form>

    </div>
  );
}

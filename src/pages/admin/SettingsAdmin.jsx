import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Save, Settings, ShieldCheck, Image } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteContext';
import MediaUploader from '../../components/MediaUploader';

export default function SettingsAdmin() {
  const { refreshSiteSettings } = useSiteSettings();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

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
    setStatusMsg({ type: '', text: '' });

    try {
      const res = await api.adminUpdateSettings(settings);
      setSaving(false);
      if (res.success) {
        setSettings(res.data);
        await refreshSiteSettings();
        setStatusMsg({ type: 'success', text: 'Website settings saved successfully.' });
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Failed to update website settings.' });
      }
    } catch (err) {
      setSaving(false);
      setStatusMsg({ type: 'error', text: err.message || 'Server error while saving website settings.' });
    }
  };

  if (loading) return <div className="p-8 text-amber-500 font-bold text-sm">Loading Website Settings...</div>;

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Website Settings | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d]">Website & Contact Settings</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Manage official school logo, contact information, map URLs, working hours, and SEO metadata.</p>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-xl text-xs font-bold ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border border-red-500/30 text-red-300'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800 text-xs">
        
        {/* SCHOOL LOGO MANAGEMENT */}
        <div className="space-y-3 pb-6 border-b border-slate-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Image className="w-4 h-4 text-amber-400" />
            <span>School Logo</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <label className="block font-bold text-slate-300">
              Upload Official Logo (PNG / WEBP / JPG)
            </label>

            <MediaUploader
              mode="image"
              category="Campus"
              value={settings?.logo || ''}
              onChange={(url) => setSettings({ ...settings, logo: url })}
            />

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Recommended: <strong>PNG or WEBP with transparent background</strong>. Uploaded logo will automatically update the Header and Footer across the public website. Replacing or removing the logo reference will not delete the original physical file from R2.
            </p>
          </div>
        </div>

        {/* BRANDING & CONTACT DETAILS */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">School Branding & Contact</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">School Display Name</label>
              <input
                type="text"
                value={settings?.schoolName || ''}
                onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-amber-300 mb-1">Admission Academic Year (e.g. 2026–27)</label>
              <input
                type="text"
                value={settings?.admissionAcademicYear || '2026–27'}
                onChange={(e) => setSettings({ ...settings, admissionAcademicYear: e.target.value })}
                placeholder="e.g. 2026–27 or 2027–28"
                className="w-full px-3 py-2 bg-slate-950 border border-amber-500/50 rounded-xl text-amber-300 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Official Email</label>
              <input
                type="email"
                value={settings?.contact?.email || ''}
                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">WhatsApp Helpline</label>
              <input
                type="text"
                value={settings?.contact?.whatsappNumber || ''}
                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, whatsappNumber: e.target.value } })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Campus Address</label>
            <input
              type="text"
              value={settings?.location?.address || ''}
              onChange={(e) => setSettings({ ...settings, location: { ...settings.location, address: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Google Maps URL</label>
            <input
              type="text"
              value={settings?.location?.googleMapsUrl || ''}
              onChange={(e) => setSettings({ ...settings, location: { ...settings.location, googleMapsUrl: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">SEO Meta Configuration</h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Site Title</label>
            <input
              type="text"
              value={settings?.seo?.siteTitle || ''}
              onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteTitle: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Meta Description</label>
            <textarea
              rows="2"
              value={settings?.seo?.metaDescription || ''}
              onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, metaDescription: e.target.value } })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl font-bold text-xs bg-amber-400 text-slate-950 shadow-xl flex items-center gap-2 hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'SAVING WEBSITE SETTINGS...' : 'SAVE WEBSITE SETTINGS'}</span>
        </button>

      </form>
    </div>
  );
}

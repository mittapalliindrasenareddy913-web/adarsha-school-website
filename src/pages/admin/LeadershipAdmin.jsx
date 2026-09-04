import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Save, UserCheck, Shield, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteContext';
import MediaUploader from '../../components/MediaUploader';

export default function LeadershipAdmin() {
  const { refreshSiteSettings } = useSiteSettings();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('correspondent'); // 'correspondent' | 'principal'

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.adminGetSettings();
        if (res.success && res.data) {
          const d = res.data;
          // Ensure leadership object structure exists with fallbacks
          if (!d.leadership) {
            d.leadership = {
              correspondent: {
                name: '',
                designation: 'Correspondent',
                photo: d.leadershipPhoto || '',
                message: '',
                quote: '',
                enabled: true
              },
              principal: {
                name: '',
                designation: 'Principal',
                photo: '',
                message: '',
                quote: '',
                enabled: true
              }
            };
          } else {
            if (!d.leadership.correspondent) {
              d.leadership.correspondent = { name: '', designation: 'Correspondent', photo: d.leadershipPhoto || '', message: '', quote: '', enabled: true };
            }
            if (!d.leadership.principal) {
              d.leadership.principal = { name: '', designation: 'Principal', photo: '', message: '', quote: '', enabled: true };
            }
          }
          setSettings(d);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleProfileChange = (role, key, value) => {
    setSettings(prev => ({
      ...prev,
      leadership: {
        ...prev?.leadership,
        [role]: {
          ...prev?.leadership?.[role],
          [key]: value
        }
      }
    }));
  };

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
        setStatusMsg({ type: 'success', text: 'Leadership profiles updated successfully!' });
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Failed to update leadership profiles.' });
      }
    } catch (err) {
      setSaving(false);
      setStatusMsg({ type: 'error', text: err.message || 'Server error while saving leadership profiles.' });
    }
  };

  if (loading) return <div className="p-8 text-amber-400 font-bold text-sm">Loading Leadership Profiles...</div>;

  const correspondent = settings?.leadership?.correspondent || {};
  const principal = settings?.leadership?.principal || {};

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Leadership Desk Manager | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Leadership Desk Manager</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">
          Manage separate Correspondent and Principal profiles, photos with built-in Crop Editor, biographies, and quotes.
        </p>
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

      {/* Tabs for Correspondent & Principal */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('correspondent')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'correspondent'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Correspondent Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('principal')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'principal'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Principal Profile</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800 text-xs">
        
        {/* CORRESPONDENT SECTION */}
        {activeTab === 'correspondent' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Correspondent Information</span>
              </h3>

              <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                <input
                  type="checkbox"
                  checked={correspondent.enabled ?? true}
                  onChange={(e) => handleProfileChange('correspondent', 'enabled', e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
                <span>Display Correspondent Profile on Website</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Correspondent Full Name</label>
                <input
                  type="text"
                  value={correspondent.name || ''}
                  onChange={(e) => handleProfileChange('correspondent', 'name', e.target.value)}
                  placeholder="e.g. Sri. M. Indrasena Reddy"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Designation Label</label>
                <input
                  type="text"
                  value={correspondent.designation || 'Correspondent'}
                  onChange={(e) => handleProfileChange('correspondent', 'designation', e.target.value)}
                  placeholder="e.g. Founder & Correspondent"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-300">
                Correspondent Profile Photo (Includes Crop Editor)
              </label>
              <MediaUploader
                mode="image"
                category="Faculty"
                label="Upload Correspondent Photo (Crop Enabled)"
                value={correspondent.photo || ''}
                onChange={(url) => handleProfileChange('correspondent', 'photo', url)}
                enableCrop={true}
                aspectRatio={4 / 5}
                theme="dark"
              />
              <p className="text-[11px] text-slate-400">
                Selecting a photo opens the Crop Editor. Crop framing will be stored canonically and rendered identically on Desktop, Tablet, and Mobile.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Highlight Quote (Optional)</label>
              <input
                type="text"
                value={correspondent.quote || ''}
                onChange={(e) => handleProfileChange('correspondent', 'quote', e.target.value)}
                placeholder="e.g. Empowering students through ethical leadership and modern education."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Correspondent Message / Biography</label>
              <textarea
                rows="5"
                value={correspondent.message || ''}
                onChange={(e) => handleProfileChange('correspondent', 'message', e.target.value)}
                placeholder="Write the Correspondent's message to parents and students..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              ></textarea>
            </div>
          </div>
        )}

        {/* PRINCIPAL SECTION */}
        {activeTab === 'principal' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Principal Information</span>
              </h3>

              <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                <input
                  type="checkbox"
                  checked={principal.enabled ?? true}
                  onChange={(e) => handleProfileChange('principal', 'enabled', e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
                <span>Display Principal Profile on Website</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Principal Full Name</label>
                <input
                  type="text"
                  value={principal.name || ''}
                  onChange={(e) => handleProfileChange('principal', 'name', e.target.value)}
                  placeholder="e.g. Smt. K. Anitha, M.A., B.Ed."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Designation Label</label>
                <input
                  type="text"
                  value={principal.designation || 'Principal'}
                  onChange={(e) => handleProfileChange('principal', 'designation', e.target.value)}
                  placeholder="e.g. Principal / Headmistress"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-300">
                Principal Profile Photo (Includes Crop Editor)
              </label>
              <MediaUploader
                mode="image"
                category="Faculty"
                label="Upload Principal Photo (Crop Enabled)"
                value={principal.photo || ''}
                onChange={(url) => handleProfileChange('principal', 'photo', url)}
                enableCrop={true}
                aspectRatio={4 / 5}
                theme="dark"
              />
              <p className="text-[11px] text-slate-400">
                Selecting a photo opens the Crop Editor. Crop framing will be stored canonically and rendered identically on Desktop, Tablet, and Mobile.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Highlight Quote (Optional)</label>
              <input
                type="text"
                value={principal.quote || ''}
                onChange={(e) => handleProfileChange('principal', 'quote', e.target.value)}
                placeholder="e.g. Education is the training of the mind to think and character to lead."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Principal Message / Biography</label>
              <textarea
                rows="5"
                value={principal.message || ''}
                onChange={(e) => handleProfileChange('principal', 'message', e.target.value)}
                placeholder="Write the Principal's message to parents and students..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
              ></textarea>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-2xl font-extrabold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xl flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'SAVING LEADERSHIP PROFILES...' : 'SAVE LEADERSHIP PROFILES'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}

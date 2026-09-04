import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Save, Image, Video, Play } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';
import { useSiteSettings } from '../../context/SiteContext';

export default function HomeContentAdmin() {
  const { refreshSiteSettings } = useSiteSettings();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const [homeData, setHomeData] = useState({
    heroTagline: '',
    heroSubTagline: '',
    heroMediaType: 'IMAGE',
    heroImage: '',
    heroVideoUrl: '',
    heroYouTubeUrl: '',
    aboutSectionHeading: 'Welcome to Adarsha High School',
    aboutText: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.adminGetSettings();
        if (res.success && res.data) {
          const s = res.data;
          setHomeData({
            heroTagline: s.home?.heroTagline || s.tagline || '',
            heroSubTagline: s.home?.heroSubTagline || s.subTagline || '',
            heroMediaType: s.home?.heroMediaType || s.heroMediaType || 'IMAGE',
            heroImage: s.home?.heroImage || s.heroImage || '',
            heroVideoUrl: s.home?.heroVideoUrl || s.heroVideoUrl || '',
            heroYouTubeUrl: s.home?.heroYouTubeUrl || s.heroYouTubeUrl || '',
            aboutSectionHeading: s.home?.aboutSectionHeading || 'Welcome to Adarsha High School',
            aboutText: s.home?.aboutText || ''
          });
        }
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
      const res = await api.adminUpdateHomeSettings({ home: homeData });
      setSaving(false);
      if (res.success) {
        if (res.data?.home) {
          setHomeData({
            heroTagline: res.data.home.heroTagline || '',
            heroSubTagline: res.data.home.heroSubTagline || '',
            heroMediaType: res.data.home.heroMediaType || 'IMAGE',
            heroImage: res.data.home.heroImage || '',
            heroVideoUrl: res.data.home.heroVideoUrl || '',
            heroYouTubeUrl: res.data.home.heroYouTubeUrl || '',
            aboutSectionHeading: res.data.home.aboutSectionHeading || 'Welcome to Adarsha High School',
            aboutText: res.data.home.aboutText || ''
          });
        }
        await refreshSiteSettings();
        setMsg('Homepage Hero settings updated successfully!');
      } else {
        setMsg('Failed to update settings.');
      }
    } catch (err) {
      setSaving(false);
      setMsg('Server error while saving settings.');
    }
  };

  if (loading) return <div className="p-8 text-amber-400 font-bold text-sm">Loading Homepage Settings...</div>;

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Manage Home Content | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Homepage Content Manager</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Control hero section copy, media type toggle (Image / Video / YouTube), and homepage introductory text.</p>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-3xl border border-slate-800">
        
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-widest">
            Hero Media Type Selector
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setHomeData({ ...homeData, heroMediaType: 'IMAGE' })}
              className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-xs transition-all ${
                homeData.heroMediaType === 'IMAGE'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Static Image</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeData({ ...homeData, heroMediaType: 'R2_VIDEO' })}
              className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-xs transition-all ${
                homeData.heroMediaType === 'R2_VIDEO' || homeData.heroMediaType === 'CLOUDINARY_VIDEO'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Direct MP4 Video (R2)</span>
            </button>

            <button
              type="button"
              onClick={() => setHomeData({ ...homeData, heroMediaType: 'YOUTUBE' })}
              className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-xs transition-all ${
                homeData.heroMediaType === 'YOUTUBE'
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>YouTube Video</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Hero Headline / Tagline</label>
            <input
              type="text"
              value={homeData.heroTagline}
              onChange={(e) => setHomeData({ ...homeData, heroTagline: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Hero Subheadline</label>
            <textarea
              rows="2"
              value={homeData.heroSubTagline}
              onChange={(e) => setHomeData({ ...homeData, heroSubTagline: e.target.value })}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
            ></textarea>
          </div>

          <MediaUploader
            mode="image"
            category="Hero"
            label="Hero Background Image"
            value={homeData.heroImage}
            onChange={(url) => setHomeData({ ...homeData, heroImage: url })}
            theme="dark"
          />

          {(homeData.heroMediaType === 'R2_VIDEO' || homeData.heroMediaType === 'CLOUDINARY_VIDEO') && (
            <MediaUploader
              mode="video"
              category="Hero"
              label="Direct MP4 / WebM Hero Video (R2 Storage)"
              value={homeData.heroVideoUrl}
              onChange={(url) => setHomeData({ ...homeData, heroVideoUrl: url })}
              theme="dark"
            />
          )}

          {homeData.heroMediaType === 'YOUTUBE' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">YouTube Embed URL</label>
              <input
                type="text"
                value={homeData.heroYouTubeUrl}
                onChange={(e) => setHomeData({ ...homeData, heroYouTubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">Home Experience Section Copy</h4>
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Experience Heading</label>
              <input
                type="text"
                value={homeData.aboutSectionHeading}
                onChange={(e) => setHomeData({ ...homeData, aboutSectionHeading: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Experience Description / Overview</label>
              <textarea
                rows="3"
                value={homeData.aboutText}
                onChange={(e) => setHomeData({ ...homeData, aboutText: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-2xl font-bold text-xs bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center gap-2 shadow-xl"
        >
          {saving ? <span>Saving Changes...</span> : <><Save className="w-4 h-4" /><span>SAVE HOMEPAGE SETTINGS</span></>}
        </button>

      </form>
    </div>
  );
}

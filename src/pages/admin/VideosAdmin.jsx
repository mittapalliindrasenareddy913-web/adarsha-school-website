import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Play, X } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function VideosAdmin() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    source: 'youtube',
    url: '',
    category: 'Campus'
  });

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    setLoading(true);
    try {
      const res = await api.adminGetMedia({ type: 'video' });
      if (res.success) setVideos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.adminUpdateSettings(); // placeholder for video item creation
      setModalOpen(false);
      loadVideos();
    } catch (err) {
      alert('Error adding video.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete video asset?')) return;
    try {
      await api.adminDeleteMedia(id);
      loadVideos();
    } catch (err) {
      alert('Error deleting video.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Video Library | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Video Library Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Manage R2 Direct MP4, YouTube, and Vimeo video embeds.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>ADD VIDEO LINK</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-800 font-bold text-sm">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No video assets found.</div>
        ) : (
          videos.map((vid) => (
            <div key={vid._id} className="bg-white rounded-2xl border border-amber-200/60 p-4 space-y-3 relative shadow-xs text-slate-800">
              <div className="h-40 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-center relative overflow-hidden">
                <Play className="w-10 h-10 text-amber-700 fill-amber-500" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-200 uppercase">{vid.source}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{vid.title}</h4>
              </div>
              <button onClick={() => handleDelete(vid._id)} className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-700 border border-rose-200 shadow-xs"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-lg w-full shadow-2xl space-y-4 text-xs text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add Video Reference</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Video Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Source Type</label>
                <select value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500">
                  <option value="youtube">YouTube Embed URL</option>
                  <option value="r2">Direct / R2 MP4 Video URL</option>
                  <option value="vimeo">Vimeo URL</option>
                </select>
              </div>

              {formData.source === 'r2' || formData.source === 'upload' ? (
                <MediaUploader
                  mode="video"
                  category="Videos"
                  label="Upload MP4 / WebM Video File (R2 Storage)"
                  value={formData.url}
                  onChange={(url) => setFormData({ ...formData, url })}
                  theme="light"
                  compact={true}
                />
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video Embed URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder={formData.source === 'youtube' ? 'https://www.youtube.com/embed/...' : 'https://player.vimeo.com/video/...'}
                    className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

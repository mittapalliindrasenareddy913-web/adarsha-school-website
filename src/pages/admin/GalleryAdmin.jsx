import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Edit3, Grid, X } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function GalleryAdmin() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
    category: 'Events',
    status: 'published'
  });

  useEffect(() => {
    loadAlbums();
  }, []);

  async function loadAlbums() {
    setLoading(true);
    try {
      const res = await api.adminGetGalleryAlbums();
      if (res.success) setAlbums(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.adminCreateGalleryAlbum(formData);
      setModalOpen(false);
      loadAlbums();
    } catch (err) {
      alert('Error creating album.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete album?')) return;
    try {
      await api.adminDeleteGalleryAlbum(id);
      loadAlbums();
    } catch (err) {
      alert('Error deleting album.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Gallery Albums | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Gallery Albums Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Create photo albums and assign campus event media.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-xs bg-amber-400 text-slate-950 hover:bg-amber-500 shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE ALBUM</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-400 font-bold text-sm">Loading gallery albums...</div>
        ) : albums.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No albums created yet.</div>
        ) : (
          albums.map((album) => (
            <div key={album._id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl space-y-3 p-5 relative">
              <div className="h-44 rounded-2xl overflow-hidden bg-slate-950">
                <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300">{album.category}</span>
                <h4 className="text-base font-bold text-white mt-1">{album.title}</h4>
              </div>
              <button onClick={() => handleDelete(album._id)} className="absolute top-4 right-4 p-2 rounded-xl bg-rose-950 text-rose-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Create New Album</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Album Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Annual Day 2026" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>

              <MediaUploader
                mode="image"
                category="Gallery"
                label="Album Cover Photo *"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                theme="dark"
                compact={true}
              />

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold">Create Album</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

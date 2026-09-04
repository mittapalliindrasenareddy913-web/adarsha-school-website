import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { BookOpen, Edit3, Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function AcademicsAdmin() {
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    grades: '',
    description: '',
    image: '',
    galleryImages: [],
    status: 'published'
  });

  const [addingGalleryPhoto, setAddingGalleryPhoto] = useState(false);

  useEffect(() => {
    loadAcademics();
  }, []);

  async function loadAcademics() {
    setLoading(true);
    try {
      const res = await api.adminGetAcademics();
      if (res.success) setAcademics(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      title: item.title || '',
      grades: item.grades || '',
      description: item.description || '',
      image: item.image || '',
      galleryImages: Array.isArray(item.galleryImages) ? [...item.galleryImages] : [],
      status: item.status || 'published'
    });
    setAddingGalleryPhoto(false);
    setModalOpen(true);
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    setSaving(true);
    try {
      const res = await api.adminUpdateAcademic(selectedItem._id, formData);
      if (res.success) {
        setModalOpen(false);
        loadAcademics();
      } else {
        alert(res.message || 'Failed to save academic program.');
      }
    } catch (err) {
      alert('Error updating academic program level.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Academics Manager | Admin CMS" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Academics Curriculum Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Manage main photos and interactive photo galleries for Primary, Middle, and Secondary education levels.</p>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="p-8 text-center text-amber-400 font-bold text-sm animate-pulse">Loading academic levels...</div>
        ) : (
          academics.map((item) => (
            <div key={item._id} className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">{item.grades}</span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase">{item.status}</span>
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Level & Media</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              {/* Main Photo & Gallery Thumbnails Preview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                <div className="md:col-span-5 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Main Photo</span>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl border border-slate-800" />
                  ) : (
                    <div className="h-36 rounded-xl bg-slate-900 flex flex-col items-center justify-center text-slate-500 text-xs font-medium border border-dashed border-slate-800">
                      <ImageIcon className="w-6 h-6 mb-1 text-slate-600" />
                      <span>No custom main photo uploaded</span>
                      <span className="text-[10px] text-slate-600">(Using default level fallback)</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Photo Gallery ({item.galleryImages?.length || 0} Photos)
                    </span>
                  </div>

                  {item.galleryImages && item.galleryImages.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1">
                      {item.galleryImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative h-16 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 group">
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-28 rounded-xl bg-slate-900 flex flex-col items-center justify-center text-slate-500 text-xs font-medium border border-dashed border-slate-800">
                      <span>No gallery photos added yet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Level & Media Modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Edit Education Level & Media</h3>
                <p className="text-xs text-amber-400 font-bold">{selectedItem.title} ({selectedItem.grades})</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Grades / Level Tag *</label>
                  <input
                    type="text"
                    required
                    value={formData.grades}
                    onChange={(e) => setFormData({ ...formData, grades: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Description *</label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm"
                ></textarea>
              </div>

              {/* Main Photo Uploader */}
              <div className="pt-2">
                <MediaUploader
                  mode="image"
                  category="Classrooms"
                  label="Level Main Display Photo"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  theme="dark"
                  compact={true}
                />
              </div>

              {/* Level Photo Gallery Manager */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Level Photo Gallery ({formData.galleryImages?.length || 0} Photos)
                  </label>
                  <button
                    type="button"
                    onClick={() => setAddingGalleryPhoto(!addingGalleryPhoto)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold hover:bg-amber-400 hover:text-slate-950 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{addingGalleryPhoto ? 'Cancel Add' : 'Add Photo to Gallery'}</span>
                  </button>
                </div>

                {addingGalleryPhoto && (
                  <div className="p-3 bg-slate-900 rounded-xl border border-amber-400/40">
                    <MediaUploader
                      mode="image"
                      category="Classrooms"
                      label="Upload & Attach New Gallery Photo"
                      value=""
                      onChange={(url) => {
                        if (url) {
                          setFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] }));
                          setAddingGalleryPhoto(false);
                        }
                      }}
                      theme="dark"
                      compact={true}
                    />
                  </div>
                )}

                {formData.galleryImages && formData.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {formData.galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                        <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors opacity-90 group-hover:opacity-100 shadow-md"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4 italic">
                    No photos added to this level gallery yet. Click "Add Photo to Gallery" above to upload photos.
                  </p>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving Changes...' : 'Save Academic Level & Gallery'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

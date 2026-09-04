import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Edit3, Building, X } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function FacilitiesAdmin() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageKey: 'smartClassroom',
    image: '',
    status: 'published'
  });

  useEffect(() => {
    loadFacilities();
  }, []);

  async function loadFacilities() {
    setLoading(true);
    try {
      const res = await api.adminGetFacilities();
      if (res.success) setFacilities(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        imageKey: item.imageKey || 'smartClassroom',
        image: item.image || '',
        status: item.status
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        imageKey: 'smartClassroom',
        image: '',
        status: 'published'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.adminUpdateFacility(editingItem._id, formData);
      } else {
        await api.adminCreateFacility(formData);
      }
      setModalOpen(false);
      loadFacilities();
    } catch (err) {
      alert('Error saving facility.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete facility?')) return;
    try {
      await api.adminDeleteFacility(id);
      loadFacilities();
    } catch (err) {
      alert('Error deleting facility.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Facilities Manager | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Facilities & Infrastructure Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Manage smart classrooms, labs, library, playground, transport, security.</p>
        </div>

        <button
          onClick={() => handleOpenModal(null)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-xs bg-amber-400 text-slate-950 hover:bg-amber-500 transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>ADD FACILITY</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-400 font-bold text-sm">Loading facilities...</div>
        ) : facilities.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No facilities found.</div>
        ) : (
          facilities.map((item) => (
            <div key={item._id} className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-3 shadow-lg flex justify-between items-start">
              <div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{item.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleOpenModal(item)} className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">{editingItem ? 'Edit Facility' : 'Add Facility'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Facility Name *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>

              <MediaUploader
                mode="image"
                category="Facilities"
                label="Facility Photo (Optional)"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                theme="dark"
                compact={true}
              />

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description *</label>
                <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold">Save Facility</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

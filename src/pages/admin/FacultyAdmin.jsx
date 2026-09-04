import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Edit3, GraduationCap, X } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function FacultyAdmin() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    designation: '',
    qualification: '',
    subject: '',
    bio: '',
    status: 'published'
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    setLoading(true);
    try {
      const res = await api.adminGetFaculty();
      if (res.success) setFaculty(res.data);
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
        name: item.name,
        photo: item.photo,
        designation: item.designation,
        qualification: item.qualification,
        subject: item.subject,
        bio: item.bio || '',
        status: item.status
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        photo: '',
        designation: '',
        qualification: '',
        subject: '',
        bio: '',
        status: 'published'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.adminUpdateFaculty(editingItem._id, formData);
      } else {
        await api.adminCreateFaculty(formData);
      }
      setModalOpen(false);
      loadFaculty();
    } catch (err) {
      alert('Error saving faculty profile.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete faculty profile?')) return;
    try {
      await api.adminDeleteFaculty(id);
      loadFaculty();
    } catch (err) {
      alert('Error deleting faculty profile.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Faculty Manager | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Faculty Directory Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Add, edit, and publish teacher profiles.</p>
        </div>

        <button
          onClick={() => handleOpenModal(null)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-xs bg-amber-400 text-slate-950 hover:bg-amber-500 transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>ADD FACULTY MEMBER</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-400 font-bold text-sm">Loading faculty...</div>
        ) : faculty.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No faculty profiles found.</div>
        ) : (
          faculty.map((item) => (
            <div key={item._id} className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-3 text-center relative shadow-lg">
              <img src={item.photo} alt={item.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white">{item.name}</h4>
                <span className="text-xs font-bold text-amber-400 block">{item.designation}</span>
                <span className="text-[10px] text-slate-400 block">{item.qualification} • {item.subject}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-center gap-2">
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
              <h3 className="text-sm font-bold text-white">{editingItem ? 'Edit Profile' : 'Add Faculty Member'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>

              <MediaUploader
                mode="image"
                category="Faculty"
                label="Faculty Profile Photo *"
                value={formData.photo}
                onChange={(url) => setFormData({ ...formData, photo: url })}
                theme="dark"
                compact={true}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Designation *</label>
                  <input type="text" required value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Subject *</label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Qualification *</label>
                <input type="text" required value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} placeholder="e.g. M.Sc. Physics, B.Ed." className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

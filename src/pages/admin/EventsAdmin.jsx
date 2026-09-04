import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Edit3, Calendar, MapPin, X } from 'lucide-react';
import MediaUploader from '../../components/MediaUploader';

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Celebration',
    date: new Date().toISOString().split('T')[0],
    time: '9:00 AM – 4:00 PM',
    location: 'School Campus Grounds',
    coverImage: '',
    shortDescription: '',
    description: '',
    status: 'published'
  });

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    try {
      const res = await api.adminGetEvents();
      if (res.success) setEvents(res.data);
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
        category: item.category,
        date: new Date(item.date).toISOString().split('T')[0],
        time: item.time,
        location: item.location,
        coverImage: item.coverImage || '',
        shortDescription: item.shortDescription,
        description: item.description,
        status: item.status
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: 'Celebration',
        date: new Date().toISOString().split('T')[0],
        time: '9:00 AM – 4:00 PM',
        location: 'School Campus Grounds',
        coverImage: '',
        shortDescription: '',
        description: '',
        status: 'published'
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.adminUpdateEvent(editingItem._id, formData);
      } else {
        await api.adminCreateEvent(formData);
      }
      setModalOpen(false);
      loadEvents();
    } catch (err) {
      alert('Error saving event.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.adminDeleteEvent(id);
      loadEvents();
    } catch (err) {
      alert('Error deleting event.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Events Manager | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Events & Functions Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Create, edit, publish, and manage mixed media school events.</p>
        </div>

        <button
          onClick={() => handleOpenModal(null)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE EVENT</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-800 font-bold text-sm">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No events created yet.</div>
        ) : (
          events.map((item) => (
            <div key={item._id} className="bg-white rounded-3xl border border-amber-200/60 overflow-hidden shadow-xs flex flex-col justify-between p-5 space-y-4 text-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded font-bold bg-amber-100 text-amber-950 border border-amber-200">{item.category}</span>
                  <span className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ${item.status === 'published' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>{item.status}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{item.shortDescription}</p>

                <div className="text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-700" /><span>{item.dateFormatted}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-700" /><span>{item.location}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-100 flex justify-end gap-2">
                <button onClick={() => handleOpenModal(item)} className="p-2 rounded-lg bg-amber-50 text-slate-700 border border-amber-200 hover:bg-amber-100"><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Event' : 'Create New Event'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Annual Day 2026"
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Annual Day">Annual Day</option>
                    <option value="Sports Day">Sports Day</option>
                    <option value="Cultural Event">Cultural Event</option>
                    <option value="Science Exhibition">Science Exhibition</option>
                    <option value="Independence Day">Independence Day</option>
                    <option value="Celebration">Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="9:00 AM – 4:00 PM"
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Campus Grounds"
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <MediaUploader
                mode="image"
                category="Events"
                label="Event Cover Image"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                theme="light"
                compact={true}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Preview Summary *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Detailed Description *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

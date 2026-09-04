import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Plus, Trash2, Edit3, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AnnouncementsAdmin() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State for Create/Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Important Notice',
    priority: 'Medium',
    shortDescription: '',
    fullDescription: '',
    status: 'published',
    showPopup: false,
    displayMode: 'Popup',
    startDateTime: '',
    endDateTime: ''
  });

  const toDateTimeLocal = (dateVal) => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '';
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const getDerivedSchedulingStatus = (item) => {
    if (item.status === 'draft') return { label: 'DRAFT', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    const now = new Date();
    if (item.startDateTime && new Date(item.startDateTime) > now) {
      return { label: 'UPCOMING', color: 'bg-sky-100 text-sky-900 border-sky-300' };
    }
    if ((item.endDateTime && new Date(item.endDateTime) <= now) || (item.expiryDate && new Date(item.expiryDate) <= now)) {
      return { label: 'EXPIRED', color: 'bg-slate-100 text-slate-600 border-slate-300' };
    }
    return { label: 'ACTIVE', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    setLoading(true);
    try {
      const res = await api.adminGetAnnouncements();
      if (res.success) {
        setAnnouncements(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenModal = (item = null) => {
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(false);

    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        category: item.category || 'Important Notice',
        priority: item.priority || 'Medium',
        shortDescription: item.shortDescription || '',
        fullDescription: item.fullDescription || '',
        status: item.status || 'published',
        showPopup: item.showPopup || false,
        displayMode: item.displayMode || (item.showPopup ? 'Popup' : 'None'),
        startDateTime: toDateTimeLocal(item.startDateTime),
        endDateTime: toDateTimeLocal(item.endDateTime)
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: 'Important Notice',
        priority: 'Medium',
        shortDescription: '',
        fullDescription: '',
        status: 'published',
        showPopup: true,
        displayMode: 'Popup',
        startDateTime: '',
        endDateTime: ''
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Client-side field validation
    if (!formData.title.trim()) {
      setErrorMsg('Announcement Title is required.');
      return;
    }
    if (!formData.shortDescription.trim()) {
      setErrorMsg('Short Summary is required.');
      return;
    }
    if (!formData.fullDescription.trim()) {
      setErrorMsg('Full Description / Notice Content is required.');
      return;
    }

    if (formData.startDateTime && formData.endDateTime) {
      if (new Date(formData.endDateTime) <= new Date(formData.startDateTime)) {
        setErrorMsg('End date and time must be after the start date and time.');
        return;
      }
    }

    setSubmitting(true);

    try {
      let res;
      if (editingItem) {
        res = await api.adminUpdateAnnouncement(editingItem._id, formData);
      } else {
        res = await api.adminCreateAnnouncement(formData);
      }

      if (res && res.success === false) {
        setErrorMsg(res.message || 'Unable to save announcement. Please try again.');
        setSubmitting(false);
        return;
      }

      // Success notification message
      const isDraft = formData.status === 'draft';
      const msg = editingItem
        ? (isDraft ? 'Announcement saved successfully.' : 'Announcement published successfully.')
        : (isDraft ? 'Announcement saved successfully.' : 'Announcement published successfully.');

      setSuccessMsg(msg);

      // Instantly refresh list in background
      await loadAnnouncements();

      // Automatically close modal after brief delay so admin sees success notification
      setTimeout(() => {
        setModalOpen(false);
        setSubmitting(false);
        setSuccessMsg('');
      }, 1200);

    } catch (err) {
      setSubmitting(false);
      setErrorMsg(err.message || 'Unable to save announcement. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement notice?')) return;
    try {
      await api.adminDeleteAnnouncement(id);
      loadAnnouncements();
    } catch (err) {
      alert('Error deleting announcement.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Announcements Manager | Admin CMS" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Announcements Manager</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">Create, edit, publish, and toggle popups for school notices.</p>
        </div>

        <button
          onClick={() => handleOpenModal(null)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE ANNOUNCEMENT</span>
        </button>
      </div>

      {/* Announcements Table */}
      <div className="bg-white rounded-3xl border border-amber-200/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800 min-w-[700px]">
            <thead className="bg-amber-50/70 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-amber-200/60">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Homepage Display</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-amber-800 italic">
                    Loading announcements...
                  </td>
                </tr>
              ) : announcements.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500 italic">
                    No announcements created yet.
                  </td>
                </tr>
              ) : (
                announcements.map((item) => (
                  <tr key={item._id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 font-bold text-slate-900 max-w-xs truncate">{item.title}</td>
                    <td className="p-4"><span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-200 font-semibold">{item.category}</span></td>
                    <td className="p-4"><span className={`px-2.5 py-0.5 rounded font-bold ${item.priority === 'High' ? 'bg-rose-100 text-rose-900 border border-rose-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>{item.priority}</span></td>
                    <td className="p-4 text-slate-600">{item.dateFormatted}</td>
                    <td className="p-4">
                      {(() => {
                        const sched = getDerivedSchedulingStatus(item);
                        return (
                          <span className={`px-2.5 py-0.5 rounded font-extrabold text-[10px] border uppercase ${sched.color}`}>
                            {sched.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        (item.displayMode || (item.showPopup ? 'Popup' : 'None')) === 'None'
                          ? 'bg-slate-100 text-slate-500'
                          : 'bg-amber-100 text-amber-950 border border-amber-300'
                      }`}>
                        {item.displayMode || (item.showPopup ? 'Popup' : 'None')}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleOpenModal(item)} className="p-2 rounded-lg bg-amber-50 text-slate-700 border border-amber-200 hover:bg-amber-100"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingItem ? 'Edit Announcement Notice' : 'Create New Announcement'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  disabled={submitting}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Admissions Open 2026–2027"
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    disabled={submitting}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Important Notice">Important Notice</option>
                    <option value="Exam Schedule">Exam Schedule</option>
                    <option value="Holiday Notice">Holiday Notice</option>
                    <option value="Annual Day">Annual Day</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    disabled={submitting}
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* SCHEDULED START & END DATE-TIME CONTROLS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Start Date & Time (Asia/Kolkata)</label>
                  <input
                    type="datetime-local"
                    disabled={submitting}
                    value={formData.startDateTime || ''}
                    onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium disabled:opacity-60"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Leave empty for immediate activation.</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">End Date & Time (Asia/Kolkata)</label>
                  <input
                    type="datetime-local"
                    disabled={submitting}
                    value={formData.endDateTime || ''}
                    onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-slate-900 font-medium disabled:opacity-60"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Leave empty for no automatic expiration.</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary *</label>
                <textarea
                  required
                  rows="2"
                  disabled={submitting}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-2 sentence preview..."
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Description / Notice Content *</label>
                <textarea
                  required
                  rows="4"
                  disabled={submitting}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Full circular text..."
                  className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publish Status</label>
                  <select
                    disabled={submitting}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 disabled:opacity-60"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Homepage Display Mode</label>
                  <select
                    disabled={submitting}
                    value={formData.displayMode}
                    onChange={(e) => {
                      const mode = e.target.value;
                      const popup = mode === 'Popup' || mode === 'Both';
                      setFormData({ ...formData, displayMode: mode, showPopup: popup });
                    }}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl text-slate-900 focus:outline-none focus:border-amber-500 font-bold disabled:opacity-60"
                  >
                    <option value="None">None (Notice Board Only)</option>
                    <option value="Popup">Popup Only</option>
                    <option value="Scrolling Bar">Scrolling Ticker Only</option>
                    <option value="Both">Both (Popup & Ticker)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      <span>SAVING...</span>
                    </>
                  ) : (
                    <span>{editingItem ? 'UPDATE ANNOUNCEMENT' : 'SEND ANNOUNCEMENT'}</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

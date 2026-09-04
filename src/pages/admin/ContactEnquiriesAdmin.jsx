import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Search, Trash2, Eye, X } from 'lucide-react';

export default function ContactEnquiriesAdmin() {
  const context = useOutletContext();
  const refreshUnread = context?.refreshUnread;

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');
  const [search, setSearch] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, readFilter, search]);

  async function loadEnquiries() {
    setLoading(true);
    try {
      const res = await api.adminGetContactEnquiries({
        status: statusFilter,
        readState: readFilter === 'Unread Only' ? 'unread' : readFilter === 'Read Only' ? 'read' : 'All',
        search
      });
      if (res.success) setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleViewDetail = async (item) => {
    setSelectedItem(item);
    if (!item.isRead) {
      try {
        await api.adminMarkContactRead(item._id);
        if (refreshUnread) refreshUnread();
        loadEnquiries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.adminUpdateContactStatus(id, { status: newStatus, isRead: true });
      if (refreshUnread) refreshUnread();
      loadEnquiries();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await api.adminDeleteContactEnquiry(id);
      if (refreshUnread) refreshUnread();
      loadEnquiries();
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Contact Submissions | Admin CMS" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Contact Submissions</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">View and respond to general contact form submissions.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200/60 shadow-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or ticket ID..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-amber-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Read:</span>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50/70 border border-amber-200 text-slate-800"
            >
              <option value="All">All</option>
              <option value="Unread Only">Unread Only</option>
              <option value="Read Only">Read Only</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'New', 'Read', 'Replied', 'Archived'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  statusFilter === st ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-amber-50/60 text-slate-700 border border-amber-200/70 hover:bg-amber-100/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-amber-200/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800 min-w-[650px]">
            <thead className="bg-amber-50/70 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-amber-200/60">
              <tr>
                <th className="p-4">Ticket</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 font-medium">
              {loading ? (
                <tr><td colSpan="7" className="p-8 text-center text-amber-800 italic">Loading messages...</td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan="7" className="p-8 text-center text-slate-500 italic">No contact submissions found.</td></tr>
              ) : (
                enquiries.map((item) => (
                  <tr key={item._id} className={`hover:bg-amber-50/40 transition-colors ${!item.isRead ? 'bg-rose-50/20 font-bold' : ''}`}>
                    <td className="p-4 font-mono font-bold text-amber-900 flex items-center gap-2">
                      {!item.isRead && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" title="Unread Message" />
                      )}
                      <span>{item.ticketId}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{item.name}</td>
                    <td className="p-4 text-slate-700">{item.phone}</td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">{item.subject || 'General Inquiry'}</td>
                    <td className="p-4 text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className="px-2.5 py-1 rounded text-xs font-bold bg-white text-slate-800 border border-amber-200"
                      >
                        <option value="New">New</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleViewDetail(item)} className="p-2 rounded-lg bg-amber-50 text-slate-700 border border-amber-200 hover:bg-amber-100" title="View Message"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100" title="Delete Message"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-lg w-full shadow-2xl space-y-4 text-xs text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Ticket: {selectedItem.ticketId}</h3>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-2 text-slate-700">
              <p><strong className="text-slate-900">Name:</strong> {selectedItem.name}</p>
              <p><strong className="text-slate-900">Phone:</strong> {selectedItem.phone}</p>
              <p><strong className="text-slate-900">Email:</strong> {selectedItem.email || 'N/A'}</p>
              <p><strong className="text-slate-900">Subject:</strong> {selectedItem.subject || 'N/A'}</p>
              <div className="pt-2 border-t border-amber-100">
                <strong className="text-slate-900 block mb-1">Message:</strong>
                <p className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 italic text-slate-800">{selectedItem.message}</p>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button onClick={() => setSelectedItem(null)} className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

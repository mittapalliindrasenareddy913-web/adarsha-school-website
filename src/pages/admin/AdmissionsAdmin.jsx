import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Search, Trash2, Eye, X, Filter } from 'lucide-react';

export default function AdmissionsAdmin() {
  const context = useOutletContext();
  const refreshUnread = context?.refreshUnread;

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');
  const [search, setSearch] = useState('');

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, yearFilter, readFilter, search]);

  async function loadEnquiries() {
    setLoading(true);
    try {
      const res = await api.adminGetAdmissionEnquiries({
        status: statusFilter,
        academicYear: yearFilter,
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
    setSelectedEnquiry(item);
    if (!item.isRead) {
      try {
        await api.adminMarkAdmissionRead(item._id);
        if (refreshUnread) refreshUnread();
        loadEnquiries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.adminUpdateAdmissionStatus(id, { status: newStatus, isRead: true });
      if (refreshUnread) refreshUnread();
      loadEnquiries();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this admission enquiry?')) return;
    try {
      await api.adminDeleteAdmissionEnquiry(id);
      if (refreshUnread) refreshUnread();
      loadEnquiries();
    } catch (err) {
      alert('Failed to delete enquiry.');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Admission Enquiries | Admin CMS" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Admission Enquiries</h1>
          <p className="text-xs font-semibold text-[#6e5d5c]">View, track, and update status for admission inquiry submissions.</p>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200/60 shadow-xs">
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by parent, student, phone..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-amber-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Academic Year Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Session:</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50/70 border border-amber-200 text-slate-800"
            >
              <option value="All">All Years</option>
              <option value="2026–27">2026–27</option>
              <option value="2027–28">2027–28</option>
              <option value="2028–29">2028–29</option>
            </select>
          </div>

          {/* Read/Unread Filter */}
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

          {/* Status Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Closed'].map((st) => (
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

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-amber-200/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-800 min-w-[700px]">
            <thead className="bg-amber-50/70 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-amber-200/60">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Parent Name</th>
                <th className="p-4">Student</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Target Class</th>
                <th className="p-4">Session Year</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-amber-800 italic">
                    Loading admission enquiries from MongoDB...
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500 italic">
                    No admission enquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                enquiries.map((item) => (
                  <tr key={item._id} className={`hover:bg-amber-50/40 transition-colors ${!item.isRead ? 'bg-rose-50/20 font-bold' : ''}`}>
                    <td className="p-4 font-mono font-bold text-amber-900 flex items-center gap-2">
                      {!item.isRead && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse shrink-0" title="Unread Enquiry" />
                      )}
                      <span>{item.referenceId}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{item.parentName}</td>
                    <td className="p-4 text-slate-700">{item.studentName}</td>
                    <td className="p-4 text-slate-700">{item.phone}</td>
                    <td className="p-4 text-slate-600">{item.targetClass}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-block">
                        {item.academicYear || '2026–27'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`px-2.5 py-1 rounded text-xs font-bold border ${
                          item.status === 'New'
                            ? 'bg-amber-100 text-amber-950 border-amber-300'
                            : item.status === 'Contacted'
                            ? 'bg-sky-100 text-sky-900 border-sky-200'
                            : item.status === 'Converted'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleViewDetail(item)} className="p-2 rounded-lg bg-amber-50 text-slate-700 border border-amber-200 hover:bg-amber-100" title="View Enquiry Details"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100" title="Delete Record"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-amber-200 rounded-3xl p-4 sm:p-6 lg:p-8 max-w-lg w-full shadow-2xl space-y-4 text-xs text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3 gap-2">
              <h3 className="text-sm font-bold text-slate-900 flex flex-wrap items-center gap-2 min-w-0">
                <span className="truncate">Enquiry Detail: {selectedEnquiry.referenceId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 font-bold border border-amber-300 shrink-0">{selectedEnquiry.academicYear || '2026–27'}</span>
              </h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-slate-700 shrink-0"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3 text-slate-700">
              <p><strong className="text-slate-900">Parent Name:</strong> {selectedEnquiry.parentName}</p>
              <p><strong className="text-slate-900">Student Name:</strong> {selectedEnquiry.studentName}</p>
              <p><strong className="text-slate-900">Phone:</strong> {selectedEnquiry.phone}</p>
              <p><strong className="text-slate-900">Email:</strong> {selectedEnquiry.email || 'N/A'}</p>
              <p><strong className="text-slate-900">Target Grade:</strong> {selectedEnquiry.targetClass}</p>
              <p><strong className="text-slate-900">Submission Date:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
              <div className="pt-2 border-t border-amber-100">
                <strong className="text-slate-900 block mb-1">Message / Notes:</strong>
                <p className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 italic text-slate-800">{selectedEnquiry.message || 'No additional message provided.'}</p>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button onClick={() => setSelectedEnquiry(null)} className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

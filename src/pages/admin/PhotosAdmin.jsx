import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SEO from '../../components/SEO';
import { Upload, Trash2, Image } from 'lucide-react';

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Campus');

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    setLoading(true);
    try {
      const res = await api.adminGetMedia({ type: 'image' });
      if (res.success) setPhotos(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      if (!title) setTitle(file.name.split('.')[0]);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);
      formData.append('caption', caption);
      formData.append('category', category);

      const res = await api.adminUploadMedia(formData);
      setUploading(false);

      if (res.success) {
        setSelectedFile(null);
        setPreviewUrl(null);
        setTitle('');
        setCaption('');
        loadPhotos();
      } else {
        alert(res.message || 'Upload failed.');
      }
    } catch (err) {
      setUploading(false);
      alert('Upload failed. Server error.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete photo? This will remove MongoDB metadata and media storage asset.')) return;
    try {
      await api.adminDeleteMedia(id);
      loadPhotos();
    } catch (err) {
      alert('Error deleting photo asset.');
    }
  };

  const categories = ['All', 'Campus', 'Classrooms', 'Laboratories', 'Library', 'Sports', 'Events', 'Activities'];
  const filteredPhotos = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-8 font-sans">
      <SEO title="Photo Library | Admin CMS" />

      <div>
        <h1 className="text-2xl font-extrabold text-[#4a3e3d] tracking-tight">Photo Library & Media Manager</h1>
        <p className="text-xs font-semibold text-[#6e5d5c]">Upload, categorize, and manage school photos stored securely in Cloudflare R2.</p>
      </div>

      {/* Media Upload Section */}
      <div className="bg-white p-6 rounded-3xl border border-amber-200/60 shadow-xs space-y-4 text-slate-800">
        <h3 className="text-xs font-bold text-amber-900 uppercase tracking-widest flex items-center gap-2">
          <Upload className="w-4 h-4 text-amber-700" />
          <span>Upload Image Asset</span>
        </h3>

        <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 text-center cursor-pointer relative bg-amber-50/40">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-32 mx-auto object-cover rounded-xl" />
            ) : (
              <div className="space-y-1 py-4">
                <Image className="w-8 h-8 text-amber-700 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Click or Drag Image Here</p>
                <p className="text-[10px] text-slate-500">JPG, PNG, WEBP (Max 50MB)</p>
              </div>
            )}
          </div>

          <div className="md:col-span-8 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Science Lab Session"
                  className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-slate-900"
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Caption / Description</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Optional caption..."
                className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all disabled:opacity-50 shadow-xs"
            >
              {uploading ? 'Uploading to R2 Storage...' : 'UPLOAD IMAGE NOW'}
            </button>
          </div>

        </form>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === cat ? 'bg-amber-500 text-slate-950 shadow-xs' : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-amber-800 font-bold text-sm">Loading media assets...</div>
        ) : filteredPhotos.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-500 italic">No photos found.</div>
        ) : (
          filteredPhotos.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-amber-200/60 overflow-hidden shadow-xs group relative text-slate-800">
              <div className="h-44 overflow-hidden bg-amber-50/50">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>

              <div className="p-4 space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-200">{item.category}</span>
                <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                {item.caption && <p className="text-[10px] text-slate-600 truncate">{item.caption}</p>}
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-700 hover:bg-rose-50 border border-rose-200 shadow-sm"
                title="Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

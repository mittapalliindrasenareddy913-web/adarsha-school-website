import React, { useState, useRef } from 'react';
import { Upload, Image, Video, FileText, Loader2, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function MediaUploader({
  value,
  onChange,
  mode = 'image',
  category = 'General',
  label = '',
  theme = 'dark',
  compact = false
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const isDark = theme === 'dark';

  const allowedTypes = mode === 'video' 
    ? ['video/mp4', 'video/webm']
    : mode === 'document'
      ? ['application/pdf']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  const acceptAttribute = mode === 'video'
    ? 'video/mp4,video/webm'
    : mode === 'document'
      ? 'application/pdf'
      : 'image/jpeg,image/png,image/webp,image/gif';

  const defaultLabel = label || (mode === 'video' ? 'Upload Video' : mode === 'document' ? 'Upload Document' : 'Upload Photo');

  const handleFile = async (file) => {
    if (!file) return;

    const rawType = (file.type || file.mimetype || '').toLowerCase();
    const isTypeValid = allowedTypes.some(t => t.toLowerCase() === rawType || rawType.includes(t.split('/')[1]));

    if (!isTypeValid && rawType) {
      setErrorMsg(`Invalid file format (${rawType}). Allowed: ${mode === 'video' ? 'MP4, WebM' : mode === 'document' ? 'PDF' : 'JPG, PNG, WEBP, GIF'}`);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('File size exceeds maximum limit of 50MB.');
      return;
    }

    setErrorMsg('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      formData.append('category', category);

      const res = await api.adminUploadMedia(formData);

      if (res.success && res.data?.url) {
        onChange(res.data.url, res.data);
      } else {
        setErrorMsg(res.message || 'Upload failed.');
      }
    } catch (err) {
      console.error('MediaUploader Error:', err);
      setErrorMsg(err.message || 'Error uploading file to storage server.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg('');
    onChange('', null);
  };

  return (
    <div className="space-y-2 text-xs">
      {defaultLabel && (
        <label className={`block font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {defaultLabel}
        </label>
      )}

      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
          <button type="button" onClick={() => setErrorMsg('')} className="text-rose-400 hover:text-rose-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptAttribute}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />

      {/* Live Preview State */}
      {value ? (
        <div className={`relative rounded-2xl border overflow-hidden p-3 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-amber-50/50 border-amber-200'
        }`}>
          {mode === 'video' ? (
            <div className="space-y-2">
              <video
                src={value}
                controls
                className="w-full max-h-48 rounded-xl bg-black object-contain mx-auto"
              />
              <p className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{value}</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-amber-400/30 flex items-center justify-center">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0 space-y-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span className="truncate">R2 Storage Ready</span>
                </span>
                <p className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{value}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-slate-800/40">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 transition-all ${
                isDark
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${uploading ? 'animate-spin' : ''}`} />
              <span>Replace</span>
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-xl font-bold text-[11px] inline-flex items-center gap-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone State */
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            compact ? 'p-4' : 'p-6'
          } text-center relative ${
            dragActive
              ? isDark ? 'border-amber-400 bg-amber-400/10' : 'border-amber-500 bg-amber-100'
              : isDark ? 'border-slate-800 hover:border-amber-400/60 bg-slate-950/60' : 'border-amber-300 hover:border-amber-500 bg-amber-50/40'
          }`}
        >
          {uploading ? (
            <div className="py-4 space-y-2 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>Uploading to Media Storage...</p>
              <p className="text-[10px] text-slate-400">Processing file & syncing metadata</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${
                isDark ? 'bg-amber-400/10 text-amber-400' : 'bg-amber-100 text-amber-700'
              }`}>
                {mode === 'video' ? <Video className="w-5 h-5" /> : mode === 'document' ? <FileText className="w-5 h-5" /> : <Image className="w-5 h-5" />}
              </div>
              <div>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Click or Drag {mode === 'video' ? 'Video' : mode === 'document' ? 'PDF Document' : 'Photo'} Here
                </p>
                <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {mode === 'video' ? 'MP4, WebM (Max 50MB)' : mode === 'document' ? 'PDF (Max 50MB)' : 'JPG, PNG, WEBP, GIF (Max 50MB)'}
                </p>
              </div>
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-[11px] mt-1 ${
                  isDark ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                } shadow-xs`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Choose {mode === 'video' ? 'Video File' : 'Photo File'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

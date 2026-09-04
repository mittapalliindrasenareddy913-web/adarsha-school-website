import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Move } from 'lucide-react';

/**
 * Interactive Image Crop Editor Modal
 * - Maintains fixed target aspect ratio (default 4:5 for leadership cards).
 * - Provides zoom & pan controls.
 * - Generates high-quality canonical cropped output file.
 */
export default function ImageCropModal({
  imageFile,
  aspectRatio = 4 / 5, // Width / Height (0.8)
  onCropComplete,
  onCancel
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Convert File to object URL
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImageSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Handle image load to measure dimensions
  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageSize({ width: naturalWidth, height: naturalHeight });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Drag / Pan handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Crop calculation & export to Blob
  const handleSaveCrop = () => {
    if (!imgRef.current || !containerRef.current) return;

    const img = imgRef.current;
    const container = containerRef.current;
    const cropBox = container.querySelector('.crop-box-viewport');

    if (!cropBox) return;

    const cropRect = cropBox.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Calculate crop coordinates relative to the original image dimensions
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;

    const cropX = Math.max(0, (cropRect.left - imgRect.left) * scaleX);
    const cropY = Math.max(0, (cropRect.top - imgRect.top) * scaleY);
    const cropWidth = Math.min(img.naturalWidth - cropX, cropRect.width * scaleX);
    const cropHeight = Math.min(img.naturalHeight - cropY, cropRect.height * scaleY);

    // Target output dimensions (e.g. 800 x 1000 for 4:5 ratio)
    const targetWidth = 800;
    const targetHeight = Math.round(targetWidth / aspectRatio);

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    // Draw high quality cropped output
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      img,
      cropX, cropY, cropWidth, cropHeight,
      0, 0, targetWidth, targetHeight
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], `cropped_${imageFile.name || 'leadership.jpg'}`, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        onCropComplete(croppedFile);
      }
    }, 'image/jpeg', 0.92);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 text-white shadow-2xl space-y-5 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-amber-400">Position & Crop Leadership Photo</h3>
            <p className="text-[11px] text-slate-400 font-semibold">
              Adjust framing. This crop will be used identically across Desktop, Tablet & Mobile.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Viewport Area */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[360px] bg-slate-950 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center border border-slate-800 select-none"
        >
          {/* Base Image */}
          {imageSrc && (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
              className="pointer-events-none"
            />
          )}

          {/* Dark Overlay with Transparent Crop Window (4:5 Aspect Ratio) */}
          <div className="absolute inset-0 pointer-events-none bg-slate-950/60 flex items-center justify-center">
            <div
              className="crop-box-viewport relative border-2 border-amber-400 shadow-[0_0_0_9999px_rgba(15,23,42,0.65)] rounded-lg overflow-hidden"
              style={{
                width: '240px',
                height: `${240 / aspectRatio}px` // 240 / (4/5) = 300px
              }}
            >
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                <div className="border-r border-b border-white/50" />
                <div className="border-r border-b border-white/50" />
                <div className="border-b border-white/50" />
                <div className="border-r border-b border-white/50" />
                <div className="border-r border-b border-white/50" />
                <div className="border-b border-white/50" />
                <div className="border-r border-white/50" />
                <div className="border-r border-white/50" />
                <div />
              </div>
            </div>
          </div>

          <div className="absolute top-3 left-3 bg-slate-900/80 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <Move className="w-3 h-3" />
            <span>Drag image to pan • Use slider to zoom</span>
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 flex-1">
            <ZoomOut className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0.8"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <ZoomIn className="w-4 h-4 text-slate-400" />
          </div>

          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800 text-xs font-bold flex items-center gap-1.5"
            title="Reset position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveCrop}
            className="px-6 py-2.5 rounded-xl font-extrabold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg flex items-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>CONFIRM & UPLOAD CROP</span>
          </button>
        </div>

      </div>
    </div>
  );
}

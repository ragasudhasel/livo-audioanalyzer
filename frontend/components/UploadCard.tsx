"use client";
import { useState, useRef } from "react";

export default function UploadCard({ onUpload }: { onUpload: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [consent, setConsent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!consent) {
      alert("Please agree to the DPDP Privacy Consent before uploading.");
      return;
    }
    onUpload(file);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div 
        className={`w-full max-w-lg p-10 border-2 border-dashed rounded-3xl text-center transition-all cursor-pointer flex flex-col items-center gap-4
          ${dragActive ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept="audio/*" 
          className="hidden" 
          onChange={handleChange}
        />
        <div className="p-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full text-white shadow-lg shadow-emerald-500/20">
           {/* Upload Icon Placeholder */}
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        </div>
        <div>
          <p className="text-xl font-medium text-white mb-1">Click to upload or drag and drop</p>
          <p className="text-sm text-slate-400">MP3, WAV, M4A, AAC (30 seconds – 2 minutes)</p>
        </div>
      </div>

      <div className="flex items-start gap-3 text-sm text-slate-300 max-w-lg">
        <input 
          type="checkbox" 
          id="consent" 
          className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="consent" className="leading-tight">
          I consent to the processing of my voice data for pronunciation assessment. I understand that my audio is processed transiently and deleted immediately after analysis, in compliance with DPDP standards.
        </label>
      </div>
    </div>
  );
}

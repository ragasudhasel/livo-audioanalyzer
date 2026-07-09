"use client";

import { useState } from "react";
import Link from "next/link";
import UploadCard from "../../components/UploadCard";
import ProgressTracker from "../../components/ProgressTracker";
import ScoreCard from "../../components/ScoreCard";
import TranscriptViewer from "../../components/TranscriptViewer";
import FeedbackPanel from "../../components/FeedbackPanel";
import MetricsCard from "../../components/MetricsCard";
import UploadSummary from "../../components/UploadSummary";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (audioFile: File) => {
    setFile(audioFile);
    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Nav */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            PronounceAI
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-800/80 rounded-full flex items-center justify-center text-sm font-medium text-slate-300 border border-slate-700/50">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 pb-20 flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col gap-8 flex-1">
          
          {/* Error State */}
          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-center max-w-4xl mx-auto w-full animate-in fade-in">
              {error}
            </div>
          )}

          {/* Upload & Processing State */}
          {!result && (
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto w-full mt-8 animate-in slide-in-from-bottom-4 duration-500">
              {!uploading ? (
                <UploadCard onUpload={handleUpload} />
              ) : (
                <ProgressTracker />
              )}
            </div>
          )}

          {/* Results UI */}
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold tracking-tight">Analysis Results</h2>
                <button 
                    onClick={() => { setResult(null); setFile(null); }}
                    className="text-sm px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-white/10 rounded-full font-medium transition-colors text-white shadow-sm"
                >
                  Analyze Another Audio
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-1 space-y-6 flex flex-col">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2">
                       <ScoreCard title="Overall Score" score={result.overall_score} highlight />
                     </div>
                     <ScoreCard title="Pronunciation" score={result.pronunciation} />
                     <ScoreCard title="Clarity" score={result.clarity} />
                     <ScoreCard title="Fluency" score={result.fluency} />
                   </div>
                   <UploadSummary metadata={result.metadata} filename={file?.name} />
                   
                   {/* Score Calculation Info */}
                   <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mt-6">
                     <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                       <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       How Score Is Calculated
                     </h3>
                     <ul className="text-xs text-slate-400 space-y-2 mb-4">
                       <li className="flex justify-between"><span>Recognition Confidence</span> <span>(40%)</span></li>
                       <li className="flex justify-between"><span>Speech Rate</span> <span>(20%)</span></li>
                       <li className="flex justify-between"><span>Pause Analysis</span> <span>(15%)</span></li>
                       <li className="flex justify-between"><span>Long Pause Detection</span> <span>(10%)</span></li>
                       <li className="flex justify-between"><span>Fillers</span> <span>(10%)</span></li>
                       <li className="flex justify-between"><span>Transcript Quality</span> <span>(5%)</span></li>
                     </ul>
                     <p className="text-[10px] text-slate-500 leading-tight">
                       This score is intended as an educational indicator rather than a clinical pronunciation assessment.
                     </p>
                   </div>
                </div>
                
                {/* Right Column */}
                <div className="md:col-span-2 space-y-6 flex flex-col">
                  <MetricsCard metrics={result.metrics} />
                  <TranscriptViewer transcript={result.transcript} mistakes={result.mistakes} />
                  <FeedbackPanel feedback={result.feedback} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-slate-600 text-sm">
        PronounceAI MVP. Built using Next.js, FastAPI, faster-whisper, Gemini Flash.
      </footer>
    </div>
  );
}

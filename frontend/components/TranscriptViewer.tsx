export default function TranscriptViewer({ transcript, mistakes }: { transcript: string, mistakes: any[] }) {
  // If mistakes data is available, highlight words
  const renderWords = () => {
    if (!mistakes || mistakes.length === 0) {
      return <span>{transcript}</span>;
    }
    
    return mistakes.map((m, idx) => {
      const confPercent = (m.confidence * 100).toFixed(0);
      
      if (m.status === "normal") {
        return (
          <span key={idx} className="mx-0.5 text-slate-300">
            {m.word}
          </span>
        );
      } else if (m.status === "warning") {
        return (
          <span key={idx} className="relative group mx-0.5 text-amber-400 underline decoration-amber-500/50 decoration-wavy underline-offset-4 cursor-help">
            {m.word}
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
              Needs Attention ({confPercent}%)
            </span>
          </span>
        );
      } else {
        return (
          <span key={idx} className="relative group mx-0.5 text-rose-400 underline decoration-rose-500/50 decoration-wavy underline-offset-4 cursor-help">
            {m.word}
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
              Review ({confPercent}%)
            </span>
          </span>
        );
      }
    });
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Transcript Analysis
      </h3>
      <div className="flex-1 bg-slate-950/50 rounded-2xl p-6 border border-slate-800/50 overflow-y-auto leading-loose text-lg">
        {renderWords()}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span> Normal (≥85%)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span> Needs Attention (70–84%)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400"></span> Review (&lt;70%)
        </div>
      </div>
    </div>
  );
}

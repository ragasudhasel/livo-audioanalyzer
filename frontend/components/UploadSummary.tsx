export default function UploadSummary({ metadata, filename }: { metadata: any, filename?: string }) {
  if (!metadata) return null;

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Upload Summary
      </h3>
      <div className="space-y-3">
        {filename && (
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-sm text-slate-500">File</span>
            <span className="text-sm text-white font-medium truncate max-w-[150px]" title={filename}>{filename}</span>
          </div>
        )}
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <span className="text-sm text-slate-500">Duration</span>
          <span className="text-sm text-white font-medium">{metadata.duration_seconds.toFixed(1)}s</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <span className="text-sm text-slate-500">Language</span>
          <span className="text-sm text-white font-medium uppercase">{metadata.language}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Processing Time</span>
          <span className="text-sm text-white font-medium">{(metadata.processing_time_ms / 1000).toFixed(2)}s</span>
        </div>
      </div>
    </div>
  );
}

export default function MetricsCard({ metrics }: { metrics: any }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        Detailed Metrics
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
          <div className="text-sm text-slate-500 mb-1">Recognition Confidence</div>
          <div className="text-2xl font-bold text-white">{(metrics.average_confidence).toFixed(0)}%</div>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
          <div className="text-sm text-slate-500 mb-1">Speech Rate</div>
          <div className="text-2xl font-bold text-white">{Number(metrics.speech_rate_wpm).toFixed(0)} <span className="text-sm font-normal text-slate-500">WPM</span></div>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
          <div className="text-sm text-slate-500 mb-1">Pauses</div>
          <div className="text-2xl font-bold text-white">{metrics.pause_count}</div>
        </div>
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
          <div className="text-sm text-slate-500 mb-1">Long Pauses</div>
          <div className="text-2xl font-bold text-white">{metrics.long_pauses}</div>
        </div>
      </div>
    </div>
  );
}

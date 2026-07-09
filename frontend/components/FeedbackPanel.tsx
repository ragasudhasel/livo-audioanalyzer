export default function FeedbackPanel({ feedback }: { feedback: any }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        AI Coach
      </h3>
      <div className="prose prose-invert max-w-none text-slate-300">
        <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
      </div>
    </div>
  );
}

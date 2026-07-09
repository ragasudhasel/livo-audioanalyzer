export default function ScoreCard({ title, score, highlight = false }: { title: string, score: number, highlight?: boolean }) {
  // Determine color based on score
  let colorClass = "text-emerald-400"; // 90-100
  if (score < 60) colorClass = "text-rose-400";
  else if (score < 75) colorClass = "text-amber-400"; // 60-74
  else if (score < 90) colorClass = "text-blue-400"; // 75-89

  // For the main highlighted score, use a rich gradient
  const textStyle = highlight 
    ? "bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent" 
    : colorClass;

  return (
    <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center text-center transition-all hover:scale-105 backdrop-blur-xl
      ${highlight 
        ? 'bg-slate-900/60 border-white/10 shadow-xl' 
        : 'bg-slate-900/40 border-white/5'}`}
    >
      <h3 className="text-slate-400 font-medium mb-2">{title}</h3>
      <div className={`text-6xl font-bold ${textStyle}`}>
        {score}
      </div>
      <div className="text-sm text-slate-500 mt-2">/ 100</div>
    </div>
  );
}

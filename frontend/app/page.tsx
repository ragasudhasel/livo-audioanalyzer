import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-blue-500/30">
      {/* Top Nav */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            PronounceAI
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          </nav>
          <Link href="/dashboard" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-32 px-6 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6">
            AI-powered English <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Pronunciation Assessment
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            Upload a 30–45 second English recording and receive instant pronunciation scoring with actionable, word-level feedback.
          </p>
          <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:-translate-y-1">
            Get Started Free
          </Link>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-slate-900/30 border-y border-slate-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why PronounceAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🎤</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Speech Analysis</h3>
                <p className="text-slate-400 leading-relaxed">
                  Highly accurate English speech transcription using advanced AI models.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Pronunciation Scoring</h3>
                <p className="text-slate-400 leading-relaxed">
                  Get scored on Overall Pronunciation, Clarity, and Fluency automatically.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Word-level Feedback</h3>
                <p className="text-slate-400 leading-relaxed">
                  Identify specific unclear words and get actionable practice suggestions.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                <p className="text-slate-400 leading-relaxed">
                  Temporary processing with automatic deletion. DPDP compliant by design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
            
            <Step number="1" title="Upload Audio" />
            <Step number="2" title="Speech Recognition" />
            <Step number="3" title="Metrics Extraction" />
            <Step number="4" title="Pronunciation Scoring" />
            <Step number="5" title="AI Coach Feedback" />
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Commitment to Privacy
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Your audio is processed securely for pronunciation analysis. Files are stored only temporarily during processing and automatically deleted after analysis in accordance with the application's DPDP-compliant data handling policy.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-slate-600 text-sm bg-slate-950">
        <p>PronounceAI MVP. Built using Next.js, FastAPI, faster-whisper, Gemini Flash.</p>
      </footer>
    </div>
  );
}

function Step({ number, title }: { number: string, title: string }) {
  return (
    <div className="flex flex-col items-center gap-4 bg-slate-950 px-4 py-2">
      <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center font-bold text-lg text-slate-300">
        {number}
      </div>
      <div className="text-sm font-medium text-slate-400 max-w-[100px] leading-tight">
        {title}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-700 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-display font-bold text-xl flex items-center gap-2">
          <span className="text-2xl">🌊</span> LearnKriolu
        </span>
        <Link to="/login" className="text-sm text-ocean-200 hover:text-white font-medium transition-colors">
          Sign in
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 gap-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            Papia Kriolu.
            <br />
            <span className="text-sand-300">Speak Your Roots.</span>
          </h1>
          <p className="text-ocean-200 text-lg md:text-xl max-w-lg mx-auto">
            Learn Cape Verdean Kriolu through conversational lessons, authentic audio, and spaced repetition.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="bg-sand-400 hover:bg-sand-300 text-ocean-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-150 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Learning Free
          </Link>
          <Link
            to="/login"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg border border-white/20 transition-all duration-150"
          >
            I have an account
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {['🎧 Native Audio', '🔁 Spaced Repetition', '🔥 Daily Streaks', '💬 AI Conversation'].map(f => (
            <span key={f} className="bg-white/10 border border-white/15 text-ocean-100 text-sm px-4 py-2 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </main>

      <footer className="text-center text-ocean-400 text-sm py-6">
        Based on <em>Pa Nu Papia Kriolu</em> — Sotavento variant
      </footer>
    </div>
  )
}

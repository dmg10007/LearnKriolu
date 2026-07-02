import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
import { BookOpen, Star, RotateCcw } from 'lucide-react'

export default function DashboardPage() {
  const { profile, loading, updateStreak } = useProfile()

  // Update streak whenever the dashboard mounts (covers app re-opens)
  useEffect(() => {
    updateStreak()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const displayName = profile?.display_name ?? 'Learner'

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bon dia'
    if (hour < 18) return 'Bon tardi'
    return 'Bon noti'
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-48" />
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-200 rounded-2xl" />)}
        </div>
        <div className="h-32 bg-slate-200 rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Greeting */}
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">
          {greeting()}, {displayName}! 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">Keep up your learning streak.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <div className="text-2xl">🔥</div>
          <div className="font-display font-bold text-xl text-slate-900 mt-1">
            {profile?.streak_count ?? 0}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Day Streak</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl">⭐</div>
          <div className="font-display font-bold text-xl text-slate-900 mt-1">
            {profile?.xp_total ?? 0}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Total XP</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl">📖</div>
          <div className="font-display font-bold text-xl text-slate-900 mt-1">0</div>
          <div className="text-xs text-slate-500 mt-0.5">Words Learned</div>
        </div>
      </div>

      {/* Continue learning CTA */}
      <Link
        to="/lessons"
        className="card p-5 flex items-center gap-4 bg-gradient-to-r from-ocean-600 to-ocean-500 text-white hover:shadow-lg transition-shadow block"
      >
        <BookOpen size={28} className="shrink-0 opacity-90" />
        <div className="flex-1">
          <p className="text-ocean-100 text-xs font-medium uppercase tracking-wide">Start Learning</p>
          <h2 className="font-display font-bold text-lg">Lesson 1: Greetings</h2>
        </div>
        <span className="text-2xl opacity-70">›</span>
      </Link>

      {/* Daily review card */}
      <Link to="/review" className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center">
          <RotateCcw size={22} className="text-sand-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800">Daily Review</p>
          <p className="text-sm text-slate-500 mt-0.5">0 cards due today</p>
        </div>
        <Star size={18} className="text-slate-300" />
      </Link>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/phrasebook" className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
          <span className="text-2xl">💬</span>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Phrasebook</p>
            <p className="text-xs text-slate-500">Quick reference</p>
          </div>
        </Link>
        <Link to="/lessons" className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
          <span className="text-2xl">🧩</span>
          <div>
            <p className="font-semibold text-slate-800 text-sm">All Lessons</p>
            <p className="text-xs text-slate-500">Browse topics</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

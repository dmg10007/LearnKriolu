import { useAuth } from '@/hooks/useAuth'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">
          Bon dia! 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">{user?.email}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Day Streak', value: '0', emoji: '🔥' },
          { label: 'Total XP', value: '0', emoji: '⭐' },
          { label: 'Words Learned', value: '0', emoji: '📖' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl">{stat.emoji}</div>
            <div className="font-display font-bold text-xl text-slate-900 mt-1">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Continue learning CTA */}
      <div className="card p-5 bg-gradient-to-r from-ocean-600 to-ocean-500 text-white">
        <p className="text-ocean-100 text-sm font-medium">Continue where you left off</p>
        <h2 className="font-display font-bold text-lg mt-1">Lesson 1: Greetings</h2>
        <button className="mt-4 bg-white text-ocean-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-ocean-50 transition-colors">
          Continue →
        </button>
      </div>

      {/* Daily review prompt */}
      <div className="card p-5 border-l-4 border-sand-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Daily Review</p>
            <p className="text-sm text-slate-500 mt-0.5">0 cards due today</p>
          </div>
          <span className="text-3xl">🎴</span>
        </div>
      </div>
    </div>
  )
}

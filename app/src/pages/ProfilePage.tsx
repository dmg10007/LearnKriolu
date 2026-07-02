import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

export default function ProfilePage() {
  const { signOut } = useAuth()
  const { profile, loading } = useProfile()

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Profile</h1>

      {/* Avatar + name */}
      <div className="card p-5">
        {loading ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-14 h-14 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-3 bg-slate-200 rounded w-48" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-ocean-100 flex items-center justify-center text-2xl font-bold text-ocean-700">
              {profile?.display_name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{profile?.display_name ?? 'Learner'}</p>
              <p className="text-sm text-slate-500">{profile?.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="card p-5 space-y-3">
        <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Your Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="font-display font-bold text-2xl text-slate-900">{profile?.streak_count ?? 0}</p>
            <p className="text-xs text-slate-500 mt-0.5">🔥 Day Streak</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="font-display font-bold text-2xl text-slate-900">{profile?.xp_total ?? 0}</p>
            <p className="text-xs text-slate-500 mt-0.5">⭐ Total XP</p>
          </div>
        </div>
      </div>

      {/* Member since */}
      {profile?.created_at && (
        <p className="text-center text-xs text-slate-400">
          Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      )}

      <button onClick={signOut} className="btn-secondary w-full">
        Sign out
      </button>
    </div>
  )
}

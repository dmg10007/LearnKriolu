import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user, signOut } = useAuth()

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Profile</h1>

      <div className="card p-5 space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-ocean-100 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user?.user_metadata?.display_name ?? 'Learner'}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <button onClick={signOut} className="btn-secondary w-full">
        Sign out
      </button>
    </div>
  )
}

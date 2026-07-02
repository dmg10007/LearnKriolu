import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    // Insert user profile row
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email,
        display_name: displayName,
        xp_total: 0,
        streak_count: 0,
      })
    }

    navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="font-display font-bold text-2xl text-ocean-700 flex items-center justify-center gap-2">
            <span className="text-3xl">🌊</span> LearnKriolu
          </Link>
          <p className="text-slate-500 mt-2 text-sm">Start your Kriolu journey</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">Your name</label>
            <input
              id="name" type="text" required
              className="input-field"
              placeholder="Maria"
              value={displayName} onChange={e => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email</label>
            <input
              id="email" type="email" required
              className="input-field"
              placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">Password</label>
            <input
              id="password" type="password" required minLength={6}
              className="input-field"
              placeholder="At least 6 characters"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-ocean-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

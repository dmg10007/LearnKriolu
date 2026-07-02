import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, Home, MessageSquare, Star } from 'lucide-react'

const navLinks = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/lessons', label: 'Lessons', icon: BookOpen },
  { to: '/review', label: 'Review', icon: Star },
  { to: '/phrasebook', label: 'Phrasebook', icon: MessageSquare },
]

export default function TopNav() {
  const { signOut } = useAuth()
  const location = useLocation()

  return (
    <header className="hidden md:flex items-center justify-between h-16 px-6 bg-white border-b border-slate-100 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/dashboard" className="flex items-center gap-2 font-display font-bold text-xl text-ocean-700">
        <span className="text-2xl">🌊</span>
        <span>LearnKriolu</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === to
                ? 'bg-ocean-50 text-ocean-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Profile + signout */}
      <div className="flex items-center gap-3">
        <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Profile</Link>
        <button onClick={signOut} className="text-sm text-slate-500 hover:text-slate-700">Sign out</button>
      </div>
    </header>
  )
}

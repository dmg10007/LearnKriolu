import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, Star, MessageSquare, User } from 'lucide-react'

const tabs = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/lessons', label: 'Lessons', icon: BookOpen },
  { to: '/review', label: 'Review', icon: Star },
  { to: '/phrasebook', label: 'Phrases', icon: MessageSquare },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 flex">
      {tabs.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-xs font-medium transition-colors ${
              active ? 'text-ocean-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

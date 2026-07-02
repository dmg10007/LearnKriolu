import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import TopNav from './TopNav'

export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Desktop top nav */}
      <TopNav />

      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  )
}

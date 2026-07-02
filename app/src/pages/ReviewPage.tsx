export default function ReviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Review</h1>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
        <span className="text-6xl">🎴</span>
        <h2 className="font-display font-semibold text-lg text-slate-800">No cards due today</h2>
        <p className="text-slate-500 text-sm max-w-xs">
          Complete some lessons first to build your review queue.
        </p>
        <a href="/lessons" className="btn-primary mt-2">Start a lesson</a>
      </div>
    </div>
  )
}

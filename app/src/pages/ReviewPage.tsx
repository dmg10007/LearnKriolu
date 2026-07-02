import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReviewQueue, Rating } from '@/hooks/useReviewQueue'
import { Volume2, RotateCcw } from 'lucide-react'

const ratingConfig = [
  {
    rating: Rating.Again,
    label: 'Again',
    sublabel: '< 1 min',
    className: 'border-2 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200',
  },
  {
    rating: Rating.Hard,
    label: 'Hard',
    sublabel: '< 10 min',
    className: 'border-2 border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 active:bg-orange-200',
  },
  {
    rating: Rating.Good,
    label: 'Good',
    sublabel: 'Tomorrow',
    className: 'border-2 border-ocean-200 bg-ocean-50 text-ocean-700 hover:bg-ocean-100 active:bg-ocean-200',
  },
  {
    rating: Rating.Easy,
    label: 'Easy',
    sublabel: '4+ days',
    className: 'border-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 active:bg-green-200',
  },
]

export default function ReviewPage() {
  const { queue, loading, submitRating, refetch } = useReviewQueue()
  const [flipped, setFlipped] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  const current = queue[0]

  const handleRating = async (rating: Rating) => {
    if (!current || submitting) return
    setSubmitting(true)
    setFlipped(false)
    await submitRating(current, rating)
    setSessionCount(c => c + 1)
    setSubmitting(false)
  }

  const playAudio = () => {
    if (current?.audio_url) {
      new Audio(current.audio_url).play()
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-32" />
        <div className="h-52 bg-slate-200 rounded-2xl" />
        <div className="grid grid-cols-4 gap-2">
          {[1,2,3,4].map(i => <div key={i} className="h-16 bg-slate-200 rounded-xl" />)}
        </div>
      </div>
    )
  }

  // Session complete / empty queue
  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5 animate-fade-in">
        {sessionCount > 0 ? (
          <>
            <span className="text-6xl">🎉</span>
            <h2 className="font-display font-bold text-2xl text-slate-900">Session Complete!</h2>
            <p className="text-slate-500 text-sm max-w-xs">
              You reviewed <strong>{sessionCount}</strong> card{sessionCount !== 1 ? 's' : ''}. Great work!
            </p>
          </>
        ) : (
          <>
            <span className="text-6xl">🎴</span>
            <h2 className="font-display font-semibold text-lg text-slate-800">No cards due today</h2>
            <p className="text-slate-500 text-sm max-w-xs">
              Complete a lesson to add cards to your review queue.
            </p>
          </>
        )}
        <div className="flex gap-3 mt-2">
          <button onClick={refetch} className="btn-secondary flex items-center gap-2">
            <RotateCcw size={16} /> Refresh
          </button>
          <Link to="/lessons" className="btn-primary">Go to Lessons</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display font-bold text-2xl text-slate-900">Review</h1>
        <span className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{queue.length}</span> card{queue.length !== 1 ? 's' : ''} left
        </span>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => !flipped && setFlipped(true)}
        className={`card p-8 min-h-52 flex flex-col items-center justify-center text-center transition-shadow ${
          !flipped ? 'cursor-pointer hover:shadow-md' : ''
        }`}
      >
        {!flipped ? (
          <>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Kriolu</p>
            <p className="font-display font-bold text-4xl text-slate-900">{current.kriolu_text}</p>
            {current.pronunciation_hint && (
              <p className="text-slate-400 text-sm mt-3 italic">/{current.pronunciation_hint}/</p>
            )}
            <p className="text-slate-300 text-xs mt-8">Tap to reveal answer</p>
          </>
        ) : (
          <>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">English</p>
            <p className="font-display font-bold text-3xl text-slate-900">{current.english_text}</p>
            {current.example_sentence_kriolu && (
              <div className="mt-4 p-3 bg-ocean-50 rounded-xl text-sm text-left w-full max-w-xs">
                <p className="text-ocean-800 font-medium">{current.example_sentence_kriolu}</p>
                {current.example_sentence_english && (
                  <p className="text-ocean-500 mt-1">{current.example_sentence_english}</p>
                )}
              </div>
            )}
            {current.audio_url && (
              <button
                onClick={e => { e.stopPropagation(); playAudio() }}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-ocean-50 text-ocean-700 hover:bg-ocean-100 transition-colors text-sm font-medium"
              >
                <Volume2 size={16} /> Play Audio
              </button>
            )}
          </>
        )}
      </div>

      {/* Rating buttons — only show after flip */}
      {flipped && (
        <div className="space-y-2 animate-slide-up">
          <p className="text-xs text-center text-slate-400 uppercase tracking-wide">How well did you know this?</p>
          <div className="grid grid-cols-4 gap-2">
            {ratingConfig.map(({ rating, label, sublabel, className }) => (
              <button
                key={label}
                onClick={() => handleRating(rating)}
                disabled={submitting}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 ${className}`}
              >
                <span>{label}</span>
                <span className="text-xs font-normal opacity-70 mt-0.5">{sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

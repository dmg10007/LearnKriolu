import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLessons } from '@/hooks/useLessons'
import { useLessonItems } from '@/hooks/useLessonItems'
import { Volume2, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import type { Database } from '@/types/database'

type LessonItem = Database['public']['Tables']['lesson_items']['Row']

function FlashCard({ item, onNext, onPrev, index, total }: {
  item: LessonItem
  onNext: () => void
  onPrev: () => void
  index: number
  total: number
}) {
  const [flipped, setFlipped] = useState(false)

  const playAudio = () => {
    if (item.audio_url) {
      new Audio(item.audio_url).play()
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-100 rounded-full h-2">
          <div
            className="bg-ocean-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 shrink-0">{index + 1} / {total}</span>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="card p-8 min-h-52 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow select-none"
      >
        {!flipped ? (
          <>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Kriolu</p>
            <p className="font-display font-bold text-4xl text-slate-900">{item.kriolu_text}</p>
            {item.pronunciation_hint && (
              <p className="text-slate-400 text-sm mt-3 italic">/{item.pronunciation_hint}/</p>
            )}
            <p className="text-slate-300 text-xs mt-6">Tap to reveal</p>
          </>
        ) : (
          <>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">English</p>
            <p className="font-display font-bold text-3xl text-slate-900">{item.english_text}</p>
            {item.example_sentence_kriolu && (
              <div className="mt-4 p-3 bg-ocean-50 rounded-xl text-sm text-left w-full max-w-xs">
                <p className="text-ocean-800 font-medium">{item.example_sentence_kriolu}</p>
                {item.example_sentence_english && (
                  <p className="text-ocean-500 mt-1">{item.example_sentence_english}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio + nav */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="btn-secondary flex items-center gap-1.5 disabled:opacity-30"
        >
          <ChevronLeft size={18} /> Prev
        </button>

        {item.audio_url ? (
          <button
            onClick={playAudio}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ocean-50 text-ocean-700 hover:bg-ocean-100 transition-colors font-medium text-sm"
          >
            <Volume2 size={18} /> Play Audio
          </button>
        ) : (
          <div className="text-xs text-slate-300 italic">No audio yet</div>
        )}

        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="btn-primary flex items-center gap-1.5 disabled:opacity-30"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lessons } = useLessons()
  const { items, loading, error } = useLessonItems(id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)

  const lesson = lessons.find(l => l.id === id)

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1))

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-24" />
        <div className="h-52 bg-slate-200 rounded-2xl" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600 text-sm">Failed to load lesson: {error}</p>
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5 animate-fade-in">
        <CheckCircle size={56} className="text-green-500" />
        <h2 className="font-display font-bold text-2xl text-slate-900">Lesson Complete!</h2>
        <p className="text-slate-500 text-sm max-w-xs">
          You reviewed all {items.length} items in <strong>{lesson?.title ?? 'this lesson'}</strong>.
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => { setCurrentIndex(0); setCompleted(false) }}
            className="btn-secondary"
          >
            Review Again
          </button>
          <Link to="/lessons" className="btn-primary">Back to Lessons</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/lessons" className="text-slate-400 hover:text-slate-600 transition-colors">
          <ChevronLeft size={22} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-xl text-slate-900">
            {lesson?.cover_emoji} {lesson?.title ?? 'Lesson'}
          </h1>
          <p className="text-xs text-slate-400 capitalize">{lesson?.category} · {lesson?.level}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-400">No items in this lesson yet.</p>
        </div>
      ) : (
        <FlashCard
          item={items[currentIndex]}
          onNext={handleNext}
          onPrev={handlePrev}
          index={currentIndex}
          total={items.length}
        />
      )}
    </div>
  )
}

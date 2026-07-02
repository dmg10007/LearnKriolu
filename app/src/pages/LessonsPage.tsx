import { Link } from 'react-router-dom'
import { useLessons } from '@/hooks/useLessons'
import { BookOpen, MessageSquare, Puzzle } from 'lucide-react'
import type { Database } from '@/types/database'

type Lesson = Database['public']['Tables']['lessons']['Row']

const categoryIcon = {
  vocabulary: BookOpen,
  grammar: Puzzle,
  phrasebook: MessageSquare,
}

const categoryColor = {
  vocabulary: 'bg-ocean-50 text-ocean-700',
  grammar: 'bg-sand-100 text-sand-700',
  phrasebook: 'bg-green-50 text-green-700',
}

const levelBadge = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const Icon = categoryIcon[lesson.category] ?? BookOpen
  const iconClass = categoryColor[lesson.category] ?? 'bg-slate-100 text-slate-600'
  const badgeClass = levelBadge[lesson.level] ?? 'bg-slate-100 text-slate-600'

  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="card p-5 flex items-center gap-4 hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl ${iconClass}`}>
        {lesson.cover_emoji ?? <Icon size={22} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="font-display font-semibold text-slate-900">{lesson.title}</h2>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${badgeClass}`}>
            {lesson.level}
          </span>
        </div>
        {lesson.description && (
          <p className="text-sm text-slate-500 mt-0.5 truncate">{lesson.description}</p>
        )}
      </div>
      <span className="text-slate-300 text-xl shrink-0">›</span>
    </Link>
  )
}

export default function LessonsPage() {
  const { lessons, loading, error } = useLessons()

  const grouped = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    const cat = lesson.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(lesson)
    return acc
  }, {})

  const categoryLabels: Record<string, string> = {
    vocabulary: '📖 Vocabulary',
    grammar: '🧩 Grammar',
    phrasebook: '💬 Phrasebook',
  }

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-32" />
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-sm">Failed to load lessons: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Lessons</h1>

      {lessons.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
          <span className="text-6xl">📖</span>
          <h2 className="font-display font-semibold text-lg text-slate-800">No lessons yet</h2>
          <p className="text-slate-500 text-sm max-w-xs">
            Lessons are being prepared. Check back soon!
          </p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, categoryLessons]) => (
          <section key={category} className="space-y-3">
            <h2 className="font-display font-semibold text-slate-700 text-sm uppercase tracking-wide px-1">
              {categoryLabels[category] ?? category}
            </h2>
            <div className="space-y-3">
              {categoryLessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

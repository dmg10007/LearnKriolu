import { useParams, Link } from 'react-router-dom'

export default function LessonDetailPage() {
  const { id } = useParams()

  return (
    <div className="space-y-6 animate-fade-in">
      <Link to="/lessons" className="text-sm text-ocean-600 font-medium hover:underline">← Back to Lessons</Link>
      <h1 className="font-display font-bold text-2xl text-slate-900">Lesson {id}</h1>
      <p className="text-slate-500">Lesson content will render here.</p>
    </div>
  )
}

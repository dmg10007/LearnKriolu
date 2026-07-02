export default function LessonsPage() {
  const categories = [
    { id: 'vocabulary', label: 'Vocabulary', emoji: '📖', description: 'Words and flashcards' },
    { id: 'grammar', label: 'Grammar', emoji: '🧩', description: 'Sentence structure' },
    { id: 'phrasebook', label: 'Phrasebook', emoji: '💬', description: 'Ready-to-use phrases' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Lessons</h1>

      <div className="grid gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="card p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-4xl">{cat.emoji}</span>
            <div>
              <h2 className="font-display font-semibold text-lg text-slate-900">{cat.label}</h2>
              <p className="text-sm text-slate-500">{cat.description}</p>
            </div>
            <span className="ml-auto text-slate-300 text-xl">›</span>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-400 text-sm py-8">
        Lessons coming soon — content is being prepared.
      </p>
    </div>
  )
}

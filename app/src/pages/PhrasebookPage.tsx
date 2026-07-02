export default function PhrasebookPage() {
  const phrases = [
    { kriolu: 'Bon dia', english: 'Good morning', category: 'Greetings' },
    { kriolu: 'Bon tardi', english: 'Good afternoon', category: 'Greetings' },
    { kriolu: 'Bon noti', english: 'Good night', category: 'Greetings' },
    { kriolu: 'Kuma bu sta?', english: 'How are you?', category: 'Greetings' },
    { kriolu: 'N sta ben, obrigadu', english: 'I\'m fine, thank you', category: 'Greetings' },
    { kriolu: 'Kal é bu nomi?', english: 'What is your name?', category: 'Introductions' },
    { kriolu: 'Nha nomi é…', english: 'My name is…', category: 'Introductions' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-slate-900">Phrasebook</h1>
      <p className="text-slate-500 text-sm">Essential Cape Verdean Kriolu phrases for everyday conversation.</p>

      <div className="space-y-3">
        {phrases.map((p, i) => (
          <div key={i} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{p.kriolu}</p>
              <p className="text-sm text-slate-500">{p.english}</p>
            </div>
            <span className="text-xs bg-ocean-50 text-ocean-700 px-2.5 py-1 rounded-full font-medium">
              {p.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

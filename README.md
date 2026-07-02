# LearnKriolu 🌊

> A language learning app for Cape Verdean Kriolu (Sotavento variant)

LearnKriolu helps diaspora communities reconnect with their heritage language and welcomes brand-new learners to Cape Verdean Kriolu (Kabuverdianu). Inspired by the *Pa Nu Papia Kriolu* book and audio series.

## Vision

- **Conversational-first** — spoken Kriolu for real-life situations
- **Audio-native** — every lesson item has authentic audio
- **Gamified** — streaks, XP, and spaced repetition to build lasting habits
- **Accessible** — no prior knowledge required

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 |
| Backend / DB | Supabase (Postgres + Auth + Storage) |
| Spaced Repetition | ts-fsrs |
| AI Conversation | OpenAI API (GPT-4o) |
| Hosting | Vercel |

## Project Structure

```
LearnKriolu/
├── app/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Supabase client, FSRS, API utils
│   │   └── types/        # TypeScript type definitions
│   └── ...
├── supabase/
│   ├── migrations/       # SQL schema files
│   └── seed.sql          # Initial lesson data
└── Resources/            # Source materials (book, audio)
```

## Getting Started

### Prerequisites
- Node.js 20+
- A [Supabase](https://supabase.com) project

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/dmg10007/LearnKriolu.git
cd LearnKriolu/app

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# 4. Run the dev server
npm run dev
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Optionally run `supabase/seed.sql` to populate sample lesson data
4. Copy your project URL and anon key into `.env.local`

## Roadmap

### MVP (Phase 1)
- [x] Project scaffold
- [ ] Authentication (email/password)
- [ ] Lesson browser
- [ ] Vocabulary flashcards with audio
- [ ] Spaced repetition review queue (FSRS)
- [ ] Quizzes (multiple choice, fill-in-blank)
- [ ] XP + streak system
- [ ] Phrasebook

### Phase 2
- [ ] Grammar structure lessons
- [ ] AI conversation partner
- [ ] Progress dashboard

### Phase 3 (Mobile)
- [ ] Admin CMS panel
- [ ] React Native / Expo migration
- [ ] App Store / Play Store release

## Language Notes

- **Variant**: Sotavento (Santiago/Badiu)
- **Orthography**: ALUPEC standard
- **Source material**: *Pa Nu Papia Kriolu* book and audio series

## License

MIT

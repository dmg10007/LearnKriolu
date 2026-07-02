import { createEmptyCard, fsrs, generatorParameters, Rating } from 'ts-fsrs'
import type { Card, ReviewLog } from 'ts-fsrs'

const params = generatorParameters({ enable_fuzz: true })
const f = fsrs(params)

export { Rating, createEmptyCard }
export type { Card, ReviewLog }

/**
 * Given a card and a rating (Again/Hard/Good/Easy), return the updated card
 * and the scheduling info for the next review.
 */
export function scheduleReview(card: Card, rating: Rating) {
  const now = new Date()
  const schedulingCards = f.repeat(card, now)
  return schedulingCards[rating]
}

/**
 * Convert a database user_progress row to an FSRS Card object.
 */
export function dbRowToCard(row: {
  due_date: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  state: number
  last_review: string | null
}): Card {
  return {
    due: new Date(row.due_date),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: row.elapsed_days,
    scheduled_days: row.scheduled_days,
    reps: row.reps,
    lapses: row.lapses,
    state: row.state as 0 | 1 | 2 | 3,
    last_review: row.last_review ? new Date(row.last_review) : undefined,
  }
}

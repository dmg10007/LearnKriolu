import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { createEmptyCard, scheduleReview, dbRowToCard, Rating } from '@/lib/fsrs'
import type { Database } from '@/types/database'

type LessonItem = Database['public']['Tables']['lesson_items']['Row']
type UserProgress = Database['public']['Tables']['user_progress']['Row']

export type ReviewCard = LessonItem & { progress: UserProgress }

export { Rating }

export function useReviewQueue() {
  const { user } = useAuth()
  const [queue, setQueue] = useState<ReviewCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQueue = useCallback(async () => {
    if (!user) return
    setLoading(true)

    // Fetch all progress rows due now or overdue
    const { data: progressRows, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .lte('due_date', new Date().toISOString())
      .order('due_date', { ascending: true })

    if (progressError) {
      setError(progressError.message)
      setLoading(false)
      return
    }

    if (!progressRows || progressRows.length === 0) {
      setQueue([])
      setLoading(false)
      return
    }

    // Fetch the corresponding lesson items
    const itemIds = progressRows.map(p => p.lesson_item_id)
    const { data: items, error: itemsError } = await supabase
      .from('lesson_items')
      .select('*')
      .in('id', itemIds)

    if (itemsError) {
      setError(itemsError.message)
      setLoading(false)
      return
    }

    // Merge items with their progress rows
    const itemMap = new Map((items ?? []).map(i => [i.id, i]))
    const merged = progressRows
      .map(p => {
        const item = itemMap.get(p.lesson_item_id)
        if (!item) return null
        return { ...item, progress: p } as ReviewCard
      })
      .filter(Boolean) as ReviewCard[]

    setQueue(merged)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchQueue()
  }, [fetchQueue])

  /**
   * Submit a rating (Again/Hard/Good/Easy) for the current card.
   * Updates the FSRS fields in user_progress and removes the card from the local queue.
   */
  const submitRating = useCallback(async (card: ReviewCard, rating: Rating) => {
    if (!user) return

    const fsrsCard = dbRowToCard(card.progress)
    const result = scheduleReview(fsrsCard, rating)
    const scheduled = result.card

    await supabase
      .from('user_progress')
      .update({
        due_date:       scheduled.due.toISOString(),
        stability:      scheduled.stability,
        difficulty:     scheduled.difficulty,
        elapsed_days:   scheduled.elapsed_days,
        scheduled_days: scheduled.scheduled_days,
        reps:           scheduled.reps,
        lapses:         scheduled.lapses,
        state:          scheduled.state,
        last_review:    new Date().toISOString(),
      })
      .eq('id', card.progress.id)

    // Remove reviewed card from local queue immediately
    setQueue(q => q.filter(c => c.progress.id !== card.progress.id))
  }, [user])

  /**
   * Enroll a list of lesson item IDs into the review queue for the current user.
   * Creates new user_progress rows (skips items already enrolled).
   */
  const enrollItems = useCallback(async (lessonItemIds: string[]) => {
    if (!user || lessonItemIds.length === 0) return

    const now = new Date().toISOString()
    const rows = lessonItemIds.map(itemId => ({
      user_id:        user.id,
      lesson_item_id: itemId,
      due_date:       now,
      stability:      0,
      difficulty:     0,
      elapsed_days:   0,
      scheduled_days: 0,
      reps:           0,
      lapses:         0,
      state:          0,
    }))

    await supabase
      .from('user_progress')
      .upsert(rows, { onConflict: 'user_id,lesson_item_id', ignoreDuplicates: true })

    await fetchQueue()
  }, [user, fetchQueue])

  return { queue, loading, error, submitRating, enrollItems, refetch: fetchQueue }
}

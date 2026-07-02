import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type LessonItem = Database['public']['Tables']['lesson_items']['Row']

export function useLessonItems(lessonId: string | undefined) {
  const [items, setItems] = useState<LessonItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lessonId) {
      setLoading(false)
      return
    }

    async function fetchItems() {
      setLoading(true)
      const { data, error } = await supabase
        .from('lesson_items')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('order_index', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setItems(data ?? [])
      }
      setLoading(false)
    }

    fetchItems()
  }, [lessonId])

  return { items, loading, error }
}

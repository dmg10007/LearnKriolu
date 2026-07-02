import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Lesson = Database['public']['Tables']['lessons']['Row']

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLessons() {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setLessons(data ?? [])
      }
      setLoading(false)
    }

    fetchLessons()
  }, [])

  return { lessons, loading, error }
}

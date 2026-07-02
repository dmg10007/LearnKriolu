import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { Database } from '@/types/database'

type UserProfile = Database['public']['Tables']['users']['Row']

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      setError(error.message)
    } else {
      setProfile(data)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateStreak = useCallback(async () => {
    if (!user) return
    // Call the Postgres function to safely update streak
    await supabase.rpc('update_user_streak', { p_user_id: user.id })
    // Re-fetch profile to get updated streak/XP
    await fetchProfile()
  }, [user, fetchProfile])

  const addXp = useCallback(async (amount: number) => {
    if (!user || !profile) return
    const newXp = profile.xp_total + amount
    const { data } = await supabase
      .from('users')
      .update({ xp_total: newXp })
      .eq('id', user.id)
      .select()
      .single()
    if (data) setProfile(data)
  }, [user, profile])

  return { profile, loading, error, updateStreak, addXp, refetch: fetchProfile }
}

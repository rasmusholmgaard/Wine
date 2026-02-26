import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { CompletedTasting } from '../types/tasting'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface AppContextValue {
  tastings: CompletedTasting[]
  isLoading: boolean
  addTasting: (t: CompletedTasting) => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [tastings, setTastings] = useState<CompletedTasting[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      setTastings([])
      return
    }

    setIsLoading(true)
    supabase
      .from('tastings')
      .select('data')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          setTastings(data.map((row) => row.data as CompletedTasting))
        }
        setIsLoading(false)
      })
  }, [user])

  async function addTasting(t: CompletedTasting) {
    const { error } = await supabase.from('tastings').insert({
      id: t.id,
      user_id: user!.id,
      created_at: t.createdAt,
      data: t,
    })
    if (error) throw error
    setTastings((prev) => [t, ...prev])
  }

  return (
    <AppContext.Provider value={{ tastings, isLoading, addTasting }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

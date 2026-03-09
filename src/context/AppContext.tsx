import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { CompletedTasting } from '../types/tasting'
import { supabase } from '../lib/supabase'
import { deleteLabelPhoto } from '../lib/storage'
import { useAuth } from './AuthContext'

interface AppContextValue {
  tastings: CompletedTasting[]
  isLoading: boolean
  addTasting: (t: CompletedTasting) => Promise<void>
  deleteTasting: (id: string) => Promise<void>
  updateLabelPhoto: (id: string, url: string) => Promise<void>
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

  async function updateLabelPhoto(id: string, url: string) {
    const tasting = tastings.find((t) => t.id === id)
    if (!tasting) return
    const updated = { ...tasting, labelPhotoUrl: url || undefined }
    const { error } = await supabase
      .from('tastings')
      .update({ data: updated })
      .eq('id', id)
    if (error) throw error
    if (tasting.labelPhotoUrl && tasting.labelPhotoUrl !== url) {
      deleteLabelPhoto(tasting.labelPhotoUrl).catch(() => {})
    }
    setTastings((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }

  async function deleteTasting(id: string) {
    const tasting = tastings.find((t) => t.id === id)
    const { error } = await supabase.from('tastings').delete().eq('id', id)
    if (error) throw error
    if (tasting?.labelPhotoUrl) {
      deleteLabelPhoto(tasting.labelPhotoUrl).catch(() => {})
    }
    setTastings((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <AppContext.Provider value={{ tastings, isLoading, addTasting, deleteTasting, updateLabelPhoto }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

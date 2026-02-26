import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CompletedTasting } from '../types/tasting'
import { MOCK_TASTINGS } from '../data/mockTastings'

interface AppContextValue {
  tastings: CompletedTasting[]
  addTasting: (t: CompletedTasting) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [tastings, setTastings] = useState<CompletedTasting[]>(MOCK_TASTINGS)

  function addTasting(t: CompletedTasting) {
    setTastings((prev) => [t, ...prev])
  }

  return (
    <AppContext.Provider value={{ tastings, addTasting }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

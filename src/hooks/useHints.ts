import { useMemo } from 'react'
import { useTasting } from '../context/TastingContext'
import { deriveHints } from '../data/hintRules'

export function useHints() {
  const { data } = useTasting()
  return useMemo(() => deriveHints(data), [data])
}

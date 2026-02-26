import type { TastingNote } from './tasting'

export interface HintSuggestion {
  grape?: string
  country?: string
  region?: string
  label: string
}

export interface HintRule {
  conditions: Partial<Record<keyof TastingNote, string | string[]>>
  suggestions: HintSuggestion[]
}

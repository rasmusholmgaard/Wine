import { supabase } from './supabase'

export interface LabelAnalysis {
  wineName: string | null
  producer: string | null
  vintage: string | null
  country: string | null
  region: string | null
  subRegion: string | null
  grapes: string[] | null
  grape: string | null
  wineType: string | null
  alcoholPct: number | null
  volumeMl: number | null
  classification: string | null
  confidence: 'high' | 'medium' | 'low' | null
  notes: string | null
}

export async function analyzeLabel(imageUrl: string): Promise<LabelAnalysis> {
  const { data, error } = await supabase.functions.invoke('analyze-label', {
    body: { imageUrl },
  })
  if (error) throw error
  return data as LabelAnalysis
}

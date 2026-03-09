import { supabase } from './supabase'

export interface LabelAnalysis {
  wineName: string | null
  producer: string | null
  vintage: string | null
  country: string | null
  region: string | null
  grape: string | null
}

export async function analyzeLabel(imageUrl: string): Promise<LabelAnalysis> {
  const { data, error } = await supabase.functions.invoke('analyze-label', {
    body: { imageUrl },
  })
  if (error) throw error
  return data as LabelAnalysis
}

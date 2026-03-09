import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { TastingNote, CompletedTasting } from '../types/tasting'
import { EMPTY_TASTING } from '../types/tasting'

// Step question field lists
export const BLIND_STEP_QUESTIONS: Record<number, (keyof TastingNote)[]> = {
  1: ['wineType', 'clarity', 'concentration', 'co2', 'sediment', 'color', 'rim', 'viscosity'],
  2: ['noseIntensity', 'fruitCondition', 'ageEstimate', 'primaryAromas', 'secondaryAromas', 'tertiaryAromas', 'condition'],
  3: ['sweetness', 'tannins', 'acidity', 'alcohol', 'bodyTexture', 'primaryFlavorsText', 'secondaryFlavorsText', 'tertiaryFlavorsText', 'balance', 'finishLength', 'complexity'],
  4: ['climate', 'grapeGuess', 'countryGuess', 'regionGuess', 'vintageEstimate', 'qualityLevel', 'score', 'personalNotes'],
  5: ['labelPhotoUrl', 'wineName', 'producer', 'wineGrape', 'vintage', 'wineCountry', 'wineRegion'],
}

export const CASUAL_STEP_QUESTIONS: Record<number, (keyof TastingNote)[]> = {
  1: ['wineType', 'color', 'concentration'],
  2: ['noseIntensity', 'casualAromas'],
  3: ['sweetness', 'tannins', 'acidity', 'casualFlavors'],
  4: ['grapeGuess', 'countryGuess', 'vintageEstimate', 'score', 'personalNotes'],
  5: ['wineName', 'producer', 'vintage', 'labelPhotoUrl'],
}

export const STEP_NAMES: Record<number, string> = {
  1: 'Syn',
  2: 'Næse',
  3: 'Gane',
  4: 'Konklusion',
  5: 'Afsløring',
}

export const STEP_ICONS: Record<number, string> = {
  1: '👁️',
  2: '👃',
  3: '👅',
  4: '🏆',
  5: '🏷️',
}

export const CASUAL_STEP_NAMES: Record<number, string> = {
  1: 'Syn',
  2: 'Næse',
  3: 'Gane',
  4: 'Konklusion',
  5: 'Afsløring',
}

export const CASUAL_STEP_ICONS: Record<number, string> = {
  1: '👁️',
  2: '👃',
  3: '👅',
  4: '🏆',
  5: '🏷️',
}

interface TastingFlowState {
  data: TastingNote
  currentStep: number
  direction: 'forward' | 'back'
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
  goNext: () => void
  goBack: () => void
  submit: () => CompletedTasting
  reset: (tastingMode?: 'casual' | 'advanced') => void
  stepQuestions: Record<number, (keyof TastingNote)[]>
  totalSteps: number
}

const TastingContext = createContext<TastingFlowState | null>(null)

function generateId() {
  return `tasting-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function TastingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TastingNote>({ ...EMPTY_TASTING })
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const isCasual = data.tastingMode === 'casual'
  const stepQuestions = isCasual ? CASUAL_STEP_QUESTIONS : BLIND_STEP_QUESTIONS
  const totalSteps = 5

  const setField = useCallback((key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const goNext = useCallback(() => {
    setDirection('forward')
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1)
    }
  }, [currentStep, totalSteps])

  const goBack = useCallback(() => {
    setDirection('back')
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }, [currentStep])

  const submit = useCallback((): CompletedTasting => {
    const completed: CompletedTasting = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      isCompleted: true,
    }
    return completed
  }, [data])

  const reset = useCallback((tastingMode: 'casual' | 'advanced' = 'advanced') => {
    setData({ ...EMPTY_TASTING, tastingMode })
    setCurrentStep(1)
    setDirection('forward')
  }, [])

  return (
    <TastingContext.Provider value={{
      data, currentStep, direction,
      setField, goNext, goBack, submit, reset, stepQuestions, totalSteps,
    }}>
      {children}
    </TastingContext.Provider>
  )
}

export function useTasting() {
  const ctx = useContext(TastingContext)
  if (!ctx) throw new Error('useTasting must be used within TastingProvider')
  return ctx
}

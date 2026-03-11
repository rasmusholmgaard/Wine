import { useTasting, STEP_NAMES, STEP_ICONS, OPEN_STEP_NAMES, OPEN_STEP_ICONS } from '../context/TastingContext'

export function useTastingFlow() {
  const ctx = useTasting()
  const { currentStep, totalSteps, data } = ctx

  const isOpen = data.mode === 'open'
  const progress = Math.round(((currentStep - 1) / totalSteps) * 100)

  const stepLabel = `Step ${currentStep} of ${totalSteps}`
  const stepTitle = (isOpen ? OPEN_STEP_NAMES : STEP_NAMES)[currentStep] ?? ''
  const stepIcon = (isOpen ? OPEN_STEP_ICONS : STEP_ICONS)[currentStep] ?? ''

  const isAtStart = currentStep === 1
  const isAtEnd = currentStep === totalSteps

  return {
    ...ctx,
    progress,
    stepLabel,
    stepTitle,
    stepIcon,
    isAtStart,
    isAtEnd,
  }
}

import { useTasting, STEP_NAMES, STEP_ICONS } from '../context/TastingContext'

export function useTastingFlow() {
  const ctx = useTasting()
  const { currentStep, totalSteps } = ctx

  const progress = Math.round(((currentStep - 1) / totalSteps) * 100)

  const stepLabel = `Step ${currentStep} of ${totalSteps}`
  const stepTitle = STEP_NAMES[currentStep] ?? ''
  const stepIcon = STEP_ICONS[currentStep] ?? ''

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

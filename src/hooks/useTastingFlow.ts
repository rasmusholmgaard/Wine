import { useTasting, STEP_NAMES, OPEN_STEP_NAMES, STEP_ICONS, OPEN_STEP_ICONS } from '../context/TastingContext'

export function useTastingFlow() {
  const ctx = useTasting()
  const { data, currentStep, totalSteps } = ctx

  const progress = Math.round(((currentStep - 1) / totalSteps) * 100)

  const stepNames = data.mode === 'open' ? OPEN_STEP_NAMES : STEP_NAMES
  const stepIcons = data.mode === 'open' ? OPEN_STEP_ICONS : STEP_ICONS
  const stepLabel = `Step ${currentStep} of ${totalSteps}`
  const stepTitle = stepNames[currentStep] ?? ''
  const stepIcon = stepIcons[currentStep] ?? ''

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

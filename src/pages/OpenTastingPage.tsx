import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTastingFlow } from '../hooks/useTastingFlow'
import { useApp } from '../context/AppContext'
import TastingFlowLayout from '../components/layout/TastingFlowLayout'
import StepTransition from '../components/layout/StepTransition'
import StepIntroScreen from '../components/layout/StepIntroScreen'
import StepScrollView, { type StepScrollViewHandle } from '../components/tasting/StepScrollView'
import RevealStep from '../components/tasting/RevealStep'
import ExitTastingDialog from '../components/layout/ExitTastingDialog'

export default function OpenTastingPage() {
  const navigate = useNavigate()
  const { addTasting } = useApp()
  const flow = useTastingFlow()
  const {
    data, currentStep, direction,
    setField, goNext, goBack, submit,
    stepLabel, stepTitle, stepIcon, progress, stepQuestions, isAtStart, isAtEnd,
    totalSteps,
  } = flow
  const scrollViewRef = useRef<StepScrollViewHandle>(null)
  const [questionNav, setQuestionNav] = useState({ canUp: false, canDown: false })
  const [isSaving, setIsSaving] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [showExitDialog, setShowExitDialog] = useState(false)

  const handleQuestionChange = useCallback((canUp: boolean, canDown: boolean) => {
    setQuestionNav({ canUp, canDown })
  }, [])

  const isWineInfoStep = currentStep === 1
  const isCasual = data.tastingMode === 'casual'

  // Open steps: 1=wine info (RevealStep), 2-5=tasting
  // StepScrollView uses step prop to pick the right component:
  //   open step 2 → scrollview step 1 (Appearance)
  //   open step 3 → scrollview step 2 (Nose)
  //   open step 4 → scrollview step 3 (Palate)
  //   open step 5 → scrollview step 4 (Conclusions)
  const scrollViewStep = currentStep - 1

  const fieldKeys = (() => {
    if (isWineInfoStep) return []
    const base = stepQuestions[currentStep] ?? []
    // Casual: filter tannins from Gane (step 4) for non-red wines
    if (isCasual && currentStep === 4 && data.wineType !== 'red') {
      return base.filter((k) => k !== 'tannins')
    }
    return base
  })()

  function handleBack() {
    if (isAtStart) {
      setShowExitDialog(true)
      return
    }
    if (showIntro) {
      goBack()
      setShowIntro(false)
    } else {
      goBack()
    }
  }

  async function handleNext() {
    if (isAtEnd) {
      if (isSaving) return
      setIsSaving(true)
      try {
        const completed = submit()
        await addTasting(completed)
        navigate(`/tasting/${completed.id}`)
      } catch {
        setIsSaving(false)
      }
      return
    }
    if (!isWineInfoStep && scrollViewRef.current && !scrollViewRef.current.isAtLastQuestion()) {
      scrollViewRef.current.scrollNext()
      return
    }
    goNext()
    setShowIntro(true)
  }

  if (showIntro) {
    return (
      <>
        <StepIntroScreen
          step={currentStep}
          totalSteps={totalSteps}
          icon={stepIcon}
          title={stepTitle}
          isFirstStep={currentStep === 1}
          onContinue={() => setShowIntro(false)}
          onBack={handleBack}
        />
        {showExitDialog && (
          <ExitTastingDialog
            onStay={() => setShowExitDialog(false)}
            onExit={() => navigate('/')}
          />
        )}
      </>
    )
  }

  return (
    <>
      <TastingFlowLayout
        stepLabel={stepLabel}
        stepTitle={stepTitle}
        stepIcon={stepIcon}
        progress={progress}
        onBack={handleBack}
        onNext={handleNext}
        isLastStep={isAtEnd}
        nextLabel={isSaving ? 'Gemmer…' : isAtEnd ? 'Gem' : undefined}
        nextDisabled={isSaving}
        canScrollUp={isWineInfoStep ? false : questionNav.canUp}
        canScrollDown={isWineInfoStep ? false : questionNav.canDown}
        onScrollUp={isWineInfoStep ? undefined : () => scrollViewRef.current?.scrollPrev()}
        onScrollDown={isWineInfoStep ? undefined : () => scrollViewRef.current?.scrollNext()}
      >
        <StepTransition stepKey={`step-${currentStep}`} direction={direction}>
          {isWineInfoStep ? (
            <RevealStep data={data} setField={setField} />
          ) : (
            <StepScrollView
              ref={scrollViewRef}
              step={scrollViewStep}
              fieldKeys={fieldKeys}
              data={data}
              setField={setField}
              onQuestionChange={handleQuestionChange}
            />
          )}
        </StepTransition>
      </TastingFlowLayout>
      {showExitDialog && (
        <ExitTastingDialog
          onStay={() => setShowExitDialog(false)}
          onExit={() => navigate('/')}
        />
      )}
    </>
  )
}

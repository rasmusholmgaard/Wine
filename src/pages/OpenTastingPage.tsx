import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTastingFlow } from '../hooks/useTastingFlow'
import { useApp } from '../context/AppContext'
import TastingFlowLayout from '../components/layout/TastingFlowLayout'
import StepTransition from '../components/layout/StepTransition'
import StepIntroScreen from '../components/layout/StepIntroScreen'
import StepScrollView, { type StepScrollViewHandle } from '../components/tasting/StepScrollView'
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
  const fieldKeys = stepQuestions[currentStep] ?? []

  const handleQuestionChange = useCallback((canUp: boolean, canDown: boolean) => {
    setQuestionNav({ canUp, canDown })
  }, [])

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
    if (scrollViewRef.current && !scrollViewRef.current.isAtLastQuestion()) {
      scrollViewRef.current.scrollNext()
      return
    }
    if (isAtEnd) {
      if (isSaving) return
      setIsSaving(true)
      const completed = submit()
      await addTasting(completed)
      navigate(`/tasting/${completed.id}`)
    } else {
      goNext()
      setShowIntro(true)
    }
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
            onExit={() => navigate('/tasting/new')}
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
        nextLabel={isSaving ? 'Gemmer…' : undefined}
        nextDisabled={isSaving}
        canScrollUp={questionNav.canUp}
        canScrollDown={questionNav.canDown}
        onScrollUp={() => scrollViewRef.current?.scrollPrev()}
        onScrollDown={() => scrollViewRef.current?.scrollNext()}
      >
        <StepTransition stepKey={`step-${currentStep}`} direction={direction}>
          <StepScrollView
            ref={scrollViewRef}
            step={currentStep}
            mode={data.mode}
            fieldKeys={fieldKeys}
            data={data}
            setField={setField}
            onQuestionChange={handleQuestionChange}
          />
        </StepTransition>
      </TastingFlowLayout>
      {showExitDialog && (
        <ExitTastingDialog
          onStay={() => setShowExitDialog(false)}
          onExit={() => navigate('/tasting/new')}
        />
      )}
    </>
  )
}

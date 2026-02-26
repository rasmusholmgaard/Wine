import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTastingFlow } from '../hooks/useTastingFlow'
import { useApp } from '../context/AppContext'
import TastingFlowLayout from '../components/layout/TastingFlowLayout'
import StepTransition from '../components/layout/StepTransition'
import StepScrollView, { type StepScrollViewHandle } from '../components/tasting/StepScrollView'

export default function OpenTastingPage() {
  const navigate = useNavigate()
  const { addTasting } = useApp()
  const flow = useTastingFlow()
  const {
    data, currentStep, direction,
    setField, goNext, goBack, submit,
    stepLabel, stepTitle, stepIcon, progress, stepQuestions, isAtStart, isAtEnd,
  } = flow

  const scrollViewRef = useRef<StepScrollViewHandle>(null)
  const [questionNav, setQuestionNav] = useState({ canUp: false, canDown: false })
  const [isSaving, setIsSaving] = useState(false)
  const fieldKeys = stepQuestions[currentStep] ?? []

  const handleQuestionChange = useCallback((canUp: boolean, canDown: boolean) => {
    setQuestionNav({ canUp, canDown })
  }, [])

  function handleBack() {
    if (isAtStart) {
      navigate('/tasting/new')
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
    }
  }

  return (
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
  )
}

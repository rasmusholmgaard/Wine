import { useRef, useCallback, useState, useEffect, forwardRef, useImperativeHandle, type ReactNode } from 'react'
import type { TastingNote } from '../../types/tasting'
import StepAppearance, { getAppearanceTitle } from './StepAppearance'
import StepNose, { getNoseTitle } from './StepNose'
import StepPalate, { getPalateTitle } from './StepPalate'
import StepConclusions, { getConclusionsTitle } from './StepConclusions'
import StepWineInfo from './StepWineInfo'

export interface StepScrollViewHandle {
  scrollNext: () => void
  scrollPrev: () => void
  isAtLastQuestion: () => boolean
}

// Single-select fields that trigger auto-scroll to next question on first answer
const AUTO_SCROLL_FIELDS = new Set<keyof TastingNote>([
  'wineType', 'clarity', 'concentration', 'co2', 'sediment', 'color', 'rim', 'viscosity',
  'condition', 'noseIntensity', 'fruitCondition', 'ageEstimate',
  'sweetness', 'tannins', 'acidity', 'alcohol', 'bodyTexture', 'balance', 'finishLength', 'complexity',
  'climate', 'countryGuess',
])

function getRevealTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    wineName: 'Hvad hed vinen?',
    producer: 'Hvem var producenten?',
    vintage: 'Hvad var årgangen?',
  }
  return titles[fieldKey] ?? String(fieldKey)
}

function getFieldTitle(step: number, fieldKey: keyof TastingNote): string {
  if (step === 2) return getNoseTitle(fieldKey)
  if (step === 3) return getPalateTitle(fieldKey)
  if (step === 4) return getConclusionsTitle(fieldKey)
  if (step === 5) return getRevealTitle(fieldKey)
  return getAppearanceTitle(fieldKey)
}

interface StepScrollViewProps {
  step: number
  fieldKeys: (keyof TastingNote)[]
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
  hint?: ReactNode
  onQuestionChange?: (canUp: boolean, canDown: boolean) => void
}

const StepScrollView = forwardRef<StepScrollViewHandle, StepScrollViewProps>(function StepScrollView(
  { step, fieldKeys, data, setField, hint, onQuestionChange }: StepScrollViewProps,
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeIdx, setActiveIdx] = useState(0)

  // Reset scroll position and active index when step changes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.scrollTop = 0
    setActiveIdx(0)
  }, [step])

  // Notify parent whenever navigation availability changes
  useEffect(() => {
    onQuestionChange?.(activeIdx > 0, activeIdx < fieldKeys.length - 1)
  }, [activeIdx, fieldKeys.length, onQuestionChange])

  // Track which question is in view via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const cleanups: (() => void)[] = []

    fieldKeys.forEach((key, idx) => {
      const el = questionRefs.current[key as string]
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.4 &&
            entry.boundingClientRect.height > 0
          ) {
            setActiveIdx(idx)
          }
        },
        { threshold: 0.4, root: container },
      )
      observer.observe(el)
      cleanups.push(() => observer.disconnect())
    })

    return () => cleanups.forEach((fn) => fn())
  }, [fieldKeys])

  const scrollToIndex = useCallback((idx: number) => {
    const key = fieldKeys[idx]
    if (key) {
      setTimeout(() => {
        questionRefs.current[key as string]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 250)
    }
  }, [fieldKeys])

  const scrollToIndexDirect = useCallback((idx: number) => {
    const key = fieldKeys[idx]
    if (key) {
      questionRefs.current[key as string]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [fieldKeys])

  useImperativeHandle(ref, () => ({
    scrollNext: () => scrollToIndex(activeIdx + 1),
    scrollPrev: () => scrollToIndexDirect(activeIdx - 1),
    isAtLastQuestion: () => activeIdx >= fieldKeys.length - 1,
  }), [activeIdx, fieldKeys, scrollToIndex, scrollToIndexDirect])

  function makeSetField(fieldKey: keyof TastingNote, idx: number) {
    return (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => {
      const currentValue = data[key]
      const wasEmpty = !currentValue || (Array.isArray(currentValue) && currentValue.length === 0)
      setField(key, value)
      if (wasEmpty && value && AUTO_SCROLL_FIELDS.has(fieldKey)) {
        scrollToIndex(idx + 1)
      }
    }
  }

  function renderField(fieldKey: keyof TastingNote, sf: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void) {
    if (step === 5) {
      return <StepWineInfo fieldKey={fieldKey} data={data} setField={sf} />
    }
    switch (step) {
      case 1: return <StepAppearance fieldKey={fieldKey} data={data} setField={sf} />
      case 2: return <StepNose fieldKey={fieldKey} data={data} setField={sf} />
      case 3: return <StepPalate fieldKey={fieldKey} data={data} setField={sf} />
      case 4: return <StepConclusions fieldKey={fieldKey} data={data} setField={sf} />
      default: return null
    }
  }

  function getTitle(fieldKey: keyof TastingNote): string {
    if (step === 5) return getRevealTitle(fieldKey)
    return getFieldTitle(step, fieldKey)
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {fieldKeys.map((fieldKey, idx) => {
        const distance = idx - activeIdx
        // Active: full opacity. Next: peeking at 35%. Previous: 70% (already answered). Far: invisible.
        const opacity =
          distance === 0 ? 1 :
          distance === 1 ? 0.35 :
          distance < 0 && distance >= -1 ? 0.7 :
          0

        return (
          <div
            key={fieldKey as string}
            ref={(el) => { questionRefs.current[fieldKey as string] = el }}
            className="min-h-full px-4 pt-8 pb-20 flex flex-col"
            style={{
              scrollSnapAlign: 'start',
              opacity,
              transition: 'opacity 0.3s ease',
              pointerEvents: distance === 0 ? 'auto' : 'none',
            }}
          >
            <h2 className="font-display text-vino-xl text-charcoal font-semibold leading-snug mb-5">
              {getTitle(fieldKey)}
            </h2>
            {renderField(fieldKey, makeSetField(fieldKey, idx))}
          </div>
        )
      })}

      {hint && (
        <div
          className="px-4 py-6"
          style={{ scrollSnapAlign: 'start' }}
        >
          {hint}
        </div>
      )}
    </div>
  )
})

export default StepScrollView

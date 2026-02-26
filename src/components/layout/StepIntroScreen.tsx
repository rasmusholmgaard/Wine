import { useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'

interface StepIntroScreenProps {
  step: number
  totalSteps: number
  icon: string
  title: string
  isFirstStep: boolean
  onContinue: () => void
  onBack: () => void
}

export default function StepIntroScreen({
  step,
  totalSteps,
  icon,
  title,
  isFirstStep,
  onContinue,
  onBack,
}: StepIntroScreenProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('slide-in-right')
    const timer = setTimeout(() => el.classList.remove('slide-in-right'), 350)
    return () => clearTimeout(timer)
  }, [step])

  return (
    <div
      ref={ref}
      className="relative flex flex-col bg-cream"
      style={{ height: '100dvh' }}
    >
      {/* Back button */}
      <div className="px-4 pt-12 pb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid hover:bg-cream-deeper active:scale-[0.94] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <span style={{ fontSize: '5rem', lineHeight: 1 }}>{icon}</span>
        <p className="mt-6 text-vino-xs text-charcoal-soft font-body tracking-wide uppercase">
          Trin {step} af {totalSteps}
        </p>
        <h1 className="mt-2 font-display font-semibold text-charcoal" style={{ fontSize: '2.75rem', lineHeight: 1.1 }}>
          {title}
        </h1>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-4" style={{ borderTop: '1px solid var(--cream-deeper)' }}>
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-card font-body font-semibold text-vino-base bg-sage text-white hover:bg-sage-dark active:scale-[0.98] transition-[transform,opacity,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
        >
          {isFirstStep ? 'Kom i gang' : 'Fortsæt'}
        </button>
      </div>
    </div>
  )
}

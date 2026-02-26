import type { ReactNode } from 'react'
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface TastingFlowLayoutProps {
  stepLabel: string
  stepTitle: string
  stepIcon?: string
  progress: number
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
  isLastStep?: boolean
  canScrollUp?: boolean
  canScrollDown?: boolean
  onScrollUp?: () => void
  onScrollDown?: () => void
  children: ReactNode
}

export default function TastingFlowLayout({
  stepLabel,
  stepTitle,
  stepIcon,
  progress,
  onBack,
  onNext,
  nextLabel,
  nextDisabled = false,
  isLastStep = false,
  canScrollUp = false,
  canScrollDown = false,
  onScrollUp,
  onScrollDown,
  children,
}: TastingFlowLayoutProps) {
  const label = nextLabel ?? (isLastStep ? 'Gem smagning' : 'Næste')
  const showQuestionNav = onScrollUp !== undefined && onScrollDown !== undefined

  return (
    <div className="relative flex flex-col bg-cream" style={{ height: '100dvh' }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid hover:bg-cream-deeper active:scale-[0.94] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage flex-shrink-0"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
        <div className="flex-1">
          <p className="text-vino-xs text-charcoal-soft font-body">{stepLabel}</p>
          <div className="flex items-center gap-1.5">
            {stepIcon && <span className="text-base leading-none">{stepIcon}</span>}
            <p className="text-vino-sm text-charcoal-mid font-body font-medium">{stepTitle}</p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-3">
        <div className="w-full h-1.5 rounded-full bg-cream-deeper overflow-hidden">
          <div
            className="h-full rounded-full bg-sage transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scrollable content — children manage their own scroll */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>

      {/* Floating question nav — anchored to outer wrapper, never clipped */}
      {showQuestionNav && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          <button
            onClick={onScrollUp}
            disabled={!canScrollUp}
            aria-label="Forrige spørgsmål"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid shadow-sm transition-[opacity,transform,background-color] duration-200 hover:bg-cream-deeper active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronUp size={20} strokeWidth={2} />
          </button>
          <button
            onClick={onScrollDown}
            disabled={!canScrollDown}
            aria-label="Næste spørgsmål"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid shadow-sm transition-[opacity,transform,background-color] duration-200 hover:bg-cream-deeper active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-20 disabled:pointer-events-none"
          >
            <ChevronDown size={20} strokeWidth={2} />
          </button>
        </div>
      )}

      {/* Bottom action */}
      <div className="px-4 pb-8 pt-4 bg-cream" style={{ borderTop: '1px solid var(--cream-deeper)' }}>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={cn(
            'w-full py-4 rounded-card font-body font-semibold text-vino-base',
            'transition-[transform,opacity,background-color] duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2',
            'active:scale-[0.98]',
            nextDisabled
              ? 'bg-cream-deeper text-charcoal-soft cursor-not-allowed'
              : isLastStep
              ? 'bg-wine-red text-white hover:opacity-90'
              : 'bg-sage text-white hover:bg-sage-dark',
          )}
        >
          {label}
        </button>
      </div>
    </div>
  )
}

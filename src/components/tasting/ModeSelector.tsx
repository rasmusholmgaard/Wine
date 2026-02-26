import { EyeOff, Eye, Zap, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTasting } from '../../context/TastingContext'
import { cn } from '../../lib/utils'

export default function ModeSelector() {
  const navigate = useNavigate()
  const { reset } = useTasting()

  function startBlind(easyMode: boolean) {
    reset('blind', easyMode)
    navigate('/tasting/blind')
  }

  function startOpen() {
    reset('open', false)
    navigate('/tasting/open')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Blind Tasting */}
      <div
        className="rounded-card bg-cream-dark p-5 cursor-pointer hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200"
        style={{ boxShadow: 'var(--shadow-vino)' }}
        onClick={() => startBlind(false)}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-wine-red/10 flex items-center justify-center flex-shrink-0">
            <EyeOff size={22} className="text-wine-red" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-vino-lg text-charcoal font-semibold">Blind smagning</h2>
            <p className="text-vino-sm text-charcoal-mid font-body mt-1">
              Fuldt struktureret questionnaire. Du kender ikke vinen.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); startBlind(false) }}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-chip',
              'bg-wine-red text-white text-vino-sm font-body font-medium',
              'hover:opacity-90 active:scale-[0.97] transition-[transform,opacity] duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-red',
            )}
          >
            <EyeOff size={14} strokeWidth={2} />
            Hard Mode
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); startBlind(true) }}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-chip',
              'bg-wine-blush/15 text-wine-red border border-wine-blush/40 text-vino-sm font-body font-medium',
              'hover:bg-wine-blush/25 active:scale-[0.97] transition-[transform,background-color] duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-blush',
            )}
          >
            <Zap size={14} strokeWidth={2} />
            Easy Mode
          </button>
        </div>
      </div>

      {/* Open Tasting */}
      <div
        className="rounded-card bg-cream-dark p-5 cursor-pointer hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200"
        style={{ boxShadow: 'var(--shadow-vino)' }}
        onClick={startOpen}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
            <Eye size={22} className="text-sage" strokeWidth={1.8} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-vino-lg text-charcoal font-semibold">Åben smagning</h2>
            <p className="text-vino-sm text-charcoal-mid font-body mt-1">
              Du kender vinen. Kort struktureret note til arkivet.
            </p>
          </div>
        </div>

        <button
          onClick={startOpen}
          className={cn(
            'mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-chip',
            'bg-sage text-white text-vino-sm font-body font-medium',
            'hover:bg-sage-dark active:scale-[0.97] transition-[transform,background-color] duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage',
          )}
        >
          <BookOpen size={14} strokeWidth={2} />
          Start åben smagning
        </button>
      </div>
    </div>
  )
}

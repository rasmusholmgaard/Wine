import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTasting } from '../context/TastingContext'

type Mode = 'blind' | 'open'
type Depth = 'casual' | 'advanced'

const DEPTH_META: Record<Depth, { steps: string; time: string }> = {
  casual: { steps: '5 trin', time: '~2 min' },
  advanced: { steps: '5 trin', time: '~10 min' },
}

const ROUTES: Record<Mode, string> = {
  blind: '/tasting/blind',
  open: '/tasting/open',
}

export default function ModeSelectPage() {
  const navigate = useNavigate()
  const { reset } = useTasting()
  const [mode, setMode] = useState<Mode>('blind')
  const [depth, setDepth] = useState<Depth>('advanced')

  function handleStart() {
    reset(mode, depth)
    navigate(ROUTES[mode])
  }

  const meta = DEPTH_META[depth]

  return (
    <div className="min-h-dvh bg-cream flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid hover:bg-cream-deeper active:scale-[0.94] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Title */}
      <div className="px-5 pb-8">
        <p className="text-vino-sm text-charcoal-soft font-body uppercase tracking-widest mb-1">
          Ny smagning
        </p>
        <h1 className="font-display text-vino-2xl text-charcoal font-semibold leading-snug">
          Vælg format
        </h1>
      </div>

      <div className="px-5 flex flex-col gap-8 flex-1">
        {/* Mode selector: Blind / Åben */}
        <section className="flex flex-col gap-3">
          <p className="font-body text-vino-sm text-charcoal-soft font-medium uppercase tracking-wider">
            Hvad ved du om vinen?
          </p>
          <div className="grid grid-cols-2 gap-2">
            <SegmentCard
              selected={mode === 'blind'}
              onClick={() => setMode('blind')}
              icon="🫣"
              label="Blind"
              description="Du afslører vinen til sidst"
            />
            <SegmentCard
              selected={mode === 'open'}
              onClick={() => setMode('open')}
              icon="🏷️"
              label="Åben"
              description="Du registrerer vinen fra start"
            />
          </div>
        </section>

        {/* Depth selector: Casual / Avanceret */}
        <section className="flex flex-col gap-3">
          <p className="font-body text-vino-sm text-charcoal-soft font-medium uppercase tracking-wider">
            Hvor detaljeret?
          </p>
          <div className="grid grid-cols-2 gap-2">
            <SegmentCard
              selected={depth === 'casual'}
              onClick={() => setDepth('casual')}
              icon="🍷"
              label="Casual"
              description="Hurtige indtryk"
            />
            <SegmentCard
              selected={depth === 'advanced'}
              onClick={() => setDepth('advanced')}
              icon="📋"
              label="Avanceret"
              description="Det fulde smageskema"
            />
          </div>
        </section>

        {/* Summary + CTA */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex gap-2">
            {[meta.steps, meta.time].map((tag) => (
              <span
                key={tag}
                className="text-vino-xs font-body font-medium px-2.5 py-1 rounded-chip bg-sage/15 text-sage"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-card bg-charcoal text-cream font-body font-medium text-vino-base hover:bg-charcoal/90 active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            style={{ boxShadow: 'var(--shadow-vino-lg)' }}
          >
            Start smagning
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="pb-10" />
    </div>
  )
}

interface SegmentCardProps {
  selected: boolean
  onClick: () => void
  icon: string
  label: string
  description: string
}

function SegmentCard({ selected, onClick, icon, label, description }: SegmentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left rounded-card px-4 py-4 transition-[transform,background-color,box-shadow] duration-200
        active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage
        ${selected
          ? 'bg-charcoal text-cream'
          : 'bg-cream-dark text-charcoal hover:bg-cream-deeper'
        }
      `}
      style={selected ? {} : { boxShadow: 'var(--shadow-vino-sm)' }}
    >
      <span className="text-2xl block mb-2">{icon}</span>
      <span className={`font-display text-vino-base font-semibold block mb-0.5 ${selected ? 'text-cream' : 'text-charcoal'}`}>
        {label}
      </span>
      <span className={`font-body text-vino-xs leading-snug ${selected ? 'text-cream/70' : 'text-charcoal-soft'}`}>
        {description}
      </span>
    </button>
  )
}

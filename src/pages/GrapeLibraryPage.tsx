import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import BottomNav from '../components/layout/BottomNav'
import { GRAPES, RED_GRAPES, WHITE_GRAPES, type Grape } from '../data/grapes'
import { cn } from '../lib/utils'

function ScaleDots({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="w-[6px] h-[6px] rounded-full"
          style={{ backgroundColor: i < value ? color : 'rgba(0,0,0,0.12)' }}
        />
      ))}
    </div>
  )
}

function GrapeCard({ grape, onClick }: { grape: Grape; onClick: () => void }) {
  const isRed = grape.type === 'red'
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-card bg-white overflow-hidden active:scale-[0.98] transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      style={{ boxShadow: 'var(--shadow-vino)' }}
    >
      {/* Accent stripe */}
      <div className="h-1" style={{ backgroundColor: grape.accentColor }} />

      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-vino-lg text-charcoal font-semibold leading-tight">
              {grape.name}
            </h3>
            <p className="text-vino-xs font-body italic text-charcoal-soft mt-0.5">
              {grape.tagline}
            </p>
          </div>
          <span
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-bold text-white"
            style={{ backgroundColor: grape.accentColor }}
          >
            {isRed ? '🍷' : '🥂'}
          </span>
        </div>

        {/* Scale indicators */}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {isRed && grape.tannins !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-vino-xs font-body text-charcoal-soft w-14">Tannins</span>
              <ScaleDots value={grape.tannins} color={grape.accentColor} />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-vino-xs font-body text-charcoal-soft w-14">Colour</span>
            <ScaleDots value={grape.color} color={grape.accentColor} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-vino-xs font-body text-charcoal-soft w-14">Nose</span>
            <ScaleDots value={grape.nose} color={grape.accentColor} />
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GrapeLibraryPage() {
  const [tab, setTab] = useState<'red' | 'white'>('red')
  const navigate = useNavigate()
  const grapes = tab === 'red' ? RED_GRAPES : WHITE_GRAPES

  return (
    <AppShell withNav>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <p className="text-vino-sm text-charcoal-soft font-body uppercase tracking-widest mb-1">
          Studie
        </p>
        <h1 className="font-display text-vino-3xl text-charcoal font-semibold">
          Druebibliotek
        </h1>
        <p className="text-vino-sm text-charcoal-soft font-body mt-1">
          Lær de klassiske druer at kende
        </p>
      </div>

      {/* Red / White toggle */}
      <div className="px-5 mb-5">
        <div
          className="flex rounded-card bg-cream-dark p-1"
          style={{ boxShadow: 'var(--shadow-vino)' }}
        >
          {(['red', 'white'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2 rounded-input text-vino-sm font-body font-medium transition-[background-color,color] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage',
                tab === t
                  ? 'bg-white text-charcoal'
                  : 'text-charcoal-soft hover:text-charcoal-mid',
              )}
              style={tab === t ? { boxShadow: 'var(--shadow-vino)' } : undefined}
            >
              {t === 'red' ? '🍷 Røde' : '🥂 Hvide'}
            </button>
          ))}
        </div>
      </div>

      {/* Grape list */}
      <div className="flex-1 px-5 pb-4">
        <div className="flex flex-col gap-3">
          {grapes.map((grape) => (
            <GrapeCard
              key={grape.id}
              grape={grape}
              onClick={() => navigate(`/library/${grape.id}`)}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </AppShell>
  )
}

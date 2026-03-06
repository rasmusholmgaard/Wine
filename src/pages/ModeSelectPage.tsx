import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTasting } from '../context/TastingContext'

export default function ModeSelectPage() {
  const navigate = useNavigate()
  const { reset } = useTasting()

  function handleSelect(mode: 'casual' | 'advanced') {
    reset(mode)
    navigate(mode === 'casual' ? '/tasting/casual' : '/tasting/blind')
  }

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

      {/* Mode cards */}
      <div className="px-5 flex flex-col gap-4 flex-1">
        {/* Casual */}
        <button
          onClick={() => handleSelect('casual')}
          className="w-full text-left rounded-card bg-cream-dark px-6 py-6 hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          style={{ boxShadow: 'var(--shadow-vino-lg)' }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl mt-0.5">🍷</span>
            <div>
              <h2 className="font-display text-vino-xl text-charcoal font-semibold mb-1">
                Casual
              </h2>
              <p className="font-body text-vino-sm text-charcoal-soft leading-relaxed">
                Hurtige indtryk. Perfekt til en afslappet aften.
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['4 trin', '~2 min'].map((tag) => (
                  <span key={tag} className="text-vino-xs font-body font-medium px-2 py-0.5 rounded-chip bg-sage/15 text-sage">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>

        {/* Advanced */}
        <button
          onClick={() => handleSelect('advanced')}
          className="w-full text-left rounded-card bg-cream-dark px-6 py-6 hover:bg-cream-deeper active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          style={{ boxShadow: 'var(--shadow-vino-lg)' }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl mt-0.5">📋</span>
            <div>
              <h2 className="font-display text-vino-xl text-charcoal font-semibold mb-1">
                Avanceret
              </h2>
              <p className="font-body text-vino-sm text-charcoal-soft leading-relaxed">
                Det fulde smageskema.
              </p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['5 trin', '~10 min'].map((tag) => (
                  <span key={tag} className="text-vino-xs font-body font-medium px-2 py-0.5 rounded-chip bg-cream-deeper text-charcoal-mid">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="pb-10" />
    </div>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import { GRAPES, type Grape } from '../data/grapes'

function ScaleRow({ label, value, max = 5, accentColor }: { label: string; value: number; max?: number; accentColor: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-vino-sm font-body text-charcoal-soft w-16 shrink-0">{label}</span>
      <div className="flex gap-1.5 flex-1">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className="w-[10px] h-[10px] rounded-full"
            style={{ backgroundColor: i < value ? accentColor : 'rgba(0,0,0,0.10)' }}
          />
        ))}
      </div>
    </div>
  )
}

export default function GrapeDetailPage() {
  const { grape: grapeId } = useParams<{ grape: string }>()
  const navigate = useNavigate()
  const grape = GRAPES.find((g) => g.id === grapeId)

  if (!grape) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center flex-1 px-5 py-20 text-center">
          <p className="font-display text-vino-xl text-charcoal-mid">Grape not found</p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 text-sage font-body text-vino-sm underline"
          >
            Back to library
          </button>
        </div>
      </AppShell>
    )
  }

  const isRed = grape.type === 'red'

  return (
    <AppShell>
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: grape.accentColor }} />

      {/* Back button */}
      <div className="px-5 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-charcoal-soft font-body text-vino-sm hover:text-charcoal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Tilbage
        </button>
      </div>

      {/* Hero section */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-display text-vino-3xl text-charcoal font-semibold leading-tight">
              {grape.name}
            </h1>
            <p className="text-vino-base font-body italic text-charcoal-soft mt-1">
              {grape.tagline}
            </p>
            <p className="text-vino-xs font-body text-charcoal-soft mt-3 leading-relaxed">
              {grape.regions}
            </p>
          </div>
          <div
            className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: grape.accentColor + '18' }}
          >
            {isRed ? '🍷' : '🥂'}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-cream-dark" />

      {/* Profile scales */}
      <div className="px-5 py-6">
        <h2 className="font-display text-vino-lg text-charcoal font-semibold mb-4">
          Profil
        </h2>
        <div className="flex flex-col gap-3.5">
          {isRed && grape.tannins !== undefined && (
            <ScaleRow label="Tannins" value={grape.tannins} accentColor={grape.accentColor} />
          )}
          <ScaleRow label="Colour" value={grape.color} accentColor={grape.accentColor} />
          <ScaleRow label="Nose" value={grape.nose} accentColor={grape.accentColor} />
          <ScaleRow label="Acidity" value={grape.acidity} accentColor={grape.accentColor} />
          <ScaleRow label="Body" value={grape.body} accentColor={grape.accentColor} />
        </div>

        {/* Colour + nose descriptors */}
        <div className="mt-5 rounded-card bg-white p-4 flex flex-col gap-2" style={{ boxShadow: 'var(--shadow-vino)' }}>
          <div className="flex gap-2">
            <span className="text-vino-xs font-body font-medium text-charcoal-soft w-12 shrink-0 pt-0.5">Colour</span>
            <p className="text-vino-sm font-body text-charcoal">{grape.colorDesc}</p>
          </div>
          <div className="h-px bg-cream-dark" />
          <div className="flex gap-2">
            <span className="text-vino-xs font-body font-medium text-charcoal-soft w-12 shrink-0 pt-0.5">Nose</span>
            <p className="text-vino-sm font-body text-charcoal">{grape.noseDesc}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-cream-dark" />

      {/* About */}
      <div className="px-5 py-6">
        <h2 className="font-display text-vino-lg text-charcoal font-semibold mb-3">
          Om druet
        </h2>
        <p className="text-vino-sm font-body text-charcoal leading-relaxed">
          {grape.knownFor}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-cream-dark" />

      {/* Blind tasting clues */}
      <div className="px-5 py-6 pb-12">
        <h2 className="font-display text-vino-lg text-charcoal font-semibold mb-4">
          Hvad skal du kigge efter?
        </h2>
        <div className="flex flex-col gap-3">
          {grape.blindTasting.map((clue, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="shrink-0 mt-[3px] text-vino-sm" style={{ color: grape.accentColor }}>
                →
              </span>
              <p className="text-vino-sm font-body text-charcoal leading-relaxed">{clue}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

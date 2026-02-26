import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Home } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import { useApp } from '../context/AppContext'
import { cn } from '../lib/utils'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-vino-xs font-body font-semibold uppercase tracking-widest text-charcoal-soft mb-3">{title}</h3>
      <div
        className="rounded-card bg-cream-dark p-4 flex flex-col gap-2"
        style={{ boxShadow: 'var(--shadow-vino)' }}
      >
        {children}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | string[] | number | null | boolean }) {
  if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return null
  const display = Array.isArray(value) ? value.join(', ') : String(value)
  return (
    <div className="flex justify-between gap-4">
      <span className="text-vino-sm text-charcoal-soft font-body flex-shrink-0">{label}</span>
      <span className="text-vino-sm text-charcoal font-body text-right">{display}</span>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getColorDot(color: string, wineType: string): string {
  if (wineType === 'white') {
    if (color === 'Rav' || color === 'Ravfarvet') return '#C9A84C'
    if (color === 'Gylden') return '#E8C84A'
    return '#F4E06A'
  }
  if (wineType === 'rosé') return '#F4A7B9'
  if (color === 'Granatrød') return '#8B2635'
  if (color === 'Rubin' || color === 'Rubinrød') return '#9B3040'
  return '#B05070'
}

export default function TastingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tastings } = useApp()
  const tasting = tastings.find((t) => t.id === id)

  if (!tasting) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="font-display text-vino-lg text-charcoal-mid">Smagning ikke fundet</p>
          <button onClick={() => navigate('/')} className="mt-4 text-vino-sm text-sage font-body">
            ← Gå til hjem
          </button>
        </div>
      </AppShell>
    )
  }

  const dotColor = getColorDot(tasting.color, tasting.wineType)

  const title = tasting.wineName
    ? tasting.wineName
    : tasting.grapeGuess || 'Blind smagning'

  const hasReveal = tasting.mode === 'blind' && (tasting.wineName || tasting.producer || tasting.vintage)

  return (
    <AppShell>
      {/* Header */}
      <div
        className="relative px-5 pt-12 pb-6"
        style={{ background: 'var(--cream-dark)', boxShadow: 'var(--shadow-vino)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cream text-charcoal-mid hover:bg-cream-deeper active:scale-[0.94] transition-[transform,background-color] duration-200 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: dotColor }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-vino-2xl text-charcoal font-semibold leading-tight">
              {title}
            </h1>
            {tasting.producer && (
              <p className="text-vino-base text-charcoal-mid font-body mt-0.5">{tasting.producer}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-vino-xs font-body font-medium px-2 py-1 rounded-chip',
                  tasting.mode === 'blind'
                    ? 'bg-wine-red/10 text-wine-red'
                    : 'bg-sage/10 text-sage-dark',
                )}
              >
                {tasting.mode === 'blind' ? <EyeOff size={11} /> : <Eye size={11} />}
                {tasting.mode === 'blind' ? 'Blind' : 'Åben'}
              </span>
              <span className="text-vino-xs text-charcoal-soft font-body">{formatDate(tasting.createdAt)}</span>
            </div>
          </div>
          {tasting.score != null && (
            <div
              className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'var(--cream)' }}
            >
              <span className="font-display text-vino-xl font-semibold text-wine-red">{tasting.score}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-6">
        {/* Revealed wine info (blind tasting only) */}
        {hasReveal && (
          <Section title="🏷️ Afsløring">
            <Row label="Vin" value={tasting.wineName} />
            <Row label="Producent" value={tasting.producer} />
            <Row label="Årgang" value={tasting.vintage} />
          </Section>
        )}

        {/* Conclusions */}
        <Section title="Konklusion">
          <Row label="Drue" value={tasting.grapeGuess} />
          <Row label="Land" value={tasting.countryGuess} />
          <Row label="Region" value={tasting.regionGuess} />
          {!tasting.vintage && <Row label="Årgangsgæt" value={tasting.vintageEstimate} />}
          <Row label="Klima" value={tasting.climate} />
          <Row label="Kvalitet" value={tasting.qualityLevel} />
        </Section>

        {/* Personal notes */}
        {tasting.personalNotes && (
          <Section title="Personlige noter">
            <p className="text-vino-base text-charcoal font-body">{tasting.personalNotes}</p>
          </Section>
        )}

        {/* Appearance */}
        <Section title="Syn">
          <Row label="Klarhed" value={tasting.clarity} />
          <Row label="Koncentration" value={tasting.concentration} />
          <Row label="Farve" value={tasting.color} />
          <Row label="Kant" value={tasting.rim} />
          <Row label="Viskositet" value={tasting.viscosity} />
          <Row label="CO₂" value={tasting.co2} />
          <Row label="Sedimenter" value={tasting.sediment} />
        </Section>

        {/* Nose */}
        <Section title="Næse">
          <Row label="Intensitet" value={tasting.noseIntensity} />
          <Row label="Frugtkondition" value={tasting.fruitCondition} />
          <Row label="Alder" value={tasting.ageEstimate} />
          <Row label="Primære" value={tasting.primaryAromas} />
          {tasting.primaryAromasCustom && <Row label="Primære (egne)" value={tasting.primaryAromasCustom} />}
          <Row label="Sekundære" value={tasting.secondaryAromas} />
          {tasting.secondaryAromasCustom && <Row label="Sekundære (egne)" value={tasting.secondaryAromasCustom} />}
          <Row label="Tertiære" value={tasting.tertiaryAromas} />
          {tasting.tertiaryAromasCustom && <Row label="Tertiære (egne)" value={tasting.tertiaryAromasCustom} />}
          {tasting.condition && tasting.condition !== 'Ren' && <Row label="Tilstand" value={tasting.condition} />}
        </Section>

        {/* Palate */}
        <Section title="Gane">
          <Row label="Sødme" value={tasting.sweetness} />
          <Row label="Tanniner" value={tasting.tannins} />
          <Row label="Syre" value={tasting.acidity} />
          <Row label="Alkohol" value={tasting.alcohol} />
          {tasting.bodyTexture && <Row label="Krop/Tekstur" value={tasting.bodyTexture} />}
          <Row label="Balance" value={tasting.balance} />
          <Row label="Smagens længde" value={tasting.finishLength} />
          <Row label="Kompleksitet" value={tasting.complexity} />
          {tasting.primaryFlavorsText && <Row label="Primære smage" value={tasting.primaryFlavorsText} />}
          {tasting.secondaryFlavorsText && <Row label="Sekundære smage" value={tasting.secondaryFlavorsText} />}
          {tasting.tertiaryFlavorsText && <Row label="Tertiære smage" value={tasting.tertiaryFlavorsText} />}
        </Section>
      </div>

      {/* Footer */}
      <div className="px-5 pb-10">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-card bg-cream-dark text-charcoal-mid font-body text-vino-sm hover:bg-cream-deeper active:scale-[0.97] transition-[transform,background-color] duration-200"
          style={{ boxShadow: 'var(--shadow-vino)' }}
        >
          <Home size={16} strokeWidth={2} />
          Gå til forsiden
        </button>
      </div>
    </AppShell>
  )
}

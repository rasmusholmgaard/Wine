import { useState } from 'react'
import { ScanLine, Loader2 } from 'lucide-react'
import type { TastingNote } from '../../types/tasting'
import TextInput from '../primitives/TextInput'
import PhotoCapture from '../primitives/PhotoCapture'
import ChipButton from '../primitives/ChipButton'
import { COUNTRIES, REGIONS } from '../../data/regionTaxonomy'
import { analyzeLabel } from '../../lib/vision'

interface RevealStepProps {
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-vino-xl text-charcoal font-semibold leading-snug">
      {children}
    </h2>
  )
}

export default function RevealStep({ data, setField }: RevealStepProps) {
  const [scanning, setScanning] = useState(false)
  const [scanError, setScanError] = useState<string | null>(null)

  const regionsForCountry = data.wineCountry && REGIONS[data.wineCountry]
    ? REGIONS[data.wineCountry]
    : []

  async function handleScan() {
    if (!data.labelPhotoUrl) return
    setScanning(true)
    setScanError(null)
    try {
      const result = await analyzeLabel(data.labelPhotoUrl)
      if (result.wineName) setField('wineName', result.wineName)
      if (result.producer) setField('producer', result.producer)
      if (result.grape) setField('wineGrape', result.grape)
      if (result.vintage) setField('vintage', result.vintage)
      if (result.country) setField('wineCountry', result.country)
      if (result.region) setField('wineRegion', result.region)
    } catch (err) {
      console.error('analyzeLabel error:', err)
      setScanError('Kunne ikke analysere etiketten. Prøv igen.')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
    <div className="flex flex-col gap-10 px-4 pt-8 pb-36">
      {/* Photo */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Foto af etiketten</SectionLabel>
        <PhotoCapture
          value={data.labelPhotoUrl ?? ''}
          onChange={(url) => setField('labelPhotoUrl', url)}
        />
        {data.labelPhotoUrl && (
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-card bg-sage/15 text-sage font-body font-medium text-vino-sm active:scale-[0.98] transition-transform disabled:opacity-60"
          >
            {scanning ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyserer…
              </>
            ) : (
              <>
                <ScanLine size={16} />
                Analyser etiket
              </>
            )}
          </button>
        )}
        {scanError && (
          <p className="text-vino-xs text-red-500 font-body">{scanError}</p>
        )}
      </section>

      {/* Wine Name */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Vinens navn</SectionLabel>
        <TextInput
          value={data.wineName ?? ''}
          onChange={(v) => setField('wineName', v)}
          placeholder="F.eks. Château Margaux..."
        />
      </section>

      {/* Producer */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Producent</SectionLabel>
        <TextInput
          value={data.producer ?? ''}
          onChange={(v) => setField('producer', v)}
          placeholder="F.eks. Domaine Leflaive..."
        />
      </section>

      {/* Grape */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Drue</SectionLabel>
        <TextInput
          value={data.wineGrape ?? ''}
          onChange={(v) => setField('wineGrape', v)}
          placeholder="F.eks. Pinot Noir..."
        />
      </section>

      {/* Country & Region */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Land og region</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <ChipButton
              key={c}
              label={c}
              selected={data.wineCountry === c}
              onClick={() => setField('wineCountry', c)}
              size="sm"
            />
          ))}
        </div>
        {data.wineCountry && (
          <div className="flex flex-col gap-3">
            {regionsForCountry.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {regionsForCountry.map((r) => (
                  <ChipButton
                    key={r}
                    label={r}
                    selected={data.wineRegion === r}
                    onClick={() => setField('wineRegion', r)}
                    size="sm"
                  />
                ))}
              </div>
            )}
            <TextInput
              value={data.wineRegion ?? ''}
              onChange={(v) => setField('wineRegion', v)}
              placeholder={regionsForCountry.length > 0 ? 'Eller skriv fritekst...' : 'Region...'}
            />
          </div>
        )}
      </section>

      {/* Vintage */}
      <section className="flex flex-col gap-4">
        <SectionLabel>Årgang</SectionLabel>
        <TextInput
          value={data.vintage ?? ''}
          onChange={(v) => setField('vintage', v)}
          placeholder="F.eks. 2019..."
        />
      </section>
    </div>
    </div>
  )
}

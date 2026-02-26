import type { TastingNote } from '../../types/tasting'
import ChipButton from '../primitives/ChipButton'
import SegmentedControl from '../primitives/SegmentedControl'
import TextInput from '../primitives/TextInput'

interface StepPalateProps {
  fieldKey: keyof TastingNote
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

const SWEETNESS_OPTIONS = ['Knastør', 'Tør', 'Halvtør', 'Sød']
const TANNIN_OPTIONS = ['Lav', 'Medium-', 'Medium', 'Medium+', 'Høj']
const ACIDITY_OPTIONS = ['Lav', 'Medium-', 'Medium', 'Medium+', 'Høj']
const ALCOHOL_OPTIONS = ['Lav', 'Medium', 'Høj']
const FINISH_OPTIONS = ['Kort', 'Medium', 'Lang']
const COMPLEXITY_OPTIONS = ['Lav', 'Medium', 'Høj']
const BALANCE_OPTIONS = ['Ja', 'Nej']

export function getPalateTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    sweetness: 'Hvad er sødme-niveauet?',
    tannins: 'Hvad er tannin-niveauet?',
    acidity: 'Hvad er syreniveauet?',
    alcohol: 'Hvad er alkohol-niveauet?',
    bodyTexture: 'Beskriv krop og tekstur',
    primaryFlavorsText: 'Primære smagsnoter',
    secondaryFlavorsText: 'Sekundære smagsnoter',
    tertiaryFlavorsText: 'Tertiære smagsnoter',
    balance: 'Er vinen i balance?',
    finishLength: 'Hvad er smagens længde?',
    complexity: 'Hvad er kompleksiteten?',
  }
  return titles[fieldKey] ?? String(fieldKey)
}

export default function StepPalate({ fieldKey, data, setField }: StepPalateProps) {
  switch (fieldKey) {
    case 'sweetness':
      return <SegmentedControl options={SWEETNESS_OPTIONS} value={data.sweetness || null} onChange={(v) => setField('sweetness', v)} />

    case 'tannins':
      return <SegmentedControl options={TANNIN_OPTIONS} value={data.tannins || null} onChange={(v) => setField('tannins', v)} />

    case 'acidity':
      return <SegmentedControl options={ACIDITY_OPTIONS} value={data.acidity || null} onChange={(v) => setField('acidity', v)} />

    case 'alcohol':
      return <SegmentedControl options={ALCOHOL_OPTIONS} value={data.alcohol || null} onChange={(v) => setField('alcohol', v)} />

    case 'bodyTexture':
      return (
        <TextInput
          value={data.bodyTexture}
          onChange={(v) => setField('bodyTexture', v)}
          placeholder="F.eks. silkeblød, elegant, lang..."
          autoFocus
        />
      )

    case 'primaryFlavorsText':
      return (
        <TextInput
          value={data.primaryFlavorsText}
          onChange={(v) => setField('primaryFlavorsText', v)}
          placeholder="F.eks. rød bær, citrus, stenfrugt..."
          multiline
          rows={3}
          autoFocus
        />
      )

    case 'secondaryFlavorsText':
      return (
        <TextInput
          value={data.secondaryFlavorsText}
          onChange={(v) => setField('secondaryFlavorsText', v)}
          placeholder="F.eks. vanilje, smør, ristet brød..."
          multiline
          rows={3}
          autoFocus
        />
      )

    case 'tertiaryFlavorsText':
      return (
        <TextInput
          value={data.tertiaryFlavorsText}
          onChange={(v) => setField('tertiaryFlavorsText', v)}
          placeholder="F.eks. svamp, læder, tørret frugt..."
          multiline
          rows={3}
          autoFocus
        />
      )

    case 'balance':
      return (
        <div className="flex gap-3">
          {BALANCE_OPTIONS.map((opt) => (
            <div key={opt} className="flex-1">
              <ChipButton label={opt} selected={data.balance === opt} onClick={() => setField('balance', opt)} />
            </div>
          ))}
        </div>
      )

    case 'finishLength':
      return <SegmentedControl options={FINISH_OPTIONS} value={data.finishLength || null} onChange={(v) => setField('finishLength', v)} />

    case 'complexity':
      return <SegmentedControl options={COMPLEXITY_OPTIONS} value={data.complexity || null} onChange={(v) => setField('complexity', v)} />

    default:
      return null
  }
}

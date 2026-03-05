import type { TastingNote } from '../../types/tasting'
import ChipButton from '../primitives/ChipButton'
import SegmentedControl from '../primitives/SegmentedControl'
import TagChipGroup from '../primitives/TagChipGroup'
import TextInput from '../primitives/TextInput'
import ScoreInput from '../primitives/ScoreInput'
import GrapeAutocomplete from '../primitives/GrapeAutocomplete'
import { COUNTRIES, REGIONS } from '../../data/regionTaxonomy'
import { QUALITY_LEVELS } from '../../data/aromaOptions'

interface StepConclusionsProps {
  fieldKey: keyof TastingNote
  data: TastingNote
  setField: (key: keyof TastingNote, value: TastingNote[keyof TastingNote]) => void
}

const CLIMATE_OPTIONS = ['Køligt', 'Køligt-moderat', 'Moderat', 'Moderat-varmt', 'Varmt']
const VINTAGE_OPTIONS = ['1–3 år', '3–5 år', '5–10 år', '10+ år']

export function getConclusionsTitle(fieldKey: keyof TastingNote): string {
  const titles: Partial<Record<keyof TastingNote, string>> = {
    climate: 'Hvad er klimaet?',
    grapeGuess: 'Hvad er din druegæt?',
    countryGuess: 'Hvad er dit landegæt?',
    regionGuess: 'Hvad er din regionsgæt?',
    vintageEstimate: 'Hvad er årgangen?',
    qualityLevel: 'Hvad er kvalitetsniveauet?',
    score: 'Hvad er din samlede bedømmelse?',
    personalNotes: 'Personlige noter',
  }
  return titles[fieldKey] ?? fieldKey
}

export default function StepConclusions({ fieldKey, data, setField }: StepConclusionsProps) {
  const regionsForCountry = data.countryGuess && REGIONS[data.countryGuess]
    ? REGIONS[data.countryGuess]
    : []

  switch (fieldKey) {
    case 'climate':
      return <SegmentedControl options={CLIMATE_OPTIONS} value={data.climate || null} onChange={(v) => setField('climate', v)} />

    case 'grapeGuess':
      return (
        <GrapeAutocomplete
          value={data.grapeGuess}
          onChange={(v) => setField('grapeGuess', v)}
          autoFocus
        />
      )

    case 'countryGuess':
      return (
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <ChipButton key={c} label={c} selected={data.countryGuess === c} onClick={() => setField('countryGuess', c)} size="sm" />
          ))}
        </div>
      )

    case 'regionGuess':
      return (
        <div className="flex flex-col gap-3">
          {regionsForCountry.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {regionsForCountry.map((r) => (
                <ChipButton key={r} label={r} selected={data.regionGuess === r} onClick={() => setField('regionGuess', r)} size="sm" />
              ))}
            </div>
          ) : null}
          <TextInput
            value={data.regionGuess}
            onChange={(v) => setField('regionGuess', v)}
            placeholder={regionsForCountry.length > 0 ? 'Eller skriv fritekst...' : 'Region...'}
          />
        </div>
      )

    case 'vintageEstimate':
      return (
        <div className="flex flex-col gap-3">
          <SegmentedControl options={VINTAGE_OPTIONS} value={data.vintageEstimate || null} onChange={(v) => setField('vintageEstimate', v)} />
          <TextInput
            value={['1–3 år', '3–5 år', '5–10 år', '10+ år'].includes(data.vintageEstimate) ? '' : data.vintageEstimate}
            onChange={(v) => setField('vintageEstimate', v)}
            placeholder="Eller specifikt årstal..."
          />
        </div>
      )

    case 'qualityLevel':
      return (
        <TagChipGroup
          options={QUALITY_LEVELS}
          selected={data.qualityLevel ? [data.qualityLevel] : []}
          onChange={(v) => setField('qualityLevel', v[v.length - 1] ?? '')}
          maxSelect={1}
        />
      )

    case 'score':
      return (
        <ScoreInput
          value={data.score}
          onChange={(v) => setField('score', v)}
        />
      )

    case 'personalNotes':
      return (
        <TextInput
          value={data.personalNotes}
          onChange={(v) => setField('personalNotes', v)}
          placeholder="Dine tanker om vinen..."
          multiline
          rows={5}
          autoFocus
        />
      )

    default:
      return null
  }
}

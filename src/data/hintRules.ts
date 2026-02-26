import type { TastingNote } from '../types/tasting'
import type { HintSuggestion } from '../types/hints'

interface Rule {
  test: (t: Partial<TastingNote>) => boolean
  suggestions: HintSuggestion[]
}

function includesAroma(aromas: string[] | undefined, aroma: string): boolean {
  return aromas != null && aromas.includes(aroma)
}

const RULES: Rule[] = [
  // Pinot Noir
  {
    test: (t) => t.color === 'Lilla' || t.color === 'Rubin',
    suggestions: [{ grape: 'Pinot Noir', country: 'France', region: 'Bourgogne', label: 'Pinot Noir (Bourgogne)' }],
  },
  {
    test: (t) => (t.color === 'Lilla' || t.color === 'Rubin') && t.acidity === 'Høj' && (t.tannins === 'Lav' || t.tannins === 'Medium-'),
    suggestions: [{ grape: 'Pinot Noir', country: 'France', region: 'Bourgogne', label: 'Pinot Noir (Bourgogne)' }],
  },
  // Nebbiolo / Barolo
  {
    test: (t) => t.color === 'Granatrød' && t.tannins === 'Høj' && t.acidity === 'Høj',
    suggestions: [
      { grape: 'Nebbiolo', country: 'Italy', region: 'Piemonte', label: 'Nebbiolo (Barolo / Barbaresco)' },
    ],
  },
  // Cabernet Sauvignon
  {
    test: (t) => t.color === 'Granatrød' && t.tannins === 'Høj' && (t.acidity === 'Medium' || t.acidity === 'Medium-'),
    suggestions: [
      { grape: 'Cabernet Sauvignon', country: 'France', region: 'Bordeaux', label: 'Cabernet Sauvignon (Bordeaux)' },
      { grape: 'Cabernet Sauvignon', country: 'USA', region: 'Napa Valley', label: 'Cabernet Sauvignon (Napa)' },
    ],
  },
  // Chablis / Unoaked Chardonnay
  {
    test: (t) => t.wineType === 'white' && t.color === 'Strå' && t.acidity === 'Høj' && !includesAroma(t.secondaryAromas, 'Fad'),
    suggestions: [
      { grape: 'Chardonnay', country: 'France', region: 'Bourgogne', label: 'Chablis / Unoaked Chardonnay' },
    ],
  },
  // Oaked Chardonnay
  {
    test: (t) => t.wineType === 'white' && (t.color === 'Gylden' || t.color === 'Gul') && includesAroma(t.secondaryAromas, 'Fad'),
    suggestions: [
      { grape: 'Chardonnay', country: 'France', region: 'Bourgogne', label: 'White Burgundy / Oaked Chardonnay' },
    ],
  },
  // Riesling
  {
    test: (t) => t.wineType === 'white' && t.color === 'Strå' && t.acidity === 'Høj' && t.finishLength === 'Lang',
    suggestions: [
      { grape: 'Riesling', country: 'Germany', region: 'Mosel', label: 'Riesling (Mosel)' },
      { grape: 'Riesling', country: 'France', region: 'Alsace', label: 'Riesling (Alsace)' },
    ],
  },
  // Grenache / Southern Rhône
  {
    test: (t) => (t.color === 'Rubin' || t.color === 'Granatrød') && t.tannins === 'Medium' && includesAroma(t.primaryAromas, 'Red Berry'),
    suggestions: [
      { grape: 'Grenache', country: 'France', region: 'Rhône', label: 'Grenache (Southern Rhône)' },
    ],
  },
  // Sauvignon Blanc
  {
    test: (t) => t.wineType === 'white' && t.acidity === 'Høj' && includesAroma(t.primaryAromas, 'Citrus'),
    suggestions: [
      { grape: 'Sauvignon Blanc', country: 'France', region: 'Loire', label: 'Sauvignon Blanc (Loire)' },
      { grape: 'Sauvignon Blanc', country: 'New Zealand', region: 'Marlborough', label: 'Sauvignon Blanc (Marlborough)' },
    ],
  },
  // Syrah / Shiraz
  {
    test: (t) => t.color === 'Granatrød' && t.tannins === 'Høj' && includesAroma(t.primaryAromas, 'Black Berry'),
    suggestions: [
      { grape: 'Syrah', country: 'France', region: 'Rhône', label: 'Syrah (Northern Rhône)' },
      { grape: 'Shiraz', country: 'Australia', region: 'Barossa Valley', label: 'Shiraz (Barossa Valley)' },
    ],
  },
]

export function deriveHints(state: Partial<TastingNote>): HintSuggestion[] {
  const results: HintSuggestion[] = []
  const seen = new Set<string>()

  for (const rule of RULES) {
    if (rule.test(state)) {
      for (const suggestion of rule.suggestions) {
        if (!seen.has(suggestion.label)) {
          results.push(suggestion)
          seen.add(suggestion.label)
        }
      }
    }
  }

  return results.slice(0, 4)
}

export interface TastingNote {
  id: string
  mode: 'blind'
  tastingMode: 'casual' | 'advanced'
  createdAt: string
  wineType: 'white' | 'red' | 'rosé' | ''

  // Step 1: Appearance
  clarity: string
  concentration: string
  co2: string
  sediment: string
  color: string
  rim: string
  viscosity: string

  // Step 2: Nose
  condition: string
  noseIntensity: string
  fruitCondition: string
  ageEstimate: string
  primaryAromas: string[]
  primaryAromasCustom: string
  secondaryAromas: string[]
  secondaryAromasCustom: string
  tertiaryAromas: string[]
  tertiaryAromasCustom: string

  // Step 3: Palate
  sweetness: string
  tannins: string
  acidity: string
  alcohol: string
  bodyTexture: string
  primaryFlavorsText: string
  secondaryFlavorsText: string
  tertiaryFlavorsText: string
  balance: string
  finishLength: string
  complexity: string

  // Step 4: Conclusions
  climate: string
  grapeGuess: string
  countryGuess: string
  regionGuess: string
  vintageEstimate: string
  qualityLevel: string
  score: number | null
  personalNotes: string

  // Open tasting / Blind reveal extras
  wineName?: string
  producer?: string
  vintage?: string
  wineCountry?: string
  wineRegion?: string
  labelPhotoUrl?: string

  // Casual mode fields
  casualAromas: string[]
  casualFlavors: string[]
}

export type CompletedTasting = TastingNote & {
  isCompleted: true
}

export const EMPTY_TASTING: TastingNote = {
  id: '',
  mode: 'blind',
  tastingMode: 'advanced',
  createdAt: '',
  wineType: '',
  clarity: '',
  concentration: '',
  co2: '',
  sediment: '',
  color: '',
  rim: '',
  viscosity: '',
  condition: '',
  noseIntensity: '',
  fruitCondition: '',
  ageEstimate: '',
  primaryAromas: [],
  primaryAromasCustom: '',
  secondaryAromas: [],
  secondaryAromasCustom: '',
  tertiaryAromas: [],
  tertiaryAromasCustom: '',
  sweetness: '',
  tannins: '',
  acidity: '',
  alcohol: '',
  bodyTexture: '',
  primaryFlavorsText: '',
  secondaryFlavorsText: '',
  tertiaryFlavorsText: '',
  balance: '',
  finishLength: '',
  complexity: '',
  climate: '',
  grapeGuess: '',
  countryGuess: '',
  regionGuess: '',
  vintageEstimate: '',
  qualityLevel: '',
  score: null,
  personalNotes: '',
  casualAromas: [],
  casualFlavors: [],
}

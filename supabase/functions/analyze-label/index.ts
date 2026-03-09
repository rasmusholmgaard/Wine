import Anthropic from 'npm:@anthropic-ai/sdk'

const VALID_COUNTRIES = [
  'France', 'Italy', 'Spain', 'Germany', 'Portugal', 'Austria',
  'USA', 'Australia', 'New Zealand', 'Argentina', 'Chile', 'South Africa', 'Other',
]

const SYSTEM_PROMPT = `Wine Label Analyzer
You are a wine label analysis assistant. Your job is to extract structured data from wine label text as quickly and accurately as possible.
Analyze the label text and return ONLY a JSON object with these exact fields. Never explain, never add text outside the JSON.
{
  "wine_name": "Full wine name as printed (e.g. 'Château Margaux' or 'Barolo Bussia')",
  "producer": "Producer / winery / domaine / château name",
  "vintage": 2019,
  "country": "Country of origin in English",
  "region": "Primary wine region (e.g. 'Burgundy', 'Tuscany', 'Napa Valley')",
  "sub_region": "Sub-region or appellation if visible (e.g. 'Gevrey-Chambertin', 'Pauillac')",
  "grapes": ["Array", "of", "grape", "varieties"],
  "wine_type": "red | white | rosé | sparkling | dessert | fortified",
  "alcohol_pct": 13.5,
  "volume_ml": 750,
  "classification": "Any classification text (e.g. 'Grand Cru', 'DOC', 'AOC', 'Premier Cru')",
  "confidence": "high | medium | low",
  "notes": "Anything ambiguous or uncertain about the extraction"
}
Rules:
- Use null for any field not visible or confidently inferrable
- For grapes: infer from region/appellation if not explicitly stated (e.g. Chablis → Chardonnay) — mark confidence as medium in that case
- vintage must be a 4-digit integer, not a string
- alcohol_pct and volume_ml must be numbers, not strings
- wine_type: default to red if no indicator is present but a red grape variety is visible
- Respond ONLY with the JSON object — no markdown, no backticks, no explanation`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageUrl } = await req.json()
    if (!imageUrl || typeof imageUrl !== 'string') {
      return new Response(JSON.stringify({ error: 'imageUrl required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Fetch image and convert to base64
    const imgRes = await fetch(imageUrl)
    if (!imgRes.ok) throw new Error(`Failed to fetch image: ${imgRes.status}`)
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg'
    const mediaType = contentType.split(';')[0].trim() as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
    const buffer = await imgRes.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    let binary = ''
    const chunkSize = 8192
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
    }
    const base64 = btoa(binary)

    const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') })

    // Step 1: OCR pass — transcribe all visible text from the label
    const ocrMessage = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: 'Transcribe all visible text from this wine label exactly as it appears. Include every word, number, abbreviation, code, and classification mark you can see. Output plain text only.',
            },
          ],
        },
      ],
    })

    const ocrText = ocrMessage.content[0].type === 'text' ? ocrMessage.content[0].text.trim() : ''

    // Step 2: Structure pass — text-only inference from OCR output
    const structureMessage = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here is all the text visible on a wine label:\n\n${ocrText}\n\nExtract the structured wine information and return only the JSON object.`,
        },
      ],
    })

    const rawText = structureMessage.content[0].type === 'text' ? structureMessage.content[0].text.trim() : ''

    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const raw = JSON.parse(jsonMatch[0])

    // Normalise country against allowed list
    if (raw.country && !VALID_COUNTRIES.includes(raw.country)) {
      raw.country = null
    }

    // Map to camelCase response (grapes array → grape string for backward compat)
    const result = {
      wineName: raw.wine_name ?? null,
      producer: raw.producer ?? null,
      vintage: raw.vintage != null ? String(raw.vintage) : null,
      country: raw.country ?? null,
      region: raw.region ?? null,
      subRegion: raw.sub_region ?? null,
      grapes: Array.isArray(raw.grapes) ? raw.grapes : null,
      grape: Array.isArray(raw.grapes) && raw.grapes.length > 0 ? raw.grapes.join(', ') : null,
      wineType: raw.wine_type ?? null,
      alcoholPct: raw.alcohol_pct ?? null,
      volumeMl: raw.volume_ml ?? null,
      classification: raw.classification ?? null,
      confidence: raw.confidence ?? null,
      notes: raw.notes ?? null,
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('analyze-label error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

import Anthropic from 'npm:@anthropic-ai/sdk'

const VALID_COUNTRIES = [
  'France', 'Italy', 'Spain', 'Germany', 'Portugal', 'Austria',
  'USA', 'Australia', 'New Zealand', 'Argentina', 'Chile', 'South Africa', 'Other',
]

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
    // Chunked base64 encoding — avoids call stack overflow on large images
    const bytes = new Uint8Array(buffer)
    let binary = ''
    const chunkSize = 8192
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
    }
    const base64 = btoa(binary)

    const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
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
              text: `Analyze this wine label and extract information. Return ONLY valid JSON with these exact keys:
{
  "wineName": "the wine name or cuvée name (not the producer)",
  "producer": "the producer, domaine, château, or winery name",
  "vintage": "the 4-digit vintage year",
  "country": "country of origin — must be one of: ${VALID_COUNTRIES.join(', ')}",
  "region": "the wine region or appellation (e.g. Burgundy, Rioja, Napa Valley)",
  "grape": "the grape variety or blend (e.g. Pinot Noir, Cabernet Sauvignon, GSM blend)"
}

Use null for any field you cannot determine with reasonable confidence. Return only the JSON object, no other text.`,
            },
          ],
        },
      ],
    })

    const rawText = message.content[0].type === 'text' ? message.content[0].text.trim() : ''

    // Extract JSON from response (strip any markdown fences if present)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    const result = JSON.parse(jsonMatch[0])

    // Validate country against allowed list
    if (result.country && !VALID_COUNTRIES.includes(result.country)) {
      result.country = null
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

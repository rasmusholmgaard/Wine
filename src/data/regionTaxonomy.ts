export const REGIONS: Record<string, string[]> = {
  France: ['Alsace', 'Beaujolais', 'Bordeaux', 'Bourgogne', 'Champagne', 'Jura', 'Languedoc-Roussillon', 'Loire', 'Provence', 'Rhône', 'Savoie'],
  Italy: ['Abruzzo', 'Campania', 'Friuli', 'Lombardia', 'Piemonte', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Veneto'],
  Spain: ['Bierzo', 'Cava', 'Galicia', 'Jerez', 'Penedès', 'Priorat', 'Ribera del Duero', 'Rioja', 'Rueda'],
  Germany: ['Mosel', 'Nahe', 'Pfalz', 'Rheingau', 'Rheinhessen', 'Württemberg'],
  Portugal: ['Alentejo', 'Dão', 'Douro', 'Lisboa', 'Minho', 'Setúbal'],
  Austria: ['Burgenland', 'Kamptal', 'Steiermark', 'Wachau', 'Weinviertel'],
  USA: ['Napa Valley', 'Sonoma', 'Willamette Valley', 'Central Coast', 'Finger Lakes'],
  Australia: ['Barossa Valley', 'Clare Valley', 'Eden Valley', 'McLaren Vale', 'Margaret River', 'Yarra Valley'],
  'New Zealand': ['Marlborough', 'Central Otago', "Hawke's Bay"],
  Argentina: ['Mendoza', 'Patagonia', 'Salta'],
  Chile: ['Aconcagua', 'Casablanca', 'Colchagua', 'Maipo', 'Maule'],
  'South Africa': ['Constantia', 'Franschhoek', 'Stellenbosch', 'Swartland'],
  Other: [],
}

export const COUNTRIES = Object.keys(REGIONS)

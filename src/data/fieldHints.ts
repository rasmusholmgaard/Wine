import type { TastingNote } from '../types/tasting'

export interface FieldHint {
  title: string
  body: string
}

export const FIELD_HINTS: Partial<Record<keyof TastingNote, FieldHint>> = {
  // --- Eye ---
  clarity: {
    title: 'Klarhed',
    body: 'De fleste vine er klare og blanke. Uklarhed i en stille vin kan indikere en fejl, men visse ufiltrerede naturvine er bevidst let uklare. Mousserende vine bør altid fremstå klare.',
  },
  concentration: {
    title: 'Farveintensitet',
    body: 'Hvor dyb eller lys er farven? Intensiteten styres primært af druesort — tykskallede druer som Syrah giver dybe, rige farver, mens tyndskallede som Pinot Noir er naturligt lysere. Røde vine blegner med alderen, så en lysere farve kan antyde en ældre vin.',
  },
  color: {
    title: 'Farve',
    body: 'Farven afslører alder og druesort. Hvide vine mørkner fra bleggul mod rav med alderen. Røde vine bevæger sig i modsat retning — fra dyb lilla/rubinrød mod granat og mursteinstoner. Randen viser oftest alder tidligst.',
  },
  co2: {
    title: 'CO₂',
    body: 'En svag brus i en stille vin ses som små bobler langs glassets kant. I små mængder er det ofte bevidst — vinmagere bevarer til tider lidt CO₂ for at tilføje friskhed, typisk i unge hvide vine og rosé. I større mængder kan det indikere utilsigtet gæring på flaske, hvilket kan være en fejl.',
  },
  sediment: {
    title: 'Bundfald',
    body: 'Synlige partikler i vinen. I røde vine er det typisk polymeriserede tanniner og farvestoffer, der er bundfældet over tid — et naturligt tegn på alder og minimal filtrering, ikke en fejl. I hvide vine kan man se tartrat-krystaller ("vindiamanter"), som er ufarlige. Bundfald er generelt et positivt tegn i lagrede vine.',
  },
  rim: {
    title: 'Randfarve',
    body: 'Farven yderst i glasset, når det hældes. Randen afslører alder tydeligere end kernen. En rødvin med lilla rand er sandsynligvis ung; mursteins- eller orangetonede rand antyder udvikling. En hvidvin med gylden eller ravfarvet rand har sandsynligvis set noget alder eller eg. Kontrasten mellem kerne og rand fortæller, hvor meget vinen har udviklet sig.',
  },
  viscosity: {
    title: 'Viskositet / Tårer',
    body: 'De striber der løber ned ad glassets indside indikerer alkohol- og glycerolindhold. Mere fremtrædende tårer tyder på højere alkohol eller restsukker — men tårer siger intet om vinens kvalitet.',
  },

  // --- Nose ---
  condition: {
    title: 'Tilstand',
    body: 'Er vinen ren og indbydende, eller kan du spore en fejl? Typiske fejl: korksmag (våppet karton, muggen), oxidation (flad, sherryagtig), reduktion (tændstik, gummi). En vin i god stand bør lugte tiltalende, allerede inden du begynder at analysere den.',
  },
  noseIntensity: {
    title: 'Intensitet',
    body: 'Hvor kraftigt udtrykker vinen sig på næsen? Spænder fra let (kræver anstrengelse at registrere) til udtalt (aromaerne springer ud af glasset). Intensitet handler om volumen, ikke kvalitet — en subtil Pinot Grigio kan være fremragende, selvom den er let på næsen.',
  },
  fruitCondition: {
    title: 'Frugtkarakter',
    body: 'Ikke hvad du lugter, men tilstanden af frugten. Frisk og primær? Tænk netop plukket — levende, saftigt, klart. Moden eller kogt? Tænk marmelade, kompot, tørret frugt — mere koncentreret. Frugtkarakter er en af de tydeligste indikatorer for vinens alder og stil. En ung vin fra et køligt år viser frisk frugt; et varmt år eller lagret vin trækker mod mere moden og udviklet.',
  },
  ageEstimate: {
    title: 'Udvikling',
    body: 'Er vinen ungdommelig, under udvikling eller fuldt moden? Unge vine viser primære aromaer: frisk frugt og blomster. Med tid opstår sekundære aromaer fra gæring: brød, smør, yoghurt. Fuldt modne vine viser tertiære aromaer: tørret frugt, læder, svamp, petroleum, tobak.',
  },
  primaryAromas: {
    title: 'Primære aromaer',
    body: 'Aromaer der stammer direkte fra selve druen. Tænk frisk frugt (citron, fersken, brombær, kirsebær), blomster (rose, viol) og friske urter (græs, mynte). Primære aromaer dominerer unge vine og aftager, efterhånden som vinen udvikler sig.',
  },
  secondaryAromas: {
    title: 'Sekundære aromaer',
    body: 'Aromaer der opstår under gæringen — skabt af gæraktivitet. Klassiske eksempler: brøddej, brioche, yoghurt, smør (fra malolaktisk gæring). Sekundære aromaer er særlig fremtrædende i vine med udvidet gæring, f.eks. hvid Bourgogne eller Champagne.',
  },
  tertiaryAromas: {
    title: 'Tertiære aromaer',
    body: 'Aromaer der udvikler sig ved lagring på eg eller flaske — også kaldet "bouquet." Tørret frugt, læder, tobak, skovbund, svamp, trøffel, kaffe, ceder, petroleum. Tertiære aromaer er tegn på en vin med historie, og deres tilstedeværelse indikerer normalt kvalitet og alder.',
  },

  // --- Palate ---
  sweetness: {
    title: 'Sødme',
    body: 'Sødme stammer fra restsukker, der er tilbage efter gæringen. Spænder fra knastørt til luksuriøst sødt. Bemærk: moden frugt og alkohol kan skabe en opfattelse af sødme i teknisk tørre vine — hvad du fornemmer er ikke altid det målte.',
  },
  acidity: {
    title: 'Syrlighed',
    body: 'Syrlighed giver vinen friskhed og struktur. Mærkes som en vandmundende, prikkende fornemmelse — særligt på siderne af tungen og i kinderne. Høj-syre vine (Riesling, Champagne) føles livlige og sprøde. Lav-syre vine kan virke flade eller tunge.',
  },
  tannins: {
    title: 'Tanniner',
    body: 'Tanniner er forbindelser fra drueskaller, kerner, stilke og eg, der skaber en tørrende, sammensnerpende fornemmelse. De giver struktur og hjælper røde vine med at lagre. Bløde tanniner føles silkebløde; aggressive tanniner er hårde og sammensnerpende. Cabernet Sauvignon er typisk høj i tanniner; Pinot Noir er langt lavere.',
  },
  alcohol: {
    title: 'Alkohol',
    body: 'Alkohol bidrager med fylde og varme — mærkes som en varme i halsen. Lav-alkoholvine (under 11%) føles lette; høj-alkoholvine (over 14,5%) kan virke varme eller tunge. Balance er afgørende: høj alkohol i en rig vin er fint; i en delikat vin virker det malplaceret.',
  },
  bodyTexture: {
    title: 'Krop',
    body: 'Krop er vægten og teksturen af vinen i munden — som at sammenligne skummetmælk (let) med sødmælk (medium) og fløde (fyldig). Påvirkes af alkohol, tanniner, ekstrakt og restsukker. Krop handler om stil, ikke kvalitet.',
  },
  balance: {
    title: 'Balance',
    body: 'En balanceret vin er én, hvor intet enkelt element dominerer eller distraherer. Syre, tanniner, alkohol, frugt og sødme bør føles integrerede — hver til stede, men ingen hård eller malplaceret. Ubalance er straks mærkbar: en vin der virker for varm (alkohol), for skarp (syre) eller for bitter (tannin) mangler balance. Balance er en af de mest pålidelige indikatorer for vinens kvalitet.',
  },
  complexity: {
    title: 'Kompleksitet',
    body: 'Ligesom på næsen handler pallatkompleksitet om, hvor mange distinkte smagslag du fornemmer, og hvordan de udvikler sig fra første slurk til eftersmag. En kompleks vin bliver ved med at skifte og afsløre nye ting. En simpel vin smager ens fra start til slut — fint til hverdagsbrug, men ikke et kendetegn for kvalitet.',
  },
  finishLength: {
    title: 'Eftersmag / Længde',
    body: 'Hvor længe holder smagene sig, efter du har slugt? En kort eftersmag forsvinder næsten øjeblikkeligt. En lang eftersmag — hvor smagene holder sig og udvikler sig i 30+ sekunder — er et kendetegn for kvalitet. Generelt: jo længere eftersmag, jo bedre vin.',
  },
  primaryFlavorsText: {
    title: 'Primære smage',
    body: 'De direkte, frugtbetonte smage der stammer fra selve druesorten. Frisk frugt, citrus, blomster og enkle urtede noter. Disse dominerer unge vine og giver det klareste signal om druesort og terroir.',
  },
  secondaryFlavorsText: {
    title: 'Sekundære smage',
    body: 'Smage afledt af gæringsprocessen. Brød, fløde, smør og mælkesyre-noter fra gær og malolaktisk gæring. Disse tilføjer tekstur og rundhed på den midterste del af paletten.',
  },
  tertiaryFlavorsText: {
    title: 'Tertiære smage',
    body: 'Smage der udvikles ved eglagring og flaskemodning. Vanilje, toast, røg og ceder fra eg. Tørret frugt, læder, jord og salte umami-noter fra flaskealder. Jo mere tertiær smag en vin viser, jo mere har den udviklet sig.',
  },

  // --- Conclusion ---
  climate: {
    title: 'Klima',
    body: 'Klima sætter et tydeligt aftryk på vinen. Kolde klimaer (Bourgogne, Champagne, Mosel, Marlborough) giver vine med høj syre, lavere alkohol og mere tilbageholdt frugt — tænk æble, citrus, rød bær. Varme klimaer (Napa, Barossa, Rioja) giver mere moden frugt, højere alkohol og blødere syre — tænk brombær, figen, tørret frugt, chokolade. At identificere det sandsynlige klima er et nyttigt skridt i blind smagning.',
  },
  vintageEstimate: {
    title: 'Årgang',
    body: 'Det år druerne blev høstet. Årgangen er vigtig, fordi vejret i vækstperioden direkte former vinen — et koldt, fugtigt år giver meget anderledes frugt end et varmt, tørt år. I regioner som Bourgogne eller Barolo er årgangsvariationen dramatisk. At estimere årgangen i blind smagning er avanceret — men tegn som frugtfriskhed, farvedybde og udvikling peger mod en omtrentlig alder.',
  },
  qualityLevel: {
    title: 'Kvalitetsniveau',
    body: 'Saml alt, hvad du har observeret. En kvalitetsvin viser balance (intet enkelt element dominerer), kompleksitet, længde og typicitet (den udtrykker tydeligt sin sort og oprindelse). Kvalitetsvine har også tendens til at udvikle sig i glasset over tid.',
  },
  score: {
    title: 'Bedømmelse',
    body: 'Dit samlede indtryk: 1 stjerne = fejlbehæftet eller meget dårlig. 2 = simpel, hverdagsagtig. 3 = god, vellavet. 4 = fremragende, mindeværdig. 5 = exceptionel — en enestående vin.',
  },
}

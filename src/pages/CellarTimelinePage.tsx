import { useApp } from '../context/AppContext'
import WineCard from '../components/cards/WineCard'

export default function CellarTimelinePage() {
  const { tastings } = useApp()
  const sorted = [...tastings].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <p className="font-display text-vino-lg text-charcoal-mid">Ingen smagninger endnu</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
      {sorted.map((t) => (
        <WineCard key={t.id} tasting={t} />
      ))}
    </div>
  )
}

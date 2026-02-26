import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import BottomNav from '../components/layout/BottomNav'
import WineCard from '../components/cards/WineCard'
import { useApp } from '../context/AppContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { tastings } = useApp()
  const recent = tastings.slice(0, 10)

  return (
    <AppShell withNav>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-vino-sm text-charcoal-soft font-body uppercase tracking-widest mb-1">
              Din vinlog
            </p>
            <h1 className="font-display text-vino-3xl text-wine-red font-semibold">
              Vino
            </h1>
          </div>
          <div className="text-vino-sm text-charcoal-soft font-body text-right">
            <p className="text-vino-2xl font-display text-charcoal font-semibold">{tastings.length}</p>
            <p>smagninger</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-6">
        <button
          onClick={() => navigate('/tasting/new')}
          className="w-full py-4 rounded-card bg-sage text-white font-body font-semibold text-vino-base flex items-center justify-center gap-2 hover:bg-sage-dark active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          style={{ boxShadow: 'var(--shadow-vino-lg)' }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Start ny smagning
        </button>
      </div>

      {/* Recent tastings */}
      <div className="px-5">
        <h2 className="font-display text-vino-lg text-charcoal font-semibold mb-4">
          Seneste smagninger
        </h2>

        {recent.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-cream-dark flex items-center justify-center mb-4"
              style={{ boxShadow: 'var(--shadow-vino)' }}>
              <span className="text-3xl">🍷</span>
            </div>
            <p className="font-display text-vino-lg text-charcoal-mid">Din første smagning venter</p>
            <p className="text-vino-sm text-charcoal-soft font-body mt-2">Start en smagning ovenfor</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map((t) => (
              <WineCard key={t.id} tasting={t} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </AppShell>
  )
}

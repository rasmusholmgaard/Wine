import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import ModeSelector from '../components/tasting/ModeSelector'

export default function ModeSelectionPage() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <div className="px-5 pt-12 pb-6">
        <button
          onClick={() => navigate('/')}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-dark text-charcoal-mid hover:bg-cream-deeper active:scale-[0.94] transition-[transform,background-color] duration-200 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <ArrowLeft size={18} strokeWidth={2} />
        </button>

        <h1 className="font-display text-vino-2xl text-charcoal font-semibold mb-2">
          Ny smagning
        </h1>
        <p className="text-vino-base text-charcoal-mid font-body mb-8">
          Vælg din smagemåde
        </p>

        <ModeSelector />
      </div>
    </AppShell>
  )
}

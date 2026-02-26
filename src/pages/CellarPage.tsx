import { Outlet, NavLink } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import BottomNav from '../components/layout/BottomNav'
import { cn } from '../lib/utils'

const TABS = [
  { to: '/cellar/timeline', label: 'Kronologisk' },
  { to: '/cellar/country', label: 'Land' },
  { to: '/cellar/grape', label: 'Drue' },
]

export default function CellarPage() {
  return (
    <AppShell withNav>
      <div className="px-5 pt-14 pb-4">
        <h1 className="font-display text-vino-2xl text-charcoal font-semibold">
          Vinkælder
        </h1>
        <p className="text-vino-sm text-charcoal-soft font-body mt-1">
          Alle dine smagninger
        </p>
      </div>

      {/* Tab bar */}
      <div className="px-5 mb-4">
        <div
          className="flex rounded-card bg-cream-dark p-1"
          style={{ boxShadow: 'var(--shadow-vino)' }}
        >
          {TABS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex-1 text-center py-2 rounded-input text-vino-sm font-body font-medium transition-[background-color,color] duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage',
                  isActive
                    ? 'bg-white text-charcoal'
                    : 'text-charcoal-soft hover:text-charcoal-mid',
                )
              }
              style={({ isActive }) => isActive ? { boxShadow: 'var(--shadow-vino)' } : undefined}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5">
        <Outlet />
      </div>

      <BottomNav />
    </AppShell>
  )
}

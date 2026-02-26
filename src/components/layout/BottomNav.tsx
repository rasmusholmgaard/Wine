import { NavLink } from 'react-router-dom'
import { Home, BookOpen, User } from 'lucide-react'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Hjem' },
  { to: '/cellar', icon: BookOpen, label: 'Kælder' },
  { to: '/auth/login', icon: User, label: 'Profil' },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ boxShadow: '0 -1px 0 rgba(44,44,44,0.08)' }}
    >
      <div
        className="w-full max-w-[430px] flex bg-white border-t border-cream-deeper"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex-1 flex flex-col items-center justify-center py-3 gap-1',
                'transition-[opacity] duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage',
                isActive ? 'text-sage' : 'text-charcoal-soft hover:text-charcoal-mid',
              )
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="text-vino-xs font-body font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

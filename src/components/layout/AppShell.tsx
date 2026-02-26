import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface AppShellProps {
  children: ReactNode
  className?: string
  withNav?: boolean
}

export default function AppShell({ children, className, withNav = false }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center">
      <div
        className={cn(
          'w-full max-w-[430px] relative flex flex-col min-h-screen',
          withNav && 'pb-20',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

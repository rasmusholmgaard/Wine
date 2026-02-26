import { cn } from '../../lib/utils'

interface SegmentedControlProps {
  options: string[]
  value: string | null
  onChange: (v: string) => void
  className?: string
}

export default function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'flex w-full rounded-card overflow-hidden border border-cream-deeper bg-cream-dark',
        className,
      )}
      style={{ boxShadow: 'var(--shadow-vino)' }}
    >
      {options.map((opt) => {
        const selected = opt === value
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'flex-1 py-3 text-vino-sm font-body font-medium text-center transition-[background-color,color,transform] duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage',
              'active:scale-[0.97]',
              selected
                ? 'bg-sage text-white'
                : 'text-charcoal-mid hover:bg-cream-deeper',
            )}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

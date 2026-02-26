import { cn } from '../../lib/utils'

interface ChipButtonProps {
  label: string
  selected: boolean
  onClick: () => void
  variant?: 'default' | 'hint' | 'wine'
  size?: 'sm' | 'md'
  disabled?: boolean
}

export default function ChipButton({
  label,
  selected,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
}: ChipButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-chip border font-body transition-[transform,opacity] duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage',
        'active:scale-[0.96]',
        size === 'sm' && 'px-3 py-1 text-vino-sm',
        size === 'md' && 'px-4 py-2 text-vino-base',
        variant === 'default' && !selected && 'bg-cream-dark border-cream-deeper text-charcoal hover:bg-cream-deeper',
        variant === 'default' && selected && 'bg-sage border-sage text-white',
        variant === 'hint' && !selected && 'bg-wine-blush/10 border-wine-blush text-wine-red hover:bg-wine-blush/20',
        variant === 'hint' && selected && 'bg-wine-blush border-wine-blush text-white',
        variant === 'wine' && !selected && 'bg-cream-dark border-wine-red/30 text-wine-red hover:bg-wine-red/5',
        variant === 'wine' && selected && 'bg-wine-red border-wine-red text-white',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
    >
      {label}
    </button>
  )
}

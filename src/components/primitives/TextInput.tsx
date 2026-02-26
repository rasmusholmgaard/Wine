import { cn } from '../../lib/utils'

interface TextInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  className?: string
  autoFocus?: boolean
}

export default function TextInput({
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 4,
  className,
  autoFocus,
}: TextInputProps) {
  const base = cn(
    'w-full rounded-input bg-cream-dark border border-cream-deeper px-4 py-3',
    'text-vino-base text-charcoal font-body placeholder:text-charcoal-soft',
    'focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent',
    'transition-[border-color,box-shadow] duration-200',
    className,
  )

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        autoFocus={autoFocus}
        className={cn(base, 'resize-none')}
        style={{ boxShadow: 'var(--shadow-vino)' }}
      />
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={base}
      style={{ boxShadow: 'var(--shadow-vino)' }}
    />
  )
}

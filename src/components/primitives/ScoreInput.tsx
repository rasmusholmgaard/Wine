import { cn } from '../../lib/utils'

interface ScoreInputProps {
  value: number | null
  onChange: (v: number | null) => void
}

export default function ScoreInput({ value, onChange }: ScoreInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const n = parseInt(e.target.value, 10)
    if (isNaN(n)) {
      onChange(null)
    } else {
      onChange(Math.min(100, Math.max(1, n)))
    }
  }

  const scoreColor = value == null
    ? 'text-charcoal-soft'
    : value >= 90
    ? 'text-sage'
    : value >= 80
    ? 'text-charcoal'
    : 'text-charcoal-mid'

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={cn('font-display text-vino-3xl font-semibold transition-[color] duration-200', scoreColor)}>
        {value ?? '—'}
      </div>

      <div className="w-full relative">
        <input
          type="range"
          min={50}
          max={100}
          value={value ?? 80}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: value != null
              ? `linear-gradient(to right, var(--sage) 0%, var(--sage) ${((( value ?? 80) - 50) / 50) * 100}%, var(--cream-deeper) ${(((value ?? 80) - 50) / 50) * 100}%, var(--cream-deeper) 100%)`
              : 'var(--cream-deeper)',
          }}
        />
        <div className="flex justify-between mt-2 text-vino-xs text-charcoal-soft font-body">
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={50}
          max={100}
          value={value ?? ''}
          onChange={handleChange}
          placeholder="80"
          className={cn(
            'w-20 text-center rounded-input border border-cream-deeper bg-cream-dark',
            'px-3 py-2 text-vino-lg font-body text-charcoal',
            'focus:outline-none focus:ring-2 focus:ring-sage',
          )}
        />
        <span className="text-vino-base text-charcoal-soft">/ 100</span>
      </div>
    </div>
  )
}

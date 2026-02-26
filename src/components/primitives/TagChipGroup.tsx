import ChipButton from './ChipButton'

interface TagChipGroupProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  maxSelect?: number
  emptyMessage?: string
}

export default function TagChipGroup({ options, selected, onChange, maxSelect }: TagChipGroupProps) {
  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt))
    } else {
      if (maxSelect && selected.length >= maxSelect) return
      onChange([...selected, opt])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <ChipButton
          key={opt}
          label={opt}
          selected={selected.includes(opt)}
          onClick={() => toggle(opt)}
          size="md"
        />
      ))}
    </div>
  )
}

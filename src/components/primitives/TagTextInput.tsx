import { useState, type KeyboardEvent } from 'react'

interface TagTextInputProps {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}

export default function TagTextInput({ value, onChange, placeholder = 'Skriv og tryk Enter...' }: TagTextInputProps) {
  const [input, setInput] = useState('')

  function addTag(raw: string) {
    const tag = raw.trim()
    if (tag && !value.includes(tag)) {
      onChange([...value, tag])
    }
    setInput('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && input === '' && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  function handleBlur() {
    if (input.trim()) addTag(input)
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div
      className="min-h-[52px] w-full rounded-card bg-cream-dark px-3 py-2.5 flex flex-wrap gap-2 items-center cursor-text"
      style={{ boxShadow: 'var(--shadow-vino)' }}
      onClick={() => {
        const input = document.querySelector<HTMLInputElement>('[data-tag-input]')
        input?.focus()
      }}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-chip bg-sage/15 text-sage font-body text-vino-sm font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
            className="text-sage/70 hover:text-sage leading-none focus-visible:outline-none"
            aria-label={`Fjern ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        data-tag-input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] bg-transparent outline-none font-body text-vino-sm text-charcoal placeholder:text-charcoal-soft"
      />
    </div>
  )
}

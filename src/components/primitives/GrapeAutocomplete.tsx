import { useState, useRef, useEffect, useId } from 'react'
import { cn } from '../../lib/utils'
import { GRAPE_VARIETIES } from '../../data/grapeVarieties'

interface GrapeAutocompleteProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoFocus?: boolean
}

const MAX_SUGGESTIONS = 8

function getSuggestions(query: string): string[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  const prefix: string[] = []
  const contains: string[] = []
  for (const grape of GRAPE_VARIETIES) {
    const lower = grape.toLowerCase()
    if (lower.startsWith(q)) prefix.push(grape)
    else if (lower.includes(q)) contains.push(grape)
  }
  return [...prefix, ...contains].slice(0, MAX_SUGGESTIONS)
}

export default function GrapeAutocomplete({
  value,
  onChange,
  placeholder = 'F.eks. Pinot Noir...',
  autoFocus,
}: GrapeAutocompleteProps) {
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  // Keep query in sync if parent resets the value externally
  useEffect(() => {
    setQuery(value)
  }, [value])

  const suggestions = getSuggestions(query)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setQuery(v)
    onChange(v)
    setOpen(true)
    setActiveIndex(-1)
  }

  function selectSuggestion(grape: string) {
    setQuery(grape)
    onChange(grape)
    setOpen(false)
    setActiveIndex(-1)
    inputRef.current?.blur()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      selectSuggestion(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const showDropdown = open && suggestions.length > 0

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        aria-controls={showDropdown ? listId : undefined}
        aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (query) setOpen(true) }}
        onBlur={() => {
          // Delay so click on suggestion registers first
          setTimeout(() => setOpen(false), 150)
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        className={cn(
          'w-full rounded-input bg-cream-dark border border-cream-deeper px-4 py-3',
          'text-vino-base text-charcoal font-body placeholder:text-charcoal-soft',
          'focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent',
          'transition-[border-color,box-shadow] duration-200',
        )}
        style={{ boxShadow: 'var(--shadow-vino)' }}
      />

      {showDropdown && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className={cn(
            'absolute z-50 mt-1 w-full max-h-56 overflow-y-auto',
            'rounded-input border border-cream-deeper bg-cream',
            'shadow-md',
          )}
        >
          {suggestions.map((grape, i) => {
            const isActive = i === activeIndex
            return (
              <li
                key={grape}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={isActive}
                onMouseDown={() => selectSuggestion(grape)}
                className={cn(
                  'px-4 py-2.5 cursor-pointer text-vino-base font-body text-charcoal',
                  'transition-colors duration-100',
                  isActive ? 'bg-sage/20 text-charcoal' : 'hover:bg-cream-dark',
                )}
              >
                {grape}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

interface InfoSheetProps {
  title: string
  body: string
  onClose: () => void
}

export default function InfoSheet({ title, body, onClose }: InfoSheetProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm mx-4 mb-8 bg-cream rounded-card shadow-xl p-6 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg text-charcoal font-semibold leading-snug">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="shrink-0 mt-0.5 w-7 h-7 flex items-center justify-center rounded-full text-charcoal-soft hover:bg-cream-deeper active:scale-95 transition-[transform,background-color] duration-150 focus-visible:outline-none"
            aria-label="Luk"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
        <p className="font-body text-vino-sm text-charcoal-soft leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  )
}

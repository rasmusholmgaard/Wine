interface ExitTastingDialogProps {
  onStay: () => void
  onExit: () => void
}

export default function ExitTastingDialog({ onStay, onExit }: ExitTastingDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onStay}
    >
      <div
        className="w-full max-w-sm mx-4 mb-8 sm:mb-0 bg-cream rounded-card shadow-xl p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="font-display text-lg text-charcoal-mid font-semibold">
            Afslut smagning?
          </h2>
          <p className="font-body text-vino-sm text-charcoal-soft">
            Hvis du forlader nu, vil din smagning ikke blive gemt.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onStay}
            className="w-full py-3.5 rounded-card font-body font-semibold text-vino-base bg-sage text-white hover:opacity-90 active:scale-[0.98] transition-[transform,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
          >
            Bliv
          </button>
          <button
            onClick={onExit}
            className="w-full py-3.5 rounded-card font-body font-semibold text-vino-base bg-cream-deeper text-wine-red hover:bg-cream-dark active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-red focus-visible:ring-offset-2"
          >
            Forlad
          </button>
        </div>
      </div>
    </div>
  )
}

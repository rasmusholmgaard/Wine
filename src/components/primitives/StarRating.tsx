import { Star } from 'lucide-react'

interface StarRatingProps {
  score: number // 1.0–5.0
  size?: number // px, default 16
}

export default function StarRating({ score, size = 16 }: StarRatingProps) {
  const fillPercent = (score / 5) * 100
  const gap = Math.max(1, Math.round(size * 0.15))

  return (
    <div className="relative inline-flex" style={{ gap }}>
      {/* Empty stars */}
      <div className="flex" style={{ gap }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={size} className="text-cream-deeper flex-shrink-0" />
        ))}
      </div>
      {/* Filled stars — clipped to fill percentage */}
      <div
        className="absolute inset-0 flex overflow-hidden"
        style={{ width: `${fillPercent}%`, gap }}
      >
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={size} className="text-wine-red flex-shrink-0" fill="currentColor" />
        ))}
      </div>
    </div>
  )
}

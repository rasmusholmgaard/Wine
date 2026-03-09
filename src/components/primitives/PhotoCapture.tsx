import { useRef, useState } from 'react'
import { Camera, X, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { uploadLabelPhoto } from '../../lib/storage'

interface PhotoCaptureProps {
  value: string
  onChange: (url: string) => void
}

export default function PhotoCapture({ value, onChange }: PhotoCaptureProps) {
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setIsUploading(true)
    setError(null)
    try {
      const url = await uploadLabelPhoto(user.id, file)
      onChange(url)
    } catch {
      setError('Upload mislykkedes. Prøv igen.')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  if (value) {
    return (
      <div className="flex flex-col gap-3">
        <div className="relative rounded-card overflow-hidden" style={{ boxShadow: 'var(--shadow-vino)' }}>
          <img src={value} alt="Etiketfoto" className="w-full object-cover max-h-80" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-[0.94] transition-[transform,background-color] duration-200"
            aria-label="Fjern foto"
          >
            <X size={16} />
          </button>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center justify-center gap-2 py-3 rounded-card bg-cream-dark text-charcoal-mid font-body text-vino-sm hover:bg-cream-deeper active:scale-[0.97] transition-[transform,background-color] duration-200 disabled:opacity-60"
          style={{ boxShadow: 'var(--shadow-vino)' }}
        >
          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
          {isUploading ? 'Uploader…' : 'Skift foto'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
        className="flex flex-col items-center justify-center gap-3 py-12 rounded-card border-2 border-dashed border-cream-deeper bg-cream-dark text-charcoal-soft hover:bg-cream-deeper hover:text-charcoal hover:border-sage active:scale-[0.98] transition-all duration-200 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        style={{ boxShadow: 'var(--shadow-vino)' }}
      >
        {isUploading ? (
          <Loader2 size={32} className="animate-spin text-sage" />
        ) : (
          <Camera size={32} />
        )}
        <span className="font-body text-vino-sm text-center">
          {isUploading ? 'Uploader…' : 'Tag et foto eller vælg fra biblioteket'}
        </span>
      </button>
      {error && <p className="text-vino-sm text-wine-red font-body text-center">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}

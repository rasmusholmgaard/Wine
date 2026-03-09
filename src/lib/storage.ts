import { supabase } from './supabase'

const BUCKET = 'wine-labels'

export async function uploadLabelPhoto(userId: string, file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteLabelPhoto(publicUrl: string): Promise<void> {
  const marker = `/object/public/${BUCKET}/`
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return
  const path = decodeURIComponent(publicUrl.slice(idx + marker.length))

  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw error
}

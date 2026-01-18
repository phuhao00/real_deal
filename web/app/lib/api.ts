export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8081'
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store', credentials: 'include', ...init })
  if (!res.ok) throw new Error(`api ${path} ${res.status}`)
  return res.json()
}
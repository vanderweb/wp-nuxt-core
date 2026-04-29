import type { WpApiParams } from '../types/wordpress'

export async function wpFetch<T>(
  baseUrl: string,
  endpoint: string,
  params?: WpApiParams,
  namespace = 'wp/v2'
): Promise<T> {
  const url = new URL(
    `${baseUrl.replace(/\/$/, '')}/wp-json/${namespace}/${endpoint.replace(/^\//, '')}`
  )

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value))
    }
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    if (res.status === 404) throw new Error(`WordPress API: Not found — ${url}`)
    if (res.status === 401 || res.status === 403) throw new Error(`WordPress API: Unauthorized — ${url}`)
    throw new Error(`WordPress API error (${res.status}): ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

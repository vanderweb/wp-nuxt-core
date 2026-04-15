import type { WpApiParams } from '../types/wordpress'

export async function wpFetch<T>(
  baseUrl: string,
  endpoint: string,
  params?: WpApiParams
): Promise<T> {
  const url = `${baseUrl.replace(/\/$/, '')}/wp-json/wp/v2/${endpoint.replace(/^\//, '')}`

  try {
    const data = await $fetch<T>(url, {
      params: params as Record<string, unknown>,
    })
    return data
  } catch (error: unknown) {
    const status = (error as { response?: { status?: number } })?.response?.status
    const message = (error as { message?: string })?.message ?? 'Unknown error'

    if (status === 404) {
      throw new Error(`WordPress API: Not found — ${url}`)
    }
    if (status === 401 || status === 403) {
      throw new Error(`WordPress API: Unauthorized — ${url}`)
    }
    throw new Error(`WordPress API error (${status ?? 'unknown'}): ${message}`)
  }
}

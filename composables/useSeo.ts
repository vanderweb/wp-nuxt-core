import { useSeoMeta } from '#app'
import type { WpPost, WpPage } from '../types/wordpress'

export function useSeo(content: WpPost | WpPage, canonicalBase?: string) {
  const yoast = content.yoast_head_json

  const title =
    yoast?.title ||
    content.title?.rendered ||
    undefined

  const description =
    yoast?.description ||
    content.excerpt?.rendered?.replace(/<[^>]*>/g, '').trim() ||
    undefined

  const ogImage =
    yoast?.og_image?.[0]?.url ||
    content._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    undefined

  const canonical =
    yoast?.canonical ||
    (canonicalBase
      ? `${canonicalBase.replace(/\/$/, '')}/${content.slug}`
      : undefined)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ...(canonical ? { canonical } : {}),
  })
}

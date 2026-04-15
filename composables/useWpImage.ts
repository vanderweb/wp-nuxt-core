import type { WpImage } from '../types/wordpress'

type ImageSize = 'full' | 'large' | 'medium' | 'thumbnail'

export function useWpImage() {
  function getImageUrl(image: WpImage | undefined | null, size: ImageSize = 'full'): string {
    if (!image) return ''

    const sizeData = image.media_details?.sizes?.[size]
    if (sizeData?.source_url) {
      return sizeData.source_url
    }

    return image.source_url ?? ''
  }

  function getImageAlt(image: WpImage | undefined | null): string {
    return image?.alt_text ?? ''
  }

  return {
    getImageUrl,
    getImageAlt,
  }
}

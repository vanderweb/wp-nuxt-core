import { useRuntimeConfig } from '#app'
import { wpFetch } from '../utils/wpApi'
import type { WpPost, WpPage, WpImage, WpApiParams } from '../types/wordpress'

export function useWordPress() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.wpApiBase as string

  if (!baseUrl) {
    throw new Error('wp-nuxt-core: wpApiBase is not set in runtimeConfig.public')
  }

  async function getPage(slug: string): Promise<WpPage> {
    const pages = await wpFetch<WpPage[]>(baseUrl, 'pages', {
      slug,
      _embed: 1,
      per_page: 1,
    })
    if (!pages?.length) {
      throw new Error(`wp-nuxt-core: Page not found for slug "${slug}"`)
    }
    return pages[0]
  }

  async function getPages(params?: WpApiParams): Promise<WpPage[]> {
    return wpFetch<WpPage[]>(baseUrl, 'pages', { _embed: 1, ...params })
  }

  async function getPost(slug: string): Promise<WpPost> {
    const posts = await wpFetch<WpPost[]>(baseUrl, 'posts', {
      slug,
      _embed: 1,
      per_page: 1,
    })
    if (!posts?.length) {
      throw new Error(`wp-nuxt-core: Post not found for slug "${slug}"`)
    }
    return posts[0]
  }

  async function getPosts(params?: WpApiParams): Promise<WpPost[]> {
    return wpFetch<WpPost[]>(baseUrl, 'posts', { _embed: 1, ...params })
  }

  async function getMedia(id: number): Promise<WpImage> {
    return wpFetch<WpImage>(baseUrl, `media/${id}`)
  }

  async function searchContent(query: string): Promise<WpPost[]> {
    return wpFetch<WpPost[]>(baseUrl, 'posts', {
      search: query,
      _embed: 1,
    })
  }

  return {
    getPage,
    getPages,
    getPost,
    getPosts,
    getMedia,
    searchContent,
  }
}

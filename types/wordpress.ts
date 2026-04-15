export interface WpImageSize {
  file: string
  width: number
  height: number
  mime_type: string
  source_url: string
}

export interface WpImageMediaDetails {
  width: number
  height: number
  file: string
  sizes: {
    thumbnail?: WpImageSize
    medium?: WpImageSize
    large?: WpImageSize
    full?: WpImageSize
    [key: string]: WpImageSize | undefined
  }
}

export interface WpImage {
  id: number
  source_url: string
  alt_text: string
  media_details: WpImageMediaDetails
}

export interface WpRendered {
  rendered: string
}

export interface YoastHeadJson {
  title?: string
  description?: string
  og_image?: Array<{ url: string; width?: number; height?: number }>
  canonical?: string
}

export interface WpEmbedded {
  'wp:featuredmedia'?: WpImage[]
  'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
  author?: Array<{ id: number; name: string; slug: string }>
}

export interface WpPost {
  id: number
  slug: string
  status: 'publish' | 'draft' | 'private' | 'pending' | 'future'
  title: WpRendered
  content: WpRendered
  excerpt: WpRendered
  date: string
  modified: string
  link: string
  yoast_head_json?: YoastHeadJson
  _embedded?: WpEmbedded
}

export interface WpPage extends WpPost {
  parent: number
  menu_order: number
}

export interface WpMenuItem {
  id: number
  title: WpRendered
  url: string
  slug: string
  target: string
  menu_item_parent: string
  menu_order: number
  object: string
  object_id: number
  type: string
  children?: WpMenuItem[]
}

export interface WpMenu {
  id: number
  name: string
  slug: string
  items: WpMenuItem[]
}

export interface WpApiParams {
  per_page?: number
  page?: number
  slug?: string
  _embed?: boolean | 1
  search?: string
  order?: 'asc' | 'desc'
  orderby?: 'date' | 'id' | 'title' | 'slug' | 'menu_order' | 'relevance'
  [key: string]: unknown
}

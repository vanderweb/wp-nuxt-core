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
  featured_media_src_url?: string | null
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

// ---------------------------------------------------------------------------
// Vander plugin types
// ---------------------------------------------------------------------------

export interface VanderAttachment {
  id: number
  url: string
  alt: string
}

export interface VanderCasePost {
  id: number
  slug: string
  title: string
  excerpt: string
  thumbnail_url: string
}

export interface VanderHeroSection {
  type: 'hero'
  heading: string
  subheading: string
  cta_label: string
  cta_url: string
  background_image: VanderAttachment | null
  overlay_opacity: number
}

export interface VanderServiceItem {
  title: string
  icon: string
  text: string
}

export interface VanderServicesSection {
  type: 'services'
  heading: string
  subheading: string
  items: VanderServiceItem[]
}

export interface VanderCaseItem {
  post_id: VanderCasePost | null
}

export interface VanderCasesSection {
  type: 'cases'
  heading: string
  subheading: string
  case_ids: VanderCaseItem[]
}

export interface VanderAboutSection {
  type: 'about'
  heading: string
  text: string
  image: VanderAttachment | null
  cta_label: string
  cta_url: string
}

export interface VanderTestimonialItem {
  quote: string
  author: string
  role: string
  avatar: VanderAttachment | null
}

export interface VanderTestimonialsSection {
  type: 'testimonials'
  heading: string
  items: VanderTestimonialItem[]
}

export interface VanderContactSection {
  type: 'contact'
  heading: string
  subheading: string
  email: string
  phone: string
  show_form: boolean
}

export interface VanderTextImageSection {
  type: 'text_image'
  heading: string
  text: string
  image: VanderAttachment | null
  layout: 'image_left' | 'image_right'
}

export interface VanderFreetextSection {
  type: 'freetext'
  heading: string
  content: string
  centered: boolean
}

export type VanderSection =
  | VanderHeroSection
  | VanderServicesSection
  | VanderCasesSection
  | VanderAboutSection
  | VanderTestimonialsSection
  | VanderContactSection
  | VanderTextImageSection
  | VanderFreetextSection

export interface VanderNavLink {
  label: string
  url: string
  target: boolean
}

export interface VanderGeneralSettings {
  siteName: string
  siteDescription: string
  logoUrl: string
  faviconUrl: string
  googleAnalyticsId: string
  maintenanceMode: boolean
  primaryColor: string
  accentColor: string
  fontFamily: string
  googleFontsUrl: string
}

export interface VanderHeaderSettings {
  logoUrl: string
  logoAlt: string
  navLinks: VanderNavLink[]
  ctaLabel: string
  ctaUrl: string
  stickyHeader: boolean
  transparentHeader: boolean
}

export interface VanderFooterLink {
  label: string
  url: string
}

export interface VanderFooterColumn {
  heading: string
  links: VanderFooterLink[]
}

export interface VanderSocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'x'
  url: string
}

export interface VanderFooterSettings {
  logoUrl: string
  logoAlt: string
  tagline: string
  columns: VanderFooterColumn[]
  bottomText: string
  socialLinks: VanderSocialLink[]
}

export interface VanderSettings {
  general: VanderGeneralSettings
  header: VanderHeaderSettings
  footer: VanderFooterSettings
}

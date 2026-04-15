# wp-nuxt-core

Shared Nuxt 3 composables and utilities for headless WordPress sites.

## Installation

Install directly from GitHub in your Nuxt 3 site:

```bash
npm install github:vanderweb/wp-nuxt-core
```

Or pin to a tag/commit:

```bash
npm install github:vanderweb/wp-nuxt-core#v0.1.0
```

## Setup

### 1. Set your WordPress API base URL

```env
# .env
WP_API_BASE=https://your-wp-site.com
```

### 2. Expose it via runtimeConfig

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      wpApiBase: process.env.WP_API_BASE,
    },
  },
})
```

### 3. Register composables for auto-import (optional but recommended)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    dirs: ['node_modules/@yourname/wp-nuxt-core/composables'],
  },
})
```

---

## Usage

### `useWordPress()`

Fetch pages and posts from the WordPress REST API.

```vue
<script setup lang="ts">
const { getPage, getPosts, getPost, searchContent } = useWordPress()

// Fetch a single page by slug
const page = await getPage('about')

// Fetch all posts (with optional params)
const posts = await getPosts({ per_page: 10, order: 'desc' })

// Fetch a single post by slug
const post = await getPost('my-first-post')

// Search posts
const results = await searchContent('nuxt wordpress')
</script>
```

---

### `useSeo(content, canonicalBase?)`

Sets SEO meta from Yoast data or falls back to post/page fields.

```vue
<script setup lang="ts">
const { getPage } = useWordPress()
const page = await getPage('home')

// Uses Yoast title/description/og:image if available
useSeo(page, 'https://your-site.com')
</script>
```

The second argument `canonicalBase` is optional. When provided, canonical URLs are constructed as `canonicalBase/slug`.

---

### `useWpImage()`

Get typed image URLs by size, with a safe fallback.

```vue
<script setup lang="ts">
const { getImageUrl, getImageAlt } = useWpImage()
const { getMedia } = useWordPress()

const image = await getMedia(42)

const src = getImageUrl(image, 'large')   // falls back to source_url
const alt = getImageAlt(image)
</script>

<template>
  <img :src="src" :alt="alt" />
</template>
```

Available sizes: `'full'` (default) | `'large'` | `'medium'` | `'thumbnail'`

---

## TypeScript types

All types are exported and can be imported directly:

```ts
import type { WpPost, WpPage, WpImage, WpApiParams } from '@yourname/wp-nuxt-core'
```

---

## Requirements

- Nuxt `^3.0.0`
- WordPress site with REST API enabled (default)
- [Yoast SEO](https://yoast.com/wordpress/plugins/seo/) plugin recommended for full SEO metadata support

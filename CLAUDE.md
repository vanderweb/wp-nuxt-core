# wp-nuxt-core

Shared Nuxt 3 + headless WordPress core package. Installed across multiple Nuxt 3 site repos via GitHub.

## Purpose

Provides reusable TypeScript types, a fetch utility, and auto-importable Nuxt 3 composables for consuming a WordPress REST API.

## Rules

- **No site-specific logic** — everything must be generic and reusable across any headless WordPress site.
- **TypeScript strict mode** — all files must satisfy `strict: true`.
- **No hardcoded URLs** — base URL always comes from `runtimeConfig.public.wpApiBase`.
- **Composables must be Nuxt 3 auto-import compatible** — no manual imports needed in consuming sites.
- **Handle null/undefined gracefully** — all API responses may return empty arrays or missing fields.

## Consuming sites must set

```ts
// nuxt.config.ts
runtimeConfig: {
  public: {
    wpApiBase: process.env.WP_API_BASE,
  }
}
```

## Exports

### Types (`types/wordpress.ts`)
- `WpPost` — blog post
- `WpPage` — page (extends WpPost with `parent`, `menu_order`)
- `WpImage` — media item with `media_details.sizes`
- `WpMenu` / `WpMenuItem` — nav menu structures
- `WpApiParams` — shared query param shape
- `YoastHeadJson` — Yoast SEO metadata

### Utils (`utils/wpApi.ts`)
- `wpFetch<T>(baseUrl, endpoint, params?)` — typed `$fetch` wrapper with readable error messages

### Composables (`composables/`)
- `useWordPress()` — `getPage`, `getPages`, `getPost`, `getPosts`, `getMedia`, `searchContent`
- `useSeo(content, canonicalBase?)` — sets SEO meta from Yoast or fallback fields
- `useWpImage()` — `getImageUrl(image, size?)`, `getImageAlt(image)`

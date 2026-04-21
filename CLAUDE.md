# wp-nuxt-core

Shared Nuxt 3 + headless WordPress core package. Installed across multiple Nuxt 3 site repos via GitHub.

## Purpose

Provides reusable TypeScript types, a fetch utility, and auto-importable Nuxt 3 composables for consuming a WordPress REST API and the VanderWeb WordPress Headless plugin.

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
    wpApiBase: process.env.WP_API_BASE,  // domain only, e.g. https://vander.dk (no /wp-json suffix)
  }
}
```

## Exports

### Types (`types/wordpress.ts`)

**Standard WP types**
- `WpPost` — blog post
- `WpPage` — page (extends WpPost; includes `page_sections: VanderSection[]` when plugin is active)
- `WpImage` — media item with `media_details.sizes`
- `WpMenu` / `WpMenuItem` — nav menu structures
- `WpApiParams` — shared query param shape
- `YoastHeadJson` — Yoast SEO metadata

**Vander plugin types**
- `VanderAttachment` — resolved image `{ id, url, alt }` (plugin resolves attachment IDs server-side)
- `VanderCasePost` — resolved case post `{ id, slug, title, excerpt, thumbnail_url }`
- `VanderSection` — discriminated union of all 8 section types; narrow via `section.type`
- `VanderHeroSection`, `VanderServicesSection`, `VanderCasesSection`, `VanderAboutSection`, `VanderTestimonialsSection`, `VanderContactSection`, `VanderTextImageSection`, `VanderFreetextSection`
- `VanderSettings` — `{ general, header, footer }`
- `VanderGeneralSettings`, `VanderHeaderSettings`, `VanderFooterSettings`
- `VanderNavLink`, `VanderFooterColumn`, `VanderFooterLink`, `VanderSocialLink`

### Utils (`utils/wpApi.ts`)
- `wpFetch<T>(baseUrl, endpoint, params?)` — typed `$fetch` wrapper for `/wp-json/wp/v2/` endpoints

### Composables (`composables/`)
- `useWordPress()` — `getPage`, `getPages`, `getPost`, `getPosts`, `getMedia`, `searchContent`
- `useVanderSettings()` — `getSettings()`, `saveSettings(data)` — hits `/wp-json/vander/v1/settings`
- `useSeo(content, canonicalBase?)` — sets SEO meta from Yoast or fallback fields
- `useWpImage()` — `getImageUrl(image, size?)`, `getImageAlt(image)`

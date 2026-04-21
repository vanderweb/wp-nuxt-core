import { useRuntimeConfig } from '#app'
import type { VanderSettings } from '../types/wordpress'

export function useVanderSettings() {
  const config = useRuntimeConfig()
  const baseUrl = (config.public.wpApiBase as string).replace(/\/$/, '')

  async function getSettings(): Promise<VanderSettings> {
    return $fetch<VanderSettings>(`${baseUrl}/wp-json/vander/v1/settings`)
  }

  async function saveSettings(data: Partial<VanderSettings>): Promise<{ success: boolean }> {
    return $fetch<{ success: boolean }>(`${baseUrl}/wp-json/vander/v1/settings`, {
      method: 'POST',
      body: data,
    })
  }

  return { getSettings, saveSettings }
}

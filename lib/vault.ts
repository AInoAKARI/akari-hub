const cache = new Map<string, { value: string; expires: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

type GetKeyOptions = {
  service: string
}

export async function getServiceApiKey({ service }: GetKeyOptions): Promise<string | null> {
  const addr = process.env.VAULT_ADDR
  const token = process.env.VAULT_TOKEN

  if (!addr || !token) {
    console.warn("[vault] VAULT_ADDR or VAULT_TOKEN not set")
    return null
  }

  // Check cache
  const cached = cache.get(service)
  if (cached && cached.expires > Date.now()) {
    return cached.value
  }

  try {
    // KV v2 path: api_keys/data/{service_name}
    const url = `${addr.replace(/\/$/, "")}/v1/api_keys/data/${encodeURIComponent(service)}`
    const res = await fetch(url, {
      headers: {
        "X-Vault-Token": token,
      },
      // Skip TLS verification in dev
      ...(process.env.VAULT_SKIP_VERIFY === "true" && {
      }),
    })

    if (!res.ok) {
      console.warn(`[vault] Failed to fetch key for ${service}: ${res.status}`)
      return null
    }

    const data = await res.json() as { data?: { data?: Record<string, string> } }
    const apiKey = data?.data?.data?.api_key ?? null

    if (apiKey) {
      cache.set(service, { value: apiKey, expires: Date.now() + CACHE_TTL })
    }

    return apiKey
  } catch (err) {
    console.error(`[vault] Error fetching key for ${service}:`, err)
    return null
  }
}

export function clearVaultCache(service?: string): void {
  if (service) {
    cache.delete(service)
  } else {
    cache.clear()
  }
}

export async function listVaultKeys(): Promise<string[]> {
  const addr = process.env.VAULT_ADDR
  const token = process.env.VAULT_TOKEN
  if (!addr || !token) return []

  try {
    const url = `${addr.replace(/\/$/, "")}/v1/api_keys/metadata`
    const res = await fetch(url, {
      method: "LIST",
      headers: { "X-Vault-Token": token },
    })
    if (!res.ok) return []
    const data = await res.json() as { data?: { keys?: string[] } }
    return data?.data?.keys ?? []
  } catch {
    return []
  }
}

interface Options extends RequestInit {
  timeout?: number,
  retry?: number
}

async function fetchWithTimeoutAndRetry(url: string, options: Options = {}): Promise<Response> {
  const controller = new AbortController()
  options.signal?.addEventListener('abort', () => controller.abort())
  if (options.timeout) {
    AbortSignal.timeout(options?.timeout).addEventListener('abort', () => controller.abort())
  }
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (e) {
    if (!options.retry || options.retry <= 1) {
      throw e
    }
    return await fetchWithTimeoutAndRetry(url, { ...options, retry: options.retry - 1 })
  }
}

export async function fetchJson<T>(url: string, options?: Options): Promise<T> {
  const defaultOptions: Options = {
    timeout: 10000,
    retry: 5,
    cache: 'force-cache',
    next: { revalidate: 600 }
  }
  const response = await fetchWithTimeoutAndRetry(url, { ...defaultOptions, ...options })
  return response.json() as T
}

/**
 * IndexNow protocol — instant search engine indexing.
 *
 * Submits URL changes to api.indexnow.org (global coordinator) which
 * propagates to Bing, Yandex, Seznam.cz, Naver, and other participants.
 *
 * The API key is public (served at `/{key}.txt`) so it is embedded here
 * directly rather than requiring an env var — simpler and guaranteed
 * to stay in sync with the key file in `public/`.
 *
 * ## Usage
 *
 * ```ts
 * import { submitToIndexNow } from '@/lib/indexnow'
 * await submitToIndexNow({ urls: ['/contact', '/states/rajasthan'] })
 * ```
 *
 * Batch up to 10 000 URLs per call.
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

// Key file hosted at https://psaraconsultantindia.com/9c4d8b2e-5a71-4f3d-8e6a-1b7c2d9f4a55.txt
const KEY = '9c4d8b2e-5a71-4f3d-8e6a-1b7c2d9f4a55'

// Override via SITE_URL env var for preview/staging deployments
const SITE_URL = process.env.SITE_URL || 'https://psaraconsultantindia.com'

export interface IndexNowResult {
  success: boolean
  status?: number
  error?: string
}

/**
 * Submit one or more URLs to IndexNow for immediate indexing.
 * Accepts relative paths (e.g. `/contact`) or absolute URLs.
 */
export async function submitToIndexNow(
  input: { urls: string[] },
): Promise<IndexNowResult> {
  const key = process.env.INDEXNOW_KEY || KEY
  const host = new URL(SITE_URL).host

  // Normalise relative → absolute and de-duplicate
  const urlList = [...new Set(
    input.urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u.startsWith('/') ? '' : '/'}${u}`)),
  )]

  if (urlList.length === 0) {
    return { success: false, error: 'No URLs to submit' }
  }

  const body = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })

    // 200 = OK, 202 = accepted (async verification)
    if (res.ok || res.status === 202) {
      return { success: true, status: res.status }
    }

    const text = await res.text()
    console.error(`[IndexNow] submission failed [${res.status}]:`, text)
    return { success: false, status: res.status, error: text }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[IndexNow] network error:', msg)
    return { success: false, error: msg }
  }
}

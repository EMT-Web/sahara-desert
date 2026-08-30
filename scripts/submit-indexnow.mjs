/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver, ...).
 *
 * Setup: the key file public/41b64e48b02d4819a18d8f97835bbf52.txt is served at
 * https://visitsaharadesert.com/41b64e48b02d4819a18d8f97835bbf52.txt
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs                 # submit every public URL (static routes + blog + tours + stories)
 *   node scripts/submit-indexnow.mjs /blog/foo /tours/bar   # submit only the given paths (or full URLs)
 *   node scripts/submit-indexnow.mjs --dry-run       # print the URL list, submit nothing
 *
 * Read-only Sanity fetches need no token. Run after each production deploy so
 * the statically-rendered tour/blog pages get recrawled.
 */
import { createClient } from '@sanity/client'
import { blogPosts } from '../src/data/blogPosts.js'

const KEY = '41b64e48b02d4819a18d8f97835bbf52'
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://visitsaharadesert.com').replace(/\/$/, '')
const HOST = new URL(SITE).host
const KEY_LOCATION = `${SITE}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2nicu1vl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-21',
  useCdn: false,
  perspective: 'published',
})

const STATIC_PATHS = [
  '/', '/tours', '/tours/marrakech', '/tours/fes', '/tours/casablanca',
  '/tours/agadir', '/tours/errachidia', '/about', '/guides', '/culture',
  '/sustainability', '/contact', '/gallery', '/stories', '/music', '/blog', '/privacy',
]

function toUrl(pathOrUrl) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  return `${SITE}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

async function collectAllUrls() {
  const paths = new Set(STATIC_PATHS)
  for (const post of blogPosts) {
    if (post.slug) paths.add(`/blog/${post.slug}`)
  }
  try {
    const tours = await client.fetch(
      `*[_type == "tour" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
    )
    for (const s of tours || []) if (s?.trim()) paths.add(`/tours/${s}`)
  } catch (e) {
    console.warn('Could not fetch tours from Sanity:', e.message)
  }
  try {
    const stories = await client.fetch(
      `*[_type == "story" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
    )
    for (const s of stories || []) if (s?.trim()) paths.add(`/stories/${s}`)
  } catch (e) {
    console.warn('Could not fetch stories from Sanity:', e.message)
  }
  return [...paths].map(toUrl)
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const explicit = args.filter((a) => !a.startsWith('--'))

  const urlList = explicit.length ? explicit.map(toUrl) : await collectAllUrls()

  console.log(`Host: ${HOST}`)
  console.log(`Key location: ${KEY_LOCATION}`)
  console.log(`URLs (${urlList.length}):`)
  urlList.forEach((u) => console.log('  ' + u))

  if (dryRun) {
    console.log('\n--dry-run: nothing submitted.')
    return
  }

  // IndexNow accepts up to 10,000 URLs per request.
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  })

  const text = await res.text()
  console.log(`\nIndexNow response: ${res.status} ${res.statusText}${text ? ` — ${text}` : ''}`)
  // 200 = accepted, 202 = accepted (key validation pending). Anything else is an error.
  if (res.status !== 200 && res.status !== 202) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

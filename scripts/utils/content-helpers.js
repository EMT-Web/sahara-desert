/**
 * Content Helper Functions
 * Utility functions for content processing
 */

/**
 * Create a document in Sanity
 */
export async function createDocument(client, type, data) {
  try {
    const result = await client.create({
      _type: type,
      ...data,
    })
    console.log(`✅ Created ${type}: ${data.title || data.name || 'Untitled'}`)
    return result
  } catch (error) {
    console.error(`❌ Error creating ${type}:`, error.message)
    if (error.message.includes('duplicate')) {
      console.log(`   ⚠️  Document already exists, skipping...`)
    }
    return null
  }
}

/**
 * Create multiple documents with delay to avoid rate limiting
 */
export async function createDocuments(client, type, items, delay = 500) {
  const results = []
  for (const item of items) {
    const result = await createDocument(client, type, item)
    results.push(result)
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  return results
}

/**
 * Generate slug from title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Parse text content and extract sections
 */
export function parseTextSection(content, startMarker, endMarker) {
  const startIndex = content.indexOf(startMarker)
  if (startIndex === -1) return null
  
  const endIndex = endMarker ? content.indexOf(endMarker, startIndex) : content.length
  if (endIndex === -1) return content.substring(startIndex + startMarker.length).trim()
  
  return content.substring(startIndex + startMarker.length, endIndex).trim()
}


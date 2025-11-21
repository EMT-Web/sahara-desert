import { client } from './sanity'

export async function fetchData(query) {
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return null
  }
}

export { client }

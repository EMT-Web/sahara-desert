/**
 * Assign Tour Images Script
 * --------------------------
 * Uploads images from public/images to Sanity and assigns them to tours.
 * - First 5 images → Agadir tours
 * - Next 5 images → Casablanca tours
 * - Next 6 images → Errachidia tours
 * - Remaining images → Gallery page
 * 
 * Usage:
 *   node scripts/assign-tour-images.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getSanityClient } from './utils/sanity-client.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Images directory
const IMAGES_DIR = path.resolve(__dirname, '../public/images')

// Helper: small sleep between API calls
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadImage(client, filePath, filename) {
  const stream = fs.createReadStream(filePath)

  try {
    const asset = await client.assets.upload('image', stream, {
      filename,
    })

    console.log(`✅ Uploaded: ${filename}`)
    return asset
  } catch (error) {
    console.error(`❌ Error uploading "${filename}":`, error.message)
    return null
  }
}

async function updateTourWithImage(client, tourSlug, imageAsset) {
  try {
    // Find tour by slug (including drafts)
    const tours = await client.fetch(
      `*[_type == "tour" && slug.current == $slug]`,
      { slug: tourSlug }
    )

    if (!tours || tours.length === 0) {
      console.log(`⚠️  Tour not found: ${tourSlug}`)
      return false
    }

    const tour = tours[0]

    // Update tour with mainImage and publish
    await client
      .patch(tour._id)
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      })
      .commit()

    // Publish the tour
    await client.patch(tour._id).publish()

    console.log(`  ✅ Assigned image and published tour: ${tour.title}`)
    return true
  } catch (error) {
    console.error(`❌ Error updating tour "${tourSlug}":`, error.message)
    return false
  }
}

async function createGalleryItem(client, imageAsset, index) {
  try {
    const result = await client.create({
      _type: 'galleryItem',
      title: `Sahara Desert Image ${index + 1}`,
      type: 'image',
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      caption: '',
      order: index,
    })

    // Publish the gallery item
    await client.patch(result._id).publish()

    console.log(`  ✅ Created and published gallery item: Image ${index + 1}`)
    return true
  } catch (error) {
    console.error(`❌ Error creating gallery item:`, error.message)
    return false
  }
}

async function run() {
  console.log('📸 Starting tour image assignment...\n')

  const client = getSanityClient()

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images folder not found at: ${IMAGES_DIR}`)
    process.exit(1)
  }

  const allFiles = await fs.promises.readdir(IMAGES_DIR)
  const imageFiles = allFiles
    .filter((file) => /\.(jpe?g)$/i.test(file))
    .sort() // Sort to ensure consistent ordering

  if (imageFiles.length === 0) {
    console.log('⚠️  No JPG/JPEG images found in public/images folder.')
    process.exit(0)
  }

  console.log(`📦 Found ${imageFiles.length} images\n`)

  // Tour slugs organized by city (matching the parser files)
  const agadirTours = [
    '3-days-sahara-desert-tour-from-agadir',
    '4-day-morocco-sahara-desert-tour-agadir-to-marrakech',
    '5-days-visit-sahara-desert-tour-from-agadir',
    '7-day-morocco-sahara-desert-tour-from-agadir',
  ]

  const casablancaTours = [
    '8-day-morocco-imperial-cities-sahara-tour-from-casablanca',
    '8-day-morocco-imperial-cities-chefchaouen-sahara-trek',
    '11-day-morocco-imperial-cities-chefchaouen-sahara-trek',
    '12-day-morocco-imperial-cities-sahara-coastal-adventure',
    '15-day-morocco-imperial-cities-sahara-coastal-adventure',
  ]

  const errachidiaTours = [
    '2-days-errachidia-merzouga',
    '3-days-errachidia-marrakech',
    '3-days-errachidia-fes',
    '4-days-errachidia-marrakech',
    '5-days-errachidia-marrakech',
    '5-days-errachidia-trekking',
  ]

  const totalToursNeeded = agadirTours.length + casablancaTours.length + errachidiaTours.length

  if (imageFiles.length < totalToursNeeded) {
    console.log(`⚠️  Warning: Only ${imageFiles.length} images found, but ${totalToursNeeded} tours need images.`)
    console.log(`   Will assign images to first ${imageFiles.length} tours.\n`)
  }

  // Step 1: Upload all images
  console.log('📤 Step 1: Uploading images to Sanity...\n')
  const uploadedAssets = []

  for (const filename of imageFiles) {
    const filePath = path.join(IMAGES_DIR, filename)
    const asset = await uploadImage(client, filePath, filename)
    if (asset) {
      uploadedAssets.push(asset)
    }
    await sleep(200) // Small delay between uploads
  }

  console.log(`\n✅ Uploaded ${uploadedAssets.length} images\n`)

  // Step 2: Assign images to tours
  console.log('🔗 Step 2: Assigning images to tours...\n')

  let imageIndex = 0

  // Agadir tours (5 tours)
  console.log('📍 Assigning images to Agadir tours...')
  for (const tourSlug of agadirTours) {
    if (imageIndex >= uploadedAssets.length) break
    await updateTourWithImage(client, tourSlug, uploadedAssets[imageIndex])
    imageIndex++
    await sleep(200)
  }

  // Casablanca tours (5 tours)
  console.log('\n📍 Assigning images to Casablanca tours...')
  for (const tourSlug of casablancaTours) {
    if (imageIndex >= uploadedAssets.length) break
    await updateTourWithImage(client, tourSlug, uploadedAssets[imageIndex])
    imageIndex++
    await sleep(200)
  }

  // Errachidia tours (6 tours)
  console.log('\n📍 Assigning images to Errachidia tours...')
  for (const tourSlug of errachidiaTours) {
    if (imageIndex >= uploadedAssets.length) break
    await updateTourWithImage(client, tourSlug, uploadedAssets[imageIndex])
    imageIndex++
    await sleep(200)
  }

  // Step 3: Upload remaining images to gallery
  const remainingImages = uploadedAssets.slice(imageIndex)
  if (remainingImages.length > 0) {
    console.log(`\n🖼️  Step 3: Uploading ${remainingImages.length} remaining images to gallery...\n`)
    
    let galleryIndex = 0
    for (const asset of remainingImages) {
      await createGalleryItem(client, asset, galleryIndex)
      galleryIndex++
      await sleep(200)
    }
  } else {
    console.log('\nℹ️  No remaining images for gallery.')
  }

  const agadirAssigned = Math.min(agadirTours.length, uploadedAssets.length)
  const casablancaAssigned = Math.min(casablancaTours.length, Math.max(0, uploadedAssets.length - agadirTours.length))
  const errachidiaAssigned = Math.min(errachidiaTours.length, Math.max(0, uploadedAssets.length - agadirTours.length - casablancaTours.length))

  console.log('\n✨ Image assignment complete!')
  console.log(`\n📊 Summary:`)
  console.log(`   - Images uploaded: ${uploadedAssets.length}`)
  console.log(`   - Agadir tours (${agadirTours.length}): ${agadirAssigned} images assigned`)
  console.log(`   - Casablanca tours (${casablancaTours.length}): ${casablancaAssigned} images assigned`)
  console.log(`   - Errachidia tours (${errachidiaTours.length}): ${errachidiaAssigned} images assigned`)
  console.log(`   - Gallery items: ${remainingImages.length} created`)
  console.log(`\n✅ All tours and gallery items have been automatically published!`)
}

run().catch((error) => {
  console.error('❌ Fatal error:', error)
  process.exit(1)
})


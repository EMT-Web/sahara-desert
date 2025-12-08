/**
 * Import Images Script
 * --------------------
 * Uploads images from the local `images/` folder to Sanity
 * and automatically connects them to Guides, Homepage hero,
 * Tours, About page, and Gallery items based on file names.
 *
 * Usage:
 *   node scripts/import-images.mjs
 */

import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import {getSanityClient} from './utils/sanity-client.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Folder where you placed all JPG/JPEG images
const IMAGES_DIR = path.resolve(__dirname, '../images')

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

    console.log(`✅ Uploaded image: ${filename} → ${asset._id}`)
    return asset
  } catch (error) {
    console.error(`❌ Error uploading image "${filename}":`, error.message)
    return null
  }
}

async function findSingleDoc(client, query, params = {}) {
  const result = await client.fetch(query, params)

  // GROQ queries may return either an array or a single document
  if (Array.isArray(result)) {
    return result[0] || null
  }

  return result || null
}

async function run() {
  console.log('📸 Starting image import from local "images" folder...\n')

  const client = getSanityClient()

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images folder not found at: ${IMAGES_DIR}`)
    console.error('   Create an "images" folder in the project root and put your JPG/JPEG images there.')
    process.exit(1)
  }

  const allFiles = await fs.promises.readdir(IMAGES_DIR)
  const imageFiles = allFiles.filter((file) => /\.(jpe?g)$/i.test(file))

  if (imageFiles.length === 0) {
    console.log('⚠️  No JPG/JPEG images found in the images folder.')
    process.exit(0)
  }

  console.log(`📦 Found ${imageFiles.length} image files to process.\n`)

  // Maps from base filename (lowercase, without extension) to uploaded asset
  const assetByBaseName = {}

  // 1) Upload all images first
  for (const filename of imageFiles) {
    const filePath = path.join(IMAGES_DIR, filename)
    const base = path.basename(filename, path.extname(filename)).toLowerCase()

    const asset = await uploadImage(client, filePath, filename)
    if (asset) {
      assetByBaseName[base] = asset
    }

    // Small delay to be gentle on API
    await sleep(200)
  }

  console.log('\n✅ All images uploaded (that could be uploaded).')
  console.log('🔗 Now connecting images to guides, homepage, tours, about, and gallery...\n')

  // 2) Attach images to Guides (profileImage)
  const guideNameMap = {
    mustafa: 'Mustafa',
    ahmad: 'Ahmad',
    youssef: 'Youssef',
    youssef_: 'Youssef', // safety if name variations appear
    said: 'Said',
    abdul: 'Abdul',
    hsyan: 'Hsyan',
    hsayn: 'Hsyan',
    anwar: 'Anwar',
  }

  for (const [base, displayName] of Object.entries(guideNameMap)) {
    const asset =
      assetByBaseName[base] ||
      assetByBaseName[base.toLowerCase()] ||
      null

    if (!asset) continue

    const guide = await findSingleDoc(
      client,
      '*[_type == "guide" && !(_id in path("drafts.**")) && lower(name) == $name]{_id, name}',
      {name: displayName.toLowerCase()},
    )

    if (!guide) {
      console.log(`⚠️  No guide found in Sanity for name "${displayName}" (base "${base}")`)
      continue
    }

    try {
      await client
        .patch(guide._id)
        .set({
          profileImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit()

      console.log(`👤 Linked image "${base}" → guide "${guide.name}" (profileImage)`)
    } catch (error) {
      console.error(`❌ Error patching guide "${guide.name}":`, error.message)
    }

    await sleep(200)
  }

  // 3) Homepage hero image
  // Prefer a nice wide feeling image by filename
  const homepageHeroCandidates = [
    'morningsunset',
    'evening',
    'camels_farview',
    'desert1',
    'desert2',
  ]

  let heroAsset = null
  for (const candidate of homepageHeroCandidates) {
    if (assetByBaseName[candidate]) {
      heroAsset = assetByBaseName[candidate]
      break
    }
  }

  if (heroAsset) {
    const homepage = await findSingleDoc(
      client,
      '*[_type == "homepage" && !(_id in path("drafts.**"))]{_id, heroTitle}',
      {},
    )

    if (homepage) {
      try {
        await client
          .patch(homepage._id)
          .set({
            heroImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: heroAsset._id,
              },
            },
          })
          .commit()

        console.log(
          `🏠 Linked image "${heroAsset.originalFilename || 'hero'}" as homepage heroImage`,
        )
      } catch (error) {
        console.error('❌ Error patching homepage heroImage:', error.message)
      }
    } else {
      console.log('⚠️  No homepage document found to attach heroImage.')
    }
  } else {
    console.log('⚠️  No suitable hero image candidate found (morningsunset/evening/camels_farview/desert1/desert2).')
  }

  // 4) Tours mainImage assignment
  // Use desert / camp / car / camel images for tours
  const tourImageBases = Object.keys(assetByBaseName).filter((base) =>
    /desert|camp|car|camel/.test(base),
  )

  if (tourImageBases.length > 0) {
    const tours = await client.fetch(
      '*[_type == "tour" && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) asc){_id, title, mainImage}',
    )

    if (tours && tours.length > 0) {
      console.log(`\n🚌 Assigning images to ${tours.length} tours...`)

      let idx = 0
      for (const tour of tours) {
        // Only set mainImage if not already set
        if (tour.mainImage && tour.mainImage.asset && tour.mainImage.asset._ref) {
          console.log(`   ↩︎ Tour "${tour.title}" already has a mainImage, skipping`)
          continue
        }

        const base = tourImageBases[idx % tourImageBases.length]
        const asset = assetByBaseName[base]
        idx += 1

        if (!asset) continue

        try {
          await client
            .patch(tour._id)
            .set({
              mainImage: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: asset._id,
                },
              },
            })
            .commit()

          console.log(`🚌 Linked image "${base}" → tour "${tour.title}" (mainImage)`)
        } catch (error) {
          console.error(`❌ Error patching tour "${tour.title}":`, error.message)
        }

        await sleep(200)
      }
    } else {
      console.log('⚠️  No tours found to attach main images.')
    }
  } else {
    console.log('⚠️  No desert/camp/car/camel images found for tours.')
  }

  // 5) About page founders/team images
  // Use people / team / gathering images here
  const aboutImageBases = Object.keys(assetByBaseName).filter((base) =>
    /people|team|gathering/.test(base),
  )

  if (aboutImageBases.length > 0) {
    const about = await findSingleDoc(
      client,
      '*[_type == "about" && !(_id in path("drafts.**"))]{_id, title}',
      {},
    )

    if (about) {
      const imagesArray = aboutImageBases.map((base) => {
        const asset = assetByBaseName[base]
        return {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        }
      })

      try {
        await client
          .patch(about._id)
          .set({
            foundersImages: imagesArray,
          })
          .commit()

        console.log(
          `👥 Linked ${imagesArray.length} images to About page (foundersImages field).`,
        )
      } catch (error) {
        console.error('❌ Error patching About page foundersImages:', error.message)
      }
    } else {
      console.log('⚠️  No About document found to attach foundersImages.')
    }
  } else {
    console.log('⚠️  No people/team/gathering images found for About page.')
  }

  // 6) Gallery items for remaining images
  const usedBases = new Set([
    ...Object.keys(guideNameMap),
    ...homepageHeroCandidates,
    ...tourImageBases,
    ...aboutImageBases,
  ])

  const galleryBases = Object.keys(assetByBaseName).filter(
    (base) => !usedBases.has(base),
  )

  if (galleryBases.length > 0) {
    console.log(`\n🖼  Creating ${galleryBases.length} gallery items...`)

    for (const base of galleryBases) {
      const asset = assetByBaseName[base]
      if (!asset) continue

      const niceTitle = base
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())

      try {
        await client.create({
          _type: 'galleryItem',
          title: niceTitle,
          type: 'image',
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
          caption: '',
        })

        console.log(`🖼  Created gallery item for "${base}"`)
      } catch (error) {
        console.error(`❌ Error creating gallery item for "${base}":`, error.message)
      }

      await sleep(200)
    }
  } else {
    console.log('ℹ️  No remaining images to create gallery items from.')
  }

  console.log('\n✨ Image import and linking complete.')
  console.log('   You can review everything in Sanity Studio and publish if needed.')
}

run().catch((error) => {
  console.error('❌ Unexpected error in import-images script:', error)
  process.exit(1)
})



/**
 * SANITY CMS SCHEMAS FOR SAHARA DESERT TRAVEL WEBSITE
 * 
 * Copy these schemas into your Sanity Studio project
 * Location: sanity/schemas/ (or schemas/ folder in your Sanity project)
 * 
 * Instructions:
 * 1. Create a new Sanity project at https://www.sanity.io
 * 2. Install Sanity Studio in your project or use Sanity CLI
 * 3. Copy each schema below into separate files in your schemas folder
 * 4. Import them in your schema.js file
 */

// ============================================
// 1. HOMEPAGE SCHEMA
// File: schemas/homepage.js
// ============================================
export const homepageSchema = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline on homepage (e.g., "Where the dunes sing at sunset")',
      validation: Rule => Rule.required(),
      initialValue: 'Where the dunes sing at sunset',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text below the main headline',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Main background image for homepage hero section',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroVideo',
      title: 'Hero Background Video (Optional)',
      type: 'url',
      description: 'URL to video file (MP4) for hero background. If provided, video will be used instead of image.',
    },
    {
      name: 'ambientSound',
      title: 'Ambient Desert Sound (Optional)',
      type: 'url',
      description: 'URL to audio file (MP3) for ambient desert soundscape (wind + drum rhythm)',
    },
    {
      name: 'featuredTours',
      title: 'Featured Tours',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tour' }],
        },
      ],
      description: 'Select tours to feature on the homepage',
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
}

// ============================================
// 2. TOUR SCHEMA
// File: schemas/tour.js
// ============================================
export const tourSchema = {
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tour Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for the tour gallery',
    },
    {
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on tour cards',
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Full Description',
      type: 'text',
      rows: 10,
      description: 'Detailed tour description',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "1 Night", "2 Nights", "3 Days"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price per person in USD',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'highlights',
      title: 'Tour Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key features and highlights of this tour',
    },
    {
      name: 'included',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items and services included in the tour',
    },
    {
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items not included in the tour price',
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day/Title',
              type: 'string',
              description: 'e.g., "Day 1" or "Arrival Day"',
            },
            {
              name: 'title',
              title: 'Title (Alternative)',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            },
            {
              name: 'content',
              title: 'Content (Alternative)',
              type: 'text',
              rows: 4,
            },
          ],
        },
      ],
    },
    {
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Culture', value: 'culture' },
          { title: 'Sunsets', value: 'sunsets' },
          { title: 'Desert Music', value: 'music' },
          { title: 'Adventure', value: 'adventure' },
          { title: 'Photography', value: 'photography' },
        ],
      },
      description: 'What this tour focuses on',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      duration: 'duration',
      price: 'price',
    },
    prepare({ title, media, duration, price }) {
      return {
        title,
        subtitle: `${duration} - $${price}`,
        media,
      }
    },
  },
}

// ============================================
// 3. STORY SCHEMA
// File: schemas/story.js
// ============================================
export const storySchema = {
  name: 'story',
  title: 'Story / Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on story cards',
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 15,
      description: 'Full story content',
      validation: Rule => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Travel Stories', value: 'travel' },
          { title: 'Legends', value: 'legends' },
          { title: 'Photography', value: 'photography' },
          { title: 'Packing Tips', value: 'tips' },
          { title: 'Sunsets', value: 'sunsets' },
          { title: 'Music', value: 'music' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      return {
        title,
        subtitle: author ? `by ${author}` : 'No author',
        media,
      }
    },
  },
}

// ============================================
// 4. AUTHOR SCHEMA
// File: schemas/author.js
// ============================================
export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}

// ============================================
// 5. GALLERY ITEM SCHEMA
// File: schemas/galleryItem.js
// ============================================
export const galleryItemSchema = {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'URL to video file (MP4) or YouTube/Vimeo embed URL',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Dunes', value: 'dunes' },
          { title: 'Sunsets', value: 'sunsets' },
          { title: 'Camps', value: 'camps' },
          { title: 'Music', value: 'music' },
          { title: 'Culture', value: 'culture' },
          { title: '360° View', value: '360' },
          { title: 'Drone View', value: 'drone' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      type: 'type',
    },
    prepare({ title, media, type }) {
      return {
        title: title || 'Untitled',
        subtitle: type === 'video' ? 'Video' : 'Image',
        media,
      }
    },
  },
}

// ============================================
// 6. MUSIC ENTRY SCHEMA
// File: schemas/musicEntry.js
// ============================================
export const musicEntrySchema = {
  name: 'musicEntry',
  title: 'Music Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the music piece or artist',
      validation: Rule => Rule.required(),
    },
    {
      name: 'portraitImage',
      title: 'Portrait/Artist Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the musician or related visual',
    },
    {
      name: 'audioClip',
      title: 'Audio Clip URL',
      type: 'url',
      description: 'URL to audio file (MP3, WAV, etc.)',
    },
    {
      name: 'videoLink',
      title: 'Video Link (Optional)',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Information about the music, artist, or tradition',
    },
    {
      name: 'artistName',
      title: 'Artist/Musician Name',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0),
    },
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artistName',
      media: 'portraitImage',
    },
    prepare({ title, artist, media }) {
      return {
        title,
        subtitle: artist || 'Music',
        media,
      }
    },
  },
}

// ============================================
// 7. GUIDE SCHEMA
// File: schemas/guide.js
// ============================================
export const guideSchema = {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Lead Guide", "Cultural Expert", "Musician Guide"',
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
      description: 'Guide background and expertise',
      validation: Rule => Rule.required(),
    },
    {
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Languages the guide speaks',
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
      description: 'e.g., "15 years", "Over 20 years"',
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas of expertise',
      options: {
        list: [
          { title: 'Cultural Heritage', value: 'culture' },
          { title: 'Desert Navigation', value: 'navigation' },
          { title: 'Traditional Music', value: 'music' },
          { title: 'Photography', value: 'photography' },
          { title: 'Astronomy', value: 'astronomy' },
          { title: 'Cuisine', value: 'cuisine' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0),
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'profileImage',
    },
    prepare({ title, role, media }) {
      return {
        title,
        subtitle: role || 'Guide',
        media,
      }
    },
  },
}

// ============================================
// 8. CULTURE SCHEMA
// File: schemas/culture.js
// ============================================
export const cultureSchema = {
  name: 'culture',
  title: 'Culture Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Saharan Culture & Traditions',
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 5,
      description: 'Opening text for the culture page',
    },
    {
      name: 'berberTraditions',
      title: 'Berber Traditions',
      type: 'text',
      rows: 8,
      description: 'Content about Berber traditions and customs',
    },
    {
      name: 'campfireStorytelling',
      title: 'Campfire Storytelling',
      type: 'text',
      rows: 8,
      description: 'Content about campfire storytelling traditions',
    },
    {
      name: 'sections',
      title: 'Additional Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 6,
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

// ============================================
// 9. SUSTAINABILITY SCHEMA
// File: schemas/sustainability.js
// ============================================
export const sustainabilitySchema = {
  name: 'sustainability',
  title: 'Sustainability Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Commitment to Sustainability',
    },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 5,
      description: 'Opening text for the sustainability page',
    },
    {
      name: 'initiatives',
      title: 'Sustainability Initiatives',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Initiative Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 6,
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

// ============================================
// 10. ABOUT SCHEMA
// File: schemas/about.js
// ============================================
export const aboutSchema = {
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Story',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle below the main title',
    },
    {
      name: 'foundersStory',
      title: 'Founders Story',
      type: 'text',
      rows: 12,
      description: 'The story of how the company was founded and the founders\' journey',
    },
    {
      name: 'foundersImages',
      title: 'Founders/Team Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Photos of founders or team members',
    },
    {
      name: 'localExpertise',
      title: 'Local Expertise',
      type: 'text',
      rows: 8,
      description: 'Content about local expertise and knowledge',
    },
    {
      name: 'sustainabilityCommitment',
      title: 'Sustainability Commitment',
      type: 'text',
      rows: 6,
      description: 'Statement about commitment to sustainability',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

// ============================================
// 11. CONTACT SCHEMA
// File: schemas/contact.js
// ============================================
export const contactSchema = {
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Phone number with country code (e.g., +212 6XX XXX XXX)',
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp number with country code (e.g., +212 6XX XXX XXX)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      description: 'Physical address for Google Maps',
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'email',
      phone: 'phone',
    },
    prepare({ title, phone }) {
      return {
        title: title || 'Contact Information',
        subtitle: phone || 'No phone',
      }
    },
  },
}

// ============================================
// 12. SITE SETTINGS SCHEMA
// File: schemas/siteSettings.js
// ============================================
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main site title',
      initialValue: 'Sahara Desert Travel',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for SEO',
    },
    {
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Menu Item Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'e.g., "/tours", "/about"',
            },
          ],
        },
      ],
      description: 'Custom navigation menu (optional - defaults will be used if empty)',
    },
    {
      name: 'footer',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
      description: 'Additional footer text',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

// ============================================
// SCHEMA INDEX FILE
// File: schemas/index.js
// ============================================
/**
 * Import all schemas here and export them
 * 
 * Example:
 * 
 * import { homepageSchema } from './homepage'
 * import { tourSchema } from './tour'
 * // ... import all other schemas
 * 
 * export default [
 *   homepageSchema,
 *   tourSchema,
 *   storySchema,
 *   authorSchema,
 *   galleryItemSchema,
 *   musicEntrySchema,
 *   guideSchema,
 *   cultureSchema,
 *   sustainabilitySchema,
 *   aboutSchema,
 *   contactSchema,
 *   siteSettingsSchema,
 * ]
 */


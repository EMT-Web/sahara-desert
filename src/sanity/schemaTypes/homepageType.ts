import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline on homepage (e.g., "Where the dunes sing at sunset")',
      validation: (Rule) => Rule.required(),
      initialValue: 'Where the dunes sing at sunset',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text below the main headline',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Main background image for homepage hero section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video (Optional)',
      type: 'url',
      description: 'URL to video file (MP4) for hero background. If provided, video will be used instead of image.',
    }),
    defineField({
      name: 'ambientSound',
      title: 'Ambient Desert Sound (Optional)',
      type: 'url',
      description: 'URL to audio file (MP3) for ambient desert soundscape (wind + drum rhythm)',
    }),
    defineField({
      name: 'featuredTours',
      title: 'Featured Tours',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tour'}],
        },
      ],
      description: 'Select tours to feature on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
})


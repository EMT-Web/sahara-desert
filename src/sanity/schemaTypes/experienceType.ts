import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Sahara Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Experience Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Camel Trekking', value: 'camel-trekking'},
          {title: 'Desert Camping', value: 'desert-camping'},
          {title: 'Luxury Camping', value: 'luxury-camping'},
          {title: 'Sandboarding', value: 'sandboarding'},
          {title: 'Cultural Experience', value: 'cultural'},
          {title: 'Photography', value: 'photography'},
          {title: 'Stargazing', value: 'stargazing'},
          {title: 'Music & Campfires', value: 'music'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      description: 'Detailed description of the experience',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      rows: 2,
      description: 'Comma-separated SEO keywords',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({title, category, media}) {
      return {
        title,
        subtitle: category || 'Experience',
        media,
      }
    },
  },
})


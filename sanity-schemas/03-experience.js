export default {
  name: 'experience',
  title: 'Sahara Experience',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Experience Title',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Camel Trekking', value: 'camel-trekking' },
          { title: 'Desert Camping', value: 'desert-camping' },
          { title: 'Luxury Camping', value: 'luxury-camping' },
          { title: 'Sandboarding', value: 'sandboarding' },
          { title: 'Cultural Experience', value: 'cultural' },
          { title: 'Photography', value: 'photography' },
          { title: 'Stargazing', value: 'stargazing' },
          { title: 'Music & Campfires', value: 'music' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      description: 'Detailed description of the experience',
      validation: Rule => Rule.required(),
    },
    {
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      rows: 2,
      description: 'Comma-separated SEO keywords',
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
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category || 'Experience',
        media,
      }
    },
  },
}


import {defineArrayMember, defineField, defineType} from 'sanity'

export const tourType = defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tour Title',
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
      name: 'departureCity',
      title: 'Departure City',
      type: 'string',
      description: 'e.g., Marrakech, Fes, Casablanca, Agadir, Errachidia',
      options: {
        list: [
          {title: 'Marrakech', value: 'marrakech'},
          {title: 'Fes', value: 'fes'},
          {title: 'Casablanca', value: 'casablanca'},
          {title: 'Agadir', value: 'agadir'},
          {title: 'Errachidia', value: 'errachidia'},
        ],
      },
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 Days", "4 Days", "5 Days"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Additional images for the tour gallery',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description shown on tour cards',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'text',
      rows: 10,
      description: 'Detailed tour description',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Price per person in USD',
    }),
    defineField({
      name: 'highlights',
      title: 'Tour Highlights',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key features and highlights of this tour',
    }),
    defineField({
      name: 'included',
      title: "What's Included",
      type: 'array',
      of: [{type: 'string'}],
      description: 'Items and services included in the tour',
    }),
    defineField({
      name: 'notIncluded',
      title: 'Not Included',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Items not included in the tour price',
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day/Title',
              type: 'string',
              description: 'e.g., "Day 1" or "Arrival Day"',
            }),
            defineField({
              name: 'title',
              title: 'Title (Alternative)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 6,
            }),
            defineField({
              name: 'overnight',
              title: 'Overnight Location',
              type: 'string',
              description: 'Where you stay overnight (e.g., "Merzouga desert camp")',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Culture', value: 'culture'},
          {title: 'Sunsets', value: 'sunsets'},
          {title: 'Desert Music', value: 'music'},
          {title: 'Adventure', value: 'adventure'},
          {title: 'Photography', value: 'photography'},
        ],
      },
      description: 'What this tour focuses on',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      rows: 3,
      description: 'Comma-separated SEO keywords for this tour',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      duration: 'duration',
      price: 'price',
      city: 'departureCity',
    },
    prepare({title, media, duration, price, city}) {
      return {
        title,
        subtitle: `${city ? city.toUpperCase() + ' - ' : ''}${duration}${price ? ' - $' + price : ''}`,
        media,
      }
    },
  },
})


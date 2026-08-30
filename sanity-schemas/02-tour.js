export default {
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
      name: 'departureCity',
      title: 'Departure City',
      type: 'string',
      description: 'e.g., Marrakech, Fes, Casablanca, Agadir, Errachidia',
      options: {
        list: [
          { title: 'Marrakech', value: 'marrakech' },
          { title: 'Fes', value: 'fes' },
          { title: 'Casablanca', value: 'casablanca' },
          { title: 'Agadir', value: 'agadir' },
          { title: 'Errachidia', value: 'errachidia' },
        ],
      },
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 Days", "4 Days", "5 Days"',
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
      name: 'price',
      title: 'Price (USD) — legacy, use fields below',
      type: 'number',
      description: 'Legacy single price field — prefer priceSingle/Double/Triple/Quad',
    },
    {
      name: 'priceSingle',
      title: 'Price — Single Room (1 person)',
      type: 'number',
      description: 'Price per person for a single-occupancy room (USD)',
    },
    {
      name: 'priceDouble',
      title: 'Price — Double Room (per person, 2 sharing)',
      type: 'number',
      description: 'Price per person when 2 people share a room (USD) — shown on tour cards',
    },
    {
      name: 'priceTriple',
      title: 'Price — Triple Room (per person, 3 sharing)',
      type: 'number',
      description: 'Price per person when 3 people share a room (USD)',
    },
    {
      name: 'priceQuad',
      title: 'Price — Quadruple Room (per person, 4 sharing)',
      type: 'number',
      description: 'Price per person when 4 people share a room (USD)',
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
              rows: 6,
            },
            {
              name: 'overnight',
              title: 'Overnight Location',
              type: 'string',
              description: 'Where you stay overnight (e.g., "Merzouga desert camp")',
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
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'text',
      rows: 3,
      description: 'Comma-separated SEO keywords for this tour',
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
      city: 'departureCity',
    },
    prepare({ title, media, duration, price, city }) {
      return {
        title,
        subtitle: `${city ? city.toUpperCase() + ' - ' : ''}${duration}${price ? ' - $' + price : ''}`,
        media,
      }
    },
  },
}


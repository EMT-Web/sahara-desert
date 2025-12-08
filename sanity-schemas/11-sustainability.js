export default {
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


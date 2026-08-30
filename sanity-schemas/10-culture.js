export default {
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


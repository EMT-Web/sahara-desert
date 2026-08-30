export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main site title',
      initialValue: 'Visit Sahara Desert | Authentic Morocco Desert Tours',
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


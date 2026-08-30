import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main site title',
      initialValue: 'Visit Sahara Desert | Authentic Morocco Desert Tours',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for SEO',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Menu Item Title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'e.g., "/tours", "/about"',
            }),
          ],
        }),
      ],
      description: 'Custom navigation menu (optional - defaults will be used if empty)',
    }),
    defineField({
      name: 'footer',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
      description: 'Additional footer text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})


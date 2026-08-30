import {defineArrayMember, defineField, defineType} from 'sanity'

export const cultureType = defineType({
  name: 'culture',
  title: 'Culture Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Saharan Culture & Traditions',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 5,
      description: 'Opening text for the culture page',
    }),
    defineField({
      name: 'berberTraditions',
      title: 'Berber Traditions',
      type: 'text',
      rows: 8,
      description: 'Content about Berber traditions and customs',
    }),
    defineField({
      name: 'campfireStorytelling',
      title: 'Campfire Storytelling',
      type: 'text',
      rows: 8,
      description: 'Content about campfire storytelling traditions',
    }),
    defineField({
      name: 'sections',
      title: 'Additional Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 6,
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{type: 'image', options: {hotspot: true}}],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})


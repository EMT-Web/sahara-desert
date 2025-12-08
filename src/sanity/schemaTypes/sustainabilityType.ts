import {defineArrayMember, defineField, defineType} from 'sanity'

export const sustainabilityType = defineType({
  name: 'sustainability',
  title: 'Sustainability Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Commitment to Sustainability',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 5,
      description: 'Opening text for the sustainability page',
    }),
    defineField({
      name: 'initiatives',
      title: 'Sustainability Initiatives',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Initiative Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 6,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
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


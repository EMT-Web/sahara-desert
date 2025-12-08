import {defineArrayMember, defineField, defineType} from 'sanity'

export const guideType = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Lead Guide", "Cultural Expert", "Musician Guide", "Adventurer", "Storyteller", "Thrill-seeker", "Culinary Enthusiast", "Community Connector"',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
      description: 'Guide background and expertise',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Languages the guide speaks',
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
      description: 'e.g., "15 years", "Over 20 years"',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Areas of expertise',
      options: {
        list: [
          {title: 'Cultural Heritage', value: 'culture'},
          {title: 'Desert Navigation', value: 'navigation'},
          {title: 'Traditional Music', value: 'music'},
          {title: 'Photography', value: 'photography'},
          {title: 'Astronomy', value: 'astronomy'},
          {title: 'Cuisine', value: 'cuisine'},
          {title: 'Adventure', value: 'adventure'},
          {title: 'Storytelling', value: 'storytelling'},
        ],
      },
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
      title: 'name',
      role: 'role',
      media: 'profileImage',
    },
    prepare({title, role, media}) {
      return {
        title,
        subtitle: role || 'Guide',
        media,
      }
    },
  },
})


import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle below the main title',
    }),
    defineField({
      name: 'foundersStory',
      title: 'Founders Story',
      type: 'text',
      rows: 12,
      description: 'The story of how the company was founded and the founders\' journey',
    }),
    defineField({
      name: 'foundersImages',
      title: 'Founders/Team Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Photos of founders or team members',
    }),
    defineField({
      name: 'localExpertise',
      title: 'Local Expertise',
      type: 'text',
      rows: 8,
      description: 'Content about local expertise and knowledge',
    }),
    defineField({
      name: 'sustainabilityCommitment',
      title: 'Sustainability Commitment',
      type: 'text',
      rows: 6,
      description: 'Statement about commitment to sustainability',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'role',
              title: 'Role/Description',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
      description: 'List of team members (Mustafa, Ahmad, Youssef, Said, Abdul, Hsyan)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})


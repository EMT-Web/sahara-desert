import {defineField, defineType} from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'URL to video file (MP4) or YouTube/Vimeo embed URL',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Dunes', value: 'dunes'},
          {title: 'Sunsets', value: 'sunsets'},
          {title: 'Camps', value: 'camps'},
          {title: 'Music', value: 'music'},
          {title: 'Culture', value: 'culture'},
          {title: '360° View', value: '360'},
          {title: 'Drone View', value: 'drone'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      type: 'type',
    },
    prepare({title, media, type}) {
      return {
        title: title || 'Untitled',
        subtitle: type === 'video' ? 'Video' : 'Image',
        media,
      }
    },
  },
})


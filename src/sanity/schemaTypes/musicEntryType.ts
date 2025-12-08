import {defineField, defineType} from 'sanity'

export const musicEntryType = defineType({
  name: 'musicEntry',
  title: 'Music Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the music piece or artist',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait/Artist Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the musician or related visual',
    }),
    defineField({
      name: 'audioClip',
      title: 'Audio Clip URL',
      type: 'url',
      description: 'URL to audio file (MP3, WAV, etc.)',
    }),
    defineField({
      name: 'videoLink',
      title: 'Video Link (Optional)',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Information about the music, artist, or tradition',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist/Musician Name',
      type: 'string',
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
      title: 'title',
      artist: 'artistName',
      media: 'portraitImage',
    },
    prepare({title, artist, media}) {
      return {
        title,
        subtitle: artist || 'Music',
        media,
      }
    },
  },
})


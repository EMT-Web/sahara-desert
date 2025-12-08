export default {
  name: 'musicEntry',
  title: 'Music Entry',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the music piece or artist',
      validation: Rule => Rule.required(),
    },
    {
      name: 'portraitImage',
      title: 'Portrait/Artist Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the musician or related visual',
    },
    {
      name: 'audioClip',
      title: 'Audio Clip URL',
      type: 'url',
      description: 'URL to audio file (MP3, WAV, etc.)',
    },
    {
      name: 'videoLink',
      title: 'Video Link (Optional)',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Information about the music, artist, or tradition',
    },
    {
      name: 'artistName',
      title: 'Artist/Musician Name',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: Rule => Rule.integer().min(0),
    },
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artistName',
      media: 'portraitImage',
    },
    prepare({ title, artist, media }) {
      return {
        title,
        subtitle: artist || 'Music',
        media,
      }
    },
  },
}


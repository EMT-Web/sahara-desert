export default {
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Phone number with country code (e.g., +212 6XX XXX XXX)',
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp number with country code (e.g., +212623668013)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'whatsapp2',
      title: 'WhatsApp Number 2 (Optional)',
      type: 'string',
      description: 'Second WhatsApp number (e.g., +212670707151)',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      description: 'Physical address for Google Maps',
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'email',
      phone: 'phone',
    },
    prepare({ title, phone }) {
      return {
        title: title || 'Contact Information',
        subtitle: phone || 'No phone',
      }
    },
  },
}


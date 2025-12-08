export default {
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Story',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle below the main title',
    },
    {
      name: 'foundersStory',
      title: 'Founders Story',
      type: 'text',
      rows: 12,
      description: 'The story of how the company was founded and the founders\' journey',
    },
    {
      name: 'foundersImages',
      title: 'Founders/Team Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Photos of founders or team members',
    },
    {
      name: 'localExpertise',
      title: 'Local Expertise',
      type: 'text',
      rows: 8,
      description: 'Content about local expertise and knowledge',
    },
    {
      name: 'sustainabilityCommitment',
      title: 'Sustainability Commitment',
      type: 'text',
      rows: 6,
      description: 'Statement about commitment to sustainability',
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Role/Description',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
        },
      ],
      description: 'List of team members (Mustafa, Ahmad, Youssef, Said, Abdul, Hsyan)',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}


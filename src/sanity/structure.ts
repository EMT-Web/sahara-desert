import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sahara Desert Travel')
    .items([
      // Site Configuration
      S.listItem()
        .title('Site Configuration')
        .child(
          S.list()
            .title('Site Configuration')
            .items([
              S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem().title('Homepage').child(S.document().schemaType('homepage').documentId('homepage')),
              S.listItem().title('Contact Information').child(S.document().schemaType('contact').documentId('contact')),
            ])
        ),
      S.divider(),
      // Tours & Experiences
      S.listItem()
        .title('Tours & Experiences')
        .child(
          S.list()
            .title('Tours & Experiences')
            .items([
              S.documentTypeListItem('tour').title('Tours'),
              S.documentTypeListItem('experience').title('Sahara Experiences'),
              S.documentTypeListItem('destination').title('Destinations'),
            ])
        ),
      S.divider(),
      // Content
      S.documentTypeListItem('story').title('Stories / Blog'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('guide').title('Guides'),
      S.divider(),
      // Media
      S.documentTypeListItem('galleryItem').title('Gallery'),
      S.documentTypeListItem('musicEntry').title('Music'),
      S.divider(),
      // Pages
      S.listItem().title('About Us').child(S.document().schemaType('about').documentId('about')),
      S.listItem().title('Culture').child(S.document().schemaType('culture').documentId('culture')),
      S.listItem().title('Sustainability').child(S.document().schemaType('sustainability').documentId('sustainability')),
    ])

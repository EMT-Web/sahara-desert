# Sahara Desert Travel Website

A production-ready travel website built with Next.js 14 (App Router), Tailwind CSS, and Sanity CMS integration. This project showcases desert tours, cultural experiences, and authentic Saharan adventures with a beautiful, responsive design.

## Features

- ✅ **Next.js 14 App Router** - Modern server-side rendering and routing
- ✅ **Sanity CMS Integration** - Headless CMS for dynamic content management
- ✅ **GROQ Queries** - Optimized data fetching from Sanity
- ✅ **Responsive Design** - Mobile-first, fully responsive layout
- ✅ **SEO Optimized** - Metadata exports for all pages
- ✅ **Desert-Themed UI** - Warm color palette (sand, gold, amber, purple)
- ✅ **Reusable Components** - Clean, modular component architecture
- ✅ **Dynamic Routing** - Tour and story detail pages with slug routing
- ✅ **WhatsApp Integration** - Direct contact through WhatsApp

## Pages

1. **Homepage** (`/`) - Hero section, featured tours, call-to-action
2. **Tours** (`/tours`) - List of all available tours
3. **Tour Detail** (`/tours/[slug]`) - Individual tour pages with itinerary
4. **Gallery** (`/gallery`) - Image and video gallery
5. **Stories** (`/stories`) - Blog/travel stories listing
6. **Story Detail** (`/stories/[slug]`) - Individual story pages
7. **Music** (`/music`) - Traditional Saharan music with audio player
8. **Culture** (`/culture`) - Cultural heritage and traditions
9. **Guides** (`/guides`) - Meet the expert local guides
10. **Sustainability** (`/sustainability`) - Eco-friendly tourism practices
11. **Contact** (`/contact`) - Contact information with WhatsApp button

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Language**: JavaScript (JSX)
- **Image Optimization**: next/image
- **Fonts**: Google Fonts (Inter, Lora)

## Project Structure

```
sahara-desert-travel/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Homepage
│   │   ├── tours/
│   │   │   ├── page.jsx        # Tours listing
│   │   │   └── [slug]/         # Dynamic tour pages
│   │   ├── stories/
│   │   │   ├── page.jsx        # Stories listing
│   │   │   └── [slug]/         # Dynamic story pages
│   │   ├── gallery/
│   │   ├── music/
│   │   ├── culture/
│   │   ├── guides/
│   │   ├── sustainability/
│   │   └── contact/
│   ├── components/             # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── TourCard.jsx
│   │   ├── GalleryGrid.jsx
│   │   ├── StoryCard.jsx
│   │   ├── MusicCard.jsx
│   │   ├── GuideCard.jsx
│   │   └── AudioPlayer.jsx
│   ├── lib/                    # Sanity integration
│   │   ├── sanity.js           # Sanity client config
│   │   ├── client.js           # Data fetching utilities
│   │   └── queries.js          # GROQ queries
│   └── styles/
│       └── globals.css         # Global styles
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Sanity.io account and project

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
```

**How to get Sanity credentials:**

1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project
3. Find your Project ID in the project dashboard
4. Use "production" as your dataset name (or create a custom one)

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Sanity CMS Setup

### Required Schemas

To fully utilize this website, you need to create the following schemas in your Sanity Studio:

#### 1. Homepage Schema

```javascript
{
  name: 'homepage',
  type: 'document',
  fields: [
    { name: 'heroTitle', type: 'string' },
    { name: 'heroSubtitle', type: 'string' },
    { name: 'heroImage', type: 'image' },
    { name: 'heroVideo', type: 'url' },
    { name: 'featuredTours', type: 'array', of: [{ type: 'reference', to: [{ type: 'tour' }] }] }
  ]
}
```

#### 2. Tour Schema

```javascript
{
  name: 'tour',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'mainImage', type: 'image' },
    { name: 'gallery', type: 'array', of: [{ type: 'image' }] },
    { name: 'excerpt', type: 'text' },
    { name: 'body', type: 'text' },
    { name: 'duration', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'included', type: 'array', of: [{ type: 'string' }] },
    { name: 'notIncluded', type: 'array', of: [{ type: 'string' }] },
    { name: 'itinerary', type: 'array', of: [{ type: 'object', fields: [
      { name: 'day', type: 'string' },
      { name: 'description', type: 'text' }
    ]}] },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

#### 3. Story Schema

```javascript
{
  name: 'story',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'coverImage', type: 'image' },
    { name: 'excerpt', type: 'text' },
    { name: 'body', type: 'text' },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

#### 4. Gallery Item Schema

```javascript
{
  name: 'galleryItem',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'video', type: 'url' },
    { name: 'type', type: 'string', options: { list: ['image', 'video'] } },
    { name: 'caption', type: 'text' },
    { name: 'order', type: 'number' }
  ]
}
```

#### 5. Music Entry Schema

```javascript
{
  name: 'musicEntry',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'portraitImage', type: 'image' },
    { name: 'audioClip', type: 'url' },
    { name: 'videoLink', type: 'url' },
    { name: 'description', type: 'text' },
    { name: 'order', type: 'number' }
  ]
}
```

#### 6. Guide Schema

```javascript
{
  name: 'guide',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'profileImage', type: 'image' },
    { name: 'bio', type: 'text' },
    { name: 'languages', type: 'array', of: [{ type: 'string' }] },
    { name: 'experience', type: 'string' },
    { name: 'order', type: 'number' }
  ]
}
```

#### 7. Contact Schema

```javascript
{
  name: 'contact',
  type: 'document',
  fields: [
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'whatsapp', type: 'string' },
    { name: 'address', type: 'text' },
    { name: 'socialMedia', type: 'object' }
  ]
}
```

#### 8. Site Settings Schema

```javascript
{
  name: 'siteSettings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'navigation', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', type: 'string' },
      { name: 'url', type: 'string' }
    ]}] }
  ]
}
```

## Color Palette

The website uses a desert-themed color palette:

- **Sand**: #fdf8f3 to #6d3b2b (light to dark)
- **Desert**: #fef9ee to #753414 (warm tones)
- Accent colors: Gold, Amber, Purple

## Components

### Navbar
- Sticky navigation with scroll effect
- Mobile-responsive hamburger menu
- Links loaded from Sanity CMS

### Hero
- Full-width hero section
- Video background with image fallback
- Call-to-action buttons

### TourCard
- Tour preview with image
- Duration and price display
- Hover effects

### GalleryGrid
- Responsive grid layout
- Image and video support
- Lightbox modal view

### AudioPlayer
- Custom audio player
- Play/pause controls
- Integration with Sanity audio URLs

## Development

### Running in Development Mode

```bash
npm run dev
```

The app runs on `http://localhost:5000` with hot reload enabled.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Replit** (already configured)
- Any platform supporting Node.js

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
```

## Features Breakdown

### Server-Side Rendering (SSR)
All pages use async server components for optimal performance and SEO.

### Dynamic Routing
Tour and story pages use Next.js dynamic routing with `[slug]` pattern.

### Image Optimization
Uses Next.js Image component with Sanity's image URL builder for optimized images.

### Responsive Design
Mobile-first design with Tailwind CSS breakpoints (sm, md, lg, xl).

### SEO
Each page exports metadata for title and description.

## Customization

### Changing Colors
Edit `tailwind.config.js` to modify the color palette.

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.jsx` file
3. Export metadata and default component
4. Update navigation in Sanity

### Modifying Components
All components are in `src/components/` and can be customized individually.

## Troubleshooting

### "Dataset not found" Error
- Verify your Sanity Project ID in `.env.local`
- Make sure you've created the dataset in Sanity Studio

### Module Not Found Errors
- Run `npm install` to ensure all dependencies are installed
- Check that `jsconfig.json` is present for path aliases

### Images Not Loading
- Verify the Sanity domain is added to `next.config.js` under `remotePatterns`
- Check that images are properly uploaded in Sanity

## License

This project is created for demonstration purposes. Modify as needed for your use case.

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Visit [Sanity.io documentation](https://www.sanity.io/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)

## Credits

Built with:
- Next.js 14
- Sanity.io
- Tailwind CSS
- React 18

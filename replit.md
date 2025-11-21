# Sahara Desert Travel Website - Project Documentation

## Overview
A complete, production-ready travel website built with Next.js 14 App Router, Tailwind CSS, and Sanity CMS integration. The website showcases Sahara Desert tours, cultural experiences, and authentic desert adventures with a beautiful, responsive design.

## Purpose
This website serves as a comprehensive platform for a Sahara Desert travel company, featuring:
- Tour listings and detailed tour pages
- Photo and video gallery
- Travel stories/blog
- Traditional music showcase
- Cultural heritage information
- Guide profiles
- Sustainability initiatives
- Contact information with WhatsApp integration

## Current State
✅ **Fully functional and running** - The development server is active on port 5000
✅ **All pages implemented** - 11 pages with server-side rendering
✅ **All components built** - 10 reusable components
✅ **Sanity CMS integrated** - Full GROQ queries for all content types
✅ **Responsive design** - Mobile-first with Tailwind CSS
✅ **SEO optimized** - Metadata exports for all pages

## Recent Changes (November 21, 2025)
- ✅ Initialized Next.js 14 project with App Router
- ✅ Installed all dependencies (Next.js, React, Tailwind, Sanity packages)
- ✅ Configured Tailwind with desert-themed color palette
- ✅ Created Sanity integration with client, queries, and image URL builder
- ✅ Built all 10 reusable components (Navbar, Footer, Hero, etc.)
- ✅ Implemented root layout with global styling
- ✅ Created homepage with hero section and featured tours
- ✅ Built tours pages (listing + dynamic slug pages)
- ✅ Created stories pages (listing + dynamic slug pages)
- ✅ Implemented gallery, music, culture, guides, sustainability, and contact pages
- ✅ Configured Next.js settings and path aliases
- ✅ Set up development workflow on port 5000
- ✅ Created comprehensive documentation (README.md)

## Project Architecture

### Tech Stack
- **Frontend Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom desert theme
- **CMS**: Sanity.io (headless CMS)
- **Query Language**: GROQ (for Sanity queries)
- **Language**: JavaScript (JSX)
- **Runtime**: Node.js 20

### Directory Structure
```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable components
├── lib/              # Sanity integration & queries
└── styles/           # Global CSS
```

### Key Features
1. **Server-Side Rendering (SSR)** - All pages use async server components
2. **Dynamic Routing** - Tour and story pages use [slug] pattern
3. **Image Optimization** - Next.js Image component with Sanity CDN
4. **Responsive Design** - Mobile-first with Tailwind breakpoints
5. **SEO Optimization** - Metadata exports on all pages
6. **Error Handling** - Graceful fallbacks when Sanity data unavailable

### Color Palette
- Sand: #fdf8f3 to #6d3b2b
- Desert: #fef9ee to #753414
- Accents: Gold, Amber, Purple

### Fonts
- Headings: Lora (serif)
- Body: Inter (sans-serif)

## User Preferences
- Clean, minimal design
- Warm desert color scheme
- Full production-ready code (no placeholders)
- All data from Sanity CMS
- Responsive and SEO optimized
- WhatsApp integration for contact

## Important Notes

### Sanity Setup Required
To populate the website with real content, the user needs to:
1. Create a Sanity.io account
2. Create a new Sanity project
3. Set up the required schemas (see README.md for details)
4. Update `.env.local` with their Sanity Project ID
5. Add content through Sanity Studio

### Current Configuration
- Development server runs on port 5000
- Uses placeholder Sanity credentials (will show fallback content)
- All error handling in place for missing CMS data
- Environment variables in `.env.local`

### Pages Overview
1. **/** - Homepage with hero, featured tours, and features
2. **/tours** - All tours listing
3. **/tours/[slug]** - Individual tour details
4. **/gallery** - Photo and video gallery
5. **/stories** - Travel stories/blog listing
6. **/stories/[slug]** - Individual story pages
7. **/music** - Traditional Saharan music
8. **/culture** - Cultural heritage information
9. **/guides** - Expert guide profiles
10. **/sustainability** - Eco-tourism practices
11. **/contact** - Contact info with WhatsApp button

### Components Breakdown
- **Navbar**: Sticky navigation with mobile menu
- **Footer**: Site footer with links and contact info
- **Hero**: Full-width hero with video/image support
- **SectionTitle**: Reusable section headers
- **TourCard**: Tour preview cards
- **GalleryGrid**: Responsive gallery with lightbox
- **StoryCard**: Story/blog preview cards
- **MusicCard**: Music entries with audio player
- **GuideCard**: Guide profile cards
- **AudioPlayer**: Custom audio playback component

## Deployment
The project is configured to run on Replit with:
- Workflow: "Start application" running `npm run dev`
- Port: 5000 (configured for webview)
- Auto-restart on file changes

## Next Steps for User
1. **Set up Sanity CMS**: Create account and project
2. **Configure schemas**: Use examples in README.md
3. **Add content**: Upload tours, images, stories, etc.
4. **Update environment**: Add real Sanity credentials
5. **Test thoroughly**: Verify all pages with real data
6. **Deploy**: Publish to production when ready

## Troubleshooting
- **"Dataset not found" errors**: Expected with placeholder credentials
- **Images not loading**: Need real Sanity project setup
- **Content not appearing**: Add data in Sanity Studio
- All error states have graceful fallbacks showing helpful messages

## Dependencies
Key packages installed:
- next@14.2.0
- react@18.3.0
- next-sanity@9.4.0
- @sanity/client@6.21.0
- @sanity/image-url@1.0.2
- tailwindcss@3.4.3
- autoprefixer@10.4.19
- postcss@8.4.38
- eslint@8.57.0

## File Locations
- Environment config: `.env.local`
- Next.js config: `next.config.js`
- Tailwind config: `tailwind.config.js`
- Path aliases: `jsconfig.json`
- Documentation: `README.md`
- Dependencies: `package.json`

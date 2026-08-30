# Sahara Desert Travel Website

A production-ready, SEO-optimized travel website showcasing authentic Sahara Desert experiences. Built with Next.js 14, Sanity CMS, and modern web technologies, this website offers a beautiful, fast, and fully responsive experience for exploring desert tours, cultural experiences, and local guides.

![Sahara Desert Travel](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Sanity CMS](https://img.shields.io/badge/Sanity-CMS-black?style=for-the-badge&logo=sanity)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Features
- ✅ **Next.js 14 App Router** - Modern server-side rendering with React Server Components
- ✅ **Sanity CMS Integration** - Headless CMS for dynamic content management
- ✅ **SEO Optimized** - Complete SEO implementation with:
  - Open Graph and Twitter Card metadata
  - Structured data (JSON-LD) for rich snippets
  - Dynamic sitemap generation
  - Robots.txt configuration
  - Semantic HTML and proper heading hierarchy
- ✅ **Performance Optimized** - Fast loading with:
  - Image optimization (AVIF, WebP)
  - Font optimization with display swap
  - Code splitting and lazy loading
  - Compression and caching headers
- ✅ **Fully Responsive** - Mobile-first design that works on all devices
- ✅ **Desert-Themed Design** - Beautiful warm color palette (sand, gold, amber tones)
- ✅ **Dynamic Routing** - Tour and story detail pages with slug-based URLs
- ✅ **Image Gallery** - Lightbox modal for images and videos
- ✅ **Audio Player** - Custom player for traditional Saharan music
- ✅ **WhatsApp Integration** - Direct contact through WhatsApp
- ✅ **Contact Form** - Integrated booking and inquiry form

## 📄 Pages

1. **Homepage** (`/`) - Hero section with ambient sound, featured tours, and call-to-action
2. **Tours** (`/tours`) - Complete list of all available desert tours
3. **Tour Detail** (`/tours/[slug]`) - Individual tour pages with detailed itinerary, pricing, and gallery
4. **Guides** (`/guides`) - Meet the expert local guides with profiles and photos
5. **About Us** (`/about`) - Company story, founders, and sustainability commitment
6. **Culture** (`/culture`) - Berber traditions, campfire storytelling, and cultural heritage
7. **Stories** (`/stories`) - Travel blog with inspiring stories from the desert
8. **Story Detail** (`/stories/[slug]`) - Individual story pages with author information
9. **Gallery** (`/gallery`) - Stunning image and video gallery from the Sahara
10. **Music** (`/music`) - Traditional Saharan music with audio player
11. **Sustainability** (`/sustainability`) - Eco-friendly tourism practices and initiatives
12. **Contact** (`/contact`) - Contact information, booking form, and WhatsApp integration

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom desert color palette
- **CMS**: Sanity.io (Headless CMS)
- **Language**: JavaScript (JSX)
- **Image Optimization**: Next.js Image with Sanity CDN
- **Fonts**: Google Fonts (Inter, Lora) with optimization
- **SEO**: Comprehensive metadata, structured data, sitemap
- **Performance**: SWC minification, compression, caching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm 9+ or yarn
- A Sanity.io account and project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SaharaTrek
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required - Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21

# Optional - Site URL for SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional - Search Engine Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code

# Optional - Social Media Links
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/your-page
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-page
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/your-handle

# Optional - Google Maps (for contact page)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

**How to get Sanity credentials:**
1. Go to [sanity.io](https://www.sanity.io/) and create an account
2. Create a new project
3. Find your Project ID in the project dashboard
4. Use "production" as your dataset name (or create a custom one)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📦 Project Structure

```
SaharaTrek/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.jsx          # Root layout with SEO
│   │   ├── page.jsx            # Homepage
│   │   ├── sitemap.js          # Dynamic sitemap generation
│   │   ├── robots.js           # Robots.txt configuration
│   │   ├── tours/
│   │   │   ├── page.jsx        # Tours listing
│   │   │   └── [slug]/         # Dynamic tour pages
│   │   ├── stories/
│   │   │   ├── page.jsx        # Stories listing
│   │   │   └── [slug]/         # Dynamic story pages
│   │   ├── guides/
│   │   ├── about/
│   │   ├── culture/
│   │   ├── gallery/
│   │   ├── music/
│   │   ├── sustainability/
│   │   └── contact/
│   ├── components/             # Reusable React components
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer component
│   │   ├── Hero.jsx            # Hero section with ambient sound
│   │   ├── TourCard.jsx        # Tour preview card
│   │   ├── GuideCard.jsx      # Guide profile card
│   │   ├── StoryCard.jsx      # Story preview card
│   │   ├── GalleryGrid.jsx    # Image gallery grid
│   │   ├── MusicCard.jsx      # Music entry card
│   │   ├── AudioPlayer.jsx    # Custom audio player
│   │   ├── ContactForm.jsx    # Contact/booking form
│   │   └── SectionTitle.jsx   # Section heading component
│   ├── lib/                    # Utilities and configurations
│   │   ├── sanity.js          # Sanity client configuration
│   │   ├── queries.js         # GROQ queries for Sanity
│   │   └── seo.js              # SEO utility functions
│   └── styles/
│       └── globals.css         # Global styles and Tailwind
├── scripts/                    # Content import scripts
│   ├── import-all.mjs         # Bulk content import
│   ├── import-tours.mjs       # Tour import script
│   ├── import-images.mjs     # Image upload and linking
│   └── parsers/               # Content parsers
├── sanity-schemas/            # Sanity CMS schemas
├── .env.local                 # Environment variables (not in git)
├── next.config.cjs            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── vercel.json                # Vercel deployment configuration
```

## 🎨 Design & Styling

### Color Palette

The website uses a warm desert-themed color palette:

- **Sand Colors**: Light sand (#f3dbc1) to dark brown (#6d3b2b)
- **Desert Colors**: Warm tones from #fef9ee to #753414
- **Accent Colors**: Gold, Amber, Purple for highlights

### Typography

- **Headings**: Lora (serif font) for elegant, traditional feel
- **Body Text**: Inter (sans-serif) for readability
- **Font Loading**: Optimized with display swap for performance

## 🔧 Sanity CMS Setup

### Required Schemas

The website requires the following schemas in Sanity Studio:

1. **Homepage** - Hero content, featured tours
2. **Tour** - Tour details, itinerary, pricing
3. **Guide** - Guide profiles with photos and bios
4. **Story** - Blog posts and travel stories
5. **Author** - Story authors
6. **Gallery Item** - Images and videos
7. **Music Entry** - Traditional music with audio
8. **Culture** - Cultural content sections
9. **About** - Company information
10. **Contact** - Contact information
11. **Site Settings** - Navigation and site configuration
12. **Sustainability** - Sustainability initiatives

All schemas are available in the `sanity-schemas/` directory.

### Importing Content

Use the provided scripts to bulk import content:

```bash
# Import guides, experiences, and destinations
node scripts/import-all.mjs

# Import tours
node scripts/import-tours.mjs

# Import and link images
node scripts/import-images.mjs
```

**Important**: After importing, publish all content in Sanity Studio for it to appear on the website.

## 🚀 Deployment to Vercel

This project is fully configured for Vercel deployment.

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)
   - (Optional) Other SEO and social media variables
6. Click "Deploy"

### Step 3: Update Site URL

After deployment, update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to your production domain.

### Automatic Deployments

Vercel will automatically deploy on every push to your main branch.

## 📊 SEO Features

### Implemented SEO Optimizations

- ✅ **Meta Tags**: Title, description, keywords for all pages
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Twitter Cards**: Twitter sharing optimization
- ✅ **Structured Data**: JSON-LD schemas for:
  - Organization
  - TouristTrip (Tours)
  - Article (Stories)
  - BreadcrumbList
- ✅ **Sitemap**: Dynamic XML sitemap at `/sitemap.xml`
- ✅ **Robots.txt**: Search engine configuration at `/robots.txt`
- ✅ **Image Alt Text**: Descriptive alt text for all images
- ✅ **Semantic HTML**: Proper heading hierarchy and semantic elements
- ✅ **Canonical URLs**: Prevent duplicate content issues
- ✅ **Performance**: Optimized for Core Web Vitals

### Testing SEO

1. **Google Search Console**: Submit sitemap at `https://your-domain.com/sitemap.xml`
2. **Rich Results Test**: [Google Rich Results Test](https://search.google.com/test/rich-results)
3. **PageSpeed Insights**: [PageSpeed Insights](https://pagespeed.web.dev/)
4. **Lighthouse**: Run in Chrome DevTools
5. **Social Media Debuggers**:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 🎯 Performance

### Optimizations

- Image optimization with Next.js Image component
- Font optimization with display swap
- Code splitting and lazy loading
- Compression enabled
- Caching headers for static assets
- SWC minification
- CSS optimization

### Expected Performance Metrics

- **Lighthouse Score**: 90+ for Performance, SEO, Accessibility
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- Security headers configured (X-Frame-Options, X-Content-Type-Options)
- Referrer policy set
- Environment variables for sensitive data
- No console logs in production

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Quality

- ESLint configured for Next.js
- React Strict Mode enabled
- TypeScript types available (optional)

## 🐛 Troubleshooting

### "Dataset not found" Error
- Verify your Sanity Project ID in `.env.local`
- Ensure dataset name matches (usually `production`)
- Check that dataset exists in Sanity Studio

### Images Not Loading
- Verify `next.config.cjs` has Sanity CDN in `remotePatterns`
- Check images are uploaded and published in Sanity
- Verify image URLs in browser network tab

### Content Not Showing
- Ensure content is **published** in Sanity Studio (not just saved as draft)
- Check GROQ queries in `src/lib/queries.js`
- Verify environment variables are set correctly

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (requires 18+)

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity.io Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🔄 Updates & Maintenance

### Adding New Content

1. Add content in Sanity Studio
2. **Publish** the content (important!)
3. Content will appear on the website automatically

### Updating Styles

- Edit `tailwind.config.js` for color palette changes
- Modify `src/styles/globals.css` for global styles
- Component styles are in individual component files

### Adding New Pages

1. Create new folder in `src/app/`
2. Add `page.jsx` with metadata export
3. Update navigation in Sanity Site Settings

## 📄 License

This project is created for demonstration and commercial use. Modify as needed for your use case.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section above
- Review Next.js and Sanity documentation
- Check browser console for errors

## 🎉 Features Showcase

### Homepage
- Hero section with video/image background
- Ambient desert sound with play/pause
- Featured tours carousel
- Call-to-action sections

### Tours
- Complete tour listings with filters
- Detailed tour pages with:
  - Full itinerary
  - Pricing information
  - What's included/not included
  - Image gallery
  - Booking CTA

### Guides
- Guide profiles with photos
- Languages spoken
- Experience and specialties
- Beautiful card layout

### Stories
- Blog-style story listings
- Individual story pages
- Author information
- Rich text content

### Gallery
- Responsive image grid
- Lightbox modal view
- Video support
- Captions and tags

### Music
- Traditional Saharan music
- Custom audio player
- Artist portraits
- Video links

---

## 👨‍💻 Developer

**This website was created by MUHAMMAD HASSAN SHAHBAZ - Developer**

For inquiries about development, customization, or technical support, please contact the developer.

---

**Built with ❤️ for showcasing the beauty of the Sahara Desert**
# desert-website
# sahara-desert

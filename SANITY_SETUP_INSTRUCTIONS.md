# Sanity CMS Setup Instructions for Sahara Desert Travel Website

This guide will walk you through setting up Sanity CMS for your Sahara Desert Travel website.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Create Sanity Account & Project](#step-1-create-sanity-account--project)
3. [Step 2: Install Sanity Studio](#step-2-install-sanity-studio)
4. [Step 3: Add Schemas](#step-3-add-schemas)
5. [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
6. [Step 5: Deploy Sanity Studio](#step-5-deploy-sanity-studio)
7. [Step 6: Add Content](#step-6-add-content)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A GitHub account (for Sanity Studio deployment)
- Basic knowledge of command line

---

## Step 1: Create Sanity Account & Project

1. **Go to Sanity.io**
   - Visit [https://www.sanity.io](https://www.sanity.io)
   - Click "Get Started" or "Sign Up"
   - Sign up with your email or GitHub account

2. **Create a New Project**
   - After signing in, click "Create project"
   - Enter project name: `Sahara Desert Travel` (or your preferred name)
   - Choose a dataset name: `production` (recommended)
   - Select a region closest to you
   - Click "Create project"

3. **Get Your Project Credentials**
   - After project creation, you'll see your **Project ID**
   - Copy this Project ID - you'll need it later
   - The dataset name is usually `production` (or what you chose)

---

## Step 2: Install Sanity Studio

You have two options:

### Option A: Install Sanity Studio in Your Next.js Project (Recommended)

1. **Navigate to your project root**
   ```bash
   cd SaharaTrek
   ```

2. **Install Sanity CLI globally** (if not already installed)
   ```bash
   npm install -g @sanity/cli
   ```

3. **Initialize Sanity in your project**
   ```bash
   sanity init
   ```
   
   When prompted:
   - Select "Create new project"
   - Enter project name: `Sahara Desert Travel`
   - Use the same Project ID from Step 1
   - Dataset: `production`
   - Project output path: `./sanity` (or `./studio`)
   - Template: Choose "Clean project with no predefined schemas"

### Option B: Use Sanity Studio Online

- You can manage content directly from [sanity.io/manage](https://sanity.io/manage)
- However, you'll need to add schemas manually through the API or use Sanity CLI

---

## Step 3: Add Schemas

1. **Navigate to your Sanity Studio folder**
   ```bash
   cd sanity  # or cd studio (depending on what you named it)
   ```

2. **Create schemas folder structure**
   ```bash
   mkdir schemas
   ```

3. **Copy schema files**
   - Copy each schema from `sanity-schemas.js` file
   - Create separate files for each schema in the `schemas` folder:
     - `schemas/homepage.js`
     - `schemas/tour.js`
     - `schemas/story.js`
     - `schemas/author.js`
     - `schemas/galleryItem.js`
     - `schemas/musicEntry.js`
     - `schemas/guide.js`
     - `schemas/culture.js`
     - `schemas/sustainability.js`
     - `schemas/about.js`
     - `schemas/contact.js`
     - `schemas/siteSettings.js`

4. **Example: Create `schemas/homepage.js`**
   ```javascript
   export default {
     name: 'homepage',
     title: 'Homepage',
     type: 'document',
     fields: [
       {
         name: 'heroTitle',
         title: 'Hero Title',
         type: 'string',
         validation: Rule => Rule.required(),
         initialValue: 'Where the dunes sing at sunset',
       },
       // ... rest of the fields from sanity-schemas.js
     ],
   }
   ```

5. **Create `schemas/index.js`**
   ```javascript
   import homepage from './homepage'
   import tour from './tour'
   import story from './story'
   import author from './author'
   import galleryItem from './galleryItem'
   import musicEntry from './musicEntry'
   import guide from './guide'
   import culture from './culture'
   import sustainability from './sustainability'
   import about from './about'
   import contact from './contact'
   import siteSettings from './siteSettings'

   export default [
     homepage,
     tour,
     story,
     author,
     galleryItem,
     musicEntry,
     guide,
     culture,
     sustainability,
     about,
     contact,
     siteSettings,
   ]
   ```

6. **Update `sanity.json` or `sanity.config.js`**
   - Find the schema configuration
   - Update it to import from `schemas/index.js`:
   ```javascript
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import schemas from './schemas'

   export default defineConfig({
     name: 'default',
     title: 'Sahara Desert Travel',
     projectId: 'YOUR_PROJECT_ID',
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemas,
     },
   })
   ```

---

## Step 4: Configure Environment Variables

1. **Go back to your Next.js project root**
   ```bash
   cd ..  # Go back to SaharaTrek root
   ```

2. **Create `.env.local` file** (if it doesn't exist)
   ```bash
   touch .env.local
   ```

3. **Add your Sanity credentials**
   Open `.env.local` and add:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
   ```
   
   **Replace `your-project-id-here` with your actual Project ID from Step 1**

4. **Optional: Add Google Maps API Key** (for contact page map)
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```
   - Get API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Maps Embed API"

---

## Step 5: Deploy Sanity Studio

1. **Login to Sanity**
   ```bash
   sanity login
   ```

2. **Deploy Studio** (from the sanity/studio folder)
   ```bash
   cd sanity  # or cd studio
   sanity deploy
   ```
   
   - Choose a hostname (e.g., `sahara-desert-travel`)
   - Your studio will be available at: `https://your-hostname.sanity.studio`

3. **Access your Studio**
   - Visit the deployed URL
   - Or run locally: `sanity start` (from sanity folder)

---

## Step 6: Add Content

### Priority Order for Adding Content:

1. **Site Settings** (Required First)
   - Go to "Site Settings" in Sanity Studio
   - Add site title, description, and navigation menu
   - This populates your navbar and footer

2. **Contact Information** (Required)
   - Go to "Contact Information"
   - Add email, phone, WhatsApp number, and address
   - **Important**: WhatsApp number must include country code (e.g., +212 6XX XXX XXX)

3. **Homepage** (Required)
   - Go to "Homepage"
   - Add hero title: "Where the dunes sing at sunset"
   - Add hero subtitle
   - Upload hero image or add video URL
   - Optionally add ambient sound URL (MP3 file)
   - Select featured tours (after creating tours)

4. **About Us**
   - Go to "About Us"
   - Add founders story, local expertise, sustainability commitment
   - Upload founder/team images

5. **Guides**
   - Go to "Guide"
   - Create guide profiles with:
     - Name, role, profile image
     - Biography
     - Languages spoken
     - Years of experience
     - Specialties

6. **Tours**
   - Go to "Tour"
   - Create tour documents with:
     - Title, slug (auto-generated from title)
     - Main image
     - Duration (e.g., "1 Night", "2 Nights")
     - Price in USD
     - Description and highlights
     - Itinerary (day-by-day)
     - What's included/not included
     - Focus areas (culture, sunsets, music, etc.)

7. **Stories/Blog**
   - Go to "Author" - create author profiles first
   - Go to "Story / Blog Post"
   - Create story posts with:
     - Title, slug
     - Cover image
     - Excerpt (short summary)
     - Full body content
     - Author reference
     - Categories
     - Published date

8. **Gallery**
   - Go to "Gallery Item"
   - Upload images or add video URLs
   - Add titles, captions, and tags
   - Set display order

9. **Music**
   - Go to "Music Entry"
   - Add music entries with:
     - Title and artist name
     - Portrait/artist image
     - Audio clip URL (MP3)
     - Optional video link
     - Description

10. **Culture**
    - Go to "Culture Content"
    - Add introduction
    - Add Berber traditions content
    - Add campfire storytelling content
    - Add additional sections with images

11. **Sustainability**
    - Go to "Sustainability Content"
    - Add introduction
    - Add sustainability initiatives

### Content Tips:

- **Images**: Upload high-quality images (recommended: 1920x1080 for hero, 800x600 for cards)
- **Videos**: Use direct MP4 URLs or YouTube/Vimeo embed URLs
- **Audio**: Use direct MP3 URLs (host on cloud storage like AWS S3, Cloudinary, etc.)
- **Slugs**: Auto-generated from titles, but you can customize them
- **Published Dates**: Required for tours and stories - use current date or future date

---

## Step 7: Test Your Website

1. **Start your Next.js development server**
   ```bash
   npm run dev
   ```

2. **Visit your website**
   - Open [http://localhost:5000](http://localhost:5000)
   - Check if content from Sanity appears
   - Test all pages

3. **Verify Data Flow**
   - Check browser console for any errors
   - Verify images load correctly
   - Test navigation menu
   - Check contact form functionality

---

## Troubleshooting

### Issue: "Dataset not found" Error

**Solution:**
- Verify your Project ID in `.env.local`
- Check that dataset name matches (usually `production`)
- Ensure you've created the dataset in Sanity Studio

### Issue: Images Not Loading

**Solution:**
- Verify `next.config.js` has Sanity CDN in `remotePatterns`:
  ```javascript
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
    },
  ]
  ```
- Check that images are properly uploaded in Sanity
- Verify image URLs in browser network tab

### Issue: Schema Not Appearing in Studio

**Solution:**
- Check that schema files are properly exported
- Verify `schemas/index.js` imports all schemas
- Restart Sanity Studio: `sanity start`
- Clear browser cache

### Issue: WhatsApp Link Not Working

**Solution:**
- Ensure WhatsApp number includes country code (e.g., +212)
- Format: `+[country code][number]` (no spaces or dashes in the number)
- Example: `+212612345678`

### Issue: Contact Form Not Opening WhatsApp

**Solution:**
- Check that WhatsApp number is properly formatted
- Ensure form fields are filled correctly
- Test WhatsApp link manually: `https://wa.me/212612345678`

### Issue: Environment Variables Not Loading

**Solution:**
- Ensure `.env.local` is in project root (not in subfolders)
- Restart Next.js dev server after changing `.env.local`
- Verify variable names start with `NEXT_PUBLIC_` for client-side access

---

## Next Steps

1. **Add Real Content**: Replace placeholder content with actual tour information, stories, and images
2. **Optimize Images**: Compress images before uploading to Sanity for faster loading
3. **Set Up Analytics**: Add Google Analytics or other tracking (optional)
4. **Deploy Website**: Deploy to Vercel, Netlify, or your preferred hosting
5. **SEO Optimization**: Add proper meta descriptions, Open Graph tags, etc.

---

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)

---

## Support

If you encounter issues:
1. Check Sanity documentation
2. Review error messages in browser console
3. Verify all environment variables are set correctly
4. Ensure all schemas are properly configured

---

**Last Updated**: 2024
**Version**: 1.0


# Complete Sanity CMS Setup Guide for Sahara Desert Travel

## 📋 Table of Contents
1. [Quick Setup (5 Minutes)](#quick-setup)
2. [Detailed Step-by-Step Guide](#detailed-guide)
3. [Adding Your Content](#adding-content)
4. [Connecting to Website](#connecting-website)
5. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Create Sanity Account
1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Click "Get Started" → Sign up (free)
3. Create new project: **"Sahara Desert Travel"**
4. Copy your **Project ID** (you'll need it)

### Step 2: Install Sanity Studio
```bash
# In your project root (SaharaTrek folder)
npm install -g @sanity/cli
sanity init
```

When prompted:
- **Project name**: Sahara Desert Travel
- **Use existing project**: Yes (use the Project ID from Step 1)
- **Dataset**: production
- **Output path**: `./sanity` (or `./studio`)
- **Template**: Clean project

### Step 3: Add Schemas
```bash
# Copy all schema files from sanity-schemas/ folder to sanity/schemas/
# Then update sanity/schemas/index.js to import them
```

### Step 4: Configure Environment
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
```

### Step 5: Deploy & Test
```bash
cd sanity
sanity deploy
npm run dev  # In project root
```

---

## 📖 Detailed Step-by-Step Guide

### Part 1: Sanity Account Setup

1. **Visit Sanity.io**
   - Go to [https://www.sanity.io](https://www.sanity.io)
   - Click "Get Started" or "Sign Up"

2. **Create Account**
   - Sign up with email or GitHub
   - Verify your email if required

3. **Create Project**
   - Click "Create project"
   - Project name: `Sahara Desert Travel`
   - Dataset: `production` (default)
   - Region: Choose closest to you
   - Click "Create project"

4. **Get Credentials**
   - After creation, you'll see your **Project ID**
   - Example: `abc123xyz`
   - **Copy this ID** - you'll need it!

---

### Part 2: Install Sanity Studio Locally

1. **Install Sanity CLI** (if not installed)
   ```bash
   npm install -g @sanity/cli
   ```

2. **Navigate to Project Root**
   ```bash
   cd SaharaTrek  # or your project folder name
   ```

3. **Initialize Sanity**
   ```bash
   sanity init
   ```

4. **Follow Prompts:**
   ```
   ? Select project to use: Create new project
   ? Project name: Sahara Desert Travel
   ? Use the default dataset configuration? Yes
   ? Project output path: ./sanity
   ? Select project template: Clean project with no predefined schemas
   ```

5. **Login to Sanity** (if prompted)
   ```bash
   sanity login
   ```

---

### Part 3: Add Schema Files

1. **Create Schemas Folder Structure**
   ```bash
   # In your sanity folder
   cd sanity
   mkdir schemas
   ```

2. **Copy Schema Files**
   - Copy all files from `sanity-schemas/` folder
   - Paste them into `sanity/schemas/` folder
   - Files to copy:
     - `01-homepage.js`
     - `02-tour.js`
     - `03-experience.js`
     - `04-destination.js`
     - `05-story.js`
     - `06-author.js`
     - `07-galleryItem.js`
     - `08-musicEntry.js`
     - `09-guide.js`
     - `10-culture.js`
     - `11-sustainability.js`
     - `12-about.js`
     - `13-contact.js`
     - `14-siteSettings.js`
     - `index.js`

3. **Update Sanity Config**
   
   Find `sanity.config.js` or `sanity.json` in your `sanity` folder and update it:

   ```javascript
   import { defineConfig } from 'sanity'
   import { deskTool } from 'sanity/desk'
   import schemas from './schemas'

   export default defineConfig({
     name: 'default',
     title: 'Sahara Desert Travel',
     projectId: 'YOUR_PROJECT_ID',  // Replace with your Project ID
     dataset: 'production',
     plugins: [deskTool()],
     schema: {
       types: schemas,
     },
   })
   ```

---

### Part 4: Configure Environment Variables

1. **Create `.env.local` File**
   ```bash
   # In project root (SaharaTrek folder)
   touch .env.local
   ```

2. **Add Your Credentials**
   Open `.env.local` and add:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
   ```
   
   **Replace `your-project-id-here` with your actual Project ID from Part 1**

3. **Restart Dev Server** (if running)
   ```bash
   # Stop server (Ctrl+C)
   npm run dev  # Start again
   ```

---

### Part 5: Deploy Sanity Studio

1. **Deploy Studio** (from sanity folder)
   ```bash
   cd sanity
   sanity deploy
   ```

2. **Choose Hostname**
   - Enter a unique hostname (e.g., `sahara-desert-travel`)
   - Your studio will be at: `https://sahara-desert-travel.sanity.studio`

3. **Access Your Studio**
   - Visit the deployed URL
   - Or run locally: `sanity start` (from sanity folder)

---

## 📝 Adding Your Content

### Priority Order:

#### 1. **Site Settings** (Do First!)
- Go to "Site Settings" in Sanity Studio
- Add:
  - **Title**: "Visit Sahara Desert | Authentic Morocco Desert Tours, Sahara Trips & Private Adventures"
  - **Description**: (from your sanity_txt.md)
  - **Navigation**: (optional - defaults will be used)

#### 2. **Contact Information** (Required!)
- Go to "Contact Information"
- Add:
  - **Email**: Visitsaharaadesert@gmail.com
  - **Phone**: +212623668013
  - **WhatsApp**: +212623668013
  - **WhatsApp 2**: +212670707151
  - **Address**: (your physical address)

#### 3. **Homepage**
- Go to "Homepage"
- Add:
  - **Hero Title**: "Where the dunes sing at sunset"
  - **Hero Subtitle**: (from your content)
  - Upload hero image
  - Add featured tours (after creating tours)

#### 4. **About Us**
- Go to "About Us"
- Add founders story from your `sanity_txt.md`
- Add team members (Mustafa, Ahmad, Youssef, Said, Abdul, Hsyan)
- Upload team images

#### 5. **Guides**
- Go to "Guide"
- Create guide profiles for each team member:
  - Mustafa - Adventurer
  - Ahmad - Storyteller
  - Youssef - Thrill-seeker
  - Said - Calm and serene
  - Abdul - Culinary enthusiast
  - Hsyan - Community connector

#### 6. **Tours** (Your Main Content!)
- Go to "Tour"
- Create one tour document for each tour in your `sanity_txt.md`:
  - 3 Days Marrakech to Merzouga
  - 4 Days Atlas Mountains & Sahara
  - 5 Days Marrakech to Erg Chigaga
  - 7 Days Grand Sahara Tour
  - 10 Days Ultimate Morocco Journey
  - (And all tours from Fes, Casablanca, Agadir, Errachidia)

**For each tour:**
- Title
- Slug (auto-generated)
- Departure City
- Duration
- Main Image
- Description
- Itinerary (day by day)
- Inclusions
- Exclusions
- SEO Keywords

#### 7. **Experiences**
- Go to "Sahara Experience"
- Create experiences:
  - Camel Trekking
  - Overnight in Desert Camp
  - Luxury Desert Camping
  - Sandboarding
  - Nomad Cultural Experiences
  - Desert Photography Tours
  - Stargazing
  - Berber Music & Campfires

#### 8. **Destinations**
- Go to "Destination"
- Create destinations:
  - Merzouga & Erg Chebbi
  - Erg Chigaga Desert
  - Draa Valley
  - Ziz Valley
  - Todra Gorge
  - Dades Valley
  - Ait Ben Haddou
  - Ouarzazate
  - Rissani Market
  - Midelt & Atlas Mountains

#### 9. **Stories/Blog**
- Go to "Author" - create author profiles first
- Go to "Story / Blog Post"
- Create blog posts from your content

#### 10. **Gallery**
- Go to "Gallery Item"
- Upload images and videos
- Add tags (dunes, sunsets, camps, etc.)

#### 11. **Music**
- Go to "Music Entry"
- Add music entries with audio clips

#### 12. **Culture & Sustainability**
- Go to "Culture Content" and "Sustainability Content"
- Add content from your `sanity_txt.md`

---

## 🔗 Connecting to Website

Your website is **already connected**! The code is set up to fetch from Sanity.

### Verify Connection:

1. **Check Environment Variables**
   - Ensure `.env.local` has correct Project ID
   - Restart dev server if you just added it

2. **Test the Connection**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:5000](http://localhost:5000)

3. **Check Browser Console**
   - Open DevTools (F12)
   - Check for any Sanity errors
   - If you see "Dataset not found", verify Project ID

---

## 🐛 Troubleshooting

### Issue: "Dataset not found"
**Solution:**
- Verify Project ID in `.env.local`
- Check dataset name is `production`
- Restart dev server

### Issue: Schemas not appearing
**Solution:**
- Check `sanity/schemas/index.js` imports all schemas
- Verify schema files are in `sanity/schemas/` folder
- Restart Sanity Studio: `sanity start`

### Issue: Images not loading
**Solution:**
- Verify `next.config.js` has Sanity CDN:
  ```javascript
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' }
  ]
  ```

### Issue: Content not showing
**Solution:**
- Make sure you've published content in Sanity (not just saved as draft)
- Check browser console for errors
- Verify GROQ queries in `src/lib/queries.js`

---

## ✅ Checklist

- [ ] Sanity account created
- [ ] Project created with Project ID copied
- [ ] Sanity Studio installed locally
- [ ] Schema files copied to `sanity/schemas/`
- [ ] `.env.local` created with Project ID
- [ ] Sanity Studio deployed
- [ ] Site Settings added
- [ ] Contact Information added
- [ ] Homepage content added
- [ ] Tours created
- [ ] Website tested and working

---

## 🎉 You're Done!

Once you've added content to Sanity, your website will automatically display it. The connection is already set up in the code!

**Need Help?** Check the error messages in browser console or Sanity Studio.

---

**Last Updated**: 2024


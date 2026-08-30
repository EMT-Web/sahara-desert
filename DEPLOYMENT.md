# Vercel Deployment Guide

This guide will help you deploy the Sahara Desert Travel website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Sanity.io project set up

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Vercel deployment"
   ```

2. **Push to GitHub**:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Configure environment variables (see Step 3)
6. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

In Vercel Dashboard, go to **Settings → Environment Variables** and add:

### Required Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-21
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### Optional Variables (for full SEO)

```
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/your-page
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-page
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/your-handle
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- After adding, redeploy your project

## Step 4: Update Site URL

After deployment, update `NEXT_PUBLIC_SITE_URL` to your actual production domain:

1. Go to **Settings → Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to your custom domain (if you have one)
3. Redeploy

## Step 5: Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Check that all pages load correctly
3. Verify images load from Sanity CDN
4. Test navigation and forms
5. Check browser console for errors

## Automatic Deployments

Vercel automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On push to other branches or pull requests

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure Node.js version is 18+ (set in `package.json`)

### Images Not Loading

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that images are published in Sanity (not drafts)
- Verify Sanity CDN is accessible

### Content Not Showing

- Ensure content is **published** in Sanity Studio
- Check environment variables are set correctly
- Verify Sanity dataset name matches

### 404 Errors

- Check that routes exist in `src/app/`
- Verify dynamic routes use `[slug]` pattern correctly
- Check Vercel build logs for routing issues

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] SEO metadata is correct (check page source)
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] Mobile responsive design works
- [ ] Performance is good (check Lighthouse)

## Monitoring

- **Analytics**: Enable Vercel Analytics in dashboard
- **Logs**: View function logs in Vercel dashboard
- **Performance**: Use Vercel Speed Insights

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

---

Your website is now live on Vercel! 🎉


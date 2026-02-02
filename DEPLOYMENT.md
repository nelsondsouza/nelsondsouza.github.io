# Deployment Guide

This guide covers deploying your Data Science Learning Dashboard to popular static hosting platforms.

## Quick Deploy Options

### 1. GitHub Pages (Recommended for GitHub users)

**Step 1: Push to GitHub**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Data Science Learning Dashboard"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

**Step 2: Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch and "/" (root) folder
5. Click "Save"
6. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

**Custom Domain (Optional)**
1. Add a `CNAME` file in the root with your domain name
2. Configure DNS settings with your domain provider
3. Add your custom domain in GitHub Pages settings

---

### 2. Netlify (Best for continuous deployment)

**Option A: Drag and Drop**
1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Drag and drop your project folder onto the Netlify dashboard
4. Your site is live immediately!

**Option B: Git Integration**
1. Push your code to GitHub, GitLab, or Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: (leave empty - no build needed)
   - Publish directory: `/` (root)
4. Deploy!

**Custom Domain on Netlify**
1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration instructions

**Netlify URL**: Your site will be at `https://your-site-name.netlify.app`

---

### 3. Vercel (Great for modern hosting)

**Step 1: Install Vercel CLI (Optional)**
```bash
npm install -g vercel
```

**Step 2: Deploy**

**Option A: CLI**
```bash
# Navigate to your project
cd /path/to/project

# Deploy
vercel

# Follow the prompts
```

**Option B: Web Interface**
1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub, GitLab, or Bitbucket
3. Import your repository
4. Configure project:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
5. Deploy!

**Vercel URL**: Your site will be at `https://your-site-name.vercel.app`

---

### 4. Cloudflare Pages

**Step 1: Push to Git**
Ensure your code is on GitHub, GitLab, or Bitbucket

**Step 2: Deploy on Cloudflare Pages**
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your Git repository
3. Configure build:
   - Build command: (leave empty)
   - Build output directory: `/`
4. Deploy!

**Benefits**: Fast global CDN, free SSL, great performance

---

### 5. Firebase Hosting

**Step 1: Install Firebase CLI**
```bash
npm install -g firebase-tools
```

**Step 2: Initialize Firebase**
```bash
# Login to Firebase
firebase login

# Initialize in your project directory
cd /path/to/project
firebase init hosting
```

**Configuration:**
- Public directory: `.` (current directory)
- Single-page app: No
- GitHub Actions: Optional

**Step 3: Deploy**
```bash
firebase deploy
```

**Firebase URL**: Your site will be at `https://your-project.web.app`

---

### 6. AWS S3 + CloudFront (For scalability)

**Step 1: Create S3 Bucket**
1. Log into AWS Console
2. Create a new S3 bucket
3. Enable static website hosting
4. Set bucket policy for public read access

**Bucket Policy Example:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

**Step 2: Upload Files**
```bash
# Using AWS CLI
aws s3 sync . s3://your-bucket-name --exclude ".git/*"
```

**Step 3: Configure CloudFront (Optional)**
1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Configure SSL certificate
4. Wait for distribution to deploy (~15 minutes)

---

### 7. Render

**Step 1: Push to Git**
Ensure your code is on GitHub, GitLab, or Bitbucket

**Step 2: Deploy on Render**
1. Go to [Render](https://render.com/)
2. Sign up and create a new Static Site
3. Connect your repository
4. Configure:
   - Build Command: (leave empty)
   - Publish Directory: `.` (root)
5. Deploy!

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All links are working (run local tests)
- [ ] Images are optimized
- [ ] Personal information is updated (name, email, social links)
- [ ] Content is reviewed for typos
- [ ] `.gitignore` is properly configured
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Validate HTML (https://validator.w3.org/)
- [ ] Check accessibility (https://wave.webaim.org/)

## Testing Locally

Before deploying, test your site locally:

### Using Python (Built-in)
```bash
# Python 3
cd /path/to/project
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Using Node.js
```bash
# Install serve globally
npm install -g serve

# Run server
cd /path/to/project
serve

# Open browser to http://localhost:3000
```

### Using PHP
```bash
cd /path/to/project
php -S localhost:8000
```

## Post-Deployment Tasks

After deployment:

1. **Test the Live Site**
   - Check all pages
   - Test all links
   - Verify mobile responsiveness
   - Test on different browsers

2. **Set Up Analytics (Optional)**
   - Google Analytics
   - Plausible Analytics
   - Simple Analytics

3. **Configure SEO**
   - Add meta descriptions
   - Create sitemap.xml
   - Submit to Google Search Console

4. **Performance Optimization**
   - Enable compression (gzip/brotli)
   - Set up CDN
   - Optimize images further
   - Enable caching headers

5. **Security**
   - Enable HTTPS (most platforms do this automatically)
   - Set security headers
   - Regular updates

## Domain Setup

### Connecting a Custom Domain

Most platforms support custom domains. General steps:

1. **Purchase a domain** (GoDaddy, Namecheap, Google Domains)

2. **Configure DNS records**:
   ```
   # For root domain (example.com)
   A record: @ -> Platform IP address
   
   # For subdomain (www.example.com)
   CNAME record: www -> platform-url
   ```

3. **Wait for DNS propagation** (can take up to 48 hours)

4. **Enable SSL** (usually automatic)

## Continuous Deployment

Set up automatic deployments on git push:

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      # Add your deployment steps here
      # Example for Netlify:
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## Troubleshooting

### Common Issues

**1. CSS/JS not loading**
- Check file paths (should be relative)
- Verify files are uploaded
- Check browser console for errors

**2. 404 errors**
- Ensure index.html is in the root directory
- Check case sensitivity in file names
- Verify .htaccess or _redirects file if needed

**3. Slow loading**
- Optimize images
- Enable compression
- Use a CDN
- Minimize CSS/JS

**4. Mobile layout issues**
- Test on actual devices
- Use browser dev tools responsive mode
- Check viewport meta tag

## Performance Tips

1. **Image Optimization**: Use WebP format with fallbacks
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **Minification**: Minify CSS and JS (optional for this project)
4. **Caching**: Set proper cache headers
5. **CDN**: Use a content delivery network

## Monitoring

Free monitoring tools:
- **Google Search Console**: SEO and indexing
- **Google Analytics**: Traffic analysis
- **UptimeRobot**: Uptime monitoring
- **Lighthouse**: Performance audits

## Support

If you encounter issues:
1. Check the platform's documentation
2. Search for similar issues on Stack Overflow
3. Contact the platform's support team
4. Check the project's GitHub issues

---

## Quick Reference: Deployment URLs

After deployment, your site will typically be available at:

- **GitHub Pages**: `https://username.github.io/repo-name/`
- **Netlify**: `https://site-name.netlify.app`
- **Vercel**: `https://site-name.vercel.app`
- **Cloudflare Pages**: `https://site-name.pages.dev`
- **Firebase**: `https://project-id.web.app`
- **Render**: `https://site-name.onrender.com`

---

**Need Help?** Refer to the main README.md or contact: 22f1001290@ds.study.iitm.ac.in

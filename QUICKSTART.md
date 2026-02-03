# Quick Start Guide

Get your Data Science Learning Dashboard up and running in minutes!

## 📦 What You've Got

Your dashboard includes:

- ✅ **Responsive HTML/CSS/JS** - Works on all devices
- ✅ **9 Learning Path Sections** - Python, ML, SQL, Excel, and more
- ✅ **Professional Design** - Blue/gray color scheme
- ✅ **Sample Content** - Ready-to-customize templates
- ✅ **Zero Dependencies** - No npm, no build process
- ✅ **CMS-Ready** - Easy to integrate with any system

## 🚀 5-Minute Setup

### Step 1: Test Locally

```bash
# Navigate to project directory
cd /path/to/project

# Start a local server (choose one):

# Option A: Python 3
python3 -m http.server 8000

# Option B: Python 2
python -m SimpleHTTPServer 8000

# Option C: Node.js
npx serve

# Option D: PHP
php -S localhost:8000
```

Open browser to: **http://localhost:8000**

### Step 2: Customize Content

Edit `index.html` to personalize:

1. **Update Profile** (Line 67-73):
```html
<h3 class="profile-name">Your Name</h3>
<p class="profile-title">Your Title</p>
<p class="profile-subtitle">Your Institution</p>
```

2. **Change Colors** in `css/styles.css`:
```css
/* Find and replace these hex codes */
#1e3a5f  → Your primary blue
#3b82f6  → Your accent blue
#f5f7fa  → Your background gray
```

3. **Update Social Links** (Line 149-159):
```html
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourusername">LinkedIn</a>
<a href="mailto:your@email.com">Email</a>
```

### Step 3: Deploy (Choose One)

#### 🎯 Fastest: Netlify Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder onto the page
3. Done! 🎉

#### 🔧 Best for Git: GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

#### ⚡ CLI Deploy: Vercel
```bash
npm install -g vercel
vercel
# Follow the prompts
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📝 Essential Customizations

### 1. Site Title & Logo
**File**: `index.html` (Line 21-23)
```html
<div class="navbar-logo">
    <h1>Your Site Name</h1>
    <span class="logo-subtitle">Your Tagline</span>
</div>
```

### 2. Hero Section
**File**: `index.html` (Line 168-191)
```html
<h1 class="hero-title">Your Welcome Message</h1>
<p class="hero-subtitle">Your Description</p>
```

### 3. Add Your Photo
1. Add image to `assets/images/profile/avatar.jpg`
2. Update `index.html` (Line 69):
```html
<div class="profile-avatar">
    <img src="assets/images/profile/avatar.jpg" alt="Your Name"
         style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

### 4. Navigation Links
**File**: `index.html` (Line 26-31)
```html
<li><a href="#home" class="nav-link">Home</a></li>
<li><a href="#your-section" class="nav-link">Your Link</a></li>
```

### 5. Footer
**File**: `index.html` (Line 767-771)
```html
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

## 🎨 Color Customization

Want different colors? Edit these files:

### Primary Colors (css/styles.css)
```css
/* Line 9-15: Color definitions */
Primary: #1e3a5f   (dark blue)
Secondary: #f5f7fa (light gray)
Accent: #3b82f6    (medium blue)
Text: #2d3748      (dark gray)
```

### Gradients
```css
/* Hero gradient (Line 104) */
background: linear-gradient(135deg, #1e3a5f 0%, #2d5a8f 100%);

/* Profile avatar gradient (Line 56 in sidebar.css) */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 📱 Mobile Testing

Test on different screen sizes:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

Browser DevTools: `F12` → Toggle device toolbar

## ✏️ Content Management

### Adding a New Section

1. Copy an existing section in `index.html`
2. Change the `id` attribute
3. Update the content
4. Add link in sidebar and navigation

Example:
```html
<section id="your-new-section" class="content-section">
    <div class="section-header">
        <h2 class="section-title">Your Section Title</h2>
        <p class="section-description">Description</p>
    </div>
    <!-- Your content here -->
</section>
```

### Adding a Project Card

Find the projects section (Line 537) and add:
```html
<article class="project-card">
    <div class="project-header">
        <h3 class="project-title">Project Name</h3>
        <span class="project-status status-complete">Completed</span>
    </div>
    <p class="project-description">Description here...</p>
    <div class="project-tags">
        <span class="tag">Tag 1</span>
        <span class="tag">Tag 2</span>
    </div>
    <div class="project-footer">
        <a href="#" class="btn btn-small">View Details</a>
    </div>
</article>
```

### Adding a Blog Post

Find the blog section (Line 667) and add:
```html
<article class="blog-card">
    <div class="blog-meta">
        <span class="blog-date">Date</span>
        <span class="blog-category">Category</span>
    </div>
    <h3 class="blog-title">Post Title</h3>
    <p class="blog-excerpt">Excerpt here...</p>
    <a href="#" class="blog-read-more">Read More →</a>
</article>
```

## 🔍 Troubleshooting

### CSS not loading?
- Check file paths in `<link>` tags
- Ensure all CSS files are in the `css/` folder
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

### JavaScript not working?
- Check browser console for errors (F12)
- Ensure `js/sidebar-toggle.js` exists
- Verify `<script>` tag at bottom of HTML

### Layout broken on mobile?
- Test in browser DevTools responsive mode
- Check viewport meta tag is present
- Verify media queries in CSS

### Links not working?
- Check anchor IDs match href values
- Ensure sections have correct `id` attributes
- Test smooth scrolling

## 📊 File Size Reference

- **index.html**: ~38 KB (main page)
- **css/styles.css**: ~14 KB (main styles)
- **css/navigation.css**: ~5 KB (top nav)
- **css/sidebar.css**: ~7 KB (sidebar)
- **js/sidebar-toggle.js**: ~12 KB (interactions)
- **Total**: ~76 KB (excluding images)

Very lightweight and fast! 🚀

## 🎓 Next Steps

1. ✅ Customize personal information
2. ✅ Add your projects and portfolio items
3. ✅ Update learning paths with your content
4. ✅ Add blog posts or articles
5. ✅ Upload project screenshots
6. ✅ Test on multiple devices
7. ✅ Deploy to your hosting platform
8. ✅ Share with the world!

## 📚 Additional Resources

- **Full Documentation**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Assets Guide**: [assets/README.md](assets/README.md)

## 💡 Pro Tips

1. **Keep it Simple**: Don't overcomplicate - the beauty is in simplicity
2. **Regular Updates**: Add new content weekly/monthly
3. **Optimize Images**: Compress before uploading
4. **Test Thoroughly**: Check all devices and browsers
5. **Backup Often**: Keep your content backed up
6. **Track Progress**: Update your learning milestones
7. **Share & Network**: Link to your dashboard in your profiles

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed info
- Review the code comments in HTML/CSS files
- Search Stack Overflow for specific issues
- Email: 22f1001290@ds.study.iitm.ac.in

## ✨ Quick Wins

Make these changes in < 5 minutes each:

1. **Update Name & Title**: Line 67-73 in index.html
2. **Change Hero Text**: Line 170-171 in index.html
3. **Update Email**: Line 157 and 746 in index.html
4. **Change Site Title**: Line 12 and 21-23 in index.html
5. **Update Footer**: Line 768 in index.html

## 🎉 You're All Set!

Your dashboard is ready to go. Start customizing and make it your own!

Remember: This is YOUR learning journey. Make it reflect who you are and what you're learning!

---

**Happy Learning!** 🚀📊🐍

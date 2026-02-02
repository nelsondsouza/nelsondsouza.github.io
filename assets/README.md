# Assets Directory

This directory contains all static assets for the Data Science Learning Dashboard.

## Directory Structure

```
assets/
├── images/          # Images and photos
│   ├── profile/     # Profile pictures
│   ├── projects/    # Project screenshots
│   ├── gallery/     # Data visualization images
│   └── icons/       # Custom icons and logos
├── documents/       # PDF files, resumes, etc.
└── README.md        # This file
```

## Asset Guidelines

### Images

- **Format**: Use WebP for modern browsers, with PNG/JPG fallbacks
- **Optimization**: Compress images before uploading
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `python-project-screenshot.png`)
- **Size**: 
  - Profile images: 400x400px
  - Project screenshots: 1200x800px
  - Gallery images: 800x600px
  - Icons: 64x64px or SVG

### Recommended Image Sizes

#### Profile Avatar
- **Size**: 400x400px (square)
- **Format**: PNG or JPG
- **Location**: `assets/images/profile/avatar.png`

#### Project Screenshots
- **Size**: 1200x800px (3:2 ratio)
- **Format**: PNG or JPG
- **Location**: `assets/images/projects/project-name.png`

#### Gallery Images
- **Size**: 800x600px (4:3 ratio)
- **Format**: PNG or JPG
- **Location**: `assets/images/gallery/visualization-name.png`

### Documents

- **Format**: PDF preferred
- **Size**: Keep under 5MB
- **Naming**: Descriptive names (e.g., `nelson-dsouza-resume.pdf`)

## Adding Images to Your Site

### Profile Image Example

Replace the avatar placeholder in `index.html`:

```html
<!-- Current placeholder -->
<div class="profile-avatar">
    <span class="avatar-placeholder">ND</span>
</div>

<!-- Replace with image -->
<div class="profile-avatar">
    <img src="assets/images/profile/avatar.png" alt="Nelson D'Souza">
</div>
```

### Project Screenshot Example

Add to project cards:

```html
<article class="gallery-card">
    <div class="gallery-image">
        <img src="assets/images/projects/customer-churn.png" alt="Customer Churn Prediction">
    </div>
    <div class="gallery-info">
        <h3 class="gallery-title">Customer Churn Prediction</h3>
        <p class="gallery-description">ML model for predicting customer churn</p>
    </div>
</article>
```

### Logo Example

Add a logo to the navigation:

```html
<div class="navbar-logo">
    <img src="assets/images/icons/logo.svg" alt="DS Hub Logo" style="height: 40px;">
    <h1>DS Learning Hub</h1>
</div>
```

## Image Optimization Tools

- **Online Tools**:
  - [TinyPNG](https://tinypng.com/) - PNG and JPG compression
  - [Squoosh](https://squoosh.app/) - Image optimization
  - [CloudConvert](https://cloudconvert.com/) - Format conversion

- **Command Line**:
  ```bash
  # Convert to WebP
  cwebp input.png -q 80 -o output.webp
  
  # Optimize PNG
  pngquant input.png --output output.png
  
  # Optimize JPG
  jpegoptim --max=85 input.jpg
  ```

## Icon Resources

Free icon sources:
- [Heroicons](https://heroicons.com/)
- [Font Awesome](https://fontawesome.com/)
- [Feather Icons](https://feathericons.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

Currently, the dashboard uses emoji icons (🐍, 🤖, etc.) which work on all platforms without additional files.

## Best Practices

1. **Always optimize images** before adding them to the site
2. **Use alt text** for all images for accessibility
3. **Maintain consistent aspect ratios** within each category
4. **Test images** on different screen sizes
5. **Use lazy loading** for below-the-fold images (add `loading="lazy"` attribute)
6. **Provide fallbacks** for modern formats like WebP

## Example: Adding a Profile Picture

1. Prepare your image:
   - Crop to square (1:1 ratio)
   - Resize to 400x400px
   - Optimize the file size
   - Save as `avatar.png` or `avatar.jpg`

2. Upload to `assets/images/profile/`

3. Update `index.html` and `sections/python-detailed.html`:
   ```html
   <div class="profile-avatar">
       <img src="assets/images/profile/avatar.png" 
            alt="Nelson D'Souza" 
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
   </div>
   ```

4. Add CSS if needed in `css/sidebar.css`:
   ```css
   .profile-avatar img {
       width: 100%;
       height: 100%;
       object-fit: cover;
       border-radius: 50%;
   }
   ```

## Need Help?

If you need help adding or optimizing images, refer to the main README.md or reach out for support.

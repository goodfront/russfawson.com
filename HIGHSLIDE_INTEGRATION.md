# Highslide Lightbox Integration for Static Site

## Overview

The russfawson.com site uses **Highslide JS** for image galleries with lightbox functionality. This document outlines how to ensure Highslide works properly with static HTML paths.

## Current Status

**IMPORTANT:** The Highslide library files are **NOT currently in the repository**. They are referenced at `/_elements/highslide/` but this directory doesn't exist locally.

### Required Action
The Highslide library files must be obtained from one of these sources:
1. Copy from the live production server
2. Download from the Highslide website (verify license)
3. Use a modern alternative lightbox library (recommended)

## Highslide File Requirements

### Expected Directory Structure

```
_elements/
└── highslide/
    ├── highslide-with-gallery.js    (Main library with gallery features)
    ├── highslide.css                (Stylesheet)
    └── graphics/                    (Image assets for UI)
        ├── loader.white.gif
        ├── outlines/
        ├── controls/
        └── ... (other graphics)
```

### Files Referenced in Code

From `_elements/php/gallery.php:3-6`:
- `/_elements/highslide/highslide-with-gallery.js`
- `/_elements/highslide/highslide.css`
- `/_elements/highslide/graphics/` (directory for UI graphics)

## Highslide Configuration

### JavaScript Configuration (Ready for Static Site)

The following configuration is already static-friendly and can be copied directly into the HTML:

```html
<script type="text/javascript" src="/_elements/highslide/highslide-with-gallery.js"></script>
<link rel="stylesheet" type="text/css" href="/_elements/highslide/highslide.css" />
<script type="text/javascript">
    hs.graphicsDir = '/_elements/highslide/graphics/';
    hs.align = 'center';
    hs.transitions = ['expand', 'crossfade'];
    hs.wrapperClassName = 'dark borderless floating-caption';
    hs.showCredits = false;

    // Add the slideshow controlbar
    if (hs.addSlideshow) hs.addSlideshow({
        interval: 5000,
        repeat: false,
        useControls: true,
        fixedControls: 'fit',
        overlayOptions: {
            opacity: .6,
            position: 'bottom center',
            hideOnMouseOut: true
        }
    });
</script>
```

### Key Configuration Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `hs.graphicsDir` | `/_elements/highslide/graphics/` | Path to UI graphics (arrows, close button, etc.) |
| `hs.align` | `center` | Center the lightbox on screen |
| `hs.transitions` | `['expand', 'crossfade']` | Animation effects |
| `hs.wrapperClassName` | `dark borderless floating-caption` | Visual style |
| `hs.showCredits` | `false` | Hide Highslide credits |
| Slideshow interval | `5000` | 5 seconds between auto-advance |
| Slideshow repeat | `false` | Don't loop at end of gallery |

## HTML Structure for Static Site

### Gallery Thumbnail Pattern

Each gallery thumbnail must follow this HTML structure:

```html
<div class="highslide-gallery" style="text-align:center">

  <!-- Repeat for each image -->
  <a href="/photos/accessories/image1.jpg"
     class="highslide"
     onclick="return hs.expand(this)">
    <img src="/photos/accessories/_thumbs/image1.jpg"
         class="galleryThumb"
         alt="Image 1" />
  </a>

  <a href="/photos/accessories/image2.jpg"
     class="highslide"
     onclick="return hs.expand(this)">
    <img src="/photos/accessories/_thumbs/image2.jpg"
         class="galleryThumb"
         alt="Image 2" />
  </a>

  <!-- More images... -->

</div>
```

### Required HTML Elements

1. **Container div** with class `highslide-gallery`
2. **Anchor tag** (`<a>`) for each image:
   - `href` = path to full-size image
   - `class="highslide"` (required for Highslide to detect)
   - `onclick="return hs.expand(this)"` (triggers lightbox)
3. **Img tag** (`<img>`) inside each anchor:
   - `src` = path to thumbnail image
   - `class="galleryThumb"` (for styling)
   - `alt` = descriptive text

## Static Site Implementation Checklist

### Phase 1: Obtain Highslide Library
- [ ] Locate and copy Highslide files from production server, OR
- [ ] Download Highslide from official source (check license), OR
- [ ] Choose modern alternative (PhotoSwipe, Lightbox2, GLightbox, etc.)

### Phase 2: Integrate into Build System
- [ ] Copy Highslide library to `dist/_elements/highslide/` during build
- [ ] Ensure all files are copied (JS, CSS, graphics/)
- [ ] Verify graphics directory structure is preserved

### Phase 3: Generate Gallery HTML
For each gallery page, the build script must:
- [ ] Include Highslide JS/CSS in `<head>` section
- [ ] Include Highslide configuration script
- [ ] Generate thumbnail links using the HTML pattern above
- [ ] Use absolute paths (starting with `/`) for all image references

### Phase 4: Test Functionality
- [ ] Click thumbnail opens lightbox with full-size image
- [ ] Navigation arrows work (prev/next in gallery)
- [ ] Slideshow controls appear and function
- [ ] Keyboard navigation works (arrow keys, Esc to close)
- [ ] Mobile touch/swipe gestures work
- [ ] Browser console shows no JavaScript errors

## Path Mapping for Highslide

### Galleries Using Highslide

| Gallery | Page Path | Image Directory | Thumbnail Directory |
|---------|-----------|-----------------|---------------------|
| Accessories | `/accessories/photos.html` | `/photos/accessories/*.jpg` | `/photos/accessories/_thumbs/*.jpg` |
| Holsters | `/holsters/photos.html` | `/photos/holsters/*.jpg` | `/photos/holsters/_thumbs/*.jpg` |
| Featured Saddles | `/saddles/featured.html` | `/photos/featured/*.jpg` | `/photos/featured/_thumbs/*.jpg` |

### HTML Path Pattern

For a given image file `leather-belt.jpg` in the accessories gallery:

```html
<a href="/photos/accessories/leather-belt.jpg"
   class="highslide"
   onclick="return hs.expand(this)">
  <img src="/photos/accessories/_thumbs/leather-belt.jpg"
       class="galleryThumb"
       alt="Leather Belt" />
</a>
```

**Key points:**
- Both paths start with `/` (absolute paths)
- Thumbnail path is full-size path with `_thumbs/` inserted
- Image filename is identical in both paths

## Build Script Requirements

The build script must:

1. **Scan each gallery directory** for images:
   ```javascript
   const accessories = fs.readdirSync('photos/accessories')
     .filter(f => f.endsWith('.jpg'))
     .sort();
   ```

2. **Verify thumbnail exists** for each image:
   ```javascript
   const thumbPath = `photos/accessories/_thumbs/${filename}`;
   if (!fs.existsSync(thumbPath)) {
     console.error(`Missing thumbnail: ${thumbPath}`);
   }
   ```

3. **Generate HTML** for each thumbnail:
   ```javascript
   const html = accessories.map(filename => `
     <a href="/photos/accessories/${filename}"
        class="highslide"
        onclick="return hs.expand(this)">
       <img src="/photos/accessories/_thumbs/${filename}"
            class="galleryThumb"
            alt="${filename}" />
     </a>
   `).join('\n');
   ```

4. **Wrap in container**:
   ```javascript
   const gallery = `<div class="highslide-gallery" style="text-align:center">
     ${html}
   </div>`;
   ```

5. **Include configuration** in `<head>`:
   - Reference Highslide JS/CSS files
   - Include configuration script (see above)

## Alternative: Modern Lightbox Libraries

If Highslide cannot be obtained or licensed properly, consider these modern alternatives:

### Recommended: PhotoSwipe
- **License:** MIT (free for all uses)
- **Features:** Touch gestures, responsive, modern UI
- **Size:** ~20KB gzipped
- **Documentation:** https://photoswipe.com/

### Alternative: GLightbox
- **License:** MIT
- **Features:** Lightweight, responsive, video support
- **Size:** ~20KB
- **Documentation:** https://biati-digital.github.io/glightbox/

### Migration Considerations
If switching libraries:
1. Update HTML structure to match new library's requirements
2. Update CSS class names
3. Update JavaScript initialization
4. Test all gallery functionality
5. Ensure mobile compatibility

## License Verification

**IMPORTANT:** Highslide JS has licensing requirements. Before deploying to production:

1. **Check current license status** on production server
2. **Verify license covers static hosting** (not just PHP)
3. **Review terms** at highslide.com
4. **Consider free alternatives** if license is unclear

## Summary

### What Works Without Changes
✅ Highslide JavaScript configuration (already static)
✅ HTML structure (generated from PHP, but static-friendly)
✅ Path patterns (absolute paths work for static sites)
✅ Thumbnail naming convention (consistent and predictable)

### What Needs Action
❌ **Obtain Highslide library files** (not in repository)
❌ **Verify Highslide license** for static site usage
❌ **Copy library to dist/** during build process
❌ **Generate static HTML** with proper anchor tags

### Build System Integration
The build script must:
1. Copy `_elements/highslide/` to `dist/_elements/highslide/`
2. Include Highslide config in generated HTML `<head>`
3. Generate thumbnail HTML with correct structure
4. Use absolute paths for all image references

## Testing Checklist

After implementing static galleries:

- [ ] Gallery thumbnails display correctly
- [ ] Clicking thumbnail opens lightbox
- [ ] Full-size image loads in lightbox
- [ ] Previous/next arrows work
- [ ] Slideshow controls function
- [ ] Close button/ESC key closes lightbox
- [ ] Keyboard arrow keys navigate images
- [ ] Touch/swipe works on mobile
- [ ] No JavaScript console errors
- [ ] Works in Chrome, Firefox, Safari
- [ ] Works on mobile devices

## References

- **Current PHP implementation:** `_elements/php/gallery.php:1-59`
- **Gallery usage examples:**
  - `accessories/photos.php:32`
  - `holsters/photos.php:32`
  - `saddles/featured.php:52`
- **Image mapping document:** `IMAGE_MAPPING.md`
- **Thumbnail specifications:** `THUMBNAILS_README.md`

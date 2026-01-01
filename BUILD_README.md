# Build System Documentation

## Overview

This is a custom static site generator built with pure Node.js and template literals. It converts the dynamic PHP-based website into a static HTML site that can be deployed to GitHub Pages.

## Architecture

### Build Scripts (scripts/)

- **build.js** - Main build orchestrator that coordinates all build tasks
- **parseSaddles.js** - Parses saddle text files and extracts structured data
- **templates.js** - HTML template functions using ES6 template literals
- **generatePages.js** - Generates dynamic HTML pages (saddle detail pages, index)
- **generateGalleries.js** - Generates gallery pages (featured, accessories, holsters)
- **generateCorePages.js** - Generates redirect pages for GitHub Pages compatibility
- **copyAssets.js** - Copies static assets and pre-built HTML pages to dist/

### Static HTML Pages (pages/)

Pre-built static HTML pages that are copied to dist/ during build:
- Home page (index.html)
- About page (about/index.html)
- Contact page (contact/index.html)
- Testimonials page (testimonials/index.html)
- Saddle prices (saddles/prices.html)
- Saddle options (saddles/options.html)
- Accessories prices (accessories/prices.html)
- Holsters prices (holsters/prices.html)

### Build Process

1. **Clean** - Removes old dist/ directory
2. **Parse** - Reads and parses saddle text files from saddles/info/text/
3. **Generate Saddle Pages** - Creates dynamic HTML pages:
   - Individual saddle detail pages (with prev/next navigation)
   - Saddle index/gallery page
4. **Generate Gallery Pages** - Creates photo gallery pages:
   - Featured saddle gallery (with Highslide lightbox)
   - Accessories photo gallery
   - Holsters photo gallery
5. **Copy Static Assets** - Copies all static files:
   - Static HTML pages from pages/
   - _elements/ (CSS, JS, images, Highslide)
   - Photo directories with thumbnails
   - Saddle options images
6. **Generate Redirects** - Creates GitHub Pages-compatible redirect pages:
   - /saddles/photos.php → /saddles/
   - /accessories/index.php → /accessories/photos.html
   - /holsters/index.php → /holsters/photos.html

## Usage

### Build Commands

```bash
# Full build (generates static site in dist/)
npm run build

# Clean the dist/ directory
npm run clean

# Build and start local development server
npm run dev

# Stop the development server
npm run dev:stop
```

### Development Server

The development server uses Docker Compose with nginx:

- Serves the dist/ directory on http://localhost:8080
- Configured with nginx for production-like testing
- Caching disabled for development

To use the dev server:

1. Run `npm run dev` (builds the site and starts nginx)
2. Open http://localhost:8080 in your browser
3. Press Ctrl+C to stop the container
4. Or run `npm run dev:stop` to stop it separately

## File Structure

### Source Files (Committed to Git)

```
russfawson.com/
├── scripts/              # Build scripts
├── saddles/
│   └── info/
│       ├── text/        # Saddle data files (.txt)
│       └── photos/      # Images and _thumbs/
├── _elements/           # CSS, JS, images
├── package.json         # Build configuration
├── docker-compose.yml   # Dev server config
└── nginx.conf          # nginx configuration
```

### Generated Files (NOT Committed)

```
dist/                    # Built static site (gitignored)
├── saddles/
│   ├── index.html      # Saddle gallery page
│   └── info/
│       ├── *.html      # Individual saddle pages
│       └── photos/     # Copied from source
├── _elements/          # Copied from source
└── ...
```

## Saddle Text File Format

Saddle data files in `saddles/info/text/` follow this format:

```
Title of the Saddle
SOLD $2,750 or Price information
Tree: 16" Association
Horn: Rawhide Wrap, 4" Dally
Cantle: 4" with Cheyenne Roll
Feature: Description here
Another Feature: Another description
```

- **Line 1**: Saddle title
- **Line 2**: Price/status
- **Lines 3+**: Bullet points (lines with "Label: Value" get bold labels)

## Photo Naming Convention

Photos must follow this naming pattern:

- Main photo: `CustomSaddle-{ID}-{SlugName}.jpg`
- Additional views: `CustomSaddle-{ID}-{SlugName}1.jpg`, `...2.jpg`, etc.
- Thumbnails: Same names in `_thumbs/` subdirectory

Example:
- Full: `CustomSaddle-101-RussMaverick.jpg`
- Thumb: `_thumbs/CustomSaddle-101-RussMaverick.jpg`

## Template System

Templates use ES6 template literals for maximum simplicity:

```javascript
function saddleDetailPage(saddle) {
  return `<!DOCTYPE html>
<html>
  <head><title>${saddle.title}</title></head>
  <body>${saddle.content}</body>
</html>`;
}
```

See `scripts/templates.js` for all template functions.

## Adding New Saddles

1. Add text file to `saddles/info/text/` (format: `{ID}-{SlugName}.txt`)
2. Add photos to `saddles/info/photos/`
3. Add thumbnails to `saddles/info/photos/_thumbs/`
4. Run `npm run build`
5. Generated pages appear in `dist/saddles/info/`

## Navigation

- Saddle detail pages include prev/next links that cycle through all saddles
- Navigation is automatically generated based on saddle ID order (newest first)
- Active navigation links highlighted with JavaScript

## Next Steps

The build system currently handles:
- ✅ Saddle detail pages
- ✅ Saddle index/gallery page
- ✅ Static asset copying
- ✅ Prev/next navigation

Still needed (Phase 3 of conversion plan):
- ⏳ Gallery pages (featured saddles, accessories, holsters)
- ⏳ Core pages (index, about, contact, testimonials, etc.)
- ⏳ Price and options pages
- ⏳ Error pages (404, 500)

## Troubleshooting

### Build fails with "directory not found"
This is expected for directories not yet converted (featured, accessories, holsters). The build will continue successfully.

### Images not displaying
Check that:
1. Photos exist in source directory
2. Thumbnails exist in _thumbs/ subdirectory
3. Naming convention matches pattern above

### Dev server won't start
Make sure Docker is running and port 8080 is not in use.

## Performance

Current build time: ~2 seconds for 20 saddles
- Parsing: <0.1s
- Generation: <0.5s
- Asset copying: ~1.5s

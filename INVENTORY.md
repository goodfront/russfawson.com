# Site Inventory & Documentation

This document provides a detailed inventory of the russfawson.com PHP site components, dependencies, data sources, and routing logic. This information is essential for the conversion to static HTML.

## PHP File Dependencies and Includes

### Core Component Files

#### 1. `/_elements/php/nav.php`
**Purpose:** Dynamic navigation system that adapts based on domain
**Included by:** All main page templates
**Key Features:**
- Detects domain using `$_SERVER['HTTP_HOST']`
- Shows different navigation for `saddles.russfawson.com` vs `www.russfawson.com`
- Client-side JavaScript for active page highlighting using Prototype.js
- Dynamic subdomain navigation for saddles subdomain

**Domain Detection Logic:**
```php
if(preg_match('/saddles?\.russfawson\.com/',$_SERVER['HTTP_HOST']))
```

#### 2. `/_elements/php/stats.php`
**Purpose:** Google Analytics tracking
**Included by:** All pages (included at bottom before closing `</body>`)
**Key Features:**
- Different tracking codes for different domains:
  - `www.russfawson.com`: UA-6856026-1
  - `customsaddles.russfawson.com`: UA-6856026-2
- Domain-specific analytics using `$_SERVER['HTTP_HOST']`

#### 3. `/_elements/php/saddleInfoPage.php`
**Purpose:** Dynamic saddle detail page generation class
**Included by:** `/saddles/info/index.php`
**Key Features:**
- Reads saddle data from text files in `/saddles/info/text/`
- Generates thumbnails on-the-fly using PHP GD library
- Implements prev/next navigation between saddles
- Domain-aware path handling (adjusts for `saddles.russfawson.com` subdomain)
- Thumbnail dimensions: 129px width × 176px height
- Stores thumbnails in `/saddles/info/photos/_thumbs/`

**Data File Parsing:**
- Line 1: Saddle title
- Line 2: Price information
- Lines 3+: Bullet point features (supports "Label: Value" format)

**Photo Naming Convention:**
- Main photo: `CustomSaddle-###-SaddleName.jpg` (no number suffix)
- Detail photos: `CustomSaddle-###-SaddleName1.jpg`, `CustomSaddle-###-SaddleName2.jpg`, etc.

#### 4. `/_elements/php/gallery.php`
**Purpose:** Generic photo gallery system with Highslide lightbox
**Included by:**
- `/accessories/photos.php`
- `/holsters/photos.php`
- `/saddles/featured.php`

**Key Features:**
- Uses Highslide JavaScript library for lightbox functionality
- Generates 100px × 100px thumbnails
- Stores thumbnails in `_thumbs/` subdirectory within each gallery
- Auto-generates thumbnails if missing
- Manual refresh via `?update=gallery` query parameter

**Function:** `printGallery($gallery)`
- Takes gallery path as parameter (e.g., `/photos/accessories/`)
- Scans for JPG files, creates thumbnails, generates HTML

### Page Structure and Dependencies

#### Main Pages (www.russfawson.com)
All pages follow this include pattern:

1. **Header template** (Dreamweaver template system)
   - Links to `/_elements/css/main.css`
   - Links to `/_elements/js/prototype.js`
   - Links to `/_elements/js/rotate.js`
   - Rotating header images (8 images in `/rotate/`)

2. **Navigation sidebar**
   - `<?php include($_SERVER['DOCUMENT_ROOT'].'/_elements/php/nav.php'); ?>`

3. **Main content** (page-specific)

4. **Analytics footer**
   - `<?php include($_SERVER['DOCUMENT_ROOT'].'/_elements/php/stats.php'); ?>`

#### Page Files

**Root Domain Pages:**
- `/index.php` - Homepage (no includes, self-contained)
- `/about/index.php` - About page
- `/contact/index.php` - Contact page
- `/testimonials/index.php` - Testimonials page

**Saddles Section:**
- `/saddles/index.php` - Saddles main page
- `/saddles/options.php` - Saddle options page
- `/saddles/prices.php` - Saddle pricing page
- `/saddles/featured.php` - Featured saddle gallery (includes `gallery.php`)
- `/saddles/info/index.php` - Dynamic saddle detail pages (includes `saddleInfoPage.php`)
- `/saddles/photos.php` - **REDIRECT** to `./` (saddles index)

**Accessories Section:**
- `/accessories/photos.php` - Accessories photo gallery (includes `gallery.php`)
- `/accessories/prices.php` - Accessories pricing page
- `/accessories/index.php` - **REDIRECT** to `photos.php`

**Holsters Section:**
- `/holsters/photos.php` - Holsters photo gallery (includes `gallery.php`)
- `/holsters/prices.php` - Holsters pricing page
- `/holsters/index.php` - **REDIRECT** to `photos.php`

**Error Pages:**
- `/500.php` - Root domain 500 error page
- `/saddles/500.php` - Saddles subdomain 500 error page

### Dependency Tree Summary

```
All Pages
├── /_elements/css/main.css
├── /_elements/js/prototype.js
├── /_elements/js/rotate.js
├── /_elements/php/nav.php (navigation)
└── /_elements/php/stats.php (analytics)

Gallery Pages (accessories, holsters, featured)
└── /_elements/php/gallery.php
    └── /_elements/highslide/* (lightbox library)

Saddle Info Pages
└── /_elements/php/saddleInfoPage.php
    └── Text files in /saddles/info/text/
```

## Data Sources

### Saddle Information Text Files

Location: `/saddles/info/text/`

**Total Files:** 20 saddle data files

**File List:**
1. `101-RussMaverick.txt`
2. `102-RockyMountain.txt`
3. `103-DesertRose.txt`
4. `104-JarredsRoper.txt`
5. `105-HalfBreed.txt`
6. `106-Greenhorn.txt`
7. `107-1870_HalfSeat.txt`
8. `108-USMarshal.txt`
9. `109-EvanBarbedWire.txt`
10. `110-SegoLily.txt`
11. `111-OregonRawhide.txt`
12. `112-BuffaloSaddle.txt`
13. `113-ColoradoOutlaw.txt`
14. `114-MuleSaddle.txt`
15. `115-WildRose.txt`
16. `116-GregsOldTimer.txt`
17. `117-MattsAssociation.txt`
18. `118-UtahOutlaw.txt`
19. `119-MitchsSaddle.txt`
20. `120-JacesSaddle.txt`

**File Format:**
```
Line 1: Saddle Name/Title
Line 2: Price (e.g., "Sold", "Available: $4500")
Line 3+: Feature bullets (can use "Label: Description" format)
```

**Usage:** These files are dynamically parsed by `saddleInfoPage.php` to generate individual saddle detail pages.

## Photo Directories Requiring Thumbnail Generation

### 1. Saddle Info Photos
**Source:** `/saddles/info/photos/`
**Thumbnails:** `/saddles/info/photos/_thumbs/`
**Dimensions:** 129px width × 176px height
**Count:** ~85 photos (20 saddles × ~4 photos each)
**Naming:** `CustomSaddle-###-SaddleName.jpg` and `CustomSaddle-###-SaddleName#.jpg`
**Handler:** `saddleInfoPage.php` class

### 2. Featured Saddle Gallery
**Source:** `/photos/featured/`
**Thumbnails:** `/photos/featured/_thumbs/`
**Dimensions:** 100px × 100px
**Handler:** `gallery.php`

### 3. Accessories Photos
**Source:** `/photos/accessories/`
**Thumbnails:** `/photos/accessories/_thumbs/`
**Dimensions:** 100px × 100px
**Count:** ~55 photos
**Categories:** Cuffs, Canteens, Saddlebags, Spurs, Belts, etc.
**Handler:** `gallery.php`

### 4. Holsters Photos
**Source:** `/photos/holsters/`
**Thumbnails:** `/photos/holsters/_thumbs/`
**Dimensions:** 100px × 100px
**Count:** ~43 photos
**Categories:** Various holster styles and scabbards
**Handler:** `gallery.php`

### 5. Saddles Gallery (general)
**Source:** `/photos/saddles/`
**Thumbnails:** `/photos/saddles/_thumbs/`
**Dimensions:** 100px × 100px
**Handler:** `gallery.php`
**Note:** May not be actively used on current site

### Summary of Thumbnail Requirements

| Gallery | Source Directory | Thumb Directory | Dimensions | Approx Count |
|---------|------------------|-----------------|------------|--------------|
| Saddle Info | `/saddles/info/photos/` | `/saddles/info/photos/_thumbs/` | 129×176 | 85 |
| Featured | `/photos/featured/` | `/photos/featured/_thumbs/` | 100×100 | ~6 |
| Accessories | `/photos/accessories/` | `/photos/accessories/_thumbs/` | 100×100 | 55 |
| Holsters | `/photos/holsters/` | `/photos/holsters/_thumbs/` | 100×100 | 43 |
| Saddles | `/photos/saddles/` | `/photos/saddles/_thumbs/` | 100×100 | ? |

## Domain/Subdomain Routing Logic

### Domains in Use

1. **www.russfawson.com** - Main website
   - Full navigation with all sections
   - Google Analytics ID: UA-6856026-1

2. **saddles.russfawson.com** (or customsaddles.russfawson.com) - Saddles subdomain
   - Simplified navigation focused on saddles
   - Google Analytics ID: UA-6856026-2
   - Different path handling in `saddleInfoPage.php`

### Routing Behavior

#### Navigation (`nav.php`)

**For saddles.russfawson.com:**
```php
if(preg_match('/saddles?\.russfawson\.com/',$_SERVER['HTTP_HOST']))
```
Shows navigation:
- Russ' Saddles (/)
- Saddle Options (/options.php)
- Other Resources section:
  - Saddle Accessories (links to www.russfawson.com/accessories/)
  - Contact Russ Fawson (links to www.russfawson.com/contact/)

**For www.russfawson.com:**
Shows navigation:
- Home (/)
- Saddles (/saddles/)
  - Options (sub-nav if on saddles section)
- Accessories (/accessories/photos.php)
- Holsters & Scabbards (/holsters/photos.php)
- Testimonials (/testimonials/)
- About Russ (/about/)
- Contact (/contact/)

#### Path Adjustments (`saddleInfoPage.php`)

The class detects the saddles subdomain and adjusts paths accordingly:
```php
if(preg_match('/saddles?\.russfawson\.com/',$_SERVER['HTTP_HOST'])){
    $this->pathFromDocRoot = '/info/';
}
```

This changes:
- `/saddles/info/` → `/info/` (for saddles subdomain)

#### Analytics (`stats.php`)

Different tracking codes are loaded based on domain:
- `www.russfawson.com` → UA-6856026-1
- `customsaddles.russfawson.com` → UA-6856026-2

### Redirects

Three pages implement PHP redirects:

1. **`/saddles/photos.php`** → redirects to `./` (saddles index)
2. **`/accessories/index.php`** → redirects to `photos.php`
3. **`/holsters/index.php`** → redirects to `photos.php`

These should be converted to HTML meta redirects or configured via hosting provider's redirect rules.

## Key Technical Details

### Server Variables Used
- `$_SERVER['DOCUMENT_ROOT']` - Used extensively for file path construction
- `$_SERVER['HTTP_HOST']` - Used for domain detection and routing
- `$_SERVER['REQUEST_URI']` - Used in nav.php for current page detection

### JavaScript Libraries
- **Prototype.js** - Used for DOM manipulation and AJAX
- **Highslide** - Used for image lightbox galleries
- **rotate.js** - Used for rotating header images

### Image Processing
- PHP GD library (`imagecreatefromjpeg`, `imagecopyresampled`, `imagejpeg`)
- Only processes JPG files
- Maintains aspect ratio when creating thumbnails
- Auto-generates missing thumbnails on page load

### File System Operations
- `opendir()`, `readdir()` - Directory scanning
- `file()` - Reading text file lines into array
- `is_file()`, `is_dir()` - File/directory existence checks
- `mkdir()` - Creating thumbnail directories

## Conversion Considerations

### Path Handling
All instances of `$_SERVER['DOCUMENT_ROOT']` will need to be replaced with relative paths in the build script.

### Dynamic Content
- 20 saddle detail pages need to be generated from text files
- Prev/next navigation must be calculated during build
- All thumbnails must be pre-generated

### Domain Strategy
Need to decide whether to:
1. Serve both domains from one static build with client-side routing
2. Create separate builds for each domain
3. Consolidate to single domain with redirects

**Recommendation:** Start with Option 1 (single build), can split later if needed.

### Thumbnail Generation
Build script needs to handle two different thumbnail sizes:
- 129×176 for saddle info photos (portrait orientation)
- 100×100 for all gallery photos

### Navigation
Navigation will need to be generated at build time, but active page highlighting can remain client-side JavaScript.

### Analytics
Replace PHP-based analytics detection with client-side implementation or use a single GA4 property with different data streams.

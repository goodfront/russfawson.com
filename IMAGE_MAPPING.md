# Image to Thumbnail Path Mapping

This document maps the relationship between original images and their thumbnail paths across the russfawson.com website. This mapping will be used by the static site generator to create proper HTML links.

## Overview

The site uses a consistent pattern where thumbnails are stored in a `_thumbs/` subdirectory within the same directory as the full-size images. The mapping is:

```
Full-size:  /path/to/directory/image.jpg
Thumbnail:  /path/to/directory/_thumbs/image.jpg
```

## Gallery Systems

### 1. Simple Gallery System (Accessories, Holsters, Featured)

**Used in:**
- Accessories: `/accessories/photos.php` → `/photos/accessories/`
- Holsters: `/holsters/photos.php` → `/photos/holsters/`
- Featured: `/saddles/featured.php` → `/photos/featured/`

**Thumbnail Size:** 100×100 pixels

**Path Pattern:**
```
Full-size:  /{gallery-path}/{filename}.jpg
Thumbnail:  /{gallery-path}/_thumbs/{filename}.jpg
```

**HTML Pattern (with Highslide):**
```html
<a href="/{gallery-path}/{filename}.jpg"
   class="highslide"
   onclick="return hs.expand(this)">
  <img src="/{gallery-path}/_thumbs/{filename}.jpg"
       class="galleryThumb"
       alt="{filename}" />
</a>
```

**Example:**
```html
<a href="/photos/accessories/leather-belt.jpg"
   class="highslide"
   onclick="return hs.expand(this)">
  <img src="/photos/accessories/_thumbs/leather-belt.jpg"
       class="galleryThumb"
       alt="leather-belt" />
</a>
```

**Current Implementation:** `_elements/php/gallery.php:45-59`

---

### 2. Saddle Index System

**Used in:** `/saddles/info/index.php` (main index listing)

**Thumbnail Size:** 166×300 pixels

**Naming Convention:**
- Pattern: `CustomSaddle-{number}{name}.jpg`
- Examples:
  - `CustomSaddle-101RussMaverick.jpg`
  - `CustomSaddle-102WadeMcRae.jpg`

**Path Pattern:**
```
Full-size:  /saddles/info/photos/CustomSaddle-{number}{name}.jpg
Thumbnail:  /saddles/info/photos/_thumbs/CustomSaddle-{number}{name}.jpg
```

**HTML Pattern (navigation link):**
```html
<td>
  <a href="/saddles/info/?{saddleNumber}">
    <img src="/saddles/info/photos/_thumbs/CustomSaddle-{number}{name}.jpg"
         alt="Saddle {number}" />
    <span class="saddleNum">Saddle {number}:</span>
    <span class="saddleName">{Name}</span>
  </a>
</td>
```

**Static Conversion Note:**
The link `href="/saddles/info/?{saddleNumber}"` will need to become `href="/saddles/info/{saddleNumber}.html"`

**Current Implementation:** `_elements/php/saddle_index.php:1-47`

---

### 3. Saddle Detail Page System

**Used in:** Individual saddle detail pages (e.g., `/saddles/info/?101`)

**Thumbnail Size:** 129×176 pixels

**Naming Convention:**
- Main photo: `CustomSaddle-{number}{name}.jpg`
- Additional photos: `CustomSaddle-{number}{name}{suffix}.jpg`
- Suffix pattern: Numbers 1-9, or letters A-Z
- Examples:
  - `CustomSaddle-101RussMaverick.jpg` (main)
  - `CustomSaddle-101RussMaverick1.jpg`
  - `CustomSaddle-101RussMaverick2.jpg`
  - `CustomSaddle-101RussMaverickA.jpg`

**Path Pattern:**
```
Full-size:  /saddles/info/photos/CustomSaddle-{number}{name}[{suffix}].jpg
Thumbnail:  /saddles/info/photos/_thumbs/CustomSaddle-{number}{name}[{suffix}].jpg
```

**HTML Pattern (with JavaScript image swapping):**
```html
<div id="infoThumbs">
  <img src="/saddles/info/photos/_thumbs/CustomSaddle-{number}{name}.jpg"
       id="infoThumb1"
       class="infoThumb" />
  <img src="/saddles/info/photos/_thumbs/CustomSaddle-{number}{name}1.jpg"
       id="infoThumb2"
       class="infoThumb" />
  <!-- Additional thumbnails... -->
</div>

<img src="/saddles/info/photos/CustomSaddle-{number}{name}.jpg"
     id="infoImage"
     alt="Saddle {number}" />
```

**JavaScript Pattern:**
```javascript
// Image preloading and swapping logic
var thumbs = document.getElementsByClassName('infoThumb');
var infoImage = document.getElementById('infoImage');
var loadImg = [];

for(var t=0; t<thumbs.length; t++){
    loadImg[t] = new Image();
    loadImg[t].src = thumbs[t].src.replace('_thumbs/','');

    thumbs[t].onclick = function(){
        infoImage.src = this.src.replace('_thumbs/','');
    };
}
```

**Current Implementation:** `_elements/php/saddleInfoPage.php:63-66, 135-142, 159-180`

---

## Data File Structure

### Saddle Text Files

**Location:** `/saddles/info/text/`

**Naming Convention:** `CustomSaddle-{number}{name}.txt`

**Format:** Plain text files containing saddle descriptions

**Parsing Logic:**
- First line: Saddle name (displayed as "Saddle {number}: {Name}")
- Remaining lines: Description content
- Empty lines become `<br />` tags

**Example:** `CustomSaddle-101RussMaverick.txt`
```
Russ Maverick
This is the description of the saddle...
Multiple paragraphs can be included.
```

**Current Implementation:** `_elements/php/saddleInfoPage.php:110-119`

---

## Dynamic to Static Conversion Requirements

### 1. Directory Scanning Replacement

**Current behavior:** PHP scans directories with `opendir()` to discover files dynamically.

**Static alternative:** Build script must:
- Scan directories at build time
- Generate static manifests/arrays of image files
- Create static HTML with hardcoded image references

**Affected files:**
- `_elements/php/gallery.php:45-59` (gallery thumbnails)
- `_elements/php/saddle_index.php:1-24` (saddle index photos)
- `_elements/php/saddleInfoPage.php:26-76` (saddle detail photos)

---

### 2. Thumbnail Generation Replacement

**Current behavior:** PHP GD library generates thumbnails on-demand if they don't exist.

**Static alternative:**
- All thumbnails must be manually created by designer (per Phase 2.1)
- Three sizes required: 100×100, 166×300, 129×176
- Thumbnails committed to repository in `_thumbs/` subdirectories

**Functions to remove:**
- `createthumb()` in `gallery.php:87-116`
- `createthumb()` in `saddle_index.php:66-96`
- `createthumb()` in `saddleInfoPage.php:78-108`

---

### 3. Query Parameter Navigation Replacement

**Current behavior:** Saddle detail pages use query parameters (`/saddles/info/?101`)

**Static alternative:** Individual HTML files for each saddle
- Pattern: `/saddles/info/101.html`
- Build script generates one file per `.txt` file in `/saddles/info/text/`

**Navigation links:**
- Index page: Update `href="/saddles/info/?{number}"` → `href="/saddles/info/{number}.html"`
- Prev/Next: Generate static links during build based on sorted file list

**Current Implementation:** `saddles/info/index.php:2`, `_elements/php/saddleInfoPage.php:26-76`

---

### 4. Prev/Next Navigation Generation

**Current behavior:** PHP dynamically determines previous/next saddles by:
1. Scanning `/saddles/info/text/` directory
2. Extracting saddle numbers from filenames
3. Sorting numerically in descending order (newest first)
4. Finding current saddle's position and calculating neighbors

**Static alternative:** Build script must:
1. Scan text directory at build time
2. Sort files by saddle number (descending)
3. For each saddle, determine prev/next in sorted list
4. Generate static HTML with hardcoded prev/next links

**Link pattern:**
```html
<a href="/saddles/info/{prev-number}.html" class="prev">Previous Saddle</a>
<a href="/saddles/info/{next-number}.html" class="next">Next Saddle</a>
```

**Current Implementation:** `_elements/php/saddleInfoPage.php:26-76, 121-133`

---

## Highslide Lightbox Integration

### Configuration (Already Static)

The Highslide configuration is already defined in static JavaScript and requires no conversion:

**File:** `_elements/php/gallery.php:1-28`

```javascript
<script type="text/javascript" src="/_elements/highslide/highslide-with-gallery.js"></script>
<link rel="stylesheet" type="text/css" href="/_elements/highslide/highslide.css" />
<script type="text/javascript">
    hs.graphicsDir = '/_elements/highslide/graphics/';
    hs.align = 'center';
    hs.transitions = ['expand', 'crossfade'];
    hs.wrapperClassName = 'dark borderless floating-caption';
    hs.showCredits = false;

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

**Static site requirements:**
1. Copy Highslide library files to `dist/_elements/highslide/`
2. Include configuration script in all gallery pages
3. Ensure anchor tags have `class="highslide"` and `onclick="return hs.expand(this)"`

**License Note:** Verify Highslide license compliance for static site usage

---

## Build Script Requirements

The build script must generate the following static structures:

### 1. Gallery Pages (Accessories, Holsters, Featured)

For each gallery directory:
1. Scan the directory for `.jpg` files
2. For each image, verify matching thumbnail exists in `_thumbs/`
3. Generate HTML with the simple gallery pattern (see section 1 above)
4. Include Highslide configuration
5. Sort images alphabetically by filename

**Output files:**
- `/dist/accessories/photos.html`
- `/dist/holsters/photos.html`
- `/dist/saddles/featured.html`

---

### 2. Saddle Index Page

1. Scan `/saddles/info/text/` for all `.txt` files
2. Extract saddle number and name from filename
3. Sort by saddle number descending (newest first)
4. For each saddle, verify thumbnail exists
5. Generate table layout with thumbnails and links

**Output file:** `/dist/saddles/info/index.html`

**Data structure example:**
```javascript
const saddles = [
  {
    number: 102,
    name: "Wade McRae",
    filename: "CustomSaddle-102WadeMcRae",
    thumbnail: "/saddles/info/photos/_thumbs/CustomSaddle-102WadeMcRae.jpg",
    link: "/saddles/info/102.html"
  },
  {
    number: 101,
    name: "Russ Maverick",
    filename: "CustomSaddle-101RussMaverick",
    thumbnail: "/saddles/info/photos/_thumbs/CustomSaddle-101RussMaverick.jpg",
    link: "/saddles/info/101.html"
  }
];
```

---

### 3. Saddle Detail Pages

For each `.txt` file in `/saddles/info/text/`:

1. Parse filename to extract saddle number and name
2. Read text file content (first line = name, rest = description)
3. Find all matching photos using pattern `CustomSaddle-{number}{name}[suffix].jpg`
4. Verify all thumbnails exist in `_thumbs/`
5. Determine prev/next saddle links from sorted list
6. Generate HTML with:
   - Main photo display
   - Thumbnail gallery with JavaScript image swapping
   - Text content
   - Prev/next navigation

**Output files:** `/dist/saddles/info/{number}.html`

**Example:** `/dist/saddles/info/101.html`

---

## Path Mapping Summary Table

| Gallery Type | Full-Size Path | Thumbnail Path | Size | HTML Type |
|-------------|----------------|----------------|------|-----------|
| Accessories | `/photos/accessories/{file}.jpg` | `/photos/accessories/_thumbs/{file}.jpg` | 100×100 | Highslide link |
| Holsters | `/photos/holsters/{file}.jpg` | `/photos/holsters/_thumbs/{file}.jpg` | 100×100 | Highslide link |
| Featured | `/photos/featured/{file}.jpg` | `/photos/featured/_thumbs/{file}.jpg` | 100×100 | Highslide link |
| Saddle Index | `/saddles/info/photos/CustomSaddle-{n}{name}.jpg` | `/saddles/info/photos/_thumbs/CustomSaddle-{n}{name}.jpg` | 166×300 | Navigation link |
| Saddle Detail | `/saddles/info/photos/CustomSaddle-{n}{name}[s].jpg` | `/saddles/info/photos/_thumbs/CustomSaddle-{n}{name}[s].jpg` | 129×176 | JS image swap |

**Legend:**
- `{file}` = Any filename
- `{n}` = Saddle number
- `{name}` = Saddle name (no spaces)
- `[s]` = Optional suffix (1-9 or A-Z)

---

## Next Steps for Phase 2.2 Completion

- [x] Document image-to-thumbnail path patterns
- [x] Document Highslide integration requirements
- [ ] Verify all thumbnails exist in their expected locations
- [ ] Create sample data structure for build script
- [ ] Document JavaScript requirements for static site

---

## References

**PHP Files Analyzed:**
- `_elements/php/gallery.php` - Simple gallery system with Highslide
- `_elements/php/saddle_index.php` - Saddle index listing with thumbnails
- `_elements/php/saddleInfoPage.php` - Individual saddle detail pages
- `saddles/info/index.php` - Saddle info entry point
- `accessories/photos.php` - Accessories gallery
- `holsters/photos.php` - Holsters gallery
- `saddles/featured.php` - Featured saddles gallery

**Key File Locations:**
- Highslide library: `/_elements/highslide/`
- Saddle text files: `/saddles/info/text/`
- Saddle photos: `/saddles/info/photos/` (thumbnails in `_thumbs/`)
- Accessories photos: `/photos/accessories/` (thumbnails in `_thumbs/`)
- Holsters photos: `/photos/holsters/` (thumbnails in `_thumbs/`)
- Featured photos: `/photos/featured/` (thumbnails in `_thumbs/`)

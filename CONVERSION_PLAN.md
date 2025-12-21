# PHP to Static HTML Conversion Plan

## Overview
This plan outlines the steps needed to convert russfawson.com from a dynamic PHP site to a static HTML site. The conversion will eliminate the need for PHP hosting while maintaining all current functionality.

### Deployment Strategy: GitHub Pages + GitHub Actions
- **Source files** (PHP, images, text files, build scripts) committed to `main` branch
- **GitHub Actions** automatically builds the site on every push
- **Built files** deployed to `gh-pages` branch (not committed to `main`)
- **GitHub Pages** serves the static site from `gh-pages` branch
- **Benefits:** Free hosting, automatic SSL, no manual build/deploy steps, version controlled content

## Phase 1: Setup & Preparation

### 1.1 Create Build Environment
- [x] Set up Node.js/npm environment for build scripts
- [x] Create `dist/` directory for generated static files (local testing only, not committed)
- [x] Install required dependencies (image processing library like `sharp` or `jimp`)
- [x] Set up `.gitignore` to exclude `dist/` and `node_modules/`

### 1.2 Inventory & Documentation
- [x] Document all PHP file dependencies and includes
- [x] List all data sources (text files in `/saddles/info/text/`)
- [x] List all photo directories and their thumbnail requirements
- [x] Document domain/subdomain routing logic (www vs saddles subdomain)

## Phase 2: Image Processing

### 2.1 Thumbnail Management
- [x] Document required thumbnail dimensions for each gallery type
- [x] Thumbnails will be manually created by designer and committed to repository
- [x] Verify all existing photos have corresponding thumbnails
- [x] Created comprehensive THUMBNAILS_README.md with specifications and guidelines

### 2.2 Update Image References
- [ ] Create mapping of original images to thumbnail paths
- [ ] Ensure Highslide lightbox integration works with static paths

## Phase 3: Content Generation

### 3.1 Convert Saddle Information System
- [ ] Parse all saddle text files in `/saddles/info/text/*.txt`
- [ ] Generate individual HTML page for each saddle
- [ ] Implement prev/next navigation links between saddles
- [ ] Generate saddle index/listing page with thumbnails
- [ ] Port saddleInfoPage.php functionality to templates

### 3.2 Convert Gallery Pages
- [ ] Generate static HTML for `/saddles/featured.php` (featured saddle galleries)
- [ ] Generate static HTML for `/accessories/photos.php`
- [ ] Generate static HTML for `/holsters/photos.php`
- [ ] Ensure Highslide JavaScript lightbox configuration is preserved
- [ ] Test gallery navigation and image loading

### 3.3 Convert Core Pages
- [ ] Convert `/index.php` to `/index.html`
- [ ] Convert `/about/index.php` to `/about/index.html`
- [ ] Convert `/contact/index.php` to `/contact/index.html`
- [ ] Convert `/testimonials/index.php` to `/testimonials/index.html`
- [ ] Convert `/saddles/index.php` to `/saddles/index.html`
- [ ] Convert `/saddles/prices.php` to `/saddles/prices.html`
- [ ] Convert `/saddles/options.php` to `/saddles/options.html`
- [ ] Convert `/accessories/prices.php` to `/accessories/prices.html`
- [ ] Convert `/holsters/prices.php` to `/holsters/prices.html`

## Phase 4: Navigation & Shared Components

### 4.1 Convert Navigation System
- [ ] Extract navigation HTML from `nav.php`
- [ ] Create navigation component for www domain pages
- [ ] Create navigation component for saddles subdomain pages
- [ ] Implement client-side JavaScript for active page highlighting
- [ ] Test navigation on all pages

### 4.2 Analytics Migration
- [ ] Replace PHP-based analytics (`stats.php`) with client-side Google Analytics
- [ ] Add GA tracking code to all HTML pages
- [ ] Configure different tracking codes for different domains if needed
- [ ] Consider upgrading to GA4 if still using Universal Analytics

## Phase 5: Redirects & Error Pages

### 5.1 Handle Existing Redirects
- [ ] Convert `/saddles/photos.php` redirect to HTML meta redirect or .htaccess
- [ ] Convert `/accessories/index.php` redirect to HTML meta redirect or .htaccess
- [ ] Convert `/holsters/index.php` redirect to HTML meta redirect or .htaccess

### 5.2 Error Pages
- [ ] Convert `/500.php` to `/500.html`
- [ ] Convert `/saddles/500.php` to `/saddles/500.html`
- [ ] Configure static hosting provider for custom error pages

## Phase 6: Build Script Development

### 6.1 Create Build Automation
- [ ] Write build script (Node.js or shell script) that:
  - Parses saddle text files
  - Generates all HTML pages from templates
  - Copies static assets (CSS, JS, images, thumbnails)
  - Creates final static site in `dist/` directory
- [ ] Create HTML templates for reusable components
- [ ] Implement template engine (Handlebars, EJS, or similar)
- [ ] Ensure build script is idempotent (can be run multiple times safely)

### 6.2 Build Configuration
- [ ] Create `package.json` with build scripts
- [ ] Document build process in README
- [ ] Add npm scripts for:
  - `npm run build` - full site build
  - `npm run clean` - clean build directory
  - `npm run dev` - local development server

## Phase 7: Testing

### 7.1 Local Testing
- [ ] Set up local static web server (live-server, http-server, or similar)
- [ ] Test all pages load correctly
- [ ] Test all navigation links work
- [ ] Test all image galleries and lightbox functionality
- [ ] Test all thumbnails display correctly
- [ ] Verify saddle detail pages with prev/next navigation

### 7.2 Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in mobile browsers

### 7.3 Functionality Verification
- [ ] Verify Google Analytics tracking works
- [ ] Test domain/subdomain routing if applicable
- [ ] Verify all external links work
- [ ] Check all internal links resolve correctly

## Phase 8: GitHub Actions & Deployment

### 8.1 GitHub Repository Setup
- [ ] Create GitHub repository for the project (if not already exists)
- [ ] Push source files to repository (PHP, build scripts, assets)
- [ ] Verify `.gitignore` excludes `dist/` and `node_modules/`
- [ ] Ensure all source images and text files are committed

### 8.2 Create GitHub Actions Workflow
- [ ] Create `.github/workflows/deploy.yml` file
- [ ] Configure workflow to:
  - Trigger on push to `main` branch
  - Set up Node.js environment
  - Install dependencies (`npm install`)
  - Run build script (`npm run build`)
  - Deploy `dist/` contents to `gh-pages` branch
- [ ] Use `peaceiris/actions-gh-pages@v3` action for deployment

### 8.3 GitHub Pages Configuration
- [ ] Enable GitHub Pages in repository settings
- [ ] Set source to `gh-pages` branch
- [ ] Configure custom domain (www.russfawson.com) in repository settings
- [ ] Add `CNAME` file to build output for custom domain

### 8.4 Domain Configuration
- [ ] Configure DNS A records for www.russfawson.com to point to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- [ ] Configure DNS for saddles.russfawson.com subdomain if needed
- [ ] Wait for SSL certificate to provision (automatic with GitHub Pages)
- [ ] Test HTTPS access

### 8.5 Test Automated Deployment
- [ ] Make a small change and push to `main` branch
- [ ] Verify GitHub Actions workflow runs successfully
- [ ] Check that changes appear on live site
- [ ] Verify deployment time and troubleshoot any issues

### 8.6 Production Verification
- [ ] Test all pages load correctly on production URL
- [ ] Verify custom domain works with HTTPS
- [ ] Test all navigation and functionality
- [ ] Check browser console for any errors

## Phase 9: Content Update Workflow

### 9.1 Adding New Saddles
- [ ] Document process for adding new saddle:
  1. Add text file to `/saddles/info/text/`
  2. Add photos to `/saddles/info/photos/`
  3. Commit and push changes to GitHub
  4. GitHub Actions automatically builds and deploys (2-5 minutes)

### 9.2 Adding New Photos
- [ ] Document process for adding photos to galleries:
  1. Add full-size images to appropriate directory
  2. Designer creates corresponding thumbnails
  3. Add thumbnails to corresponding thumbs/ directory
  4. Commit and push changes to GitHub
  5. GitHub Actions automatically rebuilds and deploys

### 9.3 Updating Prices/Content
- [ ] Document process for updating static content pages:
  1. Edit source PHP/template files
  2. Commit and push changes to GitHub
  3. GitHub Actions automatically rebuilds affected pages
- [ ] Create detailed README with common update scenarios
- [ ] Consider adding a "last updated" timestamp to generated pages

## Phase 10: Cleanup & Optimization

### 10.1 Organize Source Files
- [ ] Keep original PHP files as source/reference (they won't be deployed to GitHub Pages)
- [ ] Verify `.gitignore` properly excludes build artifacts
- [ ] Clean up any temporary or unused files from repository
- [ ] Document which files are source vs. which are generated

### 10.2 Performance Optimization
- [ ] Optimize image sizes and formats (consider WebP)
- [ ] Minify CSS and JavaScript
- [ ] Enable CDN caching on hosting provider
- [ ] Add proper cache headers
- [ ] Consider lazy loading for images

### 10.3 SEO Considerations
- [ ] Ensure all pages have proper meta tags
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Set up 301 redirects if URLs change

## Technical Decisions

### Hosting & Deployment ✅ DECIDED
**Decision:** GitHub Pages with GitHub Actions automation
- Source files (PHP, images, text files, build scripts) stored in `main` branch
- GitHub Actions automatically builds on every push
- Built site deployed to `gh-pages` branch
- GitHub Pages serves from `gh-pages` branch
- Free hosting, automatic SSL, CDN included

### Domain/Subdomain Handling
**Decision needed:** How to handle www.russfawson.com vs saddles.russfawson.com?
- Option A: Serve different static builds based on domain (complex routing in build)
- Option B: Use single build with client-side routing (simpler)
- Option C: Create separate GitHub Pages projects for each domain
- **Recommendation:** Start with Option B (single build), can split later if needed

### Build Tool Choice
**Decision needed:** What tool/framework to use?
- Option A: Custom Node.js script (most control, requires development)
- Option B: Static site generator like Eleventy/11ty (modern, flexible, good for this use case)
- Option C: Simple shell scripts with HTML templating (minimal dependencies)
- **Recommendation:** Eleventy/11ty - handles templates well, supports data files, good for gallery sites

### Content Management ✅ DECIDED
**Decision:** Git-based workflow with automated builds
- Content stored as text files in repository (current structure)
- Changes committed via Git
- GitHub Actions rebuilds automatically on push
- Simple workflow, version controlled, no CMS needed

## Estimated Effort

- **Phase 1-2:** 2-4 hours (setup and thumbnail organization)
- **Phase 3:** 8-12 hours (content generation logic)
- **Phase 4-5:** 4-6 hours (navigation and redirects)
- **Phase 6:** 6-10 hours (build script development)
- **Phase 7:** 4-6 hours (testing)
- **Phase 8:** 1-2 hours (GitHub Actions setup - much simpler than manual deployment!)
- **Phase 9-10:** 2-4 hours (documentation and optimization)

**Total: 27-44 hours** depending on complexity and automation level

Note: Using GitHub Actions significantly simplifies deployment compared to manual processes. Thumbnail creation by designer happens in parallel and is not included in this estimate.

## Next Steps

1. Review this plan and decide on technical approach
2. Set up development environment
3. Start with Phase 1 (setup) and Phase 2 (thumbnails)
4. Build incrementally and test frequently
5. Keep backup of original PHP site until fully tested

## Repository Structure

### What Gets Committed (main branch)
```
russfawson.com/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── saddles/
│   ├── info/
│   │   ├── text/              # Saddle data files
│   │   └── photos/            # Original images and thumbs/
│   └── featured/              # Featured galleries (images and thumbs/)
├── accessories/
│   └── photos/                # Images and thumbs/
├── holsters/
│   └── photos/                # Images and thumbs/
├── styles/                     # CSS files
├── scripts/                    # Build scripts (Node.js)
├── templates/                  # HTML templates
├── package.json               # Build dependencies
├── .gitignore                 # Excludes dist/ and node_modules/
└── README.md                  # Documentation
```

**Note:** All thumbnails are manually created by a designer and committed to the repository alongside the full-size images.

### What Gets Generated (NOT committed)
```
dist/                          # Built site (excluded by .gitignore)
├── index.html
├── saddles/
│   ├── info/
│   │   ├── photos/           # Copied from source (including thumbs/)
│   │   └── [saddle-name].html
│   └── index.html
└── ...all other HTML files

node_modules/                  # Dependencies (excluded by .gitignore)
```

### What GitHub Pages Serves (gh-pages branch)
- Automatically contains only the contents of `dist/` after each build
- Managed entirely by GitHub Actions
- Never edit this branch manually

## GitHub Actions Workflow Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: www.russfawson.com
```

This workflow will:
1. Trigger on every push to `main` branch
2. Install Node.js and dependencies
3. Run your build script
4. Deploy the `dist/` folder to `gh-pages` branch
5. Preserve your custom domain (CNAME file)

## Notes

- The current PHP site uses `$_SERVER['DOCUMENT_ROOT']` extensively - this will need to be replaced with proper path handling in the build script
- Highslide JavaScript lightbox appears to be used - ensure license compliance for static site
- Consider modernizing to a more current lightbox library during conversion
- Some PHP files use `.htaccess` cache-busting with `?update=gallery` parameter - consider versioned asset filenames instead
- **Build artifacts (`dist/`, `node_modules/`) should NEVER be committed** - they're generated by GitHub Actions
- Source files (images, text files, PHP templates, build scripts) ARE committed to `main` branch
- The `gh-pages` branch is managed automatically by GitHub Actions - don't edit it manually

## Frequently Asked Questions

### Will my build scripts be publicly visible?
Yes, your source code (including build scripts) will be in the repository, but GitHub Pages only serves the files from the `gh-pages` branch (the built HTML/CSS/JS/images). Visitors cannot see your build scripts, Node.js code, or original PHP files - only the final generated website.

### What if I want to keep the repository private?
GitHub Pages for private repositories requires a paid GitHub plan. For free hosting with private repos, consider Netlify or Vercel instead. However, since this is a business website with no sensitive data in the source code, a public repository is perfectly fine and actually preferred for GitHub Pages.

### How long does the build take?
Typically 2-5 minutes from push to live. The first build may take longer while GitHub Actions caches your dependencies. Subsequent builds are faster.

### What happens if the build fails?
GitHub Actions will send you an email notification. The previous working version of your site remains live until a successful build completes. You can view build logs in the "Actions" tab of your repository to debug issues.

### Can I test locally before pushing?
Yes! Run `npm run build` locally and use a local web server (like `npx http-server dist`) to preview the built site before committing changes.

### What about the saddles subdomain?
You can either:
1. Serve both domains from one site with client-side routing (simpler)
2. Create a second GitHub repository for saddles.russfawson.com (more complex, but cleaner separation)
The plan recommends starting with option 1 and splitting later if needed.

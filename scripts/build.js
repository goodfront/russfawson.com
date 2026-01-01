#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parseSaddleFiles } = require('./parseSaddles');
const { copyAssets } = require('./copyAssets');
const { generateSaddlePages, generateSaddleIndex } = require('./generatePages');
const { generateGalleryPages } = require('./generateGalleries');
const { generateRedirects } = require('./generateCorePages');

const DIST_DIR = path.join(__dirname, '..', 'dist');

async function clean() {
  console.log('🧹 Cleaning dist directory...');
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

async function build() {
  try {
    console.log('🚀 Starting build process...\n');

    // Clean the dist directory
    await clean();

    // Parse saddle data files
    console.log('📖 Parsing saddle data files...');
    const saddles = parseSaddleFiles();
    console.log(`   Found ${saddles.length} saddles\n`);

    // Generate saddle pages
    console.log('📝 Generating saddle pages...');
    await generateSaddlePages(saddles);
    console.log(`   Generated ${saddles.length} saddle detail pages\n`);

    // Generate saddle index page
    console.log('📋 Generating saddle index page...');
    await generateSaddleIndex(saddles);
    console.log('   Generated saddle index page\n');

    // Generate gallery pages
    console.log('🖼️  Generating gallery pages...');
    await generateGalleryPages(DIST_DIR);
    console.log('   Generated featured, accessories, and holsters galleries\n');

    // Copy static assets (includes static HTML pages)
    console.log('📦 Copying static assets...');
    await copyAssets();
    console.log('   Copied static pages, CSS, JS, images, and photos\n');

    // Generate redirects
    console.log('🔀 Generating redirects...');
    await generateRedirects(DIST_DIR);
    console.log('   Generated redirect pages for GitHub Pages compatibility\n');

    console.log('✅ Build complete! Site generated in dist/');

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build if this script is executed directly
if (require.main === module) {
  build();
}

module.exports = { build, clean };

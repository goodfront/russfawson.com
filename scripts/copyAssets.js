const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(__dirname, '..', 'dist');

/**
 * Recursively copy a directory
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`   ⚠️  Source directory not found: ${src}`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copy all static assets to dist directory
 */
async function copyAssets() {
  // Copy static HTML pages
  console.log('   📄 Copying static HTML pages...');
  copyDirectory(
    path.join(SRC_DIR, 'pages'),
    DIST_DIR
  );

  // Copy _elements directory (CSS, JS, images)
  console.log('   📄 Copying _elements...');
  copyDirectory(
    path.join(SRC_DIR, '_elements'),
    path.join(DIST_DIR, '_elements')
  );

  // Copy saddle photos (including thumbnails)
  console.log('   🖼️  Copying saddle photos...');
  copyDirectory(
    path.join(SRC_DIR, 'saddles', 'info', 'photos'),
    path.join(DIST_DIR, 'saddles', 'info', 'photos')
  );

  // Copy saddle options images
  console.log('   🖼️  Copying saddle options images...');
  copyDirectory(
    path.join(SRC_DIR, 'saddles', 'options'),
    path.join(DIST_DIR, 'saddles', 'options')
  );

  // Copy /photos/ directory (featured, accessories, holsters galleries)
  console.log('   🖼️  Copying gallery photos...');
  copyDirectory(
    path.join(SRC_DIR, 'photos'),
    path.join(DIST_DIR, 'photos')
  );

  console.log('   ✓ All assets copied');
}

module.exports = {
  copyAssets,
  copyDirectory
};

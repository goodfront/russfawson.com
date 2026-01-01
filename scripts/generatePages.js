const fs = require('fs');
const path = require('path');
const { saddleDetailPage, saddleIndexPage } = require('./templates');

const DIST_DIR = path.join(__dirname, '..', 'dist');

/**
 * Generate HTML pages for all saddles
 */
async function generateSaddlePages(saddles) {
  const infoDir = path.join(DIST_DIR, 'saddles', 'info');
  fs.mkdirSync(infoDir, { recursive: true });

  for (const saddle of saddles) {
    const html = saddleDetailPage(saddle);
    const outputPath = path.join(infoDir, `${saddle.slug}.html`);
    fs.writeFileSync(outputPath, html, 'utf-8');
  }

  console.log(`   Generated ${saddles.length} saddle pages in dist/saddles/info/`);
}

/**
 * Generate the saddle index page
 */
async function generateSaddleIndex(saddles) {
  const saddlesDir = path.join(DIST_DIR, 'saddles');
  fs.mkdirSync(saddlesDir, { recursive: true });

  const html = saddleIndexPage(saddles);
  const outputPath = path.join(saddlesDir, 'index.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  console.log(`   Generated saddle index at dist/saddles/index.html`);
}

module.exports = {
  generateSaddlePages,
  generateSaddleIndex
};

const fs = require('fs');
const path = require('path');
const { baseLayout } = require('./templates');

/**
 * Highslide JavaScript and CSS includes
 */
function highslideHead() {
  return `<script type="text/javascript" src="/_elements/highslide/highslide-with-gallery.js"></script>
<link rel="stylesheet" type="text/css" href="/_elements/highslide/highslide.css" />
<script type="text/javascript">
	hs.graphicsDir = '/_elements/highslide/graphics/';
	hs.align = 'center';
	hs.transitions = ['expand', 'crossfade'];
	hs.wrapperClassName = 'dark borderless floating-caption';
	hs.showCredits = false;

	// Add the controlbar
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
</script>`;
}

/**
 * Generate gallery HTML from a directory of images
 */
function generateGalleryHTML(galleryPath, webPath) {
  const thumbsPath = path.join(galleryPath, '_thumbs');

  if (!fs.existsSync(thumbsPath)) {
    console.warn(`   Warning: No _thumbs directory found at ${thumbsPath}`);
    return '';
  }

  // Read all thumbnail files
  const files = fs.readdirSync(thumbsPath)
    .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
    .sort();

  if (files.length === 0) {
    console.warn(`   Warning: No images found in ${thumbsPath}`);
    return '';
  }

  // Generate HTML for each thumbnail
  const thumbsHTML = files.map(file => {
    return `<a href="${webPath}${file}" class="highslide" onclick="return hs.expand(this)"><img src="${webPath}_thumbs/${file}" class="galleryThumb" /></a>`;
  }).join('\n');

  return `<div class="highslide-gallery" style="text-align:center">
${thumbsHTML}
</div>`;
}

/**
 * Generate featured saddle gallery page
 */
function generateFeaturedPage(distDir) {
  const sourceDir = path.join(__dirname, '..', 'photos', 'featured');
  const galleryHTML = generateGalleryHTML(sourceDir, '/photos/featured/');

  const mainContent = `<img src="/_elements/images/content/featured.jpg" width="340" height="409" align="right" class="photoEffect" style="margin: 15px 0px 100px 20px" />
<h1>Featured Saddle</h1>
<ul>
	<li>1800's Half Seat</li>
	<li>Custom Tooling</li>
	<li>Slick Fork</li>
	<li>Modified Sam Stagg Rigging</li>
	<li>Brass Horn</li>
	<li>Brass Ox Bow Stirrups</li>
</ul>
<blockquote>
	<p style="font-size: 18px">Asking Price: $3500</p>
</blockquote>
<p>This is an 1800's half seat saddle. From what I have read  they evolved from early Mexican saddles and California saddles to what was called a Texas trail saddle. They are a lighter weight saddle, and the half seat makes it easier to repair the rigging and the stirrup leathers. This one has a modified Sam Stagg rigging with a brass horn, outside stirrup leathers with brass Ox Bow stirrups, engraved brass conchas and rounded-square skirtings. The custom Sego Lily  tooling throughout the saddle was designed by my wife and myself. This saddle was awarded a sweepstakes award at the Iron County Fair in Utah in 2008.</p>
<p>&nbsp;</p>
${galleryHTML}`;

  const html = baseLayout({
    title: 'Russ Fawson - Featured Saddle',
    head: highslideHead() + `<style type="text/css">
.style1 {font-size: 18px}
</style>`,
    mainContent,
    sideNav: true
  });

  // Create output directory
  const outputDir = path.join(distDir, 'saddles');
  fs.mkdirSync(outputDir, { recursive: true });

  // Write HTML file
  const outputPath = path.join(outputDir, 'featured.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  return outputPath;
}

/**
 * Generate accessories gallery page
 */
function generateAccessoriesPage(distDir) {
  const sourceDir = path.join(__dirname, '..', 'photos', 'accessories');
  const galleryHTML = generateGalleryHTML(sourceDir, '/photos/accessories/');

  const mainContent = `<h1>Accessories</h1>
<p>Describe what you want and Russ will give you a quote.</p>
${galleryHTML}
<p>&nbsp; </p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>`;

  const html = baseLayout({
    title: 'Russ Fawson - Accessory Photos',
    head: highslideHead(),
    mainContent,
    sideNav: true
  });

  // Create output directory
  const outputDir = path.join(distDir, 'accessories');
  fs.mkdirSync(outputDir, { recursive: true });

  // Write HTML file
  const outputPath = path.join(outputDir, 'photos.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  return outputPath;
}

/**
 * Generate holsters gallery page
 */
function generateHolstersPage(distDir) {
  const sourceDir = path.join(__dirname, '..', 'photos', 'holsters');
  const galleryHTML = generateGalleryHTML(sourceDir, '/photos/holsters/');

  const mainContent = `<h1>Holsters & Scabbards</h1>
<p>Describe what you want and Russ will give you a quote.</p>
${galleryHTML}

<p>&nbsp; </p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>`;

  const html = baseLayout({
    title: 'Russ Fawson - Holster Photos',
    head: highslideHead(),
    mainContent,
    sideNav: true
  });

  // Create output directory
  const outputDir = path.join(distDir, 'holsters');
  fs.mkdirSync(outputDir, { recursive: true });

  // Write HTML file
  const outputPath = path.join(outputDir, 'photos.html');
  fs.writeFileSync(outputPath, html, 'utf-8');

  return outputPath;
}

/**
 * Generate all gallery pages
 */
async function generateGalleryPages(distDir) {
  const results = [];

  console.log('   Generating featured saddle gallery...');
  results.push(generateFeaturedPage(distDir));

  console.log('   Generating accessories gallery...');
  results.push(generateAccessoriesPage(distDir));

  console.log('   Generating holsters gallery...');
  results.push(generateHolstersPage(distDir));

  return results;
}

module.exports = {
  generateGalleryPages,
  highslideHead,
  generateGalleryHTML
};

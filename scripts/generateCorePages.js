const fs = require('fs');
const path = require('path');

/**
 * Generate a redirect HTML page (GitHub Pages compatible)
 * Uses both meta refresh and JavaScript redirect for maximum compatibility
 */
function generateRedirect(targetUrl, message = 'Redirecting...') {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="${targetUrl}">
  <script>
    window.location.href = "${targetUrl}";
  </script>
</head>
<body>
  <p>${message}</p>
  <p>If you are not redirected automatically, <a href="${targetUrl}">click here</a>.</p>
</body>
</html>`;
}

/**
 * Generate redirect pages for GitHub Pages compatibility
 */
async function generateRedirects(distDir) {
  const results = [];

  // /saddles/photos.php -> /saddles/
  console.log('   Creating redirect: /saddles/photos.php -> /saddles/');
  const saddlesDir = path.join(distDir, 'saddles');
  fs.mkdirSync(saddlesDir, { recursive: true });
  const saddlesPhotosPath = path.join(saddlesDir, 'photos.php');
  fs.writeFileSync(saddlesPhotosPath, generateRedirect('/saddles/', 'Redirecting to saddle gallery...'), 'utf-8');
  results.push(saddlesPhotosPath);

  // /accessories/index.php -> /accessories/photos.html
  console.log('   Creating redirect: /accessories/index.php -> /accessories/photos.html');
  const accessoriesDir = path.join(distDir, 'accessories');
  fs.mkdirSync(accessoriesDir, { recursive: true });
  const accessoriesIndexPath = path.join(accessoriesDir, 'index.php');
  fs.writeFileSync(accessoriesIndexPath, generateRedirect('/accessories/photos.html', 'Redirecting to accessories photos...'), 'utf-8');
  results.push(accessoriesIndexPath);

  // /holsters/index.php -> /holsters/photos.html
  console.log('   Creating redirect: /holsters/index.php -> /holsters/photos.html');
  const holstersDir = path.join(distDir, 'holsters');
  fs.mkdirSync(holstersDir, { recursive: true });
  const holstersIndexPath = path.join(holstersDir, 'index.php');
  fs.writeFileSync(holstersIndexPath, generateRedirect('/holsters/photos.html', 'Redirecting to holsters photos...'), 'utf-8');
  results.push(holstersIndexPath);

  return results;
}

module.exports = {
  generateRedirects,
  generateRedirect
};

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

  // Saddles redirects
  const saddlesDir = path.join(distDir, 'saddles');
  fs.mkdirSync(saddlesDir, { recursive: true });

  console.log('   Creating redirect: /saddles/photos.php -> /saddles/');
  const saddlesPhotosPath = path.join(saddlesDir, 'photos.php.html');
  fs.writeFileSync(saddlesPhotosPath, generateRedirect('/saddles/', 'Redirecting to saddle gallery...'), 'utf-8');
  results.push(saddlesPhotosPath);

  console.log('   Creating redirect: /saddles/options.php -> /saddles/options.html');
  const saddlesOptionsPath = path.join(saddlesDir, 'options.php.html');
  fs.writeFileSync(saddlesOptionsPath, generateRedirect('/saddles/options.html', 'Redirecting to saddle options...'), 'utf-8');
  results.push(saddlesOptionsPath);

  console.log('   Creating redirect: /saddles/prices.php -> /saddles/prices.html');
  const saddlesPricesPath = path.join(saddlesDir, 'prices.php.html');
  fs.writeFileSync(saddlesPricesPath, generateRedirect('/saddles/prices.html', 'Redirecting to saddle prices...'), 'utf-8');
  results.push(saddlesPricesPath);

  // Accessories redirects
  const accessoriesDir = path.join(distDir, 'accessories');
  fs.mkdirSync(accessoriesDir, { recursive: true });

  console.log('   Creating redirect: /accessories/index.php -> /accessories/photos.html');
  const accessoriesIndexPath = path.join(accessoriesDir, 'index.php.html');
  fs.writeFileSync(accessoriesIndexPath, generateRedirect('/accessories/photos.html', 'Redirecting to accessories photos...'), 'utf-8');
  results.push(accessoriesIndexPath);

  console.log('   Creating redirect: /accessories/photos.php -> /accessories/photos.html');
  const accessoriesPhotosPath = path.join(accessoriesDir, 'photos.php.html');
  fs.writeFileSync(accessoriesPhotosPath, generateRedirect('/accessories/photos.html', 'Redirecting to accessories photos...'), 'utf-8');
  results.push(accessoriesPhotosPath);

  console.log('   Creating redirect: /accessories/prices.php -> /accessories/prices.html');
  const accessoriesPricesPath = path.join(accessoriesDir, 'prices.php.html');
  fs.writeFileSync(accessoriesPricesPath, generateRedirect('/accessories/prices.html', 'Redirecting to accessories prices...'), 'utf-8');
  results.push(accessoriesPricesPath);

  // Holsters redirects
  const holstersDir = path.join(distDir, 'holsters');
  fs.mkdirSync(holstersDir, { recursive: true });

  console.log('   Creating redirect: /holsters/index.php -> /holsters/photos.html');
  const holstersIndexPath = path.join(holstersDir, 'index.php.html');
  fs.writeFileSync(holstersIndexPath, generateRedirect('/holsters/photos.html', 'Redirecting to holsters photos...'), 'utf-8');
  results.push(holstersIndexPath);

  console.log('   Creating redirect: /holsters/photos.php -> /holsters/photos.html');
  const holstersPhotosPath = path.join(holstersDir, 'photos.php.html');
  fs.writeFileSync(holstersPhotosPath, generateRedirect('/holsters/photos.html', 'Redirecting to holsters photos...'), 'utf-8');
  results.push(holstersPhotosPath);

  console.log('   Creating redirect: /holsters/prices.php -> /holsters/prices.html');
  const holstersPricesPath = path.join(holstersDir, 'prices.php.html');
  fs.writeFileSync(holstersPricesPath, generateRedirect('/holsters/prices.html', 'Redirecting to holsters prices...'), 'utf-8');
  results.push(holstersPricesPath);

  return results;
}

module.exports = {
  generateRedirects,
  generateRedirect
};

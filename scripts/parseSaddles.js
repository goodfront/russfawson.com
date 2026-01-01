const fs = require('fs');
const path = require('path');

const SADDLES_TEXT_DIR = path.join(__dirname, '..', 'saddles', 'info', 'text');
const SADDLES_PHOTOS_DIR = path.join(__dirname, '..', 'saddles', 'info', 'photos');

/**
 * Parse a single saddle text file
 * Format:
 *   Line 1: Title
 *   Line 2: Price (e.g., "SOLD $2,750" or "$3,200")
 *   Lines 3+: Bullet points (some with "Label: Value" format)
 */
function parseSaddleFile(filename, content) {
  const lines = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length < 2) {
    throw new Error(`Invalid saddle file format: ${filename}`);
  }

  // Extract ID and slug from filename (e.g., "101-RussMaverick.txt")
  const match = filename.match(/^(\d+)-(.+)\.txt$/);
  if (!match) {
    throw new Error(`Invalid filename format: ${filename}`);
  }

  const id = match[1];
  const slug = match[2];

  // Parse title and price
  const title = lines[0];
  const price = lines[1];

  // Parse bullet points
  const bullets = lines.slice(2).map(line => {
    // Check if line has "Label: Value" format
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0 && colonIndex < line.length - 1) {
      const label = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      return { label, value, formatted: `<strong>${label}</strong>: ${value}` };
    }
    return { label: null, value: line, formatted: line };
  });

  // Find associated photos
  const photos = findSaddlePhotos(slug);

  return {
    id,
    slug,
    filename,
    title,
    price,
    bullets,
    photos,
    url: `/saddles/info/${slug}.html`
  };
}

/**
 * Find all photos associated with a saddle
 */
function findSaddlePhotos(slug) {
  const photos = {
    main: null,
    thumbs: []
  };

  if (!fs.existsSync(SADDLES_PHOTOS_DIR)) {
    return photos;
  }

  const files = fs.readdirSync(SADDLES_PHOTOS_DIR);
  const saddleFiles = files.filter(file => file.includes(slug));

  saddleFiles.forEach(file => {
    // Main photo has no number before extension (e.g., "RussMaverick.jpg")
    // Numbered photos are additional views (e.g., "RussMaverick1.jpg")
    const hasNumber = /\d+\.jpg$/i.test(file);

    if (!hasNumber) {
      photos.main = {
        filename: file,
        path: `/saddles/info/photos/${file}`,
        thumbPath: `/saddles/info/photos/_thumbs/${file}`
      };
    } else {
      photos.thumbs.push({
        filename: file,
        path: `/saddles/info/photos/${file}`,
        thumbPath: `/saddles/info/photos/_thumbs/${file}`
      });
    }
  });

  // Sort thumbnail photos by number
  photos.thumbs.sort((a, b) => {
    const aNum = parseInt(a.filename.match(/(\d+)\.jpg$/)?.[1] || '0');
    const bNum = parseInt(b.filename.match(/(\d+)\.jpg$/)?.[1] || '0');
    return aNum - bNum;
  });

  return photos;
}

/**
 * Parse all saddle text files and return sorted array
 */
function parseSaddleFiles() {
  if (!fs.existsSync(SADDLES_TEXT_DIR)) {
    throw new Error(`Saddles text directory not found: ${SADDLES_TEXT_DIR}`);
  }

  const files = fs.readdirSync(SADDLES_TEXT_DIR)
    .filter(file => file.endsWith('.txt') && !file.startsWith('_'));

  const saddles = files.map(filename => {
    const filepath = path.join(SADDLES_TEXT_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    return parseSaddleFile(filename, content);
  });

  // Sort by ID (descending, so newest first)
  saddles.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // Add prev/next navigation links
  saddles.forEach((saddle, index) => {
    saddle.previous = index < saddles.length - 1 ? saddles[index + 1] : saddles[0];
    saddle.next = index > 0 ? saddles[index - 1] : saddles[saddles.length - 1];
  });

  return saddles;
}

module.exports = {
  parseSaddleFiles,
  parseSaddleFile
};

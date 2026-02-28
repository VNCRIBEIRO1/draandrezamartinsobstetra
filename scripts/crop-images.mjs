/**
 * Script to auto-crop white/near-white borders from Instagram screenshots.
 * Uses Sharp's trim() which detects and removes uniform borders.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMG_DIR = path.resolve('public/images');

// Only crop the Instagram-sourced images (posts and extras)
const FILES_TO_CROP = [
  ...Array.from({ length: 5 }, (_, i) => `dra-andresa-post-${i + 1}.jpeg`),
  ...Array.from({ length: 8 }, (_, i) => `dra-andresa-extra-${i + 1}.jpeg`),
];

async function cropImage(filename) {
  const filePath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skip (not found): ${filename}`);
    return;
  }

  const originalMeta = await sharp(filePath).metadata();
  const originalW = originalMeta.width || 0;
  const originalH = originalMeta.height || 0;

  try {
    // trim() removes uniform borders automatically
    // threshold controls sensitivity (higher = more aggressive)
    const trimmed = await sharp(filePath)
      .trim({ threshold: 30 })
      .toBuffer();

    const trimmedMeta = await sharp(trimmed).metadata();
    const newW = trimmedMeta.width || 0;
    const newH = trimmedMeta.height || 0;

    // Only write if we actually cropped something (at least 4px difference)
    if (originalW - newW > 4 || originalH - newH > 4) {
      await sharp(trimmed)
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(filePath + '.tmp');

      fs.renameSync(filePath + '.tmp', filePath);
      console.log(`✅ Cropped: ${filename} (${originalW}x${originalH} → ${newW}x${newH})`);
    } else {
      console.log(`⏭️  No borders: ${filename} (${originalW}x${originalH})`);
    }
  } catch (err) {
    console.log(`❌ Error on ${filename}: ${err.message}`);
  }
}

console.log('🖼️  Cropping Instagram borders...\n');
for (const file of FILES_TO_CROP) {
  await cropImage(file);
}
console.log('\n✨ Done!');

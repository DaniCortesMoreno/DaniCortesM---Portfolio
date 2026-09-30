const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public', 'projects')
];

async function convertImages() {
  console.log('--- Starting WebP Optimization ---');
  let totalSavedBytes = 0;
  let originalBytesTotal = 0;
  let newBytesTotal = 0;

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (file.toLowerCase().endsWith('.png') && !file.includes('favicon')) {
        const fullPath = path.join(dir, file);
        const webpPath = fullPath.replace(/\.png$/i, '.webp');

        const originalStats = fs.statSync(fullPath);
        originalBytesTotal += originalStats.size;

        await sharp(fullPath)
          .webp({ quality: 82, effort: 6 })
          .toFile(webpPath);

        const newStats = fs.statSync(webpPath);
        newBytesTotal += newStats.size;
        const saved = originalStats.size - newStats.size;
        totalSavedBytes += saved;

        const percent = ((saved / originalStats.size) * 100).toFixed(1);
        console.log(`Converted: ${file} (${(originalStats.size / 1024).toFixed(0)} KB) -> ${(newStats.size / 1024).toFixed(0)} KB [Saved ${percent}%]`);
      }
    }
  }

  // Also optimize screen.png in root if it exists
  const rootScreen = path.join(__dirname, 'screen.png');
  if (fs.existsSync(rootScreen)) {
    const rootWebp = path.join(__dirname, 'public', 'screen.webp');
    await sharp(rootScreen).webp({ quality: 80 }).toFile(rootWebp);
    console.log('Converted root screen.png -> public/screen.webp');
  }

  console.log(`\n🎉 TOTAL SAVED: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB (${((totalSavedBytes / originalBytesTotal) * 100).toFixed(1)}% reduction!)`);
}

convertImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});

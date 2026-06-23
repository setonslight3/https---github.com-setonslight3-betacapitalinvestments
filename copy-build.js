const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'artifacts/bettercapitalinvestment/dist/public');
const targetDir = path.join(__dirname, 'public');

function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying build files from', sourceDir, 'to', targetDir);
copyDir(sourceDir, targetDir);
console.log('✓ Build files copied successfully');

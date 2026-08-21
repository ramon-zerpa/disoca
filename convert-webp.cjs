const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = ['public/images/stock', 'public/images'];
const quality = 80;

async function convert() {
  let totalBefore = 0, totalAfter = 0, count = 0;
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') && !f.startsWith('.'));
    for (const file of files) {
      const src = path.join(dir, file);
      const dst = src.replace('.jpg', '.webp');
      if (fs.existsSync(dst)) continue; // skip already converted
      
      const before = fs.statSync(src).size;
      try {
        await sharp(src).webp({ quality }).toFile(dst);
        const after = fs.statSync(fs.existsSync(dst) ? dst : src).size;
        totalBefore += before;
        totalAfter += after;
        count++;
        const saving = Math.round((1 - after/before) * 100);
        console.log(`${file}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${saving}%)`);
      } catch (e) {
        console.error(`ERROR ${file}: ${e.message}`);
      }
    }
  }
  
  console.log(`\n--- TOTAL: ${count} images ---`);
  console.log(`Before: ${Math.round(totalBefore/1024)}KB`);
  console.log(`After: ${Math.round(totalAfter/1024)}KB`);
  console.log(`Saved: ${Math.round((totalBefore-totalAfter)/1024)}KB (${Math.round((1-totalAfter/totalBefore)*100)}%)`);
}

convert().catch(console.error);

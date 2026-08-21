const https = require('https');
const fs = require('fs');
const path = require('path');

const fontsDir = 'public/fonts';
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const fonts = [
  { name: 'Anton', weights: [400] },
  { name: 'IBM Plex Mono', weights: [400, 500, 600] },
  { name: 'IBM Plex Sans', weights: [400, 500, 600, 700] }
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function getFontUrls(family, weight) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&display=swap`;
  const css = (await download(url)).toString();
  const urls = {};
  // Match woff2 first, then woff, then ttf
  const woff2Match = css.match(/url\((https:\/\/[^)]+\.woff2)\)/);
  const woffMatch = css.match(/url\((https:\/\/[^)]+\.woff)\)/);
  if (woff2Match) urls.woff2 = woff2Match[1];
  if (woffMatch) urls.woff = woffMatch[1];
  return urls;
}

async function convert() {
  let totalBytes = 0;
  
  for (const font of fonts) {
    for (const weight of font.weights) {
      try {
        const urls = await getFontUrls(font.name, weight);
        if (!urls.woff2) { console.log(`SKIP ${font.name} ${weight} (no woff2)`); continue; }
        
        const woff2 = await download(urls.woff2);
        const fileName = `${font.name.replace(/ /g, '-').toLowerCase()}-${weight}.woff2`;
        const filePath = path.join(fontsDir, fileName);
        fs.writeFileSync(filePath, woff2);
        const kb = Math.round(woff2.length / 1024);
        console.log(`${fileName}: ${kb}KB`);
        totalBytes += woff2.length;
      } catch (e) {
        console.error(`ERROR ${font.name} ${weight}: ${e.message}`);
      }
    }
  }
  
  console.log(`\nTotal: ${Math.round(totalBytes/1024)}KB in ${fontsDir}`);
}

convert().catch(console.error);

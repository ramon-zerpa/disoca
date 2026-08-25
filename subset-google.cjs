const fs = require('fs');

const chars = ' IngeiríayCostucód192|DSOA.&mp;0N3v4Pfl5Mú+VE·RT=B(`-b),!>{Lhxw?:}kqUzáF6ñéGj78/*%$JH@"_[^\'#]';
const encoded = encodeURIComponent(chars);

async function downloadSubset(weight) {
  const url = `https://fonts.googleapis.com/css2?family=Roboto:wght@${weight}&text=${encoded}&display=swap`;
  const res = await fetch(url);
  const css = await res.text();
  const match = css.match(/url\(([^)]+)\)/);
  if (match) {
    const fontRes = await fetch(match[1]);
    const buf = await fontRes.arrayBuffer();
    const filename = `public/fonts/roboto-${weight}.woff2`;
    const before = fs.statSync(filename).size;
    fs.writeFileSync(filename, Buffer.from(buf));
    const after = buf.byteLength;
    console.log(`roboto-${weight}: ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB (-${Math.round((1-after/before)*100)}%)`);
  }
}

(async () => {
  for (const w of [400, 500, 600, 700]) {
    await downloadSubset(w);
  }
})();

const fs = require('fs');
const Font = require('fonteditor-core').Font;

const chars = ' IngeiríayCostucód192|DSOA.&mp;0N3v4Pfl5Mú+VE·RT=B(`-b),!>{Lhxw?:}kqUzáF6ñéGj78/*%$JH@"_[^\'#]';
const charCodes = [...new Set(chars)].map(c => c.charCodeAt(0));

const weights = [400, 500, 600, 700];

for (const w of weights) {
  const input = 'public/fonts/roboto-' + w + '.woff2';
  const before = fs.statSync(input).size;

  const font = Font.create(input, { type: 'woff2' });
  font.set({ glyphs: font.get().glyphs.filter(g => charCodes.includes(g.unicode)) });

  const buf = font.write({ type: 'woff2' });
  fs.writeFileSync(input, buf);
  const after = buf.length;
  console.log('roboto-' + w + ': ' + Math.round(before/1024) + 'KB -> ' + Math.round(after/1024) + 'KB (-' + Math.round((1-after/before)*100) + '%)');
}

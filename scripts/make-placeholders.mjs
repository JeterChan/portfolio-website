// Generates placeholder images for the sample projects.
// Run: node scripts/make-placeholders.mjs
// Delete the sample project folders once real content is in place.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('content/projects');

/** Soft "model photo": stacked volumes lit from one side. */
function modelPhoto(w, h, hue, seed) {
  const rand = mulberry32(seed);
  const volumes = Array.from({ length: 5 }, (_, i) => {
    const vw = w * (0.12 + rand() * 0.22);
    const vh = h * (0.18 + rand() * 0.4);
    const x = w * 0.08 + rand() * (w * 0.84 - vw);
    const y = h * 0.78 - vh;
    const light = 70 + i * 4;
    return `
      <rect x="${x}" y="${y}" width="${vw}" height="${vh}" fill="hsl(${hue} 8% ${light}%)"/>
      <rect x="${x + vw}" y="${y + vh * 0.04}" width="${vw * 0.28}" height="${vh * 0.96}" fill="hsl(${hue} 10% ${light - 22}%)"/>
      <rect x="${x}" y="${y + vh}" width="${vw * 1.6}" height="${h * 0.03}" fill="hsl(${hue} 10% 40%)" opacity="0.25"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 10% 86%)"/><stop offset="1" stop-color="hsl(${hue} 8% 70%)"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect y="${h * 0.78}" width="100%" height="${h * 0.22}" fill="hsl(${hue} 6% 62%)"/>
    ${volumes}
  </svg>`;
}

/** Line drawing: structural grid, walls, openings, hatch, labels. */
function drawing(w, h, seed, label) {
  const rand = mulberry32(seed);
  const cols = 8, rows = 5;
  const mx = w * 0.08, my = h * 0.12;
  const gw = (w - mx * 2) / cols, gh = (h - my * 2) / rows;
  let s = '';
  for (let c = 0; c <= cols; c++) {
    const x = mx + c * gw;
    s += `<line x1="${x}" y1="${my * 0.5}" x2="${x}" y2="${h - my * 0.5}" stroke="#999" stroke-width="1.5" stroke-dasharray="24 8 4 8"/>`;
    s += `<circle cx="${x}" cy="${my * 0.4}" r="22" fill="none" stroke="#000" stroke-width="2"/><text x="${x}" y="${my * 0.4 + 9}" font-size="26" text-anchor="middle" font-family="Helvetica">${c + 1}</text>`;
  }
  for (let r = 0; r <= rows; r++) {
    const y = my + r * gh;
    s += `<line x1="${mx * 0.5}" y1="${y}" x2="${w - mx * 0.5}" y2="${y}" stroke="#999" stroke-width="1.5" stroke-dasharray="24 8 4 8"/>`;
  }
  s += `<rect x="${mx}" y="${my}" width="${w - mx * 2}" height="${h - my * 2}" fill="none" stroke="#000" stroke-width="14"/>`;
  for (let i = 0; i < 9; i++) {
    const vertical = rand() > 0.5;
    const x = mx + Math.floor(rand() * cols) * gw;
    const y = my + Math.floor(rand() * rows) * gh;
    s += vertical
      ? `<line x1="${x}" y1="${y}" x2="${x}" y2="${Math.min(y + gh * (1 + Math.floor(rand() * 2)), h - my)}" stroke="#000" stroke-width="8"/>`
      : `<line x1="${x}" y1="${y}" x2="${Math.min(x + gw * (1 + Math.floor(rand() * 3)), w - mx)}" y2="${y}" stroke="#000" stroke-width="8"/>`;
  }
  for (let c = 0; c <= cols; c++) for (let r = 0; r <= rows; r++) {
    s += `<rect x="${mx + c * gw - 14}" y="${my + r * gh - 14}" width="28" height="28" fill="#000"/>`;
  }
  const hx = mx + gw * 2, hy = my + gh * 1;
  s += `<clipPath id="c"><rect x="${hx}" y="${hy}" width="${gw * 2}" height="${gh * 2}"/></clipPath><g clip-path="url(#c)">`;
  for (let d = -gh * 2; d < gw * 2; d += 22) s += `<line x1="${hx + d}" y1="${hy + gh * 2}" x2="${hx + d + gh * 2}" y2="${hy}" stroke="#000" stroke-width="1.2"/>`;
  s += `</g>`;
  for (let i = 0; i < 6; i++) {
    const x = mx + (i + 0.5) * gw * 1.3, y = my + gh * (0.5 + (i % rows));
    s += `<text x="${x}" y="${y}" font-size="30" font-family="Helvetica" fill="#333">${['Gallery', 'Foyer', 'Store', 'Workshop', 'Café', 'Archive'][i]}</text>`;
  }
  s += `<text x="${mx}" y="${h - my * 0.25}" font-size="40" font-family="Helvetica" font-weight="bold">${label}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#fff"/>${s}</svg>`;
}

function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const projects = {
  '01-riverside-museum': { hue: 200, files: {
    'cover.jpg': [2400, 1600], '01-aerial.jpg': [2400, 1350], '02-model.jpg': [1600, 2000],
    '03-plan.png': ['drawing', 4000, 2800, 'GROUND FLOOR PLAN 1:200'],
    '04-detail.jpg': [1600, 1600], '05-detail.jpg': [1600, 1600], '06-detail.jpg': [1600, 1600],
  } },
  '02-courtyard-housing': { hue: 30, files: {
    'cover.jpg': [1600, 2000], '01-street.jpg': [2400, 1600],
    '02-section.png': ['drawing', 4800, 2000, 'SECTION A-A 1:100'],
    '03-courtyard.jpg': [1600, 2000], '04-model.jpg': [2400, 1600], '05-model.jpg': [2400, 1600],
  } },
  '03-timber-pavilion': { hue: 90, files: {
    'cover.jpg': [2560, 1600], '01-joint.jpg': [2000, 1500],
    '02-axon.png': ['drawing', 3600, 3000, 'EXPLODED AXONOMETRIC'],
    '03-build.jpg': [2400, 1600], '04-night.jpg': [2400, 1600],
  } },
};

let seed = 1;
for (const [folder, { hue, files }] of Object.entries(projects)) {
  const dir = path.join(root, folder);
  fs.mkdirSync(dir, { recursive: true });
  for (const [file, spec] of Object.entries(files)) {
    const out = path.join(dir, file);
    const svg = spec[0] === 'drawing'
      ? drawing(spec[1], spec[2], seed++, spec[3])
      : modelPhoto(spec[0], spec[1], hue, seed++);
    const img = sharp(Buffer.from(svg));
    await (file.endsWith('.png') ? img.png({ compressionLevel: 9, palette: true }) : img.jpeg({ quality: 82 })).toFile(out);
    console.log('wrote', path.relative(process.cwd(), out));
  }
}

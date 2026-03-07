/**
 * Regenera imagem corrompida e verifica todas as outras
 */
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'images', 'generated');
const W = 1024, H = 1024;

function createSvg(c1, c2, c3, c4, iconSvg = '') {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="50%" style="stop-color:${c2}"/>
      <stop offset="100%" style="stop-color:${c3}"/>
    </linearGradient>
    <radialGradient id="g1" cx="30%" cy="40%" r="50%">
      <stop offset="0%" style="stop-color:${c4};stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:${c4};stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="g2" cx="70%" cy="60%" r="40%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
    </radialGradient>
    <filter id="b1"><feGaussianBlur stdDeviation="40"/></filter>
    <filter id="b2"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <circle cx="200" cy="300" r="180" fill="${c4}" opacity="0.15" filter="url(#b1)"/>
  <circle cx="750" cy="250" r="120" fill="white" opacity="0.1" filter="url(#b1)"/>
  <circle cx="500" cy="700" r="200" fill="${c1}" opacity="0.12" filter="url(#b1)"/>
  <circle cx="850" cy="650" r="150" fill="${c3}" opacity="0.1" filter="url(#b1)"/>
  <circle cx="300" cy="400" r="100" fill="none" stroke="white" stroke-width="1.5" opacity="0.15"/>
  <circle cx="300" cy="400" r="140" fill="none" stroke="white" stroke-width="0.8" opacity="0.1"/>
  <circle cx="700" cy="350" r="80" fill="none" stroke="white" stroke-width="1.2" opacity="0.12"/>
  <circle cx="150" cy="200" r="4" fill="white" opacity="0.25"/>
  <circle cx="400" cy="150" r="3" fill="white" opacity="0.2"/>
  <circle cx="650" cy="180" r="5" fill="white" opacity="0.15"/>
  <circle cx="850" cy="300" r="3" fill="white" opacity="0.2"/>
  <circle cx="200" cy="600" r="4" fill="white" opacity="0.18"/>
  <circle cx="500" cy="500" r="6" fill="white" opacity="0.12"/>
  <circle cx="750" cy="550" r="3" fill="white" opacity="0.22"/>
  <circle cx="350" cy="800" r="5" fill="white" opacity="0.15"/>
  <circle cx="600" cy="850" r="4" fill="white" opacity="0.2"/>
  <circle cx="900" cy="750" r="3" fill="white" opacity="0.18"/>
  <line x1="100" y1="500" x2="400" y2="350" stroke="white" stroke-width="0.5" opacity="0.08"/>
  <line x1="600" y1="200" x2="900" y2="450" stroke="white" stroke-width="0.5" opacity="0.08"/>
  ${iconSvg}
</svg>`;
}

async function main() {
  // Regenerate importancia-pre-natal (corrupted)
  const prenatalSvg = createSvg('#FFB5C2', '#FFDDE4', '#FFF0F3', '#E8A0BF', `
    <g transform="translate(512,400)" opacity="0.18">
      <path d="M0-60 C-20-80-50-70-50-40 C-50-10-25 10 0 30 C25 10 50-10 50-40 C50-70 20-80 0-60Z" fill="white"/>
      <circle cx="0" cy="-15" r="18" fill="white" opacity="0.5"/>
      <ellipse cx="0" cy="25" rx="30" ry="40" fill="white" opacity="0.3"/>
    </g>
    <g opacity="0.1">
      <circle cx="440" cy="320" r="8" fill="white"/>
      <circle cx="580" cy="310" r="6" fill="white"/>
      <circle cx="510" cy="280" r="5" fill="white"/>
    </g>
  `);
  
  await sharp(Buffer.from(prenatalSvg))
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(dir, 'importancia-pre-natal.jpg'));
  console.log('✅ importancia-pre-natal.jpg regenerated');

  // Verify all images are valid JPEG
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  for (const f of files) {
    try {
      const meta = await sharp(path.join(dir, f)).metadata();
      const status = meta.format === 'jpeg' ? '✅' : '⚠️ ' + meta.format;
      console.log(`${status} ${f} (${meta.width}x${meta.height})`);
    } catch(e) {
      console.log(`❌ ${f}: ${e.message}`);
    }
  }
}

main().catch(console.error);

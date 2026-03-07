/**
 * Gera imagens abstratas para os 3 novos artigos (público jovem 18-25)
 * Usa sharp para criar gradientes temáticos sofisticados
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images', 'generated');

const W = 1024, H = 1024;

function createGradientSVG(colors, title, iconPath = '') {
  const [c1, c2, c3, c4] = colors;
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="50%" style="stop-color:${c2}"/>
      <stop offset="100%" style="stop-color:${c3}"/>
    </linearGradient>
    <radialGradient id="glow1" cx="30%" cy="40%" r="50%">
      <stop offset="0%" style="stop-color:${c4};stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:${c4};stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="70%" cy="60%" r="40%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
    </radialGradient>
    <filter id="blur1"><feGaussianBlur stdDeviation="40"/></filter>
    <filter id="blur2"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  
  <!-- Background gradient -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  
  <!-- Soft glows -->
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  
  <!-- Abstract circles -->
  <circle cx="200" cy="300" r="180" fill="${c4}" opacity="0.15" filter="url(#blur1)"/>
  <circle cx="750" cy="250" r="120" fill="white" opacity="0.1" filter="url(#blur1)"/>
  <circle cx="500" cy="700" r="200" fill="${c1}" opacity="0.12" filter="url(#blur1)"/>
  <circle cx="850" cy="650" r="150" fill="${c3}" opacity="0.1" filter="url(#blur1)"/>
  
  <!-- Decorative rings -->
  <circle cx="300" cy="400" r="100" fill="none" stroke="white" stroke-width="1.5" opacity="0.15"/>
  <circle cx="300" cy="400" r="140" fill="none" stroke="white" stroke-width="0.8" opacity="0.1"/>
  <circle cx="700" cy="350" r="80" fill="none" stroke="white" stroke-width="1.2" opacity="0.12"/>
  
  <!-- Floating dots pattern -->
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
  
  <!-- Subtle geometric lines -->
  <line x1="100" y1="500" x2="400" y2="350" stroke="white" stroke-width="0.5" opacity="0.08"/>
  <line x1="600" y1="200" x2="900" y2="450" stroke="white" stroke-width="0.5" opacity="0.08"/>
  <line x1="300" y1="700" x2="700" y2="600" stroke="white" stroke-width="0.5" opacity="0.06"/>
  
  <!-- Soft bottom overlay for text contrast if needed -->
  <rect y="${H*0.7}" width="${W}" height="${H*0.3}" fill="url(#bg)" opacity="0.3"/>
  
  ${iconPath}
</svg>`;
}

const images = [
  {
    name: 'anticoncepcional-guia-jovem',
    colors: ['#E8A0BF', '#F5C6D0', '#FCE4EC', '#D4A0C8'],
    icon: `
      <!-- Pill-like shapes -->
      <g transform="translate(450, 420)" opacity="0.2">
        <rect x="0" y="0" width="60" height="100" rx="30" fill="white" transform="rotate(-15)"/>
        <rect x="80" y="-20" width="60" height="100" rx="30" fill="white" transform="rotate(10)"/>
        <rect x="-60" y="30" width="60" height="100" rx="30" fill="white" transform="rotate(-30)"/>
      </g>
      <!-- Heart symbol -->
      <g transform="translate(512, 380) scale(0.8)" opacity="0.12">
        <path d="M0-40 C-30-70-80-40-80-10 C-80 30-40 50 0 80 C40 50 80 30 80-10 C80-40 30-70 0-40Z" fill="white"/>
      </g>
    `,
  },
  {
    name: 'diu-tudo-sobre',
    colors: ['#90CAF9', '#A5D6F7', '#E3F2FD', '#7CB9E8'],
    icon: `
      <!-- Shield/protection symbol -->
      <g transform="translate(512, 420)" opacity="0.15">
        <path d="M0-80 L60-50 L60 20 C60 60 30 90 0 100 C-30 90-60 60-60 20 L-60-50Z" fill="none" stroke="white" stroke-width="3"/>
        <circle cx="0" cy="0" r="20" fill="white" opacity="0.5"/>
      </g>
      <!-- T-shape hint -->
      <g transform="translate(512, 420)" opacity="0.1">
        <rect x="-25" y="-40" width="50" height="8" rx="4" fill="white"/>
        <rect x="-4" y="-40" width="8" height="70" rx="4" fill="white"/>
      </g>
    `,
  },
  {
    name: 'implanon-implante-guia',
    colors: ['#CE93D8', '#DDA0DD', '#F3E5F5', '#BA68C8'],
    icon: `
      <!-- Capsule/implant shape -->
      <g transform="translate(512, 420) rotate(-20)" opacity="0.15">
        <rect x="-60" y="-8" width="120" height="16" rx="8" fill="white"/>
      </g>
      <!-- Freedom/butterfly hint -->
      <g transform="translate(512, 380)" opacity="0.1">
        <path d="M0 0 C-20-30-50-30-40-5 C-35 10-15 15 0 5 C15 15 35 10 40-5 C50-30 20-30 0 0Z" fill="white" transform="scale(1.5)"/>
      </g>
      <!-- Stars suggesting freedom -->
      <g opacity="0.15">
        <polygon points="400,300 403,310 413,310 405,316 408,326 400,320 392,326 395,316 387,310 397,310" fill="white"/>
        <polygon points="620,280 622,287 629,287 623,291 625,298 620,294 615,298 617,291 611,287 618,287" fill="white"/>
        <polygon points="550,350 552,355 558,355 553,358 555,363 550,360 545,363 547,358 542,355 548,355" fill="white"/>
      </g>
    `,
  },
];

async function generate() {
  for (const img of images) {
    const svg = createGradientSVG(img.colors, img.name, img.icon);
    const outPath = path.join(OUT, `${img.name}.jpg`);
    
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outPath);
    
    const stats = await sharp(outPath).metadata();
    console.log(`✅ ${img.name}.jpg (${stats.width}x${stats.height})`);
  }
  console.log('\n✅ All 3 article images generated!');
}

generate().catch(console.error);

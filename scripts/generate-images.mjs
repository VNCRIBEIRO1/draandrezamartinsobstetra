import sharp from 'sharp';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';

// Paleta de cores do site
const COLORS = {
  sage: { r: 164, g: 173, b: 150 },      // #A4AD96
  sageDark: { r: 141, g: 152, b: 128 },   // #8D9880
  sageLight: { r: 210, g: 216, b: 202 },  // #D2D8CA
  estrada: { r: 173, g: 139, b: 108 },    // #AD8B6C
  estradaLight: { r: 220, g: 200, b: 180 }, // #DCC8B4
  gold: { r: 160, g: 125, b: 90 },        // #A07D5A
  cream: { r: 250, g: 247, b: 244 },      // #FAF7F4
  rose: { r: 230, g: 200, b: 200 },       // #E6C8C8
  roseLight: { r: 245, g: 230, b: 230 },  // #F5E6E6
  white: { r: 255, g: 255, b: 255 },
  baby: { r: 200, g: 220, b: 235 },       // #C8DCEB
};

const WIDTH = 1200;
const HEIGHT = 800;

function createSVG(shapes, bgColor1, bgColor2) {
  const gradientId = 'bg' + Math.random().toString(36).slice(2, 8);
  const defs = [];
  const elements = [];

  // Gradiente de fundo
  defs.push(`
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(${bgColor1.r},${bgColor1.g},${bgColor1.b});stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(${bgColor2.r},${bgColor2.g},${bgColor2.b});stop-opacity:1" />
    </linearGradient>
  `);

  elements.push(`<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${gradientId})" />`);

  // Adicionar formas
  shapes.forEach((shape, i) => {
    const id = 'g' + i + Math.random().toString(36).slice(2, 8);
    if (shape.type === 'circle') {
      defs.push(`
        <radialGradient id="${id}">
          <stop offset="0%" style="stop-color:rgb(${shape.color.r},${shape.color.g},${shape.color.b});stop-opacity:${shape.opacity || 0.3}" />
          <stop offset="100%" style="stop-color:rgb(${shape.color.r},${shape.color.g},${shape.color.b});stop-opacity:0" />
        </radialGradient>
      `);
      elements.push(`<circle cx="${shape.x}" cy="${shape.y}" r="${shape.r}" fill="url(#${id})" />`);
    } else if (shape.type === 'ellipse') {
      defs.push(`
        <radialGradient id="${id}">
          <stop offset="0%" style="stop-color:rgb(${shape.color.r},${shape.color.g},${shape.color.b});stop-opacity:${shape.opacity || 0.25}" />
          <stop offset="100%" style="stop-color:rgb(${shape.color.r},${shape.color.g},${shape.color.b});stop-opacity:0" />
        </radialGradient>
      `);
      elements.push(`<ellipse cx="${shape.x}" cy="${shape.y}" rx="${shape.rx}" ry="${shape.ry}" fill="url(#${id})" transform="rotate(${shape.rotate || 0} ${shape.x} ${shape.y})" />`);
    } else if (shape.type === 'blob') {
      const opacity = shape.opacity || 0.2;
      elements.push(`<path d="${shape.d}" fill="rgb(${shape.color.r},${shape.color.g},${shape.color.b})" opacity="${opacity}" />`);
    } else if (shape.type === 'wave') {
      elements.push(`<path d="${shape.d}" fill="rgb(${shape.color.r},${shape.color.g},${shape.color.b})" opacity="${shape.opacity || 0.15}" />`);
    } else if (shape.type === 'leaf') {
      const opacity = shape.opacity || 0.15;
      elements.push(`<path d="${shape.d}" fill="rgb(${shape.color.r},${shape.color.g},${shape.color.b})" opacity="${opacity}" transform="rotate(${shape.rotate || 0} ${shape.cx} ${shape.cy})" />`);
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>${defs.join('\n')}</defs>
    ${elements.join('\n')}
  </svg>`;
}

// Gerar formas orgânicas tipo blob
function blobPath(cx, cy, radius, points = 6, variance = 0.3) {
  const angleStep = (Math.PI * 2) / points;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = angleStep * i;
    const r = radius * (1 + (Math.random() - 0.5) * variance);
    pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }
  // Smooth curve through points
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const cpx = (curr.x + next.x) / 2;
    const cpy = (curr.y + next.y) / 2;
    d += ` Q ${curr.x} ${curr.y} ${cpx} ${cpy}`;
  }
  d += ' Z';
  return d;
}

function wavePath(y, amplitude, frequency) {
  let d = `M 0 ${y}`;
  for (let x = 0; x <= WIDTH; x += 10) {
    const yy = y + Math.sin(x * frequency * 0.01) * amplitude + Math.cos(x * frequency * 0.005) * amplitude * 0.5;
    d += ` L ${x} ${yy}`;
  }
  d += ` L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
  return d;
}

function leafPath(cx, cy, length, width) {
  return `M ${cx} ${cy - length / 2} Q ${cx + width} ${cy - length / 4} ${cx + width * 0.8} ${cy} Q ${cx + width} ${cy + length / 4} ${cx} ${cy + length / 2} Q ${cx - width} ${cy + length / 4} ${cx - width * 0.8} ${cy} Q ${cx - width} ${cy - length / 4} ${cx} ${cy - length / 2} Z`;
}

// Definir imagens para cada tópico
const imageConfigs = {
  // === ÁREAS ===
  'area-ginecologia': {
    bg1: COLORS.sageLight, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(300, 400, 250, 7, 0.4), color: COLORS.sage, opacity: 0.2 },
      { type: 'blob', d: blobPath(850, 300, 200, 6, 0.35), color: COLORS.rose, opacity: 0.15 },
      { type: 'ellipse', x: 600, y: 400, rx: 350, ry: 250, color: COLORS.estradaLight, opacity: 0.12 },
      { type: 'circle', x: 200, y: 200, r: 150, color: COLORS.sage, opacity: 0.2 },
      { type: 'circle', x: 1000, y: 600, r: 180, color: COLORS.roseLight, opacity: 0.2 },
      { type: 'wave', d: wavePath(600, 40, 3), color: COLORS.sage, opacity: 0.1 },
      { type: 'blob', d: blobPath(700, 600, 150, 5, 0.3), color: COLORS.gold, opacity: 0.1 },
    ],
  },
  'area-obstetricia': {
    bg1: COLORS.roseLight, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(400, 350, 280, 8, 0.35), color: COLORS.rose, opacity: 0.2 },
      { type: 'blob', d: blobPath(800, 450, 220, 6, 0.4), color: COLORS.estradaLight, opacity: 0.18 },
      { type: 'circle', x: 200, y: 600, r: 200, color: COLORS.sage, opacity: 0.12 },
      { type: 'ellipse', x: 600, y: 200, rx: 300, ry: 150, color: COLORS.baby, opacity: 0.15 },
      { type: 'wave', d: wavePath(500, 50, 2), color: COLORS.rose, opacity: 0.12 },
      { type: 'blob', d: blobPath(1000, 200, 130, 5, 0.3), color: COLORS.gold, opacity: 0.1 },
    ],
  },
  'area-prenatal': {
    bg1: COLORS.baby, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(350, 400, 260, 7, 0.35), color: COLORS.baby, opacity: 0.25 },
      { type: 'blob', d: blobPath(800, 350, 230, 6, 0.3), color: COLORS.roseLight, opacity: 0.2 },
      { type: 'circle', x: 150, y: 200, r: 170, color: COLORS.sage, opacity: 0.15 },
      { type: 'ellipse', x: 600, y: 600, rx: 280, ry: 180, color: COLORS.estradaLight, opacity: 0.12 },
      { type: 'wave', d: wavePath(550, 45, 2.5), color: COLORS.sage, opacity: 0.1 },
      { type: 'circle', x: 1050, y: 150, r: 120, color: COLORS.rose, opacity: 0.15 },
    ],
  },
  'area-menopausa': {
    bg1: COLORS.cream, bg2: { r: 240, g: 232, b: 225 },
    shapes: [
      { type: 'blob', d: blobPath(300, 350, 280, 8, 0.4), color: COLORS.estrada, opacity: 0.15 },
      { type: 'blob', d: blobPath(850, 400, 250, 7, 0.35), color: COLORS.gold, opacity: 0.12 },
      { type: 'ellipse', x: 600, y: 300, rx: 350, ry: 200, color: COLORS.sage, opacity: 0.1 },
      { type: 'circle', x: 200, y: 600, r: 160, color: COLORS.rose, opacity: 0.15 },
      { type: 'wave', d: wavePath(500, 35, 3.5), color: COLORS.estradaLight, opacity: 0.12 },
      { type: 'blob', d: blobPath(1000, 650, 130, 5, 0.3), color: COLORS.sage, opacity: 0.12 },
    ],
  },
  'area-microscopia': {
    bg1: COLORS.sageLight, bg2: { r: 235, g: 240, b: 230 },
    shapes: [
      { type: 'circle', x: 600, y: 400, r: 220, color: COLORS.sage, opacity: 0.2 },
      { type: 'circle', x: 600, y: 400, r: 150, color: COLORS.white, opacity: 0.15 },
      { type: 'circle', x: 600, y: 400, r: 80, color: COLORS.sage, opacity: 0.25 },
      { type: 'blob', d: blobPath(250, 300, 180, 6, 0.3), color: COLORS.estradaLight, opacity: 0.15 },
      { type: 'blob', d: blobPath(950, 500, 200, 7, 0.35), color: COLORS.gold, opacity: 0.1 },
      { type: 'ellipse', x: 400, y: 650, rx: 200, ry: 100, color: COLORS.sage, opacity: 0.1 },
    ],
  },
  'area-anticoncepcional': {
    bg1: COLORS.roseLight, bg2: { r: 245, g: 238, b: 235 },
    shapes: [
      { type: 'blob', d: blobPath(400, 400, 250, 8, 0.35), color: COLORS.rose, opacity: 0.2 },
      { type: 'blob', d: blobPath(800, 300, 200, 6, 0.3), color: COLORS.sage, opacity: 0.15 },
      { type: 'circle', x: 200, y: 250, r: 140, color: COLORS.estradaLight, opacity: 0.18 },
      { type: 'ellipse', x: 700, y: 600, rx: 250, ry: 150, color: COLORS.baby, opacity: 0.12 },
      { type: 'wave', d: wavePath(580, 30, 4), color: COLORS.rose, opacity: 0.1 },
      { type: 'blob', d: blobPath(1050, 550, 120, 5, 0.3), color: COLORS.gold, opacity: 0.1 },
    ],
  },
  'area-diu': {
    bg1: { r: 230, g: 240, b: 245 }, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(500, 400, 260, 7, 0.35), color: COLORS.baby, opacity: 0.22 },
      { type: 'blob', d: blobPath(250, 300, 190, 6, 0.3), color: COLORS.sage, opacity: 0.15 },
      { type: 'circle', x: 900, y: 350, r: 180, color: COLORS.roseLight, opacity: 0.15 },
      { type: 'ellipse', x: 400, y: 650, rx: 220, ry: 120, color: COLORS.estradaLight, opacity: 0.12 },
      { type: 'wave', d: wavePath(550, 40, 3), color: COLORS.sage, opacity: 0.08 },
      { type: 'blob', d: blobPath(1050, 200, 140, 5, 0.3), color: COLORS.gold, opacity: 0.1 },
    ],
  },
  'area-implanon': {
    bg1: { r: 225, g: 238, b: 235 }, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(350, 350, 240, 7, 0.4), color: COLORS.sage, opacity: 0.2 },
      { type: 'blob', d: blobPath(850, 450, 220, 6, 0.35), color: COLORS.estradaLight, opacity: 0.18 },
      { type: 'circle', x: 150, y: 600, r: 160, color: COLORS.rose, opacity: 0.12 },
      { type: 'ellipse', x: 650, y: 200, rx: 280, ry: 140, color: COLORS.baby, opacity: 0.1 },
      { type: 'wave', d: wavePath(580, 35, 2.5), color: COLORS.sage, opacity: 0.1 },
      { type: 'blob', d: blobPath(1000, 650, 130, 5, 0.3), color: COLORS.gold, opacity: 0.1 },
    ],
  },

  // === ARTIGOS DO BLOG ===
  'importancia-pre-natal': {
    bg1: COLORS.baby, bg2: COLORS.roseLight,
    shapes: [
      { type: 'blob', d: blobPath(400, 400, 270, 8, 0.35), color: COLORS.baby, opacity: 0.25 },
      { type: 'blob', d: blobPath(800, 350, 220, 6, 0.3), color: COLORS.rose, opacity: 0.18 },
      { type: 'circle', x: 200, y: 200, r: 150, color: COLORS.sage, opacity: 0.15 },
      { type: 'leaf', d: leafPath(900, 600, 200, 80), cx: 900, cy: 600, color: COLORS.sage, opacity: 0.12, rotate: 30 },
      { type: 'wave', d: wavePath(600, 40, 2), color: COLORS.estradaLight, opacity: 0.1 },
    ],
  },
  'microscopia-vaginal-diagnostico': {
    bg1: { r: 235, g: 242, b: 235 }, bg2: COLORS.cream,
    shapes: [
      { type: 'circle', x: 600, y: 400, r: 250, color: COLORS.sage, opacity: 0.18 },
      { type: 'circle', x: 600, y: 400, r: 170, color: COLORS.white, opacity: 0.2 },
      { type: 'circle', x: 600, y: 400, r: 90, color: COLORS.sage, opacity: 0.22 },
      { type: 'blob', d: blobPath(200, 350, 160, 6, 0.3), color: COLORS.estradaLight, opacity: 0.15 },
      { type: 'blob', d: blobPath(1000, 500, 180, 7, 0.35), color: COLORS.gold, opacity: 0.12 },
    ],
  },
  'menopausa-qualidade-vida': {
    bg1: COLORS.estradaLight, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(350, 400, 280, 8, 0.4), color: COLORS.estrada, opacity: 0.15 },
      { type: 'blob', d: blobPath(850, 350, 240, 7, 0.35), color: COLORS.gold, opacity: 0.12 },
      { type: 'circle', x: 200, y: 200, r: 160, color: COLORS.sage, opacity: 0.15 },
      { type: 'ellipse', x: 700, y: 650, rx: 250, ry: 120, color: COLORS.roseLight, opacity: 0.12 },
      { type: 'wave', d: wavePath(500, 40, 3), color: COLORS.sage, opacity: 0.1 },
    ],
  },
  'exames-ginecologicos-rotina': {
    bg1: COLORS.sageLight, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(400, 350, 250, 7, 0.35), color: COLORS.sage, opacity: 0.2 },
      { type: 'blob', d: blobPath(800, 450, 200, 6, 0.3), color: COLORS.estradaLight, opacity: 0.18 },
      { type: 'circle', x: 1050, y: 200, r: 140, color: COLORS.rose, opacity: 0.12 },
      { type: 'ellipse', x: 300, y: 650, rx: 200, ry: 100, color: COLORS.baby, opacity: 0.1 },
      { type: 'wave', d: wavePath(560, 35, 3.5), color: COLORS.gold, opacity: 0.08 },
    ],
  },
  'cheiro-intimo-normal-anormal': {
    bg1: COLORS.roseLight, bg2: { r: 242, g: 240, b: 238 },
    shapes: [
      { type: 'blob', d: blobPath(350, 400, 260, 8, 0.35), color: COLORS.rose, opacity: 0.2 },
      { type: 'blob', d: blobPath(800, 350, 220, 6, 0.35), color: COLORS.sage, opacity: 0.15 },
      { type: 'circle', x: 150, y: 200, r: 130, color: COLORS.estradaLight, opacity: 0.18 },
      { type: 'leaf', d: leafPath(950, 550, 180, 70), cx: 950, cy: 550, color: COLORS.sage, opacity: 0.1, rotate: -20 },
      { type: 'wave', d: wavePath(580, 30, 4), color: COLORS.rose, opacity: 0.1 },
    ],
  },
  'pilula-do-dia-seguinte': {
    bg1: { r: 240, g: 235, b: 240 }, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(400, 400, 250, 7, 0.4), color: COLORS.rose, opacity: 0.18 },
      { type: 'blob', d: blobPath(800, 350, 210, 6, 0.3), color: COLORS.sage, opacity: 0.15 },
      { type: 'circle', x: 200, y: 250, r: 150, color: COLORS.estradaLight, opacity: 0.15 },
      { type: 'ellipse', x: 650, y: 600, rx: 250, ry: 130, color: COLORS.baby, opacity: 0.12 },
      { type: 'wave', d: wavePath(550, 35, 3), color: COLORS.gold, opacity: 0.08 },
    ],
  },
  'vsr-recem-nascido': {
    bg1: COLORS.baby, bg2: { r: 235, g: 240, b: 248 },
    shapes: [
      { type: 'blob', d: blobPath(400, 400, 270, 8, 0.35), color: COLORS.baby, opacity: 0.25 },
      { type: 'blob', d: blobPath(800, 300, 220, 6, 0.3), color: COLORS.roseLight, opacity: 0.2 },
      { type: 'circle', x: 200, y: 200, r: 140, color: COLORS.sage, opacity: 0.12 },
      { type: 'circle', x: 1000, y: 600, r: 170, color: COLORS.estradaLight, opacity: 0.1 },
      { type: 'wave', d: wavePath(580, 30, 2), color: COLORS.sage, opacity: 0.08 },
    ],
  },
  'cuidar-voce-amor-proprio': {
    bg1: COLORS.roseLight, bg2: COLORS.cream,
    shapes: [
      { type: 'blob', d: blobPath(350, 400, 280, 8, 0.4), color: COLORS.rose, opacity: 0.22 },
      { type: 'blob', d: blobPath(850, 350, 240, 7, 0.35), color: COLORS.sage, opacity: 0.15 },
      { type: 'ellipse', x: 600, y: 250, rx: 300, ry: 150, color: COLORS.estradaLight, opacity: 0.12 },
      { type: 'circle', x: 150, y: 600, r: 160, color: COLORS.baby, opacity: 0.12 },
      { type: 'leaf', d: leafPath(1000, 200, 160, 60), cx: 1000, cy: 200, color: COLORS.sage, opacity: 0.1, rotate: 45 },
    ],
  },
  'nao-faria-sendo-ginecologista': {
    bg1: COLORS.sageLight, bg2: COLORS.estradaLight,
    shapes: [
      { type: 'blob', d: blobPath(400, 400, 260, 7, 0.35), color: COLORS.sage, opacity: 0.2 },
      { type: 'blob', d: blobPath(800, 350, 230, 6, 0.3), color: COLORS.estrada, opacity: 0.15 },
      { type: 'circle', x: 200, y: 200, r: 150, color: COLORS.gold, opacity: 0.12 },
      { type: 'ellipse', x: 700, y: 650, rx: 280, ry: 130, color: COLORS.roseLight, opacity: 0.12 },
      { type: 'wave', d: wavePath(520, 40, 2.5), color: COLORS.sage, opacity: 0.1 },
    ],
  },
};

const OUTPUT_DIR = join(process.cwd(), 'public', 'images', 'generated');

async function generateImage(name, config) {
  const svg = createSVG(config.shapes, config.bg1, config.bg2);
  const outputPath = join(OUTPUT_DIR, `${name}.jpg`);

  await sharp(Buffer.from(svg))
    .resize(WIDTH, HEIGHT)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);

  console.log(`✅ ${name}.jpg gerada`);
  return outputPath;
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🎨 Gerando imagens abstratas com paleta do site...\n');

  const entries = Object.entries(imageConfigs);
  for (const [name, config] of entries) {
    try {
      await generateImage(name, config);
    } catch (err) {
      console.error(`❌ Erro gerando ${name}: ${err.message}`);
    }
  }

  console.log(`\n✨ ${entries.length} imagens geradas em ${OUTPUT_DIR}`);
}

main().catch(console.error);

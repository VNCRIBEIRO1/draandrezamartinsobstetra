import https from 'https';
import fs from 'fs';
import path from 'path';

const API_KEY = 'sk-pYwbE6BjbZcKkbRB1tXa1876RAM0w';
const OUTPUT_DIR = 'public/images/generated';

const images = [
  {
    filename: 'importancia-pre-natal.jpg',
    prompt: 'Professional warm-toned medical photography. A pregnant woman in soft pastel clothing gently cradling her belly during a prenatal appointment, sitting in a modern bright medical office. Doctor hands with stethoscope nearby. Soft natural sunlight, pink and cream color palette, peaceful maternal healthcare atmosphere. Clean composition, warm lighting, high quality medical promotional image, no text.'
  },
  {
    filename: 'anticoncepcional-guia-jovem.jpg',
    prompt: 'Clean modern healthcare lifestyle photograph. A confident young woman in her early 20s smiling in a gynecologist consultation room, with soft pastel pink and lavender tones. Blister pack of birth control pills on the desk, feminine and empowering atmosphere. Professional medical office with modern decor and plants. Warm soft lighting, approachable and educational healthcare aesthetic, no text, high quality.'
  },
  {
    filename: 'diu-tudo-sobre.jpg',
    prompt: 'Professional medical educational photograph. Close-up of a doctors hands in gloves holding a small copper IUD device (T-shaped intrauterine device), with a soft blurred background of a modern gynecology clinic in pastel pink and white tones. Clean medical aesthetic, warm professional lighting, educational healthcare image, reassuring and modern atmosphere, no text, high quality.'
  },
  {
    filename: 'implanon-implante-guia.jpg',
    prompt: 'Professional medical photography. A young woman showing her inner upper arm where a small contraceptive implant (Implanon) is inserted, in a modern clean gynecology office. Doctor in white coat nearby. Soft pastel pink and cream color palette, warm professional lighting, empowering healthcare atmosphere, modern feminine clinical setting with plants, no text, high quality medical promotional image.'
  }
];

function generateImage(imgConfig) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'openai/gpt-image-1.5',
      prompt: imgConfig.prompt,
      size: '1024x1024',
      n: 1
    });

    const opts = {
      hostname: 'api.apifree.ai',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    };

    console.log(`⏳ Gerando: ${imgConfig.filename}...`);

    const req = https.request(opts, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.data && json.data[0] && json.data[0].b64_json) {
            const b64 = json.data[0].b64_json;
            const buffer = Buffer.from(b64, 'base64');
            const filePath = path.join(OUTPUT_DIR, imgConfig.filename);
            
            // The API returns PNG, we need to convert to JPEG
            // Save as temp PNG first
            const tempPath = filePath + '.tmp.png';
            fs.writeFileSync(tempPath, buffer);
            console.log(`✅ ${imgConfig.filename} - downloaded (${(buffer.length / 1024).toFixed(0)}KB)`);
            resolve({ filename: imgConfig.filename, tempPath, filePath });
          } else {
            console.log(`❌ ${imgConfig.filename} - API error:`, body.substring(0, 200));
            reject(new Error(`API error for ${imgConfig.filename}`));
          }
        } catch (e) {
          console.log(`❌ ${imgConfig.filename} - Parse error:`, e.message);
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.log(`❌ ${imgConfig.filename} - Network error:`, e.message);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function convertToJpeg(results) {
  const sharp = (await import('sharp')).default;
  for (const r of results) {
    try {
      await sharp(r.tempPath)
        .jpeg({ quality: 90 })
        .toFile(r.filePath);
      fs.unlinkSync(r.tempPath);
      const stats = fs.statSync(r.filePath);
      const meta = await sharp(r.filePath).metadata();
      console.log(`🖼️  ${r.filename} -> JPEG ${meta.width}x${meta.height} (${(stats.size/1024).toFixed(0)}KB)`);
    } catch (e) {
      console.log(`❌ Convert error ${r.filename}:`, e.message);
    }
  }
}

async function main() {
  console.log('🎨 Gerando 4 imagens do blog via GPT Image 1.5...\n');
  
  const results = [];
  
  // Generate one at a time to avoid rate limits
  for (const img of images) {
    try {
      const result = await generateImage(img);
      results.push(result);
      // Small delay between requests
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      console.log(`Skipping ${img.filename} due to error`);
    }
  }

  if (results.length > 0) {
    console.log('\n🔄 Convertendo PNG -> JPEG...');
    await convertToJpeg(results);
    console.log(`\n✅ Concluído! ${results.length}/4 imagens geradas com sucesso.`);
  } else {
    console.log('\n❌ Nenhuma imagem foi gerada.');
  }
}

main().catch(console.error);

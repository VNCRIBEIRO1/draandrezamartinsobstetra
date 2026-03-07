import requests
import json
import base64
import os
import time
import sys

API_KEY = "sk-pnMcdcPxam39Q3xjDBFfm8MeHbfCc"
BASE_URL = "https://api.apifree.ai/v1/chat/completions"
MODEL = "openai/gpt-image-1-mini"
OUTPUT_DIR = os.path.join(os.getcwd(), "public", "images", "generated")

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Prompts para cada imagem - sem texto, estilo profissional médico feminino
IMAGE_PROMPTS = {
    # === ÁREAS DE ATUAÇÃO ===
    "area-ginecologia": "Professional elegant minimalist photograph for gynecology medical website. Soft sage green and beige color palette. Abstract feminine healthcare concept with soft flowers, clean medical aesthetic. Warm natural lighting. No text, no words, no letters, no watermark. Soft bokeh background.",
    
    "area-obstetricia": "Professional elegant photograph for obstetrics medical website. Soft pink and cream color palette. Gentle concept of motherhood and pregnancy care, soft fabrics, delicate flowers. Warm natural lighting. No text, no words, no letters, no watermark. Soft dreamy atmosphere.",
    
    "area-prenatal": "Professional elegant photograph for prenatal care medical website. Soft baby blue and cream color palette. Gentle baby shoes or soft knitted items with flowers. Warm natural lighting. No text, no words, no letters, no watermark. Soft peaceful atmosphere.",
    
    "area-menopausa": "Professional elegant photograph for menopause healthcare website. Warm earth tones, beige and gold color palette. Mature elegant woman wellness concept, herbal tea, natural elements. Warm natural lighting. No text, no words, no letters, no watermark. Sophisticated atmosphere.",
    
    "area-microscopia": "Professional elegant photograph for vaginal microscopy medical website. Sage green and white color palette. Clean medical microscope with soft floral elements, laboratory aesthetic. Soft natural lighting. No text, no words, no letters, no watermark. Modern clinical elegance.",
    
    "area-anticoncepcional": "Professional elegant photograph for contraception healthcare website. Soft pink and sage green color palette. Abstract feminine wellness concept, delicate flowers, soft fabrics. Warm natural lighting. No text, no words, no letters, no watermark. Young modern aesthetic.",
    
    "area-diu": "Professional elegant photograph for IUD contraception medical website. Soft sky blue and cream color palette. Abstract medical wellness concept, clean modern aesthetic with soft flowers. Gentle lighting. No text, no words, no letters, no watermark. Professional clinical beauty.",
    
    "area-implanon": "Professional elegant photograph for hormonal implant medical website. Soft teal and cream color palette. Abstract feminine arm with delicate flowers, wellness concept. Warm natural lighting. No text, no words, no letters, no watermark. Modern clean aesthetic.",

    # === ARTIGOS DO BLOG ===
    "importancia-pre-natal": "Professional elegant photograph for prenatal importance blog article. Pregnant woman silhouette with soft golden light, baby bump with flowers. Soft pink and cream tones. No text, no words, no letters, no watermark. Emotional warm atmosphere.",
    
    "microscopia-vaginal-diagnostico": "Professional elegant photograph for vaginal microscopy diagnosis blog article. Clean medical microscope on white surface with sage green accents and small flowers. No text, no words, no letters, no watermark. Modern medical aesthetic.",
    
    "menopausa-qualidade-vida": "Professional elegant photograph for menopause quality of life blog article. Mature woman's hands holding herbal tea cup, surrounded by natural herbs and flowers. Warm earth tones. No text, no words, no letters, no watermark. Peaceful wellness atmosphere.",
    
    "exames-ginecologicos-rotina": "Professional elegant photograph for routine gynecological exams blog article. Clean medical stethoscope with soft flowers on white surface, sage green accents. No text, no words, no letters, no watermark. Professional healthcare aesthetic.",
    
    "cheiro-intimo-normal-anormal": "Professional elegant photograph for intimate health blog article. Abstract feminine wellness concept, soft pastel flowers, clean bathroom aesthetic in pink and white. No text, no words, no letters, no watermark. Delicate tasteful approach.",
    
    "pilula-do-dia-seguinte": "Professional elegant photograph for morning-after pill blog article. Abstract feminine healthcare concept, soft pink and lavender flowers, modern clean aesthetic. No text, no words, no letters, no watermark. Young fresh atmosphere.",
    
    "vsr-recem-nascido": "Professional elegant photograph for newborn RSV virus blog article. Tiny newborn baby feet wrapped in soft white blanket with delicate flowers. Soft blue and cream tones. No text, no words, no letters, no watermark. Tender protective atmosphere.",
    
    "cuidar-voce-amor-proprio": "Professional elegant photograph for self-care and self-love blog article. Woman relaxing in nature, soft sunlight, flowers and greenery. Pink and sage green tones. No text, no words, no letters, no watermark. Empowering peaceful atmosphere.",
    
    "nao-faria-sendo-ginecologista": "Professional elegant photograph for gynecologist advice blog article. Female doctor's hands with stethoscope and fresh flowers on desk. Sage green and gold accents. No text, no words, no letters, no watermark. Professional trustworthy aesthetic.",
}

def generate_image(name, prompt, retry=0):
    """Gera uma imagem usando apifree.ai GPT-Image-1-mini"""
    try:
        payload = {
            "model": MODEL,
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024"
        }
        
        r = requests.post(BASE_URL, headers=headers, json=payload, timeout=180)
        data = r.json()
        
        if 'error' in data and 'data' not in data:
            print(f"  ❌ {name}: {data['error']}")
            if retry < 2:
                time.sleep(5)
                return generate_image(name, prompt, retry + 1)
            return False
        
        if 'data' in data and len(data['data']) > 0:
            img_item = data['data'][0]
            outpath = os.path.join(OUTPUT_DIR, f"{name}.jpg")
            
            if 'b64_json' in img_item and img_item['b64_json']:
                img_bytes = base64.b64decode(img_item['b64_json'])
                with open(outpath, 'wb') as f:
                    f.write(img_bytes)
                size_kb = len(img_bytes) / 1024
                cost = data.get('cost', 0)
                print(f"  ✅ {name}.jpg ({size_kb:.1f} KB) - custo: ${cost:.4f}")
                return True
            elif 'url' in img_item and img_item['url']:
                img_r = requests.get(img_item['url'], timeout=60)
                with open(outpath, 'wb') as f:
                    f.write(img_r.content)
                size_kb = len(img_r.content) / 1024
                cost = data.get('cost', 0)
                print(f"  ✅ {name}.jpg ({size_kb:.1f} KB) - custo: ${cost:.4f}")
                return True
        
        print(f"  ❌ {name}: resposta inesperada - {json.dumps(data)[:200]}")
        return False
        
    except Exception as e:
        print(f"  ❌ {name}: {e}")
        if retry < 2:
            time.sleep(5)
            return generate_image(name, prompt, retry + 1)
        return False

def main():
    print("🎨 Gerando imagens via apifree.ai (GPT-Image-1-mini)...\n")
    
    total = len(IMAGE_PROMPTS)
    success = 0
    failed = []
    total_cost = 0
    
    for i, (name, prompt) in enumerate(IMAGE_PROMPTS.items(), 1):
        print(f"[{i}/{total}] Gerando {name}...")
        if generate_image(name, prompt):
            success += 1
        else:
            failed.append(name)
        
        # Pausa entre requisições para evitar rate limiting
        if i < total:
            time.sleep(2)
    
    print(f"\n{'='*50}")
    print(f"✨ Resultado: {success}/{total} imagens geradas")
    if failed:
        print(f"❌ Falhas: {', '.join(failed)}")
    print(f"📁 Pasta: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()

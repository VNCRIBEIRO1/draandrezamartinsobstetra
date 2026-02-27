# Template de Site para Escritórios de Advocacia

## Visão Geral

Template profissional de site para escritórios de advocacia, construído com Next.js 16, React 18, TypeScript e Tailwind CSS. Inclui chatbot de triagem com integração ao WhatsApp, blog com artigos completos, SEO otimizado e design responsivo.

---

## Estrutura do Projeto

```
template-advocacia-base/
├── public/
│   └── images/              ← Imagens do escritório (substituir)
├── src/
│   ├── app/                 ← Páginas do site
│   │   ├── page.tsx              → Página inicial (Home)
│   │   ├── layout.tsx            → Layout global
│   │   ├── globals.css           → Estilos globais
│   │   ├── not-found.tsx         → Página 404
│   │   ├── robots.ts             → robots.txt (SEO)
│   │   ├── sitemap.ts            → sitemap.xml (SEO)
│   │   ├── sobre/page.tsx        → Página Sobre
│   │   ├── areas-de-atuacao/     → Áreas de Atuação
│   │   ├── blog/page.tsx         → Listagem do Blog
│   │   ├── blog/[slug]/page.tsx  → Artigo individual
│   │   ├── contato/page.tsx      → Formulário de Contato
│   │   ├── politica-privacidade/ → Política de Privacidade
│   │   └── termos-de-uso/        → Termos de Uso
│   ├── components/          ← Componentes reutilizáveis
│   │   ├── Header.tsx            → Cabeçalho com navegação
│   │   ├── Footer.tsx            → Rodapé
│   │   ├── HeroSection.tsx       → Banner principal
│   │   ├── ChatBot.tsx           → Chatbot de triagem + WhatsApp
│   │   ├── WhatsAppButton.tsx    → Botão flutuante WhatsApp
│   │   ├── ContactForm.tsx       → Formulário de contato
│   │   ├── CanvasLogo.tsx        → Logo com fundo transparente
│   │   ├── CookieBanner.tsx      → Banner de cookies (LGPD)
│   │   ├── AnimatedSection.tsx   → Animações de scroll
│   │   ├── AreaCard.tsx          → Card de área de atuação
│   │   ├── BlogCard.tsx          → Card de artigo do blog
│   │   ├── SectionHeader.tsx     → Título de seção padronizado
│   │   └── TestimonialCard.tsx   → Card de depoimento
│   └── lib/                 ← Dados e configurações
│       ├── site-config.ts        → ★ CONFIGURAÇÃO CENTRAL (editar primeiro)
│       ├── images.ts             → Mapeamento de imagens
│       └── articles.ts           → Artigos do blog (reescrever)
├── tailwind.config.ts       ← Paleta de cores (personalizar)
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## GUIA DE IMPLANTAÇÃO — Passo a Passo

### ETAPA 1: Dados do Escritório (OBRIGATÓRIO)

Todos os dados centralizados ficam em `src/lib/site-config.ts`. Este é o **primeiro e principal arquivo** a ser editado.

#### 1.1 Dados necessários do cliente

Coletar as seguintes informações:

| Dado | Campo no site-config | Exemplo |
|------|---------------------|---------|
| Nome do escritório (curto) | `nome` | `'Silva & Santos'` |
| Nome completo dos sócios | `nomeCompleto` | `'João Silva & Maria Santos'` |
| Nome formal completo | `nomeEscritorio` | `'Silva & Santos Advogados Associados'` |
| Número OAB Sócio 1 | `socios[0].oab` | `'OAB/SP 123.456'` |
| Número OAB Sócio 2 | `socios[1].oab` | `'OAB/SP 789.012'` |
| Estado da OAB | `oabEstado` | `'SP'` |
| Telefone formatado | `telefone` | `'(11) 99999-9999'` |
| Telefone (só números) | `telefoneLink` | `'5511999999999'` |
| WhatsApp (só números) | `whatsapp` | `'5511999999999'` |
| E-mail profissional | `email` | `'contato@silvasantos.adv.br'` |
| Rua + número | `endereco.rua` | `'Av. Paulista, 1000'` |
| Complemento | `endereco.complemento` | `'Sala 501, 5º andar'` |
| Bairro | `endereco.bairro` | `'Bela Vista'` |
| Cidade | `endereco.cidade` | `'São Paulo'` |
| Estado | `endereco.estado` | `'SP'` |
| CEP | `endereco.cep` | `'01310-100'` |
| Horário de atendimento | `horario` | `'Segunda a Sexta, 09:00 às 18:00'` |
| Domínio final do site | `dominio` | `'https://silvasantos.adv.br'` |

#### 1.2 Textos institucionais

| Dado | Campo | Observação |
|------|-------|------------|
| Descrição SEO (160 chars) | `descricaoSite` | Usado no Google |
| Palavras-chave SEO | `palavrasChave` | Array de strings |
| Resumo do escritório | `sobreResumo` | 1-2 frases |
| História (parágrafos) | `sobreHistoria` | Array de strings, cada item = 1 parágrafo |
| Formação acadêmica | `formacao` | Array com `{ year, title, institution }` |
| Avaliação Google | `avaliacaoGoogle` | Ex: `'4.9'` |
| Total de avaliações | `totalAvaliacoes` | Ex: `'50+'` |

#### 1.3 Depoimentos de clientes

Coletar no mínimo 3 depoimentos:

```typescript
depoimentos: [
  {
    text: 'Texto do depoimento...',
    author: 'Nome do Cliente',
    role: 'Cliente',
  },
]
```

#### 1.4 Redes sociais

| Rede | Campo | Formato |
|------|-------|---------|
| Instagram | `redesSociais.instagram` | URL completa |
| Facebook | `redesSociais.facebook` | URL completa |
| LinkedIn | `redesSociais.linkedin` | URL completa (opcional) |
| YouTube | `redesSociais.youtube` | URL completa (opcional) |

#### 1.5 Google Maps

| Dado | Campo | Observação |
|------|-------|------------|
| API Key | `googleMapsApiKey` | Criar no Google Cloud Console |
| URL do Maps | `googleMapsUrl` | Link de busca do Google Maps |

---

### ETAPA 2: Imagens (OBRIGATÓRIO)

#### 2.1 Imagens que precisam ser fornecidas/criadas

Colocar na pasta `public/images/`:

| Imagem | Nome sugerido | Dimensões | Formato | Uso |
|--------|--------------|-----------|---------|-----|
| Logo principal | `logo.webp` | 400x200px | WebP | Header, Footer, SEO |
| Logo alternativo | `logo_alt.webp` | 200x200px | WebP | Favicon, fallback |
| Foto dos sócios / equipe | `team_photo.webp` | 800x600px | WebP | Página Sobre, Home |

#### 2.2 Atualizar referências

Editar `src/lib/images.ts`:

```typescript
export const IMAGES = {
  lawyer: '/images/team_photo.webp',
  hero: 'URL do Unsplash ou imagem própria',
  office: 'URL do Unsplash ou imagem própria',
  logo: '/images/logo.webp',
  logoAlt: '/images/logo_alt.webp',
  logoMini: '/images/logo.webp',
} as const;
```

Também atualizar `SITE_CONFIG.imagens` em `site-config.ts` com os mesmos caminhos.

#### 2.3 CanvasLogo

O componente `CanvasLogo.tsx` processa a logo em Canvas para remover fundo branco. Se a logo já tiver fundo transparente (PNG/WebP com alpha), pode trocar para `next/image` diretamente no Header e Footer.

---

### ETAPA 3: Identidade Visual / Cores (OBRIGATÓRIO)

Editar `tailwind.config.ts` — seção `colors`:

#### 3.1 Paleta de cores

O template usa 3 grupos de cores:

| Grupo | Uso | Descrição |
|-------|-----|-----------|
| `primary` | Fundos escuros, header, footer, botões | Cor institucional principal |
| `secondary` | Textos, bordas, backgrounds neutros | Tons neutros/cinza |
| `gold` | Destaques, CTAs, detalhes premium | Cor de destaque/acento |

#### 3.2 Exemplo de paletas alternativas

**Azul Marinho + Dourado (clássico):**
```typescript
primary: { 500: '#1a237e', 800: '#0d1442', ... }
gold: { 400: '#c9a84c', 500: '#b8942e', ... }
```

**Vinho + Prata (elegante):**
```typescript
primary: { 500: '#4a1028', 800: '#2d0a18', ... }
gold: { 400: '#c0c0c0', 500: '#a8a8a8', ... }  // renomear para 'accent'
```

**Preto + Vermelho (moderno):**
```typescript
primary: { 500: '#1a1a1a', 800: '#0d0d0d', ... }
gold: { 400: '#dc2626', 500: '#b91c1c', ... }
```

#### 3.3 Gradientes no Header

O header usa gradientes fixos em `Header.tsx`. Procurar e substituir:
- `from-[#0e1810]` → cor escura da nova paleta
- `via-[#1a2e1f]` → cor principal da nova paleta
- `to-[#0e1810]` → cor escura da nova paleta

Mesma lógica em `ChatBot.tsx` e `Footer.tsx`.

**Dica:** Fazer busca global por `#0e1810`, `#1a2e1f` e `#2d4a35` e substituir pelas novas cores.

---

### ETAPA 4: Áreas de Atuação (OBRIGATÓRIO)

O template vem com 6 áreas: Trabalhista, Criminal, Civil, Empresarial, Administrativo, Cálculos Judiciais.

#### 4.1 Definir as áreas do novo escritório

Para cada área, fornecer:
- Nome da área
- Descrição curta (1-2 frases)
- Lista de serviços específicos (3-6 itens)

#### 4.2 Arquivos a editar

1. **`src/app/areas-de-atuacao/page.tsx`** — Cards com descrição de cada área
2. **`src/app/page.tsx`** — Seção de áreas na home
3. **`src/components/ContactForm.tsx`** — Dropdown de áreas no formulário

---

### ETAPA 5: Chatbot de Triagem (OBRIGATÓRIO)

O chatbot é o componente central do template. Precisa ser **inteiramente reescrito** para refletir as áreas do novo escritório.

#### 5.1 Arquivo: `src/components/ChatBot.tsx`

##### O que customizar:

| Seção | Localização | O que fazer |
|-------|------------|-------------|
| `FLUXOS` | Topo do arquivo | Reescrever todas as áreas e perguntas |
| `AREAS` | Após os fluxos | Lista de áreas do menu inicial |
| `WHATSAPP_NUMBER` | Constante | Número do WhatsApp do escritório |
| `PERGUNTA_URGENCIA` | Constante | Pode manter como está |
| `gerarMensagemWhatsApp()` | Função | Trocar nome do escritório |

##### Estrutura de cada fluxo:

```typescript
nomeArea: {
  saudacao: 'Mensagem de boas-vindas para esta área...',
  perguntas: [
    {
      id: 'sub',                    // ID único
      texto: 'Pergunta exibida',    // Texto da pergunta
      opcoes: [                     // Opções clicáveis
        { label: 'Texto visível', valor: 'Valor gravado' },
      ],
      campo: 'subarea',             // Grava em dados.subarea
    },
    PERGUNTA_URGENCIA,              // Sempre incluir
    {
      id: 'detalhes',
      texto: 'Pergunta contextual...',
      opcoes: [...],
      campoArray: true,             // Grava em dados.detalhes[]
    },
    {
      id: 'detalhe',
      texto: 'Descreva brevemente...',
      livre: true,                  // Aceita texto livre
      campoArray: true,
    },
  ],
}
```

##### Regras para criação de fluxos:

1. Primeira pergunta deve ter `campo: 'subarea'` (define o assunto)
2. Incluir `PERGUNTA_URGENCIA` logo após a primeira (define nível)
3. Demais perguntas com `campoArray: true` (acumulam em detalhes)
4. Última pergunta sempre `livre: true` (texto aberto do cliente)
5. Mínimo 4 perguntas por fluxo, ideal 5-6
6. Opções com emojis apenas no `label` (aparecem na interface, não no WhatsApp)
7. O `valor` deve ser texto limpo sem emojis (vai para o WhatsApp)

---

### ETAPA 6: Artigos do Blog (OBRIGATÓRIO)

#### 6.1 Arquivo: `src/lib/articles.ts`

O template vem com 9 artigos. Para cada novo escritório, reescrever os artigos de acordo com as áreas de atuação.

##### Estrutura de cada artigo:

```typescript
'slug-do-artigo': {
  titulo: 'Título do Artigo',
  resumo: 'Resumo de 1-2 linhas para o card do blog',
  categoria: 'Direito Trabalhista',  // Deve coincidir com uma área
  autor: 'Nome do Advogado',
  data: '15 de Janeiro de 2025',
  conteudo: [
    'Primeiro parágrafo do artigo...',
    '## Subtítulo da Seção',           // Linha com ## no início = heading
    'Parágrafo sob o subtítulo...',
    // ... continuar com 10-20 parágrafos
  ],
}
```

##### Regras:

- Slug deve ser URL-friendly (sem acentos, minúsculo, hifenizado)
- Cada artigo deve ter 800-1500 palavras
- Usar `## ` (com espaço) no início da string para subtítulos
- A `categoria` deve corresponder a uma das áreas em `AREA_IMAGES` (images.ts)
- Incluir disclaimer jurídico no último parágrafo

#### 6.2 Atualizar o sitemap

Em `src/app/sitemap.ts`, verificar se os slugs dos novos artigos estão listados.

---

### ETAPA 7: Textos das Páginas (RECOMENDADO)

#### 7.1 Páginas com conteúdo para revisar:

| Página | Arquivo | O que adaptar |
|--------|---------|---------------|
| Home | `src/app/page.tsx` | Hero text, CTAs, seções |
| Sobre | `src/app/sobre/page.tsx` | História, valores, missão |
| Contato | `src/app/contato/page.tsx` | Textos, horários |
| Política de Privacidade | `src/app/politica-privacidade/page.tsx` | Nome da empresa, dados |
| Termos de Uso | `src/app/termos-de-uso/page.tsx` | Nome da empresa, dados |

#### 7.2 Hero Section

O `HeroSection.tsx` contém o texto principal da home. Adaptar:
- Título principal (slogan do escritório)
- Subtítulo
- Texto do botão CTA

---

### ETAPA 8: Configuração Técnica

#### 8.1 Variáveis de ambiente

Criar `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP=5511999999999
```

#### 8.2 Deploy na Vercel

1. Criar repositório no GitHub
2. Conectar na Vercel (vercel.com)
3. Configurar variáveis de ambiente
4. O deploy é automático a cada push

#### 8.3 Domínio personalizado

1. Comprar domínio (Registro.br, GoDaddy, etc.)
2. Na Vercel: Settings > Domains > Add Domain
3. Configurar DNS (CNAME para `cname.vercel-dns.com`)

---

## CHECKLIST DE IMPLANTAÇÃO

```
[ ] 1. Coletar todos os dados do escritório (Etapa 1)
[ ] 2. Receber imagens: logo, foto equipe (Etapa 2)
[ ] 3. Definir paleta de cores (Etapa 3)
[ ] 4. Editar site-config.ts com dados do escritório
[ ] 5. Editar images.ts com novos caminhos
[ ] 6. Editar tailwind.config.ts com novas cores
[ ] 7. Substituir cores hardcoded nos componentes (grep por #0e1810, #1a2e1f, #2d4a35)
[ ] 8. Definir áreas de atuação e serviços
[ ] 9. Editar areas-de-atuacao/page.tsx
[ ] 10. Editar ContactForm.tsx (dropdown de áreas)
[ ] 11. Reescrever ChatBot.tsx (fluxos de triagem)
[ ] 12. Escrever artigos do blog em articles.ts
[ ] 13. Atualizar sitemap.ts com novos slugs
[ ] 14. Revisar textos de todas as páginas
[ ] 15. Atualizar política de privacidade e termos de uso
[ ] 16. Colocar logo na pasta public/images/
[ ] 17. Testar chatbot completo (todos os fluxos)
[ ] 18. Testar mensagem WhatsApp (receber no celular)
[ ] 19. npm run build (deve compilar sem erros)
[ ] 20. Criar repo no GitHub e conectar Vercel
[ ] 21. Configurar domínio personalizado
[ ] 22. Testar site em produção (desktop e mobile)
```

---

## ESPECIFICAÇÕES TÉCNICAS

| Item | Tecnologia | Versão |
|------|-----------|--------|
| Framework | Next.js (App Router) | 16.x |
| UI | React | 18.x |
| Linguagem | TypeScript | 5.x |
| CSS | Tailwind CSS | 3.4.x |
| Animações | Framer Motion | 11.x |
| Ícones | Lucide React | - |
| Deploy | Vercel | - |

### Requisitos de desenvolvimento:

- Node.js 18+ instalado
- npm ou yarn
- Git

### Comandos:

```bash
npm install          # Instalar dependências
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Rodar build localmente
```

---

## NOTAS IMPORTANTES

1. **OAB/Provimento 205/2021:** Todo conteúdo deve respeitar as normas de publicidade da OAB. O template já inclui disclaimers obrigatórios.

2. **LGPD:** O template inclui banner de cookies (`CookieBanner.tsx`) e página de política de privacidade. Adaptar com os dados reais do escritório.

3. **WhatsApp:** A integração usa links `wa.me` (sem API). O chatbot gera mensagens formatadas com Markdown do WhatsApp (negrito com asteriscos, itálico com underscore).

4. **SEO:** O template gera `robots.txt` e `sitemap.xml` automaticamente. Atualizar o domínio em `site-config.ts` e verificar `sitemap.ts`.

5. **Imagens:** Preferir formato WebP para performance. Imagens de background podem usar Unsplash (gratuito para uso comercial).

6. **CanvasLogo:** O componente processa logos com fundo branco usando Canvas. Se a logo já tem fundo transparente, substituir por `next/image` padrão.

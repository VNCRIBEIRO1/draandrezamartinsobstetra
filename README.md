# Template de Site para Escritorios de Advocacia

Site profissional para escritorios de advocacia com chatbot de triagem, integracao WhatsApp, blog e SEO otimizado.

## Tecnologias

- Next.js 16 (App Router)
- React 18 + TypeScript
- Tailwind CSS 3.4
- Framer Motion (animacoes)
- Lucide React (icones)
- Deploy: Vercel

## Funcionalidades

- Pagina inicial com hero, areas de atuacao, depoimentos e CTA
- Pagina Sobre com historia do escritorio e trajetoria
- Pagina de Areas de Atuacao com cards detalhados
- Blog com artigos completos e SEO individual
- Formulario de contato funcional
- Chatbot de triagem inteligente com envio via WhatsApp
- Botao flutuante do WhatsApp
- Banner de cookies (LGPD)
- Politica de privacidade e termos de uso
- robots.txt e sitemap.xml automaticos
- Design 100% responsivo (mobile-first)
- Animacoes de scroll suaves

## Como usar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar dados do escritorio

Consulte `DOCUMENTACAO.md` para o guia completo de implantacao.

Arquivos principais a editar:
- `src/lib/site-config.ts` — Dados centralizados
- `src/lib/images.ts` — Imagens
- `src/lib/articles.ts` — Artigos do blog
- `src/components/ChatBot.tsx` — Chatbot de triagem
- `tailwind.config.ts` — Paleta de cores

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

### 4. Build de producao

```bash
npm run build
```

### 5. Deploy

Conectar o repositorio GitHub na Vercel para deploy automatico.

## Documentacao

- `DOCUMENTACAO.md` — Guia completo de implantacao (passo a passo)
- `QUESTIONARIO_CLIENTE.md` — Formulario para coletar dados do escritorio
- `src/lib/site-config.template.ts` — Modelo do arquivo de configuracao
- `src/lib/articles.template.ts` — Modelo para artigos do blog

## Licenca

Template proprietario. Uso restrito a projetos autorizados.

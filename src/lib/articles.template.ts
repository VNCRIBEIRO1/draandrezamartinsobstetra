// ============================================================
// ARTIGOS DO BLOG — TEMPLATE
// Reescrever todos os artigos de acordo com as areas do escritorio
// ============================================================
// REGRAS:
// - Slug: URL-friendly, sem acentos, minusculo, hifenizado
// - Cada artigo: 800-1500 palavras, 10-20 paragrafos
// - Usar '## ' no inicio da string para subtitulos (h2)
// - A categoria deve corresponder a uma area em AREA_IMAGES (images.ts)
// - Incluir disclaimer juridico no ultimo paragrafo
// ============================================================

export type Article = {
  titulo: string;
  resumo: string;
  categoria: string;
  autor: string;
  data: string;
  conteudo: string[];
};

export const articles: Record<string, Article> = {
  // TODO: Substituir por artigos reais do escritorio
  'exemplo-artigo': {
    titulo: 'Titulo do Artigo',
    resumo: 'Resumo curto do artigo que aparece no card do blog.',
    categoria: 'Direito Trabalhista', // Deve coincidir com area em images.ts
    autor: 'Nome do Advogado',
    data: '15 de Janeiro de 2025',
    conteudo: [
      'Primeiro paragrafo do artigo. Introducao ao tema.',
      '## Subtitulo da Primeira Secao',
      'Conteudo da secao...',
      '## Subtitulo da Segunda Secao',
      'Conteudo da secao...',
      '## Conclusao',
      'Paragrafo de conclusao.',
      'Aviso legal: Este artigo tem carater meramente informativo e nao constitui aconselhamento juridico. Para analise do seu caso especifico, consulte um advogado.',
    ],
  },
};

export const defaultArticle: Article = {
  titulo: 'Artigo Informativo',
  resumo: 'Conteudo juridico informativo.',
  categoria: 'Direito',
  autor: 'Equipe Juridica',
  data: '',
  conteudo: [
    'Este artigo esta em elaboracao. Em breve, publicaremos conteudo completo sobre este tema.',
    'Para duvidas, entre em contato conosco pelo WhatsApp ou formulario de contato.',
  ],
};

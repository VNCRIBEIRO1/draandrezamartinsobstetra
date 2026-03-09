import { siteConfig } from '@/lib/site-config';
import { articles } from '@/lib/articles';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Páginas estáticas com prioridades otimizadas para SEO local
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                           lastModified: now, changeFrequency: 'weekly',   priority: 1.0 },
    { url: `${baseUrl}/sobre`,                lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${baseUrl}/areas-de-atuacao`,     lastModified: now, changeFrequency: 'weekly',   priority: 1.0 },
    { url: `${baseUrl}/contato`,              lastModified: now, changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${baseUrl}/agendar`,              lastModified: now, changeFrequency: 'monthly',  priority: 0.95 },
    { url: `${baseUrl}/blog`,                 lastModified: now, changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${baseUrl}/politica-privacidade`, lastModified: now, changeFrequency: 'yearly',   priority: 0.2 },
    { url: `${baseUrl}/termos-de-uso`,        lastModified: now, changeFrequency: 'yearly',   priority: 0.2 },
  ];

  // Artigos do blog com prioridade alta diferenciada por relevância SEO local
  const highPrioritySlugs = [
    'diu-tudo-sobre', 'implanon-implante-guia', 'importancia-pre-natal',
    'menopausa-qualidade-vida', 'microscopia-vaginal-diagnostico',
    'ginecologia-geral-saude-feminina', 'obstetricia-parto-humanizado',
    'anticoncepcional-guia-jovem',
  ];

  const blogPages: MetadataRoute.Sitemap = Object.keys(articles).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: highPrioritySlugs.includes(slug) ? 0.9 : 0.8,
  }));

  return [...staticPages, ...blogPages];
}

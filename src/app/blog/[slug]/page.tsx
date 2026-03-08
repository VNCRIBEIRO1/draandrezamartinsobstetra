import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import BlogArticleClient from '@/components/BlogArticleClient';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

// Allow dynamic slugs beyond the static ones (for admin-created articles)
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: 'Artigo não encontrado' };

  const description = article.content[0]?.substring(0, 155) || article.title;

  return {
    title: `${article.title} | Ginecologista Presidente Prudente`,
    description,
    keywords: [
      article.title,
      'ginecologista Presidente Prudente',
      'Dra Andresa Martin',
      'saúde da mulher',
      slug.replace(/-/g, ' '),
    ],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${article.title} | Dra. Andresa Martin`,
      description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: '2026-02-01',
      authors: [siteConfig.nomeCompleto],
      section: 'Saúde da Mulher',
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  // For static articles, pass them; dynamic articles served from static data
  const staticArticle = article ? { ...article, slug } : null;

  const schemas = article
    ? [
        getArticleSchema({
          title: article.title,
          description: article.content[0]?.substring(0, 155) || '',
          slug,
        }),
        getBreadcrumbSchema([
          { name: 'Início', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: article.title, url: `${siteConfig.url}/blog/${slug}` },
        ]),
      ]
    : [];

  // Allow dynamic slugs from admin — articles are managed via static content
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BlogArticleClient slug={slug} staticArticle={staticArticle} />
    </>
  );
}

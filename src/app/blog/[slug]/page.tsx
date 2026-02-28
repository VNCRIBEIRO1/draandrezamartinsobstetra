import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import BlogArticleClient from '@/components/BlogArticleClient';

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
  return {
    title: `${article.title} | Blog Dra. Andresa Martin`,
    description: article.content[0] || '',
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  // For static articles, pass them; for dynamic ones, the client will load from localStorage
  const staticArticle = article ? { ...article, slug } : null;

  // Allow dynamic slugs (from admin) – don't notFound() so client can check localStorage
  return <BlogArticleClient slug={slug} staticArticle={staticArticle} />;
}

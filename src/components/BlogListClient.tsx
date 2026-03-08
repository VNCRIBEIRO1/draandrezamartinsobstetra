'use client';

import BlogCard from '@/components/BlogCard';
import { articlesList } from '@/lib/articles';
import { getArticleImage } from '@/lib/images';

export default function BlogListClient() {
  // Blog articles are served from static data (articles.ts)
  // No localStorage needed — admin edits are reflected via static content
  const articles = articlesList;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <BlogCard
          key={article.slug}
          title={article.title}
          excerpt={article.excerpt}
          date={article.date}
          readTime={article.readTime}
          slug={article.slug}
          category={article.category}
          image={getArticleImage(article.slug)}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
}

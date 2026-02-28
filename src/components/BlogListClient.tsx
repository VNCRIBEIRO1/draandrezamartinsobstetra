'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { articlesList, type ArticleWithSlug } from '@/lib/articles';
import { getArticleImage } from '@/lib/images';

interface AdminArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  videoUrl?: string;
  published: boolean;
}

export default function BlogListClient() {
  const [articles, setArticles] = useState<ArticleWithSlug[]>(articlesList);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dra_blog_articles');
      if (stored) {
        const adminArticles: AdminArticle[] = JSON.parse(stored);
        // Build a merged list: admin versions override static ones, plus add new ones
        const staticSlugs = new Set(articlesList.map(a => a.slug));
        const merged: ArticleWithSlug[] = [];

        // Add static articles (checking for admin overrides)
        articlesList.forEach(sa => {
          const adminOverride = adminArticles.find(a => a.slug === sa.slug && a.published);
          if (adminOverride) {
            merged.push({
              slug: adminOverride.slug,
              title: adminOverride.title,
              category: adminOverride.category,
              date: adminOverride.date,
              readTime: adminOverride.readTime,
              excerpt: adminOverride.content[0] || sa.excerpt,
              content: adminOverride.content,
              videoUrl: adminOverride.videoUrl,
            });
          } else {
            merged.push(sa);
          }
        });

        // Add admin-only articles (not in static)
        adminArticles.filter(a => a.published && !staticSlugs.has(a.slug)).forEach(a => {
          merged.push({
            slug: a.slug,
            title: a.title,
            category: a.category,
            date: a.date,
            readTime: a.readTime,
            excerpt: a.content[0] || '',
            content: a.content,
            videoUrl: a.videoUrl,
          });
        });

        setArticles(merged);
      }
    } catch { /* ignore */ }
  }, []);

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

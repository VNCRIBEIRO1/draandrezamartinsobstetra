'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import VideoEmbed from '@/components/VideoEmbed';
import { IMAGES, getArticleImage } from '@/lib/images';
import { articles as staticArticles, articlesList, type Article } from '@/lib/articles';

interface BlogArticleClientProps {
  slug: string;
  staticArticle: (Article & { slug: string }) | null;
}

interface StoredArticle {
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

export default function BlogArticleClient({ slug, staticArticle }: BlogArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(staticArticle);
  const [otherArticles, setOtherArticles] = useState<{ slug: string; title: string; category: string; date: string; readTime: string; excerpt: string }[]>(
    articlesList.filter(a => a.slug !== slug).slice(0, 3).map(a => ({ slug: a.slug, title: a.title, category: a.category, date: a.date, readTime: a.readTime, excerpt: a.excerpt }))
  );

  // On mount, check localStorage for admin-edited version
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dra_blog_articles');
      if (stored) {
        const adminArticles: StoredArticle[] = JSON.parse(stored);
        // Look for this slug in admin articles
        const adminVersion = adminArticles.find(a => a.slug === slug && a.published);
        if (adminVersion) {
          setArticle({
            title: adminVersion.title,
            category: adminVersion.category,
            date: adminVersion.date,
            readTime: adminVersion.readTime,
            content: adminVersion.content,
            videoUrl: adminVersion.videoUrl,
          });
        }

        // Also merge admin articles into "related" list
        const allSlugs = new Set([...Object.keys(staticArticles), ...adminArticles.filter(a => a.published).map(a => a.slug)]);
        const others: { slug: string; title: string; category: string; date: string; readTime: string; excerpt: string }[] = [];
        allSlugs.forEach(s => {
          if (s === slug) return;
          const adminA = adminArticles.find(a => a.slug === s && a.published);
          const staticA = staticArticles[s];
          const src = adminA || staticA;
          if (src) {
            others.push({
              slug: s,
              title: src.title,
              category: src.category,
              date: src.date,
              readTime: src.readTime,
              excerpt: src.content[0] || '',
            });
          }
        });
        setOtherArticles(others.slice(0, 3));
      }
    } catch { /* ignore */ }
  }, [slug]);

  if (!article) return null;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-xs font-semibold text-white bg-primary-500 px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{article.date}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{article.readTime} de leitura</div>
              <div className="flex items-center gap-2"><Tag className="w-4 h-4" />{article.category}</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hero image */}
      <div className="container-custom max-w-4xl -mt-4 mb-0">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={getArticleImage(slug)}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Conteúdo */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            {article.videoUrl && (
              <div className="mb-10">
                <VideoEmbed url={article.videoUrl} title={article.title} />
              </div>
            )}

            <article className="prose prose-lg prose-pink max-w-none">
              {article.content.map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-serif font-bold text-gray-900 mt-8 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                      {items.map((item, j) => <li key={j} className="text-gray-600">{item.replace('- ', '')}</li>)}
                    </ul>
                  );
                }
                return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </article>

            {/* Autor */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border border-primary-100 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-primary-200 shadow-lg">
                <Image src={IMAGES.doutora} alt="Dra. Andresa Martin Louzada" width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="font-serif font-bold text-gray-900 text-lg">Dra. Andresa Martin Louzada</p>
                <p className="text-sm text-primary-600 font-medium">Ginecologista e Obstetra | CRM/SP</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Especialista em Ginecologia, Obstetrícia, Ginecologia Regenerativa e Microscopia Vaginal.
                  Atuando no Espaço Humanizare em Presidente Prudente.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 p-8 bg-gradient-to-r from-primary-500 via-purple-500 to-accent-500 rounded-2xl text-center text-white shadow-xl">
              <h3 className="text-2xl font-serif font-bold mb-3">Ficou com alguma dúvida?</h3>
              <p className="text-white/80 mb-6">Agende uma consulta e converse pessoalmente com a Dra. Andresa.</p>
              <Link href="/agendar" className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Agendar Consulta <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Artigos Relacionados */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {otherArticles.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-primary-100 group">
                <span className="text-xs font-semibold text-primary-500">{a.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-primary-600 transition-colors">{a.title}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{a.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                  <span>{a.date}</span>
                  <span>{a.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

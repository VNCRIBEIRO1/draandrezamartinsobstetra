import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeader from '@/components/SectionHeader';
import BlogCard from '@/components/BlogCard';
import { articlesList } from '@/lib/articles';

export const metadata = {
  title: 'Blog Saúde da Mulher | Dra. Andresa Martin Louzada',
  description: 'Artigos informativos sobre ginecologia, obstetrícia, pré-natal, menopausa e saúde feminina pela Dra. Andresa Martin Louzada.',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-100 px-4 py-1.5 rounded-full mb-4">
              Blog Saúde da Mulher
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Artigos e <span className="text-primary-500">Dicas de Saúde</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conteúdo educativo sobre saúde feminina para ajudar você a se cuidar melhor em todas as fases da vida.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Artigos */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesList.map((article, index) => (
              <BlogCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                readTime={article.readTime}
                slug={article.slug}
                category={article.category}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Tem Dúvidas Sobre Sua Saúde?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Agende uma consulta e converse pessoalmente com a Dra. Andresa.
            </p>
            <a
              href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Agendar Consulta
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

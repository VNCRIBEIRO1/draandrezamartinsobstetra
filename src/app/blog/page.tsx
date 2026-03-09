import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import BlogListClient from '@/components/BlogListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Saúde da Mulher - Ginecologia e Obstetrícia em Presidente Prudente | Dra. Andresa Martin',
  description:
    'Artigos sobre ginecologia, obstetrícia, pré-natal, menopausa, DIU, Implanon, anticoncepcional e saúde feminina em Presidente Prudente. Conteúdo educativo pela Dra. Andresa Martin Louzada, Ginecologista e Obstetra no Espaço Humanizare.',
  keywords: [
    'blog ginecologia Presidente Prudente',
    'blog saúde da mulher Presidente Prudente',
    'artigos obstetrícia Presidente Prudente',
    'dicas saúde feminina',
    'pré-natal informações Presidente Prudente',
    'DIU informações Presidente Prudente',
    'Implanon informações Presidente Prudente',
    'menopausa dicas Presidente Prudente',
    'ginecologista Presidente Prudente blog',
    'anticoncepcional guia Presidente Prudente',
    'endometriose artigo Presidente Prudente',
    'parto humanizado informações Presidente Prudente',
    'microscopia vaginal artigo',
    'Dra Andresa Martin blog',
    'saúde feminina Oeste Paulista',
    'ginecologista Presidente Prudente artigos',
    'obstetra Presidente Prudente conteúdo',
    'exames ginecológicos Presidente Prudente',
    'colposcopia informações',
    'papanicolau guia completo',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog Saúde da Mulher | Dra. Andresa Martin - Ginecologista Presidente Prudente',
    description: 'Artigos sobre saúde feminina, ginecologia e obstetrícia pela Dra. Andresa Martin Louzada.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-baby-cream to-secondary-50">
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
          <BlogListClient />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Tem Dúvidas Sobre Sua Saúde?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Agende uma consulta e converse pessoalmente com a Dra. Andresa.
            </p>
            <Link href="/agendar"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Agendar Consulta
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

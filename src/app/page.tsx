import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, Star, Heart, Baby, Stethoscope, Microscope, Flower2, Sparkles, Shield, CircleDot, Syringe } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import AreaCard from '@/components/AreaCard';
import BlogCard from '@/components/BlogCard';
import AnimatedSection from '@/components/AnimatedSection';
import GoogleReviews from '@/components/GoogleReviews';
import { IMAGES, getArticleImage } from '@/lib/images';

const areas = [
  { iconName: 'Heart', title: 'Ginecologia', description: 'Acompanhamento ginecológico completo em todas as fases da vida da mulher, com exames de rotina, prevenção e tratamento de doenças.' },
  { iconName: 'Baby', title: 'Obstetrícia', description: 'Acompanhamento da gestação, parto e pós-parto com cuidado humanizado para mãe e bebê.' },
  { iconName: 'Stethoscope', title: 'Pré-natal', description: 'Pré-natal completo e humanizado com acompanhamento individualizado, exames e orientações em cada etapa da gestação.' },
  { iconName: 'Flower2', title: 'Menopausa', description: 'Tratamento personalizado para os sintomas da menopausa, reposição hormonal e cuidados com a saúde óssea e cardiovascular.' },
  { iconName: 'Shield', title: 'Anticoncepcional', description: 'Orientação personalizada sobre o método contraceptivo ideal para você, com acompanhamento e ajustes conforme sua necessidade.' },
  { iconName: 'CircleDot', title: 'DIU', description: 'Inserção e acompanhamento de DIU de cobre e hormonal — método seguro, prático e de longa duração.' },
  { iconName: 'Syringe', title: 'Implanon', description: 'Implante subdérmico contraceptivo com duração de até 3 anos — praticidade e eficácia para o seu dia a dia.' },
  { iconName: 'Microscope', title: 'Microscopia Vaginal', description: 'Diagnóstico imediato durante a consulta com análise microscópica do conteúdo vaginal — resultado na hora!' },
];

const blogPosts = [
  { title: 'Anticoncepcional: Guia Completo para Quem Está Começando', excerpt: 'Escolher o anticoncepcional ideal pode parecer complicado. Este guia vai te ajudar a entender cada opção e conversar com mais segurança com sua ginecologista.', date: '10 Fev 2026', readTime: '7 min', slug: 'anticoncepcional-guia-jovem', category: 'Anticoncepcional', image: getArticleImage('anticoncepcional-guia-jovem') },
  { title: 'DIU: Tudo Que Você Precisa Saber Antes de Colocar', excerpt: 'O DIU é um dos métodos mais eficazes e práticos. Esclareça todas as suas dúvidas — desde como funciona até como é a inserção.', date: '08 Fev 2026', readTime: '7 min', slug: 'diu-tudo-sobre', category: 'DIU', image: getArticleImage('diu-tudo-sobre') },
  { title: 'Implanon: O Implante Contraceptivo que Dura 3 Anos', excerpt: 'Com eficácia superior a 99%, o Implanon é inserido no braço e dura até 3 anos. Conheça tudo sobre esse método.', date: '06 Fev 2026', readTime: '6 min', slug: 'implanon-implante-guia', category: 'Implanon', image: getArticleImage('implanon-implante-guia') },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Áreas de Atuação */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Áreas de Atuação"
              title="Como Podemos Cuidar de Você"
              subtitle="Oferecemos atendimento humanizado e especializado em diversas áreas da saúde feminina."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <AreaCard key={area.title} iconName={area.iconName} title={area.title} description={area.description} delay={index * 0.1} />
            ))}
          </div>
          <AnimatedSection className="text-center mt-12">
            <Link href="/areas-de-atuacao" className="btn-primary inline-flex items-center">
              Ver Todas as Áreas <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Sobre - Preview */}
      <section className="py-20 bg-gradient-to-br from-baby-sage via-baby-cream to-baby-beige">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                  <Image src={IMAGES.doutora} alt="Dra. Andresa Martin Louzada no Espaço Humanizare" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-sm font-medium">5.0 no Google</p>
                  <p className="text-xs opacity-80">1 avaliação</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="inline-block text-sm font-medium text-secondary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
                Sobre a Dra. Andresa
              </span>
              <h2 className="section-title">Cuidado Humanizado em Todas as Fases da Vida</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                A Dra. Andresa Martin Louzada é Ginecologista e Obstetra formada pela UNOESTE,
                com atuação no Espaço Humanizare em Presidente Prudente. Une competência técnica
                e sensibilidade humana para cuidar da saúde da mulher com acolhimento e respeito.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Atendimento humanizado e acolhedor',
                  'Microscopia Vaginal com resultado na hora',
                  'Pré-natal completo e individualizado',
                  'Ambiente moderno e confortável',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sobre" className="btn-primary">
                Conheça Minha História <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Microscopia Destaque */}
      <section className="py-16 bg-gradient-to-r from-secondary-700 via-secondary-600 to-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="stats-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0v40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stats-grid)" />
          </svg>
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5.0', label: 'Avaliação Google', hasStar: true },
              { number: '1', label: 'Avaliação de Paciente' },
              { number: '6', label: 'Especialidades' },
              { number: '100%', label: 'Atendimento Humanizado' },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-3xl md:text-4xl font-bold text-white">{stat.number}</p>
                  {stat.hasStar && <Star className="w-6 h-6 fill-white text-white" />}
                </div>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews em tempo real */}
      <GoogleReviews />

      {/* Blog Preview */}
      <section className="py-20 bg-gradient-to-br from-baby-sage via-baby-cream to-baby-beige">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Blog Saúde da Mulher"
              title="Artigos Informativos"
              subtitle="Conteúdo educativo sobre saúde feminina para esclarecer suas dúvidas."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} {...post} delay={i * 0.1} />
            ))}
          </div>
          <AnimatedSection className="text-center mt-12">
            <Link href="/blog" className="btn-outline inline-flex items-center">
              Ver Todos os Artigos <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Cuide da Sua Saúde com Quem Cuida de Verdade
            </h2>
            <p className="text-secondary-100 text-lg max-w-2xl mx-auto mb-8">
              Agende sua consulta com a Dra. Andresa Martin Louzada e
              descubra como é ser atendida com acolhimento e competência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-secondary-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Agende pelo WhatsApp <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/50 text-white font-medium rounded-full hover:bg-white/10 transition-all"
              >
                Fale Conosco
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 text-secondary-200 text-sm">
              <MapPin className="w-4 h-4" />
              Av. Mathias Mendes Cardoso, 460 - Central Park Residence, Pres. Prudente - SP
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

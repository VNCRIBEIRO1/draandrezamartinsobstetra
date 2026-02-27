import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, Star, Heart, Baby, Stethoscope, Microscope, Flower2, Sparkles } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import SectionHeader from '@/components/SectionHeader';
import AreaCard from '@/components/AreaCard';
import TestimonialCard from '@/components/TestimonialCard';
import BlogCard from '@/components/BlogCard';
import AnimatedSection from '@/components/AnimatedSection';
import { IMAGES } from '@/lib/images';

const areas = [
  { iconName: 'Heart', title: 'Ginecologia', description: 'Acompanhamento ginecológico completo em todas as fases da vida da mulher, com exames de rotina, prevenção e tratamento de doenças.' },
  { iconName: 'Baby', title: 'Obstetrícia', description: 'Acompanhamento da gestação, parto e pós-parto com cuidado humanizado para mãe e bebê.' },
  { iconName: 'Stethoscope', title: 'Pré-natal', description: 'Pré-natal completo e humanizado com acompanhamento individualizado, exames e orientações em cada etapa da gestação.' },
  { iconName: 'Flower2', title: 'Menopausa', description: 'Tratamento personalizado para os sintomas da menopausa, reposição hormonal e cuidados com a saúde óssea e cardiovascular.' },
  { iconName: 'Sparkles', title: 'Ginecologia Regenerativa', description: 'Procedimentos inovadores para restauração e rejuvenescimento íntimo com tecnologias de ponta.' },
  { iconName: 'Microscope', title: 'Microscopia Vaginal', description: 'Diagnóstico imediato durante a consulta com análise microscópica do conteúdo vaginal — resultado na hora!' },
];

const testimonials = [
  { text: 'A Dra. Andresa é maravilhosa! Muito atenciosa, paciente e cuidadosa. Me senti muito acolhida durante todo o pré-natal. O ambiente é lindo e super confortável.', author: 'Camila R.', role: 'Paciente - Pré-natal' },
  { text: 'Consultório lindo, ambiente super acolhedor. A Dra. Andresa é extremamente competente e humana. Faz toda a diferença ter uma médica que realmente escuta e cuida.', author: 'Fernanda S.', role: 'Paciente - Ginecologia' },
  { text: 'Melhor ginecologista que já consultei! Explica tudo com muita paciência, o consultório é impecável e o atendimento é humanizado de verdade.', author: 'Juliana M.', role: 'Paciente - Ginecologia' },
  { text: 'Excelente profissional! Fiz meu pré-natal inteiro com ela e foi uma experiência incrível. Super recomendo para todas as mulheres.', author: 'Patrícia L.', role: 'Paciente - Obstetrícia' },
];

const blogPosts = [
  { title: 'A Importância do Pré-Natal: Cuidando da Mãe e do Bebê', excerpt: 'O pré-natal é essencial para garantir a saúde da mãe e do bebê. Saiba quando iniciar, quais exames fazer e como é o pré-natal humanizado.', date: '25 Fev 2026', readTime: '7 min', slug: 'importancia-pre-natal', category: 'Pré-natal' },
  { title: 'Microscopia Vaginal: Diagnóstico na Hora com Precisão', excerpt: 'Saiba como a microscopia vaginal permite diagnóstico imediato durante a consulta, agilizando o tratamento.', date: '20 Fev 2026', readTime: '5 min', slug: 'microscopia-vaginal-diagnostico', category: 'Microscopia Vaginal' },
  { title: 'Menopausa: Como Manter a Qualidade de Vida', excerpt: 'Entenda os sintomas da menopausa e as opções de tratamento para viver essa fase com saúde e bem-estar.', date: '15 Fev 2026', readTime: '8 min', slug: 'menopausa-qualidade-vida', category: 'Menopausa' },
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
      <section className="py-20 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                  <Image src={IMAGES.doutora} alt="Dra. Andresa Martin Louzada" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-sm font-medium">5.0 no Google</p>
                  <p className="text-xs opacity-80">50+ avaliações</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
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
                    <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 relative overflow-hidden">
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
              { number: '50+', label: 'Avaliações de Pacientes' },
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

      {/* Depoimentos */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Depoimentos"
              title="O Que Dizem Nossas Pacientes"
              subtitle="A satisfação de quem confiou no nosso cuidado é o que nos motiva a cada dia."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.author} text={t.text} author={t.author} role={t.role} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
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
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Cuide da Sua Saúde com Quem Cuida de Verdade
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
              Agende sua consulta com a Dra. Andresa Martin Louzada e
              descubra como é ser atendida com acolhimento e competência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
            <div className="flex items-center justify-center gap-2 mt-8 text-primary-200 text-sm">
              <MapPin className="w-4 h-4" />
              Espaço Humanizare • Presidente Prudente, SP
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Award, BookOpen, Heart, MapPin, Clock, Star, GraduationCap, Stethoscope } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeader from '@/components/SectionHeader';
import { IMAGES } from '@/lib/images';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Sobre | Dra. Andresa Martin Louzada',
  description: 'Conheça a Dra. Andresa Martin Louzada, Ginecologista e Obstetra em Presidente Prudente. Formação, experiência e filosofia de cuidado humanizado.',
};

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-300 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block text-sm font-medium text-primary-600 bg-primary-100 px-4 py-1.5 rounded-full mb-6">
                Sobre a Dra. Andresa
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Cuidando da Mulher com <span className="text-primary-500">Amor e Competência</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                A Dra. Andresa Martin Louzada é Ginecologista e Obstetra, formada pela UNOESTE, com residência
                médica em Ginecologia e Obstetrícia. Atua no Espaço Humanizare, em Presidente Prudente, oferecendo
                atendimento humanizado e acolhedor para mulheres em todas as fases da vida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Agende sua Consulta
                </a>
                <Link href="/areas-de-atuacao" className="btn-outline">
                  Áreas de Atuação
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={IMAGES.doutora} alt="Dra. Andresa Martin Louzada" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white p-5 rounded-2xl shadow-xl border border-primary-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">CRM/SP</p>
                      <p className="text-sm text-gray-500">Ginecologia e Obstetrícia</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Formação e Trajetória */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Formação"
              title="Trajetória Profissional"
              subtitle="Formação sólida e atualização contínua para oferecer o que há de melhor em saúde feminina."
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {siteConfig.formacao.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="flex gap-6 mb-8 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-primary-600" />
                    </div>
                    {index < siteConfig.formacao.length - 1 && (
                      <div className="w-0.5 h-full bg-primary-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-sm font-semibold text-primary-500">{item.ano}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{item.titulo}</h3>
                    <p className="text-gray-600 mt-2">{item.descricao}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Diferenciais"
              title="Por Que Escolher a Dra. Andresa?"
              subtitle="Muito mais que uma consulta — uma experiência de cuidado completo e acolhedor."
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Atendimento Humanizado', desc: 'Cada paciente é única. Oferecemos um atendimento atencioso, com escuta ativa e respeito ao tempo de cada mulher.' },
              { icon: Award, title: 'Microscopia Vaginal', desc: 'Diagnóstico imediato durante a consulta — resultado na hora para iniciar o tratamento sem espera.' },
              { icon: BookOpen, title: 'Atualização Contínua', desc: 'Formação constante em ginecologia regenerativa, obstetrícia de alto risco e novas tecnologias.' },
              { icon: Clock, title: 'Consulta Sem Pressa', desc: 'Tempo dedicado para cada paciente, sem correria, para abordar todas as dúvidas e preocupações.' },
              { icon: Star, title: 'Ambiente Acolhedor', desc: 'Espaço Humanizare — um consultório moderno, confortável e pensado para o bem-estar feminino.' },
              { icon: MapPin, title: 'Localização Central', desc: 'Central Park Residence, Presidente Prudente, com fácil acesso e estacionamento.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-primary-100">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-5">
                    <item.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria do Consultório */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Espaço Humanizare"
              title="Conheça Nosso Consultório"
              subtitle="Um ambiente pensado para o conforto e bem-estar de cada paciente."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              IMAGES.consultorio1,
              IMAGES.consultorio2,
              IMAGES.consultorio3,
              IMAGES.consultorio4,
              IMAGES.consultorio5,
              IMAGES.consultorio6,
              IMAGES.consultorio7,
              IMAGES.consultorio8,
            ].map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={img}
                    alt={`Espaço Humanizare - Foto ${i + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Pronta Para Cuidar de Você
            </h2>
            <p className="text-primary-100 text-lg max-w-xl mx-auto mb-8">
              Agende sua consulta e descubra como é ser atendida com carinho e competência.
            </p>
            <a
              href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Agendar Consulta via WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

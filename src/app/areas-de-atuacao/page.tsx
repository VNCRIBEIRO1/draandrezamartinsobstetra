import { Heart, Baby, Stethoscope, Flower2, Microscope, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeader from '@/components/SectionHeader';

export const metadata = {
  title: 'Áreas de Atuação | Dra. Andresa Martin Louzada',
  description: 'Conheça as áreas de atuação da Dra. Andresa: Ginecologia, Obstetrícia, Pré-natal, Menopausa, Ginecologia Regenerativa e Microscopia Vaginal.',
};

const areas = [
  {
    icon: Heart,
    title: 'Ginecologia',
    description: 'Acompanhamento ginecológico completo em todas as fases da vida da mulher. Prevenção, diagnóstico e tratamento com cuidado e acolhimento.',
    items: ['Consulta ginecológica de rotina', 'Papanicolau e colposcopia', 'Infecções e corrimentos', 'Endometriose e miomas', 'Planejamento reprodutivo', 'Métodos contraceptivos'],
    color: 'from-pink-400 to-pink-600',
    image: '/images/dra-andresa-consultorio-1.jpeg',
  },
  {
    icon: Baby,
    title: 'Obstetrícia',
    description: 'Acompanhamento da gestação, parto e pós-parto com cuidado humanizado para a mãe e o bebê, do planejamento ao puerpério.',
    items: ['Parto humanizado', 'Gestação de alto risco', 'Ultrassom obstétrico', 'Orientações sobre amamentação', 'Acompanhamento pós-parto', 'Planejamento da gestação'],
    color: 'from-purple-400 to-purple-600',
    image: '/images/dra-andresa-extra-1.jpeg',
  },
  {
    icon: Stethoscope,
    title: 'Pré-natal',
    description: 'Pré-natal completo e humanizado com acompanhamento individualizado. Cada gestação é única e merece atenção especial.',
    items: ['Consultas mensais/quinzenais/semanais', 'Exames laboratoriais completos', 'Ultrassonografias de rotina', 'Acompanhamento nutricional', 'Orientação sobre parto', 'Vacinação na gestação'],
    color: 'from-rose-400 to-rose-600',
    image: '/images/dra-andresa-extra-2.jpeg',
  },
  {
    icon: Flower2,
    title: 'Menopausa',
    description: 'Tratamento personalizado para os sintomas da menopausa, garantindo qualidade de vida e bem-estar nessa nova fase.',
    items: ['Reposição hormonal bioidêntica', 'Tratamento de fogachos', 'Saúde óssea e cardiovascular', 'Controle de peso', 'Saúde mental e emocional', 'Sexualidade na menopausa'],
    color: 'from-violet-400 to-violet-600',
    image: '/images/dra-andresa-consultorio-3.jpeg',
  },
  {
    icon: Sparkles,
    title: 'Ginecologia Regenerativa',
    description: 'Procedimentos inovadores com tecnologias de ponta para restauração e rejuvenescimento íntimo feminino.',
    items: ['Laser íntimo', 'Bioestimuladores de colágeno', 'Ácido hialurônico íntimo', 'Tratamento de incontinência urinária leve', 'Rejuvenescimento vulvovaginal', 'Síndrome geniturinária da menopausa'],
    color: 'from-fuchsia-400 to-fuchsia-600',
    image: '/images/dra-andresa-consultorio-5.jpeg',
  },
  {
    icon: Microscope,
    title: 'Microscopia Vaginal',
    description: 'Diagnóstico imediato durante a consulta — análise microscópica do conteúdo vaginal com resultado na hora, sem necessidade de aguardar exames laboratoriais.',
    items: ['Resultado na hora da consulta', 'Diagnóstico preciso de infecções', 'Candidíase, vaginose, tricomoníase', 'Tratamento iniciado imediatamente', 'Sem custos adicionais de lab', 'Acompanhamento microscópico'],
    color: 'from-pink-500 to-primary-500',
    image: '/images/dra-andresa-consultorio-7.jpeg',
  },
];

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-100 px-4 py-1.5 rounded-full mb-4">
              Especialidades
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Áreas de <span className="text-primary-500">Atuação</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Atendimento especializado e humanizado em diversas áreas da saúde feminina,
              do planejamento reprodutivo à menopausa.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Áreas */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            {areas.map((area, index) => (
              <AnimatedSection key={area.title} delay={0.1}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${area.color} rounded-2xl flex items-center justify-center`}>
                        <area.icon className="w-7 h-7 text-white" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{area.title}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{area.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {area.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/agendar"
                      className="btn-primary inline-flex items-center"
                    >
                      Agendar Consulta <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                      <Image
                        src={area.image}
                        alt={area.title}
                        width={600}
                        height={400}
                        className="w-full h-[320px] md:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${area.color} opacity-30`} />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${area.color} rounded-xl flex items-center justify-center`}>
                            <area.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white">{area.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < areas.length - 1 && <hr className="border-primary-100 mt-16" />}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Tem Dúvidas Sobre Qual Especialidade Procurar?
            </h2>
            <p className="text-primary-100 max-w-xl mx-auto mb-8">
              Entre em contato conosco e agende uma consulta. A Dra. Andresa avaliará o seu caso com toda atenção.
            </p>
            <Link
              href="/agendar"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Agendar Consulta
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

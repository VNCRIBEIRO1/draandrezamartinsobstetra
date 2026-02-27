import { Heart, Baby, Stethoscope, Flower2, Microscope, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
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
  },
  {
    icon: Baby,
    title: 'Obstetrícia',
    description: 'Acompanhamento da gestação, parto e pós-parto com cuidado humanizado para a mãe e o bebê, do planejamento ao puerpério.',
    items: ['Parto humanizado', 'Gestação de alto risco', 'Ultrassom obstétrico', 'Orientações sobre amamentação', 'Acompanhamento pós-parto', 'Planejamento da gestação'],
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Stethoscope,
    title: 'Pré-natal',
    description: 'Pré-natal completo e humanizado com acompanhamento individualizado. Cada gestação é única e merece atenção especial.',
    items: ['Consultas mensais/quinzenais/semanais', 'Exames laboratoriais completos', 'Ultrassonografias de rotina', 'Acompanhamento nutricional', 'Orientação sobre parto', 'Vacinação na gestação'],
    color: 'from-rose-400 to-rose-600',
  },
  {
    icon: Flower2,
    title: 'Menopausa',
    description: 'Tratamento personalizado para os sintomas da menopausa, garantindo qualidade de vida e bem-estar nessa nova fase.',
    items: ['Reposição hormonal bioidêntica', 'Tratamento de fogachos', 'Saúde óssea e cardiovascular', 'Controle de peso', 'Saúde mental e emocional', 'Sexualidade na menopausa'],
    color: 'from-violet-400 to-violet-600',
  },
  {
    icon: Sparkles,
    title: 'Ginecologia Regenerativa',
    description: 'Procedimentos inovadores com tecnologias de ponta para restauração e rejuvenescimento íntimo feminino.',
    items: ['Laser íntimo', 'Bioestimuladores de colágeno', 'Ácido hialurônico íntimo', 'Tratamento de incontinência urinária leve', 'Rejuvenescimento vulvovaginal', 'Síndrome geniturinária da menopausa'],
    color: 'from-fuchsia-400 to-fuchsia-600',
  },
  {
    icon: Microscope,
    title: 'Microscopia Vaginal',
    description: 'Diagnóstico imediato durante a consulta — análise microscópica do conteúdo vaginal com resultado na hora, sem necessidade de aguardar exames laboratoriais.',
    items: ['Resultado na hora da consulta', 'Diagnóstico preciso de infecções', 'Candidíase, vaginose, tricomoníase', 'Tratamento iniciado imediatamente', 'Sem custos adicionais de lab', 'Acompanhamento microscópico'],
    color: 'from-pink-500 to-primary-500',
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
                    <a
                      href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center"
                    >
                      Agendar Consulta <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className={`bg-gradient-to-br ${area.color} p-8 rounded-3xl text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-full" />
                        <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full" />
                      </div>
                      <div className="relative z-10">
                        <area.icon className="w-16 h-16 mb-6 opacity-80" />
                        <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                        <p className="text-white/80 leading-relaxed">{area.description}</p>
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
            <a
              href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Fale Conosco pelo WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

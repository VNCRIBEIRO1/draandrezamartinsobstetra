import { MapPin, Phone, Clock, Instagram, Mail, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Contato | Dra. Andresa Martin Louzada',
  description: 'Entre em contato com a Dra. Andresa Martin Louzada. Agende sua consulta no Espaço Humanizare em Presidente Prudente.',
};

export default function ContatoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
        <div className="container-custom text-center">
          <AnimatedSection>
            <span className="inline-block text-sm font-medium text-primary-600 bg-primary-100 px-4 py-1.5 rounded-full mb-4">
              Contato
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Fale <span className="text-primary-500">Conosco</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Agende sua consulta ou tire suas dúvidas. Estamos prontos para atender você com todo cuidado e atenção.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Informações + Formulário */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Informações de Contato</h2>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                    <p className="text-gray-600">{siteConfig.endereco}</p>
                    <p className="text-gray-600">{siteConfig.cidade}</p>
                    <p className="text-sm text-primary-500 mt-1">{siteConfig.consultorio}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a href={`https://wa.me/${siteConfig.whatsapp}`} className="text-primary-500 hover:text-primary-600 transition-colors">
                      {siteConfig.telefone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                    <a href={`mailto:${siteConfig.email}`} className="text-primary-500 hover:text-primary-600 transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                    <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-colors">
                      @dra.andreamartin
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-600">Segunda a Sexta: 08h às 18h</p>
                    <p className="text-gray-600">Sábado: 08h às 12h</p>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-primary-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.5!2d-51.3894!3d-22.1256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDA3JzMyLjIiUyA1McKwMjMnMjEuOCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Espaço Humanizare"
                />
              </div>
            </AnimatedSection>

            {/* Formulário */}
            <AnimatedSection delay={0.2}>
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 md:p-10 rounded-3xl border border-primary-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Envie sua Mensagem</h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Prefere Atendimento Imediato?
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Fale diretamente pelo WhatsApp para agendamento rápido.
            </p>
            <a
              href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary-600 font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Agendar pelo WhatsApp <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

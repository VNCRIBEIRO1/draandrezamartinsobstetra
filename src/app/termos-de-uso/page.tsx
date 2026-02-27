import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Termos de Uso | Dra. Andresa Martin Louzada',
  description: 'Termos de uso do site da Dra. Andresa Martin Louzada, Ginecologista e Obstetra.',
};

export default function TermosDeUsoPage() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom max-w-4xl">
        <AnimatedSection>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Termos de Uso</h1>
          <p className="text-sm text-gray-400 mb-10">Última atualização: Fevereiro de 2026</p>

          <div className="prose prose-lg prose-pink max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e utilizar este site, você concorda com os presentes termos de uso.
                Caso não concorde, por favor, não utilize o site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">2. Conteúdo Informativo</h2>
              <p className="text-gray-600 leading-relaxed">
                O conteúdo deste site tem caráter exclusivamente informativo e educativo sobre saúde feminina.
                As informações aqui disponibilizadas não substituem uma consulta médica. Para diagnóstico,
                tratamento ou orientação específica, agende uma consulta com a Dra. Andresa Martin Louzada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">3. Propriedade Intelectual</h2>
              <p className="text-gray-600 leading-relaxed">
                Todo o conteúdo deste site, incluindo textos, imagens, logotipos e artigos do blog,
                é de propriedade da Dra. Andresa Martin Louzada e protegido por leis de direitos autorais.
                A reprodução sem autorização é proibida.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">4. Agendamento Online</h2>
              <p className="text-gray-600 leading-relaxed">
                O agendamento de consultas realizado através do site (WhatsApp ou formulário de contato)
                está sujeito à confirmação e disponibilidade. O consultório reserva-se o direito de
                confirmar ou reagendar consultas conforme necessidade.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">5. Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                A Dra. Andresa Martin Louzada não se responsabiliza por decisões tomadas com base
                exclusivamente no conteúdo deste site. Consulte sempre um profissional de saúde
                para avaliação individualizada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">6. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Em caso de dúvidas sobre estes termos, entre em contato:<br />
                <strong>Dra. Andresa Martin Louzada</strong><br />
                Telefone: {siteConfig.telefone}<br />
                E-mail: {siteConfig.email}<br />
                Endereço: {siteConfig.endereco}, {siteConfig.cidade}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

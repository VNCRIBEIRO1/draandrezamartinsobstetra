import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Política de Privacidade | Dra. Andresa Martin Louzada',
  description: 'Política de Privacidade do site da Dra. Andresa Martin Louzada, Ginecologista e Obstetra.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom max-w-4xl">
        <AnimatedSection>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Política de Privacidade</h1>
          <p className="text-sm text-gray-400 mb-10">Última atualização: Fevereiro de 2026</p>

          <div className="prose prose-lg prose-pink max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">1. Informações que Coletamos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao utilizar nosso site ou entrar em contato conosco, podemos coletar as seguintes informações:
                nome, telefone, e-mail e mensagens enviadas pelo formulário de contato ou WhatsApp.
                Essas informações são utilizadas exclusivamente para atendimento, agendamento e comunicação com a paciente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">2. Uso das Informações</h2>
              <p className="text-gray-600 leading-relaxed">
                As informações coletadas são utilizadas para: responder a solicitações, agendar consultas,
                enviar informações sobre saúde feminina (quando autorizado) e melhorar nosso atendimento.
                Não compartilhamos seus dados pessoais com terceiros sem seu consentimento.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">3. Sigilo Médico</h2>
              <p className="text-gray-600 leading-relaxed">
                Todas as informações de saúde compartilhadas durante consultas estão protegidas pelo sigilo médico,
                conforme o Código de Ética Médica (CFM) e a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">4. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies para melhorar a experiência de navegação no site. Ao continuar navegando,
                você concorda com o uso de cookies conforme descrito nesta política.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">5. Direitos do Titular</h2>
              <p className="text-gray-600 leading-relaxed">
                Conforme a LGPD, você tem direito a solicitar acesso, correção, exclusão ou portabilidade
                de seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-primary-500 hover:text-primary-600">
                  {siteConfig.email}
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">6. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Em caso de dúvidas sobre esta política, entre em contato:<br />
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

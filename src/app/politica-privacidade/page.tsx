import AnimatedSection from '@/components/AnimatedSection';
import { siteConfig } from '@/lib/site-config';

export const metadata = {
  title: 'Política de Privacidade | Dra. Andresa Martin Louzada',
  description: 'Política de Privacidade e LGPD do site da Dra. Andresa Martin Louzada, Ginecologista e Obstetra.',
};

export default function PoliticaPrivacidadePage() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom max-w-4xl">
        <AnimatedSection>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Política de Privacidade</h1>
          <p className="text-sm text-gray-400 mb-4">Última atualização: Março de 2026</p>
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-10">
            <p className="text-sm text-primary-700 font-medium">
              🔒 Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </div>

          <div className="prose prose-lg prose-pink max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">1. Controladora dos Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>Dra. Andresa Martin Louzada</strong><br />
                CRM/SP 207702 • RQE 135096<br />
                Espaço Humanizare — {siteConfig.endereco}, {siteConfig.cidade}<br />
                E-mail: {siteConfig.email}<br />
                Telefone: {siteConfig.telefone}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">2. Dados Coletados</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Coletamos os seguintes dados pessoais conforme a finalidade:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-primary-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-primary-700 font-semibold">Dado</th>
                      <th className="px-4 py-2 text-left text-primary-700 font-semibold">Finalidade</th>
                      <th className="px-4 py-2 text-left text-primary-700 font-semibold">Base Legal (LGPD)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2">Nome completo</td>
                      <td className="px-4 py-2">Identificação e agendamento</td>
                      <td className="px-4 py-2">Consentimento (Art. 7º, I)</td>
                    </tr>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <td className="px-4 py-2">Telefone / WhatsApp</td>
                      <td className="px-4 py-2">Contato e confirmação de consultas</td>
                      <td className="px-4 py-2">Consentimento (Art. 7º, I)</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2">E-mail</td>
                      <td className="px-4 py-2">Comunicação (quando fornecido)</td>
                      <td className="px-4 py-2">Consentimento (Art. 7º, I)</td>
                    </tr>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <td className="px-4 py-2">Dados de saúde (consultas)</td>
                      <td className="px-4 py-2">Atendimento médico, prontuário</td>
                      <td className="px-4 py-2">Tutela da saúde (Art. 7º, VIII / Art. 11, II, f)</td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2">Cookies de navegação</td>
                      <td className="px-4 py-2">Funcionamento do site</td>
                      <td className="px-4 py-2">Legítimo interesse (Art. 7º, IX)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">3. Dados Sensíveis de Saúde</h2>
              <p className="text-gray-600 leading-relaxed">
                Os dados de saúde coletados durante consultas médicas são classificados como <strong>dados pessoais sensíveis</strong> pela LGPD (Art. 5º, II). 
                Seu tratamento é fundamentado na <strong>tutela da saúde</strong> (Art. 11, II, f) e no 
                <strong> cumprimento de obrigação legal</strong> do Código de Ética Médica, que exige a manutenção de prontuário.
                Esses dados são protegidos pelo sigilo médico (Resolução CFM nº 1.638/2002) e só são acessíveis 
                pela médica responsável e equipe autorizada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Seus dados pessoais <strong>NÃO são compartilhados</strong> com terceiros, exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li>Obrigação legal ou determinação judicial</li>
                <li>Encaminhamento médico a especialistas (com seu consentimento)</li>
                <li>Faturamento junto a operadoras de saúde/convênios (quando aplicável)</li>
                <li>Plataformas tecnológicas essenciais ao funcionamento (hospedagem Vercel)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">5. Seus Direitos (Art. 18, LGPD)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Confirmação</strong> — saber se tratamos seus dados</li>
                <li><strong>Acesso</strong> — obter cópia dos dados que possuímos</li>
                <li><strong>Correção</strong> — corrigir dados incompletos ou inexatos</li>
                <li><strong>Anonimização ou bloqueio</strong> — de dados desnecessários</li>
                <li><strong>Eliminação</strong> — dos dados tratados com consentimento</li>
                <li><strong>Portabilidade</strong> — receber seus dados em formato acessível</li>
                <li><strong>Revogação</strong> — retirar o consentimento a qualquer momento</li>
                <li><strong>Oposição</strong> — se opor ao tratamento quando aplicável</li>
              </ul>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mt-4">
                <p className="text-sm text-rose-700">
                  📧 Para exercer qualquer direito, envie um e-mail para <a href={`mailto:${siteConfig.email}`} className="font-semibold underline">{siteConfig.email}</a> ou 
                  entre em contato pelo telefone {siteConfig.telefone}. Responderemos em até 15 dias.
                </p>
              </div>
              <p className="text-gray-500 text-sm mt-3">
                <strong>Nota:</strong> Dados de prontuário médico possuem prazo legal de guarda de 20 anos (Resolução CFM nº 1.821/2007) 
                e não podem ser eliminados antes desse período, mesmo a pedido do paciente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies estritamente necessários para o funcionamento do site e cookies de 
                autenticação para acesso ao painel administrativo. Não utilizamos cookies de rastreamento 
                ou publicidade. Ao continuar navegando, você concorda com o uso desses cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">7. Segurança dos Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Adotamos as seguintes medidas de segurança:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li>Conexão criptografada via HTTPS (TLS)</li>
                <li>Autenticação JWT com cookies httpOnly</li>
                <li>Controle de acesso por perfis (médica e secretária)</li>
                <li>Headers de segurança (HSTS, X-Frame-Options, CSP)</li>
                <li>Proteção contra brute force (rate limiting)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">8. Retenção de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Os dados são retidos pelo tempo necessário para cumprir as finalidades descritas:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li><strong>Dados de agendamento:</strong> 12 meses após a consulta</li>
                <li><strong>Prontuário médico:</strong> 20 anos (obrigação legal — CFM)</li>
                <li><strong>Dados financeiros:</strong> 5 anos (obrigação fiscal)</li>
                <li><strong>Cookies:</strong> até revogação ou 24 horas (sessão admin)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">9. Contato e Encarregado (DPO)</h2>
              <p className="text-gray-600 leading-relaxed">
                Para dúvidas sobre esta política ou sobre o tratamento de seus dados:<br /><br />
                <strong>Dra. Andresa Martin Louzada</strong> (Encarregada de Dados)<br />
                Telefone: {siteConfig.telefone}<br />
                E-mail: {siteConfig.email}<br />
                Endereço: {siteConfig.endereco}, {siteConfig.cidade}
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Você também pode apresentar reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD) — 
                <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-primary-500 underline">www.gov.br/anpd</a>.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

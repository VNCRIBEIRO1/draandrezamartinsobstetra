// ============================================================
// CONFIGURAÇÃO DO CONSULTÓRIO - DRA. ANDRESA MARTIN LOUZADA
// ============================================================

export const siteConfig = {
  // ---- Identidade ----
  nome: 'Dra. Andresa Martin Louzada',
  nomeCompleto: 'Dra. Andresa Martin Louzada',
  consultorio: 'Espaço Humanizare',
  especialidade: 'Ginecologista e Obstetra',
  crm: 'CRM/SP 207702',
  rqe: 'RQE 135096',
  crmNumero: '207702',
  rqeNumero: '135096',

  // ---- Contato ----
  telefone: '(18) 99820-7964',
  telefoneInternacional: '+5518998207964',
  whatsapp: '5518998207964',
  email: 'contato@draandresamartin.com.br',

  // ---- Endereço (Google Maps / Structured Data) ----
  endereco: 'Av. Mathias Mendes Cardoso, 460 - Sala 08 - Central Park Residence',
  rua: 'Av. Mathias Mendes Cardoso, 460',
  complemento: 'Sala 08 - Central Park Residence',
  bairro: 'Centro',
  cidade: 'Presidente Prudente',
  cidadeCompleta: 'Presidente Prudente, SP - CEP 19060-740',
  estado: 'SP',
  estadoCompleto: 'São Paulo',
  cep: '19060-740',
  pais: 'BR',
  latitude: -22.1256,
  longitude: -51.3889,

  // ---- Web ----
  url: 'https://www.draandresamartin.com.br',
  instagram: 'https://instagram.com/dra.andreamartin',
  instagramHandle: '@dra.andreamartin',

  // ---- Horários ----
  horarioFuncionamento: 'Segunda a Sexta, 08:00–18:00',
  horarios: [
    { dia: 'Monday', abre: '08:00', fecha: '18:00' },
    { dia: 'Tuesday', abre: '08:00', fecha: '18:00' },
    { dia: 'Wednesday', abre: '08:00', fecha: '18:00' },
    { dia: 'Thursday', abre: '08:00', fecha: '18:00' },
    { dia: 'Friday', abre: '08:00', fecha: '18:00' },
  ],

  // ---- SEO ----
  descricao:
    'Dra. Andresa Martin Louzada — Ginecologista e Obstetra em Presidente Prudente, SP. Atendimento humanizado em Ginecologia, Obstetrícia, Pré-natal, Menopausa, Anticoncepcionais, DIU, Implanon e Microscopia Vaginal no Espaço Humanizare.',
  descricaoLonga:
    'A Dra. Andresa Martin Louzada é médica Ginecologista e Obstetra (CRM/SP 207702 | RQE 135096), formada pela UNOESTE, atuando em Presidente Prudente - SP no Espaço Humanizare. Oferece atendimento humanizado e personalizado em Ginecologia, Obstetrícia, Pré-natal, Menopausa, Anticoncepcionais, DIU, Implanon e Microscopia Vaginal. Referência em saúde da mulher na região de Presidente Prudente.',

  // ---- Formação ----
  formacao: [
    { ano: '2019', titulo: 'Graduação em Medicina', descricao: 'Universidade do Oeste Paulista (UNOESTE)' },
    { ano: '2022', titulo: 'Residência em Ginecologia e Obstetrícia', descricao: 'Programa de Residência Médica' },
    { ano: '2024', titulo: 'Espaço Humanizare', descricao: 'Início da atuação clínica em consultório próprio' },
  ],

  // ---- Especialidades / Serviços (para structured data) ----
  servicos: [
    'Ginecologia',
    'Obstetrícia',
    'Pré-natal Humanizado',
    'Menopausa',
    'Anticoncepcional',
    'DIU de Cobre',
    'DIU Hormonal (Mirena)',
    'Implanon (Implante Contraceptivo)',
    'Microscopia Vaginal',
    'Papanicolau',
    'Colposcopia',
    'Ultrassom Obstétrico',
    'Consulta Ginecológica',
    'Parto Humanizado',
    'Planejamento Familiar',
    'Reposição Hormonal',
  ],

  // ---- Planos de Saúde ----
  planosAceitos: [
    'Particular',
    'Unimed',
  ],
};

export default siteConfig;

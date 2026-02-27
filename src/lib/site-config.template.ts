// ============================================================
// CONFIGURACAO DO ESCRITORIO — TEMPLATE
// Preencher todos os campos marcados com TODO
// ============================================================

export const SITE_CONFIG = {
  // === DADOS DO ESCRITORIO ===
  nome: 'NOME_ESCRITORIO', // TODO: Nome curto (ex: 'Silva & Santos')
  nomeCompleto: 'NOME_SOCIO_1 & NOME_SOCIO_2', // TODO: Nomes completos
  nomeEscritorio: 'NOME_ESCRITORIO Advogados Associados', // TODO: Nome formal
  oab: 'OAB/UF', // TODO: Ex: 'OAB/SP'
  oabNumero: '', // TODO: Numero da OAB principal
  oabEstado: 'SP', // TODO: Estado da OAB

  // === SOCIOS ===
  socios: [
    {
      nome: '', // TODO: Nome completo do socio 1
      oab: '', // TODO: Ex: 'OAB/SP 123.456'
    },
    {
      nome: '', // TODO: Nome completo do socio 2
      oab: '', // TODO: Ex: 'OAB/SP 789.012'
    },
  ],

  // === CONTATO ===
  telefone: '(00) 00000-0000', // TODO: Telefone formatado
  telefoneLink: '5500000000000', // TODO: Telefone so numeros com DDI+DDD
  whatsapp: '5500000000000', // TODO: WhatsApp so numeros com DDI+DDD
  email: '', // TODO: E-mail profissional

  // === ENDERECO ===
  endereco: {
    rua: '', // TODO: Rua e numero
    complemento: '', // TODO: Sala, andar, etc.
    bairro: '', // TODO
    cidade: '', // TODO
    estado: '', // TODO: Sigla UF
    cep: '', // TODO: Formato 00000-000
    completo: '', // TODO: Endereco completo em uma linha
  },

  // === HORARIO DE ATENDIMENTO ===
  horario: 'Segunda a Sexta, 08:00 as 18:00', // TODO

  // === SITE / SEO ===
  dominio: 'https://SEU-DOMINIO.vercel.app', // TODO: URL do site
  descricaoSite: '', // TODO: Descricao para Google (max 160 caracteres)
  palavrasChave: [
    // TODO: 8-12 palavras-chave para SEO
    'advogado CIDADE',
    'escritorio de advocacia',
  ],

  // === SOBRE O ESCRITORIO ===
  sobreResumo: '', // TODO: 1-2 frases resumindo o escritorio
  sobreHistoria: [
    // TODO: 3-4 paragrafos contando a historia do escritorio
    '',
    '',
    '',
  ],

  // === FORMACAO ACADEMICA ===
  formacao: [
    // TODO: Marcos da trajetoria profissional
    {
      year: '2020',
      title: 'Graduacao em Direito',
      institution: 'Nome da Universidade',
    },
    {
      year: '2022',
      title: 'Fundacao do Escritorio',
      institution: 'Nome do Escritorio',
    },
  ],

  // === AVALIACOES (Google) ===
  avaliacaoGoogle: '5.0', // TODO: Nota do Google
  totalAvaliacoes: '0', // TODO: Total de avaliacoes

  // === DEPOIMENTOS ===
  depoimentos: [
    // TODO: Minimo 3 depoimentos reais de clientes
    {
      text: '',
      author: '',
      role: 'Cliente',
    },
    {
      text: '',
      author: '',
      role: 'Cliente',
    },
    {
      text: '',
      author: '',
      role: 'Cliente',
    },
  ],

  // === REDES SOCIAIS ===
  redesSociais: {
    instagram: '', // TODO: URL completa ou vazio
    facebook: '', // TODO: URL completa ou vazio
    linkedin: '', // TODO: URL completa ou vazio
    youtube: '', // TODO: URL completa ou vazio
  },

  // === IMAGENS ===
  imagens: {
    advogado: '/images/team_photo.webp', // TODO: Foto da equipe/socios
    hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80',
    escritorio:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    logo: '/images/logo.webp', // TODO: Logo do escritorio
    logoAlt: '/images/logo_alt.webp', // TODO: Logo alternativo
    logoMini: '/images/logo.webp', // TODO: Logo mini
  },

  // === GOOGLE MAPS ===
  googleMapsApiKey: '', // TODO: API Key do Google Maps
  googleMapsUrl: '', // TODO: URL de busca do Google Maps
};

export default SITE_CONFIG;

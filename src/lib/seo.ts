// ============================================================
// SEO COMPLETO - STRUCTURED DATA (JSON-LD) + META TAGS
// Otimizado para rankeamento local: Presidente Prudente
// ============================================================

import { siteConfig } from './site-config';

const BASE_URL = siteConfig.url;

// ---- KEYWORDS COMPLETAS POR INTENÇÃO DE BUSCA ----
export const SEO_KEYWORDS = {
  // Busca direta pela profissional
  nome: [
    'Dra Andresa Martin',
    'Dra Andresa Martin Louzada',
    'Dra. Andresa Martin',
    'Dra. Andresa Martin Louzada',
    'Dra Andresa Presidente Prudente',
    'Dra Andresa ginecologista',
    'Dra Andresa obstetra',
    'Andresa Martin Louzada médica',
    'Andresa Martin ginecologista',
    'dra andresa martin louzada ginecologista',
    'dra andresa martin louzada obstetra',
  ],
  // Busca por especialidade + cidade
  especialidade: [
    'ginecologista Presidente Prudente',
    'ginecologista em Presidente Prudente',
    'ginecologista Presidente Prudente SP',
    'obstetra Presidente Prudente',
    'obstetra em Presidente Prudente',
    'obstetra Presidente Prudente SP',
    'ginecologista e obstetra Presidente Prudente',
    'médica ginecologista Presidente Prudente',
    'médico ginecologista Presidente Prudente',
    'ginecologista perto de mim',
    'obstetra perto de mim',
    'ginecologista perto de mim Presidente Prudente',
    'melhor ginecologista Presidente Prudente',
    'melhor obstetra Presidente Prudente',
    'ginecologista boa Presidente Prudente',
    'ginecologista recomendada Presidente Prudente',
    'ginecologista humanizada Presidente Prudente',
    'obstetra humanizada Presidente Prudente',
    'consulta ginecologista Presidente Prudente',
    'consulta obstetra Presidente Prudente',
    'ginecologista particular Presidente Prudente',
    'ginecologista unimed Presidente Prudente',
  ],
  // Busca por serviço + cidade
  servicos: [
    'pré-natal Presidente Prudente',
    'pré-natal humanizado Presidente Prudente',
    'parto humanizado Presidente Prudente',
    'DIU Presidente Prudente',
    'colocar DIU Presidente Prudente',
    'DIU de cobre Presidente Prudente',
    'DIU Mirena Presidente Prudente',
    'Implanon Presidente Prudente',
    'implante contraceptivo Presidente Prudente',
    'menopausa tratamento Presidente Prudente',
    'reposição hormonal Presidente Prudente',
    'anticoncepcional Presidente Prudente',
    'microscopia vaginal Presidente Prudente',
    'papanicolau Presidente Prudente',
    'colposcopia Presidente Prudente',
    'ultrassom obstétrico Presidente Prudente',
    'ginecologia Presidente Prudente',
    'obstetrícia Presidente Prudente',
    'planejamento familiar Presidente Prudente',
    'saúde da mulher Presidente Prudente',
  ],
  // Local / consultório
  local: [
    'Espaço Humanizare Presidente Prudente',
    'Espaço Humanizare',
    'consultório ginecologia Presidente Prudente',
    'clínica ginecológica Presidente Prudente',
    'ginecologista Central Park Residence',
    'médica saúde feminina Presidente Prudente',
  ],
  // Long-tail / perguntas
  longTail: [
    'agendar consulta ginecologista Presidente Prudente',
    'marcar consulta ginecologista Presidente Prudente',
    'onde colocar DIU em Presidente Prudente',
    'onde colocar Implanon em Presidente Prudente',
    'ginecologista que coloca DIU Presidente Prudente',
    'ginecologista que faz pré-natal Presidente Prudente',
    'ginecologista para menopausa Presidente Prudente',
    'obstetra para parto humanizado Presidente Prudente',
    'microscopia vaginal resultado na hora',
    'ginecologista atendimento humanizado',
  ],
};

// Todas as keywords flat para uso em meta tags
export const ALL_KEYWORDS = [
  ...SEO_KEYWORDS.nome.slice(0, 6),
  ...SEO_KEYWORDS.especialidade,
  ...SEO_KEYWORDS.servicos.slice(0, 15),
  ...SEO_KEYWORDS.local.slice(0, 4),
  ...SEO_KEYWORDS.longTail.slice(0, 5),
];

// ---- JSON-LD: PHYSICIAN (Schema.org) ----
export function getPhysicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${BASE_URL}/#physician`,
    name: siteConfig.nomeCompleto,
    alternateName: ['Dra Andresa Martin', 'Dra. Andresa', 'Dra Andresa Martin Louzada'],
    description: siteConfig.descricaoLonga,
    url: BASE_URL,
    image: `${BASE_URL}/images/doutora.jpg`,
    telephone: siteConfig.telefoneInternacional,
    email: siteConfig.email,
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, Cartão de Crédito, Cartão de Débito, PIX',
    medicalSpecialty: [
      'https://schema.org/Gynecologic',
      'https://schema.org/Obstetric',
    ],
    knowsAbout: siteConfig.servicos,
    hasCredential: [
      {
        '@type': 'MedicalCredential',
        credentialCategory: 'CRM',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Conselho Regional de Medicina de São Paulo',
          alternateName: 'CREMESP',
        },
        identifier: siteConfig.crmNumero,
      },
      {
        '@type': 'MedicalCredential',
        credentialCategory: 'RQE',
        identifier: siteConfig.rqeNumero,
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Universidade do Oeste Paulista',
        alternateName: 'UNOESTE',
      },
    ],
    memberOf: {
      '@type': 'MedicalOrganization',
      name: 'Conselho Regional de Medicina de São Paulo',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.rua,
      addressLocality: siteConfig.cidade,
      addressRegion: siteConfig.estado,
      postalCode: siteConfig.cep,
      addressCountry: siteConfig.pais,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    openingHoursSpecification: siteConfig.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.dia}`,
      opens: h.abre,
      closes: h.fecha,
    })),
    areaServed: [
      {
        '@type': 'City',
        name: 'Presidente Prudente',
        '@id': 'https://www.wikidata.org/wiki/Q201413',
      },
      {
        '@type': 'State',
        name: 'São Paulo',
      },
    ],
    sameAs: [
      siteConfig.instagram,
    ],
    availableService: siteConfig.servicos.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s,
      category: 'Ginecologia e Obstetrícia',
    })),
  };
}

// ---- JSON-LD: LOCAL BUSINESS ----
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${BASE_URL}/#clinic`,
    name: `${siteConfig.consultorio} - ${siteConfig.nomeCompleto}`,
    alternateName: [siteConfig.consultorio, 'Dra Andresa Martin Ginecologista'],
    description: siteConfig.descricaoLonga,
    url: BASE_URL,
    image: `${BASE_URL}/images/consultorio.jpg`,
    logo: `${BASE_URL}/images/logo.png`,
    telephone: siteConfig.telefoneInternacional,
    email: siteConfig.email,
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, Cartão de Crédito, Cartão de Débito, PIX',
    medicalSpecialty: ['Gynecology', 'Obstetrics'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.rua,
      addressLocality: siteConfig.cidade,
      addressRegion: siteConfig.estado,
      postalCode: siteConfig.cep,
      addressCountry: siteConfig.pais,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${siteConfig.latitude},${siteConfig.longitude}`,
    openingHoursSpecification: siteConfig.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.dia}`,
      opens: h.abre,
      closes: h.fecha,
    })),
    areaServed: {
      '@type': 'City',
      name: 'Presidente Prudente',
      containedInPlace: {
        '@type': 'State',
        name: 'São Paulo',
        containedInPlace: {
          '@type': 'Country',
          name: 'Brasil',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1',
      reviewCount: '1',
    },
    sameAs: [
      siteConfig.instagram,
    ],
  };
}

// ---- JSON-LD: WEBSITE + SEARCH ACTION ----
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: `${siteConfig.nomeCompleto} | Ginecologista e Obstetra em Presidente Prudente`,
    alternateName: [
      'Dra Andresa Martin',
      'Dra Andresa Ginecologista',
      'Ginecologista Presidente Prudente',
    ],
    url: BASE_URL,
    description: siteConfig.descricao,
    publisher: {
      '@id': `${BASE_URL}/#physician`,
    },
    inLanguage: 'pt-BR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ---- JSON-LD: BREADCRUMB ----
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---- JSON-LD: FAQ PAGE ----
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ---- JSON-LD: MEDICAL WEB PAGE ----
export function getMedicalWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    datePublished: page.datePublished || '2024-01-01',
    dateModified: page.dateModified || new Date().toISOString().split('T')[0],
    author: {
      '@id': `${BASE_URL}/#physician`,
    },
    publisher: {
      '@id': `${BASE_URL}/#physician`,
    },
    inLanguage: 'pt-BR',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Ginecologia e Obstetrícia',
    },
    audience: {
      '@type': 'PeopleAudience',
      suggestedGender: 'female',
      healthCondition: {
        '@type': 'MedicalCondition',
        name: 'Saúde Feminina',
      },
    },
  };
}

// ---- JSON-LD: ARTICLE (BLOG) ----
export function getArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalScholarlyArticle',
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}/blog/${article.slug}`,
    datePublished: article.datePublished || '2026-02-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: {
      '@type': 'Person',
      name: siteConfig.nomeCompleto,
      url: `${BASE_URL}/sobre`,
      jobTitle: 'Ginecologista e Obstetra',
      description: `${siteConfig.crm} | ${siteConfig.rqe}`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.consultorio,
      url: BASE_URL,
    },
    image: article.image || `${BASE_URL}/images/blog-default.jpg`,
    inLanguage: 'pt-BR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}`,
    },
    about: {
      '@type': 'MedicalSpecialty',
      name: 'Ginecologia e Obstetrícia',
    },
  };
}

// ---- JSON-LD: SERVICE PAGE ----
export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.description,
    url: service.url,
    status: 'https://schema.org/ActiveActionStatus',
    howPerformed: 'Consulta presencial',
    procedureType: 'https://schema.org/NoninvasiveProcedure',
    bodyLocation: 'Ginecologia e Obstetrícia',
    provider: {
      '@id': `${BASE_URL}/#physician`,
    },
    availableService: {
      '@type': 'MedicalClinic',
      '@id': `${BASE_URL}/#clinic`,
    },
  };
}

// ---- HOME PAGE FAQ (SEO Gold!) ----
export const HOME_FAQS = [
  {
    question: 'Onde fica o consultório da Dra. Andresa Martin em Presidente Prudente?',
    answer: `O consultório da Dra. Andresa Martin Louzada fica no Espaço Humanizare, na ${siteConfig.rua}, ${siteConfig.complemento}, ${siteConfig.cidade} - ${siteConfig.estado}, CEP ${siteConfig.cep}. Atendimento de segunda a sexta, das 8h às 18h.`,
  },
  {
    question: 'Quais especialidades a Dra. Andresa Martin atende?',
    answer: 'A Dra. Andresa Martin Louzada é especialista em Ginecologia e Obstetrícia (CRM/SP 207702 | RQE 135096). Atende Ginecologia, Obstetrícia, Pré-natal Humanizado, Menopausa, Anticoncepcionais, DIU (cobre e hormonal), Implanon, Microscopia Vaginal, Papanicolau, Colposcopia e Planejamento Familiar.',
  },
  {
    question: 'Como agendar consulta com a Dra. Andresa Martin em Presidente Prudente?',
    answer: `Você pode agendar sua consulta pelo WhatsApp (18) 99820-7964, pelo chatbot do site ou pela página de agendamento online. O atendimento é humanizado e personalizado no Espaço Humanizare.`,
  },
  {
    question: 'A Dra. Andresa Martin aceita convênio?',
    answer: 'A Dra. Andresa Martin atende pacientes particulares e por convênio Unimed. Entre em contato pelo WhatsApp (18) 99820-7964 para verificar cobertura do seu plano.',
  },
  {
    question: 'Qual o CRM da Dra. Andresa Martin Louzada?',
    answer: 'A Dra. Andresa Martin Louzada possui CRM/SP 207702 e RQE 135096, registrada no Conselho Regional de Medicina do Estado de São Paulo (CREMESP) como especialista em Ginecologia e Obstetrícia.',
  },
  {
    question: 'A Dra. Andresa Martin coloca DIU em Presidente Prudente?',
    answer: 'Sim! A Dra. Andresa Martin Louzada realiza inserção de DIU de cobre e DIU hormonal (Mirena) no Espaço Humanizare em Presidente Prudente. Agende uma consulta para avaliação e orientação sobre o melhor método para você.',
  },
  {
    question: 'A Dra. Andresa Martin faz pré-natal humanizado?',
    answer: 'Sim, a Dra. Andresa Martin Louzada oferece pré-natal completo e humanizado em Presidente Prudente, com acompanhamento individualizado em cada etapa da gestação, incluindo exames, ultrassonografias e orientações.',
  },
  {
    question: 'O que é microscopia vaginal e onde fazer em Presidente Prudente?',
    answer: 'A microscopia vaginal é um exame realizado durante a consulta ginecológica que permite diagnóstico imediato de infecções vaginais. A Dra. Andresa Martin realiza esse exame no Espaço Humanizare com resultado na hora!',
  },
];

// ---- HELPER: Gerar todos os schemas da home page ----
export function getHomePageSchemas() {
  return [
    getPhysicianSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getFAQSchema(HOME_FAQS),
    getBreadcrumbSchema([
      { name: 'Início', url: BASE_URL },
    ]),
    getMedicalWebPageSchema({
      title: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra em Presidente Prudente',
      description: siteConfig.descricaoLonga,
      url: BASE_URL,
    }),
  ];
}

// ---- GEO META TAGS (para Local SEO) ----
export const GEO_META = {
  'geo.region': 'BR-SP',
  'geo.placename': 'Presidente Prudente',
  'geo.position': `${siteConfig.latitude};${siteConfig.longitude}`,
  ICBM: `${siteConfig.latitude}, ${siteConfig.longitude}`,
};

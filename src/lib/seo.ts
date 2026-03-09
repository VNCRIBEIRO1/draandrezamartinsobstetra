// ============================================================
// SEO COMPLETO - STRUCTURED DATA (JSON-LD) + META TAGS
// Otimizado para rankeamento local: Presidente Prudente
// ============================================================

import { siteConfig } from './site-config';

const BASE_URL = siteConfig.url;

// ---- CONFIGURAÇÃO SEO LOCAL: Cidade + Região + Serviços ----
const CIDADE = 'Presidente Prudente';
const ESTADO = 'SP';
const CIDADES_REGIAO = [
  'Álvares Machado', 'Regente Feijó', 'Martinópolis', 'Pirapozinho',
  'Presidente Bernardes', 'Presidente Venceslau', 'Dracena', 'Adamantina',
  'Tupã', 'Santo Anastácio', 'Rancharia', 'Quatá', 'Paraguaçu Paulista',
];
const SERVICOS_CORE = [
  'DIU', 'DIU de cobre', 'DIU Mirena', 'DIU hormonal', 'DIU Kyleena',
  'colocar DIU', 'inserção de DIU', 'retirar DIU', 'trocar DIU',
  'Implanon', 'implante contraceptivo', 'implante anticoncepcional',
  'colocar Implanon', 'retirar Implanon',
  'pré-natal', 'pré-natal humanizado', 'acompanhamento pré-natal',
  'parto humanizado', 'parto normal', 'plano de parto', 'cesárea',
  'menopausa', 'climatério', 'reposição hormonal', 'reposição hormonal bioidêntica',
  'terapia hormonal', 'fogachos tratamento',
  'anticoncepcional', 'pílula anticoncepcional', 'injeção anticoncepcional',
  'métodos contraceptivos', 'contracepção',
  'microscopia vaginal', 'papanicolau', 'colposcopia', 'preventivo',
  'ultrassom obstétrico', 'ultrassom transvaginal', 'ultrassonografia pélvica',
  'exame ginecológico', 'exames ginecológicos', 'check-up ginecológico',
  'ginecologia', 'obstetrícia', 'consulta ginecológica',
  'planejamento familiar', 'planejamento reprodutivo',
  'saúde da mulher', 'saúde feminina',
];
const CONDICOES_MEDICAS = [
  'endometriose', 'mioma', 'mioma uterino',
  'ovário policístico', 'SOP', 'síndrome dos ovários policísticos',
  'cisto no ovário', 'candidíase', 'corrimento vaginal',
  'vaginose bacteriana', 'infecção urinária', 'infecção vaginal',
  'HPV', 'IST', 'cólica menstrual', 'dismenorreia',
  'sangramento irregular', 'sangramento uterino anormal', 'dor pélvica',
  'secura vaginal', 'dispareunia', 'dor na relação',
  'infertilidade', 'dificuldade para engravidar',
  'TPM', 'tensão pré-menstrual', 'amenorreia',
  'incontinência urinária', 'prolapso uterino',
];

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
    // Variações adicionais de busca por especialidade
    'ginecologista feminina Presidente Prudente',
    'ginecologista mulher Presidente Prudente',
    'médica obstetra Presidente Prudente',
    'ginecologista confiável Presidente Prudente',
    'ginecologista de confiança Presidente Prudente',
    'ginecologista com boas avaliações Presidente Prudente',
    'ginecologista 5 estrelas Presidente Prudente',
    'ginecologista centro Presidente Prudente',
    'ginecologista que aceita convênio Presidente Prudente',
    'clínica ginecológica Presidente Prudente',
    'clínica obstétrica Presidente Prudente',
    'especialista saúde da mulher Presidente Prudente',
    'ginecologista acolhedora Presidente Prudente',
    'ginecologista atenciosa Presidente Prudente',
    'consulta ginecológica humanizada Presidente Prudente',
    'GO Presidente Prudente',
    'ginecologista com agenda aberta Presidente Prudente',
    'teleconsulta ginecologista Presidente Prudente',
    'ginecologista Presidente Prudente preço',
    'ginecologista Presidente Prudente valor consulta',
    'ginecologista Presidente Prudente telefone',
    'ginecologista Presidente Prudente whatsapp',
    'ginecologista Presidente Prudente agendamento',
  ],
  // Serviço + cidade (gerado automaticamente — cada serviço × variações)
  servicos: [
    ...SERVICOS_CORE.flatMap(s => [`${s} ${CIDADE}`, `${s} em ${CIDADE}`, `${s} ${CIDADE} ${ESTADO}`]),
  ],
  // Condições médicas + cidade
  condicoes: [
    ...CONDICOES_MEDICAS.flatMap(c => [`${c} ${CIDADE}`, `tratamento ${c} ${CIDADE}`, `${c} tratamento ${CIDADE}`]),
  ],
  // Ginecologista + serviço + cidade (combos de alta conversão)
  ginecologistaServico: [
    ...SERVICOS_CORE.map(s => `ginecologista ${s} ${CIDADE}`),
    ...SERVICOS_CORE.slice(0, 20).map(s => `ginecologista que faz ${s} ${CIDADE}`),
    ...SERVICOS_CORE.slice(0, 15).map(s => `onde fazer ${s} em ${CIDADE}`),
    ...SERVICOS_CORE.slice(0, 15).map(s => `quanto custa ${s} ${CIDADE}`),
    ...CONDICOES_MEDICAS.slice(0, 15).map(c => `ginecologista para ${c} ${CIDADE}`),
    ...CONDICOES_MEDICAS.slice(0, 12).map(c => `onde tratar ${c} em ${CIDADE}`),
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
  // Long-tail / perguntas (alta conversão)
  longTail: [
    'agendar consulta ginecologista Presidente Prudente',
    'marcar consulta ginecologista Presidente Prudente',
    'agendar consulta obstetra Presidente Prudente',
    'marcar consulta obstetra Presidente Prudente',
    'onde colocar DIU em Presidente Prudente',
    'onde colocar Implanon em Presidente Prudente',
    'ginecologista que coloca DIU Presidente Prudente',
    'ginecologista que coloca Implanon Presidente Prudente',
    'ginecologista que faz pré-natal Presidente Prudente',
    'ginecologista para menopausa Presidente Prudente',
    'obstetra para parto humanizado Presidente Prudente',
    'microscopia vaginal resultado na hora',
    'microscopia vaginal resultado na hora Presidente Prudente',
    'ginecologista atendimento humanizado',
    'ginecologista atendimento humanizado Presidente Prudente',
    'quanto custa consulta ginecologista Presidente Prudente',
    'quanto custa DIU em Presidente Prudente',
    'quanto custa Implanon em Presidente Prudente',
    'valor consulta ginecologista Presidente Prudente',
    'ginecologista que aceita Unimed Presidente Prudente',
    'ginecologista convênio Unimed Presidente Prudente',
    'consulta ginecológica particular Presidente Prudente',
    'onde fazer papanicolau em Presidente Prudente',
    'onde fazer colposcopia em Presidente Prudente',
    'onde fazer ultrassom obstétrico Presidente Prudente',
    'onde fazer pré-natal em Presidente Prudente',
    'onde tratar endometriose Presidente Prudente',
    'onde tratar menopausa Presidente Prudente',
    'ginecologista para endometriose Presidente Prudente',
    'ginecologista para adolescente Presidente Prudente',
    'primeira consulta ginecologista Presidente Prudente',
    'ginecologista perto do centro Presidente Prudente',
    'melhor clínica ginecológica Presidente Prudente',
    'pré-natal particular Presidente Prudente',
    'pré-natal Unimed Presidente Prudente',
    'parto humanizado Presidente Prudente obstetra',
    'obstetra particular Presidente Prudente',
    'ginecologista para SOP Presidente Prudente',
    'ginecologista para infertilidade Presidente Prudente',
    'ginecologista para corrimento Presidente Prudente',
    'ginecologista para candidíase Presidente Prudente',
    'como tratar endometriose em Presidente Prudente',
    'como tratar menopausa em Presidente Prudente',
    'DIU de cobre ou Mirena Presidente Prudente',
    'DIU preço Presidente Prudente',
    'Implanon preço Presidente Prudente',
    'retirada de DIU Presidente Prudente',
    'troca de DIU Presidente Prudente',
    'troca de Implanon Presidente Prudente',
    'ginecologista para HPV Presidente Prudente',
    'ginecologista para cólica Presidente Prudente',
    'ginecologista para sangramento Presidente Prudente',
    'exame preventivo Presidente Prudente',
    'check-up feminino Presidente Prudente',
  ],
  // Região Oeste Paulista (cidades próximas)
  regiao: [
    ...CIDADES_REGIAO.flatMap(c => [
      `ginecologista ${c}`,
      `obstetra ${c}`,
      `ginecologista e obstetra ${c}`,
      `DIU ${c}`,
      `pré-natal ${c}`,
      `Implanon ${c}`,
      `menopausa tratamento ${c}`,
      `papanicolau ${c}`,
      `colposcopia ${c}`,
    ]),
    'ginecologista Oeste Paulista',
    `ginecologista região de ${CIDADE}`,
    `obstetra região de ${CIDADE}`,
    'melhor ginecologista Oeste Paulista',
    'obstetra Oeste Paulista',
    'DIU Oeste Paulista',
    'pré-natal Oeste Paulista',
    'Implanon Oeste Paulista',
  ],
  // Variações sem acento / coloquial / digitação comum
  variacoes: [
    'ginecologista presidente prudente',
    'gineco presidente prudente',
    'go presidente prudente',
    'obstetra presidente prudente',
    'pre natal presidente prudente',
    'pre natal humanizado presidente prudente',
    'diu presidente prudente',
    'diu de cobre presidente prudente',
    'diu mirena presidente prudente',
    'diu hormonal presidente prudente',
    'diu kyleena presidente prudente',
    'implanon presidente prudente',
    'menopausa presidente prudente',
    'reposicao hormonal presidente prudente',
    'anticoncepcional presidente prudente',
    'papanicolau presidente prudente',
    'colposcopia presidente prudente',
    'microscopia vaginal presidente prudente',
    'endometriose presidente prudente',
    'mioma presidente prudente',
    'ovario policistico presidente prudente',
    'candidíase presidente prudente',
    'corrimento presidente prudente',
    'exame ginecologico presidente prudente',
    'consulta ginecologica presidente prudente',
    'parto humanizado presidente prudente',
    'saude da mulher presidente prudente',
    'ginecologista presidente prudente sp',
    'obstetra presidente prudente sp',
    'dra andresa martin presidente prudente',
    'dra andresa ginecologista presidente prudente',
    'espaco humanizare presidente prudente',
    'ginecologista unimed presidente prudente',
    'ginecologista particular presidente prudente',
    'ginecologista boa presidente prudente',
    'melhor ginecologista presidente prudente',
  ],
};

// Todas as keywords flat para uso em meta tags (inclui TODAS as categorias)
export const ALL_KEYWORDS = [
  ...SEO_KEYWORDS.nome,
  ...SEO_KEYWORDS.especialidade,
  ...SEO_KEYWORDS.servicos,
  ...SEO_KEYWORDS.condicoes,
  ...SEO_KEYWORDS.ginecologistaServico,
  ...SEO_KEYWORDS.local,
  ...SEO_KEYWORDS.longTail,
  ...SEO_KEYWORDS.regiao,
  ...SEO_KEYWORDS.variacoes,
];

// Keywords por categoria de artigo (para SEO de blog posts)
export const ARTICLE_KEYWORDS_BY_CATEGORY: Record<string, string[]> = {
  'Pré-natal': [
    `pré-natal ${CIDADE}`, `pré-natal humanizado ${CIDADE}`, `obstetra ${CIDADE}`,
    `acompanhamento gestação ${CIDADE}`, `exames pré-natal ${CIDADE}`, `obstetra pré-natal ${CIDADE}`,
  ],
  'Microscopia Vaginal': [
    `microscopia vaginal ${CIDADE}`, `exame ginecológico ${CIDADE}`, 'diagnóstico imediato',
    `infecção vaginal tratamento ${CIDADE}`, `microscopia vaginal resultado na hora`,
  ],
  'Menopausa': [
    `menopausa ${CIDADE}`, `climatério tratamento ${CIDADE}`, `reposição hormonal ${CIDADE}`,
    `fogachos tratamento ${CIDADE}`, `terapia hormonal ${CIDADE}`, `menopausa tratamento ${CIDADE}`,
  ],
  'Anticoncepcional': [
    `anticoncepcional ${CIDADE}`, `métodos contraceptivos ${CIDADE}`, 'pílula anticoncepcional',
    `ginecologista anticoncepcional ${CIDADE}`, `contracepção ${CIDADE}`, `injeção anticoncepcional ${CIDADE}`,
  ],
  'DIU': [
    `DIU ${CIDADE}`, `colocar DIU ${CIDADE}`, `DIU de cobre ${CIDADE}`,
    `DIU Mirena ${CIDADE}`, `DIU hormonal ${CIDADE}`, `ginecologista DIU ${CIDADE}`,
    `inserção de DIU ${CIDADE}`, `DIU Kyleena ${CIDADE}`,
  ],
  'Implanon': [
    `Implanon ${CIDADE}`, `implante contraceptivo ${CIDADE}`, `colocar Implanon ${CIDADE}`,
    `implante anticoncepcional ${CIDADE}`, `ginecologista Implanon ${CIDADE}`,
  ],
  'Ginecologia': [
    `ginecologista ${CIDADE}`, `consulta ginecológica ${CIDADE}`, `exame ginecológico ${CIDADE}`,
    `saúde feminina ${CIDADE}`, `ginecologia ${CIDADE}`, `check-up ginecológico ${CIDADE}`,
  ],
  'Contracepção': [
    `contracepção ${CIDADE}`, `métodos contraceptivos ${CIDADE}`, `anticoncepcional ${CIDADE}`,
    `planejamento familiar ${CIDADE}`, `ginecologista contracepção ${CIDADE}`,
  ],
  'Obstetrícia': [
    `obstetra ${CIDADE}`, `parto humanizado ${CIDADE}`, `gestação ${CIDADE}`,
    `obstetrícia ${CIDADE}`, `parto normal ${CIDADE}`, `cesárea ${CIDADE}`,
  ],
  'Saúde da Mulher': [
    `saúde da mulher ${CIDADE}`, `ginecologista ${CIDADE}`, `saúde feminina ${CIDADE}`,
    `cuidado feminino ${CIDADE}`, `ginecologista humanizada ${CIDADE}`,
  ],
};

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
      ...CIDADES_REGIAO.map(c => ({ '@type': 'City', name: c })),
      {
        '@type': 'AdministrativeArea',
        name: 'Oeste Paulista',
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
    areaServed: [
      {
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
      ...CIDADES_REGIAO.map(c => ({
        '@type': 'City',
        name: c,
        containedInPlace: { '@type': 'State', name: 'São Paulo' },
      })),
    ],
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
  {
    question: 'Quanto custa colocar DIU em Presidente Prudente?',
    answer: 'O valor da inserção de DIU varia conforme o tipo (cobre ou hormonal Mirena/Kyleena). A Dra. Andresa Martin oferece inserção de DIU no Espaço Humanizare em Presidente Prudente com acompanhamento pós-inserção incluso. Entre em contato pelo WhatsApp (18) 99820-7964 para valores e agendamento.',
  },
  {
    question: 'Onde colocar Implanon em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada realiza inserção, troca e retirada de Implanon (implante contraceptivo subdérmico) no Espaço Humanizare em Presidente Prudente. O procedimento é rápido, feito com anestesia local e dura apenas alguns minutos. Agende pelo WhatsApp (18) 99820-7964.',
  },
  {
    question: 'Qual a melhor ginecologista em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada é ginecologista e obstetra com CRM/SP 207702 e RQE 135096, atuando no Espaço Humanizare em Presidente Prudente. Oferece atendimento humanizado com foco na saúde integral da mulher, cobrindo ginecologia, obstetrícia, pré-natal, DIU, Implanon, menopausa e microscopia vaginal.',
  },
  {
    question: 'A Dra. Andresa Martin trata endometriose em Presidente Prudente?',
    answer: 'Sim! A Dra. Andresa Martin realiza diagnóstico e tratamento de endometriose no Espaço Humanizare em Presidente Prudente. O acompanhamento inclui avaliação clínica, exames de imagem, tratamento hormonal e orientação personalizada para cada paciente.',
  },
  {
    question: 'Onde fazer exame de papanicolau em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin realiza o exame de Papanicolau (preventivo do câncer de colo do útero) no Espaço Humanizare em Presidente Prudente. O exame é rápido, simples e fundamental para a saúde da mulher. Agende pelo WhatsApp (18) 99820-7964.',
  },
  {
    question: 'Qual ginecologista coloca DIU Mirena em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada realiza inserção de DIU Mirena (hormonal), DIU Kyleena e DIU de cobre no Espaço Humanizare em Presidente Prudente. A inserção é feita no consultório com técnicas para minimizar o desconforto, e inclui acompanhamento pós-inserção.',
  },
  {
    question: 'Tem ginecologista em Presidente Prudente que atende por Unimed?',
    answer: 'Sim! A Dra. Andresa Martin Louzada atende pelo convênio Unimed e particular no Espaço Humanizare em Presidente Prudente. Ligue para (18) 99820-7964 para verificar a cobertura do seu plano e agendar sua consulta.',
  },
  {
    question: 'A Dra. Andresa Martin atende pacientes de Álvares Machado, Regente Feijó e região?',
    answer: 'Sim! A Dra. Andresa Martin atende pacientes de toda a região do Oeste Paulista, incluindo Álvares Machado, Regente Feijó, Martinópolis, Pirapozinho, Presidente Bernardes, Dracena, Adamantina, Tupã e demais cidades da região. O consultório fica no Espaço Humanizare, com fácil acesso em Presidente Prudente.',
  },
  {
    question: 'Quais anticoncepcionais a Dra. Andresa prescreve em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin orienta sobre todos os métodos contraceptivos disponíveis: pílulas combinadas e minipílulas, injeção mensal e trimestral, DIU de cobre, DIU hormonal (Mirena/Kyleena), Implanon (implante subdérmico), anel vaginal e adesivo hormonal. A escolha é sempre personalizada, no Espaço Humanizare em Presidente Prudente.',
  },
  {
    question: 'Onde tratar menopausa e climatério em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada oferece tratamento completo para menopausa e climatério no Espaço Humanizare em Presidente Prudente, incluindo reposição hormonal bioidêntica, controle de fogachos, cuidados com saúde óssea e cardiovascular, e acompanhamento da qualidade de vida.',
  },
  {
    question: 'A Dra. Andresa Martin faz colposcopia em Presidente Prudente?',
    answer: 'Sim! A Dra. Andresa Martin realiza colposcopia no Espaço Humanizare em Presidente Prudente. O exame é indicado para investigação de alterações no Papanicolau, acompanhamento de lesões cervicais e rastreamento de HPV.',
  },
  {
    question: 'Onde fazer ultrassom obstétrico e transvaginal em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin solicita e acompanha ultrassonografias obstétricas e transvaginais durante o pré-natal e consultas ginecológicas no Espaço Humanizare em Presidente Prudente, incluindo ultrassom morfológico, obstétrico seriado e pélvico.',
  },
  {
    question: 'Qual ginecologista trata ovário policístico (SOP) em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada realiza diagnóstico e tratamento da Síndrome dos Ovários Policísticos (SOP) no Espaço Humanizare em Presidente Prudente, com investigação hormonal completa, orientação nutricional e tratamento personalizado.',
  },
  {
    question: 'Ginecologista que faz parto humanizado em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada é obstetra que acompanha parto humanizado em Presidente Prudente, com respeito ao plano de parto, acompanhamento individualizado da gestante, suporte contínuo e liberdade de escolha da mulher durante todo o trabalho de parto.',
  },
  {
    question: 'Como agendar consulta ginecológica pelo WhatsApp em Presidente Prudente?',
    answer: 'Basta enviar uma mensagem para o WhatsApp (18) 99820-7964 solicitando agendamento com a Dra. Andresa Martin. A equipe do Espaço Humanizare em Presidente Prudente responderá com as datas e horários disponíveis. Também é possível agendar pelo chatbot do site.',
  },
  {
    question: 'A Dra. Andresa trata mioma uterino em Presidente Prudente?',
    answer: 'Sim! A Dra. Andresa Martin realiza diagnóstico e acompanhamento de miomas uterinos no Espaço Humanizare em Presidente Prudente, com ultrassonografia, tratamento clínico e encaminhamento cirúrgico quando necessário.',
  },
  {
    question: 'Ginecologista para primeira consulta em Presidente Prudente?',
    answer: 'A Dra. Andresa Martin Louzada atende mulheres em todas as fases da vida no Espaço Humanizare em Presidente Prudente, incluindo primeira consulta ginecológica para adolescentes. O atendimento é humanizado, acolhedor e respeitoso.',
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

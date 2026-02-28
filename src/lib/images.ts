/* ─── Image mappings ─── */
export const IMAGES = {
  /* Doutora — foto sentada no consultório com logo atrás (extra-1) */
  doutora: '/images/dra-andresa-extra-1.jpeg',
  /* Hero background */
  hero: '/images/dra-andresa-consultorio-1.jpeg',
  /* Consultório genérico */
  consultorio: '/images/dra-andresa-consultorio-2.jpeg',
  /* Logo / perfil */
  logo: '/images/dra-andresa-blog-2.jpeg',
  logoAlt: '/images/dra-andresa-blog-3.jpeg',
  logoMini: '/images/dra-andresa-blog-2.jpeg',

  /* Blog (fotos originais) */
  blog1: '/images/dra-andresa-blog-1.jpeg',
  blog2: '/images/dra-andresa-blog-2.jpeg',
  blog3: '/images/dra-andresa-blog-3.jpeg',
  blog4: '/images/dra-andresa-blog-4.jpeg',
  blog5: '/images/dra-andresa-blog-5.jpeg',

  /* Consultório fotos */
  consultorio1: '/images/dra-andresa-consultorio-1.jpeg',
  consultorio2: '/images/dra-andresa-consultorio-2.jpeg',
  consultorio3: '/images/dra-andresa-consultorio-3.jpeg',
  consultorio4: '/images/dra-andresa-consultorio-4.jpeg',
  consultorio5: '/images/dra-andresa-consultorio-5.jpeg',
  consultorio6: '/images/dra-andresa-consultorio-6.jpeg',
  consultorio7: '/images/dra-andresa-consultorio-7.jpeg',
  consultorio8: '/images/dra-andresa-consultorio-8.jpeg',

  /* Posts do Instagram */
  post1: '/images/dra-andresa-post-1.jpeg',
  post2: '/images/dra-andresa-post-2.jpeg',
  post3: '/images/dra-andresa-post-3.jpeg',
  post4: '/images/dra-andresa-post-4.jpeg',
  post5: '/images/dra-andresa-post-5.jpeg',

  /* Fotos extras (consultório / atendimento) */
  extra1: '/images/dra-andresa-extra-1.jpeg',
  extra2: '/images/dra-andresa-extra-2.jpeg',
  extra3: '/images/dra-andresa-extra-3.jpeg',
  extra4: '/images/dra-andresa-extra-4.jpeg',
  extra5: '/images/dra-andresa-extra-5.jpeg',
  extra6: '/images/dra-andresa-extra-6.jpeg',
  extra7: '/images/dra-andresa-extra-7.jpeg',
  extra8: '/images/dra-andresa-extra-8.jpeg',
} as const;

/* ─── Blog article images mapped by slug ─── */
export const ARTICLE_IMAGES: Record<string, string> = {
  'importancia-pre-natal': IMAGES.post1,
  'microscopia-vaginal-diagnostico': IMAGES.extra3,
  'menopausa-qualidade-vida': IMAGES.extra5,
  'ginecologia-regenerativa': IMAGES.extra4,
  'exames-ginecologicos-rotina': IMAGES.extra2,
  'cheiro-intimo-normal-anormal': IMAGES.blog3,
  'pilula-do-dia-seguinte': IMAGES.blog4,
  'vsr-recem-nascido': IMAGES.post2,
  'cuidar-voce-amor-proprio': IMAGES.extra6,
  'nao-faria-sendo-ginecologista': IMAGES.extra7,
};

/* ─── Area images (Unsplash fallbacks for specialty banners) ─── */
export const AREA_IMAGES: Record<string, string> = {
  'Ginecologia': IMAGES.extra2,
  'Obstetrícia': IMAGES.post2,
  'Pré-natal': IMAGES.post1,
  'Menopausa': IMAGES.extra5,
  'Ginecologia Regenerativa': IMAGES.extra4,
  'Microscopia Vaginal': IMAGES.extra3,
  'Saúde da Mulher': IMAGES.blog1,
  'Contracepção': IMAGES.blog5,
};

export const BLOG_IMAGES: Record<string, string> = {
  ...AREA_IMAGES,
  'Saúde Feminina': IMAGES.blog1,
};

export const DEFAULT_IMAGE = IMAGES.blog1;

export const getCategoryImage = (category: string): string => {
  return BLOG_IMAGES[category] || DEFAULT_IMAGE;
};

export const getArticleImage = (slug: string): string => {
  return ARTICLE_IMAGES[slug] || DEFAULT_IMAGE;
};

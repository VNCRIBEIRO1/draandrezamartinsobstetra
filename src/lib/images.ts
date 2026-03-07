/* ─── Image mappings ─── */
export const IMAGES = {
  /* Doutora — foto de jaleco branco (homepage) */
  doutora: '/images/homepage.jpg',
  /* Foto sobre — parto (usada na página Sobre) */
  doutoraSobre: '/images/fotosobre.jpg',
  /* Hero — foto profissional da doutora para o hero */
  heroPhoto: '/images/dra-andresa-hero.jpg',
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
  'importancia-pre-natal': '/images/generated/importancia-pre-natal.jpg',
  'microscopia-vaginal-diagnostico': '/images/generated/microscopia-vaginal-diagnostico.jpg',
  'menopausa-qualidade-vida': '/images/generated/menopausa-qualidade-vida.jpg',
  'anticoncepcional-guia-jovem': '/images/generated/anticoncepcional-guia-jovem.jpg',
  'diu-tudo-sobre': '/images/generated/diu-tudo-sobre.jpg',
  'implanon-implante-guia': '/images/generated/implanon-implante-guia.jpg',
  'exames-ginecologicos-rotina': '/images/generated/exames-ginecologicos-rotina.jpg',
  'cheiro-intimo-normal-anormal': '/images/generated/cheiro-intimo-normal-anormal.jpg',
  'pilula-do-dia-seguinte': '/images/generated/pilula-do-dia-seguinte.jpg',
  'vsr-recem-nascido': '/images/generated/vsr-recem-nascido.jpg',
  'cuidar-voce-amor-proprio': '/images/generated/cuidar-voce-amor-proprio.jpg',
  'nao-faria-sendo-ginecologista': '/images/generated/nao-faria-sendo-ginecologista.jpg',
  'ginecologia-geral-saude-feminina': '/images/generated/ginecologia-geral-saude-feminina.jpg',
  'obstetricia-parto-humanizado': '/images/generated/obstetricia-parto-humanizado.jpg',
};

/* ─── Area images (imagens abstratas geradas) ─── */
export const AREA_IMAGES: Record<string, string> = {
  'Ginecologia': '/images/generated/area-ginecologia.jpg',
  'Obstetrícia': '/images/generated/area-obstetricia.jpg',
  'Pré-natal': '/images/generated/area-prenatal.jpg',
  'Menopausa': '/images/generated/area-menopausa.jpg',
  'Microscopia Vaginal': '/images/generated/area-microscopia.jpg',
  'Anticoncepcional': '/images/generated/area-anticoncepcional.jpg',
  'DIU': '/images/generated/area-diu.jpg',
  'Implanon': '/images/generated/area-implanon.jpg',
  'Saúde da Mulher': '/images/generated/area-ginecologia.jpg',
  'Contracepção': '/images/generated/area-anticoncepcional.jpg',
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

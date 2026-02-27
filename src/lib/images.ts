export const IMAGES = {
  doutora: '/images/dra-andresa-blog-1.jpeg',
  hero: '/images/dra-andresa-consultorio-1.jpeg',
  consultorio: '/images/dra-andresa-consultorio-2.jpeg',
  logo: '/images/dra-andresa-blog-2.jpeg',
  logoAlt: '/images/dra-andresa-blog-3.jpeg',
  logoMini: '/images/dra-andresa-blog-2.jpeg',
  blog1: '/images/dra-andresa-blog-1.jpeg',
  blog2: '/images/dra-andresa-blog-2.jpeg',
  blog3: '/images/dra-andresa-blog-3.jpeg',
  blog4: '/images/dra-andresa-blog-4.jpeg',
  blog5: '/images/dra-andresa-blog-5.jpeg',
  consultorio1: '/images/dra-andresa-consultorio-1.jpeg',
  consultorio2: '/images/dra-andresa-consultorio-2.jpeg',
  consultorio3: '/images/dra-andresa-consultorio-3.jpeg',
  consultorio4: '/images/dra-andresa-consultorio-4.jpeg',
  consultorio5: '/images/dra-andresa-consultorio-5.jpeg',
  consultorio6: '/images/dra-andresa-consultorio-6.jpeg',
  consultorio7: '/images/dra-andresa-consultorio-7.jpeg',
  consultorio8: '/images/dra-andresa-consultorio-8.jpeg',
} as const;

export const AREA_IMAGES: Record<string, string> = {
  'Ginecologia': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80',
  'Obstetrícia': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
  'Pré-natal': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
  'Menopausa': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
  'Ginecologia Regenerativa': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'Microscopia Vaginal': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
  'Saúde da Mulher': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
  'Contracepção': 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80',
};

export const BLOG_IMAGES: Record<string, string> = {
  ...AREA_IMAGES,
  'Saúde Feminina': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
};

export const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';

export const getCategoryImage = (category: string): string => {
  return BLOG_IMAGES[category] || DEFAULT_IMAGE;
};

import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';
import { ALL_KEYWORDS, GEO_META } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const viewport: Viewport = {
  themeColor: '#8a9b80',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ---- Título ----
  title: {
    default: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra em Presidente Prudente - SP',
    template: '%s | Dra. Andresa Martin - Ginecologista e Obstetra Presidente Prudente',
  },

  // ---- Descrição (até 160 caracteres otimizados) ----
  description:
    'Dra. Andresa Martin Louzada — Ginecologista e Obstetra em Presidente Prudente, SP. Pré-natal humanizado, DIU, Implanon, Menopausa, Microscopia Vaginal. CRM/SP 207702. Espaço Humanizare. Agende: (18) 99820-7964.',

  // ---- Keywords abrangentes ----
  keywords: ALL_KEYWORDS,

  // ---- Autoria ----
  authors: [
    { name: 'Dra. Andresa Martin Louzada', url: `${SITE_URL}/sobre` },
  ],
  creator: 'Dra. Andresa Martin Louzada',
  publisher: 'Espaço Humanizare',

  // ---- Canonical & Alternates ----
  alternates: {
    canonical: SITE_URL,
    languages: {
      'pt-BR': SITE_URL,
    },
  },

  // ---- Category ----
  category: 'Saúde',

  // ---- Google Search Console Verification ----
  verification: {
    google: '1j757xUijbjwadZURaWaYOVvllrJBgfmfx9qDF',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ---- OpenGraph completo ----
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Dra. Andresa Martin Louzada - Ginecologista e Obstetra em Presidente Prudente',
    title: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra em Presidente Prudente - SP',
    description:
      'Ginecologista e Obstetra em Presidente Prudente - SP. Atendimento humanizado no Espaço Humanizare. Pré-natal, DIU, Implanon, Menopausa, Microscopia Vaginal. CRM/SP 207702. Agende pelo WhatsApp (18) 99820-7964.',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dra. Andresa Martin Louzada - Ginecologista e Obstetra em Presidente Prudente - Espaço Humanizare',
        type: 'image/jpeg',
      },
      {
        url: `${SITE_URL}/images/doutora.jpg`,
        width: 800,
        height: 1000,
        alt: 'Dra. Andresa Martin Louzada - Ginecologista e Obstetra',
        type: 'image/jpeg',
      },
    ],
    countryName: 'Brasil',
  },

  // ---- Twitter Card ----
  twitter: {
    card: 'summary_large_image',
    title: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra - Presidente Prudente SP',
    description:
      'Ginecologista e Obstetra em Presidente Prudente. Pré-natal humanizado, DIU, Implanon, Menopausa. Espaço Humanizare. CRM/SP 207702.',
    images: [`${SITE_URL}/images/og-image.jpg`],
    creator: siteConfig.instagramHandle,
  },

  // ---- Verificação Google ----
  // Descomente e adicione o código de verificação quando tiver o Google Search Console
  // verification: {
  //   google: 'SEU_CODIGO_VERIFICACAO_GOOGLE',
  // },

  // ---- Outros metadados ----
  other: {
    // Geo tags para SEO Local
    ...GEO_META,
    // Informações médicas
    'medical-specialty': 'Ginecologia e Obstetrícia',
    'dc.creator': siteConfig.nomeCompleto,
    'dc.language': 'pt-BR',
    'dc.coverage': 'Presidente Prudente, São Paulo, Brasil',
    'dc.subject': 'Ginecologia, Obstetrícia, Saúde da Mulher',
    // Rating
    rating: 'general',
    // Revisit
    'revisit-after': '7 days',
    // Mobile
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Dra. Andresa Martin',
    'format-detection': 'telephone=yes',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="canonical" href={SITE_URL} />

        {/* Preconnect para performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

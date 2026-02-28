import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import LayoutShell from '@/components/LayoutShell';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://draandrezamartinsobstetra.vercel.app'
  ),
  title: {
    default: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra em Presidente Prudente',
    template: '%s | Dra. Andresa Martin - Ginecologista e Obstetra',
  },
  description:
    'Dra. Andresa Martin Louzada — Ginecologista e Obstetra em Presidente Prudente, SP. Atendimento humanizado no Espaço Humanizare. Pré-natal, Menopausa, Ginecologia Regenerativa e Microscopia Vaginal.',
  keywords: [
    'ginecologista Presidente Prudente',
    'obstetra Presidente Prudente',
    'pré-natal humanizado',
    'ginecologia regenerativa',
    'microscopia vaginal',
    'Dra Andresa Martin',
    'Espaço Humanizare',
  ],
  authors: [{ name: 'Dra. Andresa Martin Louzada' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Dra. Andresa Martin Louzada - Ginecologista e Obstetra',
    title: 'Dra. Andresa Martin Louzada | Ginecologista e Obstetra',
    description:
      'Ginecologista e Obstetra em Presidente Prudente. Atendimento humanizado no Espaço Humanizare.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

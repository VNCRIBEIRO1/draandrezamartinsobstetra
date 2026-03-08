import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendar Consulta - Ginecologista Presidente Prudente | Dra. Andresa Martin',
  description:
    'Agende sua consulta com a Dra. Andresa Martin Louzada, Ginecologista e Obstetra em Presidente Prudente - SP. Agendamento online, WhatsApp (18) 99820-7964 ou chatbot. Espaço Humanizare.',
  keywords: [
    'agendar consulta ginecologista Presidente Prudente',
    'marcar consulta ginecologista Presidente Prudente',
    'agendar consulta obstetra Presidente Prudente',
    'agendamento online ginecologista',
    'consulta ginecológica Presidente Prudente',
    'agendar Dra Andresa Martin',
    'consulta Espaço Humanizare',
    'ginecologista Presidente Prudente agendar',
  ],
  alternates: { canonical: '/agendar' },
  openGraph: {
    title: 'Agendar Consulta | Dra. Andresa Martin - Ginecologista Presidente Prudente',
    description: 'Agende consulta com a Dra. Andresa Martin. WhatsApp (18) 99820-7964. Espaço Humanizare.',
    url: '/agendar',
  },
};

export default function AgendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}

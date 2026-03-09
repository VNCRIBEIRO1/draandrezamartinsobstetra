import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendar Consulta - Ginecologista e Obstetra Presidente Prudente | Dra. Andresa Martin',
  description:
    'Agende sua consulta com a Dra. Andresa Martin Louzada, Ginecologista e Obstetra em Presidente Prudente - SP. DIU, Implanon, Pré-natal, Menopausa, Microscopia Vaginal. Agendamento online, WhatsApp (18) 99820-7964 ou chatbot. Espaço Humanizare.',
  keywords: [
    'agendar consulta ginecologista Presidente Prudente',
    'marcar consulta ginecologista Presidente Prudente',
    'agendar consulta obstetra Presidente Prudente',
    'agendamento online ginecologista Presidente Prudente',
    'consulta ginecológica Presidente Prudente',
    'agendar Dra Andresa Martin',
    'consulta Espaço Humanizare',
    'ginecologista Presidente Prudente agendar',
    'agendar DIU Presidente Prudente',
    'agendar colocar DIU Presidente Prudente',
    'agendar Implanon Presidente Prudente',
    'agendar pré-natal Presidente Prudente',
    'agendar papanicolau Presidente Prudente',
    'agendar colposcopia Presidente Prudente',
    'agendar menopausa Presidente Prudente',
    'consulta ginecologista particular Presidente Prudente',
    'consulta ginecologista Unimed Presidente Prudente',
    'ginecologista com horário disponível Presidente Prudente',
    'obstetra agendamento Presidente Prudente',
    'marcar consulta DIU Presidente Prudente',
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

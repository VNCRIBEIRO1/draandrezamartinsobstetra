import Link from 'next/link';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';

const areas = [
  'Ginecologia',
  'Obstetrícia',
  'Pré-natal',
  'Menopausa',
  'Ginecologia Regenerativa',
  'Microscopia Vaginal',
];

const links = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Áreas de Atuação', href: '/areas-de-atuacao' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '/contato' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary-900 to-primary-950 text-primary-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-white font-serif font-bold text-lg">Dra. Andresa Martin</h3>
                <p className="text-xs tracking-wider uppercase text-primary-300">Ginecologista e Obstetra</p>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed mb-4">
              Ginecologia e Obstetrícia humanizada no Espaço Humanizare.
              Acolhendo a mulher em todas as fases da vida em Presidente Prudente e região.
            </p>
            <p className="text-primary-400 text-sm font-medium">CRM/SP • Espaço Humanizare</p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Navegação</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-300 hover:text-primary-200 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Áreas de Atuação</h4>
            <ul className="space-y-3">
              {areas.map((area) => (
                <li key={area}>
                  <Link href="/areas-de-atuacao" className="text-primary-300 hover:text-primary-200 transition-colors text-sm">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-serif font-bold text-lg mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-primary-300 text-sm">
                  Av. Mathias Mendes Cardoso, 460<br />
                  Sala 08 - Central Park Residence<br />
                  Presidente Prudente - SP<br />
                  CEP 19060-740
                </span>
              </li>
              <li>
                <a href="tel:+5518998207964" className="flex items-center gap-3 text-primary-300 hover:text-primary-200 transition-colors text-sm">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  (18) 99820-7964
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-primary-300 text-sm">Seg a Sex, 08:00 às 18:00</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/dra.andreamartin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-300 hover:text-primary-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800/50">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-400 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Dra. Andresa Martin Louzada — Ginecologista e Obstetra. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/politica-privacidade" className="text-primary-400 hover:text-primary-200 text-xs transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-primary-400 hover:text-primary-200 text-xs transition-colors">
              Termos de Uso
            </Link>
          </div>
          <p className="text-primary-500 text-xs">
            Este site tem caráter informativo e não substitui consulta médica.
          </p>
        </div>
      </div>
    </footer>
  );
}

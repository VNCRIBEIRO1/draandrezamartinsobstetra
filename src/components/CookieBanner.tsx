'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('cookies-accepted-at', new Date().toISOString());
    setVisible(false);
    // Destrava o Google Analytics após consentimento (LGPD)
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const refuse = () => {
    localStorage.setItem('cookies-accepted', 'essential-only');
    localStorage.setItem('cookies-accepted-at', new Date().toISOString());
    setVisible(false);
    // Mantém Analytics bloqueado
    window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary-100 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-secondary-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900 mb-1">Privacidade e Cookies</h3>
            <p className="text-sm text-gray-600 mb-3">
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos
              (Google Analytics) para melhorar sua experiência. Seus dados são protegidos
              conforme a{' '}
              <Link href="/politica-privacidade" className="text-secondary-500 underline font-medium">
                LGPD (Lei 13.709/2018)
              </Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button onClick={accept} className="btn-primary text-sm px-6 py-2">
                Aceitar todos
              </button>
              <button onClick={refuse} className="text-sm px-6 py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors">
                Apenas essenciais
              </button>
              <Link href="/politica-privacidade" className="text-sm px-6 py-2 text-secondary-600 hover:text-secondary-700 font-medium text-center">
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

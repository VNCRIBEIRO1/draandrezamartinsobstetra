'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary-100 p-6 flex flex-col sm:flex-row items-center gap-4">
        <Cookie className="w-8 h-8 text-primary-400 flex-shrink-0" />
        <p className="text-sm text-gray-600 flex-1">
          Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
          <Link href="/politica-privacidade" className="text-primary-500 underline">
            Política de Privacidade
          </Link>.
        </p>
        <button onClick={accept} className="btn-primary text-sm px-6 py-2">
          Aceitar
        </button>
      </div>
    </div>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import WhatsAppButton from '@/components/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatBot />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <CookieBanner />}
    </>
  );
}

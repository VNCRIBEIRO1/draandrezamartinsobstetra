import Link from 'next/link';
import { Home, ArrowLeft, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart className="w-10 h-10 text-primary-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          A página que você está procurando pode ter sido removida ou o endereço está incorreto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center">
            <Home className="w-5 h-5 mr-2" /> Ir para o Início
          </Link>
          <Link href="/contato" className="btn-outline inline-flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" /> Fale Conosco
          </Link>
        </div>
      </div>
    </section>
  );
}

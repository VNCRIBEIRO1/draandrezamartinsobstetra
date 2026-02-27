'use client';

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    'Olá! Gostaria de agendar uma consulta com a Dra. Andresa Martin.'
  );

  return (
    <motion.a
      href={`https://wa.me/5518998207964?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      aria-label="Contato via WhatsApp"
      title="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />
      <span className="absolute right-full mr-3 bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Agende pelo WhatsApp
      </span>
    </motion.a>
  );
}

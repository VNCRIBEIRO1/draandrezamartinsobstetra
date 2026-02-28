'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Phone, Clock, MapPin, Heart, ChevronRight, Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function AgendarPage() {
  const [chatOpen, setChatOpen] = useState(false);

  const handleOpenChatBot = () => {
    // Trigger the ChatBot opening via custom event
    window.dispatchEvent(new CustomEvent('open-chatbot-agendar'));
    setChatOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                Agendamento de Consultas
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Agende sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Consulta</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Escolha a forma mais prática para você agendar. Nosso atendimento é humanizado e personalizado.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Opções de Agendamento */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            {/* Opção 1: ChatBot / Triagem */}
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -4 }} className="relative bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 border-2 border-primary-200 shadow-lg shadow-primary-100/50 h-full flex flex-col">
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  ⭐ Recomendado
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Agendar pelo Assistente Virtual</h3>
                <p className="text-gray-600 mb-6 flex-1">
                  Use nosso assistente inteligente para escolher a data, horário e tipo de consulta. Veja em tempo real os horários disponíveis e confirme pelo WhatsApp.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">✓</span> Escolha tipo de consulta</li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">✓</span> Calendário com datas disponíveis</li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">✓</span> Horários livres em tempo real</li>
                  <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">✓</span> Confirmação via WhatsApp</li>
                </ul>
                <button onClick={handleOpenChatBot}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5">
                  <MessageCircle className="w-5 h-5" />
                  Iniciar Agendamento Online
                  <ChevronRight className="w-5 h-5" />
                </button>
                {chatOpen && (
                  <p className="text-center text-xs text-primary-500 mt-3 animate-pulse">
                    💬 Assistente aberto! Veja no canto inferior direito.
                  </p>
                )}
              </motion.div>
            </AnimatedSection>

            {/* Opção 2: Ligar / WhatsApp */}
            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -4 }} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md h-full flex flex-col">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ligar ou WhatsApp</h3>
                <p className="text-gray-600 mb-6 flex-1">
                  Prefere falar diretamente? Ligue ou envie mensagem pelo WhatsApp para nossa secretária. Atendimento rápido e carinhoso.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Atendimento humano</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Tira dúvidas na hora</li>
                  <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span> Horário comercial</li>
                </ul>
                <div className="space-y-3">
                  <a href="https://wa.me/5518998207964?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Andresa."
                    target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-all hover:-translate-y-0.5 shadow-lg shadow-green-500/20">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a href="tel:+5518998207964"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-primary-300 hover:text-primary-700 transition-all">
                    <Phone className="w-5 h-5" />
                    (18) 99820-7964
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-12 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-3">
            <AnimatedSection delay={0.1}>
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Localização</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">Espaço Humanizare<br />Av. Mathias Mendes Cardoso, 460<br />Sala 08 — Presidente Prudente, SP</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Horários</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">Segunda a Sexta: 08h – 18h<br />Sábado: 08h – 12h<br />Domingo: Fechado</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Atendimento</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">Consulta individual e humanizada<br />Ambiente acolhedor e seguro<br />Parcerias com convênios</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Início
          </Link>
        </div>
      </section>
    </>
  );
}

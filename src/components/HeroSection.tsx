'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Baby, Stethoscope, Flower2 } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-baby-sage via-baby-cream to-baby-pink overflow-hidden">
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.consultorio1}
          alt="Consultório Dra. Andresa Martin"
          fill
          className="object-cover opacity-[0.08]"
          priority
          sizes="100vw"
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-300/25 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary-200/20 rounded-full blur-3xl" />
      <div className="absolute top-40 left-2/3 w-48 h-48 bg-rose-200/20 rounded-full blur-2xl" />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Ginecologia e Obstetrícia Humanizada
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
              Acolhendo a{' '}
              <span className="text-primary-600">Mulher</span> em Todas as{' '}
              <span className="text-rose-400">Fases da Vida</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              Dra. Andresa Martin Louzada — Ginecologista e Obstetra no Espaço
              Humanizare em Presidente Prudente, SP. Atendimento humanizado com
              foco no cuidado integral da saúde feminina.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/agendar"
                className="btn-primary text-base"
              >
                Agende sua Consulta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/areas-de-atuacao"
                className="btn-outline text-base"
              >
                Áreas de Atuação
              </Link>
            </div>

            <p className="text-gray-400 text-xs mt-6">
              CRM/SP 207702 • RQE 135096 • Espaço Humanizare • Presidente Prudente, SP
            </p>
          </motion.div>

          {/* Cards de destaque - agora com 4 cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-1 gap-5"
          >
            {[
              {
                icon: Flower2,
                title: 'Ginecologia Geral',
                desc: 'Cuidado completo da saúde feminina em todas as fases — prevenção, diagnóstico e tratamento com atenção individualizada.',
                highlight: true,
              },
              {
                icon: Heart,
                title: 'Atendimento Humanizado',
                desc: 'Cada paciente é acolhida com empatia, respeito e atenção individualizada em todas as consultas.',
              },
              {
                icon: Baby,
                title: 'Pré-Natal Completo',
                desc: 'Acompanhamento integral da gestação com cuidado especial para mãe e bebê.',
              },
              {
                icon: Stethoscope,
                title: 'Microscopia na Hora',
                desc: 'Diagnóstico imediato com microscopia vaginal — resultado e tratamento na mesma consulta.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                className={`backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg ${
                  item.highlight
                    ? 'bg-rose-50/80 border-rose-200 hover:border-rose-300 ring-1 ring-rose-100'
                    : 'bg-white/80 border-secondary-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    item.highlight ? 'bg-rose-100' : 'bg-primary-100'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? 'text-rose-500' : 'text-primary-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-serif font-bold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

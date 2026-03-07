'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Baby, Stethoscope, Flower2, MapPin, Award } from 'lucide-react';
import { IMAGES } from '@/lib/images';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-baby-sage via-baby-cream to-baby-beige overflow-hidden">
      {/* Background subtle texture */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.consultorio1}
          alt="Consultório Dra. Andresa Martin"
          fill
          className="object-cover opacity-[0.05]"
          priority
          sizes="100vw"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary-300/15 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-sage-200/15 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gold-200/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 pt-32 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Texto — ocupa 5 colunas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-100/80 backdrop-blur-sm text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Ginecologia e Obstetrícia Humanizada
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-serif font-bold text-gray-900 leading-[1.15] mb-6">
              Acolhendo a{' '}
              <span className="text-secondary-600">Mulher</span> em Todas as{' '}
              <span className="text-gold-500 italic">Fases da Vida</span>
            </h1>

            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Dra. Andresa Martin Louzada — Ginecologista e Obstetra no Espaço
              Humanizare em Presidente Prudente, SP. Atendimento humanizado com
              foco no cuidado integral da saúde feminina.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
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

            <div className="flex items-center gap-6 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                CRM/SP 207702
              </span>
              <span>RQE 135096</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Presidente Prudente, SP
              </span>
            </div>
          </motion.div>

          {/* Foto da Doutora + Cards — ocupa 7 colunas */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative flex justify-center lg:justify-end">
              {/* Moldura decorativa atrás da foto */}
              <div className="absolute -top-4 -right-4 w-[85%] max-w-[420px] aspect-[4/5] rounded-3xl bg-gradient-to-br from-secondary-200/40 to-gold-200/30 hidden lg:block" />

              {/* Foto principal */}
              <div className="relative w-[85%] max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-secondary-900/15 ring-1 ring-white/50">
                <Image
                  src={IMAGES.heroPhoto}
                  alt="Dra. Andresa Martin Louzada — Ginecologista e Obstetra"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 420px"
                />
                {/* Gradient sutil na base da foto */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
              </div>




            </div>

            {/* Mini cards de especialidades abaixo da foto (mobile) */}
            <div className="grid grid-cols-2 gap-3 mt-6 lg:hidden">
              {[
                { icon: Flower2, title: 'Ginecologia', color: 'bg-secondary-100 text-secondary-600' },
                { icon: Heart, title: 'Humanizado', color: 'bg-primary-100 text-primary-600' },
                { icon: Baby, title: 'Pré-Natal', color: 'bg-gold-100 text-gold-600' },
                { icon: Stethoscope, title: 'Microscopia', color: 'bg-sage-100 text-sage-600' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-200"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop — Cards de especialidades em linha abaixo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="hidden lg:grid grid-cols-4 gap-4 mt-16"
        >
          {[
            {
              icon: Flower2,
              title: 'Ginecologia Geral',
              desc: 'Prevenção, diagnóstico e tratamento com atenção individualizada.',
              accent: 'border-secondary-200 hover:border-secondary-300',
              iconBg: 'bg-secondary-100',
              iconColor: 'text-secondary-600',
            },
            {
              icon: Heart,
              title: 'Atendimento Humanizado',
              desc: 'Empatia, respeito e acolhimento em todas as consultas.',
              accent: 'border-primary-200 hover:border-primary-300',
              iconBg: 'bg-primary-100',
              iconColor: 'text-secondary-600',
            },
            {
              icon: Baby,
              title: 'Pré-Natal Completo',
              desc: 'Acompanhamento integral com cuidado para mãe e bebê.',
              accent: 'border-gold-200 hover:border-gold-300',
              iconBg: 'bg-gold-100',
              iconColor: 'text-gold-600',
            },
            {
              icon: Stethoscope,
              title: 'Microscopia na Hora',
              desc: 'Resultado e tratamento na mesma consulta.',
              accent: 'border-sage-200 hover:border-sage-300',
              iconBg: 'bg-sage-100',
              iconColor: 'text-sage-600',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg hover:bg-white/90 ${item.accent}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.iconBg}`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <h3 className="text-gray-900 font-serif font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
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

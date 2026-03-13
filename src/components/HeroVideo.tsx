'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface HeroVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Vídeo estilo "vendedor de curso":
 * - Autoplay muted + loop
 * - Sem barra de progresso, sem controles nativos
 * - Click/tap para pausar e retomar — sem botões fixos visíveis
 * - Indicador visual breve (ícone play/pause) aparece por 800ms no clique
 * - Fallback para poster image se o vídeo falhar
 */
export default function HeroVideo({ src, poster, className = '' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);
  const [hasError, setHasError] = useState(false);
  const indicatorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (indicatorTimeout.current) clearTimeout(indicatorTimeout.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    // Mostra indicador breve por 800ms
    setShowIndicator(true);
    if (indicatorTimeout.current) clearTimeout(indicatorTimeout.current);
    indicatorTimeout.current = setTimeout(() => setShowIndicator(false), 800);
  }, [hasError]);

  // Fallback: mostrar poster se vídeo falhar
  if (hasError && poster) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={poster}
          alt="Dra. Andresa Martin Louzada — Ginecologista e Obstetra"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 90vw, 420px"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative cursor-pointer overflow-hidden select-none ${className}`}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePlay();
        }
      }}
    >
      {/* Vídeo sem controles nativos */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-top"
        onError={() => setHasError(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Indicador breve de play/pause no clique */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              {isPlaying ? (
                /* Ícone de pause: duas barras */
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-6 bg-white rounded-full" />
                  <div className="w-1.5 h-6 bg-white rounded-full" />
                </div>
              ) : (
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play persistente (sutil) quando vídeo está pausado */}
      {!isPlaying && !showIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-16 h-16 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
        </motion.div>
      )}

      {/* Gradiente sutil na base */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
    </div>
  );
}

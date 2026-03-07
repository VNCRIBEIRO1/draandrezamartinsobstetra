'use client';

import Link from 'next/link';
import {
  Heart,
  Baby,
  Stethoscope,
  Flower2,
  Microscope,
  Sparkles,
  Shield,
  CircleDot,
  Syringe,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Baby,
  Stethoscope,
  Flower2,
  Microscope,
  Sparkles,
  Shield,
  CircleDot,
  Syringe,
};

interface AreaCardProps {
  iconName: string;
  title: string;
  description: string;
  href?: string;
  delay?: number;
}

export default function AreaCard({ iconName, title, description, href, delay = 0 }: AreaCardProps) {
  const Icon = iconMap[iconName] || Heart;
  const hasArticle = href?.startsWith('/blog');

  return (
    <AnimatedSection delay={delay}>
      <Link
        href={href || '/areas-de-atuacao'}
        className="card-elevated p-6 h-full group hover:border-secondary-300 flex flex-col cursor-pointer block"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary-100 transition-colors flex-shrink-0">
            <Icon className="w-7 h-7 text-secondary-500 group-hover:text-secondary-600 transition-colors" />
          </div>
          {hasArticle && (
            <span className="text-[10px] font-medium text-secondary-600 bg-secondary-50 border border-secondary-200 px-2 py-1 rounded-full">
              Ver artigo
            </span>
          )}
        </div>
        <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
        <div className={`flex items-center gap-1 mt-4 text-xs font-medium transition-all duration-300 ${
          hasArticle
            ? 'text-secondary-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1'
            : 'text-gray-400 opacity-0 group-hover:opacity-100'
        }`}>
          <span>{hasArticle ? 'Leia o artigo' : 'Saiba mais'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </AnimatedSection>
  );
}

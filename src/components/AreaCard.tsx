'use client';

import Link from 'next/link';
import {
  Heart,
  Baby,
  Stethoscope,
  Flower2,
  Microscope,
  Sparkles,
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
};

interface AreaCardProps {
  iconName: string;
  title: string;
  description: string;
  delay?: number;
}

export default function AreaCard({ iconName, title, description, delay = 0 }: AreaCardProps) {
  const Icon = iconMap[iconName] || Heart;

  return (
    <AnimatedSection delay={delay}>
      <div className="card-elevated p-6 h-full group hover:border-primary-300">
        <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
          <Icon className="w-7 h-7 text-primary-500" />
        </div>
        <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </AnimatedSection>
  );
}

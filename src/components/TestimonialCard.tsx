'use client';

import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  delay?: number;
}

export default function TestimonialCard({ text, author, role, delay = 0 }: TestimonialCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="card-elevated p-6 h-full relative">
        <Quote className="w-8 h-8 text-primary-200 mb-4" />
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
          ))}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
          &ldquo;{text}&rdquo;
        </p>
        <div className="mt-auto">
          <p className="font-serif font-bold text-gray-900">{author}</p>
          <p className="text-primary-500 text-xs">{role}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

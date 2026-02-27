'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
  delay?: number;
}

export default function BlogCard({ title, excerpt, date, readTime, slug, category, delay = 0 }: BlogCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Link href={`/blog/${slug}`} className="block">
        <div className="card-elevated h-full group">
          <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
            <span className="absolute top-4 left-4 text-xs font-medium text-primary-700 bg-white/90 px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{excerpt}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  );
}

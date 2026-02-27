'use client';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export default function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full mb-4">
        {badge}
      </span>
      <h2 className="section-title text-center">{title}</h2>
      <p className="section-subtitle mx-auto text-center">{subtitle}</p>
    </div>
  );
}

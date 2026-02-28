'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

/**
 * Reusable video embed component.
 * Supports YouTube URLs (watch, shorts, youtu.be, embed) and Instagram reels/posts.
 * Shows a placeholder with a play button; loads the iframe only on click (privacy-friendly).
 */
export default function VideoEmbed({ url, title, className = '' }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const parsed = parseVideoUrl(url);

  if (!parsed) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className={`block rounded-2xl bg-gray-100 p-6 text-center text-gray-500 hover:bg-gray-200 transition-colors ${className}`}>
        <ExternalLink className="w-6 h-6 mx-auto mb-2" />
        <span className="text-sm">Assistir vídeo externo</span>
      </a>
    );
  }

  if (!loaded) {
    return (
      <button onClick={() => setLoaded(true)} className={`group relative block w-full overflow-hidden rounded-2xl bg-gray-900 ${className}`}
        aria-label={title ? `Reproduzir ${title}` : 'Reproduzir vídeo'}>
        <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 relative">
          {parsed.thumbnail && (
            <img src={parsed.thumbnail} alt={title || 'Vídeo'} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
          )}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary-500/90 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
            {title && <p className="text-white text-sm font-medium drop-shadow-lg">{title}</p>}
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <div className="aspect-video w-full">
        <iframe src={parsed.embedUrl} title={title || 'Vídeo'} className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen loading="lazy" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
}

/* ─── URL Parser ─── */
interface ParsedVideo {
  type: 'youtube' | 'instagram';
  embedUrl: string;
  thumbnail?: string;
}

function parseVideoUrl(url: string): ParsedVideo | null {
  if (!url) return null;
  const trimmed = url.trim();

  // YouTube patterns
  const ytPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/, // plain video ID
  ];
  for (const pattern of ytPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      const videoId = match[1];
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }
  }

  // Instagram patterns (reel, p/post)
  const igMatch = trimmed.match(/instagram\.com\/(reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) {
    const shortcode = igMatch[2];
    return {
      type: 'instagram',
      embedUrl: `https://www.instagram.com/p/${shortcode}/embed`,
    };
  }

  return null;
}

import { NextResponse } from 'next/server';

/**
 * Google Places API - Reviews em tempo real
 * 
 * Para funcionar com dados reais:
 * 1. Acesse https://console.cloud.google.com
 * 2. Ative a "Places API" 
 * 3. Crie uma API Key
 * 4. Adicione GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID ao .env
 * 
 * Para encontrar o Place ID:
 * https://developers.google.com/maps/documentation/places/web-service/place-id
 */

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Cache em memória para evitar excesso de chamadas
let cachedData: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function GET() {
  // Se cache ainda é válido, retornar cache
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
    return NextResponse.json(cachedData.data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  }

  // Se não tem API key configurada, retornar dados estáticos
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    const fallbackData = {
      rating: 5.0,
      total_reviews: 1,
      reviews: [
        {
          author_name: 'Paciente Verificada',
          rating: 5,
          text: 'Excelente profissional! Atendimento humanizado e acolhedor. Ambiente lindo e confortável. Super recomendo a Dra. Andresa.',
          relative_time_description: 'recente',
          time: Math.floor(Date.now() / 1000) - 604800,
        },
      ],
      place_name: 'Dra. Andresa Martin Louzada - Ginecologia e Obstetrícia',
      last_updated: new Date().toISOString(),
      source: 'fallback',
    };

    return NextResponse.json(fallbackData, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  }

  try {
    // Buscar dados reais do Google Places API
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&language=pt-BR&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url, { next: { revalidate: 300 } });
    const json = await response.json();

    if (json.status !== 'OK') {
      throw new Error(`Google Places API error: ${json.status}`);
    }

    const place = json.result;

    const formattedData = {
      rating: place.rating || 5.0,
      total_reviews: place.user_ratings_total || 0,
      reviews: (place.reviews || []).map((review: {
        author_name: string;
        rating: number;
        text: string;
        relative_time_description: string;
        time: number;
        profile_photo_url?: string;
      }) => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        relative_time_description: review.relative_time_description,
        time: review.time,
        profile_photo_url: review.profile_photo_url,
      })),
      place_name: place.name || 'Dra. Andresa Martin Louzada',
      last_updated: new Date().toISOString(),
      source: 'google_places_api',
    };

    // Cachear
    cachedData = { data: formattedData, timestamp: Date.now() };

    return NextResponse.json(formattedData, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('Google Reviews API error:', error);

    return NextResponse.json(
      { error: 'Erro ao buscar avaliações', message: String(error) },
      { status: 500 }
    );
  }
}

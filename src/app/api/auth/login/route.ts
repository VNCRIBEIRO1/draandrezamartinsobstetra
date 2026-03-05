import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Credentials - configure in .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@draandresa.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dra2026';
const SECRETARY_EMAIL = process.env.SECRETARY_EMAIL || 'secretaria@draandresa.com';
const SECRETARY_PASSWORD = process.env.SECRETARY_PASSWORD || 'sec2026';
const JWT_SECRET = process.env.JWT_SECRET || 'dra-andresa-secret-key-change-in-production';

/* ═══ RATE LIMITING (in-memory, per IP) ═══ */
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function checkRateLimit(ip: string): { blocked: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || (now - record.firstAttempt > WINDOW_MS)) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return { blocked: false, remaining: MAX_ATTEMPTS - 1, resetIn: WINDOW_MS };
  }

  record.count++;
  const resetIn = WINDOW_MS - (now - record.firstAttempt);

  if (record.count > MAX_ATTEMPTS) {
    return { blocked: true, remaining: 0, resetIn };
  }

  return { blocked: false, remaining: MAX_ATTEMPTS - record.count, resetIn };
}

function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting por IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    const rateCheck = checkRateLimit(ip);
    if (rateCheck.blocked) {
      const minutes = Math.ceil(rateCheck.resetIn / 60000);
      return NextResponse.json(
        { error: `Muitas tentativas. Tente novamente em ${minutes} minutos.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rateCheck.resetIn / 1000)) } }
      );
    }

    const { email, password } = await request.json();

    let role = '';
    let userName = '';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      role = 'medica';
      userName = 'Dra. Andresa';
    } else if (email === SECRETARY_EMAIL && password === SECRETARY_PASSWORD) {
      role = 'secretaria';
      userName = 'Secretária';
    } else {
      return NextResponse.json(
        { error: 'Credenciais inválidas', remaining: rateCheck.remaining },
        { status: 401 }
      );
    }

    // Login bem sucedido - resetar rate limit
    resetRateLimit(ip);

    // Create JWT token with role
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ email, role, userName })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);

    const response = NextResponse.json({ success: true, role, userName });

    // Set httpOnly cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

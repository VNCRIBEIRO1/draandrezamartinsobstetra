import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Credentials - configure in .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@draandresa.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dra2026';
const SECRETARY_EMAIL = process.env.SECRETARY_EMAIL || 'secretaria@draandresa.com';
const SECRETARY_PASSWORD = process.env.SECRETARY_PASSWORD || 'sec2026';
const JWT_SECRET = process.env.JWT_SECRET || 'dra-andresa-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

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

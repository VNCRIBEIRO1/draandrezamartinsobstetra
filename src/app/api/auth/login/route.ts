import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Default admin credentials - change in .env.local
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@draandresa.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dra2026';
const JWT_SECRET = process.env.JWT_SECRET || 'dra-andresa-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    // Create JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);

    const response = NextResponse.json({ success: true });

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

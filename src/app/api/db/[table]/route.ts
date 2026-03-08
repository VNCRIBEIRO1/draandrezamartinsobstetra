import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { 
  patients, consultations, exams, payments, 
  appointments, availableSlots, blockedDates 
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

// Tables map for dynamic routing
const tables: Record<string, typeof patients | typeof consultations | typeof exams | typeof payments | typeof appointments | typeof availableSlots | typeof blockedDates> = {
  patients,
  consultations,
  exams,
  payments,
  appointments,
  available_slots: availableSlots,
  blocked_dates: blockedDates,
};

// Tables that require auth (sensitive data)
const AUTH_REQUIRED = ['patients', 'consultations', 'exams', 'payments'];

// Tables accessible for public reads (chatbot needs these)
const PUBLIC_READ = ['appointments', 'available_slots', 'blocked_dates'];

async function verifyAuth(request: NextRequest): Promise<boolean> {
  try {
    if (!JWT_SECRET) return false;
    const token = request.cookies.get('admin_token')?.value;
    if (!token) return false;
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// ── GET: list all rows (optionally filter by query params)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const { table } = await params;
    const tableRef = tables[table];
    if (!tableRef) {
      return NextResponse.json({ error: 'Tabela não encontrada' }, { status: 404 });
    }

    // Auth check for sensitive tables
    if (AUTH_REQUIRED.includes(table)) {
      const authed = await verifyAuth(request);
      if (!authed) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    }

    const rows = await db.select().from(tableRef);

    // Convert numeric fields back to numbers for payments
    if (table === 'payments') {
      const converted = rows.map((r: Record<string, unknown>) => ({
        ...r,
        valor: Number(r.valor) || 0,
        desconto: Number(r.desconto) || 0,
        valorFinal: Number(r.valorFinal) || 0,
        coberturaPercentual: Number(r.coberturaPercentual) || 0,
        valorConvenio: Number(r.valorConvenio) || 0,
        valorParticular: Number(r.valorParticular) || 0,
      }));
      return NextResponse.json(converted);
    }

    return NextResponse.json(rows);
  } catch (err) {
    console.error(`[DB GET /${(await params).table}]`, err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

// ── POST: insert one or many rows
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const { table } = await params;
    const tableRef = tables[table];
    if (!tableRef) {
      return NextResponse.json({ error: 'Tabela não encontrada' }, { status: 404 });
    }

    // Write operations on public tables allowed for chatbot (appointments)
    if (AUTH_REQUIRED.includes(table)) {
      const authed = await verifyAuth(request);
      if (!authed) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    }

    const body = await request.json();
    const rows = Array.isArray(body) ? body : [body];

    // Clean timestamp fields - let DB handle them
    const cleaned = rows.map((row: Record<string, unknown>) => {
      const r = { ...row };
      // Convert ISO strings for criadoEm/atualizadoEm to Date objects
      if (typeof r.criadoEm === 'string') r.criadoEm = new Date(r.criadoEm);
      if (typeof r.atualizadoEm === 'string') r.atualizadoEm = new Date(r.atualizadoEm);
      // Convert numeric strings for payments
      if (table === 'payments') {
        ['valor', 'desconto', 'valorFinal', 'coberturaPercentual', 'valorConvenio', 'valorParticular'].forEach(k => {
          if (r[k] !== undefined) r[k] = String(r[k]);
        });
      }
      return r;
    });

    await db.insert(tableRef).values(cleaned as never[]);

    return NextResponse.json({ success: true, count: cleaned.length });
  } catch (err) {
    console.error(`[DB POST /${(await params).table}]`, err);
    return NextResponse.json({ error: 'Erro ao inserir: ' + String(err) }, { status: 500 });
  }
}

// ── PUT: update a row by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const { table } = await params;
    const tableRef = tables[table];
    if (!tableRef) {
      return NextResponse.json({ error: 'Tabela não encontrada' }, { status: 404 });
    }

    // All writes require auth except appointments (chatbot)
    if (table !== 'appointments') {
      const authed = await verifyAuth(request);
      if (!authed) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    }

    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    // Clean data
    if (typeof data.criadoEm === 'string') data.criadoEm = new Date(data.criadoEm);
    if (typeof data.atualizadoEm === 'string') data.atualizadoEm = new Date(data.atualizadoEm);
    if (table === 'payments') {
      ['valor', 'desconto', 'valorFinal', 'coberturaPercentual', 'valorConvenio', 'valorParticular'].forEach(k => {
        if (data[k] !== undefined) data[k] = String(data[k]);
      });
    }

    // Use 'id' column from the table
    const idCol = (tableRef as unknown as Record<string, unknown>)['id'];
    await db.update(tableRef).set(data as never).where(eq(idCol as never, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[DB PUT /${(await params).table}]`, err);
    return NextResponse.json({ error: 'Erro ao atualizar: ' + String(err) }, { status: 500 });
  }
}

// ── DELETE: delete a row by id (body or query param) or deleteAll
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  try {
    const { table } = await params;
    const tableRef = tables[table];
    if (!tableRef) {
      return NextResponse.json({ error: 'Tabela não encontrada' }, { status: 404 });
    }

    // Auth check — allow admin for all, but public tables also allowed without auth (chatbot)
    if (AUTH_REQUIRED.includes(table)) {
      const authed = await verifyAuth(request);
      if (!authed) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
      }
    }

    // Try to get ID from body or query params
    let id: string | null = null;
    let deleteAll = false;
    try {
      const body = await request.json();
      id = body.id || null;
      deleteAll = body.deleteAll === true;
    } catch {
      // Fallback to query params
      const { searchParams } = new URL(request.url);
      id = searchParams.get('id');
    }

    if (deleteAll) {
      // Delete all rows from table
      await db.delete(tableRef);
      return NextResponse.json({ success: true, deletedAll: true });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const idCol = (tableRef as unknown as Record<string, unknown>)['id'];
    await db.delete(tableRef).where(eq(idCol as never, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[DB DELETE /${(await params).table}]`, err);
    return NextResponse.json({ error: 'Erro ao deletar: ' + String(err) }, { status: 500 });
  }
}

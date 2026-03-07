import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: Lembrete de Consulta via WhatsApp
 * 
 * Gera o link para enviar lembrete pelo WhatsApp.
 * Em produção, pode ser integrado com API do WhatsApp Business
 * para envio automático.
 */

const WHATSAPP_NUMBER = '5518998207964';

export async function POST(request: NextRequest) {
  try {
    const { paciente, telefone, tipo, data, horario } = await request.json();

    if (!paciente || !telefone || !data || !horario) {
      return NextResponse.json(
        { error: 'Dados incompletos. Informe paciente, telefone, data e horário.' },
        { status: 400 }
      );
    }

    // Formatar data para exibição
    const [y, m, d] = data.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const dataFormatada = `${diasSemana[dateObj.getDay()]}, ${d} de ${meses[parseInt(m) - 1]} de ${y}`;

    // Mensagem de lembrete personalizada
    const mensagem = [
      `Olá, ${paciente}! 🌸`,
      ``,
      `Passando para lembrar da sua consulta:`,
      ``,
      `🏥 *${tipo || 'Consulta'}*`,
      `📅 *${dataFormatada}*`,
      `⏰ *${horario}*`,
      `📍 Espaço Humanizare — Av. Mathias Mendes Cardoso, 460, Sala 08`,
      ``,
      `Por favor, confirme sua presença respondendo esta mensagem.`,
      ``,
      `Caso precise reagendar, entre em contato conosco.`,
      ``,
      `Dra. Andresa Martin Louzada`,
      `Ginecologia e Obstetrícia`,
      `CRM/SP 207702 • RQE 135096`,
    ].join('\n');

    // Formatar telefone para link WhatsApp
    const telLimpo = telefone.replace(/\D/g, '');
    const telFormatado = telLimpo.startsWith('55') ? telLimpo : `55${telLimpo}`;

    const whatsappLink = `https://wa.me/${telFormatado}?text=${encodeURIComponent(mensagem)}`;

    // Log para auditoria (sem dados PII)
    console.log(`[LEMBRETE] ${new Date().toISOString()} | Consulta: ${data} ${horario} | Lembrete enviado`);

    return NextResponse.json({
      success: true,
      whatsappLink,
      mensagem,
      paciente,
      data: dataFormatada,
      horario,
    });
  } catch {
    return NextResponse.json(
      { error: 'Erro ao gerar lembrete.' },
      { status: 500 }
    );
  }
}

/* ═══════════════════════════════════════════════════════════
   GERADOR DE DOCUMENTO — Solicitação de Exame
   Modelo profissional conforme normas brasileiras:
   - CFM Res. 1.638/2002 (prontuário médico)
   - CFM Res. 1.931/2009 (Código de Ética Médica)
   - ANVISA RDC 302/2005 (laboratórios clínicos)
   - TISS / ANS (quando convênio)
   ═══════════════════════════════════════════════════════════ */

import { ExamRecord, Patient, CIDS_COMUNS, formatDateBR, calcularIdade, MEDICO_CONFIG } from './admin-types';
import { siteConfig } from './site-config';

/** Gera HTML para impressão / download PDF da solicitação de exame */
export function gerarHTMLSolicitacao(exam: ExamRecord, patient: Patient): string {
  const age = calcularIdade(patient.dataNascimento);
  const cidDesc = exam.cid10 && CIDS_COMUNS[exam.cid10] ? `${exam.cid10} — ${CIDS_COMUNS[exam.cid10]}` : exam.cid10 || '';
  const dataSol = formatDateBR(exam.dataSolicitacao);
  const hoje = new Date();
  const dataExtenso = hoje.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Solicitação de Exame — ${patient.nome}</title>
<style>
  @page { size: A4; margin: 15mm 20mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    color: #1a1a1a;
    line-height: 1.5;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    max-width: 210mm;
    margin: 0 auto;
    padding: 10mm 0;
  }

  /* ═══ CABEÇALHO ═══ */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 2.5px solid #6b4c8a;
    padding-bottom: 10px;
    margin-bottom: 18px;
  }
  .header-left h1 {
    font-size: 16pt;
    color: #6b4c8a;
    font-weight: 700;
    margin-bottom: 2px;
  }
  .header-left p {
    font-size: 9pt;
    color: #555;
    line-height: 1.4;
  }
  .header-right {
    text-align: right;
    font-size: 8.5pt;
    color: #666;
    line-height: 1.5;
  }
  .header-right .crm {
    font-size: 10pt;
    font-weight: 700;
    color: #6b4c8a;
  }

  /* ═══ TÍTULO DO DOCUMENTO ═══ */
  .doc-title {
    text-align: center;
    background: #f5f0fa;
    border: 1.5px solid #d4c5e2;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 16px;
  }
  .doc-title h2 {
    font-size: 13pt;
    color: #4a3560;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 700;
  }
  .doc-title .urgente {
    display: inline-block;
    background: #dc2626;
    color: white;
    font-size: 9pt;
    padding: 2px 10px;
    border-radius: 3px;
    margin-left: 8px;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .doc-title .data-sol {
    font-size: 9pt;
    color: #777;
    margin-top: 2px;
  }

  /* ═══ SEÇÕES ═══ */
  .section {
    margin-bottom: 14px;
  }
  .section-title {
    font-size: 9pt;
    font-weight: 700;
    color: #6b4c8a;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 1px solid #e5dff0;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }

  /* ═══ DADOS DO PACIENTE ═══ */
  .patient-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 20px;
  }
  .patient-grid .field {
    display: flex;
    gap: 4px;
    font-size: 10pt;
    padding: 2px 0;
  }
  .field-label {
    font-weight: 600;
    color: #444;
    min-width: fit-content;
  }
  .field-value {
    color: #1a1a1a;
  }
  .patient-grid .full {
    grid-column: 1 / -1;
  }

  /* ═══ EXAME SOLICITADO ═══ */
  .exam-box {
    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 4px;
  }
  .exam-name {
    font-size: 13pt;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4px;
  }
  .exam-type {
    font-size: 9pt;
    color: #888;
    margin-bottom: 6px;
  }
  .exam-detail {
    font-size: 10pt;
    margin-bottom: 4px;
  }
  .exam-detail strong {
    color: #444;
  }

  /* ═══ INDICAÇÃO CLÍNICA ═══ */
  .clinical-box {
    border: 1.5px solid #6b4c8a;
    border-radius: 6px;
    padding: 12px 14px;
    background: #fdf9ff;
  }
  .clinical-box p {
    font-size: 10.5pt;
    line-height: 1.6;
  }

  /* ═══ PREPARO ═══ */
  .preparo-box {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    padding: 10px 14px;
  }
  .preparo-box h4 {
    font-size: 9pt;
    color: #1e40af;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .preparo-box p {
    font-size: 10pt;
    color: #1e3a5f;
    line-height: 1.5;
  }

  /* ═══ ASSINATURA ═══ */
  .signature {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .signature-block {
    text-align: center;
    width: 48%;
  }
  .signature-line {
    border-top: 1px solid #333;
    padding-top: 4px;
    font-size: 9.5pt;
    color: #333;
  }
  .signature-line .name {
    font-weight: 700;
    font-size: 10pt;
  }
  .signature-line .detail {
    font-size: 8.5pt;
    color: #666;
  }

  /* ═══ RODAPÉ ═══ */
  .footer {
    margin-top: 20px;
    padding-top: 8px;
    border-top: 1px solid #ddd;
    font-size: 7.5pt;
    color: #999;
    text-align: center;
    line-height: 1.4;
  }

  /* ═══ PRINT RULES ═══ */
  @media print {
    body { background: #fff; }
    .page { padding: 0; }
    .no-print { display: none !important; }
  }

  /* ═══ BOTÃO IMPRIMIR (visível apenas em tela) ═══ */
  .print-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #6b4c8a;
    color: white;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  .print-bar button {
    background: white;
    color: #6b4c8a;
    border: none;
    padding: 8px 20px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 10pt;
    cursor: pointer;
    transition: background 0.2s;
  }
  .print-bar button:hover { background: #f0e6fa; }
  .print-bar span { font-size: 10pt; opacity: 0.9; }
</style>
</head>
<body>

<!-- Barra de ações (não imprime) -->
<div class="print-bar no-print">
  <button onclick="window.print()">🖨️ Imprimir</button>
  <button onclick="window.close()">✕ Fechar</button>
  <span>Solicitação de Exame — ${patient.nome}</span>
</div>

<div class="page" style="margin-top: 50px;">

  <!-- CABEÇALHO -->
  <div class="header">
    <div class="header-left">
      <h1>${siteConfig.nome}</h1>
      <p>${siteConfig.especialidade}</p>
      <p>${siteConfig.consultorio}</p>
      <p>${siteConfig.endereco}</p>
      <p>${siteConfig.cidade}</p>
    </div>
    <div class="header-right">
      <p class="crm">${exam.crm || MEDICO_CONFIG.crm}</p>
      <p>${siteConfig.telefone}</p>
      <p>${siteConfig.email}</p>
    </div>
  </div>

  <!-- TÍTULO -->
  <div class="doc-title">
    <h2>Solicitação de Exame${exam.urgencia === 'urgente' ? '<span class="urgente">URGENTE</span>' : ''}</h2>
    <p class="data-sol">Data da solicitação: ${dataSol}</p>
  </div>

  <!-- DADOS DO PACIENTE -->
  <div class="section">
    <div class="section-title">Identificação do Paciente</div>
    <div class="patient-grid">
      <div class="field full"><span class="field-label">Nome:</span> <span class="field-value">${patient.nome}</span></div>
      <div class="field"><span class="field-label">Data Nasc.:</span> <span class="field-value">${patient.dataNascimento ? formatDateBR(patient.dataNascimento) : '—'}</span></div>
      <div class="field"><span class="field-label">Idade:</span> <span class="field-value">${age > 0 ? age + ' anos' : '—'}</span></div>
      <div class="field"><span class="field-label">CPF:</span> <span class="field-value">${patient.cpf || '—'}</span></div>
      <div class="field"><span class="field-label">Telefone:</span> <span class="field-value">${patient.telefone || '—'}</span></div>
      ${patient.convenio && patient.convenio !== 'Particular' ? `
      <div class="field"><span class="field-label">Convênio:</span> <span class="field-value">${patient.convenio}</span></div>
      <div class="field"><span class="field-label">Carteirinha:</span> <span class="field-value">${patient.numConvenio || '—'}</span></div>
      ` : `
      <div class="field"><span class="field-label">Convênio:</span> <span class="field-value">Particular</span></div>
      <div class="field"></div>
      `}
      ${patient.endereco ? `<div class="field full"><span class="field-label">Endereço:</span> <span class="field-value">${patient.endereco}${patient.cidade ? ', ' + patient.cidade : ''}</span></div>` : ''}
    </div>
  </div>

  <!-- EXAME SOLICITADO -->
  <div class="section">
    <div class="section-title">Exame Solicitado</div>
    <div class="exam-box">
      <div class="exam-name">${exam.nome}</div>
      ${exam.tipo && exam.tipo !== exam.nome ? `<div class="exam-type">Categoria: ${exam.tipo}</div>` : ''}
      ${exam.laboratorio ? `<div class="exam-detail"><strong>Laboratório / Clínica:</strong> ${exam.laboratorio}</div>` : ''}
      ${cidDesc ? `<div class="exam-detail"><strong>CID-10:</strong> ${cidDesc}</div>` : ''}
    </div>
  </div>

  <!-- INDICAÇÃO CLÍNICA -->
  <div class="section">
    <div class="section-title">Indicação Clínica</div>
    <div class="clinical-box">
      <p>${exam.indicacaoClinica || 'Conforme avaliação clínica.'}</p>
    </div>
  </div>

  ${exam.observacoes ? `
  <!-- OBSERVAÇÕES -->
  <div class="section">
    <div class="section-title">Observações</div>
    <p style="font-size:10pt; padding: 4px 0;">${exam.observacoes}</p>
  </div>
  ` : ''}

  ${exam.preparoEspecial ? `
  <!-- PREPARO DO PACIENTE -->
  <div class="section">
    <div class="section-title">Orientações de Preparo ao Paciente</div>
    <div class="preparo-box">
      <h4>⚠ Atenção — Leia antes do exame</h4>
      <p>${exam.preparoEspecial}</p>
    </div>
  </div>
  ` : ''}

  <!-- ASSINATURA -->
  <div class="signature">
    <div class="signature-block">
      <div class="signature-line">
        <p class="detail">Presidente Prudente, ${dataExtenso}</p>
      </div>
    </div>
    <div class="signature-block">
      <div class="signature-line">
        <p class="name">${exam.medicoSolicitante || MEDICO_CONFIG.nome}</p>
        <p class="detail">${exam.crm || MEDICO_CONFIG.crm}</p>
        <p class="detail">${MEDICO_CONFIG.especialidade}</p>
      </div>
    </div>
  </div>

  <!-- RODAPÉ -->
  <div class="footer">
    <p>${siteConfig.consultorio} — ${siteConfig.endereco} — ${siteConfig.cidade}</p>
    <p>Tel: ${siteConfig.telefone} | ${siteConfig.email}</p>
    <p style="margin-top:3px;">Documento gerado eletronicamente em ${new Date().toLocaleString('pt-BR')}. Válido sem assinatura digital conforme Res. CFM 2.299/2021.</p>
  </div>

</div>

</body>
</html>`;
}

/** Abre a solicitação de exame em nova janela para impressão */
export function imprimirSolicitacao(exam: ExamRecord, patient: Patient): void {
  const html = gerarHTMLSolicitacao(exam, patient);
  const printWindow = window.open('', '_blank', 'width=800,height=1100');
  if (!printWindow) {
    alert('Permita pop-ups para imprimir a solicitação.');
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
}

/** Download da solicitação como HTML (pode ser aberto em qualquer navegador / convertido para PDF) */
export function downloadSolicitacao(exam: ExamRecord, patient: Patient): void {
  const html = gerarHTMLSolicitacao(exam, patient);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const nomeArq = `Solicitacao_${exam.nome.replace(/[^a-zA-Z0-9]/g, '_')}_${patient.nome.split(' ')[0]}_${exam.dataSolicitacao}.html`;
  a.download = nomeArq;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Gera HTML para impressão de MÚLTIPLOS exames em uma única solicitação */
export function gerarHTMLSolicitacaoMultipla(exams: ExamRecord[], patient: Patient): string {
  const age = calcularIdade(patient.dataNascimento);
  const dataExtenso = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const dataSol = exams.length > 0 ? formatDateBR(exams[0].dataSolicitacao) : formatDateBR(new Date().toISOString().split('T')[0]);
  const hasUrgente = exams.some(e => e.urgencia === 'urgente');

  const examesList = exams.map((exam, i) => {
    const cidDesc = exam.cid10 && CIDS_COMUNS[exam.cid10] ? `${exam.cid10} — ${CIDS_COMUNS[exam.cid10]}` : exam.cid10 || '';
    return `
    <tr>
      <td style="padding:6px 10px; border-bottom:1px solid #eee; font-weight:600;">${i + 1}</td>
      <td style="padding:6px 10px; border-bottom:1px solid #eee;">
        <strong>${exam.nome}</strong>
        ${exam.tipo && exam.tipo !== exam.nome ? `<br><span style="font-size:8.5pt;color:#888;">${exam.tipo}</span>` : ''}
      </td>
      <td style="padding:6px 10px; border-bottom:1px solid #eee; font-size:9pt;">${exam.indicacaoClinica || '—'}</td>
      <td style="padding:6px 10px; border-bottom:1px solid #eee; font-size:9pt;">${cidDesc || '—'}</td>
      <td style="padding:6px 10px; border-bottom:1px solid #eee; font-size:9pt; text-align:center;">
        ${exam.urgencia === 'urgente' ? '<span style="color:#dc2626;font-weight:700;">URGENTE</span>' : 'Rotina'}
      </td>
    </tr>`;
  }).join('');

  const preparoList = exams
    .filter(e => e.preparoEspecial)
    .map(e => `<li><strong>${e.nome}:</strong> ${e.preparoEspecial}</li>`)
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Solicitação de Exames — ${patient.nome}</title>
<style>
  @page { size: A4; margin: 15mm 20mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt; color: #1a1a1a; line-height: 1.5; background: #fff;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .page { max-width: 210mm; margin: 0 auto; padding: 10mm 0; }
  .header {
    display: flex; justify-content: space-between; align-items: flex-start;
    border-bottom: 2.5px solid #6b4c8a; padding-bottom: 10px; margin-bottom: 18px;
  }
  .header-left h1 { font-size: 16pt; color: #6b4c8a; font-weight: 700; margin-bottom: 2px; }
  .header-left p { font-size: 9pt; color: #555; line-height: 1.4; }
  .header-right { text-align: right; font-size: 8.5pt; color: #666; line-height: 1.5; }
  .header-right .crm { font-size: 10pt; font-weight: 700; color: #6b4c8a; }
  .doc-title {
    text-align: center; background: #f5f0fa; border: 1.5px solid #d4c5e2;
    border-radius: 6px; padding: 8px 12px; margin-bottom: 16px;
  }
  .doc-title h2 { font-size: 13pt; color: #4a3560; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; }
  .urgente-tag { display:inline-block; background:#dc2626; color:white; font-size:9pt; padding:2px 10px; border-radius:3px; margin-left:8px; font-weight:700; }
  .section { margin-bottom: 14px; }
  .section-title { font-size:9pt; font-weight:700; color:#6b4c8a; text-transform:uppercase; letter-spacing:0.8px; border-bottom:1px solid #e5dff0; padding-bottom:3px; margin-bottom:8px; }
  .patient-grid { display:grid; grid-template-columns:1fr 1fr; gap:4px 20px; }
  .field { display:flex; gap:4px; font-size:10pt; padding:2px 0; }
  .field-label { font-weight:600; color:#444; }
  .full { grid-column: 1 / -1; }
  table { width:100%; border-collapse:collapse; font-size:10pt; }
  thead th { background:#f5f0fa; color:#4a3560; font-size:8.5pt; text-transform:uppercase; letter-spacing:0.5px; padding:8px 10px; text-align:left; border-bottom:2px solid #d4c5e2; }
  .preparo-box { background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:10px 14px; }
  .preparo-box h4 { font-size:9pt; color:#1e40af; margin-bottom:4px; text-transform:uppercase; }
  .preparo-box ul { font-size:10pt; color:#1e3a5f; padding-left:18px; line-height:1.7; }
  .signature { margin-top:30px; display:flex; justify-content:space-between; align-items:flex-end; }
  .signature-block { text-align:center; width:48%; }
  .signature-line { border-top:1px solid #333; padding-top:4px; font-size:9.5pt; color:#333; }
  .signature-line .name { font-weight:700; font-size:10pt; }
  .signature-line .detail { font-size:8.5pt; color:#666; }
  .footer { margin-top:20px; padding-top:8px; border-top:1px solid #ddd; font-size:7.5pt; color:#999; text-align:center; line-height:1.4; }
  .print-bar { position:fixed; top:0; left:0; right:0; background:#6b4c8a; color:white; padding:10px 20px; display:flex; gap:10px; align-items:center; z-index:1000; box-shadow:0 2px 8px rgba(0,0,0,0.2); }
  .print-bar button { background:white; color:#6b4c8a; border:none; padding:8px 20px; border-radius:6px; font-weight:700; font-size:10pt; cursor:pointer; }
  .print-bar button:hover { background:#f0e6fa; }
  .print-bar span { font-size:10pt; opacity:0.9; }
  @media print { .no-print { display:none !important; } .page { padding:0; margin-top:0 !important; } }
</style>
</head>
<body>

<div class="print-bar no-print">
  <button onclick="window.print()">🖨️ Imprimir</button>
  <button onclick="window.close()">✕ Fechar</button>
  <span>Solicitação de Exames (${exams.length}) — ${patient.nome}</span>
</div>

<div class="page" style="margin-top:50px;">

  <div class="header">
    <div class="header-left">
      <h1>${siteConfig.nome}</h1>
      <p>${siteConfig.especialidade}</p>
      <p>${siteConfig.consultorio}</p>
      <p>${siteConfig.endereco}</p>
      <p>${siteConfig.cidade}</p>
    </div>
    <div class="header-right">
      <p class="crm">${MEDICO_CONFIG.crm}</p>
      <p>${siteConfig.telefone}</p>
      <p>${siteConfig.email}</p>
    </div>
  </div>

  <div class="doc-title">
    <h2>Solicitação de Exames${hasUrgente ? '<span class="urgente-tag">CONTÉM URGENTE</span>' : ''}</h2>
    <p style="font-size:9pt;color:#777;margin-top:2px;">Data: ${dataSol} | ${exams.length} exame(s)</p>
  </div>

  <div class="section">
    <div class="section-title">Identificação do Paciente</div>
    <div class="patient-grid">
      <div class="field full"><span class="field-label">Nome:</span> <span>${patient.nome}</span></div>
      <div class="field"><span class="field-label">Data Nasc.:</span> <span>${patient.dataNascimento ? formatDateBR(patient.dataNascimento) : '—'}</span></div>
      <div class="field"><span class="field-label">Idade:</span> <span>${age > 0 ? age + ' anos' : '—'}</span></div>
      <div class="field"><span class="field-label">CPF:</span> <span>${patient.cpf || '—'}</span></div>
      <div class="field"><span class="field-label">Telefone:</span> <span>${patient.telefone || '—'}</span></div>
      ${patient.convenio && patient.convenio !== 'Particular' ? `
      <div class="field"><span class="field-label">Convênio:</span> <span>${patient.convenio}</span></div>
      <div class="field"><span class="field-label">Carteirinha:</span> <span>${patient.numConvenio || '—'}</span></div>
      ` : `
      <div class="field"><span class="field-label">Convênio:</span> <span>Particular</span></div>
      <div class="field"></div>
      `}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Exames Solicitados</div>
    <table>
      <thead>
        <tr>
          <th style="width:30px;">#</th>
          <th>Exame</th>
          <th>Indicação Clínica</th>
          <th style="width:100px;">CID-10</th>
          <th style="width:70px;text-align:center;">Prioridade</th>
        </tr>
      </thead>
      <tbody>${examesList}</tbody>
    </table>
  </div>

  ${preparoList ? `
  <div class="section">
    <div class="section-title">Orientações de Preparo ao Paciente</div>
    <div class="preparo-box">
      <h4>⚠ Atenção — Leia antes dos exames</h4>
      <ul>${preparoList}</ul>
    </div>
  </div>
  ` : ''}

  <div class="signature">
    <div class="signature-block">
      <div class="signature-line">
        <p style="font-size:8.5pt;color:#666;">Presidente Prudente, ${dataExtenso}</p>
      </div>
    </div>
    <div class="signature-block">
      <div class="signature-line">
        <p class="name">${MEDICO_CONFIG.nome}</p>
        <p class="detail">${MEDICO_CONFIG.crm}</p>
        <p class="detail">${MEDICO_CONFIG.especialidade}</p>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>${siteConfig.consultorio} — ${siteConfig.endereco} — ${siteConfig.cidade}</p>
    <p>Tel: ${siteConfig.telefone} | ${siteConfig.email}</p>
    <p style="margin-top:3px;">Documento gerado eletronicamente em ${new Date().toLocaleString('pt-BR')}. Válido sem assinatura digital conforme Res. CFM 2.299/2021.</p>
  </div>

</div>
</body>
</html>`;
}

/** Impressão em lote de múltiplos exames numa única guia */
export function imprimirSolicitacaoMultipla(exams: ExamRecord[], patient: Patient): void {
  const html = gerarHTMLSolicitacaoMultipla(exams, patient);
  const printWindow = window.open('', '_blank', 'width=800,height=1100');
  if (!printWindow) { alert('Permita pop-ups para imprimir.'); return; }
  printWindow.document.write(html);
  printWindow.document.close();
}

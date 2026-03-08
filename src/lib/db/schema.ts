import { pgTable, text, varchar, timestamp, numeric, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

/* ═══════════════════════════════════════════════════════════
   DATABASE SCHEMA — Sistema Dra. Andresa Martin Louzada
   Powered by Neon PostgreSQL + Drizzle ORM
   ═══════════════════════════════════════════════════════════ */

// ── Pacientes ──
export const patients = pgTable('patients', {
  id: text('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  telefone: varchar('telefone', { length: 30 }).notNull(),
  email: varchar('email', { length: 255 }).default(''),
  cpf: varchar('cpf', { length: 20 }).default(''),
  dataNascimento: varchar('data_nascimento', { length: 10 }).default(''),
  endereco: text('endereco').default(''),
  cidade: varchar('cidade', { length: 100 }).default(''),
  tipoSanguineo: varchar('tipo_sanguineo', { length: 20 }).default('Não informado'),
  alergias: text('alergias').default(''),
  historicoMedico: text('historico_medico').default(''),
  medicamentosEmUso: text('medicamentos_em_uso').default(''),
  antecedentesGineco: text('antecedentes_gineco').default(''),
  convenio: varchar('convenio', { length: 100 }).default('Particular'),
  numConvenio: varchar('num_convenio', { length: 50 }).default(''),
  observacoes: text('observacoes').default(''),
  statusSaude: varchar('status_saude', { length: 30 }).default('estavel').notNull(),
  profissao: varchar('profissao', { length: 100 }).default(''),
  estadoCivil: varchar('estado_civil', { length: 30 }).default('Não informado'),
  contatoEmergenciaNome: varchar('contato_emergencia_nome', { length: 255 }).default(''),
  contatoEmergenciaTelefone: varchar('contato_emergencia_telefone', { length: 30 }).default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
  atualizadoEm: timestamp('atualizado_em').defaultNow().notNull(),
});

// ── Consultas (Prontuário) ──
export const consultations = pgTable('consultations', {
  id: text('id').primaryKey(),
  pacienteId: text('paciente_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  data: varchar('data', { length: 10 }).notNull(),
  horario: varchar('horario', { length: 10 }).default(''),
  tipo: varchar('tipo', { length: 100 }).default(''),
  queixaPrincipal: text('queixa_principal').default(''),
  hda: text('hda').default(''),
  exameFisico: text('exame_fisico').default(''),
  hipoteseDiagnostica: text('hipotese_diagnostica').default(''),
  conduta: text('conduta').default(''),
  prescricao: text('prescricao').default(''),
  examesSolicitados: text('exames_solicitados').default(''),
  observacoes: text('observacoes').default(''),
  retorno: varchar('retorno', { length: 30 }).default(''),
  pesoKg: varchar('peso_kg', { length: 10 }).default(''),
  alturaM: varchar('altura_m', { length: 10 }).default(''),
  pressaoArterial: varchar('pressao_arterial', { length: 20 }).default(''),
  temperatura: varchar('temperatura', { length: 10 }).default(''),
  idadeGestacional: varchar('idade_gestacional', { length: 20 }).default(''),
  alturaUterina: varchar('altura_uterina', { length: 20 }).default(''),
  bcf: varchar('bcf', { length: 20 }).default(''),
  movimentosFetais: varchar('movimentos_fetais', { length: 20 }).default(''),
  cid10: varchar('cid10', { length: 20 }).default(''),
  encaminhamento: text('encaminhamento').default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});

// ── Exames ──
export const exams = pgTable('exams', {
  id: text('id').primaryKey(),
  pacienteId: text('paciente_id').notNull().references(() => patients.id, { onDelete: 'cascade' }),
  consultaId: text('consulta_id').default(''),
  nome: varchar('nome', { length: 255 }).default(''),
  tipo: varchar('tipo', { length: 100 }).default(''),
  dataSolicitacao: varchar('data_solicitacao', { length: 10 }).default(''),
  dataResultado: varchar('data_resultado', { length: 10 }).default(''),
  resultado: text('resultado').default(''),
  status: varchar('status', { length: 30 }).default('solicitado').notNull(),
  arquivoNome: varchar('arquivo_nome', { length: 255 }).default(''),
  arquivoBase64: text('arquivo_base64').default(''),
  arquivoTipo: varchar('arquivo_tipo', { length: 100 }).default(''),
  observacoes: text('observacoes').default(''),
  indicacaoClinica: text('indicacao_clinica').default(''),
  cid10: varchar('cid10', { length: 20 }).default(''),
  urgencia: varchar('urgencia', { length: 20 }).default('rotina'),
  laboratorio: varchar('laboratorio', { length: 255 }).default(''),
  medicoSolicitante: varchar('medico_solicitante', { length: 255 }).default(''),
  crm: varchar('crm', { length: 50 }).default(''),
  preparoEspecial: text('preparo_especial').default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});

// ── Pagamentos ──
export const payments = pgTable('payments', {
  id: text('id').primaryKey(),
  pacienteId: text('paciente_id').default(''),
  pacienteNome: varchar('paciente_nome', { length: 255 }).default(''),
  consultaId: text('consulta_id').default(''),
  data: varchar('data', { length: 10 }).default(''),
  descricao: text('descricao').default(''),
  valor: numeric('valor', { precision: 10, scale: 2 }).default('0'),
  desconto: numeric('desconto', { precision: 10, scale: 2 }).default('0'),
  valorFinal: numeric('valor_final', { precision: 10, scale: 2 }).default('0'),
  formaPagamento: varchar('forma_pagamento', { length: 30 }).default('pix'),
  status: varchar('status', { length: 20 }).default('pendente').notNull(),
  convenio: varchar('convenio', { length: 100 }).default(''),
  coberturaPercentual: numeric('cobertura_percentual', { precision: 5, scale: 2 }).default('0'),
  valorConvenio: numeric('valor_convenio', { precision: 10, scale: 2 }).default('0'),
  valorParticular: numeric('valor_particular', { precision: 10, scale: 2 }).default('0'),
  parcelas: integer('parcelas').default(1),
  observacoes: text('observacoes').default(''),
  dataVencimento: varchar('data_vencimento', { length: 10 }).default(''),
  notaFiscal: varchar('nota_fiscal', { length: 100 }).default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});

// ── Agendamentos ──
export const appointments = pgTable('appointments', {
  id: text('id').primaryKey(),
  paciente: varchar('paciente', { length: 255 }).notNull(),
  telefone: varchar('telefone', { length: 30 }).notNull(),
  tipo: varchar('tipo', { length: 100 }).default(''),
  data: varchar('data', { length: 10 }).notNull(),
  horario: varchar('horario', { length: 10 }).notNull(),
  status: varchar('status', { length: 20 }).default('pendente').notNull(),
  observacoes: text('observacoes').default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
  origem: varchar('origem', { length: 20 }).default('manual').notNull(),
});

// ── Horários Disponíveis ──
export const availableSlots = pgTable('available_slots', {
  id: text('id').primaryKey(),
  dia: varchar('dia', { length: 20 }).notNull(),
  horario: varchar('horario', { length: 10 }).notNull(),
  ativo: boolean('ativo').default(true).notNull(),
});

// ── Bloqueio de Datas ──
export const blockedDates = pgTable('blocked_dates', {
  id: text('id').primaryKey(),
  dataInicio: varchar('data_inicio', { length: 10 }).notNull(),
  dataFim: varchar('data_fim', { length: 10 }).notNull(),
  tipo: varchar('tipo', { length: 30 }).default('dia_inteiro').notNull(),
  horariosEspecificos: jsonb('horarios_especificos').$type<string[]>().default([]),
  motivo: varchar('motivo', { length: 255 }).default(''),
  criadoEm: timestamp('criado_em').defaultNow().notNull(),
});

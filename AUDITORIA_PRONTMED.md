# 🔍 Auditoria de Integração — Prontmed

**Data:** 04 de Março de 2026  
**Projeto:** Dra. Andresa Martin Louzada — Site Institucional  
**Auditor:** Análise Automatizada  

---

## 📋 Resumo Executivo

O site atualmente **NÃO possui integração com o Prontmed** ou qualquer sistema de prontuário eletrônico externo. Todo o fluxo de agendamento é 100% client-side, utilizando `localStorage` do navegador — sem persistência em servidor.

---

## 🔄 Fluxo de Agendamento Atual

| Etapa | Componente | Mecanismo |
|-------|-----------|-----------|
| Entrada | Página `/agendar` | ChatBot ou WhatsApp |
| Motor de booking | `ChatBot.tsx` | Fluxo conversacional multi-step |
| Contato rápido | `WhatsAppButton.tsx` | Redirecionamento WhatsApp |
| Formulário | `ContactForm.tsx` | Gera mensagem WhatsApp com dados |

### Passos do ChatBot:
1. Selecionar tipo de consulta
2. Calendário visual com dias disponíveis
3. Seleção de horário (manhã/tarde, slots de 30min)
4. Coleta de nome e telefone
5. Resumo/confirmação
6. Salva em `localStorage` → redireciona para WhatsApp

---

## 🗃️ Armazenamento Atual (localStorage)

| Chave | Finalidade |
|-------|-----------|
| `dra_appointments` | Array de agendamentos |
| `dra_slots` | Horários personalizados por dia |
| `dra_blocked_dates` | Datas bloqueadas |
| `dra_patients` | Cadastro de pacientes |
| `dra_consultations` | Registro de consultas |
| `dra_exams` | Registro de exames |
| `dra_payments` | Registro de pagamentos |

⚠️ **Risco:** Todos os dados são perdidos ao limpar o cache do navegador.

---

## 🔌 Integrações Externas Atuais

| Integração | Status |
|-----------|--------|
| Google Places API (reviews) | ✅ Implementado |
| WhatsApp (wa.me) | ✅ Ativo |
| JWT Auth (painel admin) | ✅ Implementado |
| **Prontmed** | ❌ Não implementado |

---

## 📌 Estado das Variáveis Prontmed

Existem no `.env.example` mas **nenhum código as consome**:

```env
PRONTMED_API_URL=https://api.prontmed.com/v1
PRONTMED_API_KEY=
PRONTMED_CLINIC_ID=
```

Zero referências no código-fonte (0 resultados em grep por "prontmed").

---

## 🛠️ Plano de Integração Prontmed

### Arquivos a Criar:
- `src/lib/prontmed-client.ts` — Client wrapper da API Prontmed
- `src/app/api/prontmed/availability/route.ts` — Consultar horários disponíveis
- `src/app/api/prontmed/appointments/route.ts` — Criar agendamentos
- `src/app/api/prontmed/patients/route.ts` — Buscar/criar pacientes
- `src/app/api/prontmed/webhook/route.ts` — Receber callbacks

### Arquivos a Modificar:
- `src/components/ChatBot.tsx` — Substituir localStorage por chamadas API
- `src/app/agendar/page.tsx` — Integrar com Prontmed booking
- `src/components/admin/*` — Sincronizar CRUD com Prontmed

### Requisitos:
1. Obter credenciais de API do Prontmed
2. Documentação da API Prontmed (endpoints, schemas)
3. Configurar `PRONTMED_API_KEY` e `PRONTMED_CLINIC_ID`
4. Definir se Prontmed será source-of-truth ou sync bidirecional

---

## ✅ Recomendações

1. **Curto prazo:** Manter fluxo atual (WhatsApp) como fallback
2. **Médio prazo:** Implementar client Prontmed e migrar agendamentos
3. **Longo prazo:** Painel admin consultar Prontmed como fonte primária
4. **Segurança:** Nunca expor `PRONTMED_API_KEY` no client-side
5. **Monitoramento:** Adicionar logs para rastrear falhas de integração

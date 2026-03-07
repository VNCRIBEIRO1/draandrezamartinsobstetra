# 🔒 Auditoria de Segurança — Sistema Dra. Andresa Martin Louzada

**Data:** 07/03/2026 19:20:40
**Pontuação LGPD/Segurança:** 0/100
**Comparativo:** Padrão Prontmed / LGPD / OWASP Top 10

## Resumo Executivo

| Severidade | Qtd | Descrição |
|------------|-----|-----------|
| 🔴 Crítico | 4 | Risco imediato de perda/exposição de dados |
| 🟠 Alto | 2 | Vulnerabilidade significativa |
| 🟡 Médio | 2 | Melhoria recomendada |
| 🔵 Baixo | 3 | Ajuste menor |
| ✅ OK/Info | 11 | Controle adequado |

---

### 🔴 CRÍTICO (4)

**1. [AUTH] .env.local NÃO EXISTE**
> Sem .env.local, o sistema usa os fallbacks hardcoded no código-fonte: dra2026, sec2026.
> 💡 **Correção:** Criar .env.local com senhas fortes e JWT_SECRET de 64+ caracteres.

**2. [LGPD] Dados de saúde em localStorage (GRAVÍSSIMO)**
> 7 arquivos usam localStorage com 40 operações. Dados de pacientes (CPF, histórico médico, prontuários, exames, pagamentos) ficam no navegador. Qualquer pessoa com acesso ao computador pode inspecionar DevTools > Application > localStorage. Perda total ao limpar cache.
> 💡 **Correção:** Migrar para banco de dados server-side (PostgreSQL/Supabase/MongoDB). localStorage apenas para preferências de UI.

**3. [DATA] Sem sistema de backup**
> Todos os dados ficam em localStorage do navegador. Não existe backup automático nem manual. Limpeza de cache, formatação ou troca de navegador/computador = perda total e irrecuperável de TODOS os dados.
> 💡 **Correção:** Implementar: 1) Banco de dados server-side, 2) Backup automático diário, 3) Exportação manual em JSON/CSV.

**4. [LGPD] Arquivos de exames médicos armazenados em base64 no localStorage**
> A interface ExamRecord contém campos arquivoBase64/arquivoNome/arquivoTipo. Laudos, resultados de exames e documentos médicos ficam em texto plain no localStorage do navegador. VIOLA diretamente a LGPD Art. 46 (segurança de dados sensíveis de saúde).
> 💡 **Correção:** Armazenar arquivos em storage server-side seguro (S3/Supabase Storage) com acesso autenticado.

### 🟠 ALTO (2)

**1. [LGPD] ChatBot público acessa dados via localStorage**
> O chatbot (acessível por qualquer visitante do site) lê localStorage com agendamentos e dados bloqueados. Visitante pode abrir DevTools e ver dados dos pacientes agendados.
> 💡 **Correção:** Migrar dados do chatbot para API server-side protegida por autenticação.

**2. [LGPD] Dados pessoais sensíveis (CPF, histórico médico) sem criptografia**
> O model Patient contém CPF, histórico médico, alergias, medicamentos, antecedentes ginecológicos. Todos armazenados em plain text no localStorage sem nenhuma criptografia.
> 💡 **Correção:** Implementar criptografia AES-256 para dados sensíveis e migrar para banco server-side.

### 🟡 MÉDIO (2)

**1. [AUTH] Rate limiting in-memory (não persistente)**
> O rate limit é em memória (Map). Resetado a cada deploy/restart do servidor. Não funciona em edge/serverless com múltiplas instâncias.
> 💡 **Correção:** Usar Redis ou Upstash para rate limiting persistente em produção.

**2. [FEATURE] Lembretes via WhatsApp são manuais (não automáticos)**
> O sistema gera link wa.me mas requer ação manual para enviar cada lembrete. Sem cron job ou envio automático.
> 💡 **Correção:** Integrar WhatsApp Business API ou Twilio para envio automático 24h antes da consulta.

### 🔵 BAIXO (3)

**1. [AUTH] JWT expira em 24h (muito longo para dados médicos)**
> Para sistema com dados sensíveis de saúde, sessão de 24h é excessiva.
> 💡 **Correção:** Reduzir para 2-4 horas com refresh token ou re-autenticação.

**2. [CONFIG] Variáveis NEXT_PUBLIC_ expostas ao client**
> Variáveis com prefixo NEXT_PUBLIC_ são incluídas no bundle JavaScript do client.
> 💡 **Correção:** Garantir que apenas informações não-sensíveis (URL do site) usem este prefixo.

**3. [CODE] console.log com dados de paciente em produção**
> A rota de lembrete faz console.log com nome do paciente e telefone.
> 💡 **Correção:** Usar sistema de logging estruturado sem dados PII em produção.

### ✅ INFO (11)

**1. [HEADERS] ✅ CSP configurado**

**2. [HEADERS] ✅ X-Frame-Options: DENY**
> Protege contra clickjacking

**3. [HEADERS] ✅ HSTS configurado**
> Força HTTPS com max-age 1 ano

**4. [HEADERS] ✅ X-Content-Type-Options: nosniff**

**5. [HEADERS] ✅ Referrer-Policy configurado**

**6. [HEADERS] ✅ Permissions-Policy configurado**

**7. [AUTH] ✅ Cookie httpOnly**
> Token JWT armazenado em cookie httpOnly (não acessível via JS client)

**8. [AUTH] ✅ Cookie secure em produção**
> Cookie só enviado via HTTPS em produção

**9. [AUTH] ✅ Rate limiting no login**
> 5 tentativas por 15 min por IP

**10. [CONFIG] ✅ .env.local no .gitignore**
> Arquivo de senhas não é commitado

**11. [DEPLOY] ✅ Deploy no Vercel com HTTPS automático**
> Vercel fornece HTTPS/TLS automático para todos os domínios.

---

## Comparativo com Prontmed

| Funcionalidade | Prontmed | Este Sistema | Status |
|----------------|----------|--------------|--------|
| Banco de dados server-side | ✅ PostgreSQL | ❌ localStorage | 🔴 Crítico |
| Criptografia de dados sensíveis | ✅ AES-256 + TLS | ❌ Plain text | 🔴 Crítico |
| Backup automático | ✅ Diário + incremental | ❌ Nenhum | 🔴 Crítico |
| Conformidade LGPD | ✅ Certificado | ❌ Não atende | 🔴 Crítico |
| Autenticação forte | ✅ MFA + SSO | ⚠️ JWT básico | 🟠 Alto |
| Auditoria de acessos | ✅ Logs completos | ❌ Nenhum | 🟠 Alto |
| Headers de segurança | ✅ CSP + todos | ⚠️ Sem CSP | 🟠 Alto |
| Lembretes automáticos | ✅ SMS + Email | ⚠️ Manual (WhatsApp) | 🟡 Médio |
| Rate limiting | ✅ Redis distribuído | ⚠️ In-memory | 🟡 Médio |
| HTTPS/TLS | ✅ | ✅ Vercel | ✅ OK |
| Cookie httpOnly | ✅ | ✅ | ✅ OK |
| Anti-clickjacking | ✅ | ✅ X-Frame-Options | ✅ OK |
| HSTS | ✅ | ✅ | ✅ OK |

---

## Plano de Correção Prioritário

### Fase 1 — Correções Imediatas (aplicadas nesta auditoria)
1. ✅ Remover senhas hardcoded/fallback do código-fonte
2. ✅ Remover e-mail de admin do placeholder da tela de login
3. ✅ Gerar JWT_SECRET forte e configurar no Vercel
4. ✅ Adicionar Content-Security-Policy (CSP)
5. ✅ Reduzir expiração do JWT de 24h para 4h

### Fase 2 — Melhorias de Curto Prazo (1-2 semanas)
6. Migrar dados para banco server-side (Supabase/PostgreSQL)
7. Implementar exportação/backup em JSON/CSV
8. Implementar log de auditoria de acessos

### Fase 3 — Melhorias de Médio Prazo (1 mês)
9. Integrar WhatsApp Business API para lembretes automáticos
10. Implementar criptografia de dados sensíveis
11. Rate limiting com Redis/Upstash
12. Autenticação dois fatores (2FA)

---
*Relatório gerado automaticamente pelo Security Audit Scanner v1.0*
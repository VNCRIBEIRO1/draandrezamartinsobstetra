'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Wallet, Plus, Search, Edit3, Trash2, Save, X, Calendar,
  TrendingUp, TrendingDown, DollarSign, CreditCard, Filter,
  CheckCircle2, Clock, Users
} from 'lucide-react';
import {
  Patient, Payment, FORMAS_PAGAMENTO, STATUS_PAGAMENTO_CONFIG,
  CONVENIOS, VALORES_CONSULTA, TIPOS_CONSULTA,
  formatarMoeda, formatDateBR, toISO, LS_KEYS,
} from '@/lib/admin-types';

const defaultPayForm = (): Partial<Payment> => ({
  pacienteId: '', pacienteNome: '', consultaId: '', data: toISO(new Date()),
  descricao: '', valor: 0, desconto: 0, valorFinal: 0, formaPagamento: 'pix',
  status: 'pendente', convenio: '', coberturaPercentual: 0,
  valorConvenio: 0, valorParticular: 0, parcelas: 1, observacoes: '',
  dataVencimento: '', notaFiscal: '',
});

export default function FinanceTab() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPay, setEditingPay] = useState<Payment | null>(null);
  const [form, setForm] = useState<Partial<Payment>>(defaultPayForm());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterMethod, setFilterMethod] = useState('todos');
  const [filterMonth, setFilterMonth] = useState(toISO(new Date()).slice(0, 7)); // YYYY-MM

  /* ── Load/Save ── */
  useEffect(() => {
    const p = localStorage.getItem(LS_KEYS.payments);
    const pts = localStorage.getItem(LS_KEYS.patients);
    if (p) setPayments(JSON.parse(p));
    if (pts) setPatients(JSON.parse(pts));
  }, []);

  useEffect(() => { localStorage.setItem(LS_KEYS.payments, JSON.stringify(payments)); }, [payments]);

  /* ── Recalculate form values ── */
  const recalc = (f: Partial<Payment>) => {
    const valor = f.valor || 0;
    const desconto = f.desconto || 0;
    const cobertura = f.coberturaPercentual || 0;
    const subtotal = valor - desconto;
    const valorConvenio = subtotal * (cobertura / 100);
    const valorParticular = subtotal - valorConvenio;
    return { ...f, valorFinal: subtotal, valorConvenio, valorParticular };
  };

  const updateForm = (updates: Partial<Payment>) => {
    setForm(prev => recalc({ ...prev, ...updates }));
  };

  /* ── Auto-fill value from consultation type ── */
  const setTipoConsulta = (tipo: string) => {
    const valor = VALORES_CONSULTA[tipo] || 0;
    updateForm({ descricao: tipo, valor });
  };

  /* ── CRUD ── */
  const savePayment = () => {
    if (!form.pacienteId || !form.descricao) return;
    const patientName = patients.find(p => p.id === form.pacienteId)?.nome || form.pacienteNome || 'Paciente';
    const now = new Date().toISOString();
    const final = recalc(form);
    if (editingPay) {
      setPayments(prev => prev.map(p => p.id === editingPay.id ? { ...p, ...final, pacienteNome: patientName } as Payment : p));
    } else {
      setPayments(prev => [...prev, { ...final, id: Date.now().toString(), pacienteNome: patientName, criadoEm: now } as Payment]);
    }
    resetForm();
  };

  const editPayment = (p: Payment) => { setEditingPay(p); setForm({ ...p }); setShowForm(true); };
  const deletePayment = (id: string) => { if (confirm('Excluir pagamento?')) setPayments(prev => prev.filter(p => p.id !== id)); };
  const resetForm = () => { setShowForm(false); setEditingPay(null); setForm(defaultPayForm()); };

  const toggleStatus = (id: string) => {
    setPayments(prev => prev.map(p => {
      if (p.id !== id) return p;
      const cycle: Payment['status'][] = ['pendente', 'pago', 'parcial'];
      const idx = cycle.indexOf(p.status);
      return { ...p, status: cycle[(idx + 1) % cycle.length] };
    }));
  };

  /* ── Filtered Payments ── */
  const filteredPayments = useMemo(() => {
    let list = [...payments];
    if (filterStatus !== 'todos') list = list.filter(p => p.status === filterStatus);
    if (filterMethod !== 'todos') list = list.filter(p => p.formaPagamento === filterMethod);
    if (filterMonth) list = list.filter(p => p.data?.startsWith(filterMonth));
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(p => (p.pacienteNome || '').toLowerCase().includes(s) || (p.descricao || '').toLowerCase().includes(s));
    }
    return list.sort((a, b) => b.data.localeCompare(a.data));
  }, [payments, filterStatus, filterMethod, filterMonth, searchTerm]);

  /* ── Stats ── */
  const monthPayments = useMemo(() => payments.filter(p => p.data?.startsWith(filterMonth)), [payments, filterMonth]);

  const stats = useMemo(() => ({
    totalMes: monthPayments.filter(p => p.status === 'pago').reduce((s, p) => s + p.valorFinal, 0),
    pendenteMes: monthPayments.filter(p => p.status === 'pendente').reduce((s, p) => s + p.valorFinal, 0),
    totalGeral: payments.filter(p => p.status === 'pago').reduce((s, p) => s + p.valorFinal, 0),
    totalPendente: payments.filter(p => p.status === 'pendente').reduce((s, p) => s + p.valorFinal, 0),
    convenioMes: monthPayments.filter(p => p.status === 'pago').reduce((s, p) => s + (p.valorConvenio || 0), 0),
    particularMes: monthPayments.filter(p => p.status === 'pago').reduce((s, p) => s + (p.valorParticular || 0), 0),
    qtdMes: monthPayments.length,
    qtdPago: monthPayments.filter(p => p.status === 'pago').length,
  }), [monthPayments, payments]);

  /* ── Payment method breakdown ── */
  const methodBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    monthPayments.filter(p => p.status === 'pago').forEach(p => {
      const key = p.formaPagamento || 'outro';
      map[key] = (map[key] || 0) + p.valorFinal;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [monthPayments]);

  const mesLabel = filterMonth
    ? new Date(filterMonth + '-15').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    : 'Geral';

  return (
    <>
      {/* Month Selector */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-primary-500" />
        <input type="month" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
        <span className="text-sm text-gray-500 capitalize">{mesLabel}</span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-2xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-700" />
            </div>
            <span className="text-xs text-green-600 font-medium">Recebido</span>
          </div>
          <p className="text-xl font-bold text-green-700">{formatarMoeda(stats.totalMes)}</p>
          <p className="text-[10px] text-green-500 mt-1">{stats.qtdPago} pagamentos</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-4 rounded-2xl border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-700" />
            </div>
            <span className="text-xs text-yellow-600 font-medium">Pendente</span>
          </div>
          <p className="text-xl font-bold text-yellow-700">{formatarMoeda(stats.pendenteMes)}</p>
          <p className="text-[10px] text-yellow-500 mt-1">{monthPayments.filter(p => p.status === 'pendente').length} registros</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-700" />
            </div>
            <span className="text-xs text-blue-600 font-medium">Convênio</span>
          </div>
          <p className="text-xl font-bold text-blue-700">{formatarMoeda(stats.convenioMes)}</p>
          <p className="text-[10px] text-blue-500 mt-1">coberto no mês</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 rounded-2xl border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-purple-700" />
            </div>
            <span className="text-xs text-purple-600 font-medium">Particular</span>
          </div>
          <p className="text-xl font-bold text-purple-700">{formatarMoeda(stats.particularMes)}</p>
          <p className="text-[10px] text-purple-500 mt-1">recebido particular</p>
        </div>
      </div>

      {/* Payment Method Breakdown */}
      {methodBreakdown.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Por Forma de Pagamento</h3>
          <div className="flex flex-wrap gap-3">
            {methodBreakdown.map(([method, total]) => (
              <div key={method} className="px-3 py-2 bg-gray-50 rounded-xl text-center">
                <p className="text-sm font-bold text-gray-900">{formatarMoeda(total)}</p>
                <p className="text-[10px] text-gray-500">{FORMAS_PAGAMENTO[method] || method}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
          <Plus className="w-4 h-4" /> Novo Pagamento
        </button>
        <div className="relative flex-1 min-w-[180px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar paciente ou descrição..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm">
          <option value="todos">Status: Todos</option>
          <option value="pago">Pago</option>
          <option value="pendente">Pendente</option>
          <option value="parcial">Parcial</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <select value={filterMethod} onChange={e => setFilterMethod(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm">
          <option value="todos">Forma: Todos</option>
          {Object.entries(FORMAS_PAGAMENTO).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Payment Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{editingPay ? 'Editar Pagamento' : 'Novo Pagamento'}</h3>
            <button onClick={resetForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Patient select */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Paciente *</label>
              <select value={form.pacienteId || ''} onChange={e => {
                const pt = patients.find(p => p.id === e.target.value);
                updateForm({ pacienteId: e.target.value, pacienteNome: pt?.nome || '', convenio: pt?.convenio || '' });
              }} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                <option value="">Selecione...</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>

            {/* Quick type select */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tipo de Consulta (preenche valor)</label>
              <select value="" onChange={e => setTipoConsulta(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                <option value="">Selecione para preencher...</option>
                {TIPOS_CONSULTA.map(t => <option key={t} value={t}>{t} — {formatarMoeda(VALORES_CONSULTA[t] || 0)}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Data *</label>
              <input type="date" value={form.data || ''} onChange={e => updateForm({ data: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-gray-500 mb-1 block">Descrição *</label>
              <input value={form.descricao || ''} onChange={e => updateForm({ descricao: e.target.value })} placeholder="Ex: Consulta Ginecológica"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Valor (R$)</label>
              <input type="number" step="0.01" value={form.valor || ''} onChange={e => updateForm({ valor: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Desconto (R$)</label>
              <input type="number" step="0.01" value={form.desconto || ''} onChange={e => updateForm({ desconto: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Forma de Pagamento</label>
              <select value={form.formaPagamento || 'pix'} onChange={e => updateForm({ formaPagamento: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                {Object.entries(FORMAS_PAGAMENTO).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Status</label>
              <select value={form.status || 'pendente'} onChange={e => updateForm({ status: e.target.value as Payment['status'] })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="parcial">Parcial</option>
                <option value="cancelado">Cancelado</option>
                <option value="estornado">Estornado</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Parcelas</label>
              <input type="number" min="1" max="12" value={form.parcelas || 1} onChange={e => updateForm({ parcelas: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Data de Vencimento</label>
              <input type="date" value={form.dataVencimento || ''} onChange={e => updateForm({ dataVencimento: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nº Nota Fiscal / Recibo</label>
              <input value={form.notaFiscal || ''} onChange={e => updateForm({ notaFiscal: e.target.value })} placeholder="NF-00001"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
            </div>

            {/* Insurance section */}
            <div className="sm:col-span-2 lg:col-span-3 p-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-700 font-medium mb-2">🏥 Cobertura de Convênio</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Convênio</label>
                  <select value={form.convenio || ''} onChange={e => updateForm({ convenio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white">
                    <option value="">Sem convênio</option>
                    {CONVENIOS.filter(c => c !== 'Particular').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Cobertura (%)</label>
                  <input type="number" min="0" max="100" value={form.coberturaPercentual || ''} onChange={e => updateForm({ coberturaPercentual: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white" />
                </div>
                <div className="flex items-end gap-4 text-sm">
                  <div>
                    <p className="text-[10px] text-gray-500">Convênio paga</p>
                    <p className="font-bold text-blue-700">{formatarMoeda(form.valorConvenio || 0)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Paciente paga</p>
                    <p className="font-bold text-purple-700">{formatarMoeda(form.valorParticular || 0)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value summary */}
            <div className="sm:col-span-2 lg:col-span-3 p-3 bg-green-50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Valor Total</span>
                <span className="text-lg font-bold text-green-700">{formatarMoeda(form.valorFinal || 0)}</span>
              </div>
              {(form.parcelas || 1) > 1 && (
                <p className="text-xs text-gray-500 text-right mt-1">{form.parcelas}x de {formatarMoeda((form.valorParticular || 0) / (form.parcelas || 1))}</p>
              )}
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-xs text-gray-500 mb-1 block">Observações</label>
              <textarea value={form.observacoes || ''} onChange={e => updateForm({ observacoes: e.target.value })} rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-y" />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={savePayment} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
              <Save className="w-4 h-4" /> {editingPay ? 'Salvar' : 'Registrar Pagamento'}
            </button>
            <button onClick={resetForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
          </div>
        </div>
      )}

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Wallet className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="font-medium text-lg">{payments.length === 0 ? 'Nenhum pagamento registrado' : 'Nenhum resultado encontrado'}</p>
          <p className="text-sm mt-1">{payments.length === 0 ? 'Clique em "Novo Pagamento" para registrar' : 'Ajuste os filtros'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Paciente</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Descrição</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Valor</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Pagamento</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Vencimento</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">NF</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(p => {
                  const ps = STATUS_PAGAMENTO_CONFIG[p.status] || STATUS_PAGAMENTO_CONFIG.pendente;
                  const vencido = p.dataVencimento && p.status === 'pendente' && p.dataVencimento < toISO(new Date());
                  return (
                    <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/50 group ${vencido ? 'bg-red-50/40' : ''}`}>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{formatDateBR(p.data)}</td>
                      <td className="px-4 py-3">
                        <p className="text-gray-900 font-medium truncate max-w-[140px]">{p.pacienteNome || '-'}</p>
                        {p.convenio && <p className="text-[10px] text-blue-500">{p.convenio} ({p.coberturaPercentual}%)</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">{p.descricao}</td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-gray-900">{formatarMoeda(p.valorFinal)}</p>
                        {p.valorConvenio > 0 && <p className="text-[10px] text-blue-500">Convênio: {formatarMoeda(p.valorConvenio)}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{FORMAS_PAGAMENTO[p.formaPagamento] || p.formaPagamento}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleStatus(p.id)} className={`text-xs px-2 py-1 rounded-lg font-medium cursor-pointer hover:opacity-80 ${ps.bg}`}>
                          {ps.label}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {p.dataVencimento ? (
                          <span className={vencido ? 'text-red-600 font-bold' : 'text-gray-500'}>{formatDateBR(p.dataVencimento)}{vencido && ' ⚠️'}</span>
                        ) : <span className="text-gray-300">—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.notaFiscal || '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => editPayment(p)} className="p-1 text-gray-400 hover:text-primary-600"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => deletePayment(p.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table footer with totals */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">{filteredPayments.length} registro(s)</p>
            <div className="flex gap-4 text-sm">
              <span className="text-gray-500">Total filtrado: <strong className="text-gray-900">{formatarMoeda(filteredPayments.reduce((s, p) => s + p.valorFinal, 0))}</strong></span>
              <span className="text-gray-500">Pago: <strong className="text-green-700">{formatarMoeda(filteredPayments.filter(p => p.status === 'pago').reduce((s, p) => s + p.valorFinal, 0))}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* General Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
          <p className="text-xs text-green-600 font-medium">💰 Total Recebido (Geral)</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{formatarMoeda(stats.totalGeral)}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-2xl border border-yellow-100">
          <p className="text-xs text-yellow-600 font-medium">⏳ Total Pendente (Geral)</p>
          <p className="text-2xl font-bold text-yellow-700 mt-1">{formatarMoeda(stats.totalPendente)}</p>
        </div>
      </div>
    </>
  );
}

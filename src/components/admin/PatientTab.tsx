'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Users, Plus, Search, Edit3, Trash2, Phone, Mail, Calendar, Clock,
  Heart, FileText, Save, X, CheckCircle2, Upload, Download, Paperclip,
  Activity, Stethoscope, Baby, ArrowLeft, User, ClipboardList, Eye,
  AlertTriangle, Printer, Briefcase, ShieldCheck
} from 'lucide-react';
import {
  Patient, Consultation, ExamRecord, Payment,
  TIPOS_CONSULTA, TIPOS_EXAME, STATUS_SAUDE_CONFIG, STATUS_EXAME_CONFIG,
  STATUS_PAGAMENTO_CONFIG, FORMAS_PAGAMENTO, CONVENIOS, TIPOS_SANGUINEO,
  VALORES_CONSULTA, ESTADOS_CIVIS, MEDICO_CONFIG, CIDS_COMUNS, PREPARO_EXAME,
  calcularIdade, calcularIMC, formatarMoeda, formatDateBR, toISO, LS_KEYS,
} from '@/lib/admin-types';

/* ═══════════════════════════════════════════════════════════
   FORM HELPERS — defined at MODULE LEVEL to prevent
   React from unmounting/remounting inputs on every render.
   This is the fix for the "1 letter at a time" bug.
   ═══════════════════════════════════════════════════════════ */
const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300";
const labelCls = "text-xs text-gray-500 mb-1 block";

function FInput({ label, value, onChange, type = 'text', placeholder = '', required = false, className = '' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}{required && ' *'}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />
    </div>
  );
}

function FSelect({ label, value, onChange, options, className = '' }: {
  label: string; value: string; onChange: (v: string) => void; options: string[] | readonly string[] | Record<string, string>; className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className={inputCls}>
        {Array.isArray(options)
          ? options.map(o => <option key={o} value={o}>{o}</option>)
          : Object.entries(options).map(([k, v]) => <option key={k} value={k}>{v}</option>)
        }
      </select>
    </div>
  );
}

function FTextArea({ label, value, onChange, rows = 3, placeholder = '', className = '' }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        className={inputCls + ' resize-y'} />
    </div>
  );
}

/* ═══ DEFAULTS ═══ */
const defaultPForm = (): Partial<Patient> => ({
  nome: '', telefone: '', email: '', cpf: '', dataNascimento: '',
  endereco: '', cidade: 'Presidente Prudente', tipoSanguineo: 'Não informado',
  alergias: '', historicoMedico: '', medicamentosEmUso: '', antecedentesGineco: '',
  convenio: 'Particular', numConvenio: '', observacoes: '', statusSaude: 'estavel',
  profissao: '', estadoCivil: 'Não informado', contatoEmergenciaNome: '', contatoEmergenciaTelefone: '',
});

const defaultCForm = (): Partial<Consultation> => ({
  data: toISO(new Date()), horario: '', tipo: TIPOS_CONSULTA[0],
  queixaPrincipal: '', hda: '', exameFisico: '', hipoteseDiagnostica: '',
  conduta: '', prescricao: '', examesSolicitados: '', observacoes: '',
  retorno: '', pesoKg: '', alturaM: '', pressaoArterial: '', temperatura: '',
  idadeGestacional: '', alturaUterina: '', bcf: '', movimentosFetais: '',
  cid10: '', encaminhamento: '',
});

const defaultEForm = (): Partial<ExamRecord> => ({
  nome: '', tipo: TIPOS_EXAME[0], dataSolicitacao: toISO(new Date()),
  dataResultado: '', resultado: '', status: 'solicitado',
  arquivoNome: '', arquivoBase64: '', arquivoTipo: '', observacoes: '', consultaId: '',
  indicacaoClinica: '', cid10: '', urgencia: 'rotina',
  laboratorio: '', medicoSolicitante: MEDICO_CONFIG.nome, crm: MEDICO_CONFIG.crm,
  preparoEspecial: '',
});

type DetailTab = 'perfil' | 'prontuario' | 'exames' | 'financeiro';

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function PatientTab() {
  /* ── State ── */
  const [patients, setPatients] = useState<Patient[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('perfil');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const [showPForm, setShowPForm] = useState(false);
  const [editingP, setEditingP] = useState<Patient | null>(null);
  const [pForm, setPForm] = useState<Partial<Patient>>(defaultPForm());

  const [showCForm, setShowCForm] = useState(false);
  const [editingC, setEditingC] = useState<Consultation | null>(null);
  const [cForm, setCForm] = useState<Partial<Consultation>>(defaultCForm());
  const [viewConsult, setViewConsult] = useState<Consultation | null>(null);

  const [showEForm, setShowEForm] = useState(false);
  const [editingE, setEditingE] = useState<ExamRecord | null>(null);
  const [eForm, setEForm] = useState<Partial<ExamRecord>>(defaultEForm());
  const [viewExam, setViewExam] = useState<ExamRecord | null>(null);

  /* ── Load/Save ── */
  useEffect(() => {
    try {
      const p = localStorage.getItem(LS_KEYS.patients);
      const c = localStorage.getItem(LS_KEYS.consultations);
      const e = localStorage.getItem(LS_KEYS.exams);
      const pay = localStorage.getItem(LS_KEYS.payments);
      if (p) setPatients(JSON.parse(p));
      if (c) setConsultations(JSON.parse(c));
      if (e) setExams(JSON.parse(e));
      if (pay) setPayments(JSON.parse(pay));
    } catch { /* ignore corrupt data */ }
  }, []);

  useEffect(() => { if (patients.length > 0) localStorage.setItem(LS_KEYS.patients, JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem(LS_KEYS.consultations, JSON.stringify(consultations)); }, [consultations]);
  useEffect(() => { localStorage.setItem(LS_KEYS.exams, JSON.stringify(exams)); }, [exams]);

  /* ── Derived Data ── */
  const selectedPatient = useMemo(() => patients.find(p => p.id === selectedId) || null, [patients, selectedId]);
  const patientConsults = useMemo(() => consultations.filter(c => c.pacienteId === selectedId).sort((a, b) => b.data.localeCompare(a.data)), [consultations, selectedId]);
  const patientExams = useMemo(() => exams.filter(e => e.pacienteId === selectedId).sort((a, b) => b.dataSolicitacao.localeCompare(a.dataSolicitacao)), [exams, selectedId]);
  const patientPayments = useMemo(() => payments.filter(p => p.pacienteId === selectedId).sort((a, b) => b.data.localeCompare(a.data)), [payments, selectedId]);

  const filteredPatients = useMemo(() => {
    let list = [...patients];
    if (filterStatus !== 'todos') list = list.filter(p => p.statusSaude === filterStatus);
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(p => p.nome.toLowerCase().includes(s) || p.telefone.includes(s) || p.cpf.includes(searchTerm) || (p.email || '').toLowerCase().includes(s));
    }
    return list.sort((a, b) => a.nome.localeCompare(b.nome));
  }, [patients, filterStatus, searchTerm]);

  const stats = useMemo(() => ({
    total: patients.length,
    gestantes: patients.filter(p => p.statusSaude === 'gestante').length,
    atencao: patients.filter(p => p.statusSaude === 'atencao').length,
    comConvenio: patients.filter(p => p.convenio && p.convenio !== 'Particular').length,
  }), [patients]);

  /* ── Patient CRUD ── */
  const savePatient = () => {
    if (!pForm.nome || !pForm.telefone) { alert('Nome e telefone são obrigatórios.'); return; }
    const now = new Date().toISOString();
    if (editingP) {
      setPatients(prev => prev.map(p => p.id === editingP.id ? { ...p, ...pForm, atualizadoEm: now } as Patient : p));
    } else {
      setPatients(prev => [...prev, { ...pForm, id: Date.now().toString(), criadoEm: now, atualizadoEm: now } as Patient]);
    }
    resetPForm();
  };

  const editPatient = (p: Patient) => { setEditingP(p); setPForm({ ...p }); setShowPForm(true); };
  const deletePatient = (id: string) => {
    if (!confirm('Excluir paciente e todo o histórico? Esta ação não pode ser desfeita.')) return;
    setPatients(prev => prev.filter(p => p.id !== id));
    setConsultations(prev => prev.filter(c => c.pacienteId !== id));
    setExams(prev => prev.filter(e => e.pacienteId !== id));
    setPayments(prev => prev.filter(p => p.pacienteId !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const resetPForm = () => { setShowPForm(false); setEditingP(null); setPForm(defaultPForm()); };

  /* ── Consultation CRUD ── */
  const saveConsultation = () => {
    if (!cForm.queixaPrincipal || !cForm.data || !selectedId) { alert('Data e queixa principal são obrigatórios.'); return; }
    if (editingC) {
      setConsultations(prev => prev.map(c => c.id === editingC.id ? { ...c, ...cForm } as Consultation : c));
    } else {
      setConsultations(prev => [...prev, { ...cForm, id: Date.now().toString(), pacienteId: selectedId, criadoEm: new Date().toISOString() } as Consultation]);
    }
    resetCForm();
  };
  const editConsultation = (c: Consultation) => { setEditingC(c); setCForm({ ...c }); setShowCForm(true); };
  const deleteConsultation = (id: string) => { if (confirm('Excluir esta consulta?')) setConsultations(prev => prev.filter(c => c.id !== id)); };
  const resetCForm = () => { setShowCForm(false); setEditingC(null); setCForm(defaultCForm()); };

  /* ── Exam CRUD ── */
  const saveExam = () => {
    if (!eForm.nome || !eForm.indicacaoClinica || !selectedId) { alert('Nome do exame e indicação clínica são obrigatórios (CFM).'); return; }
    if (editingE) {
      setExams(prev => prev.map(e => e.id === editingE.id ? { ...e, ...eForm } as ExamRecord : e));
    } else {
      const preparo = PREPARO_EXAME[eForm.tipo || ''] || eForm.preparoEspecial || '';
      setExams(prev => [...prev, {
        ...eForm, preparoEspecial: eForm.preparoEspecial || preparo,
        id: Date.now().toString(), pacienteId: selectedId, criadoEm: new Date().toISOString(),
      } as ExamRecord]);
    }
    resetEForm();
  };
  const editExam = (ex: ExamRecord) => { setEditingE(ex); setEForm({ ...ex }); setShowEForm(true); };
  const updateExamStatus = (id: string, status: ExamRecord['status']) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };
  const updateExamResult = (id: string, resultado: string) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, resultado, status: 'realizado' as const, dataResultado: e.dataResultado || toISO(new Date()) } : e));
  };
  const handleFileUpload = (examId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Arquivo muito grande. Máximo: 5MB'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setExams(prev => prev.map(ex => ex.id === examId ? {
        ...ex, arquivoBase64: reader.result as string, arquivoNome: file.name,
        arquivoTipo: file.type, status: 'laudo_disponivel' as const, dataResultado: ex.dataResultado || toISO(new Date()),
      } : ex));
    };
    reader.readAsDataURL(file);
  };
  const deleteExam = (id: string) => { if (confirm('Excluir exame?')) setExams(prev => prev.filter(e => e.id !== id)); };
  const resetEForm = () => { setShowEForm(false); setEditingE(null); setEForm(defaultEForm()); };

  const selectPatient = (id: string) => { setSelectedId(id); setDetailTab('perfil'); };

  /* ═══ Auto-fill exam preparo when type changes ═══ */
  const handleExamTypeChange = (tipo: string) => {
    const preparo = PREPARO_EXAME[tipo] || '';
    setEForm(prev => ({ ...prev, tipo, nome: tipo !== 'Outro' ? tipo : prev.nome, preparoEspecial: preparo }));
  };

  /* ═══════════════════════════════════════════ */
  /* ═══ RENDER ═══ */
  /* ═══════════════════════════════════════════ */

  return (
    <>
      {selectedPatient ? (
        /* ═══ PATIENT DETAIL VIEW ═══ */
        (() => {
          const age = calcularIdade(selectedPatient.dataNascimento);
          const sc = STATUS_SAUDE_CONFIG[selectedPatient.statusSaude] || STATUS_SAUDE_CONFIG.estavel;
          return (
            <>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-gray-100 rounded-xl"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {selectedPatient.nome.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900 text-lg">{selectedPatient.nome}</h2>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        {age > 0 && <span>{age} anos</span>}
                        {selectedPatient.telefone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{selectedPatient.telefone}</span>}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${sc.bg}`}>{sc.label}</span>
                        {selectedPatient.convenio && selectedPatient.convenio !== 'Particular' && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-medium">{selectedPatient.convenio}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => editPatient(selectedPatient)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => deletePatient(selectedPatient.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
                {([
                  { key: 'perfil' as DetailTab, icon: User, label: 'Perfil', count: 0 },
                  { key: 'prontuario' as DetailTab, icon: ClipboardList, label: 'Prontuário', count: patientConsults.length },
                  { key: 'exames' as DetailTab, icon: FileText, label: 'Exames', count: patientExams.length },
                  { key: 'financeiro' as DetailTab, icon: Activity, label: 'Financeiro', count: patientPayments.length },
                ]).map(t => (
                  <button key={t.key} onClick={() => setDetailTab(t.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${detailTab === t.key ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <t.icon className="w-4 h-4" /> {t.label}
                    {t.count > 0 && <span className="bg-primary-100 text-primary-700 text-[10px] px-1.5 py-0.5 rounded-full">{t.count}</span>}
                  </button>
                ))}
              </div>

              {/* ── PERFIL TAB ── */}
              {detailTab === 'perfil' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary-500" /> Dados Pessoais</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Nome', selectedPatient.nome],
                        ['Telefone', selectedPatient.telefone],
                        ['E-mail', selectedPatient.email],
                        ['CPF', selectedPatient.cpf],
                        ['Data Nasc.', selectedPatient.dataNascimento ? `${formatDateBR(selectedPatient.dataNascimento)} (${age} anos)` : '-'],
                        ['Profissão', selectedPatient.profissao],
                        ['Estado Civil', selectedPatient.estadoCivil],
                        ['Endereço', selectedPatient.endereco],
                        ['Cidade', selectedPatient.cidade],
                      ].map(([l, v]) => (
                        <div key={l} className="flex justify-between py-1.5 border-b border-gray-50">
                          <span className="text-gray-500">{l}</span>
                          <span className="text-gray-900 font-medium text-right max-w-[60%]">{v || '-'}</span>
                        </div>
                      ))}
                    </div>
                    {(selectedPatient.contatoEmergenciaNome || selectedPatient.contatoEmergenciaTelefone) && (
                      <div className="mt-4 p-3 bg-orange-50 rounded-xl">
                        <p className="text-xs text-orange-700 font-medium mb-1">🆘 Contato de Emergência</p>
                        <p className="text-sm text-gray-900">{selectedPatient.contatoEmergenciaNome || '-'}</p>
                        <p className="text-xs text-gray-600">{selectedPatient.contatoEmergenciaTelefone || '-'}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-primary-500" /> Dados Médicos</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        ['Tipo Sanguíneo', selectedPatient.tipoSanguineo],
                        ['Convênio', (selectedPatient.convenio || 'Particular') + (selectedPatient.numConvenio ? ` — ${selectedPatient.numConvenio}` : '')],
                        ['Status Saúde', sc.label],
                      ].map(([l, v]) => (
                        <div key={l} className="flex justify-between py-1.5 border-b border-gray-50">
                          <span className="text-gray-500">{l}</span>
                          <span className="text-gray-900 font-medium">{v || '-'}</span>
                        </div>
                      ))}
                    </div>
                    {selectedPatient.alergias && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">⚠️ Alergias</p><p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{selectedPatient.alergias}</p></div>}
                    {selectedPatient.medicamentosEmUso && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">💊 Medicamentos em Uso</p><p className="text-sm text-gray-700 bg-blue-50 p-2 rounded-lg">{selectedPatient.medicamentosEmUso}</p></div>}
                    {selectedPatient.historicoMedico && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">📋 Histórico Médico</p><p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg whitespace-pre-wrap">{selectedPatient.historicoMedico}</p></div>}
                    {selectedPatient.antecedentesGineco && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">🩺 Antecedentes Ginecológicos</p><p className="text-sm text-gray-700 bg-purple-50 p-2 rounded-lg whitespace-pre-wrap">{selectedPatient.antecedentesGineco}</p></div>}
                  </div>

                  {selectedPatient.observacoes && (
                    <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-900 text-sm mb-2">Observações</h3>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedPatient.observacoes}</p>
                    </div>
                  )}

                  <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-2xl font-bold text-primary-600">{patientConsults.length}</p>
                      <p className="text-xs text-gray-500">Consultas</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-2xl font-bold text-purple-600">{patientExams.length}</p>
                      <p className="text-xs text-gray-500">Exames</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-2xl font-bold text-green-600">{formatarMoeda(patientPayments.filter(p => p.status === 'pago').reduce((s, p) => s + p.valorFinal, 0))}</p>
                      <p className="text-xs text-gray-500">Total Pago</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-2xl font-bold text-yellow-600">{formatarMoeda(patientPayments.filter(p => p.status === 'pendente').reduce((s, p) => s + p.valorFinal, 0))}</p>
                      <p className="text-xs text-gray-500">Pendente</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PRONTUÁRIO TAB ── */}
              {detailTab === 'prontuario' && (
                <>
                  <div className="flex gap-3 mb-6">
                    <button onClick={() => { resetCForm(); setShowCForm(true); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                      <Plus className="w-4 h-4" /> Nova Consulta
                    </button>
                  </div>

                  {/* Consultation Form */}
                  {showCForm && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">{editingC ? 'Editar Consulta' : 'Nova Consulta'}</h3>
                        <button onClick={resetCForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <FInput label="Data" value={cForm.data || ''} onChange={v => setCForm(f => ({ ...f, data: v }))} type="date" required />
                        <FInput label="Horário" value={cForm.horario || ''} onChange={v => setCForm(f => ({ ...f, horario: v }))} placeholder="14:00" />
                        <FSelect label="Tipo" value={cForm.tipo || TIPOS_CONSULTA[0]} onChange={v => setCForm(f => ({ ...f, tipo: v }))} options={TIPOS_CONSULTA} />
                        <FInput label="Retorno" value={cForm.retorno || ''} onChange={v => setCForm(f => ({ ...f, retorno: v }))} type="date" />
                      </div>

                      {/* Sinais Vitais */}
                      <div className="mt-4 p-3 bg-purple-50 rounded-xl">
                        <p className="text-xs text-purple-700 font-medium mb-2">📊 Sinais Vitais</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <FInput label="Peso (kg)" value={cForm.pesoKg || ''} onChange={v => setCForm(f => ({ ...f, pesoKg: v }))} placeholder="65.0" />
                          <FInput label="Altura (m)" value={cForm.alturaM || ''} onChange={v => setCForm(f => ({ ...f, alturaM: v }))} placeholder="1.65" />
                          <FInput label="PA (mmHg)" value={cForm.pressaoArterial || ''} onChange={v => setCForm(f => ({ ...f, pressaoArterial: v }))} placeholder="120/80" />
                          <FInput label="Temp. (°C)" value={cForm.temperatura || ''} onChange={v => setCForm(f => ({ ...f, temperatura: v }))} placeholder="36.5" />
                        </div>
                        {cForm.pesoKg && cForm.alturaM && <p className="text-xs text-purple-600 mt-2">IMC: {calcularIMC(cForm.pesoKg, cForm.alturaM)}</p>}
                      </div>

                      {/* Dados Obstétricos */}
                      {(cForm.tipo === 'Pré-natal' || selectedPatient.statusSaude === 'gestante') && (
                        <div className="mt-4 p-3 bg-pink-50 rounded-xl">
                          <p className="text-xs text-pink-700 font-medium mb-2">🤰 Dados Obstétricos</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <FInput label="IG (semanas)" value={cForm.idadeGestacional || ''} onChange={v => setCForm(f => ({ ...f, idadeGestacional: v }))} placeholder="28+3" />
                            <FInput label="AU (cm)" value={cForm.alturaUterina || ''} onChange={v => setCForm(f => ({ ...f, alturaUterina: v }))} placeholder="28" />
                            <FInput label="BCF (bpm)" value={cForm.bcf || ''} onChange={v => setCForm(f => ({ ...f, bcf: v }))} placeholder="142" />
                            <FInput label="Mov. Fetais" value={cForm.movimentosFetais || ''} onChange={v => setCForm(f => ({ ...f, movimentosFetais: v }))} placeholder="Presentes" />
                          </div>
                        </div>
                      )}

                      {/* Campos Clínicos */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <FTextArea label="Queixa Principal *" value={cForm.queixaPrincipal || ''} onChange={v => setCForm(f => ({ ...f, queixaPrincipal: v }))} placeholder="Descreva a queixa principal" />
                        <FTextArea label="HDA (História da Doença Atual)" value={cForm.hda || ''} onChange={v => setCForm(f => ({ ...f, hda: v }))} placeholder="Detalhamento da queixa" />
                        <FTextArea label="Exame Físico" value={cForm.exameFisico || ''} onChange={v => setCForm(f => ({ ...f, exameFisico: v }))} placeholder="Achados do exame físico" />
                        <FTextArea label="Hipótese Diagnóstica" value={cForm.hipoteseDiagnostica || ''} onChange={v => setCForm(f => ({ ...f, hipoteseDiagnostica: v }))} />
                      </div>

                      {/* CID-10 */}
                      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-blue-700 font-medium mb-2">🏥 CID-10 e Conduta</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>CID-10 (selecionar ou digitar)</label>
                            <select value="" onChange={e => { if (e.target.value) setCForm(f => ({ ...f, cid10: (f.cid10 ? f.cid10 + ', ' : '') + e.target.value })); }}
                              className={inputCls}>
                              <option value="">Adicionar CID...</option>
                              {Object.entries(CIDS_COMUNS).map(([cod, desc]) => <option key={cod} value={cod}>{cod} — {desc}</option>)}
                            </select>
                            <input value={cForm.cid10 || ''} onChange={e => setCForm(f => ({ ...f, cid10: e.target.value }))} placeholder="Ex: Z34, N92"
                              className={inputCls + ' mt-1'} />
                          </div>
                          <FTextArea label="Conduta" value={cForm.conduta || ''} onChange={v => setCForm(f => ({ ...f, conduta: v }))} rows={2} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <FTextArea label="Prescrição" value={cForm.prescricao || ''} onChange={v => setCForm(f => ({ ...f, prescricao: v }))} placeholder="Medicamentos, posologia" />
                        <FTextArea label="Exames Solicitados" value={cForm.examesSolicitados || ''} onChange={v => setCForm(f => ({ ...f, examesSolicitados: v }))} placeholder="Exames a solicitar nesta consulta" />
                        <FTextArea label="Encaminhamento" value={cForm.encaminhamento || ''} onChange={v => setCForm(f => ({ ...f, encaminhamento: v }))} placeholder="Encaminhamento para especialista, se houver" />
                        <FTextArea label="Observações" value={cForm.observacoes || ''} onChange={v => setCForm(f => ({ ...f, observacoes: v }))} />
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button onClick={saveConsultation} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                          <Save className="w-4 h-4" /> {editingC ? 'Salvar Alterações' : 'Registrar Consulta'}
                        </button>
                        <button onClick={resetCForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
                      </div>
                    </div>
                  )}

                  {/* Consultation Timeline */}
                  {patientConsults.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Nenhuma consulta registrada</p>
                      <p className="text-xs mt-1">Clique em &quot;Nova Consulta&quot; para registrar</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {patientConsults.map(c => (
                        <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded font-medium">{c.tipo}</span>
                                  <span className="text-xs text-gray-400">{formatDateBR(c.data)} {c.horario && `às ${c.horario}`}</span>
                                  {c.cid10 && <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">CID: {c.cid10}</span>}
                                </div>
                                <p className="font-medium text-gray-900 text-sm">{c.queixaPrincipal}</p>
                                {c.hipoteseDiagnostica && <p className="text-xs text-gray-500 mt-1"><strong>Diagnóstico:</strong> {c.hipoteseDiagnostica}</p>}
                                {c.conduta && <p className="text-xs text-gray-500 mt-0.5"><strong>Conduta:</strong> {c.conduta}</p>}
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                <button onClick={() => setViewConsult(viewConsult?.id === c.id ? null : c)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                                <button onClick={() => editConsultation(c)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => deleteConsultation(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                            {(c.pesoKg || c.pressaoArterial) && (
                              <div className="flex gap-2 mt-2 flex-wrap">
                                {c.pesoKg && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">⚖️ {c.pesoKg}kg</span>}
                                {c.pressaoArterial && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">💓 PA {c.pressaoArterial}</span>}
                                {c.pesoKg && c.alturaM && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">📏 IMC {calcularIMC(c.pesoKg, c.alturaM)}</span>}
                                {c.idadeGestacional && <span className="text-[10px] px-2 py-0.5 bg-pink-100 rounded text-pink-600">🤰 IG {c.idadeGestacional}</span>}
                                {c.bcf && <span className="text-[10px] px-2 py-0.5 bg-pink-100 rounded text-pink-600">💗 BCF {c.bcf}</span>}
                              </div>
                            )}
                            {c.retorno && <p className="text-[10px] text-blue-600 mt-2">📅 Retorno: {formatDateBR(c.retorno)}</p>}
                            {c.encaminhamento && <p className="text-[10px] text-orange-600 mt-1">🔀 Encaminhamento: {c.encaminhamento}</p>}
                          </div>
                          {viewConsult?.id === c.id && (
                            <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50/50">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {c.hda && <div><p className="text-xs text-gray-500 font-medium">HDA</p><p className="text-gray-700 whitespace-pre-wrap">{c.hda}</p></div>}
                                {c.exameFisico && <div><p className="text-xs text-gray-500 font-medium">Exame Físico</p><p className="text-gray-700 whitespace-pre-wrap">{c.exameFisico}</p></div>}
                                {c.prescricao && <div><p className="text-xs text-gray-500 font-medium">Prescrição</p><p className="text-gray-700 whitespace-pre-wrap">{c.prescricao}</p></div>}
                                {c.examesSolicitados && <div><p className="text-xs text-gray-500 font-medium">Exames Solicitados</p><p className="text-gray-700 whitespace-pre-wrap">{c.examesSolicitados}</p></div>}
                                {c.encaminhamento && <div><p className="text-xs text-gray-500 font-medium">Encaminhamento</p><p className="text-gray-700 whitespace-pre-wrap">{c.encaminhamento}</p></div>}
                                {c.observacoes && <div className="sm:col-span-2"><p className="text-xs text-gray-500 font-medium">Observações</p><p className="text-gray-700 whitespace-pre-wrap">{c.observacoes}</p></div>}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ── EXAMES TAB ── */}
              {detailTab === 'exames' && (
                <>
                  <div className="flex gap-3 mb-4">
                    <button onClick={() => { resetEForm(); setShowEForm(true); }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                      <Plus className="w-4 h-4" /> Solicitar Exame
                    </button>
                  </div>

                  {/* Alerta de obrigatoriedade */}
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      <strong>CFM Res. 1.638/2002:</strong> A solicitação de exame deve conter identificação do paciente, indicação clínica, CID-10 (quando aplicável), e identificação do médico solicitante com CRM.
                    </p>
                  </div>

                  {/* Exam Form */}
                  {showEForm && (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">{editingE ? 'Editar Exame' : 'Solicitar Exame'}</h3>
                        <button onClick={resetEForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                      </div>

                      {/* Paciente info (read-only) */}
                      <div className="p-3 bg-gray-50 rounded-xl mb-4">
                        <p className="text-xs text-gray-500 font-medium mb-1">Paciente</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-gray-900">{selectedPatient.nome}</span>
                          {age > 0 && <span className="text-gray-500">{age} anos</span>}
                          {selectedPatient.convenio && <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded">{selectedPatient.convenio}{selectedPatient.numConvenio ? ` — ${selectedPatient.numConvenio}` : ''}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {/* Tipo → auto-fill nome + preparo */}
                        <div>
                          <label className={labelCls}>Categoria do Exame</label>
                          <select value={eForm.tipo || TIPOS_EXAME[0]} onChange={e => handleExamTypeChange(e.target.value)} className={inputCls}>
                            {TIPOS_EXAME.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <FInput label="Nome do Exame *" value={eForm.nome || ''} onChange={v => setEForm(f => ({ ...f, nome: v }))} required placeholder="Ex: US morfológica 2º trimestre" />
                        <FInput label="Data Solicitação" value={eForm.dataSolicitacao || ''} onChange={v => setEForm(f => ({ ...f, dataSolicitacao: v }))} type="date" />

                        <FTextArea label="Indicação Clínica * (obrigatório CFM)" value={eForm.indicacaoClinica || ''} onChange={v => setEForm(f => ({ ...f, indicacaoClinica: v }))} rows={2} placeholder="Motivo/justificativa clínica para o exame" className="sm:col-span-2 lg:col-span-2" />

                        {/* Urgência */}
                        <FSelect label="Urgência" value={eForm.urgencia || 'rotina'} onChange={v => setEForm(f => ({ ...f, urgencia: v as 'rotina' | 'urgente' }))}
                          options={{ rotina: '🟢 Rotina', urgente: '🔴 Urgente' }} />

                        {/* CID-10 */}
                        <div>
                          <label className={labelCls}>CID-10</label>
                          <select value="" onChange={e => { if (e.target.value) setEForm(f => ({ ...f, cid10: e.target.value })); }} className={inputCls}>
                            <option value="">Selecionar CID...</option>
                            {Object.entries(CIDS_COMUNS).map(([cod, desc]) => <option key={cod} value={cod}>{cod} — {desc}</option>)}
                          </select>
                          <input value={eForm.cid10 || ''} onChange={e => setEForm(f => ({ ...f, cid10: e.target.value }))} placeholder="Código CID" className={inputCls + ' mt-1'} />
                        </div>

                        <FInput label="Laboratório / Clínica" value={eForm.laboratorio || ''} onChange={v => setEForm(f => ({ ...f, laboratorio: v }))} placeholder="Nome do laboratório" />
                      </div>

                      {/* Preparo do paciente */}
                      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-blue-700 font-medium mb-1">📋 Preparo do Paciente</p>
                        <textarea value={eForm.preparoEspecial || ''} onChange={e => setEForm(f => ({ ...f, preparoEspecial: e.target.value }))} rows={2}
                          placeholder="Orientações de preparo para o paciente" className={inputCls + ' bg-white mt-1'} />
                        {PREPARO_EXAME[eForm.tipo || ''] && !eForm.preparoEspecial && (
                          <p className="text-[10px] text-blue-500 mt-1 italic">Sugestão: {PREPARO_EXAME[eForm.tipo || '']}</p>
                        )}
                      </div>

                      {/* Médico solicitante (pre-filled) */}
                      <div className="mt-4 p-3 bg-green-50 rounded-xl">
                        <p className="text-xs text-green-700 font-medium mb-2">👩‍⚕️ Médico Solicitante</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FInput label="Nome" value={eForm.medicoSolicitante || ''} onChange={v => setEForm(f => ({ ...f, medicoSolicitante: v }))} />
                          <FInput label="CRM" value={eForm.crm || ''} onChange={v => setEForm(f => ({ ...f, crm: v }))} placeholder="CRM/SP 000000" />
                        </div>
                      </div>

                      <FTextArea label="Observações Adicionais" value={eForm.observacoes || ''} onChange={v => setEForm(f => ({ ...f, observacoes: v }))} rows={2} className="mt-3" />

                      <div className="flex gap-2 mt-4">
                        <button onClick={saveExam} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                          <Save className="w-4 h-4" /> {editingE ? 'Salvar Alterações' : 'Solicitar Exame'}
                        </button>
                        <button onClick={resetEForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
                      </div>
                    </div>
                  )}

                  {/* Exams List */}
                  {patientExams.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Nenhum exame registrado</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {patientExams.map(ex => {
                        const ec = STATUS_EXAME_CONFIG[ex.status] || STATUS_EXAME_CONFIG.solicitado;
                        const isExpanded = viewExam?.id === ex.id;
                        return (
                          <div key={ex.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                            <div className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h4 className="font-medium text-gray-900 text-sm">{ex.nome}</h4>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ec.bg}`}>{ec.label}</span>
                                    {ex.urgencia === 'urgente' && <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">🔴 Urgente</span>}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                                    <span>{ex.tipo}</span>
                                    <span>Solicitado: {formatDateBR(ex.dataSolicitacao)}</span>
                                    {ex.dataResultado && <span>Resultado: {formatDateBR(ex.dataResultado)}</span>}
                                    {ex.laboratorio && <span>🏥 {ex.laboratorio}</span>}
                                    {ex.cid10 && <span className="text-blue-500">CID: {ex.cid10}</span>}
                                  </div>
                                  {ex.indicacaoClinica && <p className="text-xs text-gray-500 mt-1"><strong>Indicação:</strong> {ex.indicacaoClinica}</p>}
                                  {ex.arquivoNome && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Paperclip className="w-3 h-3 text-purple-500" />
                                      <a href={ex.arquivoBase64} download={ex.arquivoNome} className="text-xs text-purple-600 hover:underline font-medium">{ex.arquivoNome}</a>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 ml-3">
                                  <select value={ex.status} onChange={e => updateExamStatus(ex.id, e.target.value as ExamRecord['status'])}
                                    className={`text-[10px] px-2 py-1 rounded-lg border font-medium ${ec.bg}`}>
                                    <option value="solicitado">Solicitado</option>
                                    <option value="agendado">Agendado</option>
                                    <option value="realizado">Realizado</option>
                                    <option value="laudo_disponivel">Laudo Disponível</option>
                                  </select>
                                  <button onClick={() => setViewExam(isExpanded ? null : ex)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                                  <button onClick={() => editExam(ex)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                  <label className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer" title="Anexar laudo">
                                    <Upload className="w-4 h-4" />
                                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => handleFileUpload(ex.id, e)} />
                                  </label>
                                  <button onClick={() => deleteExam(ex.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </div>
                            </div>

                            {/* Expanded detail */}
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50/50">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                  <div><p className="text-xs text-gray-500 font-medium">Médico Solicitante</p><p className="text-gray-700">{ex.medicoSolicitante || MEDICO_CONFIG.nome} — {ex.crm || MEDICO_CONFIG.crm}</p></div>
                                  {ex.preparoEspecial && <div><p className="text-xs text-gray-500 font-medium">Preparo</p><p className="text-gray-700 whitespace-pre-wrap">{ex.preparoEspecial}</p></div>}
                                  {ex.observacoes && <div><p className="text-xs text-gray-500 font-medium">Observações</p><p className="text-gray-700 whitespace-pre-wrap">{ex.observacoes}</p></div>}
                                </div>
                                {/* Inline result entry */}
                                <div className="mt-3">
                                  <label className={labelCls}>Resultado / Laudo (texto)</label>
                                  <textarea value={ex.resultado || ''} onChange={e => updateExamResult(ex.id, e.target.value)} rows={3}
                                    placeholder="Digite o resultado do exame aqui..." className={inputCls + ' resize-y'} />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                    <p className="text-sm text-primary-700">
                      📎 <strong>Laudos e Resultados:</strong> Use o ícone <Upload className="w-3 h-3 inline" /> para anexar arquivos (PDF, imagens, documentos — máx. 5MB). Ou expanda o exame com <Eye className="w-3 h-3 inline" /> para digitar o resultado.
                    </p>
                  </div>
                </>
              )}

              {/* ── FINANCEIRO TAB (per patient) ── */}
              {detailTab === 'financeiro' && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-xl font-bold text-green-600">{formatarMoeda(patientPayments.filter(p => p.status === 'pago').reduce((s, p) => s + p.valorFinal, 0))}</p>
                      <p className="text-xs text-gray-500">Total Pago</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-xl font-bold text-yellow-600">{formatarMoeda(patientPayments.filter(p => p.status === 'pendente').reduce((s, p) => s + p.valorFinal, 0))}</p>
                      <p className="text-xs text-gray-500">Pendente</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                      <p className="text-xl font-bold text-primary-600">{patientPayments.length}</p>
                      <p className="text-xs text-gray-500">Registros</p>
                    </div>
                  </div>

                  {patientPayments.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-medium">Nenhum pagamento registrado</p>
                      <p className="text-xs mt-1">Use a aba &quot;Financeiro&quot; do painel para gerenciar pagamentos</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-500">Descrição</th>
                              <th className="text-right px-4 py-3 font-medium text-gray-500">Valor</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-500">Pagamento</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-500">Vencimento</th>
                            </tr>
                          </thead>
                          <tbody>
                            {patientPayments.map(p => {
                              const ps = STATUS_PAGAMENTO_CONFIG[p.status] || STATUS_PAGAMENTO_CONFIG.pendente;
                              const vencido = p.dataVencimento && p.status === 'pendente' && p.dataVencimento < toISO(new Date());
                              return (
                                <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/50 ${vencido ? 'bg-red-50/30' : ''}`}>
                                  <td className="px-4 py-3 text-gray-600">{formatDateBR(p.data)}</td>
                                  <td className="px-4 py-3 text-gray-900 font-medium">{p.descricao}</td>
                                  <td className="px-4 py-3 text-gray-900 font-medium text-right">{formatarMoeda(p.valorFinal)}</td>
                                  <td className="px-4 py-3 text-gray-600 text-xs">{FORMAS_PAGAMENTO[p.formaPagamento] || p.formaPagamento}</td>
                                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-lg font-medium ${ps.bg}`}>{ps.label}</span></td>
                                  <td className="px-4 py-3 text-xs">
                                    {p.dataVencimento ? (
                                      <span className={vencido ? 'text-red-600 font-medium' : 'text-gray-500'}>{formatDateBR(p.dataVencimento)}{vencido && ' ⚠️'}</span>
                                    ) : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          );
        })()
      ) : (
        /* ═══ PATIENT LIST VIEW ═══ */
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { n: stats.total, label: 'Total Pacientes', icon: Users, bg: 'bg-primary-100', text: 'text-primary-600' },
              { n: stats.gestantes, label: 'Gestantes', icon: Baby, bg: 'bg-purple-100', text: 'text-purple-600' },
              { n: stats.atencao, label: 'Atenção', icon: Activity, bg: 'bg-yellow-100', text: 'text-yellow-600' },
              { n: stats.comConvenio, label: 'Com Convênio', icon: Heart, bg: 'bg-blue-100', text: 'text-blue-600' },
            ].map(s => (
              <div key={s.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.text}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{s.n}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={() => { resetPForm(); setShowPForm(true); }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
              <Plus className="w-4 h-4" /> Novo Paciente
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar paciente..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                <option value="todos">Todos</option>
                <option value="estavel">Estável</option>
                <option value="atencao">Atenção</option>
                <option value="acompanhamento">Acompanhamento</option>
                <option value="gestante">Gestante</option>
              </select>
            </div>
          </div>

          {/* Patient Cards */}
          {filteredPatients.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="font-medium text-lg">{patients.length === 0 ? 'Nenhum paciente cadastrado' : 'Nenhum resultado encontrado'}</p>
              <p className="text-sm mt-1">{patients.length === 0 ? 'Clique em "Novo Paciente" para começar' : 'Tente outros termos de busca'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map(p => {
                const age = calcularIdade(p.dataNascimento);
                const sc = STATUS_SAUDE_CONFIG[p.statusSaude] || STATUS_SAUDE_CONFIG.estavel;
                const pConsults = consultations.filter(c => c.pacienteId === p.id);
                const lastConsult = pConsults.sort((a, b) => b.data.localeCompare(a.data))[0];
                return (
                  <button key={p.id} onClick={() => selectPatient(p.id)}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-primary-300 hover:shadow-md transition-all text-left group">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {p.nome.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-primary-700">{p.nome}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          {age > 0 && <span>{age} anos</span>}
                          <span className="flex items-center gap-0.5"><Phone className="w-3 h-3" />{p.telefone}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${sc.bg}`}>{sc.label}</span>
                          {p.convenio && p.convenio !== 'Particular' && (
                            <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">{p.convenio}</span>
                          )}
                          {pConsults.length > 0 && <span className="text-[10px] text-gray-400">{pConsults.length} consulta{pConsults.length !== 1 ? 's' : ''}</span>}
                        </div>
                        {lastConsult && <p className="text-[10px] text-gray-400 mt-1">Última: {formatDateBR(lastConsult.data)}</p>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ═══ PATIENT FORM MODAL (shared for create & edit) ═══ */}
      {showPForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={resetPForm}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">{editingP ? 'Editar Paciente' : 'Novo Paciente'}</h3>
              <button onClick={resetPForm}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            {/* Dados Pessoais */}
            <div className="mb-4">
              <p className="text-xs text-primary-600 font-medium mb-2 flex items-center gap-1"><User className="w-3 h-3" /> Dados Pessoais</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="Nome Completo" value={pForm.nome || ''} onChange={v => setPForm(f => ({ ...f, nome: v }))} required className="sm:col-span-2" />
                <FInput label="Telefone" value={pForm.telefone || ''} onChange={v => setPForm(f => ({ ...f, telefone: v }))} required placeholder="(18) 99999-9999" />
                <FInput label="E-mail" value={pForm.email || ''} onChange={v => setPForm(f => ({ ...f, email: v }))} type="email" />
                <FInput label="CPF" value={pForm.cpf || ''} onChange={v => setPForm(f => ({ ...f, cpf: v }))} placeholder="000.000.000-00" />
                <FInput label="Data de Nascimento" value={pForm.dataNascimento || ''} onChange={v => setPForm(f => ({ ...f, dataNascimento: v }))} type="date" />
                <FInput label="Profissão" value={pForm.profissao || ''} onChange={v => setPForm(f => ({ ...f, profissao: v }))} placeholder="Ex: Professora" />
                <FSelect label="Estado Civil" value={pForm.estadoCivil || 'Não informado'} onChange={v => setPForm(f => ({ ...f, estadoCivil: v }))} options={ESTADOS_CIVIS} />
                <FInput label="Endereço" value={pForm.endereco || ''} onChange={v => setPForm(f => ({ ...f, endereco: v }))} className="sm:col-span-2" />
                <FInput label="Cidade" value={pForm.cidade || ''} onChange={v => setPForm(f => ({ ...f, cidade: v }))} />
              </div>
            </div>

            {/* Contato de Emergência */}
            <div className="mb-4 p-3 bg-orange-50 rounded-xl">
              <p className="text-xs text-orange-700 font-medium mb-2">🆘 Contato de Emergência</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FInput label="Nome" value={pForm.contatoEmergenciaNome || ''} onChange={v => setPForm(f => ({ ...f, contatoEmergenciaNome: v }))} placeholder="Nome do contato" />
                <FInput label="Telefone" value={pForm.contatoEmergenciaTelefone || ''} onChange={v => setPForm(f => ({ ...f, contatoEmergenciaTelefone: v }))} placeholder="(18) 99999-9999" />
              </div>
            </div>

            {/* Dados Médicos */}
            <div className="mb-4">
              <p className="text-xs text-primary-600 font-medium mb-2 flex items-center gap-1"><Heart className="w-3 h-3" /> Dados Médicos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FSelect label="Tipo Sanguíneo" value={pForm.tipoSanguineo || 'Não informado'} onChange={v => setPForm(f => ({ ...f, tipoSanguineo: v }))} options={TIPOS_SANGUINEO} />
                <FSelect label="Convênio" value={pForm.convenio || 'Particular'} onChange={v => setPForm(f => ({ ...f, convenio: v }))} options={CONVENIOS} />
                <FInput label="Nº Carteirinha Convênio" value={pForm.numConvenio || ''} onChange={v => setPForm(f => ({ ...f, numConvenio: v }))} />
                <FSelect label="Status Saúde" value={pForm.statusSaude || 'estavel'} onChange={v => setPForm(f => ({ ...f, statusSaude: v as Patient['statusSaude'] }))}
                  options={{ estavel: 'Estável', atencao: 'Atenção', acompanhamento: 'Acompanhamento', gestante: 'Gestante' }} />
                <FInput label="Alergias" value={pForm.alergias || ''} onChange={v => setPForm(f => ({ ...f, alergias: v }))} placeholder="Nenhuma conhecida" className="sm:col-span-2" />
                <FTextArea label="Medicamentos em Uso" value={pForm.medicamentosEmUso || ''} onChange={v => setPForm(f => ({ ...f, medicamentosEmUso: v }))} rows={2} className="sm:col-span-2" />
                <FTextArea label="Histórico Médico" value={pForm.historicoMedico || ''} onChange={v => setPForm(f => ({ ...f, historicoMedico: v }))} rows={2} className="sm:col-span-2" placeholder="Cirurgias, doenças prévias, etc." />
                <FTextArea label="Antecedentes Ginecológicos" value={pForm.antecedentesGineco || ''} onChange={v => setPForm(f => ({ ...f, antecedentesGineco: v }))} rows={2} className="sm:col-span-2" placeholder="Menarca, G_P_A_, DUM, ciclos, método contraceptivo, etc." />
              </div>
            </div>

            <FTextArea label="Observações Gerais" value={pForm.observacoes || ''} onChange={v => setPForm(f => ({ ...f, observacoes: v }))} rows={2} />

            <div className="flex gap-2 mt-5">
              <button onClick={savePatient} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                <Save className="w-4 h-4" /> {editingP ? 'Salvar Alterações' : 'Cadastrar Paciente'}
              </button>
              <button onClick={resetPForm} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

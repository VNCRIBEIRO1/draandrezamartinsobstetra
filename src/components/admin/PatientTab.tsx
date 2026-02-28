'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Users, Plus, Search, Edit3, Trash2, Phone, Mail, Calendar, Clock,
  Heart, FileText, Save, X, CheckCircle2, Upload, Download, Paperclip,
  Activity, Stethoscope, Baby, ArrowLeft, User, ClipboardList, Eye
} from 'lucide-react';
import {
  Patient, Consultation, ExamRecord, Payment,
  TIPOS_CONSULTA, TIPOS_EXAME, STATUS_SAUDE_CONFIG, STATUS_EXAME_CONFIG,
  STATUS_PAGAMENTO_CONFIG, FORMAS_PAGAMENTO, CONVENIOS, TIPOS_SANGUINEO,
  VALORES_CONSULTA, calcularIdade, calcularIMC, formatarMoeda, formatDateBR,
  toISO, LS_KEYS,
} from '@/lib/admin-types';

/* ═══ DEFAULTS ═══ */
const defaultPForm = (): Partial<Patient> => ({
  nome: '', telefone: '', email: '', cpf: '', dataNascimento: '',
  endereco: '', cidade: 'Presidente Prudente', tipoSanguineo: 'Não informado',
  alergias: '', historicoMedico: '', medicamentosEmUso: '', antecedentesGineco: '',
  convenio: 'Particular', numConvenio: '', observacoes: '', statusSaude: 'estavel',
});

const defaultCForm = (): Partial<Consultation> => ({
  data: toISO(new Date()), horario: '', tipo: TIPOS_CONSULTA[0],
  queixaPrincipal: '', hda: '', exameFisico: '', hipoteseDiagnostica: '',
  conduta: '', prescricao: '', examesSolicitados: '', observacoes: '',
  retorno: '', pesoKg: '', alturaM: '', pressaoArterial: '', temperatura: '',
  idadeGestacional: '', alturaUterina: '', bcf: '', movimentosFetais: '',
});

const defaultEForm = (): Partial<ExamRecord> => ({
  nome: '', tipo: TIPOS_EXAME[0], dataSolicitacao: toISO(new Date()),
  dataResultado: '', resultado: '', status: 'solicitado',
  arquivoNome: '', arquivoBase64: '', arquivoTipo: '', observacoes: '', consultaId: '',
});

type DetailTab = 'perfil' | 'prontuario' | 'exames' | 'financeiro';

/* ═══ COMPONENT ═══ */
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
  const [eForm, setEForm] = useState<Partial<ExamRecord>>(defaultEForm());

  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Load/Save ── */
  useEffect(() => {
    const p = localStorage.getItem(LS_KEYS.patients);
    const c = localStorage.getItem(LS_KEYS.consultations);
    const e = localStorage.getItem(LS_KEYS.exams);
    const pay = localStorage.getItem(LS_KEYS.payments);
    if (p) setPatients(JSON.parse(p));
    if (c) setConsultations(JSON.parse(c));
    if (e) setExams(JSON.parse(e));
    if (pay) setPayments(JSON.parse(pay));
  }, []);

  useEffect(() => { if (patients.length > 0) localStorage.setItem(LS_KEYS.patients, JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem(LS_KEYS.consultations, JSON.stringify(consultations)); }, [consultations]);
  useEffect(() => { localStorage.setItem(LS_KEYS.exams, JSON.stringify(exams)); }, [exams]);

  /* ── Selected Patient ── */
  const selectedPatient = useMemo(() => patients.find(p => p.id === selectedId) || null, [patients, selectedId]);
  const patientConsults = useMemo(() => consultations.filter(c => c.pacienteId === selectedId).sort((a, b) => b.data.localeCompare(a.data)), [consultations, selectedId]);
  const patientExams = useMemo(() => exams.filter(e => e.pacienteId === selectedId).sort((a, b) => b.dataSolicitacao.localeCompare(a.dataSolicitacao)), [exams, selectedId]);
  const patientPayments = useMemo(() => payments.filter(p => p.pacienteId === selectedId).sort((a, b) => b.data.localeCompare(a.data)), [payments, selectedId]);

  /* ── Filtered Patients ── */
  const filteredPatients = useMemo(() => {
    let list = [...patients];
    if (filterStatus !== 'todos') list = list.filter(p => p.statusSaude === filterStatus);
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter(p => p.nome.toLowerCase().includes(s) || p.telefone.includes(s) || p.cpf.includes(searchTerm) || p.email.toLowerCase().includes(s));
    }
    return list.sort((a, b) => a.nome.localeCompare(b.nome));
  }, [patients, filterStatus, searchTerm]);

  /* ── Stats ── */
  const stats = useMemo(() => ({
    total: patients.length,
    gestantes: patients.filter(p => p.statusSaude === 'gestante').length,
    atencao: patients.filter(p => p.statusSaude === 'atencao').length,
    comConvenio: patients.filter(p => p.convenio && p.convenio !== 'Particular').length,
  }), [patients]);

  /* ── Patient CRUD ── */
  const savePatient = () => {
    if (!pForm.nome || !pForm.telefone) return;
    const now = new Date().toISOString();
    if (editingP) {
      setPatients(prev => prev.map(p => p.id === editingP.id ? { ...p, ...pForm, atualizadoEm: now } as Patient : p));
    } else {
      setPatients(prev => [...prev, { ...pForm, id: Date.now().toString(), criadoEm: now, atualizadoEm: now } as Patient]);
    }
    resetPForm();
  };

  const editPatient = (p: Patient) => {
    setEditingP(p);
    setPForm({ ...p });
    setShowPForm(true);
  };

  const deletePatient = (id: string) => {
    if (!confirm('Excluir paciente e todo o histórico? Esta ação não pode ser desfeita.')) return;
    setPatients(prev => prev.filter(p => p.id !== id));
    setConsultations(prev => prev.filter(c => c.pacienteId !== id));
    setExams(prev => prev.filter(e => e.pacienteId !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const resetPForm = () => { setShowPForm(false); setEditingP(null); setPForm(defaultPForm()); };

  /* ── Consultation CRUD ── */
  const saveConsultation = () => {
    if (!cForm.queixaPrincipal || !cForm.data || !selectedId) return;
    if (editingC) {
      setConsultations(prev => prev.map(c => c.id === editingC.id ? { ...c, ...cForm } as Consultation : c));
    } else {
      setConsultations(prev => [...prev, { ...cForm, id: Date.now().toString(), pacienteId: selectedId, criadoEm: new Date().toISOString() } as Consultation]);
    }
    resetCForm();
  };

  const editConsultation = (c: Consultation) => { setEditingC(c); setCForm({ ...c }); setShowCForm(true); };
  const deleteConsultation = (id: string) => { setConsultations(prev => prev.filter(c => c.id !== id)); };
  const resetCForm = () => { setShowCForm(false); setEditingC(null); setCForm(defaultCForm()); };

  /* ── Exam CRUD ── */
  const saveExam = () => {
    if (!eForm.nome || !selectedId) return;
    setExams(prev => [...prev, { ...eForm, id: Date.now().toString(), pacienteId: selectedId, criadoEm: new Date().toISOString() } as ExamRecord]);
    resetEForm();
  };

  const updateExamStatus = (id: string, status: ExamRecord['status']) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleFileUpload = (examId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert('Arquivo muito grande. Máximo: 2MB'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setExams(prev => prev.map(ex => ex.id === examId ? {
        ...ex, arquivoBase64: reader.result as string, arquivoNome: file.name,
        arquivoTipo: file.type, status: 'laudo_disponivel' as const, dataResultado: toISO(new Date()),
      } : ex));
    };
    reader.readAsDataURL(file);
  };

  const deleteExam = (id: string) => { setExams(prev => prev.filter(e => e.id !== id)); };
  const resetEForm = () => { setShowEForm(false); setEForm(defaultEForm()); };

  const selectPatient = (id: string) => { setSelectedId(id); setDetailTab('perfil'); };

  /* ═══ INPUT HELPER ═══ */
  const Input = ({ label, value, onChange, type = 'text', placeholder = '', required = false, className = '' }: {
    label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; className?: string;
  }) => (
    <div className={className}>
      <label className="text-xs text-gray-500 mb-1 block">{label}{required && ' *'}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
    </div>
  );

  const Select = ({ label, value, onChange, options, className = '' }: {
    label: string; value: string; onChange: (v: string) => void; options: string[] | Record<string, string>; className?: string;
  }) => (
    <div className={className}>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
        {Array.isArray(options)
          ? options.map(o => <option key={o} value={o}>{o}</option>)
          : Object.entries(options).map(([k, v]) => <option key={k} value={k}>{v}</option>)
        }
      </select>
    </div>
  );

  const TextArea = ({ label, value, onChange, rows = 3, placeholder = '', className = '' }: {
    label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; className?: string;
  }) => (
    <div className={className}>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-y" />
    </div>
  );

  /* ═══════════════════════════════════════════ */
  /* ═══ PATIENT DETAIL VIEW ═══ */
  /* ═══════════════════════════════════════════ */
  if (selectedPatient) {
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
                <div className="flex items-center gap-3 text-xs text-gray-500">
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
                  ['Endereço', selectedPatient.endereco],
                  ['Cidade', selectedPatient.cidade],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-500">{l}</span>
                    <span className="text-gray-900 font-medium text-right max-w-[60%]">{v || '-'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-primary-500" /> Dados Médicos</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Tipo Sanguíneo', selectedPatient.tipoSanguineo],
                  ['Convênio', selectedPatient.convenio + (selectedPatient.numConvenio ? ` — ${selectedPatient.numConvenio}` : '')],
                  ['Status Saúde', sc.label],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-1.5 border-b border-gray-50">
                    <span className="text-gray-500">{l}</span>
                    <span className="text-gray-900 font-medium">{v || '-'}</span>
                  </div>
                ))}
              </div>
              {selectedPatient.alergias && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">Alergias</p><p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{selectedPatient.alergias}</p></div>}
              {selectedPatient.medicamentosEmUso && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">Medicamentos em Uso</p><p className="text-sm text-gray-700 bg-blue-50 p-2 rounded-lg">{selectedPatient.medicamentosEmUso}</p></div>}
              {selectedPatient.historicoMedico && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">Histórico Médico</p><p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg whitespace-pre-wrap">{selectedPatient.historicoMedico}</p></div>}
              {selectedPatient.antecedentesGineco && <div className="mt-3"><p className="text-xs text-gray-500 mb-1">Antecedentes Ginecológicos</p><p className="text-sm text-gray-700 bg-purple-50 p-2 rounded-lg whitespace-pre-wrap">{selectedPatient.antecedentesGineco}</p></div>}
            </div>

            {selectedPatient.observacoes && (
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Observações</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedPatient.observacoes}</p>
              </div>
            )}

            {/* Quick Stats */}
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
                  <Input label="Data" value={cForm.data || ''} onChange={v => setCForm({ ...cForm, data: v })} type="date" required />
                  <Input label="Horário" value={cForm.horario || ''} onChange={v => setCForm({ ...cForm, horario: v })} placeholder="14:00" />
                  <Select label="Tipo" value={cForm.tipo || TIPOS_CONSULTA[0]} onChange={v => setCForm({ ...cForm, tipo: v })} options={TIPOS_CONSULTA} />
                  <Input label="Retorno" value={cForm.retorno || ''} onChange={v => setCForm({ ...cForm, retorno: v })} type="date" />
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-xl">
                  <p className="text-xs text-purple-700 font-medium mb-2">📊 Sinais Vitais</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Input label="Peso (kg)" value={cForm.pesoKg || ''} onChange={v => setCForm({ ...cForm, pesoKg: v })} placeholder="65.0" />
                    <Input label="Altura (m)" value={cForm.alturaM || ''} onChange={v => setCForm({ ...cForm, alturaM: v })} placeholder="1.65" />
                    <Input label="PA (mmHg)" value={cForm.pressaoArterial || ''} onChange={v => setCForm({ ...cForm, pressaoArterial: v })} placeholder="120/80" />
                    <Input label="Temp. (°C)" value={cForm.temperatura || ''} onChange={v => setCForm({ ...cForm, temperatura: v })} placeholder="36.5" />
                  </div>
                  {cForm.pesoKg && cForm.alturaM && (
                    <p className="text-xs text-purple-600 mt-2">IMC: {calcularIMC(cForm.pesoKg, cForm.alturaM)}</p>
                  )}
                </div>

                {(cForm.tipo === 'Pré-natal' || selectedPatient.statusSaude === 'gestante') && (
                  <div className="mt-4 p-3 bg-pink-50 rounded-xl">
                    <p className="text-xs text-pink-700 font-medium mb-2">🤰 Dados Obstétricos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Input label="IG (semanas)" value={cForm.idadeGestacional || ''} onChange={v => setCForm({ ...cForm, idadeGestacional: v })} placeholder="28+3" />
                      <Input label="AU (cm)" value={cForm.alturaUterina || ''} onChange={v => setCForm({ ...cForm, alturaUterina: v })} placeholder="28" />
                      <Input label="BCF (bpm)" value={cForm.bcf || ''} onChange={v => setCForm({ ...cForm, bcf: v })} placeholder="142" />
                      <Input label="Mov. Fetais" value={cForm.movimentosFetais || ''} onChange={v => setCForm({ ...cForm, movimentosFetais: v })} placeholder="Presentes" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <TextArea label="Queixa Principal *" value={cForm.queixaPrincipal || ''} onChange={v => setCForm({ ...cForm, queixaPrincipal: v })} placeholder="Descreva a queixa principal" />
                  <TextArea label="HDA" value={cForm.hda || ''} onChange={v => setCForm({ ...cForm, hda: v })} placeholder="História da doença atual" />
                  <TextArea label="Exame Físico" value={cForm.exameFisico || ''} onChange={v => setCForm({ ...cForm, exameFisico: v })} />
                  <TextArea label="Hipótese Diagnóstica" value={cForm.hipoteseDiagnostica || ''} onChange={v => setCForm({ ...cForm, hipoteseDiagnostica: v })} />
                  <TextArea label="Conduta" value={cForm.conduta || ''} onChange={v => setCForm({ ...cForm, conduta: v })} />
                  <TextArea label="Prescrição" value={cForm.prescricao || ''} onChange={v => setCForm({ ...cForm, prescricao: v })} />
                  <TextArea label="Exames Solicitados" value={cForm.examesSolicitados || ''} onChange={v => setCForm({ ...cForm, examesSolicitados: v })} />
                  <TextArea label="Observações" value={cForm.observacoes || ''} onChange={v => setCForm({ ...cForm, observacoes: v })} />
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={saveConsultation} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                    <Save className="w-4 h-4" /> {editingC ? 'Salvar' : 'Registrar Consulta'}
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
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded font-medium">{c.tipo}</span>
                            <span className="text-xs text-gray-400">{formatDateBR(c.data)} {c.horario && `às ${c.horario}`}</span>
                          </div>
                          <p className="font-medium text-gray-900 text-sm">{c.queixaPrincipal}</p>
                          {c.hipoteseDiagnostica && <p className="text-xs text-gray-500 mt-1"><strong>Diagnóstico:</strong> {c.hipoteseDiagnostica}</p>}
                          {c.conduta && <p className="text-xs text-gray-500 mt-0.5"><strong>Conduta:</strong> {c.conduta}</p>}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setViewConsult(viewConsult?.id === c.id ? null : c)} className="p-1 text-gray-400 hover:text-primary-600"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => editConsultation(c)} className="p-1 text-gray-400 hover:text-primary-600"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => deleteConsultation(c.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>

                      {/* Vitals Summary */}
                      {(c.pesoKg || c.pressaoArterial) && (
                        <div className="flex gap-3 mt-2 flex-wrap">
                          {c.pesoKg && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">⚖️ {c.pesoKg}kg</span>}
                          {c.pressaoArterial && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">💓 PA {c.pressaoArterial}</span>}
                          {c.pesoKg && c.alturaM && <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded text-gray-600">📏 IMC {calcularIMC(c.pesoKg, c.alturaM)}</span>}
                          {c.idadeGestacional && <span className="text-[10px] px-2 py-0.5 bg-pink-100 rounded text-pink-600">🤰 IG {c.idadeGestacional}</span>}
                          {c.bcf && <span className="text-[10px] px-2 py-0.5 bg-pink-100 rounded text-pink-600">💗 BCF {c.bcf}</span>}
                        </div>
                      )}

                      {c.retorno && <p className="text-[10px] text-blue-600 mt-2">📅 Retorno: {formatDateBR(c.retorno)}</p>}
                    </div>

                    {/* Expanded Detail */}
                    {viewConsult?.id === c.id && (
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          {c.hda && <div><p className="text-xs text-gray-500 font-medium">HDA</p><p className="text-gray-700 whitespace-pre-wrap">{c.hda}</p></div>}
                          {c.exameFisico && <div><p className="text-xs text-gray-500 font-medium">Exame Físico</p><p className="text-gray-700 whitespace-pre-wrap">{c.exameFisico}</p></div>}
                          {c.prescricao && <div><p className="text-xs text-gray-500 font-medium">Prescrição</p><p className="text-gray-700 whitespace-pre-wrap">{c.prescricao}</p></div>}
                          {c.examesSolicitados && <div><p className="text-xs text-gray-500 font-medium">Exames Solicitados</p><p className="text-gray-700 whitespace-pre-wrap">{c.examesSolicitados}</p></div>}
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
            <div className="flex gap-3 mb-6">
              <button onClick={() => { resetEForm(); setShowEForm(true); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                <Plus className="w-4 h-4" /> Solicitar Exame
              </button>
            </div>

            {/* Exam Form */}
            {showEForm && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Solicitar Exame</h3>
                  <button onClick={resetEForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Input label="Nome do Exame" value={eForm.nome || ''} onChange={v => setEForm({ ...eForm, nome: v })} required placeholder="Ex: Ultrassom morfológico" />
                  <Select label="Tipo" value={eForm.tipo || TIPOS_EXAME[0]} onChange={v => setEForm({ ...eForm, tipo: v })} options={TIPOS_EXAME} />
                  <Input label="Data Solicitação" value={eForm.dataSolicitacao || ''} onChange={v => setEForm({ ...eForm, dataSolicitacao: v })} type="date" />
                  <TextArea label="Observações" value={eForm.observacoes || ''} onChange={v => setEForm({ ...eForm, observacoes: v })} rows={2} className="sm:col-span-2 lg:col-span-3" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={saveExam} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                    <Save className="w-4 h-4" /> Solicitar
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
                  return (
                    <div key={ex.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{ex.nome}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ec.bg}`}>{ec.label}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>{ex.tipo}</span>
                            <span>Solicitado: {formatDateBR(ex.dataSolicitacao)}</span>
                            {ex.dataResultado && <span>Resultado: {formatDateBR(ex.dataResultado)}</span>}
                          </div>
                          {ex.resultado && <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded-lg">{ex.resultado}</p>}
                          {ex.arquivoNome && (
                            <div className="flex items-center gap-2 mt-2">
                              <Paperclip className="w-3 h-3 text-purple-500" />
                              <a href={ex.arquivoBase64} download={ex.arquivoNome} className="text-xs text-purple-600 hover:underline font-medium">
                                {ex.arquivoNome}
                              </a>
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
                          <label className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer" title="Anexar laudo">
                            <Upload className="w-4 h-4" />
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => handleFileUpload(ex.id, e)} />
                          </label>
                          <button onClick={() => deleteExam(ex.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
              <p className="text-sm text-primary-700">
                📎 <strong>Laudos e Resultados:</strong> Clique no ícone de upload (↑) para anexar o laudo/resultado do exame. Aceita PDF, imagens e documentos (máx. 2MB).
              </p>
            </div>
          </>
        )}

        {/* ── FINANCEIRO TAB ── */}
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
                <p className="text-xs mt-1">Pagamentos são gerenciados na aba Financeiro do painel</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Descrição</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Valor</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Pagamento</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientPayments.map(p => {
                        const ps = STATUS_PAGAMENTO_CONFIG[p.status] || STATUS_PAGAMENTO_CONFIG.pendente;
                        return (
                          <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="px-4 py-3 text-gray-600">{formatDateBR(p.data)}</td>
                            <td className="px-4 py-3 text-gray-900 font-medium">{p.descricao}</td>
                            <td className="px-4 py-3 text-gray-900 font-medium">{formatarMoeda(p.valorFinal)}</td>
                            <td className="px-4 py-3 text-gray-600">{FORMAS_PAGAMENTO[p.formaPagamento] || p.formaPagamento}</td>
                            <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-lg font-medium ${ps.bg}`}>{ps.label}</span></td>
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

        {/* Patient Edit Modal */}
        {showPForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={resetPForm}>
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">{editingP ? 'Editar Paciente' : 'Novo Paciente'}</h3>
                <button onClick={resetPForm}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Nome Completo" value={pForm.nome || ''} onChange={v => setPForm({ ...pForm, nome: v })} required className="sm:col-span-2" />
                <Input label="Telefone" value={pForm.telefone || ''} onChange={v => setPForm({ ...pForm, telefone: v })} required placeholder="(18) 99999-9999" />
                <Input label="E-mail" value={pForm.email || ''} onChange={v => setPForm({ ...pForm, email: v })} type="email" />
                <Input label="CPF" value={pForm.cpf || ''} onChange={v => setPForm({ ...pForm, cpf: v })} placeholder="000.000.000-00" />
                <Input label="Data de Nascimento" value={pForm.dataNascimento || ''} onChange={v => setPForm({ ...pForm, dataNascimento: v })} type="date" />
                <Input label="Endereço" value={pForm.endereco || ''} onChange={v => setPForm({ ...pForm, endereco: v })} className="sm:col-span-2" />
                <Input label="Cidade" value={pForm.cidade || ''} onChange={v => setPForm({ ...pForm, cidade: v })} />
                <Select label="Tipo Sanguíneo" value={pForm.tipoSanguineo || 'Não informado'} onChange={v => setPForm({ ...pForm, tipoSanguineo: v })} options={TIPOS_SANGUINEO} />
                <Select label="Convênio" value={pForm.convenio || 'Particular'} onChange={v => setPForm({ ...pForm, convenio: v })} options={CONVENIOS} />
                <Input label="Nº Convênio" value={pForm.numConvenio || ''} onChange={v => setPForm({ ...pForm, numConvenio: v })} />
                <Select label="Status Saúde" value={pForm.statusSaude || 'estavel'} onChange={v => setPForm({ ...pForm, statusSaude: v as Patient['statusSaude'] })}
                  options={{ estavel: 'Estável', atencao: 'Atenção', acompanhamento: 'Acompanhamento', gestante: 'Gestante' }} />
                <Input label="Alergias" value={pForm.alergias || ''} onChange={v => setPForm({ ...pForm, alergias: v })} placeholder="Nenhuma conhecida" />
                <TextArea label="Medicamentos em Uso" value={pForm.medicamentosEmUso || ''} onChange={v => setPForm({ ...pForm, medicamentosEmUso: v })} rows={2} className="sm:col-span-2" />
                <TextArea label="Histórico Médico" value={pForm.historicoMedico || ''} onChange={v => setPForm({ ...pForm, historicoMedico: v })} rows={2} className="sm:col-span-2" placeholder="Cirurgias, doenças prévias, etc." />
                <TextArea label="Antecedentes Ginecológicos" value={pForm.antecedentesGineco || ''} onChange={v => setPForm({ ...pForm, antecedentesGineco: v })} rows={2} className="sm:col-span-2" placeholder="Menarca, G_P_A_, ciclos, etc." />
                <TextArea label="Observações" value={pForm.observacoes || ''} onChange={v => setPForm({ ...pForm, observacoes: v })} rows={2} className="sm:col-span-2" />
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={savePatient} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                  <Save className="w-4 h-4" /> {editingP ? 'Salvar Alterações' : 'Cadastrar Paciente'}
                </button>
                <button onClick={resetPForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  /* ═══════════════════════════════════════════ */
  /* ═══ PATIENT LIST VIEW ═══ */
  /* ═══════════════════════════════════════════ */
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { n: stats.total, label: 'Total Pacientes', icon: Users, color: 'primary' },
          { n: stats.gestantes, label: 'Gestantes', icon: Baby, color: 'purple' },
          { n: stats.atencao, label: 'Atenção', icon: Activity, color: 'yellow' },
          { n: stats.comConvenio, label: 'Com Convênio', icon: Heart, color: 'blue' },
        ].map(s => (
          <div key={s.label} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-${s.color}-100 rounded-xl flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 text-${s.color}-600`} />
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

      {/* Patient List */}
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
                      {pConsults.length > 0 && (
                        <span className="text-[10px] text-gray-400">{pConsults.length} consulta{pConsults.length !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                    {lastConsult && (
                      <p className="text-[10px] text-gray-400 mt-1">Última: {formatDateBR(lastConsult.data)}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* New Patient Modal */}
      {showPForm && !editingP && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={resetPForm}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl my-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Novo Paciente</h3>
              <button onClick={resetPForm}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label="Nome Completo" value={pForm.nome || ''} onChange={v => setPForm({ ...pForm, nome: v })} required className="sm:col-span-2" />
              <Input label="Telefone" value={pForm.telefone || ''} onChange={v => setPForm({ ...pForm, telefone: v })} required placeholder="(18) 99999-9999" />
              <Input label="E-mail" value={pForm.email || ''} onChange={v => setPForm({ ...pForm, email: v })} type="email" />
              <Input label="CPF" value={pForm.cpf || ''} onChange={v => setPForm({ ...pForm, cpf: v })} placeholder="000.000.000-00" />
              <Input label="Data de Nascimento" value={pForm.dataNascimento || ''} onChange={v => setPForm({ ...pForm, dataNascimento: v })} type="date" />
              <Input label="Endereço" value={pForm.endereco || ''} onChange={v => setPForm({ ...pForm, endereco: v })} className="sm:col-span-2" />
              <Input label="Cidade" value={pForm.cidade || ''} onChange={v => setPForm({ ...pForm, cidade: v })} />
              <Select label="Tipo Sanguíneo" value={pForm.tipoSanguineo || 'Não informado'} onChange={v => setPForm({ ...pForm, tipoSanguineo: v })} options={TIPOS_SANGUINEO} />
              <Select label="Convênio" value={pForm.convenio || 'Particular'} onChange={v => setPForm({ ...pForm, convenio: v })} options={CONVENIOS} />
              <Input label="Nº Convênio" value={pForm.numConvenio || ''} onChange={v => setPForm({ ...pForm, numConvenio: v })} />
              <Select label="Status Saúde" value={pForm.statusSaude || 'estavel'} onChange={v => setPForm({ ...pForm, statusSaude: v as Patient['statusSaude'] })}
                options={{ estavel: 'Estável', atencao: 'Atenção', acompanhamento: 'Acompanhamento', gestante: 'Gestante' }} />
              <Input label="Alergias" value={pForm.alergias || ''} onChange={v => setPForm({ ...pForm, alergias: v })} placeholder="Nenhuma conhecida" />
              <TextArea label="Medicamentos em Uso" value={pForm.medicamentosEmUso || ''} onChange={v => setPForm({ ...pForm, medicamentosEmUso: v })} rows={2} className="sm:col-span-2" />
              <TextArea label="Histórico Médico" value={pForm.historicoMedico || ''} onChange={v => setPForm({ ...pForm, historicoMedico: v })} rows={2} className="sm:col-span-2" placeholder="Cirurgias, doenças prévias, etc." />
              <TextArea label="Antecedentes Ginecológicos" value={pForm.antecedentesGineco || ''} onChange={v => setPForm({ ...pForm, antecedentesGineco: v })} rows={2} className="sm:col-span-2" placeholder="Menarca, G_P_A_, ciclos, etc." />
              <TextArea label="Observações" value={pForm.observacoes || ''} onChange={v => setPForm({ ...pForm, observacoes: v })} rows={2} className="sm:col-span-2" />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={savePatient} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                <Save className="w-4 h-4" /> Cadastrar Paciente
              </button>
              <button onClick={resetPForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

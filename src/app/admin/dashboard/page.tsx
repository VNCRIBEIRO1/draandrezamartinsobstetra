'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar, Clock, Users, FileText, LogOut, Plus, Trash2, Edit3,
  ChevronLeft, ChevronRight, Heart, Menu, X, Settings, Home
} from 'lucide-react';
import Link from 'next/link';

/* ─── Types ─── */
interface Appointment {
  id: string;
  paciente: string;
  telefone: string;
  tipo: string;
  data: string;
  horario: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  observacoes?: string;
}

interface AvailableSlot {
  id: string;
  dia: string; // 'segunda' | 'terca' | etc
  horario: string;
  ativo: boolean;
}

type Tab = 'agendamentos' | 'horarios' | 'blog';

/* ─── Constants ─── */
const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const HORARIOS_PADRAO = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const TIPOS_CONSULTA = [
  'Consulta Ginecológica', 'Pré-natal', 'Menopausa',
  'Ginecologia Regenerativa', 'Microscopia Vaginal', 'Retorno',
];

const STATUS_COLORS = {
  confirmado: 'bg-green-100 text-green-700',
  pendente: 'bg-yellow-100 text-yellow-700',
  cancelado: 'bg-red-100 text-red-700',
};

/* ─── Main Component ─── */
export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('agendamentos');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Agendamentos
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showNewAppt, setShowNewAppt] = useState(false);
  const [newAppt, setNewAppt] = useState({ paciente: '', telefone: '', tipo: TIPOS_CONSULTA[0], data: '', horario: '', observacoes: '' });

  // Horários
  const [slots, setSlots] = useState<AvailableSlot[]>([]);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) {
          router.push('/admin');
          return;
        }
      } catch {
        router.push('/admin');
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  // Load data from localStorage
  useEffect(() => {
    const savedAppts = localStorage.getItem('dra_appointments');
    const savedSlots = localStorage.getItem('dra_slots');
    if (savedAppts) setAppointments(JSON.parse(savedAppts));
    if (savedSlots) {
      setSlots(JSON.parse(savedSlots));
    } else {
      // Initialize default slots
      const defaultSlots: AvailableSlot[] = [];
      DIAS_SEMANA.forEach((dia) => {
        const horarios = dia === 'Sábado' ? HORARIOS_PADRAO.filter((h) => parseInt(h) < 12) : HORARIOS_PADRAO;
        horarios.forEach((horario) => {
          defaultSlots.push({
            id: `${dia}-${horario}`,
            dia,
            horario,
            ativo: true,
          });
        });
      });
      setSlots(defaultSlots);
      localStorage.setItem('dra_slots', JSON.stringify(defaultSlots));
    }
  }, []);

  // Save on change
  useEffect(() => {
    if (appointments.length > 0) localStorage.setItem('dra_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (slots.length > 0) localStorage.setItem('dra_slots', JSON.stringify(slots));
  }, [slots]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const addAppointment = () => {
    if (!newAppt.paciente || !newAppt.data || !newAppt.horario) return;
    const appt: Appointment = {
      id: Date.now().toString(),
      ...newAppt,
      status: 'pendente',
    };
    setAppointments((prev) => [...prev, appt]);
    setNewAppt({ paciente: '', telefone: '', tipo: TIPOS_CONSULTA[0], data: '', horario: '', observacoes: '' });
    setShowNewAppt(false);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleSlot = (id: string) => {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ativo: !s.ativo } : s)));
  };

  const todayAppointments = appointments.filter((a) => a.data === new Date().toISOString().split('T')[0]);
  const pendingCount = appointments.filter((a) => a.status === 'pendente').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Dra. Andresa</h2>
              <p className="text-xs text-gray-500">Painel Admin</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <button onClick={() => { setActiveTab('agendamentos'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'agendamentos' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Calendar className="w-5 h-5" /> Agendamentos
            {pendingCount > 0 && <span className="ml-auto bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{pendingCount}</span>}
          </button>
          <button onClick={() => { setActiveTab('horarios'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'horarios' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Clock className="w-5 h-5" /> Horários Disponíveis
          </button>
          <button onClick={() => { setActiveTab('blog'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'blog' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText className="w-5 h-5" /> Blog / Artigos
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors mb-1">
            <Home className="w-5 h-5" /> Ver Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 capitalize">{activeTab === 'horarios' ? 'Horários Disponíveis' : activeTab}</h1>
        </header>

        <div className="p-6">
          {/* ────── AGENDAMENTOS ────── */}
          {activeTab === 'agendamentos' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                      <p className="text-xs text-gray-500">Consultas Hoje</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                      <p className="text-xs text-gray-500">Pendentes</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                      <p className="text-xs text-gray-500">Total Agendados</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={() => setShowNewAppt(!showNewAppt)}
                className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4" /> Nova Consulta
              </button>

              {/* New appointment form */}
              {showNewAppt && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Novo Agendamento</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input value={newAppt.paciente} onChange={(e) => setNewAppt({ ...newAppt, paciente: e.target.value })} placeholder="Nome da paciente" className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    <input value={newAppt.telefone} onChange={(e) => setNewAppt({ ...newAppt, telefone: e.target.value })} placeholder="Telefone" className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    <select value={newAppt.tipo} onChange={(e) => setNewAppt({ ...newAppt, tipo: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                      {TIPOS_CONSULTA.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <input type="date" value={newAppt.data} onChange={(e) => setNewAppt({ ...newAppt, data: e.target.value })} className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    <input value={newAppt.horario} onChange={(e) => setNewAppt({ ...newAppt, horario: e.target.value })} placeholder="Horário (08:00)" className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    <input value={newAppt.observacoes} onChange={(e) => setNewAppt({ ...newAppt, observacoes: e.target.value })} placeholder="Observações" className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={addAppointment} className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">Salvar</button>
                    <button onClick={() => setShowNewAppt(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )}

              {/* Appointment list */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Paciente</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Tipo</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Horário</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-500">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-8 text-gray-400">Nenhum agendamento cadastrado</td></tr>
                      ) : (
                        appointments.sort((a, b) => `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`)).map((appt) => (
                          <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-gray-900">{appt.paciente}</p>
                                <p className="text-xs text-gray-400">{appt.telefone}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{appt.tipo}</td>
                            <td className="px-4 py-3 text-gray-600">{appt.data ? new Date(appt.data + 'T12:00').toLocaleDateString('pt-BR') : '-'}</td>
                            <td className="px-4 py-3 text-gray-600">{appt.horario}</td>
                            <td className="px-4 py-3">
                              <select
                                value={appt.status}
                                onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as Appointment['status'])}
                                className={`text-xs px-2 py-1 rounded-lg border-0 font-medium ${STATUS_COLORS[appt.status]}`}
                              >
                                <option value="pendente">Pendente</option>
                                <option value="confirmado">Confirmado</option>
                                <option value="cancelado">Cancelado</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <button onClick={() => deleteAppointment(appt.id)} className="text-red-400 hover:text-red-600 p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ────── HORÁRIOS ────── */}
          {activeTab === 'horarios' && (
            <>
              <p className="text-gray-500 text-sm mb-6">
                Clique nos horários para ativar/desativar. Horários desativados não aparecerão como disponíveis para as pacientes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIAS_SEMANA.map((dia) => {
                  const diaSlots = slots.filter((s) => s.dia === dia);
                  return (
                    <div key={dia} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3">{dia}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {diaSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => toggleSlot(slot.id)}
                            className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              slot.ativo
                                ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                                : 'bg-gray-100 text-gray-400 line-through hover:bg-gray-200'
                            }`}
                          >
                            {slot.horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ────── BLOG ────── */}
          {activeTab === 'blog' && (
            <>
              <p className="text-gray-500 text-sm mb-6">
                Gerencie os artigos do blog. Os artigos são editados diretamente no código-fonte do site.
                Para adicionar novos artigos ou vídeos, entre em contato com o desenvolvedor.
              </p>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Artigos Publicados</h3>
                <div className="space-y-3">
                  {[
                    'A Importância do Pré-Natal',
                    'Microscopia Vaginal: Diagnóstico na Hora',
                    'Menopausa: Como Manter a Qualidade de Vida',
                    'Ginecologia Regenerativa: Inovação em Saúde Feminina',
                    'Exames Ginecológicos de Rotina',
                    'Cheiro Íntimo: Normal ou Anormal?',
                    'Pílula do Dia Seguinte',
                    'VSR em Recém-Nascidos',
                    'Cuidar de Você é Amor Próprio',
                    '10 Coisas que Eu Não Faria Sendo Ginecologista',
                  ].map((title, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-gray-700">{title}</span>
                      </div>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">Publicado</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                  <p className="text-sm text-primary-700">
                    💡 Para adicionar novos artigos com vídeos do Instagram/YouTube, entre em contato com o
                    desenvolvedor do site. Os artigos suportam embed de vídeo!
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

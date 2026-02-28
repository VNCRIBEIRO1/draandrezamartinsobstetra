'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar, Clock, Users, FileText, LogOut, Plus, Trash2,
  ChevronLeft, ChevronRight, Heart, Menu, Home, Eye, EyeOff,
  Video, Save, X, Edit3, Search, Filter, Phone, CheckCircle2,
  AlertCircle, XCircle, CalendarDays, LayoutGrid, List, Bell
} from 'lucide-react';
import Link from 'next/link';
import { articles } from '@/lib/articles';

/* ═══════════ TYPES ═══════════ */
interface Appointment {
  id: string;
  paciente: string;
  telefone: string;
  tipo: string;
  data: string; // YYYY-MM-DD
  horario: string;
  status: 'confirmado' | 'pendente' | 'cancelado' | 'realizado';
  observacoes?: string;
  criadoEm: string;
  origem: 'manual' | 'chatbot';
}

interface AvailableSlot {
  id: string;
  dia: string;
  horario: string;
  ativo: boolean;
}

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  videoUrl?: string;
  published: boolean;
}

type Tab = 'agendamentos' | 'horarios' | 'blog';
type CalendarView = 'month' | 'week' | 'day';

/* ═══════════ CONSTANTS ═══════════ */
const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const DIAS_SEMANA_FULL = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const HORARIOS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
const TIPOS = ['Consulta Ginecológica','Pré-natal','Menopausa','Ginecologia Regenerativa','Microscopia Vaginal','Retorno','Primeira Consulta'];
const STATUS_CONFIG = {
  confirmado: { bg: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', label: 'Confirmado', icon: CheckCircle2 },
  pendente: { bg: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500', label: 'Pendente', icon: AlertCircle },
  cancelado: { bg: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500', label: 'Cancelado', icon: XCircle },
  realizado: { bg: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500', label: 'Realizado', icon: CheckCircle2 },
};
const CATEGORIES = ['Pré-natal','Microscopia Vaginal','Menopausa','Ginecologia Regenerativa','Ginecologia','Saúde da Mulher','Saúde Feminina','Contracepção'];

/* ═══════════ DEFAULT ARTICLES ═══════════ */
const DEFAULT_ARTICLES: BlogArticle[] = [
  { id: '1', slug: 'importancia-pre-natal', title: 'A Importância do Pré-Natal: Cuidando da Mãe e do Bebê', category: 'Pré-natal', date: '25 Fev 2026', readTime: '7 min', content: articles['importancia-pre-natal']?.content || [], published: true },
  { id: '2', slug: 'microscopia-vaginal-diagnostico', title: 'Microscopia Vaginal: Diagnóstico na Hora com Precisão', category: 'Microscopia Vaginal', date: '20 Fev 2026', readTime: '5 min', content: articles['microscopia-vaginal-diagnostico']?.content || [], published: true },
  { id: '3', slug: 'menopausa-qualidade-vida', title: 'Menopausa: Como Manter a Qualidade de Vida Nessa Nova Fase', category: 'Menopausa', date: '15 Fev 2026', readTime: '8 min', content: articles['menopausa-qualidade-vida']?.content || [], published: true },
  { id: '4', slug: 'ginecologia-regenerativa', title: 'Ginecologia Regenerativa: Inovação em Saúde Feminina', category: 'Ginecologia Regenerativa', date: '10 Fev 2026', readTime: '6 min', content: articles['ginecologia-regenerativa']?.content || [], published: true },
  { id: '5', slug: 'exames-ginecologicos-rotina', title: 'Exames Ginecológicos de Rotina: Quando e Por Que Fazer', category: 'Ginecologia', date: '05 Fev 2026', readTime: '5 min', content: articles['exames-ginecologicos-rotina']?.content || [], published: true },
  { id: '6', slug: 'cheiro-intimo-normal-anormal', title: 'Cheiro Íntimo: O Que É Normal e O Que Não É?', category: 'Ginecologia', date: '01 Fev 2026', readTime: '4 min', content: articles['cheiro-intimo-normal-anormal']?.content || [], published: true },
  { id: '7', slug: 'pilula-do-dia-seguinte', title: 'Pílula do Dia Seguinte: O Que Você Precisa Saber', category: 'Contracepção', date: '28 Jan 2026', readTime: '5 min', content: articles['pilula-do-dia-seguinte']?.content || [], published: true },
  { id: '8', slug: 'vsr-recem-nascido', title: 'VSR em Recém-Nascidos: Entenda e Proteja Seu Bebê', category: 'Pré-natal', date: '25 Jan 2026', readTime: '6 min', content: articles['vsr-recem-nascido']?.content || [], published: true },
  { id: '9', slug: 'cuidar-voce-amor-proprio', title: 'Cuidar de Você É Amor Próprio', category: 'Saúde da Mulher', date: '20 Jan 2026', readTime: '4 min', content: articles['cuidar-voce-amor-proprio']?.content || [], published: true },
  { id: '10', slug: 'nao-faria-sendo-ginecologista', title: '10 Coisas que Eu Não Faria Sendo Ginecologista', category: 'Ginecologia', date: '15 Jan 2026', readTime: '7 min', content: articles['nao-faria-sendo-ginecologista']?.content || [], published: true },
];

/* ═══════════ HELPERS ═══════════ */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function formatDateBR(d: string) {
  if (!d) return '-';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}
function toISO(date: Date) {
  return date.toISOString().split('T')[0];
}

/* ═══════════ MAIN COMPONENT ═══════════ */
export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('agendamentos');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ── Agendamentos State ── */
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({ paciente: '', telefone: '', tipo: TIPOS[0], data: '', horario: '', observacoes: '' });
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(toISO(new Date()));

  /* ── Horários State ── */
  const [slots, setSlots] = useState<AvailableSlot[]>([]);

  /* ── Blog State ── */
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '', slug: '', category: CATEGORIES[0], readTime: '5 min',
    videoUrl: '', content: '', published: true,
  });

  /* ── Horários Schedule State ── */
  const [horarioWeekStart, setHorarioWeekStart] = useState<Date>(() => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff); d.setHours(0, 0, 0, 0);
    return new Date(d);
  });
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);
  const [slotDetail, setSlotDetail] = useState<{ date: string; horario: string; appointment?: Appointment } | null>(null);
  const [quickBookData, setQuickBookData] = useState({ paciente: '', telefone: '', tipo: TIPOS[0], observacoes: '' });

  /* ── Auth ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) { router.push('/admin'); return; }
      } catch { router.push('/admin'); return; }
      setLoading(false);
    })();
  }, [router]);

  /* ── Load Data ── */
  useEffect(() => {
    const a = localStorage.getItem('dra_appointments');
    const s = localStorage.getItem('dra_slots');
    const b = localStorage.getItem('dra_blog_articles');
    if (a) setAppointments(JSON.parse(a));
    if (s) { setSlots(JSON.parse(s)); } else {
      const def: AvailableSlot[] = [];
      DIAS_SEMANA_FULL.forEach((dia) => {
        const hrs = dia === 'Sábado' ? HORARIOS.filter(h => parseInt(h) < 12) : HORARIOS;
        hrs.forEach(h => def.push({ id: `${dia}-${h}`, dia, horario: h, ativo: true }));
      });
      setSlots(def);
    }
    if (b) {
      const stored: BlogArticle[] = JSON.parse(b);
      const merged = stored.map((art) => {
        if ((!art.content || art.content.length === 0) && articles[art.slug]) {
          return { ...art, content: articles[art.slug].content };
        }
        return art;
      });
      setBlogArticles(merged);
    } else {
      setBlogArticles(DEFAULT_ARTICLES);
    }
  }, []);

  /* ── Save Data ── */
  useEffect(() => { localStorage.setItem('dra_appointments', JSON.stringify(appointments)); }, [appointments]);
  useEffect(() => { if (slots.length > 0) localStorage.setItem('dra_slots', JSON.stringify(slots)); }, [slots]);
  useEffect(() => { localStorage.setItem('dra_blog_articles', JSON.stringify(blogArticles)); }, [blogArticles]);

  /* ── Data Refresh (sync with ChatBot in real-time) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('dra_appointments');
      if (stored) {
        try {
          const parsed: Appointment[] = JSON.parse(stored);
          setAppointments(prev => {
            if (JSON.stringify(prev) !== stored) return parsed;
            return prev;
          });
        } catch { /* ignore parse errors */ }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ── ChatBot Pending Alerts ── */
  const chatbotPending = useMemo(() =>
    appointments.filter(a => a.origem === 'chatbot' && a.status === 'pendente'),
    [appointments]
  );

  const confirmChatbotAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'confirmado' } : a));
  };

  /* ── Horários Schedule Helpers ── */
  const horarioWeekDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(horarioWeekStart);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, [horarioWeekStart]);

  const navHorarioWeek = (dir: number) => setHorarioWeekStart(prev => {
    const d = new Date(prev);
    d.setDate(d.getDate() + dir * 7);
    return d;
  });

  const goThisWeek = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff); d.setHours(0, 0, 0, 0);
    setHorarioWeekStart(new Date(d));
  };

  const getDayNameFromDate = (date: Date): string => {
    const map: Record<number, string> = { 1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sábado' };
    return map[date.getDay()] || '';
  };

  const getDayShort = (date: Date): string => {
    const map: Record<number, string> = { 0: 'Dom', 1: 'Seg', 2: 'Ter', 3: 'Qua', 4: 'Qui', 5: 'Sex', 6: 'Sáb' };
    return map[date.getDay()] || '';
  };

  const isSlotEnabled = useCallback((dayName: string, horario: string) => {
    if (!dayName) return false;
    const slot = slots.find(s => s.dia === dayName && s.horario === horario);
    return slot?.ativo ?? false;
  }, [slots]);

  const getSlotAppointment = useCallback((dateStr: string, horario: string) => {
    return appointments.find(a => a.data === dateStr && a.horario === horario);
  }, [appointments]);

  const weekApptCount = useMemo(() => {
    const dates = horarioWeekDays.map(d => toISO(d));
    return appointments.filter(a => dates.includes(a.data)).length;
  }, [horarioWeekDays, appointments]);

  const weekAvailableCount = useMemo(() => {
    let count = 0;
    horarioWeekDays.forEach(day => {
      const dayName = getDayNameFromDate(day);
      const dateStr = toISO(day);
      if (!dayName) return;
      HORARIOS.forEach(h => {
        if (isSlotEnabled(dayName, h) && !getSlotAppointment(dateStr, h)) count++;
      });
    });
    return count;
  }, [horarioWeekDays, isSlotEnabled, getSlotAppointment]);

  const weekOccupancyRate = useMemo(() => {
    let total = 0, occupied = 0;
    horarioWeekDays.forEach(day => {
      const dayName = getDayNameFromDate(day);
      const dateStr = toISO(day);
      if (!dayName) return;
      HORARIOS.forEach(h => {
        if (isSlotEnabled(dayName, h)) {
          total++;
          if (getSlotAppointment(dateStr, h)) occupied++;
        }
      });
    });
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  }, [horarioWeekDays, isSlotEnabled, getSlotAppointment]);

  const bookFromHorarios = (date: string, horario: string) => {
    if (!quickBookData.paciente) return;
    setAppointments(prev => [...prev, {
      id: Date.now().toString(), paciente: quickBookData.paciente,
      telefone: quickBookData.telefone, tipo: quickBookData.tipo,
      data: date, horario, status: 'pendente',
      observacoes: quickBookData.observacoes,
      criadoEm: new Date().toISOString(), origem: 'manual',
    }]);
    setSlotDetail(null);
    setQuickBookData({ paciente: '', telefone: '', tipo: TIPOS[0], observacoes: '' });
  };

  /* ── Appointment Actions ── */
  const saveAppointment = () => {
    if (!formData.paciente || !formData.data || !formData.horario) return;
    if (editingAppt) {
      setAppointments(prev => prev.map(a => a.id === editingAppt.id ? { ...a, ...formData } : a));
      setEditingAppt(null);
    } else {
      setAppointments(prev => [...prev, {
        id: Date.now().toString(), ...formData, status: 'pendente',
        criadoEm: new Date().toISOString(), origem: 'manual',
      }]);
    }
    setFormData({ paciente: '', telefone: '', tipo: TIPOS[0], data: '', horario: '', observacoes: '' });
    setShowForm(false);
  };

  const startEdit = (a: Appointment) => {
    setEditingAppt(a);
    setFormData({ paciente: a.paciente, telefone: a.telefone, tipo: a.tipo, data: a.data, horario: a.horario, observacoes: a.observacoes || '' });
    setShowForm(true);
  };

  const cancelForm = () => { setShowForm(false); setEditingAppt(null); setFormData({ paciente: '', telefone: '', tipo: TIPOS[0], data: '', horario: '', observacoes: '' }); };

  /* ── Calendar Navigation ── */
  const navMonth = (dir: number) => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  const goToday = () => { setCurrentDate(new Date()); setSelectedDay(toISO(new Date())); };

  /* ── Calendar Data ── */
  const calendarDays = useMemo(() => {
    const y = currentDate.getFullYear(), m = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(y, m);
    const firstDay = getFirstDayOfMonth(y, m);
    const days: { date: string; day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

    // Previous month padding
    const prevMonthDays = getDaysInMonth(y, m - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const date = toISO(new Date(y, m - 1, d));
      days.push({ date, day: d, isCurrentMonth: false, isToday: false });
    }

    // Current month
    const today = toISO(new Date());
    for (let d = 1; d <= daysInMonth; d++) {
      const date = toISO(new Date(y, m, d));
      days.push({ date, day: d, isCurrentMonth: true, isToday: date === today });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = toISO(new Date(y, m + 1, d));
      days.push({ date, day: d, isCurrentMonth: false, isToday: false });
    }
    return days;
  }, [currentDate]);

  const appointmentsForDate = useCallback((date: string) => appointments.filter(a => a.data === date), [appointments]);

  /* ── Filtered appointments ── */
  const filteredAppointments = useMemo(() => {
    let list = [...appointments];
    if (filterStatus !== 'todos') list = list.filter(a => a.status === filterStatus);
    if (searchTerm) list = list.filter(a =>
      a.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.telefone.includes(searchTerm) ||
      a.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return list.sort((a, b) => `${a.data}${a.horario}`.localeCompare(`${b.data}${b.horario}`));
  }, [appointments, filterStatus, searchTerm]);

  const selectedDayAppts = useMemo(() => appointmentsForDate(selectedDay), [selectedDay, appointmentsForDate]);

  /* ── Stats ── */
  const todayStr = toISO(new Date());
  const todayCount = appointments.filter(a => a.data === todayStr).length;
  const pendingCount = appointments.filter(a => a.status === 'pendente').length;
  const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekEnd.getDate() + 6);
  const weekCount = appointments.filter(a => { const d = new Date(a.data + 'T12:00'); return d >= weekStart && d <= weekEnd; }).length;

  /* ── Blog Actions ── */
  const saveArticle = () => {
    if (!articleForm.title || !articleForm.slug) return;
    const contentArr = articleForm.content.split('\n\n').filter(p => p.trim());
    if (editingArticle) {
      setBlogArticles(prev => prev.map(a => a.id === editingArticle.id ? {
        ...a, title: articleForm.title, slug: articleForm.slug, category: articleForm.category,
        readTime: articleForm.readTime, videoUrl: articleForm.videoUrl || undefined,
        content: contentArr, published: articleForm.published,
      } : a));
    } else {
      setBlogArticles(prev => [...prev, {
        id: Date.now().toString(), slug: articleForm.slug, title: articleForm.title,
        category: articleForm.category, date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
        readTime: articleForm.readTime, content: contentArr,
        videoUrl: articleForm.videoUrl || undefined, published: articleForm.published,
      }]);
    }
    resetArticleForm();
  };

  const editArticle = (a: BlogArticle) => {
    setEditingArticle(a);
    setArticleForm({
      title: a.title, slug: a.slug, category: a.category, readTime: a.readTime,
      videoUrl: a.videoUrl || '', content: a.content.join('\n\n'), published: a.published,
    });
    setShowArticleForm(true);
  };

  const resetArticleForm = () => {
    setShowArticleForm(false); setEditingArticle(null);
    setArticleForm({ title: '', slug: '', category: CATEGORIES[0], readTime: '5 min', videoUrl: '', content: '', published: true });
  };

  const togglePublished = (id: string) => setBlogArticles(prev => prev.map(a => a.id === id ? { ...a, published: !a.published } : a));
  const deleteArticle = (id: string) => setBlogArticles(prev => prev.filter(a => a.id !== id));

  const handleLogout = async () => { await fetch('/api/auth/logout', { method: 'POST' }); router.push('/admin'); };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500">Carregando...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ═══ SIDEBAR ═══ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Dra. Andresa</h2>
              <p className="text-xs text-gray-500">Painel Admin</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {([
            { tab: 'agendamentos' as Tab, icon: Calendar, label: 'Agendamentos', badge: pendingCount },
            { tab: 'horarios' as Tab, icon: Clock, label: 'Horários' },
            { tab: 'blog' as Tab, icon: FileText, label: 'Blog / Artigos' },
          ]).map(item => (
            <button key={item.tab} onClick={() => { setActiveTab(item.tab); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === item.tab ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
              {item.badge ? <span className="ml-auto bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl mb-1">
            <Home className="w-5 h-5" /> Ver Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl">
            <LogOut className="w-5 h-5" /> Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ═══ MAIN ═══ */}
      <main className="flex-1 min-h-screen overflow-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="w-6 h-6 text-gray-600" /></button>
          <h1 className="text-xl font-bold text-gray-900">{activeTab === 'horarios' ? 'Horários Disponíveis' : activeTab === 'blog' ? 'Blog / Artigos' : 'Agendamentos'}</h1>
        </header>

        <div className="p-4 md:p-6 max-w-[1400px]">

          {/* ═══════════════════════════════════════════ */}
          {/* ═══ TAB: AGENDAMENTOS ═══ */}
          {/* ═══════════════════════════════════════════ */}
          {activeTab === 'agendamentos' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { n: todayCount, label: 'Hoje', icon: CalendarDays, color: 'primary' },
                  { n: pendingCount, label: 'Pendentes', icon: AlertCircle, color: 'yellow' },
                  { n: weekCount, label: 'Esta Semana', icon: Calendar, color: 'purple' },
                  { n: appointments.length, label: 'Total', icon: Users, color: 'green' },
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

              {/* ChatBot Notification Banner */}
              {chatbotPending.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center animate-bounce">
                      <Bell className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 text-sm">
                        🤖 {chatbotPending.length} agendamento{chatbotPending.length !== 1 ? 's' : ''} pelo ChatBot aguardando confirmação
                      </h3>
                      <p className="text-xs text-purple-600">Confirme manualmente após contato via WhatsApp com a paciente</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {chatbotPending.slice(0, 5).map(a => (
                      <div key={a.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-purple-100 shadow-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900">{a.paciente}</p>
                          <p className="text-xs text-gray-500">
                            📅 {formatDateBR(a.data)} às {a.horario} • {a.tipo}
                            {a.telefone && <span> • <Phone className="w-3 h-3 inline" /> {a.telefone}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                          <button onClick={() => confirmChatbotAppointment(a.id)}
                            className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmar
                          </button>
                          <button onClick={() => setAppointments(prev => prev.map(x => x.id === a.id ? { ...x, status: 'cancelado' } : x))}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors inline-flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Recusar
                          </button>
                        </div>
                      </div>
                    ))}
                    {chatbotPending.length > 5 && (
                      <p className="text-xs text-purple-500 text-center pt-1">+ {chatbotPending.length - 5} mais agendamentos pendentes</p>
                    )}
                  </div>
                </div>
              )}

              {/* Toolbar */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => { setShowForm(true); setEditingAppt(null); setFormData({ paciente: '', telefone: '', tipo: TIPOS[0], data: selectedDay, horario: '', observacoes: '' }); }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                  <Plus className="w-4 h-4" /> Nova Consulta
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
                    <option value="pendente">Pendentes</option>
                    <option value="confirmado">Confirmados</option>
                    <option value="realizado">Realizados</option>
                    <option value="cancelado">Cancelados</option>
                  </select>
                </div>
                <div className="flex bg-gray-100 rounded-xl p-0.5">
                  {(['month', 'week', 'day'] as CalendarView[]).map(v => (
                    <button key={v} onClick={() => setCalendarView(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${calendarView === v ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      {v === 'month' ? 'Mês' : v === 'week' ? 'Semana' : 'Dia'}
                    </button>
                  ))}
                </div>
              </div>

              {/* New/Edit Form */}
              {showForm && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{editingAppt ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
                    <button onClick={cancelForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Paciente *</label>
                      <input value={formData.paciente} onChange={e => setFormData({ ...formData, paciente: e.target.value })} placeholder="Nome completo" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Telefone</label>
                      <input value={formData.telefone} onChange={e => setFormData({ ...formData, telefone: e.target.value })} placeholder="(18) 99999-9999" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Tipo de Consulta *</label>
                      <select value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                        {TIPOS.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Data *</label>
                      <input type="date" value={formData.data} onChange={e => setFormData({ ...formData, data: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Horário *</label>
                      <select value={formData.horario} onChange={e => setFormData({ ...formData, horario: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                        <option value="">Selecione</option>
                        {HORARIOS.map(h => <option key={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Observações</label>
                      <input value={formData.observacoes} onChange={e => setFormData({ ...formData, observacoes: e.target.value })} placeholder="Observações" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={saveAppointment} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                      <Save className="w-4 h-4" /> {editingAppt ? 'Salvar Alterações' : 'Agendar'}
                    </button>
                    <button onClick={cancelForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-[1fr_380px] gap-6">
                {/* Calendar */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => navMonth(-1)} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                      <h3 className="font-bold text-gray-900 min-w-[180px] text-center">{MESES[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                      <button onClick={() => navMonth(1)} className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                    </div>
                    <button onClick={goToday} className="text-xs text-primary-600 font-medium hover:underline">Hoje</button>
                  </div>

                  <div className="p-4">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DIAS.map(d => <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>)}
                    </div>
                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, i) => {
                        const dayAppts = appointmentsForDate(day.date);
                        const isSelected = day.date === selectedDay;
                        return (
                          <button key={i} onClick={() => setSelectedDay(day.date)}
                            className={`relative p-1 min-h-[60px] rounded-xl text-left transition-all ${
                              !day.isCurrentMonth ? 'text-gray-300' :
                              isSelected ? 'bg-primary-50 border-2 border-primary-300' :
                              day.isToday ? 'bg-primary-50/50 border border-primary-200' :
                              'hover:bg-gray-50 border border-transparent'
                            }`}>
                            <span className={`text-xs font-medium ${day.isToday ? 'text-primary-600' : ''}`}>{day.day}</span>
                            {dayAppts.length > 0 && (
                              <div className="mt-0.5 flex flex-wrap gap-0.5">
                                {dayAppts.slice(0, 3).map(a => (
                                  <span key={a.id} className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[a.status].dot}`} />
                                ))}
                                {dayAppts.length > 3 && <span className="text-[9px] text-gray-400">+{dayAppts.length - 3}</span>}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Day Detail */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-purple-50">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-primary-500" />
                      {new Date(selectedDay + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{selectedDayAppts.length} consulta{selectedDayAppts.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                    {selectedDayAppts.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">Nenhuma consulta neste dia</p>
                        <button onClick={() => { setShowForm(true); setFormData(f => ({ ...f, data: selectedDay })); }}
                          className="mt-3 text-xs text-primary-600 font-medium hover:underline">+ Agendar</button>
                      </div>
                    ) : (
                      selectedDayAppts.sort((a, b) => a.horario.localeCompare(b.horario)).map(a => {
                        const sc = STATUS_CONFIG[a.status];
                        return (
                          <div key={a.id} className={`p-3 rounded-xl border ${sc.bg} group`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{a.horario} — {a.paciente}</p>
                                <p className="text-xs opacity-70 mt-0.5">{a.tipo}</p>
                                {a.telefone && <p className="text-xs opacity-70 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{a.telefone}</p>}
                                {a.origem && <span className={`inline-block text-[9px] mt-1 px-1.5 py-0.5 rounded font-medium ${a.origem === 'chatbot' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>{a.origem === 'chatbot' ? '🤖 ChatBot' : '✍️ Manual'}</span>}
                                {a.observacoes && <p className="text-xs opacity-60 mt-1 italic">{a.observacoes}</p>}
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEdit(a)} className="p-1 hover:bg-white/50 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setAppointments(prev => prev.filter(x => x.id !== a.id))} className="p-1 hover:bg-white/50 rounded text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                            <div className="mt-2 flex gap-1">
                              {(['pendente', 'confirmado', 'realizado', 'cancelado'] as const).map(st => (
                                <button key={st} onClick={() => setAppointments(prev => prev.map(x => x.id === a.id ? { ...x, status: st } : x))}
                                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${a.status === st ? STATUS_CONFIG[st].bg + ' font-semibold' : 'bg-white/50 text-gray-500 border-gray-200 hover:bg-white'}`}>
                                  {STATUS_CONFIG[st].label}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Full List */}
              {filteredAppointments.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">Lista Completa ({filteredAppointments.length})</h3>
                  </div>
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
                        {filteredAppointments.map(a => (
                          <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">{a.paciente}</p>
                              <p className="text-xs text-gray-400">{a.telefone}</p>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{a.tipo}</td>
                            <td className="px-4 py-3 text-gray-600">{formatDateBR(a.data)}</td>
                            <td className="px-4 py-3 text-gray-600">{a.horario}</td>
                            <td className="px-4 py-3">
                              <select value={a.status} onChange={e => setAppointments(prev => prev.map(x => x.id === a.id ? { ...x, status: e.target.value as Appointment['status'] } : x))}
                                className={`text-xs px-2 py-1 rounded-lg border font-medium ${STATUS_CONFIG[a.status].bg}`}>
                                <option value="pendente">Pendente</option>
                                <option value="confirmado">Confirmado</option>
                                <option value="realizado">Realizado</option>
                                <option value="cancelado">Cancelado</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 flex gap-1">
                              <button onClick={() => startEdit(a)} className="p-1 text-gray-400 hover:text-primary-600"><Edit3 className="w-4 h-4" /></button>
                              <button onClick={() => setAppointments(prev => prev.filter(x => x.id !== a.id))} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* ═══ TAB: HORÁRIOS ═══ */}
          {/* ═══════════════════════════════════════════ */}
          {activeTab === 'horarios' && (
            <>
              {/* Week Navigator */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => navHorarioWeek(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                    <h3 className="font-bold text-gray-900 min-w-[260px] text-center">
                      {horarioWeekDays[0].toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} — {horarioWeekDays[5].toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </h3>
                    <button onClick={() => navHorarioWeek(1)} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                  </div>
                  <button onClick={goThisWeek} className="text-xs text-primary-600 font-medium hover:underline px-3 py-1.5 bg-primary-50 rounded-lg">Esta Semana</button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-2xl font-bold text-primary-600">{weekApptCount}</p>
                  <p className="text-xs text-gray-500">Agendados na Semana</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-2xl font-bold text-green-600">{weekAvailableCount}</p>
                  <p className="text-xs text-gray-500">Horários Livres</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-2xl font-bold text-purple-600">{weekOccupancyRate}%</p>
                  <p className="text-xs text-gray-500">Taxa de Ocupação</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <p className="text-2xl font-bold text-yellow-600">{chatbotPending.length}</p>
                  <p className="text-xs text-gray-500">Pendentes ChatBot</p>
                </div>
              </div>

              {/* Schedule Grid */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-3 text-xs font-medium text-gray-500 w-20 sticky left-0 bg-gray-50 z-10 border-r border-gray-100">Horário</th>
                        {horarioWeekDays.map((day, i) => {
                          const isToday = toISO(day) === toISO(new Date());
                          const dayApptCount = appointments.filter(a => a.data === toISO(day)).length;
                          return (
                            <th key={i} className={`px-2 py-3 text-center min-w-[120px] ${isToday ? 'bg-primary-50' : ''}`}>
                              <div className={`text-xs font-medium ${isToday ? 'text-primary-700' : 'text-gray-500'}`}>{getDayShort(day)}</div>
                              <div className={`text-lg font-bold ${isToday ? 'text-primary-700' : 'text-gray-900'}`}>{day.getDate()}</div>
                              {dayApptCount > 0 && <div className="text-[10px] text-gray-400">{dayApptCount} consulta{dayApptCount !== 1 ? 's' : ''}</div>}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {HORARIOS.map((hora, hi) => (
                        <tr key={hora} className={hi % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                          <td className={`px-3 py-1 text-xs font-medium text-gray-500 sticky left-0 z-10 border-r border-gray-100 ${hi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            {hora}
                          </td>
                          {horarioWeekDays.map((day, di) => {
                            const dateStr = toISO(day);
                            const dayName = getDayNameFromDate(day);
                            const enabled = isSlotEnabled(dayName, hora);
                            const appt = getSlotAppointment(dateStr, hora);
                            const isToday = dateStr === toISO(new Date());

                            if (!dayName) {
                              return <td key={di} className="p-0.5 bg-gray-50 text-center"><span className="text-[10px] text-gray-200">—</span></td>;
                            }

                            if (!enabled) {
                              return (
                                <td key={di} className={`p-0.5 ${isToday ? 'bg-primary-50/30' : 'bg-gray-50'}`}>
                                  <div className="w-full p-1.5 rounded text-center text-[10px] text-gray-300">—</div>
                                </td>
                              );
                            }

                            if (appt) {
                              const sc = STATUS_CONFIG[appt.status];
                              return (
                                <td key={di} className={`p-0.5 ${isToday ? 'bg-primary-50/30' : ''}`}>
                                  <button
                                    onClick={() => setSlotDetail({ date: dateStr, horario: hora, appointment: appt })}
                                    className={`w-full p-1.5 rounded-lg text-[10px] ${sc.bg} cursor-pointer hover:shadow-md transition-all text-left`}
                                  >
                                    <div className="font-semibold truncate">{appt.paciente.split(' ')[0]}</div>
                                    <div className="opacity-70 truncate">{appt.tipo.split(' ').slice(0, 2).join(' ')}</div>
                                    {appt.origem === 'chatbot' && <span className="inline-block mt-0.5 text-[8px] bg-purple-200 text-purple-700 px-1 rounded">🤖</span>}
                                  </button>
                                </td>
                              );
                            }

                            return (
                              <td key={di} className={`p-0.5 ${isToday ? 'bg-primary-50/30' : ''}`}>
                                <button
                                  onClick={() => setSlotDetail({ date: dateStr, horario: hora })}
                                  className="w-full p-1.5 rounded-lg bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-700 text-[10px] font-medium transition-all cursor-pointer"
                                >
                                  Livre
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100 border border-green-200" /> Disponível</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200" /> Pendente</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100 border border-green-300" /> Confirmado</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-200" /> Realizado</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Cancelado</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-50 border border-gray-200" /> Desativado</span>
              </div>

              {/* Slot Detail Modal */}
              {slotDetail && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setSlotDetail(null); setQuickBookData({ paciente: '', telefone: '', tipo: TIPOS[0], observacoes: '' }); }}>
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                    {slotDetail.appointment ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-900">Detalhes do Agendamento</h3>
                          <button onClick={() => setSlotDetail(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-500">Paciente</p>
                            <p className="font-medium text-gray-900">{slotDetail.appointment.paciente}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl">
                              <p className="text-xs text-gray-500">Data</p>
                              <p className="font-medium text-gray-900">{formatDateBR(slotDetail.date)}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                              <p className="text-xs text-gray-500">Horário</p>
                              <p className="font-medium text-gray-900">{slotDetail.horario}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-500">Tipo</p>
                            <p className="font-medium text-gray-900">{slotDetail.appointment.tipo}</p>
                          </div>
                          {slotDetail.appointment.telefone && (
                            <div className="p-3 bg-gray-50 rounded-xl">
                              <p className="text-xs text-gray-500">Telefone</p>
                              <p className="font-medium text-gray-900 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {slotDetail.appointment.telefone}</p>
                            </div>
                          )}
                          <div className="p-3 bg-gray-50 rounded-xl">
                            <p className="text-xs text-gray-500 mb-1">Origem</p>
                            <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium ${slotDetail.appointment.origem === 'chatbot' ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'}`}>
                              {slotDetail.appointment.origem === 'chatbot' ? '🤖 ChatBot' : '✍️ Manual'}
                            </span>
                          </div>
                          {slotDetail.appointment.observacoes && (
                            <div className="p-3 bg-gray-50 rounded-xl">
                              <p className="text-xs text-gray-500">Observações</p>
                              <p className="text-sm text-gray-700 italic">{slotDetail.appointment.observacoes}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-500 mb-2">Alterar Status</p>
                            <div className="flex flex-wrap gap-1.5">
                              {(['pendente', 'confirmado', 'realizado', 'cancelado'] as const).map(st => (
                                <button key={st}
                                  onClick={() => {
                                    setAppointments(prev => prev.map(x => x.id === slotDetail.appointment!.id ? { ...x, status: st } : x));
                                    setSlotDetail(prev => prev ? { ...prev, appointment: { ...prev.appointment!, status: st } } : null);
                                  }}
                                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${slotDetail.appointment!.status === st ? STATUS_CONFIG[st].bg + ' ring-2 ring-offset-1' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                                >
                                  {STATUS_CONFIG[st].label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button onClick={() => { startEdit(slotDetail.appointment!); setSlotDetail(null); setActiveTab('agendamentos'); }}
                              className="flex-1 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 inline-flex items-center justify-center gap-2">
                              <Edit3 className="w-4 h-4" /> Editar
                            </button>
                            <button onClick={() => { setAppointments(prev => prev.filter(x => x.id !== slotDetail.appointment!.id)); setSlotDetail(null); }}
                              className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-xl hover:bg-red-100 inline-flex items-center gap-2">
                              <Trash2 className="w-4 h-4" /> Excluir
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-gray-900">Agendar Horário</h3>
                          <button onClick={() => { setSlotDetail(null); setQuickBookData({ paciente: '', telefone: '', tipo: TIPOS[0], observacoes: '' }); }} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-400" /></button>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl mb-4">
                          <p className="text-sm text-green-700 font-medium">📅 {formatDateBR(slotDetail.date)} às {slotDetail.horario}</p>
                          <p className="text-xs text-green-600">Horário disponível para agendamento</p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Paciente *</label>
                            <input value={quickBookData.paciente} onChange={e => setQuickBookData({ ...quickBookData, paciente: e.target.value })}
                              placeholder="Nome completo" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Telefone</label>
                            <input value={quickBookData.telefone} onChange={e => setQuickBookData({ ...quickBookData, telefone: e.target.value })}
                              placeholder="(18) 99999-9999" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Tipo de Consulta</label>
                            <select value={quickBookData.tipo} onChange={e => setQuickBookData({ ...quickBookData, tipo: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                              {TIPOS.map(t => <option key={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1 block">Observações</label>
                            <input value={quickBookData.observacoes} onChange={e => setQuickBookData({ ...quickBookData, observacoes: e.target.value })}
                              placeholder="Observações (opcional)" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                          </div>
                          <button onClick={() => bookFromHorarios(slotDetail.date, slotDetail.horario)}
                            disabled={!quickBookData.paciente}
                            className="w-full px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" /> Agendar Consulta
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* General Availability Settings (collapsible) */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setShowGeneralSettings(!showGeneralSettings)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900 text-sm">⚙️ Configurações de Disponibilidade Geral</h3>
                      <p className="text-xs text-gray-500">Defina quais horários ficam disponíveis em cada dia da semana</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showGeneralSettings ? 'rotate-90' : ''}`} />
                </button>
                {showGeneralSettings && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => setSlots(prev => prev.map(s => ({ ...s, ativo: true })))}
                        className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium border border-green-200">
                        ✓ Ativar Todos
                      </button>
                      <button onClick={() => setSlots(prev => prev.map(s => ({ ...s, ativo: false })))}
                        className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium border border-red-200">
                        ✗ Desativar Todos
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {DIAS_SEMANA_FULL.map(dia => {
                        const diaSlots = slots.filter(s => s.dia === dia);
                        const activeCount = diaSlots.filter(s => s.ativo).length;
                        const morning = diaSlots.filter(s => parseInt(s.horario) < 12);
                        const afternoon = diaSlots.filter(s => parseInt(s.horario) >= 12);
                        const allActive = diaSlots.every(s => s.ativo);
                        return (
                          <div key={dia} className="p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-gray-900 text-sm">{dia}</h4>
                              <button onClick={() => setSlots(prev => prev.map(s => s.dia === dia ? { ...s, ativo: !allActive } : s))}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${allActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                                {allActive ? 'Desativar' : 'Ativar'}
                              </button>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{activeCount}/{diaSlots.length} ativos</p>
                            {morning.length > 0 && (
                              <div className="mb-2">
                                <p className="text-[10px] text-gray-500 font-medium mb-1 uppercase tracking-wider">☀️ Manhã</p>
                                <div className="grid grid-cols-3 gap-1">
                                  {morning.map(slot => (
                                    <button key={slot.id} onClick={() => setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, ativo: !s.ativo } : s))}
                                      className={`px-1.5 py-1 rounded text-xs font-medium transition-all ${slot.ativo ? 'bg-primary-100 text-primary-700 border border-primary-200' : 'bg-gray-50 text-gray-400 line-through border border-gray-100'}`}>
                                      {slot.horario}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {afternoon.length > 0 && (
                              <div>
                                <p className="text-[10px] text-gray-500 font-medium mb-1 uppercase tracking-wider">🌙 Tarde</p>
                                <div className="grid grid-cols-3 gap-1">
                                  {afternoon.map(slot => (
                                    <button key={slot.id} onClick={() => setSlots(prev => prev.map(s => s.id === slot.id ? { ...s, ativo: !s.ativo } : s))}
                                      className={`px-1.5 py-1 rounded text-xs font-medium transition-all ${slot.ativo ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-gray-50 text-gray-400 line-through border border-gray-100'}`}>
                                      {slot.horario}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                <p className="text-sm text-primary-700 leading-relaxed">
                  💡 <strong>Mapa de Horários:</strong> Esta visualização mostra todos os horários da semana selecionada. Clique em um horário <span className="text-green-600 font-medium">livre</span> para agendar uma consulta diretamente, ou em um horário <span className="text-red-600 font-medium">ocupado</span> para ver detalhes, editar ou alterar o status. As configurações de disponibilidade geral (acima) definem quais horários ficam disponíveis para o ChatBot e agendamento online.
                </p>
              </div>
            </>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* ═══ TAB: BLOG ═══ */}
          {/* ═══════════════════════════════════════════ */}
          {activeTab === 'blog' && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => { resetArticleForm(); setShowArticleForm(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                  <Plus className="w-4 h-4" /> Novo Artigo
                </button>
                <p className="text-sm text-gray-500 flex items-center">{blogArticles.length} artigo{blogArticles.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Article Form */}
              {showArticleForm && (
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">{editingArticle ? 'Editar Artigo' : 'Novo Artigo'}</h3>
                    <button onClick={resetArticleForm}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Título *</label>
                      <input value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value, slug: e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })}
                        placeholder="Título do artigo" className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Slug (URL)</label>
                      <input value={articleForm.slug} onChange={e => setArticleForm({ ...articleForm, slug: e.target.value })} placeholder="url-do-artigo"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 font-mono text-xs" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Categoria</label>
                      <select value={articleForm.category} onChange={e => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300">
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Tempo de Leitura</label>
                      <input value={articleForm.readTime} onChange={e => setArticleForm({ ...articleForm, readTime: e.target.value })} placeholder="5 min"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1"><Video className="w-3.5 h-3.5" /> URL do Vídeo (Instagram/YouTube)</label>
                      <input value={articleForm.videoUrl} onChange={e => setArticleForm({ ...articleForm, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/embed/... ou https://www.instagram.com/reel/..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-500 mb-1 block">Conteúdo (separe parágrafos com linha em branco, use ## para títulos, - para listas)</label>
                      <textarea value={articleForm.content} onChange={e => setArticleForm({ ...articleForm, content: e.target.value })}
                        placeholder={"Primeiro parágrafo do artigo...\n\n## Subtítulo\n\nSegundo parágrafo...\n\n- Item 1\n- Item 2"}
                        rows={12}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 font-mono leading-relaxed resize-y" />
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={articleForm.published} onChange={e => setArticleForm({ ...articleForm, published: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-300" />
                        <span className="text-sm text-gray-700">Publicado</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveArticle} className="px-5 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 inline-flex items-center gap-2">
                      <Save className="w-4 h-4" /> {editingArticle ? 'Salvar Alterações' : 'Criar Artigo'}
                    </button>
                    <button onClick={resetArticleForm} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">Cancelar</button>
                  </div>
                </div>
              )}

              {/* Articles List */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                  {blogArticles.map(a => (
                    <div key={a.id} className="p-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{a.title}</h4>
                          {a.videoUrl && <Video className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" aria-label="Com vídeo" />}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="text-primary-600 bg-primary-50 px-2 py-0.5 rounded font-medium">{a.category}</span>
                          <span>{a.date}</span>
                          <span>{a.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => togglePublished(a.id)} title={a.published ? 'Despublicar' : 'Publicar'}
                          className={`p-1.5 rounded-lg transition-colors ${a.published ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'}`}>
                          {a.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button onClick={() => editArticle(a)} className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteArticle(a.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
                <p className="text-sm text-primary-700 leading-relaxed">
                  💡 <strong>Dica sobre vídeos:</strong> Cole a URL completa do vídeo — funciona com YouTube (qualquer formato de link) e Instagram Reels.
                  O vídeo aparecerá automaticamente na página do artigo com um player integrado. Exemplos aceitos:
                </p>
                <ul className="text-xs text-primary-600 mt-2 space-y-1 ml-4">
                  <li>• <code className="bg-primary-100 px-1 rounded">https://www.youtube.com/watch?v=VIDEO_ID</code></li>
                  <li>• <code className="bg-primary-100 px-1 rounded">https://youtu.be/VIDEO_ID</code></li>
                  <li>• <code className="bg-primary-100 px-1 rounded">https://www.instagram.com/reel/CODE/</code></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

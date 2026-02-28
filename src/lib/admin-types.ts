/* ═══════════════════════════════════════════════════════════
   TYPES & CONSTANTS — Sistema de Gestão de Pacientes
   Dra. Andresa Martin Louzada
   ═══════════════════════════════════════════════════════════ */

export interface Patient {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  cidade: string;
  tipoSanguineo: string;
  alergias: string;
  historicoMedico: string;
  medicamentosEmUso: string;
  antecedentesGineco: string;
  convenio: string;
  numConvenio: string;
  observacoes: string;
  statusSaude: 'estavel' | 'atencao' | 'acompanhamento' | 'gestante';
  profissao: string;
  estadoCivil: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface Consultation {
  id: string;
  pacienteId: string;
  data: string;
  horario: string;
  tipo: string;
  queixaPrincipal: string;
  hda: string;
  exameFisico: string;
  hipoteseDiagnostica: string;
  conduta: string;
  prescricao: string;
  examesSolicitados: string;
  observacoes: string;
  retorno: string;
  pesoKg: string;
  alturaM: string;
  pressaoArterial: string;
  temperatura: string;
  idadeGestacional: string;
  alturaUterina: string;
  bcf: string;
  movimentosFetais: string;
  cid10: string;
  encaminhamento: string;
  criadoEm: string;
}

export interface ExamRecord {
  id: string;
  pacienteId: string;
  consultaId: string;
  nome: string;
  tipo: string;
  dataSolicitacao: string;
  dataResultado: string;
  resultado: string;
  status: 'solicitado' | 'agendado' | 'realizado' | 'laudo_disponivel';
  arquivoNome: string;
  arquivoBase64: string;
  arquivoTipo: string;
  observacoes: string;
  indicacaoClinica: string;
  cid10: string;
  urgencia: 'rotina' | 'urgente';
  laboratorio: string;
  medicoSolicitante: string;
  crm: string;
  preparoEspecial: string;
  criadoEm: string;
}

export interface Payment {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  consultaId: string;
  data: string;
  descricao: string;
  valor: number;
  desconto: number;
  valorFinal: number;
  formaPagamento: string;
  status: 'pendente' | 'pago' | 'parcial' | 'cancelado' | 'estornado';
  convenio: string;
  coberturaPercentual: number;
  valorConvenio: number;
  valorParticular: number;
  parcelas: number;
  observacoes: string;
  dataVencimento: string;
  notaFiscal: string;
  criadoEm: string;
}

/* ═══ CONSTANTS ═══ */
export const TIPOS_CONSULTA = [
  'Consulta Ginecológica', 'Pré-natal', 'Menopausa',
  'Ginecologia Regenerativa', 'Microscopia Vaginal', 'Retorno', 'Primeira Consulta',
];

export const TIPOS_EXAME = [
  'Papanicolau', 'Colposcopia', 'Ultrassonografia Pélvica', 'Ultrassonografia Transvaginal',
  'Ultrassonografia Obstétrica', 'Ultrassonografia Morfológica', 'Mamografia',
  'Ultrassonografia Mamária', 'Densitometria Óssea', 'Hemograma Completo',
  'Glicemia', 'TSH / T4 Livre', 'Perfil Hormonal', 'Sorologias',
  'Beta HCG', 'Urina / Urocultura', 'Microscopia Vaginal', 'Biópsia', 'Outro',
];

export const STATUS_SAUDE_CONFIG: Record<string, { label: string; bg: string; dot: string }> = {
  estavel: { label: 'Estável', bg: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  atencao: { label: 'Atenção', bg: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
  acompanhamento: { label: 'Acompanhamento', bg: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  gestante: { label: 'Gestante', bg: 'bg-purple-100 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
};

export const STATUS_EXAME_CONFIG: Record<string, { label: string; bg: string }> = {
  solicitado: { label: 'Solicitado', bg: 'bg-yellow-100 text-yellow-700' },
  agendado: { label: 'Agendado', bg: 'bg-blue-100 text-blue-700' },
  realizado: { label: 'Realizado', bg: 'bg-green-100 text-green-700' },
  laudo_disponivel: { label: 'Laudo Disponível', bg: 'bg-purple-100 text-purple-700' },
};

export const STATUS_PAGAMENTO_CONFIG: Record<string, { label: string; bg: string }> = {
  pendente: { label: 'Pendente', bg: 'bg-yellow-100 text-yellow-700' },
  pago: { label: 'Pago', bg: 'bg-green-100 text-green-700' },
  parcial: { label: 'Parcial', bg: 'bg-blue-100 text-blue-700' },
  cancelado: { label: 'Cancelado', bg: 'bg-red-100 text-red-700' },
  estornado: { label: 'Estornado', bg: 'bg-gray-100 text-gray-700' },
};

export const FORMAS_PAGAMENTO: Record<string, string> = {
  dinheiro: 'Dinheiro', pix: 'PIX', cartao_credito: 'Cartão de Crédito',
  cartao_debito: 'Cartão de Débito', convenio: 'Convênio', transferencia: 'Transferência',
};

export const CONVENIOS = [
  'Particular', 'Unimed', 'Amil', 'SulAmérica', 'Bradesco Saúde',
  'Notre Dame Intermédica', 'Hapvida', 'São Francisco', 'Outro',
];

export const TIPOS_SANGUINEO = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Não informado'];

export const VALORES_CONSULTA: Record<string, number> = {
  'Consulta Ginecológica': 350, 'Pré-natal': 300, 'Menopausa': 350,
  'Ginecologia Regenerativa': 500, 'Microscopia Vaginal': 350,
  'Retorno': 200, 'Primeira Consulta': 400,
};

export const ESTADOS_CIVIS = ['Solteira', 'Casada', 'Divorciada', 'Viúva', 'União Estável', 'Não informado'];

export const MEDICO_CONFIG = {
  nome: 'Dra. Andresa Martin Louzada',
  crm: 'CRM/SP',
  especialidade: 'Ginecologia e Obstetrícia',
};

export const CIDS_COMUNS: Record<string, string> = {
  'Z34': 'Supervisão de gravidez normal',
  'Z36': 'Rastreamento pré-natal',
  'N76': 'Inflamações da vagina/vulva',
  'N91': 'Amenorreia',
  'N92': 'Menstruação excessiva/irregular',
  'N94': 'Dor pélvica',
  'N95': 'Distúrbios da menopausa',
  'N87': 'Displasia do colo do útero',
  'N80': 'Endometriose',
  'D25': 'Mioma uterino',
  'E28': 'Disfunção ovariana',
  'Z30': 'Anticoncepção',
  'Z01.4': 'Exame ginecológico de rotina',
  'N77': 'Candidíase vulvovaginal',
  'R10': 'Dor abdominal e pélvica',
  'O80': 'Parto espontâneo',
  'N73': 'Doença inflamatória pélvica',
  'N84': 'Pólipo do trato genital',
  'N83': 'Cistos ovarianos',
  'B37': 'Candidíase',
};

export const PREPARO_EXAME: Record<string, string> = {
  'Papanicolau': 'Não estar menstruada. Evitar relação sexual 48h antes. Não usar duchas ou cremes vaginais 48h antes.',
  'Colposcopia': 'Não estar menstruada. Evitar relação sexual 48h antes.',
  'Ultrassonografia Pélvica': 'Bexiga cheia — beber 4-6 copos de água 1h antes do exame.',
  'Ultrassonografia Transvaginal': 'Bexiga vazia.',
  'Ultrassonografia Obstétrica': 'Sem preparo especial.',
  'Ultrassonografia Morfológica': 'Sem preparo especial. Realizar entre 20-24 semanas.',
  'Mamografia': 'Não aplicar desodorante, talco ou cremes na região das axilas e mamas.',
  'Ultrassonografia Mamária': 'Sem preparo especial.',
  'Densitometria Óssea': 'Sem preparo especial. Evitar suplemento de cálcio 24h antes.',
  'Hemograma Completo': 'Jejum de 8-12 horas.',
  'Glicemia': 'Jejum de 8-12 horas.',
  'TSH / T4 Livre': 'Sem preparo especial. Informar medicamentos em uso.',
  'Perfil Hormonal': 'Colher preferencialmente entre 2º e 5º dia do ciclo. Jejum de 4h.',
  'Sorologias': 'Jejum de 4-8 horas.',
  'Beta HCG': 'Sem preparo especial.',
  'Urina / Urocultura': 'Primeira urina da manhã ou 4h sem urinar. Colher jato médio.',
  'Microscopia Vaginal': 'Não estar menstruada. Evitar relação 48h antes.',
  'Biópsia': 'Consultar orientações específicas com a médica.',
};

/* ═══ HELPERS ═══ */
export function calcularIdade(dataNascimento: string): number {
  if (!dataNascimento) return 0;
  const hoje = new Date();
  const nasc = new Date(dataNascimento + 'T12:00');
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

export function calcularIMC(pesoKg: string, alturaM: string): string {
  const peso = parseFloat(pesoKg);
  const altura = parseFloat(alturaM);
  if (!peso || !altura || altura === 0) return '-';
  return (peso / (altura * altura)).toFixed(1);
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDateBR(d: string): string {
  if (!d) return '-';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export function toISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const LS_KEYS = {
  patients: 'dra_patients',
  consultations: 'dra_consultations',
  exams: 'dra_exams',
  payments: 'dra_payments',
  appointments: 'dra_appointments',
};

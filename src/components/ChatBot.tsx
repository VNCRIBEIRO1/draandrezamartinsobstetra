'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Heart, Baby, Stethoscope,
  Flower2, Microscope, Sparkles, Calendar, Clock,
  ChevronRight, ArrowLeft, Bot, User
} from 'lucide-react';

/* ─────────────────── Types ─────────────────── */
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: Option[];
  timestamp: Date;
}

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

type FlowStep = {
  message: string;
  options?: Option[];
  input?: boolean;
  next?: (value: string) => string;
};

/* ─────────────────── Flow Data ─────────────────── */
const WELCOME_OPTIONS: Option[] = [
  { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
  { label: 'Áreas de Atuação', value: 'areas', icon: <Heart className="w-4 h-4" /> },
  { label: 'Dúvidas sobre Saúde', value: 'duvidas', icon: <Stethoscope className="w-4 h-4" /> },
  { label: 'Localização e Horário', value: 'localizacao', icon: <Clock className="w-4 h-4" /> },
];

const AREA_OPTIONS: Option[] = [
  { label: 'Ginecologia', value: 'ginecologia', icon: <Heart className="w-4 h-4" /> },
  { label: 'Obstetrícia / Pré-natal', value: 'obstetricia', icon: <Baby className="w-4 h-4" /> },
  { label: 'Menopausa', value: 'menopausa', icon: <Flower2 className="w-4 h-4" /> },
  { label: 'Ginecologia Regenerativa', value: 'regenerativa', icon: <Sparkles className="w-4 h-4" /> },
  { label: 'Microscopia Vaginal', value: 'microscopia', icon: <Microscope className="w-4 h-4" /> },
  { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
];

const DUVIDA_OPTIONS: Option[] = [
  { label: 'Quando ir ao ginecologista?', value: 'duvida_quando' },
  { label: 'Pré-natal: quando iniciar?', value: 'duvida_prenatal' },
  { label: 'O que é microscopia vaginal?', value: 'duvida_microscopia' },
  { label: 'Menopausa: sintomas comuns', value: 'duvida_menopausa' },
  { label: 'Métodos contraceptivos', value: 'duvida_contraceptivos' },
  { label: 'Ginecologia regenerativa', value: 'duvida_regenerativa' },
  { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
];

const CONSULTA_TIPO_OPTIONS: Option[] = [
  { label: 'Consulta Ginecológica', value: 'tipo_gineco' },
  { label: 'Pré-natal', value: 'tipo_prenatal' },
  { label: 'Menopausa', value: 'tipo_menopausa' },
  { label: 'Ginecologia Regenerativa', value: 'tipo_regenerativa' },
  { label: 'Microscopia Vaginal', value: 'tipo_microscopia' },
  { label: 'Primeira Consulta', value: 'tipo_primeira' },
  { label: 'Voltar', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
];

/* ─────────────────── Response Data ─────────────────── */
const AREA_DETAILS: Record<string, string> = {
  ginecologia: `💗 **Ginecologia**\n\nA Dra. Andresa oferece acompanhamento ginecológico completo:\n\n• Consulta de rotina e check-up\n• Papanicolau e colposcopia\n• Infecções e corrimentos\n• Endometriose e miomas\n• Planejamento reprodutivo\n• Métodos contraceptivos\n\nO acompanhamento ginecológico regular é essencial para a saúde da mulher em todas as fases da vida.`,
  obstetricia: `🤰 **Obstetrícia e Pré-natal**\n\nAcompanhamento humanizado da gestação:\n\n• Pré-natal completo e individualizado\n• Ultrassonografias de rotina\n• Gestação de alto risco\n• Orientação sobre parto humanizado\n• Acompanhamento pós-parto\n• Orientações sobre amamentação\n\nCada gestação é única e merece atenção especial. A Dra. Andresa acompanha você em cada etapa!`,
  menopausa: `🌸 **Menopausa**\n\nTratamento personalizado para essa fase:\n\n• Reposição hormonal bioidêntica\n• Tratamento de fogachos e sudorese\n• Saúde óssea (prevenção de osteoporose)\n• Saúde cardiovascular\n• Controle de peso\n• Sexualidade na menopausa\n\nA menopausa é uma fase natural — com acompanhamento adequado, é possível viver com qualidade de vida!`,
  regenerativa: `✨ **Ginecologia Regenerativa**\n\nProcedimentos inovadores:\n\n• Laser íntimo\n• Bioestimuladores de colágeno\n• Ácido hialurônico íntimo\n• Rejuvenescimento vulvovaginal\n• Tratamento de incontinência leve\n• Síndrome geniturinária da menopausa\n\nTecnologias de ponta para restauração e rejuvenescimento íntimo.`,
  microscopia: `🔬 **Microscopia Vaginal**\n\nDiferencial da Dra. Andresa:\n\n• Diagnóstico imediato na consulta\n• Análise microscópica do conteúdo vaginal\n• Identificação precisa: candidíase, vaginose, tricomoníase\n• Tratamento iniciado no mesmo dia\n• Sem custo adicional de laboratório\n\n✅ Resultado na hora! Sem precisar esperar dias por exames laboratoriais.`,
};

const DUVIDA_RESPOSTAS: Record<string, string> = {
  duvida_quando: `🩺 **Quando ir ao ginecologista?**\n\nA consulta ginecológica deve ser feita:\n\n• A partir da primeira menstruação (menarca)\n• Anualmente para exames de rotina (Papanicolau)\n• Sempre que houver sintomas: corrimento, dor, irregularidade menstrual\n• Antes de iniciar métodos contraceptivos\n• No planejamento de uma gestação\n• Na menopausa\n\n💡 Dica: Não espere sintomas! A prevenção é o melhor cuidado.`,
  duvida_prenatal: `🤰 **Quando iniciar o pré-natal?**\n\nO ideal é iniciar o pré-natal assim que descobrir a gestação:\n\n• Idealmente até a 12ª semana\n• Consultas mensais até 28 semanas\n• Quinzenais de 28 a 36 semanas\n• Semanais a partir de 36 semanas\n\nExames importantes no 1º trimestre: hemograma, tipagem sanguínea, sorologias, ultrassom morfológico.\n\n💗 O pré-natal humanizado da Dra. Andresa acompanha cada detalhe!`,
  duvida_microscopia: `🔬 **O que é Microscopia Vaginal?**\n\nÉ um exame realizado durante a consulta onde o conteúdo vaginal é analisado em microscópio.\n\n✅ Vantagens:\n• Resultado imediato (na hora!)\n• Diagnóstico preciso de infecções\n• Tratamento iniciado no mesmo dia\n• Sem custos adicionais de laboratório\n\nA microscopia identifica: candidíase, vaginose bacteriana, tricomoníase e outros agentes.\n\n🏥 Este é um dos diferenciais da Dra. Andresa!`,
  duvida_menopausa: `🌸 **Sintomas comuns da menopausa:**\n\n• Fogachos (ondas de calor)\n• Suores noturnos\n• Insônia e irritabilidade\n• Secura vaginal\n• Diminuição da libido\n• Alterações de humor\n• Ganho de peso\n• Dores articulares\n\n💡 A reposição hormonal pode aliviar significativamente esses sintomas. Converse com a Dra. Andresa sobre as opções de tratamento!`,
  duvida_contraceptivos: `💊 **Métodos Contraceptivos**\n\nA Dra. Andresa orienta sobre todas as opções:\n\n• Pílulas anticoncepcionais\n• DIU de cobre e hormonal (Mirena/Kyleena)\n• Implante subdérmico\n• Anel vaginal\n• Adesivo anticoncepcional\n• Injeção anticoncepcional\n• Preservativos\n\n⚠️ O melhor método é aquele adequado ao seu perfil e momento de vida. Agende uma consulta para orientação personalizada!`,
  duvida_regenerativa: `✨ **Ginecologia Regenerativa**\n\nÉ uma área da ginecologia que utiliza tecnologias avançadas para:\n\n• Melhorar a lubrificação vaginal\n• Tratar incontinência urinária leve\n• Rejuvenescer a região íntima\n• Melhorar a satisfação sexual\n• Tratar a síndrome geniturinária da menopausa\n\nProcedimentos disponíveis: laser íntimo, bioestimuladores de colágeno e ácido hialurônico.\n\n🩺 Agende uma avaliação com a Dra. Andresa!`,
};

/* ─────────────────── Component ─────────────────── */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectingData, setCollectingData] = useState<{
    step: 'nome' | 'telefone' | 'tipo' | null;
    nome?: string;
    telefone?: string;
    tipo?: string;
  }>({ step: null });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((text: string, sender: 'bot' | 'user', options?: Option[]) => {
    const msg: Message = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      text,
      sender,
      options,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const simulateTyping = useCallback(async (text: string, options?: Option[]) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
    setIsTyping(false);
    addMessage(text, 'bot', options);
  }, [addMessage]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          '🌸 Olá! Eu sou a assistente virtual da Dra. Andresa Martin Louzada, Ginecologista e Obstetra.\n\nComo posso ajudar você hoje?',
          'bot',
          WELCOME_OPTIONS
        );
      }, 300);
    }
  }, [messages.length, addMessage]);

  const buildWhatsAppLink = (tipo?: string, nome?: string) => {
    const tipoLabels: Record<string, string> = {
      tipo_gineco: 'Consulta Ginecológica',
      tipo_prenatal: 'Pré-natal',
      tipo_menopausa: 'Menopausa',
      tipo_regenerativa: 'Ginecologia Regenerativa',
      tipo_microscopia: 'Microscopia Vaginal',
      tipo_primeira: 'Primeira Consulta',
    };
    const tipoText = tipo && tipoLabels[tipo] ? tipoLabels[tipo] : 'consulta';
    const nomeText = nome ? ` Meu nome é ${nome}.` : '';
    const msg = encodeURIComponent(`Olá! Gostaria de agendar uma ${tipoText}.${nomeText} Entrei em contato pelo site.`);
    return `https://wa.me/5518998207964?text=${msg}`;
  };

  const handleOption = useCallback(async (value: string) => {
    // Find the label for the option
    const allOptions = [...WELCOME_OPTIONS, ...AREA_OPTIONS, ...DUVIDA_OPTIONS, ...CONSULTA_TIPO_OPTIONS];
    const opt = allOptions.find((o) => o.value === value);
    if (opt) addMessage(opt.label, 'user');

    switch (value) {
      case 'inicio':
        await simulateTyping('Como posso ajudar você?', WELCOME_OPTIONS);
        break;

      case 'agendar':
        setCollectingData({ step: 'tipo' });
        await simulateTyping('Ótimo! Que tipo de consulta você gostaria de agendar?', CONSULTA_TIPO_OPTIONS);
        break;

      case 'areas':
        await simulateTyping('A Dra. Andresa atua nas seguintes especialidades. Selecione uma para saber mais:', AREA_OPTIONS);
        break;

      case 'duvidas':
        await simulateTyping('Sobre qual assunto você gostaria de saber mais?', DUVIDA_OPTIONS);
        break;

      case 'localizacao':
        await simulateTyping(
          `📍 **Espaço Humanizare**\nAv. Mathias Mendes Cardoso, 460\nSala 08 - Central Park Residence\nPresidente Prudente, SP\n\n🕐 **Horário:**\nSegunda a Sexta: 08h às 18h\nSábado: 08h às 12h\n\n📱 **WhatsApp:** (18) 99820-7964\n📸 **Instagram:** @dra.andreamartin`,
          [
            { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
            { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
          ]
        );
        break;

      // Areas
      case 'ginecologia':
      case 'obstetricia':
      case 'menopausa':
      case 'regenerativa':
      case 'microscopia':
        await simulateTyping(AREA_DETAILS[value] || '', [
          { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Outras Áreas', value: 'areas', icon: <Heart className="w-4 h-4" /> },
          { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
        ]);
        break;

      // Dúvidas
      case 'duvida_quando':
      case 'duvida_prenatal':
      case 'duvida_microscopia':
      case 'duvida_menopausa':
      case 'duvida_contraceptivos':
      case 'duvida_regenerativa':
        await simulateTyping(DUVIDA_RESPOSTAS[value] || '', [
          { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Outras Dúvidas', value: 'duvidas', icon: <Stethoscope className="w-4 h-4" /> },
          { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
        ]);
        break;

      // Agendamento - tipo selecionado
      case 'tipo_gineco':
      case 'tipo_prenatal':
      case 'tipo_menopausa':
      case 'tipo_regenerativa':
      case 'tipo_microscopia':
      case 'tipo_primeira':
        setCollectingData((prev) => ({ ...prev, tipo: value, step: 'nome' }));
        await simulateTyping('Perfeito! Qual é o seu nome completo?');
        break;

      default:
        await simulateTyping('Desculpe, não entendi. Como posso ajudar?', WELCOME_OPTIONS);
    }
  }, [addMessage, simulateTyping]);

  const handleTextInput = useCallback(async (text: string) => {
    if (!text.trim()) return;

    addMessage(text, 'user');
    setInputValue('');

    if (collectingData.step === 'nome') {
      setCollectingData((prev) => ({ ...prev, nome: text, step: 'telefone' }));
      await simulateTyping(`Obrigada, ${text}! Agora, por favor, informe seu telefone com DDD:`);
    } else if (collectingData.step === 'telefone') {
      const nome = collectingData.nome || '';
      const tipo = collectingData.tipo || '';
      setCollectingData({ step: null });

      const link = buildWhatsAppLink(tipo, nome);
      await simulateTyping(
        `✅ Perfeito, ${nome}!\n\nPara finalizar seu agendamento, clique no botão abaixo para falar com nossa secretaria pelo WhatsApp. Ela confirmará o melhor horário para você.\n\n📱 Seus dados já serão enviados automaticamente na mensagem!`,
        [
          { label: '📱 Abrir WhatsApp', value: `whatsapp:${link}` },
          { label: 'Voltar ao Início', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
        ]
      );
    } else {
      // Free text - try to match intent
      const lower = text.toLowerCase();
      if (lower.includes('agendar') || lower.includes('consulta') || lower.includes('marcar')) {
        handleOption('agendar');
      } else if (lower.includes('horario') || lower.includes('horário') || lower.includes('endereço') || lower.includes('localiza')) {
        handleOption('localizacao');
      } else if (lower.includes('prenatal') || lower.includes('pré-natal') || lower.includes('grávida') || lower.includes('gestante')) {
        handleOption('duvida_prenatal');
      } else if (lower.includes('menopausa')) {
        handleOption('duvida_menopausa');
      } else if (lower.includes('microscopia')) {
        handleOption('duvida_microscopia');
      } else if (lower.includes('contraceptivo') || lower.includes('anticoncepcional') || lower.includes('pilula') || lower.includes('diu')) {
        handleOption('duvida_contraceptivos');
      } else if (lower.includes('regenerativa') || lower.includes('laser') || lower.includes('rejuvenescimento')) {
        handleOption('duvida_regenerativa');
      } else {
        await simulateTyping(
          'Entendi! Para melhor atendê-la, selecione uma das opções abaixo ou fale diretamente com nossa equipe pelo WhatsApp:',
          WELCOME_OPTIONS
        );
      }
    }
  }, [addMessage, collectingData, simulateTyping, handleOption]);

  const handleOptionClick = useCallback((value: string) => {
    if (value.startsWith('whatsapp:')) {
      window.open(value.replace('whatsapp:', ''), '_blank');
      return;
    }
    handleOption(value);
  }, [handleOption]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTextInput(inputValue);
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold **text**
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openChat}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-shadow group"
            aria-label="Abrir assistente virtual"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-2rem))] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-primary-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Assistente Virtual</h3>
                <p className="text-white/70 text-xs">Dra. Andresa Martin • Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-primary-50/30 to-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-1' : 'order-1'}`}>
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-primary-600" />
                        </div>
                        <span className="text-xs text-gray-400">Assistente</span>
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                      }`}
                    >
                      {formatMessage(msg.text)}
                    </div>

                    {/* Options */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionClick(opt.value)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-white border border-primary-200 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all text-left group"
                          >
                            {opt.icon && <span className="text-primary-400 group-hover:text-primary-600">{opt.icon}</span>}
                            <span className="flex-1">{opt.label}</span>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-right text-gray-400' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-primary-600" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={collectingData.step === 'nome' ? 'Digite seu nome...' : collectingData.step === 'telefone' ? '(18) 99999-9999' : 'Digite sua mensagem...'}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

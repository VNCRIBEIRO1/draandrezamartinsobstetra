'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Heart, Baby, Stethoscope,
  Flower2, Microscope, Sparkles, Calendar, Clock,
  ChevronRight, ArrowLeft, Bot, CheckCircle2, Phone
} from 'lucide-react';

/* ─────────────────── Types ─────────────────── */
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: Option[];
  timestamp: Date;
  whatsappLink?: string;
}

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

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
  { label: '← Voltar', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
];

const TIPO_LABELS: Record<string, string> = {
  tipo_gineco: 'Consulta Ginecológica',
  tipo_prenatal: 'Pré-natal',
  tipo_menopausa: 'Menopausa',
  tipo_regenerativa: 'Ginecologia Regenerativa',
  tipo_microscopia: 'Microscopia Vaginal',
  tipo_primeira: 'Primeira Consulta',
};

/* ─────────────────── Response Data ─────────────────── */
const AREA_DETAILS: Record<string, string> = {
  ginecologia: '💗 **Ginecologia**\n\nA Dra. Andresa oferece acompanhamento completo:\n\n• Consulta de rotina e check-up\n• Papanicolau e colposcopia\n• Infecções e corrimentos\n• Endometriose e miomas\n• Planejamento reprodutivo\n• Métodos contraceptivos',
  obstetricia: '🤰 **Obstetrícia e Pré-natal**\n\nAcompanhamento humanizado:\n\n• Pré-natal completo e individualizado\n• Ultrassonografias de rotina\n• Gestação de alto risco\n• Parto humanizado\n• Acompanhamento pós-parto\n• Orientações sobre amamentação',
  menopausa: '🌸 **Menopausa**\n\nTratamento personalizado:\n\n• Reposição hormonal bioidêntica\n• Fogachos e sudorese\n• Saúde óssea e cardiovascular\n• Controle de peso\n• Sexualidade na menopausa',
  regenerativa: '✨ **Ginecologia Regenerativa**\n\nProcedimentos inovadores:\n\n• Laser íntimo\n• Bioestimuladores de colágeno\n• Ácido hialurônico íntimo\n• Rejuvenescimento vulvovaginal\n• Incontinência urinária leve',
  microscopia: '🔬 **Microscopia Vaginal**\n\nDiferencial da Dra. Andresa:\n\n• Diagnóstico imediato na consulta\n• Análise microscópica precisa\n• Tratamento no mesmo dia\n• Sem custo adicional de laboratório\n\n✅ Resultado na hora!',
};

const DUVIDA_RESPOSTAS: Record<string, string> = {
  duvida_quando: '🩺 **Quando ir ao ginecologista?**\n\n• A partir da primeira menstruação\n• Anualmente para exames de rotina\n• Ao ter sintomas incomuns\n• Antes de iniciar contraceptivos\n• No planejamento de gestação\n• Na menopausa\n\n💡 Prevenção é o melhor cuidado!',
  duvida_prenatal: '🤰 **Quando iniciar o pré-natal?**\n\n• Idealmente até a 12ª semana\n• Mensal até 28 semanas\n• Quinzenal de 28 a 36 semanas\n• Semanal a partir de 36 semanas\n\n💗 Pré-natal humanizado com a Dra. Andresa!',
  duvida_microscopia: '🔬 **O que é Microscopia Vaginal?**\n\nExame feito na consulta com resultado imediato.\n\n✅ Diagnóstico preciso\n✅ Tratamento no mesmo dia\n✅ Sem custos adicionais\n\n🏥 Diferencial exclusivo!',
  duvida_menopausa: '🌸 **Sintomas da menopausa:**\n\n• Ondas de calor\n• Suores noturnos\n• Insônia e irritabilidade\n• Secura vaginal\n• Alterações de humor\n• Ganho de peso\n\n💡 Reposição hormonal pode ajudar!',
  duvida_contraceptivos: '💊 **Métodos Contraceptivos**\n\n• Pílulas anticoncepcionais\n• DIU cobre e hormonal\n• Implante subdérmico\n• Anel vaginal\n• Injeção\n• Preservativos\n\n⚠️ O melhor método é o ideal para você!',
  duvida_regenerativa: '✨ **Ginecologia Regenerativa**\n\n• Melhorar lubrificação vaginal\n• Tratar incontinência leve\n• Rejuvenescimento íntimo\n• Melhorar satisfação sexual\n\nProcedimentos: laser, bioestimuladores e ácido hialurônico.',
};

/* ─────────────────── Component ─────────────────── */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [collectingData, setCollectingData] = useState<{
    step: 'tipo' | 'nome' | 'telefone' | 'confirmar' | null;
    nome?: string;
    telefone?: string;
    tipo?: string;
    tipoLabel?: string;
  }>({ step: null });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, scrollToBottom]);

  // Auto-focus input when waiting for text input
  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [waitingForInput, messages]);

  const addMessage = useCallback((text: string, sender: 'bot' | 'user', options?: Option[], whatsappLink?: string) => {
    setMessages((prev) => [...prev, {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      text, sender, options, timestamp: new Date(), whatsappLink,
    }]);
  }, []);

  const simulateTyping = useCallback(async (text: string, options?: Option[], whatsappLink?: string) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 400));
    setIsTyping(false);
    addMessage(text, 'bot', options, whatsappLink);
  }, [addMessage]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          '🌸 Olá! Eu sou a assistente virtual da **Dra. Andresa Martin**, Ginecologista e Obstetra.\n\nComo posso ajudar?',
          'bot', WELCOME_OPTIONS
        );
      }, 300);
    }
  }, [messages.length, addMessage]);

  const buildWhatsAppLink = useCallback((tipo?: string, nome?: string, telefone?: string) => {
    const tipoText = tipo && TIPO_LABELS[tipo] ? TIPO_LABELS[tipo] : 'consulta';
    const parts = [`Olá! Gostaria de agendar: ${tipoText}`];
    if (nome) parts.push(`Nome: ${nome}`);
    if (telefone) parts.push(`Tel: ${telefone}`);
    parts.push('(Via assistente do site)');
    return `https://wa.me/5518998207964?text=${encodeURIComponent(parts.join('\n'))}`;
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleOption = useCallback(async (value: string) => {
    const allOptions = [...WELCOME_OPTIONS, ...AREA_OPTIONS, ...DUVIDA_OPTIONS, ...CONSULTA_TIPO_OPTIONS];
    const opt = allOptions.find((o) => o.value === value);
    if (opt) addMessage(opt.label, 'user');

    setWaitingForInput(false);

    switch (value) {
      case 'inicio':
        setCollectingData({ step: null });
        await simulateTyping('Como posso ajudar?', WELCOME_OPTIONS);
        break;
      case 'agendar':
        setCollectingData({ step: 'tipo' });
        await simulateTyping('Que tipo de consulta você gostaria?', CONSULTA_TIPO_OPTIONS);
        break;
      case 'areas':
        await simulateTyping('Selecione uma especialidade para saber mais:', AREA_OPTIONS);
        break;
      case 'duvidas':
        await simulateTyping('Sobre qual assunto gostaria de saber?', DUVIDA_OPTIONS);
        break;
      case 'localizacao':
        await simulateTyping(
          '📍 **Espaço Humanizare**\nAv. Mathias Mendes Cardoso, 460\nSala 08 – Presidente Prudente, SP\n\n🕐 Seg a Sex: 08h–18h | Sáb: 08h–12h\n📱 (18) 99820-7964',
          [{ label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
           { label: 'Voltar', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> }]
        );
        break;

      case 'ginecologia': case 'obstetricia': case 'menopausa': case 'regenerativa': case 'microscopia':
        await simulateTyping(AREA_DETAILS[value] || '', [
          { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Outras Áreas', value: 'areas', icon: <Heart className="w-4 h-4" /> },
          { label: 'Voltar', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
        ]);
        break;

      case 'duvida_quando': case 'duvida_prenatal': case 'duvida_microscopia':
      case 'duvida_menopausa': case 'duvida_contraceptivos': case 'duvida_regenerativa':
        await simulateTyping(DUVIDA_RESPOSTAS[value] || '', [
          { label: 'Agendar Consulta', value: 'agendar', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Outras Dúvidas', value: 'duvidas', icon: <Stethoscope className="w-4 h-4" /> },
          { label: 'Voltar', value: 'inicio', icon: <ArrowLeft className="w-4 h-4" /> },
        ]);
        break;

      // Tipo selecionado → pede nome
      case 'tipo_gineco': case 'tipo_prenatal': case 'tipo_menopausa':
      case 'tipo_regenerativa': case 'tipo_microscopia': case 'tipo_primeira': {
        const label = TIPO_LABELS[value] || value;
        setCollectingData({ step: 'nome', tipo: value, tipoLabel: label });
        setWaitingForInput(true);
        await simulateTyping(`Perfeito! **${label}** selecionada.\n\nQual é o seu nome completo?`);
        break;
      }

      case 'confirmar_sim': {
        const link = buildWhatsAppLink(collectingData.tipo, collectingData.nome, collectingData.telefone);
        setCollectingData({ step: null });
        await simulateTyping(
          '✅ **Agendamento preparado!**\n\nClique abaixo para enviar seus dados pelo WhatsApp. A secretária confirmará o melhor horário!',
          undefined, link
        );
        setTimeout(() => addMessage('Posso ajudar em mais alguma coisa?', 'bot', [
          { label: 'Sim, tenho outra dúvida', value: 'inicio', icon: <Heart className="w-4 h-4" /> },
          { label: 'Não, obrigada!', value: 'encerrar' },
        ]), 1500);
        break;
      }

      case 'confirmar_nao':
        setCollectingData({ step: 'tipo' });
        await simulateTyping('Sem problemas! Vamos recomeçar:', CONSULTA_TIPO_OPTIONS);
        break;

      case 'encerrar':
        addMessage('Não, obrigada!', 'user');
        await simulateTyping('Foi um prazer! 🌸 Se precisar, é só chamar. Cuide-se! 💗');
        break;

      default:
        await simulateTyping('Desculpe, não entendi. Como posso ajudar?', WELCOME_OPTIONS);
    }
  }, [addMessage, simulateTyping, collectingData, buildWhatsAppLink]);

  const handleTextInput = useCallback(async (text: string) => {
    if (!text.trim()) return;
    addMessage(text, 'user');
    setInputValue('');

    if (collectingData.step === 'nome') {
      setCollectingData((prev) => ({ ...prev, nome: text.trim(), step: 'telefone' }));
      setWaitingForInput(true);
      await simulateTyping(`Obrigada, **${text.trim()}**! 😊\n\nAgora informe seu telefone com DDD:`);
    } else if (collectingData.step === 'telefone') {
      const nome = collectingData.nome || '';
      const tipo = collectingData.tipoLabel || 'Consulta';
      setCollectingData((prev) => ({ ...prev, telefone: text.trim(), step: 'confirmar' }));
      setWaitingForInput(false);
      await simulateTyping(
        `📋 **Resumo do Agendamento:**\n\n👤 **${nome}**\n📱 **${text.trim()}**\n🏥 **${tipo}**\n\nConfirma o envio pelo WhatsApp?`,
        [
          { label: '✅ Confirmar e Enviar', value: 'confirmar_sim', icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: '❌ Recomeçar', value: 'confirmar_nao', icon: <ArrowLeft className="w-4 h-4" /> },
        ]
      );
    } else {
      const lower = text.toLowerCase();
      if (lower.match(/agend|consult|marc/)) handleOption('agendar');
      else if (lower.match(/horar|endereç|localiz|onde/)) handleOption('localizacao');
      else if (lower.match(/prénatal|pre-natal|pre natal|grávid|gestant/)) handleOption('duvida_prenatal');
      else if (lower.match(/menopausa/)) handleOption('duvida_menopausa');
      else if (lower.match(/microscop/)) handleOption('duvida_microscopia');
      else if (lower.match(/contracep|anticoncep|pilula|diu/)) handleOption('duvida_contraceptivos');
      else if (lower.match(/regenerat|laser|rejuvenesc/)) handleOption('duvida_regenerativa');
      else if (lower.match(/^(oi|olá|ola|bom dia|boa tarde|boa noite|hey|hello)/)) {
        await simulateTyping('Olá! 🌸 Como posso ajudar?', WELCOME_OPTIONS);
      } else {
        await simulateTyping('Para melhor atendê-la, selecione uma opção:', WELCOME_OPTIONS);
      }
    }
  }, [addMessage, collectingData, simulateTyping, handleOption]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleOptionClick = useCallback((value: string) => {
    if (value.startsWith('whatsapp:')) { window.open(value.replace('whatsapp:', ''), '_blank'); return; }
    handleOption(value);
  }, [handleOption]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); handleTextInput(inputValue); };

  const formatMessage = (text: string) => text.split('\n').map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return (<span key={i}><span dangerouslySetInnerHTML={{ __html: formatted }} />{i < text.split('\n').length - 1 && <br />}</span>);
  });

  const placeholder = collectingData.step === 'nome' ? 'Digite seu nome completo...'
    : collectingData.step === 'telefone' ? '(18) 99999-9999' : 'Digite sua mensagem...';

  return (
    <>
      {/* Toggle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={openChat}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-shadow group"
            aria-label="Abrir assistente virtual">
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(600px,calc(100vh-2rem))] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-primary-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Assistente Virtual</h3>
                <p className="text-white/70 text-xs">Dra. Andresa Martin • Online</p>
              </div>
              <button onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Fechar chat">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-primary-50/30 to-white min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[85%]">
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-primary-600" />
                        </div>
                        <span className="text-xs text-gray-400">Assistente</span>
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-white text-gray-700 rounded-bl-md shadow-sm border border-gray-100'
                    }`}>
                      {formatMessage(msg.text)}
                    </div>

                    {/* WhatsApp CTA */}
                    {msg.whatsappLink && (
                      <a href={msg.whatsappLink} target="_blank" rel="noopener noreferrer"
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors shadow-lg">
                        <Phone className="w-4 h-4" /> Abrir WhatsApp e Confirmar
                      </a>
                    )}

                    {/* Options */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {msg.options.map((opt) => (
                          <button key={opt.value} onClick={() => handleOptionClick(opt.value)}
                            className="w-full flex items-center gap-2 px-4 py-2.5 bg-white border border-primary-200 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-all text-left group">
                            {opt.icon && <span className="text-primary-400 group-hover:text-primary-600">{opt.icon}</span>}
                            <span className="flex-1">{opt.label}</span>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-400" />
                          </button>
                        ))}
                      </div>
                    )}

                    <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-right' : ''} text-gray-400`}>
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

            {/* Input — always accessible, auto-focus on data collection */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
              {waitingForInput && (
                <p className="text-xs text-primary-500 mb-2 font-medium animate-pulse">
                  {collectingData.step === 'nome' ? '👤 Aguardando seu nome...' : '📱 Aguardando seu telefone...'}
                </p>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                  autoComplete="off"
                  autoFocus={waitingForInput}
                />
                <button type="submit" disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Enviar">
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

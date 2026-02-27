'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = z.object({
  nome: z.string().min(3, 'Informe seu nome completo'),
  telefone: z.string().min(10, 'Informe um telefone válido'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  assunto: z.string().min(1, 'Selecione um assunto'),
  mensagem: z.string().min(10, 'Descreva brevemente sua necessidade'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${data.nome}.\nAssunto: ${data.assunto}\n\n${data.mensagem}\n\nTelefone: ${data.telefone}${data.email ? `\nE-mail: ${data.email}` : ''}`
    );
    window.open(`https://wa.me/5518998207964?text=${msg}`, '_blank');
    toast.success('Redirecionando para o WhatsApp...');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input {...register('nome')} placeholder="Seu nome completo" className="input-field" />
        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input {...register('telefone')} placeholder="Telefone / WhatsApp" className="input-field" />
          {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="E-mail (opcional)" className="input-field" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <select {...register('assunto')} className="input-field">
          <option value="">Selecione o assunto</option>
          <option value="Consulta Ginecológica">Consulta Ginecológica</option>
          <option value="Pré-natal">Pré-natal</option>
          <option value="Menopausa">Menopausa</option>
          <option value="Ginecologia Regenerativa">Ginecologia Regenerativa</option>
          <option value="Microscopia Vaginal">Microscopia Vaginal</option>
          <option value="Exames de Rotina">Exames de Rotina</option>
          <option value="Outro">Outro assunto</option>
        </select>
        {errors.assunto && <p className="text-red-500 text-xs mt-1">{errors.assunto.message}</p>}
      </div>
      <div>
        <textarea
          {...register('mensagem')}
          rows={4}
          placeholder="Descreva brevemente sua necessidade..."
          className="input-field resize-none"
        />
        {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Enviando...' : 'Enviar pelo WhatsApp'}
      </button>
    </form>
  );
}

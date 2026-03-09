// ============================================================
// CONTEÚDO DOS ARTIGOS — DRA. ANDRESA MARTIN LOUZADA
// ============================================================

export interface Article {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  videoUrl?: string;
}

export const articles: Record<string, Article> = {
  'importancia-pre-natal': {
    title: 'A Importância do Pré-Natal: Cuidando da Mãe e do Bebê',
    category: 'Pré-natal',
    date: '25 Fev 2026',
    readTime: '7 min',
    content: [
      'O pré-natal é o acompanhamento médico realizado durante toda a gestação, essencial para garantir a saúde da mãe e do bebê. Através de consultas regulares, exames e orientações, é possível identificar e prevenir complicações, proporcionando uma gravidez mais segura e tranquila.',

      '## Quando Iniciar o Pré-Natal',
      'O ideal é iniciar o pré-natal assim que a gravidez for confirmada, preferencialmente no primeiro trimestre. A Organização Mundial da Saúde (OMS) recomenda no mínimo 6 consultas durante a gestação, mas o acompanhamento ideal inclui consultas mensais até a 28ª semana, quinzenais entre a 28ª e 36ª semana, e semanais a partir da 36ª semana até o parto.',

      '## Exames Essenciais do Pré-Natal',
      'O acompanhamento pré-natal inclui uma série de exames fundamentais: hemograma completo, tipagem sanguínea e fator Rh, glicemia de jejum, sorologias (HIV, sífilis, hepatite B e C, toxoplasmose, rubéola), exame de urina e urocultura, ultrassonografias obstétricas (incluindo a morfológica), teste de tolerância à glicose, além de exames complementares conforme a necessidade de cada gestante.',

      '## Pré-Natal Humanizado',
      'O pré-natal humanizado vai além dos exames e procedimentos médicos. Ele envolve acolhimento, escuta ativa, respeito às escolhas da gestante e participação ativa no plano de parto. A relação de confiança entre a gestante e sua obstetra é fundamental para uma experiência positiva de gestação e parto.',
      'No Espaço Humanizare, cada gestante recebe atenção individualizada, com tempo adequado de consulta para esclarecer todas as dúvidas e construir juntas o melhor caminho para o parto.',

      '## Sinais de Alerta na Gestação',
      'É fundamental que a gestante conheça os sinais de alerta que exigem atendimento médico imediato: sangramento vaginal, dor abdominal intensa, perda de líquido amniótico, diminuição dos movimentos fetais, inchaço súbito nas mãos e rosto, dor de cabeça intensa e persistente, e febre alta.',

      '## Alimentação e Suplementação',
      'Uma alimentação equilibrada e rica em nutrientes é essencial durante a gestação. A suplementação de ácido fólico deve ser iniciada idealmente antes da concepção e mantida durante o primeiro trimestre. Ferro, cálcio, vitamina D e ômega-3 também podem ser necessários conforme orientação médica.',

      '## Considerações Finais',
      'O pré-natal é o melhor presente que uma mãe pode dar ao seu bebê antes mesmo dele nascer. A Dra. Andresa Martin Louzada oferece pré-natal completo e humanizado no Espaço Humanizare em Presidente Prudente. Agende sua consulta e inicie esse cuidado o quanto antes. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'microscopia-vaginal-diagnostico': {
    title: 'Microscopia Vaginal: Diagnóstico na Hora com Precisão',
    category: 'Microscopia Vaginal',
    date: '20 Fev 2026',
    readTime: '5 min',
    content: [
      'A microscopia vaginal é um exame ginecológico que permite a análise microscópica do conteúdo vaginal em tempo real, durante a própria consulta. Este é um dos grandes diferenciais do consultório da Dra. Andresa Martin Louzada, proporcionando diagnóstico imediato e início do tratamento adequado no mesmo dia.',

      '## Como Funciona o Exame',
      'Durante a consulta ginecológica, é coletada uma amostra do conteúdo vaginal que é imediatamente analisada ao microscópio. A médica consegue identificar na hora a presença de fungos (como a Candida), bactérias, tricomonas e alterações da flora vaginal, sem necessidade de enviar material para laboratório externo.',

      '## Vantagens do Diagnóstico Imediato',
      'A principal vantagem da microscopia vaginal é a rapidez no diagnóstico. Em vez de esperar dias ou semanas pelo resultado de um exame laboratorial, a paciente sai da consulta já com o diagnóstico e a prescrição adequada. Isso significa tratamento mais rápido, menos desconforto e resolução mais eficiente das queixas.',
      'Além disso, a microscopia permite que a médica explique visualmente para a paciente o que está acontecendo, tornando a consulta mais didática e fortalecendo a relação médica-paciente.',

      '## Quando a Microscopia é Indicada',
      'A microscopia vaginal é indicada em diversas situações: corrimento vaginal anormal, coceira ou irritação na região genital, odor vaginal alterado, dor ou ardência durante a relação sexual, infecções vaginais de repetição, e como parte do exame ginecológico de rotina.',

      '## Principais Achados',
      'Através da microscopia vaginal, é possível identificar: candidíase (infecção por fungos), vaginose bacteriana (desequilíbrio da flora vaginal), tricomoníase (infecção por protozoário), vaginite citolítica, vaginose por lactobacilos e outras alterações microbiológicas.',

      '## Considerações Finais',
      'A microscopia vaginal é um exame simples, rápido e extremamente útil na prática ginecológica. A Dra. Andresa Martin Louzada realiza microscopia vaginal com resultado na hora no Espaço Humanizare em Presidente Prudente. Se você apresenta qualquer sintoma vaginal, agende sua consulta para um diagnóstico preciso e imediato. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'menopausa-qualidade-vida': {
    title: 'Menopausa: Como Manter a Qualidade de Vida Nessa Nova Fase',
    category: 'Menopausa',
    date: '15 Fev 2026',
    readTime: '8 min',
    content: [
      'A menopausa é uma fase natural da vida da mulher, marcada pela cessação permanente da menstruação, geralmente entre os 45 e 55 anos. Embora seja um processo fisiológico, os sintomas associados podem impactar significativamente a qualidade de vida. Com acompanhamento médico adequado, é possível viver essa fase com saúde, disposição e bem-estar.',

      '## Sintomas Mais Comuns',
      'Os sintomas da menopausa variam de mulher para mulher, mas os mais frequentes incluem: ondas de calor (fogachos), suores noturnos, insônia, alterações de humor (irritabilidade, ansiedade, tristeza), secura vaginal, diminuição da libido, ganho de peso, dores articulares, perda de memória e concentração, e ressecamento da pele e cabelos.',

      '## Tratamento Hormonal',
      'A terapia de reposição hormonal (TRH) é o tratamento mais eficaz para os sintomas vasomotores da menopausa. Quando indicada e acompanhada por um ginecologista, a TRH pode melhorar significativamente a qualidade de vida, proteger a saúde óssea e cardiovascular, e aliviar os sintomas desconfortáveis. A decisão pelo tratamento hormonal deve ser individualizada, considerando os riscos e benefícios para cada paciente.',

      '## Cuidados com a Saúde Óssea',
      'Após a menopausa, a diminuição do estrogênio acelera a perda de massa óssea, aumentando o risco de osteoporose. A densitometria óssea deve ser realizada periodicamente, e medidas preventivas incluem: suplementação de cálcio e vitamina D, exercícios físicos regulares (especialmente musculação), e tratamento hormonal quando indicado.',

      '## Alimentação e Exercícios',
      'Uma alimentação equilibrada, rica em cálcio, vitamina D, fitoestrógenos (soja, linhaça) e ômega-3 contribui para o bem-estar na menopausa. Exercícios físicos regulares ajudam a controlar o peso, fortalecer os ossos, melhorar o humor e a qualidade do sono.',

      '## Saúde Mental e Emocional',
      'A menopausa pode trazer desafios emocionais significativos. É fundamental que a mulher se sinta acolhida e amparada nessa fase. O acompanhamento psicológico pode ser benéfico, assim como práticas de mindfulness, yoga e atividades que promovam o bem-estar emocional.',

      '## Considerações Finais',
      'A menopausa não é o fim, é uma nova fase. Com acompanhamento médico adequado, é possível viver com qualidade, saúde e plenitude. A Dra. Andresa Martin Louzada oferece tratamento completo para menopausa e climatério no Espaço Humanizare em Presidente Prudente, incluindo reposição hormonal e acompanhamento personalizado. Agende sua consulta. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'anticoncepcional-guia-jovem': {
    title: 'Anticoncepcional: Guia Completo para Quem Está Começando',
    category: 'Anticoncepcional',
    date: '10 Fev 2026',
    readTime: '7 min',
    content: [
      'Escolher o anticoncepcional ideal pode parecer complicado com tantas opções disponíveis. Se você está iniciando a vida sexual ou pensando em começar a usar um método contraceptivo, este guia vai te ajudar a entender cada opção e conversar com mais segurança com sua ginecologista.',

      '## Por Que Usar Anticoncepcional?',
      'O anticoncepcional não serve apenas para evitar gravidez. Ele também pode ajudar a regular o ciclo menstrual, reduzir cólicas intensas, diminuir o fluxo menstrual, controlar a acne hormonal e tratar a TPM. Porém, o método ideal varia para cada mulher — por isso a consulta ginecológica é essencial.',

      '## Tipos de Anticoncepcionais',
      'Existem diversos tipos de métodos hormonais: pílula combinada (estrogênio + progestagênio), minipílula (só progestagênio), injeção mensal ou trimestral, adesivo hormonal, anel vaginal e implante subdérmico. Cada um tem vantagens, desvantagens e contraindicações específicas.',

      '## Pílula Anticoncepcional',
      'A pílula é o método mais popular entre jovens. Deve ser tomada diariamente, no mesmo horário. Existem cartelas de 21 e 24 comprimidos, com ou sem pausa. Esquecimentos frequentes diminuem a eficácia — se isso acontece com você, vale considerar métodos de longa duração como DIU ou implante.',

      '## Injeção Contraceptiva',
      'A injeção pode ser mensal ou trimestral. É prática para quem esquece a pílula, mas não pode ser "interrompida" facilmente. A injeção trimestral pode causar irregularidade menstrual e demora para retorno da fertilidade após suspensão.',

      '## Como Escolher o Melhor Método',
      'Para escolher o anticoncepcional ideal, considere: sua rotina (consegue tomar pílula todo dia?), se tem contraindicações (enxaqueca com aura, trombofilia, tabagismo), se deseja menstruar ou não, o custo-benefício, e seus planos reprodutivos. Converse com sua ginecologista — ela vai avaliar seu histórico e indicar a melhor opção.',

      '## Mitos e Verdades',
      'Anticoncepcional NÃO engorda necessariamente — alguns podem causar retenção de líquido, mas isso varia. Anticoncepcional NÃO causa infertilidade — a fertilidade retorna após a suspensão. Anticoncepcional NÃO protege contra ISTs — use preservativo sempre!',

      '## Efeitos Colaterais Comuns',
      'Nos primeiros meses, é normal sentir: náuseas leves, sensibilidade nos seios, pequenos sangramentos de escape e alterações de humor. Esses sintomas costumam melhorar com o tempo. Se persistirem, converse com sua médica sobre trocar o método.',

      '## Quando Procurar a Ginecologista',
      'Procure sua ginecologista antes de iniciar qualquer método contraceptivo, se sentir efeitos colaterais incômodos, se esquecer pílulas com frequência, ou se quiser trocar de método. Aqui no Espaço Humanizare, a Dra. Andresa oferece orientação individualizada para ajudar você a encontrar o método perfeito.',

      '## Considerações Finais',
      'Não existe o "melhor anticoncepcional" — existe o melhor para VOCÊ. O mais importante é usar o método corretamente e fazer acompanhamento ginecológico regular. A Dra. Andresa Martin Louzada orienta sobre todos os métodos contraceptivos no Espaço Humanizare em Presidente Prudente. Agende sua consulta e cuide da sua saúde. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'diu-tudo-sobre': {
    title: 'DIU: Tudo Que Você Precisa Saber Antes de Colocar',
    category: 'DIU',
    date: '08 Fev 2026',
    readTime: '7 min',
    content: [
      'O DIU (Dispositivo Intrauterino) é um dos métodos contraceptivos mais eficazes e práticos que existem. Se você está pensando em colocar, provavelmente tem muitas dúvidas. Neste artigo, vamos esclarecer tudo — desde como funciona até como é a inserção.',

      '## O Que é o DIU?',
      'O DIU é um pequeno dispositivo em formato de T que é inserido dentro do útero pela ginecologista. Ele atua localmente, impedindo a gravidez por um longo período — de 5 a 10 anos, dependendo do tipo. É um dos métodos com maior taxa de eficácia (acima de 99%).',

      '## Tipos de DIU',
      'Existem dois tipos principais: o DIU de cobre (não hormonal) — que libera íons de cobre que criam um ambiente desfavorável para os espermatozoides, com duração de até 10 anos; e o DIU hormonal (Mirena ou Kyleena) — que libera progesterona localmente, afinando o endométrio e reduzindo o fluxo menstrual, com duração de 5 a 8 anos.',

      '## DIU de Cobre: Vantagens e Desvantagens',
      'Vantagens: não contém hormônios, longa duração (até 10 anos), pode ser usado por quem amamenta, não interfere na libido. Desvantagens: pode aumentar o fluxo menstrual e as cólicas, especialmente nos primeiros meses. Indicado para mulheres que não querem ou não podem usar hormônios.',

      '## DIU Hormonal (Mirena/Kyleena): Vantagens e Desvantagens',
      'Vantagens: reduz significativamente o fluxo menstrual (muitas mulheres param de menstruar), diminui cólicas, ação hormonal apenas local (pouco efeito sistêmico). Desvantagens: pode causar pequenos sangramentos de escape nos primeiros meses, e raramente efeitos hormonais leves como acne.',

      '## Como é a Inserção?',
      'A inserção do DIU é feita no consultório pela ginecologista, em um procedimento que dura poucos minutos. Pode causar uma cólica moderada durante e logo após a inserção, que melhora rapidamente. A maioria das mulheres tolera bem e retoma suas atividades normais no mesmo dia.',

      '## Quem Pode Usar o DIU?',
      'O DIU pode ser usado por mulheres de qualquer idade — incluindo jovens que nunca tiveram filhos e adolescentes. Esse é um mito muito comum! O DIU é seguro e indicado para a maioria das mulheres. As contraindicações são poucas e incluem infecções pélvicas ativas e algumas malformações uterinas.',

      '## O DIU Dói? Pode Sair do Lugar?',
      'A inserção pode causar desconforto, mas a Dra. Andresa utiliza técnicas para minimizar a dor. A expulsão espontânea do DIU é rara (cerca de 2-5% dos casos) e geralmente ocorre nos primeiros meses. O acompanhamento com ultrassom após a inserção garante que tudo está no lugar.',

      '## Acompanhamento Pós-Inserção',
      'Após colocar o DIU, é importante retornar para uma consulta de revisão (geralmente após 30 dias) para verificar o posicionamento com ultrassom. Depois, o acompanhamento segue na rotina ginecológica normal.',

      '## Considerações Finais',
      'O DIU é uma excelente opção para quem busca praticidade, eficácia e liberdade. A Dra. Andresa Martin Louzada realiza a inserção de DIU de cobre, DIU Mirena e DIU Kyleena no Espaço Humanizare em Presidente Prudente. Agende uma consulta para avaliar qual tipo é mais indicado para o seu caso. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'implanon-implante-guia': {
    title: 'Implanon: O Implante Contraceptivo que Dura 3 Anos',
    category: 'Implanon',
    date: '06 Fev 2026',
    readTime: '6 min',
    content: [
      'O Implanon (ou implante subdérmico) é um método contraceptivo de longa duração que está conquistando cada vez mais jovens. Com uma eficácia superior a 99%, ele é inserido no braço e dura até 3 anos. Se você busca praticidade e segurança, conheça tudo sobre esse método.',

      '## O Que é o Implanon?',
      'O Implanon é um pequeno bastão flexível (do tamanho de um palito de fósforo) que é inserido sob a pele do braço. Ele libera continuamente uma pequena dose de progesterona (etonogestrel), impedindo a ovulação e prevenindo a gravidez por até 3 anos.',

      '## Como é a Inserção?',
      'A inserção é feita no consultório, com anestesia local. O procedimento dura apenas alguns minutos. Após a inserção, pode haver um pequeno hematoma no local, que desaparece em poucos dias. A paciente pode retomar suas atividades normais imediatamente.',

      '## Vantagens do Implante',
      'As principais vantagens são: altíssima eficácia (>99,9%), não precisa lembrar de tomar nada diariamente, duração de até 3 anos, reversível a qualquer momento (ao retirar, a fertilidade retorna rapidamente), discreto (fica sob a pele do braço), e pode reduzir cólicas menstruais.',

      '## Para Quem é Indicado?',
      'O implante é ideal para: jovens que esquecem de tomar a pílula, mulheres com rotina agitada, quem não pode usar estrogênio (fumantes, enxaqueca com aura), quem amamenta, e mulheres que desejam um método de longa duração sem a inserção intrauterina.',

      '## Efeitos na Menstruação',
      'O efeito mais comum do Implanon é a alteração no padrão menstrual. Cerca de 20% das mulheres param de menstruar (amenorreia), o que é seguro e pode ser até desejável. Algumas podem ter sangramentos irregulares ou de escape, especialmente nos primeiros 6 meses. Poucas mulheres mantêm um ciclo regular.',

      '## Efeitos Colaterais',
      'Além das alterações menstruais, os efeitos colaterais são geralmente leves: dor de cabeça, acne (pode melhorar ou piorar), sensibilidade mamária e variação de peso. A maioria dos efeitos melhora com o tempo.',

      '## Quanto Custa?',
      'O implante tem um custo inicial mais elevado que a pílula, mas quando dividido por 3 anos de uso, o custo mensal é semelhante ou até menor que muitos anticoncepcionais orais. É um investimento em praticidade e segurança.',

      '## Remoção e Retorno da Fertilidade',
      'A remoção é simples, feita no consultório com anestesia local, em poucos minutos. A fertilidade retorna rapidamente — geralmente no primeiro ciclo após a retirada. Se desejar continuar usando, um novo implante pode ser inserido no mesmo momento.',

      '## Considerações Finais',
      'O Implanon é uma opção moderna, segura e prática para contracepção de longa duração. A Dra. Andresa Martin Louzada realiza inserção, troca e retirada de Implanon no Espaço Humanizare em Presidente Prudente. Agende uma consulta para saber se o implante é a melhor opção para você. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'exames-ginecologicos-rotina': {
    title: 'Exames Ginecológicos de Rotina: Guia Completo',
    category: 'Ginecologia',
    date: '05 Fev 2026',
    readTime: '6 min',
    content: [
      'Os exames ginecológicos de rotina são fundamentais para a prevenção e detecção precoce de doenças. Toda mulher deve realizar acompanhamento ginecológico regular, independentemente da idade ou da presença de sintomas. A prevenção é sempre o melhor caminho para a saúde feminina.',

      '## Papanicolau (Citologia Oncótica)',
      'O exame de Papanicolau é o principal exame de rastreamento do câncer de colo do útero. Deve ser iniciado aos 25 anos em mulheres que já tiveram atividade sexual, e repetido anualmente ou conforme orientação médica. O exame é simples, rápido e praticamente indolor, consistindo na coleta de células do colo uterino para análise laboratorial.',

      '## Exame de Mama',
      'O exame clínico das mamas deve ser realizado anualmente durante a consulta ginecológica. A mamografia é recomendada a partir dos 40 anos, anualmente. Mulheres com histórico familiar de câncer de mama podem precisar iniciar o rastreamento mais cedo. A ultrassonografia mamária pode ser indicada como complemento, especialmente em mulheres jovens com mamas densas.',

      '## Ultrassonografia Pélvica e Transvaginal',
      'A ultrassonografia é um exame de imagem que permite avaliar o útero, ovários e demais estruturas pélvicas. É fundamental para detectar miomas, cistos ovarianos, pólipos endometriais e outras alterações. A ultrassonografia transvaginal oferece imagens mais detalhadas e é o exame de escolha para avaliação ginecológica.',

      '## Colposcopia',
      'A colposcopia é um exame que permite a visualização ampliada do colo do útero, vagina e vulva. É indicada quando há alterações no Papanicolau ou como parte do acompanhamento de lesões cervicais. Permite a identificação precisa de áreas alteradas e a realização de biópsias quando necessário.',

      '## Exames Laboratoriais',
      'Os exames de sangue de rotina incluem hemograma, perfil hormonal, função tireoidiana, glicemia, colesterol e triglicerídeos, vitamina D, ferro e ferritina. A periodicidade e os exames específicos são definidos de acordo com a idade, histórico e queixas de cada paciente.',

      '## Checklist da Gineco',
      'Para manter sua saúde em dia, mantenha um checklist: consulta ginecológica anual, Papanicolau conforme orientação médica, mamografia a partir dos 40 anos, ultrassonografia pélvica anual, exames laboratoriais periódicos, e autoexame das mamas mensal.',

      '## Considerações Finais',
      'Não espere ter sintomas para procurar sua ginecologista. A prevenção e o diagnóstico precoce salvam vidas. A Dra. Andresa Martin Louzada realiza todos os exames ginecológicos de rotina no Espaço Humanizare em Presidente Prudente, incluindo Papanicolau, colposcopia e microscopia vaginal. Agende sua consulta de rotina. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'cheiro-intimo-normal-anormal': {
    title: 'Cheiro Íntimo: Quando é Normal e Quando Procurar Ajuda',
    category: 'Ginecologia',
    date: '01 Fev 2026',
    readTime: '5 min',
    content: [
      'O odor íntimo é uma preocupação frequente entre as mulheres. É importante saber que a vagina possui um odor natural, que varia conforme o ciclo menstrual, alimentação e outros fatores. Porém, alterações significativas no cheiro podem indicar infecções ou desequilíbrios que precisam de avaliação médica.',

      '## Odor Normal vs. Odor Alterado',
      'O odor vaginal normal é leve, levemente ácido e não causa incômodo. Variações sutis são esperadas durante a menstruação, após relações sexuais, com uso de antibióticos ou em períodos de estresse. O odor se torna preocupante quando é forte, fétido, semelhante a peixe, ou acompanhado de outros sintomas como corrimento anormal, coceira ou ardência.',

      '## Causas Comuns de Odor Alterado',
      'As principais causas de alteração no odor vaginal são: vaginose bacteriana (causa mais comum, odor de peixe), tricomoníase (infecção sexualmente transmissível), candidíase (embora nem sempre altere o odor), corpo estranho na vagina (tampão esquecido), higiene inadequada (tanto excesso quanto falta), e alterações hormonais.',

      '## Cuidados com a Higiene Íntima',
      'A higiene íntima adequada é fundamental: lave a região externa (vulva) com sabonete íntimo de pH neutro ou levemente ácido, evite duchas vaginais (elas destroem a flora protetora), use roupas íntimas de algodão, evite roupas muito justas por longos períodos, troque absorventes com frequência, e não use perfumes ou desodorantes na região íntima.',

      '## Quando Procurar a Ginecologista',
      'Procure atendimento médico quando: o odor for persistente e forte, houver corrimento com cor alterada (verde, amarelo, cinza), sentir coceira, ardência ou dor, o odor surgir após relação sexual desprotegida, ou houver qualquer desconforto na região íntima.',

      '## Diagnóstico com Microscopia Vaginal',
      'No consultório da Dra. Andresa, a microscopia vaginal permite identificar a causa do odor alterado durante a própria consulta. O diagnóstico imediato possibilita o início do tratamento adequado no mesmo dia, sem necessidade de esperar resultados laboratoriais.',

      '## Considerações Finais',
      'Não tenha vergonha de falar sobre odor íntimo com sua ginecologista. É uma queixa comum e geralmente de fácil resolução. A Dra. Andresa Martin Louzada realiza diagnóstico imediato com microscopia vaginal no Espaço Humanizare em Presidente Prudente. Agende sua consulta. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'pilula-do-dia-seguinte': {
    title: 'Pílula do Dia Seguinte: Tudo que Você Precisa Saber',
    category: 'Contracepção',
    date: '28 Jan 2026',
    readTime: '5 min',
    content: [
      'A pílula do dia seguinte, também conhecida como contracepção de emergência, é um método contraceptivo que pode ser utilizado após uma relação sexual desprotegida para prevenir uma gravidez não planejada. No entanto, existem muitas dúvidas e mitos sobre seu uso, eficácia e efeitos.',

      '## Como Funciona',
      'A pílula do dia seguinte atua principalmente inibindo ou retardando a ovulação. Ela contém uma alta dose de levonorgestrel ou ulipristal acetato. É importante esclarecer que ela NÃO é abortiva — ela impede a gravidez, não interrompe uma gravidez já estabelecida.',

      '## Quando Tomar',
      'A pílula do dia seguinte deve ser tomada o mais rápido possível após a relação sexual desprotegida. Sua eficácia diminui com o passar das horas: até 24 horas a eficácia é de cerca de 95%, entre 24 e 48 horas cai para cerca de 85%, e entre 48 e 72 horas para cerca de 58%. Alguns tipos podem ser eficazes até 120 horas (5 dias).',

      '## Quando é Indicada',
      'A contracepção de emergência é indicada em caso de relação sexual sem uso de preservativo ou outro método contraceptivo, falha do método contraceptivo habitual (esquecimento de pílulas, rompimento de preservativo), e em situações de violência sexual.',

      '## Efeitos Colaterais',
      'Os efeitos colaterais mais comuns incluem: náuseas, vômitos, dor de cabeça, sensibilidade mamária, alteração no ciclo menstrual (menstruação pode adiantar ou atrasar), cansaço e tontura. Esses efeitos são temporários e geralmente desaparecem em poucos dias.',

      '## Você Está Usando da Forma Certa?',
      'A pílula do dia seguinte NÃO deve ser usada como método contraceptivo regular. O uso frequente pode causar desregulação hormonal e diminuição da eficácia. Se você percebe que está recorrendo frequentemente à contracepção de emergência, agende uma consulta para discutir métodos contraceptivos regulares mais adequados para você.',

      '## Métodos Contraceptivos Regulares',
      'Existem diversas opções de contracepção regular: pílula anticoncepcional, DIU (hormonal ou de cobre), implante subdérmico, injeção contraceptiva, anel vaginal, e adesivo contraceptivo. Sua ginecologista pode ajudá-la a escolher o método mais adequado para seu estilo de vida e saúde.',

      '## Considerações Finais',
      'A contracepção de emergência é um recurso importante, mas deve ser usada com consciência. A Dra. Andresa Martin Louzada orienta sobre todos os métodos contraceptivos regulares — DIU, Implanon, pílula e mais — no Espaço Humanizare em Presidente Prudente. Agende uma consulta para discutir planejamento contraceptivo e escolher o melhor método para você. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'vsr-recem-nascido': {
    title: 'VSR em Recém-Nascidos: O Que as Mães Precisam Saber',
    category: 'Obstetrícia',
    date: '25 Jan 2026',
    readTime: '6 min',
    content: [
      'O Vírus Sincicial Respiratório (VSR) é uma das principais causas de infecções respiratórias em bebês e crianças pequenas. Conhecer os sintomas, fatores de risco e medidas de prevenção é fundamental para proteger os recém-nascidos, especialmente nos primeiros meses de vida.',

      '## O Que é o VSR',
      'O VSR é um vírus que causa infecções no trato respiratório, podendo variar de um simples resfriado a quadros mais graves como bronquiolite e pneumonia. Praticamente todas as crianças são infectadas pelo VSR até os 2 anos de idade, mas em recém-nascidos e prematuros a infecção pode ser mais severa.',

      '## Sintomas no Recém-Nascido',
      'Os sintomas iniciais são semelhantes a um resfriado comum: coriza, espirros, tosse e febre baixa. Em bebês pequenos, os sinais de alerta incluem: dificuldade para respirar (respiração rápida ou com esforço), chiado no peito, recusa alimentar, irritabilidade excessiva, pele azulada (cianose) e pausas respiratórias (apneia).',

      '## Fatores de Risco',
      'Os bebês com maior risco de complicações pelo VSR são: prematuros (nascidos antes de 37 semanas), bebês com menos de 6 meses de idade, crianças com doenças cardíacas ou pulmonares congênitas, bebês com sistema imunológico comprometido, e crianças expostas a fumaça de cigarro.',

      '## Prevenção',
      'As medidas de prevenção incluem: lavar as mãos frequentemente antes de tocar no bebê, evitar contato com pessoas doentes, evitar aglomerações e ambientes fechados nos primeiros meses, manter o aleitamento materno (que transmite anticorpos protetores), manter o ambiente ventilado e limpo, e em casos indicados, utilizar o anticorpo monoclonal (palivizumabe) como profilaxia.',

      '## Quando Procurar Atendimento',
      'Procure atendimento médico imediato se o bebê apresentar: dificuldade para respirar, recusa alimentar persistente, febre alta (acima de 38°C em menores de 3 meses), pele azulada, letargia ou irritabilidade excessiva, ou desidratação (fraldas secas, choro sem lágrimas).',

      '## Tratamento',
      'Não existe tratamento antiviral específico para o VSR. O tratamento é de suporte: hidratação adequada, aspiração nasal, manutenção da oxigenação e, em casos graves, hospitalização com suporte respiratório. A maioria dos casos leves pode ser tratada em casa com acompanhamento médico.',

      '## Considerações Finais',
      'A informação é a melhor forma de proteção. A Dra. Andresa Martin Louzada acompanha gestantes e orienta sobre cuidados com o recém-nascido no Espaço Humanizare em Presidente Prudente. Converse com sua obstetra sobre as medidas de prevenção do VSR, especialmente se seu bebê tem fatores de risco. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'cuidar-voce-amor-proprio': {
    title: 'Cuidar de Você é um Ato de Amor-Próprio',
    category: 'Saúde da Mulher',
    date: '20 Jan 2026',
    readTime: '5 min',
    content: [
      'Em meio à correria do dia a dia, muitas mulheres deixam sua saúde em segundo plano. Cuidar de si mesma não é egoísmo — é um ato essencial de amor-próprio. A saúde da mulher merece atenção em todas as fases da vida, e buscar acompanhamento ginecológico regular é parte fundamental desse cuidado.',

      '## A Mulher e Seus Muitos Papéis',
      'Mãe, profissional, companheira, filha, amiga — a mulher desempenha múltiplos papéis e frequentemente coloca as necessidades dos outros à frente das suas. No entanto, para cuidar bem dos outros, é preciso primeiro cuidar de si mesma. Uma mulher saudável e feliz está mais preparada para enfrentar os desafios do dia a dia.',

      '## Saúde Física e Emocional',
      'A saúde da mulher vai muito além do aspecto físico. O equilíbrio emocional, a autoestima, a satisfação sexual e o bem-estar geral são componentes fundamentais de uma vida plena. O acompanhamento ginecológico regular é uma oportunidade de cuidar de todos esses aspectos.',

      '## Quando Foi Sua Última Consulta?',
      'Se você não lembra quando foi sua última consulta ginecológica, esse é um sinal de que precisa agendar. Os exames de rotina são essenciais para prevenção e detecção precoce de diversas condições. Não espere sentir algo errado para procurar sua ginecologista.',

      '## Dicas de Autocuidado',
      'Pratique o autocuidado diariamente: mantenha uma alimentação equilibrada, pratique exercícios físicos regularmente, durma bem, cuide da sua saúde mental, mantenha relacionamentos saudáveis, reserve tempo para atividades que lhe dão prazer, e faça seus exames de rotina em dia.',

      '## Seu Corpo, Suas Escolhas',
      'Cada mulher é única e suas decisões sobre contracepção, gestação, amamentação e saúde sexual devem ser respeitadas e apoiadas. No consultório, o objetivo é oferecer informação de qualidade para que você possa fazer as melhores escolhas para sua vida.',

      '## Considerações Finais',
      'Cuidar de você é o primeiro passo para uma vida mais plena e feliz. A Dra. Andresa Martin Louzada oferece atendimento ginecológico humanizado e acolhedor no Espaço Humanizare em Presidente Prudente. Agende sua consulta e invista no bem mais precioso que você tem: sua saúde. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'nao-faria-sendo-ginecologista': {
    title: 'O Que Eu Não Faria Sendo Ginecologista',
    category: 'Ginecologia',
    date: '15 Jan 2026',
    readTime: '4 min',
    content: [
      'Como ginecologista, compartilho com minhas pacientes algumas práticas que evito e recomendo que todas as mulheres repensem. São hábitos comuns que podem prejudicar a saúde íntima e o bem-estar geral.',

      '## Duchas Vaginais',
      'A vagina possui um sistema de limpeza natural através de sua flora bacteriana. Duchas vaginais destroem essa flora protetora, alteram o pH vaginal e aumentam o risco de infecções. A limpeza deve ser feita apenas na região externa (vulva) com água e, se necessário, sabonete íntimo de pH adequado.',

      '## Uso de Sabonetes Perfumados na Região Íntima',
      'Perfumes e substâncias químicas presentes em sabonetes comuns podem causar irritação, alergias e desequilíbrio da flora vaginal. Opte por sabonetes íntimos específicos, com pH entre 4,5 e 5,5, sem fragrância forte.',

      '## Autodiagnóstico e Automedicação',
      'Tratar uma infecção vaginal por conta própria, sem diagnóstico adequado, pode mascarar o problema real e agravar a situação. Cada tipo de infecção requer um tratamento específico. A microscopia vaginal no consultório permite diagnóstico preciso e tratamento adequado.',

      '## Deixar de Ir ao Ginecologista',
      'Mesmo sem sintomas, a consulta ginecológica regular é fundamental. Muitas condições, incluindo o câncer de colo do útero em estágio inicial, são assintomáticas. A prevenção é sempre o melhor caminho.',

      '## Usar Roupas Muito Justas Por Longos Períodos',
      'Roupas íntimas sintéticas e muito justas criam um ambiente quente e úmido, propício para o crescimento de fungos e bactérias. Prefira roupas íntimas de algodão e evite ficar longos períodos com roupas de banho molhadas.',

      '## Ignorar Alterações no Ciclo Menstrual',
      'Mudanças significativas no padrão menstrual — como ciclos muito irregulares, sangramento muito intenso, dor excessiva ou ausência de menstruação — sempre merecem investigação médica.',

      '## Considerações Finais',
      'Pequenas mudanças de hábito podem fazer grande diferença na sua saúde íntima. A Dra. Andresa Martin Louzada oferece diagnóstico com microscopia vaginal e orientação personalizada no Espaço Humanizare em Presidente Prudente. Cuide de você e procure sempre orientação profissional. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'ginecologia-geral-saude-feminina': {
    title: 'Ginecologia: O Guia Completo do Cuidado com a Saúde Feminina',
    category: 'Ginecologia',
    date: '04 Mar 2026',
    readTime: '8 min',
    content: [
      'A ginecologia é a especialidade médica dedicada à saúde do sistema reprodutor feminino — abrangendo útero, ovários, trompas e vagina. Mais do que tratar doenças, a ginecologista acompanha a mulher em todas as fases da vida: da adolescência à menopausa, passando pela vida reprodutiva, gestação e pós-menopausa. Entender o que essa especialidade oferece é o primeiro passo para cuidar bem de você.',

      '## Quando Ir à Ginecologista',
      'O acompanhamento ginecológico regular deve começar quando a menina inicia a puberdade ou se tornar sexualmente ativa, em geral entre 13 e 15 anos. A partir daí, consultas anuais são recomendadas mesmo na ausência de sintomas — o chamado check-up ginecológico de rotina. Situações que pedem avaliação imediata incluem: dor pélvica ou abdominal, corrimento com odor ou coloração anormal, sangramento fora do período menstrual, ciclos irregulares, dificuldade para engravidar e qualquer alteração que cause preocupação.',

      '## O Que Acontece na Consulta de Rotina',
      'A consulta ginecológica de rotina inclui anamnese detalhada (histórico de saúde, medicamentos, vida sexual e reprodutiva), exame físico geral, exame ginecológico com coleta do Papanicolau (preventivo do câncer de colo do útero), palpação das mamas, solicitação de exames laboratoriais e de imagem conforme necessidade, orientações sobre contracepção, vacinação (como HPV e hepatite B) e saúde sexual.',

      '## Principais Doenças Tratadas pela Ginecologia',
      'Candidíase e vaginose bacteriana: infecções vaginais muito comuns, com tratamento eficaz quando diagnosticadas corretamente. Endometriose: tecido semelhante ao do endométrio cresce fora do útero, causando dores intensas e possível infertilidade. Síndrome dos ovários policísticos (SOP): desequilíbrio hormonal que afeta o ciclo menstrual, fertilidade e metabolismo. Miomas uterinos: tumores benignos que podem causar sangramento intenso, dor e pressão pélvica. Infecções sexualmente transmissíveis (ISTs): HPV, herpes genital, clamídia, gonorreia, entre outras. Cistos ovarianos: na maioria funcionais e transitórios, mas que merecem acompanhamento. Prolapso uterino: descida do útero em direção ao canal vaginal, mais comum após o parto ou na menopausa.',

      '## Exames Ginecológicos Mais Solicitados',
      'Papanicolau (colpocitologia oncótica): rastreia lesões pré-cancerosas no colo do útero, deve ser feito anualmente a partir da primeira relação sexual. Colposcopia: visualização ampliada do colo do útero para investigar alterações no Papanicolau. Ultrassom pélvico transvaginal: avalia útero, ovários e estruturas pélvicas. Exames hormonais (FSH, LH, estradiol, progesterona, testosterona, TSH): avaliam função ovariana e saúde hormonal. Exames de ISTs: idealmente incluídos no check-up anual de toda mulher sexualmente ativa.',

      '## Saúde Ginecológica em Cada Fase da Vida',
      'Na adolescência, a ginecologista orienta sobre menstruação, sexualidade, contracepção e vacinação. Na vida adulta, o foco é a saúde reprodutiva, prevenção de ISTs, rastreamento de câncer e manejo de doenças crônicas como endometriose e SOP. Durante a gestação, a ginecologista-obstetra conduz o pré-natal. E na perimenopausa e menopausa, cuida dos sintomas e da saúde óssea, cardiovascular e hormonal da mulher.',

      '## A Importância do Atendimento Humanizado',
      'Muitas mulheres adiam consultas ginecológicas por vergonha, medo ou falta de tempo. No Espaço Humanizare, cada consulta é conduzida com respeito, escuta ativa e atenção individualizada. A Dra. Andresa Martin Louzada acredita que quando a mulher se sente acolhida, ela cuida melhor de si mesma — e isso transforma a saúde feminina de dentro para fora.',

      '## Considerações Finais',
      'Cuidar da saúde ginecológica é um ato de amor-próprio. Não espere surgir algum sintoma para agendar sua consulta — a prevenção é sempre o melhor caminho. A Dra. Andresa Martin Louzada atende no Espaço Humanizare em Presidente Prudente, com atendimento humanizado e completo em ginecologia, obstetrícia, DIU, Implanon, pré-natal, menopausa e microscopia vaginal. Este artigo tem caráter informativo e não substitui a avaliação médica individualizada.',
    ],
  },

  'obstetricia-parto-humanizado': {
    title: 'Obstetrícia: Tudo Sobre Gestação, Parto e Pós-Parto',
    category: 'Obstetrícia',
    date: '02 Mar 2026',
    readTime: '9 min',
    content: [
      'A obstetrícia é a especialidade médica que cuida da mulher desde a confirmação da gravidez até o período pós-parto. Muito mais do que acompanhar o bebê, a obstetra zela pela saúde física e emocional da mãe em uma das fases mais transformadoras da sua vida. Entender como funciona esse acompanhamento ajuda a vivê-lo com mais segurança e confiança.',

      '## Os Três Trimestres da Gestação',
      'A gravidez dura em média 40 semanas e é dividida em três trimestres, cada um com características e cuidados específicos. No primeiro trimestre (até 12 semanas) ocorre a formação dos principais órgãos do bebê — é o período mais delicado, com maior risco de aborto espontâneo. Náuseas, cansaço e sensibilidade emocional são comuns. No segundo trimestre (13 a 27 semanas) a maioria das gestantes se sente melhor: a barriga cresce, os movimentos do bebê começam a ser sentidos e as ultrassonografias morfológicas são realizadas. No terceiro trimestre (28 semanas ao parto) o bebê ganha peso e se prepara para o nascimento. A gestante pode sentir desconforto, falta de ar e dificuldade para dormir.',

      '## Consultas e Exames Obstétricos',
      'O Ministério da Saúde recomenda no mínimo 6 consultas de pré-natal, mas o acompanhamento ideal é mais frequente: mensal até a 28ª semana, quinzenal entre 28ª e 36ª, e semanal a partir daí. Os exames solicitados incluem hemograma, tipagem sanguínea, glicemia, sorologias (HIV, sífilis, hepatite, toxoplasmose, rubéola), urina, ultrassonografias (1ª, morfológica do 1º trimestre com translucência nucal, morfológica do 2º trimestre e obstétrica seriada), ecocardiografia fetal e teste de tolerância à glicose (entre 24 e 28 semanas).',

      '## Alimentação e Suplementação na Gestação',
      'Uma dieta variada e nutritiva é fundamental. O ácido fólico deve ser iniciado idealmente antes da concepção e mantido até o fim do 1º trimestre para prevenir defeitos do tubo neural. Ferro é essencial para prevenir anemia, vitamina D e cálcio fortalecem os ossos de mãe e bebê, e o ômega-3 contribui para o desenvolvimento cerebral do bebê. A obstetra orienta sobre cada suplemento de acordo com as necessidades individuais da gestante.',

      '## Tipos de Parto: Normal e Cesária',
      'O parto normal (vaginal) é fisiológico e, quando há condições clínicas favoráveis, é sempre a primeira opção. Oferece recuperação mais rápida, menor risco de complicações cirúrgicas e favorece o estabelecimento do aleitamento materno. A cesária é indicada quando há contraindicações clínicas para o parto vaginal (placenta prévia, sofrimento fetal, má apresentação, entre outras) ou em situações de emergência. A decisão deve ser compartilhada entre a gestante e sua obstetra, respeitando o plano de parto.',

      '## Plano de Parto: Você Tem Voz',
      'O plano de parto é um documento elaborado pela gestante que expressa seus desejos para o momento do nascimento: presença de acompanhante, posições durante o trabalho de parto, uso de analgesia, contato pele a pele imediato, aleitamento na 1ª hora, clampeamento tardio do cordão umbilical, entre outros. Embora não seja juridicamente obrigatório, é amplamente respeitado em maternidades humanizadas. A Dra. Andresa orienta suas pacientes na construção do plano de parto desde o início do pré-natal.',

      '## Parto Humanizado: O Que É e Por Que Importa',
      'O parto humanizado é aquele conduzido com respeito à fisiologia do trabalho de parto, às escolhas da gestante e à sua dignidade. Isso inclui liberdade de movimentação, suporte emocional contínuo, uso racional de intervenções médicas e ambiente acolhedor. Estudos mostram que o suporte contínuo durante o trabalho de parto reduz o tempo de trabalho de parto, diminui o uso de analgesia e aumenta a satisfação materna com a experiência do nascimento.',

      '## Puerpério: Os Cuidados Pós-Parto',
      'O puerpério é o período após o parto, que dura aproximadamente 6 semanas. É um momento de intensa transformação física e emocional. A consulta pós-parto é fundamental para avaliar a recuperação da mãe, o aleitamento materno, o humor (identificando sinais de depressão pós-parto), a saúde do bebê e o planejamento familiar. A Dra. Andresa acompanha suas pacientes nesse período delicado com escuta ativa e cuidado integral.',

      '## Sinais de Alerta na Gestação e Pós-Parto',
      'Busque atendimento imediato se apresentar: sangramento vaginal intenso, dor abdominal severa, perda de líquido amniótico antes da 37ª semana, diminuição dos movimentos fetais, pressão arterial elevada, dor de cabeça intensa, inchaço súbito, febre, sintomas de infecção ou sinais de depressão pós-parto (tristeza intensa, choro sem motivo, dificuldade de vínculo com o bebê).',

      '## Considerações Finais',
      'A gestação é única para cada mulher. Ter uma obstetra de confiança ao seu lado faz toda a diferença para vivê-la com segurança e tranquilidade. A Dra. Andresa Martin Louzada acompanha gestações com pré-natal humanizado e parto respeitoso no Espaço Humanizare em Presidente Prudente. Agende sua consulta e inicie o acompanhamento o quanto antes. Este artigo tem caráter informativo e não substitui a consulta médica individualizada.',
    ],
  },
};

export const defaultArticle: Article = {
  title: 'Artigo Informativo',
  category: 'Saúde da Mulher',
  date: 'Fev 2026',
  readTime: '5 min',
  content: [
    'Este é um artigo informativo sobre saúde da mulher. O conteúdo completo será disponibilizado em breve.',
    'Para mais informações, entre em contato com a Dra. Andresa Martin Louzada.',
    'Este artigo tem caráter informativo e não substitui a consulta médica.',
  ],
};

// Helper: array of articles with slug and excerpt for listing pages
export interface ArticleWithSlug extends Article {
  slug: string;
  excerpt: string;
}

export const articlesList: ArticleWithSlug[] = Object.entries(articles).map(([slug, article]) => ({
  ...article,
  slug,
  excerpt: article.content[0] || '',
}));

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
      'O pré-natal é o melhor presente que uma mãe pode dar ao seu bebê antes mesmo dele nascer. Agende sua consulta e inicie esse cuidado o quanto antes. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'A microscopia vaginal é um exame simples, rápido e extremamente útil na prática ginecológica. Se você apresenta qualquer sintoma vaginal, agende sua consulta para um diagnóstico preciso e imediato. Este artigo tem caráter informativo e não substitui a consulta médica.',
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

      '## Ginecologia Regenerativa na Menopausa',
      'Procedimentos de ginecologia regenerativa, como o laser íntimo e o ácido hialurônico, podem ser excelentes aliados no tratamento da atrofia vaginal e da incontinência urinária associadas à menopausa. Esses tratamentos ajudam a restaurar a hidratação, elasticidade e funcionalidade dos tecidos vaginais.',

      '## Cuidados com a Saúde Óssea',
      'Após a menopausa, a diminuição do estrogênio acelera a perda de massa óssea, aumentando o risco de osteoporose. A densitometria óssea deve ser realizada periodicamente, e medidas preventivas incluem: suplementação de cálcio e vitamina D, exercícios físicos regulares (especialmente musculação), e tratamento hormonal quando indicado.',

      '## Alimentação e Exercícios',
      'Uma alimentação equilibrada, rica em cálcio, vitamina D, fitoestrógenos (soja, linhaça) e ômega-3 contribui para o bem-estar na menopausa. Exercícios físicos regulares ajudam a controlar o peso, fortalecer os ossos, melhorar o humor e a qualidade do sono.',

      '## Saúde Mental e Emocional',
      'A menopausa pode trazer desafios emocionais significativos. É fundamental que a mulher se sinta acolhida e amparada nessa fase. O acompanhamento psicológico pode ser benéfico, assim como práticas de mindfulness, yoga e atividades que promovam o bem-estar emocional.',

      '## Considerações Finais',
      'A menopausa não é o fim, é uma nova fase. Com acompanhamento médico adequado, é possível viver com qualidade, saúde e plenitude. Agende sua consulta para um acompanhamento personalizado. Este artigo tem caráter informativo e não substitui a consulta médica.',
    ],
  },

  'ginecologia-regenerativa': {
    title: 'Ginecologia Regenerativa: Inovação no Cuidado Feminino',
    category: 'Ginecologia Regenerativa',
    date: '10 Fev 2026',
    readTime: '6 min',
    content: [
      'A Ginecologia Regenerativa é uma área inovadora da medicina que utiliza técnicas avançadas para restaurar, regenerar e rejuvenescer os tecidos da região íntima feminina. Esses procedimentos oferecem soluções eficazes para queixas que afetam a qualidade de vida de muitas mulheres.',

      '## O Que é Ginecologia Regenerativa',
      'A ginecologia regenerativa engloba um conjunto de procedimentos minimamente invasivos que visam melhorar a saúde e a funcionalidade da região genital feminina. Utiliza tecnologias como laser, radiofrequência, ácido hialurônico e plasma rico em plaquetas (PRP) para estimular a regeneração tecidual.',

      '## Principais Indicações',
      'Os procedimentos de ginecologia regenerativa são indicados para: atrofia vaginal (secura vaginal), incontinência urinária leve a moderada, frouxidão vaginal, disfunções sexuais, líquen escleroso, e rejuvenescimento íntimo. Essas queixas são comuns especialmente após o parto, na menopausa e em decorrência do envelhecimento natural.',

      '## Tecnologias Utilizadas',
      'O laser íntimo (CO2 fracionado) é uma das tecnologias mais utilizadas, promovendo a regeneração do colágeno e elastina dos tecidos vaginais. A radiofrequência íntima aquece as camadas mais profundas dos tecidos, estimulando a produção de colágeno. O ácido hialurônico pode ser aplicado para hidratar e preencher os tecidos. O PRP utiliza fatores de crescimento do próprio sangue da paciente para estimular a regeneração.',

      '## Benefícios dos Tratamentos',
      'Os tratamentos regenerativos proporcionam melhora da lubrificação vaginal, aumento da elasticidade dos tecidos, redução da incontinência urinária, melhora da sensibilidade e prazer sexual, e maior conforto e autoestima para a mulher.',

      '## O Procedimento',
      'Os procedimentos são realizados no próprio consultório, com duração média de 15 a 30 minutos. São minimamente invasivos, com pouco ou nenhum desconforto, e geralmente não exigem período de recuperação significativo. A paciente pode retomar suas atividades normais rapidamente.',

      '## Considerações Finais',
      'A ginecologia regenerativa representa um avanço significativo no cuidado da saúde feminina. Se você tem queixas relacionadas à saúde íntima, agende uma consulta para avaliar as opções de tratamento. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'Não espere ter sintomas para procurar sua ginecologista. A prevenção e o diagnóstico precoce salvam vidas. Agende sua consulta de rotina. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'Não tenha vergonha de falar sobre odor íntimo com sua ginecologista. É uma queixa comum e geralmente de fácil resolução. Agende sua consulta. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'A contracepção de emergência é um recurso importante, mas deve ser usada com consciência. Agende uma consulta para discutir planejamento contraceptivo e escolher o melhor método para você. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'A informação é a melhor forma de proteção. Converse com sua obstetra ou pediatra sobre as medidas de prevenção do VSR, especialmente se seu bebê tem fatores de risco. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'Cuidar de você é o primeiro passo para uma vida mais plena e feliz. Agende sua consulta e invista no bem mais precioso que você tem: sua saúde. Este artigo tem caráter informativo e não substitui a consulta médica.',
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
      'Pequenas mudanças de hábito podem fazer grande diferença na sua saúde íntima. Cuide de você e procure sempre orientação profissional. Este artigo tem caráter informativo e não substitui a consulta médica.',
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

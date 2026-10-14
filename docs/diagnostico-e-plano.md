# Diagnóstico e plano — 14/10/2026

## Escopo e evidências

Inventário do diretório e leitura de todos os sete arquivos de aplicação/documentação existentes: index.html, README.md, três scripts e dois estilos. Pastas assets inspecionadas; só há .gitkeep em quatro pastas de imagens. .analysis-tools e analysis-convite são ferramentas/evidências da investigação anterior, não dependências do site.

REA analyze_javascript_application executado sobre js/, em modo directory/summary. Evidence pai: ev_a309821b24b40743f387907e23f96be3611a719b47e250df74a637063a9e7eb3. Evidence da visão: ev_a3ab29fc913b309170857d99f57a17523b0f289fa4caa9bde483d51667a6bda1. Bundle local: ../analysis-convite/project-rea-evidence.json.

Resultado: três arquivos JS analisados, 11.674 bytes de texto, 1.592 nós AST, zero falhas de parsing. Zero módulos reconhecidos pelo extrator não significa ausência de organização: são scripts clássicos, sem import/export. Há 315 incógnitas semânticas e cobertura semântica unknown. Zero findings não certifica ausência de defeitos. O REA não executou a página. HTML, CSS, pastas e dependências abaixo foram verificados pela leitura local, fora desse escopo REA.

## Arquitetura existente

- index.html: entrada, seções e carregamento defer em ordem config → content → script.
- js/config.js: dados e textos de INVITE_CONFIG, compartilhado entre scripts clássicos.
- js/content.js: renderização com textContent, programação, datas, Google Maps, Google Calendar, WhatsApp e presentes. URLs limitadas a HTTP/HTTPS.
- js/script.js: estados closed/opening/revealing/opened, bloqueio da rolagem, foco, abertura por fragmento, skip link e IntersectionObserver.
- css/style.css: tokens, layout fluido, envelope em CSS, foco e estilos das seções.
- css/animations.css: sequência do envelope, entrada da capa, revelação na rolagem e redução de movimento.
- assets/images/{envelope,decor,venue,couple}: reservadas, sem imagens reais. assets/{audio,fonts,icons}: vazias, não versionadas.

Sem package.json, bibliotecas de produção, servidor, banco ou build. Serviços externos são destinos de links; não há integração de API de confirmação. Abrir WhatsApp não registra uma presença no projeto.

## Pendências confirmadas

1. Imagens, florais, monograma e fotografia/ilustração ainda não fornecidos nem integrados.
2. Agenda aponta para Finess buffet; mapa e seção de local apontam para igreja. Pode ser intencional, mas exige definição explícita de cerimônia/recepção.
3. Término provisório, programação sem horários e traje a definir. Presentes sem URL; botão oculto, seção e mensagem continuam visíveis.
4. Loading reservado e oculto, sem controlador. Não é necessário ativá-lo antes de existir uma carga real a aguardar.
5. Não há FAQ, áudio ou controles de música. São capacidades ausentes, não requisitos confirmados.
6. Datas inválidas podem interromper content.js em Intl.DateTimeFormat; configuração não tem validação em runtime.
7. Não foram encontrados testes versionados ou configuração de publicação. Falta validar comportamento real em navegadores, telas pequenas e teclado.

## Alinhamento disponível

O resumo fornecido pelo usuário foi recebido e preservado em [requisitos.md](requisitos.md). Ele confirma HTML/CSS/JavaScript puro, desenvolvimento incremental, RSVP externo na primeira versão e separação de responsabilidades. Música e FAQ não são obrigatórios: o requisito é uma seção de informações adicionais. Backend e formatos de calendário além do Google são evoluções futuras.

O vídeo analisado anteriormente serve somente como referência visual. Não prova tecnologia, destinos de botões ou backend. Os dados definitivos do evento e as imagens ainda não foram fornecidos pelo resumo.

## Plano de implementação

1. Consolidar requisitos recebidos e dados reais em js/config.js. Se houver cerimônia e recepção, modelar ambos com endereços e horários próprios; ajustar content.js e index.html.
2. Fortalecer a validação: scripts/check-config.cjs já adicionado para verificação local; depois adicionar fallbacks de datas no content.js para evitar interrupção de toda a renderização.
3. Integrar identidade visual nos arquivos existentes, com imagens entregues em assets, dimensões explícitas e alt apropriado. Preservar redução de movimento e acesso por teclado.
4. Se confirmado, implementar FAQ com details/summary, dados configuráveis e estilos existentes. Áudio só se solicitado, com controle e início por gesto do visitante.
5. Definir se RSVP por WhatsApp atende. Persistência e painel exigem novo escopo de backend; não presumir que são necessários.
6. Testar abertura, skip link, fragmentos, rolagem, foco, redução de movimento, URLs e tamanhos móveis. Só então preparar publicação conforme destino definido.

Primeira entrega independente dos requisitos: verificador local sem dependências de npm, documentação do diagnóstico e exclusão de ferramentas/evidências locais no Git. Nenhuma alteração visual ou nos dados do casal foi feita nesta etapa.

## Etapa 2 — organização conforme os requisitos recebidos

Checkpoint local anterior às alterações: `analysis-convite/checkpoint-before-modules-20261014-103910.zip`, incluindo os arquivos da etapa anterior. Commit de base: `3dd3377`. O checkpoint e as evidências locais não integram o repositório; estão excluídos pelo `.gitignore`.

- CSS separado em variables, reset, style, envelope, responsive e animations. Regras e valores preservados; movimento reduzido continua por último na cascata.
- script.js dividido em envelope.js e animations.js; links extraídos de content.js para links.js.
- main.js inicializa renderização → links → envelope → observador. content.js permanece como responsabilidade adicional útil, além dos nomes sugeridos.
- Scripts clássicos e defer preservados: não é necessário servidor, bundler ou framework. Nenhuma dependência de produção adicionada.
- Testes Node cobrem URLs geradas, override de RSVP, presentes opcionais, protocolos rejeitados, calendário que termina no dia seguinte e ordem de inicialização.

Validação desta entrega: seis testes automatizados aprovados; scripts sem erros de sintaxe; 12 referências locais do HTML verificadas; regras CSS e lógica do envelope/observador conferidas contra o checkpoint. O verificador de configuração reportou zero erros e dois avisos (locais diferentes e dados provisórios).

### Matriz de alinhamento após esta etapa

| Requisito | Estado |
| --- | --- |
| HTML/CSS/JS puro e configuração por cliente | Implementado |
| Separação de arquivos por responsabilidade | Implementada nesta etapa |
| Envelope, bloqueio, abertura, hero e rolagem | Código preservado; teste visual pendente |
| Links Maps/RSVP/presentes/Google Calendar | Implementados; geração testada localmente |
| Informações adicionais | Próxima seção a implementar |
| Ilustração do local e monograma/assinatura visual | Integração pendente; assets ainda ausentes |
| Loading | Opcional; mantido oculto enquanto desnecessário |
| Acessibilidade e redução de movimento | Suporte existente; auditoria prática pendente |
| 320/375/390/430/768/desktop e landscape | CSS existente; matriz de testes pendente |
| Safari/iPhone/Android | Não verificados nesta sessão |
| Dados finais do evento | Locais divergentes e textos provisórios continuam pendentes |

Próximo incremento: informações adicionais configuráveis e pontos opcionais para ilustração do local e assinatura visual, ocultos quando não configurados. Em seguida, integração dos assets reais e revisão responsiva. A versão ainda não atende a todos os critérios de aceite.

### Verificação manual desta etapa

1. Abrir index.html: envelope visível e página bloqueada para rolagem.
2. Acionar o lacre com clique ou Enter; repetir durante a abertura. Deve ocorrer apenas uma sequência, sem recarregar.
3. Conferir aba, carta, desaparecimento do envelope, entrada da capa e liberação da rolagem.
4. Usar Tab, link de pular e abrir index.html#local. Conferir foco e acesso direto.
5. Ativar movimento reduzido no sistema e repetir; a introdução deve ser simplificada.
6. Conferir os links e as larguras exigidas. Presentes permanece oculto enquanto sua URL estiver vazia.

Não houve teste visual automatizado: o controle de navegador disponível retornou lista vazia de navegadores. Os testes Node usam elementos mínimos em memória para links, não simulam layout, acessibilidade ou animações reais.

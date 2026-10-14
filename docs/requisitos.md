# REA — Convite Digital Interativo

## 1. OBJETIVO DO PROJETO

Desenvolver um convite digital interativo, elegante e mobile-first, com experiência semelhante a uma papelaria fina animada.

O convite deve funcionar como uma mini página web para celular, começando com um envelope fechado e evoluindo para uma página vertical com informações do evento, animações suaves e botões interativos.

Tecnologias principais:

- HTML5
- CSS3
- JavaScript puro
- sem frameworks na primeira versão
- Git para versionamento
- desenvolvimento no VS Code com apoio do Codex

Priorizar:

- simplicidade;
- performance;
- responsividade;
- facilidade de manutenção;
- facilidade de reutilização para outros clientes.

---

## 2. FLUXO PRINCIPAL DA EXPERIÊNCIA

Ao acessar a página:

1. exibir uma tela inicial com envelope fechado;
2. mostrar um lacre de cera central;
3. bloquear inicialmente a rolagem da página;
4. ao tocar/clicar no lacre:
   - impedir cliques repetidos;
   - animar o lacre;
   - abrir a aba do envelope;
   - fazer a carta subir;
   - remover suavemente o envelope;
   - revelar o conteúdo principal;
   - liberar o scroll;
5. o visitante passa a navegar verticalmente pelo convite;
6. elementos surgem suavemente durante a rolagem;
7. botões permitem executar ações externas.

Não recarregar a página durante a abertura.

---

## 3. SEÇÕES DO CONVITE

Estruturar o HTML semanticamente com estas áreas:

1. loading inicial, se necessário;
2. abertura com envelope;
3. hero/capa;
4. mensagem de boas-vindas;
5. data e horário;
6. local do evento;
7. ilustração do local;
8. programação;
9. dress code;
10. informações adicionais;
11. lista de presentes;
12. confirmação de presença;
13. botão de calendário;
14. encerramento;
15. monograma ou assinatura visual final.

---

## 4. DIREÇÃO VISUAL

Estética:

- elegante;
- romântica;
- minimalista;
- editorial;
- inspirada em papelaria fina de casamento.

Usar:

- fundo off-white;
- bege e cinza quente;
- verde oliva muito suave, quando necessário;
- bastante espaço em branco;
- tipografia serifada elegante para títulos;
- tipografia simples e altamente legível para textos;
- caligrafia apenas em pequenos destaques;
- ornamentos discretos;
- ilustrações line art;
- botões delicados.

Evitar:

- sombras fortes;
- efeitos exagerados;
- gradientes chamativos;
- bounce;
- zoom excessivo;
- aparência de aplicativo;
- excesso de elementos animados.

---

## 5. MOBILE-FIRST

O convite deve ser desenvolvido primeiro para smartphone.

Validar especialmente:

- 320 px;
- 375 px;
- 390 px;
- 430 px;
- 768 px;
- desktop.

Garantir:

- nenhum scroll horizontal;
- imagens responsivas;
- tipografia legível;
- botões com áreas de toque adequadas;
- espaçamentos consistentes;
- funcionamento em portrait e landscape;
- boa experiência em Android e iPhone.

---

## 6. ESTRUTURA DE ARQUIVOS DESEJADA

Estrutura recomendada:

CONVITE-DIGITAL/

index.html

css/
- reset.css
- variables.css
- style.css
- envelope.css
- animations.css
- responsive.css

js/
- config.js
- envelope.js
- animations.js
- links.js
- main.js

assets/
- images/
- icons/
- fonts/
- audio/

README.md
.gitignore

Manter responsabilidades separadas.

HTML = estrutura.

CSS = aparência e animações.

JavaScript = estados, eventos e comportamento.

---

## 7. CONFIGURAÇÃO CENTRALIZADA

Criar um arquivo:

js/config.js

Todas as informações variáveis do convite devem ficar centralizadas nele.

Exemplo de dados:

- nomes;
- data;
- horário;
- local;
- endereço;
- texto principal;
- programação;
- dress code;
- links;
- Google Maps;
- RSVP;
- lista de presentes;
- calendário;
- WhatsApp.

Objetivo:

permitir duplicar o projeto para outro cliente alterando principalmente config.js e os assets.

Não inserir lógica de animação em config.js.

---

## 8. ENVELOPE

Estruturar o envelope em camadas independentes:

- envelope-container;
- envelope-back;
- invitation-card;
- envelope-front;
- envelope-flap;
- wax-seal.

Preferir controle por classes.

Exemplo:

.envelope.open

O JavaScript deve apenas alterar estados/classes.

Evitar manipulação extensa de CSS diretamente via JavaScript.

Preferir:

element.classList.add("open");

em vez de alterar transform, opacity, top etc. individualmente no JS.

---

## 9. ANIMAÇÃO DE ABERTURA

Sequência esperada:

lacre
→
aba do envelope
→
carta
→
transição
→
conteúdo principal.

Comportamento:

1. lacre recebe interação;
2. lacre reduz levemente e desaparece;
3. aba abre;
4. carta sobe;
5. pequena pausa visual;
6. envelope desaparece;
7. hero aparece;
8. scroll é liberado.

Usar preferencialmente:

- CSS transitions;
- CSS animations;
- transform;
- opacity.

Evitar animações baseadas em propriedades custosas como top/left quando transform puder ser utilizado.

---

## 10. ANIMAÇÕES DE SCROLL

Usar IntersectionObserver.

Fluxo:

elemento inicialmente:

opacity: 0;
transform: translateY(...);

Ao entrar na viewport:

adicionar classe .visible.

Resultado:

opacity: 1;
transform: translateY(0).

Usar animações suaves, aproximadamente entre 600 e 900 ms.

Não animar absolutamente tudo.

Priorizar:

- títulos;
- textos principais;
- ilustrações;
- blocos especiais.

---

## 11. ACESSIBILIDADE

Implementar:

- HTML semântico;
- alt em imagens relevantes;
- aria-label em botões quando necessário;
- foco visível;
- navegação por teclado;
- contraste adequado;
- áreas clicáveis confortáveis.

Respeitar:

prefers-reduced-motion.

Usuários que preferem menos movimento devem receber uma experiência simplificada.

---

## 12. INTERAÇÕES

### Como chegar

Criar botão para abrir Google Maps.

Abrir em nova aba quando apropriado.

Dados devem vir de config.js.

### RSVP

Primeira versão pode usar:

- WhatsApp;
- Google Forms;
- formulário externo.

Possível evolução futura:

- Supabase;
- Firebase;
- backend próprio.

### Presentes

Abrir lista externa ou página própria.

### Calendário

Criar botão para adicionar o evento ao calendário.

Priorizar inicialmente:

- Google Calendar.

Preparar arquitetura para futuramente suportar:

- arquivo .ics;
- Apple Calendar;
- Outlook.

---

## 13. ASSETS

Organização sugerida:

assets/images/

envelope/
- envelope-back.webp
- envelope-front.webp
- flap.webp
- wax-seal.webp

decor/
- floral-top.webp
- floral-bottom.webp
- branch-01.webp
- branch-02.webp

venue/
- venue.webp

couple/
- illustration.webp

branding/
- monogram.svg
- logo.svg

Usar preferencialmente:

- SVG para ícones, monogramas e desenhos vetoriais;
- WebP para imagens maiores;
- imagens comprimidas;
- lazy loading quando fizer sentido.

---

## 14. PERFORMANCE

Priorizar:

- JavaScript mínimo;
- poucas dependências;
- imagens otimizadas;
- carregamento rápido em rede móvel;
- animações usando transform e opacity;
- evitar bibliotecas externas sem necessidade.

Não adicionar frameworks apenas por conveniência.

Qualquer nova dependência deve ser justificada.

---

## 15. QUALIDADE DO CÓDIGO

Requisitos:

- nomes de classes claros;
- funções pequenas;
- responsabilidades separadas;
- evitar código duplicado;
- evitar números mágicos;
- comentários apenas quando agregarem contexto;
- código simples antes de código excessivamente abstrato.

Não fazer overengineering.

---

## 16. GIT

Usar Git desde o início.

Criar commits por marcos importantes.

Exemplos:

- estrutura inicial;
- layout base;
- envelope;
- animação de abertura;
- animações de scroll;
- links interativos;
- configuração centralizada;
- ajustes responsivos;
- correções finais.

Antes de mudanças grandes, garantir que exista um checkpoint utilizável.

---

## 17. PROCESSO DE DESENVOLVIMENTO

Não tentar construir tudo em uma única tarefa.

Desenvolver nesta ordem:

1. analisar arquitetura existente;
2. estruturar HTML;
3. implementar CSS base;
4. implementar sistema responsivo;
5. construir envelope;
6. implementar abertura;
7. implementar transição para o convite;
8. criar animações de scroll;
9. implementar links e ações;
10. centralizar dados em config.js;
11. revisar acessibilidade;
12. revisar responsividade;
13. otimizar performance;
14. testar;
15. executar code review final.

---

## 18. MODO DE TRABALHO DO AGENTE

Antes de alterações grandes:

- analisar arquivos existentes;
- entender o estado atual;
- evitar reescrever código funcional sem necessidade;
- informar brevemente o plano.

Ao implementar:

- fazer mudanças incrementais;
- preservar a identidade visual;
- evitar alterações fora do escopo;
- validar se a funcionalidade continua funcionando.

Depois de cada etapa importante, informar:

- arquivos alterados;
- o que foi implementado;
- decisões relevantes;
- possíveis pendências;
- como testar manualmente.

---

## 19. TESTES MÍNIMOS

Validar:

- envelope abre;
- lacre responde apenas uma vez;
- aba abre corretamente;
- carta sobe corretamente;
- scroll fica bloqueado antes da abertura;
- scroll é liberado depois;
- hero aparece corretamente;
- animações de scroll funcionam;
- Maps abre;
- RSVP abre;
- presentes abre;
- calendário funciona;
- links não estão quebrados;
- não existe overflow horizontal;
- imagens não distorcem;
- conteúdo funciona sem JavaScript crítico quebrado;
- Android funciona;
- iPhone funciona;
- Chrome funciona;
- Safari funciona.

---

## 20. CRITÉRIOS DE ACEITE

Considerar a primeira versão pronta quando:

- a abertura do envelope estiver fluida;
- o convite estiver totalmente navegável em celular;
- todas as seções estiverem implementadas;
- dados do cliente estiverem centralizados;
- botões externos funcionarem;
- não houver erros evidentes no console;
- não houver overflow horizontal;
- a experiência funcionar em diferentes tamanhos de tela;
- animações respeitarem prefers-reduced-motion;
- código estiver organizado para reutilização.

---

## 21. PRIORIDADE DO PROJETO

Prioridade principal:

experiência mobile elegante + manutenção simples.

Em caso de conflito, priorizar nesta ordem:

1. funcionamento;
2. mobile;
3. legibilidade;
4. performance;
5. acessibilidade;
6. consistência visual;
7. animações;
8. efeitos decorativos.

Nunca sacrificar usabilidade ou performance apenas para adicionar um efeito visual.

---

## 22. PRIMEIRA AÇÃO DO AGENTE

Ao receber estas instruções:

1. analisar todo o repositório;
2. listar a estrutura atual;
3. identificar o que já está implementado;
4. comparar com estes requisitos;
5. apontar lacunas;
6. propor o próximo conjunto pequeno de alterações;
7. somente então iniciar a implementação.

Não recriar o projeto do zero caso já exista código utilizável.
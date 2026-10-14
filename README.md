# Convite digital

Abra `index.html` no navegador. Não há dependências ou etapa de compilação.

## Verificar os dados antes de publicar

Com Node.js instalado, execute `node scripts/check-config.cjs`. O verificador
confere datas reais, horários, ordem de início/término, fuso, URLs e telefone.
Avisos destacam dados provisórios e diferenças entre os locais da agenda e do mapa.
Node é usado somente nessa verificação; o site continua funcionando sem build.
O comando avalia o arquivo local `js/config.js`; use somente código confiável do projeto.

O diagnóstico, as limitações das evidências REA e o plano estão em
[`docs/diagnostico-e-plano.md`](docs/diagnostico-e-plano.md).

## Personalizar para outro cliente

Edite **`js/config.js`**, que contém o objeto `INVITE_CONFIG`:

- `couple`: nomes. Use `{couple}` nos textos para inserir os dois automaticamente.
- `page`: título da aba e descrição da página.
- `event`: título, data (`AAAA-MM-DD`), hora (`HH:mm`), fuso IANA e local da agenda. O término às 20h é provisório. `endDate` vazio usa a data inicial; para terminar no dia seguinte, preencha a data correspondente.
- `venue`: local exibido no convite e usado para gerar o mapa. Atualmente a igreja está aqui, enquanto `event.location` mantém o buffet informado para a agenda. Se for um único local, atualize ambos.
- `links`: URLs completas opcionais para mapa, confirmação e presentes. Mapa e WhatsApp são gerados automaticamente quando seus links estão vazios. A lista de presentes só aparece quando sua URL é preenchida.
- `rsvp`: telefone internacional só com dígitos, mensagem e prazo opcional. `{couple}` também funciona na mensagem.
- `schedule`: itens da programação; adicione ou remova objetos. Uma lista vazia oculta a seção.
- `texts` e `buttons`: mensagens, títulos de seções e rótulos dos botões.

`js/content.js` preenche o HTML usando `textContent` e formata datas.
`js/links.js` gera os links externos, `js/envelope.js` controla a abertura e
`js/animations.js` controla as entradas na rolagem. `js/main.js` inicializa essas
responsabilidades em ordem, depois do HTML. As funções ficam em `window.InviteApp`;
são scripts clássicos com `defer`, mantendo a abertura direta de `index.html`.

O CSS é carregado em ordem: `variables.css` (tokens), `reset.css` (base),
`style.css` (seções), `envelope.css` (camadas), `responsive.css` (telas) e
`animations.css` (movimento e preferência de movimento reduzido).

Execute `node --test tests/links.test.cjs` para verificar os destinos gerados e
a ordem de inicialização. Esses testes não substituem testes de layout e
animação no navegador.

O HTML contém textos genéricos de fallback. Os dados personalizados e links precisam de JavaScript; não é necessário repetir os dados do cliente no HTML.

## Imagens e ícones

As pastas estão preparadas. Os nomes abaixo são o padrão para os arquivos que serão adicionados; as imagens ainda não foram fornecidas.

```text
assets/
├── icons/                     # Ícones em SVG
└── images/
    ├── logo.png
    ├── monograma.svg
    ├── envelope/
    │   ├── envelope-back.webp
    │   ├── envelope-front.webp
    │   ├── flap.webp
    │   └── wax-seal.webp
    ├── decor/
    │   ├── floral-top.webp
    │   ├── floral-bottom.webp
    │   ├── branch-01.webp
    │   └── branch-02.webp
    ├── venue/
    │   └── church.webp
    └── couple/
        └── illustration.webp
```

- Use **SVG** para ícones, monogramas e desenhos de traço (line art). Se os ramos ou florais forem vetoriais, prefira `.svg` nesses arquivos também.
- Use **WebP** para fotografias, ilustrações rasterizadas e imagens maiores, preservando transparência quando necessário.
- `logo.png` pode ser usado quando o logo for entregue nesse formato; prefira `logo.svg` se houver uma versão vetorial.
- Exporte para o formato correto: renomear a extensão não converte uma imagem.
- Ao inserir imagens no HTML, defina dimensões e texto alternativo descritivo; para decoração, use `alt=""`. Imagens abaixo da capa podem usar `loading="lazy"`.

Os arquivos `.gitkeep` preservam as pastas vazias no Git. O envelope continua desenhado em CSS até que os recursos visuais sejam adicionados e integrados.

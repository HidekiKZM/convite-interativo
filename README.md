# Convite digital

Abra `index.html` no navegador. Não há dependências ou etapa de compilação.

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

`js/content.js` preenche o HTML usando `textContent`, formata datas e gera links. `js/script.js` controla envelope e rolagem. CSS e animações permanecem em `css/`.

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

# Site consolidado — hotelcalleb.com.br

Pasta `hmx-copy-hotelcalleb.com.br`, reunida de https://hotelcalleb.com.br (1 páginas lidas).

Um site com informação espalhada por várias páginas foi reduzido ao material de
**uma** landing page. Isso não é migração, é decisão editorial: boa parte do
texto vai desaparecer, e o que sobra precisa caber num bloco em vez de numa
página inteira.

## Comece por aqui

1. `site-map.md` — o que entrou, o que saiu e por quê;
2. `briefing.md` — o arco proposto e os dois erros previsíveis nesse tipo de
   consolidação;
3. `copy-structure.md` — a copy crua, já organizada em arco de LP e não na
   ordem do menu antigo;
4. `paginas/` — cada página preservada inteira, caso você precise resgatar algo.

## O que foi feito automaticamente

- **0 bloco(s) de cromo removidos** — menu, rodapé e faixas de CTA
  que se repetiam em quase toda página. Sem isso o mesmo texto apareceria uma vez
  por página na copy;
- **0 grupo(s) de páginas irmãs colapsados** — várias páginas com o
  mesmo papel (seis serviços, por exemplo) viram **uma** seção com N itens, não N
  seções. É a operação que transforma um site em LP em vez de empilhar páginas;
- **0 página(s) excluídas** — blog e jurídico, listadas no
  `site-map.md`. A copy delas continua em `paginas/`.

## Próximo passo

Rode o `COPY_PROMPT.md` **antes** de gerar HTML. A copy aqui foi escrita para
páginas onde cada texto tinha espaço inteiro para respirar; numa LP ela precisa
ser redimensionada. Se você já tem uma direção criativa extraída, o
`copy-skeleton.md` dela diz exatamente os tamanhos.

Salve o retorno como `copy-final.md` **nesta pasta**.

## Limites

- 1 de 1 páginas tinham conteúdo aproveitável;
- o que não couber na LP mas for necessário para vender deve virar **link** para
  uma página que continua existindo — não corte informação essencial só para
  caber;
- revise os direitos de uso antes de reaproveitar textos e imagens.

# Trabalho de redesign — teste

Pasta `hmx-trabalho-teste`. Pacote pronto para uma IA de código: abra a pasta e leia
o `STARTER.md`.

## O cruzamento

| | de onde vem | o que decide |
|---|---|---|
| **estilo** | A: `hmx-style-hotelcalleb.com.br` (base) | a receita final escolhe paleta, tipografia, espaçamento, botões, layout e movimento |
| **molde da copy** | `hmx-style-hotelcalleb.com.br` | quantas seções, quantos blocos, de que tamanho cada um |
| **conteúdo** | `hmx-copy-hotelcalleb.com.br` | promessa, textos, provas, CTAs, formulários |
| **forma de saída** | destino **HTML único** | em que arquivos isso vira código |
| **tipo de página** | **Landing page** | o arco, os componentes e o formato da página |

O destino só muda a **saída**. A referência medida e a copy são as mesmas em
qualquer stack — trocar de destino não pede re-extrair nada.

Estilo e conteúdo são independentes — esta `referencia/` pode ser reaproveitada
em quantos trabalhos você quiser, cada um com um `alvo/` diferente.

O **molde** é o que faz os dois se encaixarem: ele vem junto com o estilo porque
descreve as proporções deste layout, e é contra ele que a copy nova é
dimensionada. Sem molde, texto e layout se contradizem.

## O que tem aqui

- `STARTER.md` — briefing executável: como fundir estilo + copy;
- `PROMPT_TEMPLATE.md` — contrato de saída do destino
  **HTML único** (organização, nunca estilo);
- `TIPO-DE-PAGINA.md` — as regras do tipo **Landing page**
  (arco, componentes e formato);
- `FRAMEWORK-COPY.md` — a inteligência de persuasão da página (níveis de
  consciência, 17 seções, diagnóstico tático, sequências, checklist);
- `RASTREAMENTO.md` — Pixel/GA4/Clarity/GTM já preparados para esta stack;
- `COPY_PROMPT.md` — **rode antes de gerar o HTML.** Cole-o numa IA junto
  com os arquivos de `alvo/` **e o `referencia/copy-skeleton.md`**, salve o
  retorno como `alvo/copy-final.md`. Pular este passo entrega à geração
  exatamente os vícios que ele existe para corrigir.
- `referencia/` — `RECEITA-VISUAL.md` + `receita-visual.json` (direção final,
  autoritativa), `design-direction.md` (medição da base),
  `copy-skeleton.md` (o molde da copy), `animations.md` e
  `animations-observed.md` (movimento), `source.css`, `analysis.json`,
  `screenshots/manifest.json` + `screenshots/sections/` (recorte exato de
  cada seção) + `sequences/` (quadros das seções presas ao scroll). Os hovers,
  fundos e galerias escolhidos no catálogo global viajam como snapshots inertes
  em `receita-visual.json.recipe.patterns`, inclusive quando vêm de fora de A/B/C;
- `alvo/` — briefing e copy (ou o questionário);
- `assets/` — imagens reaproveitáveis (insumo);
- `js/` — GSAP vendado (insumo, a IA copia para `site/js/`);
- `qualidade/` — as regras que valem em todo trabalho: `PADROES-PROIBIDOS.md` (o
  sotaque de IA e o substituto de cada tique), `RESPONSIVIDADE.md` (a grade que
  reorganiza em vez de espremer), `PERFORMANCE-SEO.md` (orçamento decidido no
  começo, não depois do PageSpeed) e `verificar.mjs`, que a IA roda sobre
  `site/` antes de dizer que terminou;
- `site/` — **a entrega**, criada pela IA. É o projeto final; o resto é insumo.
  Sai com `DECISOES.md` dentro, listando o que a IA acrescentou, reescreveu e
  marcou `[MOCK]` — para você aceitar ou remover item a item.

## Como usar

1. Abra esta pasta numa IA de código que leia arquivos do projeto;
2. ela lê o `STARTER.md` e cria a pasta **`site/`** com `index.html`, CSS, `js/` e as imagens;
3. abra `site/index.html` e edite. Para publicar, suba só a pasta `site/`.

Se quiser conferir por conta própria o que a IA entregou, rode na raiz do trabalho:

```bash
node qualidade/verificar.mjs
```

Ele varre `site/` e aponta arquivo e linha para numeração decorativa, sombra e
deslocamento em `:hover`, risco de eyebrow, travessão, grade que espreme,
imagem sem dimensão, CDN, `<head>` incompleto e mais. Zero erro é a condição de
entrega que o `STARTER.md` impõe.

> Os arquivos de construção (`referencia/`, `alvo/`, `qualidade/`, contratos)
> ficam fora de `site/` de propósito — a entrega é autossuficiente e não carrega
> o andaime.

> Revise os direitos de uso de textos e imagens. A referência é inspiração de
> forma — não clone pixel-perfect nem reaproveite a marca dela.

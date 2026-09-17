# DECISÕES do projeto

## Da entrega original (mantidas)

- Tema predominante claro, com um bloco escuro de prova rápida em contraste.
- Estrutura narrativa da referência em 7 blocos: hero, prova rápida, sobre,
  acomodações, destino, galeria e contato.
- Copy do alvo reescrita para caber no ritmo do molde, sem perder a promessa
  central: conforto, hospitalidade e acesso às cachoeiras da Amazônia.
- Imagens locais em caminhos relativos dentro de `site/images/`.

## Correções aplicadas em 17/09/2026

### Contato — era o furo mais grave

O `alvo/site-content.json` traz `https://wa.me/559285372368`, e esse dado não
tinha chegado à página. Todos os CTAs apontavam para `#contato`, que levava a um
formulário sem `action` e sem handler: preencher e clicar não fazia nada.

- O `<span>WhatsApp</span>` do cabeçalho, que era texto morto, virou link real.
- Dois cartões de contato direto na seção de reserva (WhatsApp e telefone),
  no modelo da referência do Figma.
- Botões flutuantes fixos de WhatsApp e telefone, visíveis em toda a página.
- **O formulário foi mantido inteiro** — nenhum campo removido — e agora monta a
  mensagem e abre o WhatsApp do hotel com os dados já preenchidos. Sem backend.
- `required` em nome, WhatsApp, check-in e check-out.

### Paleta e tipografia — voltaram para a marca

A entrega anterior usava cores e fontes que não constavam em lugar nenhum da
receita. Nenhuma das cinco cores batia com `referencia/receita-visual.json`, que
por sua vez reproduz as cores do logo do cliente.

| | Antes | Agora | Origem |
|---|---|---|---|
| Azul primário | `#1f6fc0` | `#0047b3` | logo + receita |
| Azul de título | `#0b3355` | `#003c96` | receita |
| Laranja | `#f2760c` | `#f97300` | logo + receita |
| Fonte de título | Cormorant Garamond | Georgia | receita |

**Divergência consciente:** a receita pede Inter no corpo do texto. Usei uma
pilha de fontes do sistema no lugar, para eliminar a dependência do Google Fonts
(8 pesos baixados de servidor externo numa entrega que se propõe autossuficiente).
Georgia, que a receita pede para os títulos, já é fonte de sistema — custo zero.
Se Inter for inegociável, o caminho é hospedá-la localmente em `site/fonts/`.

**Ajuste de contraste:** `#f97300` como texto pequeno sobre fundo claro fica em
2,9:1 e reprova em AA. O eyebrow sobre fundo claro usa `--color-orange-ink`
(`#b34700`), e o botão usa `--color-cta` (`#e5670a`). O laranja da marca segue
íntegro sobre fundo escuro e nos ícones.

### Hero em tela cheia

- `min-height: 100svh` — a foto ocupa a tela na abertura.
- A animação de entrada saiu do hero: ele aparece pronto. As demais seções
  continuam revelando ao entrar na tela.
- Cabeçalho sobreposto e transparente sobre a foto, ganhando fundo sólido ao
  rolar (`.is-scrolled`).
- Indicador "Explore" ao pé do hero.
- `scroll-margin-top` nas seções, para as âncoras não pararem sob o cabeçalho.

### Regras do próprio projeto que estavam sendo violadas

- `slop/hover-sombra` e `slop/hover-movimento`: `.service-card:hover` e
  `.room-card:hover` tinham `box-shadow` + `translateY(-2px)`. Agora mudam
  apenas a cor da borda, em 160ms, conforme `qualidade/PADROES-PROIBIDOS.md`.
- `perf/img-sem-dimensao`: o logo era a única imagem sem `width`/`height`.

### Performance e SEO

- Google Fonts removido — nenhuma requisição externa.
- Favicon era o PNG de 1,3 MB; agora é um SVG embutido de ~400 bytes.
- Logo reduzido para `logo-440.png` / `logo-880.png` com `srcset`.
- Nove JPGs sem referência alguma removidos de `site/images/`.
- **Peso da entrega: 6,9 MB → 3,7 MB.**
- `og:image` passou a ser URL absoluta — caminho relativo não resolve em
  compartilhamento.
- JSON-LD `Hotel` com endereço, coordenadas e comodidades.

### Acessibilidade

- O carrossel tinha `setInterval` de 4s que nunca parava. Agora pausa no hover,
  no foco, com a aba oculta, reinicia após clique nas setas e não roda quando o
  visitante pediu `prefers-reduced-motion`.

## O que NÃO foi inventado

- **E-mail:** o `alvo/` não tem e-mail real (`seu@email.com` é placeholder do
  formulário). Nenhum e-mail foi criado. A referência do Figma tem um cartão de
  e-mail que ficou de fora por isso.
- **Telefone:** `tel:+559285372368` reutiliza o número do WhatsApp, único
  contato real disponível. **Confirmar com o cliente** se atende ligação.
- **Nota 4.9/5:** segue visível na página, como já estava, mas ficou fora do
  `aggregateRating` do JSON-LD — marcar avaliação sem origem verificável expõe
  o site a penalização do Google.
- **Endereço:** só cidade/estado/país no JSON-LD. Não há rua nem CEP no `alvo/`.

## Pendências

- `qualidade/verificar.mjs` nunca rodou: **não há Node.js nesta máquina**. As
  regras acima foram conferidas manualmente. Instalar Node e rodar
  `node qualidade/verificar.mjs` é o passo que falta para a condição de entrega
  do `STARTER.md`.
- Os PNGs do logo saíram do redimensionador do Windows, sem otimização de
  paleta. Um passo por `oxipng`/`pngquant` derrubaria os 145 KB para algo
  perto de 30 KB.

## Fotos reais — 17/09/2026

### De onde vieram

As `home-*.jpg` do pacote já eram fotos reais do hotel, extraídas do site
atual dele (`copies/hmx-copy-hotelcalleb.com.br/assets/`). Somei a elas três
fotos do perfil do Google Business (salvas em `trabalhos/.../fotos-reais/`).

O Instagram `@hotelcalleb` foi verificado: sem login o perfil só entrega
miniaturas de **512×640**, e a maioria dos posts é Reels. Resolução
insuficiente — nada de lá foi usado.

### O problema de resolução

Do acervo inteiro (23 fotos), **só 4 são paisagem**, e o hero precisa de
paisagem. O `hero-1600.jpg` anterior era 1600×900 com apenas 182 KB: um
upscale, já borrado na origem.

**Escolha para o hero: a fachada do hotel**, em duas versões, para que
nenhuma tela receba imagem esticada:

| Tela | Arquivo | Origem | Resolução |
|---|---|---|---|
| Desktop | `hero-desk-1200.jpg` | Google Business | 1200×675 |
| Celular | `hero-mob-1100.jpg` | site do hotel | 1100×1467 |

O `<picture>` troca por `media`, não por largura: o celular recebe retrato
nativo, o desktop recebe paisagem nativa.

A fachada foi escolhida porque o prédio é laranja — a cor da marca — com o
letreiro visível. É o que o hóspede reconhece ao chegar.

### Demais seções

| Seção | Arquivo | Origem | Upscale |
|---|---|---|---|
| Sobre | `sobre-recepcao.jpg` 1200×900 | home-18 (1280×960) | nenhum |
| Quartos | `quarto-familia.jpg` 1200×900 | Google (1920×1080) | nenhum |
| Quartos | `quarto-triplo.jpg` 1200×900 | home-19 (1280×960) | nenhum |
| Quartos | `quarto-casal.jpg` 1200×900 | Google (1200×1600) | nenhum |
| Destino | `destino-cachoeira.jpg` 640×480 | home-09 (700×400) | **20%** |
| Galeria | 6 × `gal-*.jpg` 900×1200 | home-06/07/15/16/17/20 | nenhum |

**A cachoeira é o ponto fraco do acervo.** É a única foto de natureza que
existe, e tem só 700×400 — daí ficar em 640×480, num card pequeno. A copy
promete "Coração da Amazônia" e "cachoeiras"; uma foto boa de cachoeira é o
que mais falta para o site sustentar a própria promessa.

### Dimensões que estavam mentindo

Os cards de quarto e os slides da galeria declaravam `width="1200"
height="900"` enquanto os arquivos eram 960×1280 — retrato declarado como
paisagem. Todas as declarações agora conferem com o arquivo real.

### Carrossel refeito

Era `transform` com um slide por vez e sem toque. Agora usa `scroll-snap`
nativo:

- **Desktop:** três fotos por vez; **tablet:** duas; **celular:** uma, com a
  seguinte espiando na borda.
- **Arrastar com o dedo** funciona nativamente — não havia antes.
- Setas sobre a imagem, pontos indicadores, navegação por seta do teclado.
- Circula nos dois sentidos; o automático pausa no toque, no hover, no foco,
  com a aba oculta e sob `prefers-reduced-motion`.
- `home-04`, de 253×337, saiu da galeria: pixelava.

## Pendências novas

- **A nota do Google é 4,7**, e a página exibe 4,9. Corrigir ou confirmar a
  origem do número com o cliente.
- **Fotos que faltam ao acervo:** uma cachoeira em alta resolução, uma
  externa do hotel em paisagem e uma da fachada sem as lojas vizinhas no
  enquadramento. Vale pedir ao cliente — ou uma visita com celular bom.

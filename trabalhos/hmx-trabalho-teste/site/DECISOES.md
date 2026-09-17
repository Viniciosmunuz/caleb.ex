| Celular | monumento do arqueiro, retrato 740×1014 |
| Desktop | monumento do arqueiro, paisagem 1549×871 |
| Desktop | **monumento do arqueiro**, paisagem 1549×871 |
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

## Acervo em alta resolução — 17/09/2026

O `images-manifest.json` guarda a URL de origem de cada foto. Elas vêm de três
CDNs (TripAdvisor, Booking e Google), e o site atual do hotel carrega apenas
**thumbnails** delas. Pedindo a versão sem o sufixo de tamanho, as mesmas fotos
voltam muito maiores:

| Foto | No site do hotel | Original | Ganho |
|---|---|---|---|
| Fachada à noite | 253×337 | 4284×5712 | 287× |
| Café / HC Pub | 253×337 | 1200×1600 | 22,5× |
| Cachoeira | 700×400 | 2000×1328 | 9,5× |
| Fachada de dia | 1100×1467 | 3072×4096 | 7,8× |
| 6 fotos do Booking | 576×768 | 810×1080 | 2× |

Os originais ficam em `trabalhos/hmx-trabalho-teste/fotos-reais/hd/`, fora do
git (são insumo, não entrega).

### O que mudou por causa disso

- **Hero: o espaço de café da manhã** (`hd-cafe`), a pedido do cliente do
  trabalho. Era inviável antes — a 253×337 teria 7,6× de ampliação. Com
  1200×1600 o desktop recebe um recorte 16:9 nativo, enquadrado um pouco acima
  do centro para pegar as luminárias e o balcão em vez do piso.
- **Destino: a cachoeira saiu de 640×480 para 1600×900.** Era a pendência
  registrada acima como "elo fraco do acervo" — resolvida sem foto nova.

### Ponto aberto

A foto do hero tem **um hóspede identificável** sentado à mesa. Para uso
comercial convém confirmar autorização de imagem com o hotel, ou trocar por um
enquadramento sem pessoas.

## Ajustes de 17/09/2026 (2ª rodada)

### Hero: a fachada de dia

Trocado para `home-01` em alta (3072×4096 no original, contra 1100×1467 que o
site do hotel servia). Gera até **1920×1080 sem upscale**, e o `srcset` entrega
800 / 1200 / 1920 conforme a tela. Enquadramento em 32% da altura: pega o
letreiro e as mesas da área externa, corta o excesso de chão.

O celular continua recebendo recorte retrato da mesma foto.

### Botões flutuantes: só WhatsApp

O botão de telefone saiu, junto com o CSS dele. **O cartão "Ligar para o hotel"
na seção de contato foi mantido** — é informação, não botão flutuante.

### Favicon: a coroa de penas do logo

No lugar do "C" desenhado à mão, agora é um recorte do próprio logo — a coroa
de penas azul com o detalhe laranja, enquadrada a partir de
`calleb.ex/logohigh.png` (região 30,95 + 380×380).

Três tamanhos: `favicon-32.png`, `favicon-512.png` e `favicon-180.png`
(apple-touch-icon). Fundo transparente, testado sobre claro e escuro — o
contorno branco das penas mantém a leitura nos dois. O logo inteiro não serve
de ícone: em 32px o texto "Hotel Calleb" vira borrão.

## Botões "Reservar Agora" com ícone animado

A pedido, os quatro botões "Reservar Agora" (cabeçalho, hero, menu mobile e
acomodações) ganharam um ícone de calendário que balança no hover, no modelo de
um componente do Uiverse.

Adaptações em relação ao original:

- **Cor:** `var(--color-cta)` da marca no lugar do `#FF342B` do componente.
- **Forma:** mantido o botão do site (48px de altura, cantos totalmente
  arredondados, caixa alta), não o retângulo de 20px do componente.
- **Ícone:** `stroke="currentColor"` no lugar de `#fff`, para herdar a cor.
- **`transform-origin: 50% 65%`**, para o balanço girar a partir da base do
  calendário em vez do centro geométrico.
- **Texto:** "Reservar Agora".

### Divergência consciente de `PADROES-PROIBIDOS.md`

A regra 3 proíbe `transform` no `:hover` do botão **e da seta dentro dele** —
cita `.btn-cta:hover .arrow { transform: translateX(4px) }` como exemplo. A
animação do ícone é da mesma família e o `verificar.mjs` deve apontar.

Foi uma escolha explícita do dono do trabalho, não um tique gerado. O que a
regra protege de fato — o alvo do clique se mexer debaixo do ponteiro — não
acontece: o botão fica parado, só o ícone gira, e `transform` saiu da
`transition` do botão. Sob `prefers-reduced-motion` a animação não roda.

## Movimento no hero

A foto deixou de ser estática. São **duas camadas separadas**, de propósito —
se estivessem no mesmo elemento, um `transform` sobrescreveria o outro:

| Camada | Elemento | O que faz |
|---|---|---|
| Zoom | `.hero-media img` | `scale` de 1.06 a 1.15 em 28s, `ease-in-out`, `alternate` |
| Parallax | `.hero-media` | sobe a 28% da velocidade do scroll |

O JS escreve `--parallax` na custom property e o CSS consome. O zoom é CSS puro,
sem JS nenhum.

**Por que não revela borda:** com fator positivo, a faixa descoberta no topo
fica sempre acima da janela. No scroll `y`, a borda superior da foto está em
`-0,72y` na tela e a do hero em `-y`; a diferença é sempre negativa, ou seja,
fora de vista.

**Detalhes de implementação:**

- A imagem já parte de `scale(1.06)`, para o deslocamento do zoom nunca puxar
  borda para dentro do quadro.
- `transform-origin: 58% 45%` centra o zoom no letreiro do hotel, não no meio
  geométrico da foto.
- O scroll usa `requestAnimationFrame` com trava, e só escreve no DOM quando o
  valor arredondado muda — sem escrita por evento de scroll.
- Sob `prefers-reduced-motion` nada roda: o zoom é desligado pelo bloqueio
  global de animação e o parallax nem chega a registrar o listener. Se o
  visitante mudar a preferência com a página aberta, o listener é removido e a
  foto volta ao lugar.

**O que não foi verificado aqui:** o movimento em si. O Chrome pausa animação e
`requestAnimationFrame` em aba oculta, e a janela de teste estava atrás. Foi
confirmado que a custom property move o contentor, que as duas camadas não se
sobrescrevem e que o cálculo do deslocamento está certo — mas ver a foto se
mexendo depende de abrir na tela.

## Menu mobile e botão terciário

### Hambúrguer que se dobra em X

Componente do Uiverse (talhabangyal), com uma troca importante: o original usa
`<label>` + `<input type="checkbox">` e anima por `:checked`. Aqui a animação é
disparada por `[aria-expanded="true"]` no `<button>` que já existia.

O motivo é acessibilidade: com o truque do checkbox, o leitor de tela anuncia
"caixa de seleção" em vez de botão, e não informa se o menu está aberto. O
`<button>` com `aria-expanded` e `aria-controls` diz as duas coisas. A animação
é idêntica — `stroke-dasharray` de `12 63` para `20 300` com `dashoffset`
-32.42, mais `rotate(-45deg)` no SVG, em 600ms.

`stroke` virou `currentColor`, para o ícone acompanhar a cor do cabeçalho
(claro sobre a foto, escuro depois de rolar).

### Botão terciário com seta

Componente do Uiverse (edu-amr), convertido de Tailwind para CSS puro e
aplicado em "Conheça Nossa História" (hero) e nos três "Detalhes" das
acomodações, que antes eram `.card-link` com fundo bege.

- Sublinhado cresce de `origin: bottom right` para `bottom left` em 500ms.
- Seta desliza de `-8px` para `+4px` e muda para a cor de acento.
- Variante `--claro` para uso sobre a foto do hero: texto branco e sublinhado
  no laranja da marca.

**Não foi aplicado nos CTAs** "Reservar Agora", "Solicitar reserva" e
"Verificar Disponibilidade": o componente é um botão de fundo transparente, e
usá-lo ali apagaria o laranja da marca e a hierarquia entre ação principal e
secundária. — decidido manter assim.

**Mesma divergência da regra 3** já registrada para o ícone de calendário: a
seta usa `translateX` no hover. O alvo do clique, de novo, não se move — o que
desliza é o ícone dentro dele.

### CSS removido

`.btn-secondary` e `.card-link` ficaram sem uso e saíram, junto com seus
`:hover`.

### Escopo final dos botões

| Tipo | Onde | Aparência |
|---|---|---|
| Primário | "Reservar Agora" (×4), "Verificar Disponibilidade" | laranja sólido + calendário que balança |
| Primário invertido | "Solicitar reserva" (painel do Destino) | fundo branco, texto laranja — variante que já existia |
| Primário sem ícone | "Abrir no Google Maps" | laranja sólido; calendário não cabe, não é ação de data |
| Terciário | "Conheça Nossa História", "Detalhes" (×3) | transparente, sublinhado que cresce + seta |

O calendário entrou no "Verificar Disponibilidade" por ser o botão mais ligado
a datas do site — é o que submete check-in e check-out.

## Escala tipográfica reduzida

Os títulos estavam grandes demais. Duas causas, não uma:

**1. O piso do `clamp`.** O `h1` era `clamp(3.2rem, 5vw, 6.4rem)`: em qualquer
tela abaixo de ~1024px ele travava em **51,2px** e não descia mais. No celular
isso comia o hero inteiro.

**2. Peso 600 em Georgia.** Georgia é fonte de sistema e só tem 400 e 700 reais
— o 600 virava **bold sintético**, que o navegador engrossa artificialmente.
Além de pesado, destoa da receita, que mede peso 300 (leve) nos títulos. Como
300 não existe em Georgia, 400 é o mais próximo e é o que o site de referência
de fato renderizava.

| Elemento | Antes | Depois |
|---|---|---|
| `h1` | `clamp(3.2rem, 5vw, 6.4rem)` peso 600 | `clamp(2.2rem, 4.2vw, 4.5rem)` peso 400 |
| `h2` | `clamp(2.5rem, 3vw, 4rem)` peso 600 | `clamp(1.75rem, 2.5vw, 2.75rem)` peso 400 |
| `.stat-number` | `clamp(2.5rem, 3vw, 3.5rem)` | `clamp(1.9rem, 2.4vw, 2.6rem)` |
| `.story-copy h2` | `clamp(2.4rem, 3vw, 3.25rem)` | `clamp(1.7rem, 2.4vw, 2.35rem)` |
| `.premium-panel h3` | `clamp(2rem, 2.7vw, 3rem)` | `clamp(1.5rem, 2.1vw, 2.1rem)` |
| `.booking-form h3` | `2rem` | `1.6rem` |
| `.location-card h3` | `1.7rem` | `1.45rem` |
| parágrafo do hero | `1.125rem` fixo | `clamp(1rem, 0.94rem + 0.28vw, 1.125rem)` |

Medido depois: `h1` em **35,2px** no celular (era 51,2) e **43px** em 1024px
(era 51,2). Sem vazamento horizontal em 375px.

O `letter-spacing` negativo também foi afrouxado de `-0.06em` para `-0.04em` no
`h1`: aperto de letra que funciona em 96px sufoca o texto em 43px.

## Passagem de acabamento visual

### O que estava feio não era subjetivo

O CSS tinha **10 valores de raio de borda** (4, 12, 16, 20, 22, 24, 28, 30,
999px, 50%) e **9 sombras**, cada uma com cor e opacidade próprias — algumas em
cinza (`rgba(17,24,39)`), outras em azul (`rgba(11,51,85)`), outras em laranja.
Nada disso é escolha, é acúmulo. É o que faz um site parecer amador mesmo com
conteúdo bom.

Agora há escala: `--r-sm/md/lg` (10/16/24px) mais pílula e círculo, e
`--sh-sm/md/lg` em camadas, todas na mesma matiz azul da marca. Sombra cinza
sobre fundo creme suja; a mesma matiz do fundo mantém tudo coeso.

### Botões minimalistas

| | Antes | Depois |
|---|---|---|
| Fonte | 12px, peso 800, caixa alta, `letter-spacing: .08em` | 14,4px, peso 600, caixa normal |
| Sombra | `0 18px 28px rgba(229,103,10,.28)` | nenhuma |
| Altura | 48px | 46px |

A sombra laranja era o que mais pesava: sombra colorida sob botão colorido é
justamente o tique que `PADROES-PROIBIDOS.md` chama de "pior ainda".

### Gaveta de menu

Estava assim: `display: none` → `block`, sem fundo próprio e sem transição.
Como o cabeçalho é transparente sobre a foto do hero, **a gaveta abria por cima
da imagem** — daí parecer quebrada.

- Fundo branco próprio, borda no topo e `--sh-lg` para separar do conteúdo.
- `opacity` + `visibility` + `translateY` no lugar de `display`, com transição
  de 220ms.
- Links com 48px de altura de toque, cantos `--r-sm` e realce no toque, em vez
  de lista com `border-bottom`.
- Os dois blocos duplicados nas media queries viraram um só no CSS base.

### Hero diferente por dispositivo

O `<picture>` já trocava por `media`; mudou a foto do desktop:

| Tela | Foto |
|---|---|
| Celular | fachada do hotel, retrato 1100×1467 |
| Desktop | **cachoeira**, paisagem 1920×1080 |

A fachada tem quatro letreiros disputando atenção (HC Crédito, HC Pub, Hotel
Calleb, Brahma) — em tela larga isso polui. No celular ela continua, porque o
recorte vertical corta o entorno e sobra o hotel.

No desktop entrou o **monumento do arqueiro** da entrada de Presidente
Figueiredo, escolhido pelo dono do trabalho. A escolha tem uma coincidência
feliz: o logo do hotel traz uma coroa de penas indígena, e o arqueiro é o
símbolo da cidade — marca e lugar se encontram na mesma imagem.

O arquivo tem 1549×1015, então o maior recorte 16:9 possível **sem esticar** é
1549×871, e é esse o teto do `srcset`. Enquadramento em 30% da altura: mantém
o céu e a estátua, corta o asfalto. A estátua fica à direita e o céu à
esquerda, onde entra o texto.

### Overlay do hero

Era preto puro em gradiente só horizontal. Agora é azul-noite
(`rgba(0,20,43,…)`) em duas camadas — horizontal para o texto, vertical para
assentar o cabeçalho no topo e o indicador de rolagem na base. O filtro passou
de `brightness(.68) saturate(.85)` para `brightness(.74) saturate(1.02)`: a
cachoeira é verde e vale manter a cor.

### Ajustes seguintes

- **WhatsApp saiu do cabeçalho.** Era um link solto ao lado do "Reservar
  Agora", com bolinha verde pulsante. O botão flutuante já cobre esse caminho
  em toda a página; ter os dois competia com o CTA.
- **Botão mais minimalista ainda:** cantos retos (`--r-sm`) no lugar da pílula,
  peso 500, 44px de altura, ícone de 15px.
- **Bloco de estatísticas:** era `--color-accent` (#0047b3) puro, 80px de
  padding — um retângulo de azul saturado no meio da página. Agora é
  `--color-dark` (#002348) com 56px, e os ícones passaram a laranja. Azul
  escuro com laranja é o par do próprio logo, e para de brigar com os botões.
- **Foto da seção Sobre:** era um corredor com lustre, escuro e sem apelo.
  Passou a ser a fachada à noite, com os letreiros acesos — a melhor foto do
  acervo (4284×5712 no original).

**A confirmar:** a origem da foto do arqueiro (`pf.png` na raiz do projeto) não
foi informada. Se veio de banco de imagens ou de site de turismo, o hotel
precisa de licença para uso comercial. Vale checar antes de publicar.

### O arqueiro nas duas telas

A fachada saiu também do celular: agora é a mesma foto nas duas, cada uma no
seu enquadramento nativo.

| Tela | Arquivo | Recorte |
|---|---|---|
| Celular | `hero-mob-740.jpg` 740×1014 | retrato, centrado na estátua (foco 60% da largura) |
| Desktop | `hero-desk-1549.jpg` 1549×871 | paisagem 16:9 |

Nenhum dos dois estica: o retrato sai de uma faixa vertical do original
1549×1015, e o paisagem é o maior 16:9 que cabe nele.

Vale um recorte por orientação em vez de deixar o `object-fit: cover` resolver:
no celular, o `cover` sobre a versão paisagem mostraria só 26% da largura da
foto e ainda baixaria a imagem inteira.

## Dois papéis de botão "Reservar Agora"

O botão do cabeçalho e os do corpo tinham exatamente a mesma aparência, e isso
fazia dois deles aparecerem laranja sólido na mesma tela, competindo entre si.

| | Cabeçalho | Corpo (hero, acomodações, formulário) |
|---|---|---|
| Altura | 38px | 44px |
| Ícone | nenhum | calendário que balança no hover |
| Sobre a foto | contorno branco, fundo transparente | laranja sólido |
| Após rolar | laranja sólido | laranja sólido |

O raciocínio: o do cabeçalho **fica sempre à vista**, então não precisa gritar
— basta estar disponível. Os do corpo aparecem uma vez cada, no momento em que
a pessoa acabou de ler o argumento, e aí sim têm de puxar o olho.

O contorno enquanto o cabeçalho está transparente resolve de quebra a
legibilidade: laranja sólido sobre foto clara fica pesado, e o contorno branco
acompanha o resto do menu, que já é branco ali.

## Animação dos números

Os quatro números continuam **centralizados no grid**, como estavam. A animação
acontece dentro de cada um, não deslocando a linha.

Primeira tentativa foi um marquee de rolagem contínua, e estava errada: no
`LogosCarousel`, `count={4}` significa **quatro posições fixas** por onde os
dezesseis logos passam — os slots não andam, o conteúdo dentro deles é que
troca. Por isso a linha não devia sair do lugar.

O que ficou: entrada escalonada. Quando a seção entra na tela, os quatro
aparecem em sequência, subindo 16px e ganhando opacidade, com 100ms de
intervalo entre eles (60 / 160 / 260 / 360ms), em
`cubic-bezier(0.22, 1, 0.36, 1)` — uma curva que desacelera no fim, então o
número assenta em vez de parar seco.

`animation-fill-mode: backwards` mantém cada cartão invisível durante o próprio
atraso; sem isso os quatro apareceriam juntos e só depois recuariam para animar.

Sob `prefers-reduced-motion` a regra global do site já zera a duração, e como
aqui não há deslocamento contínuo, o resultado é simplesmente os quatro números
no lugar — que é o comportamento correto.

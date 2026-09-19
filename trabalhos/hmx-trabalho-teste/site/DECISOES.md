| Fundo | branco 96% | branco **45%** |
| Blur | 10px | **26px** |
| Saturação | nenhuma | **180%** |
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

## Números em rodízio vertical

Os quatro ficam **centralizados no grid**, nas mesmas quatro posições de antes.
Quem se move é a coluna dentro de cada posição: o número sobe, sai por cima, e
o seguinte entra por baixo — sem parar.

**Como o laço fecha sem corte:** cada coluna tem os quatro números mais uma
repetição do primeiro, e anda de `translateY(0)` a `-80%`. Com cinco itens,
-80% é exatamente o quinto — que é cópia do primeiro. O reinício cai em cima de
um quadro idêntico e não se vê emenda. Medido: janela de 132px, coluna de 660px
(5 × 132), paradas em 0 / -132 / -264 / -396.

**O intervalo:** ciclo de 12s dividido em quatro. Os keyframes têm platôs
(`0%, 20%` / `25%, 45%` / …), então cada número fica **2,4s parado** e sobe em
**0,6s**. É a pausa que torna o número legível; sem os platôs seria uma esteira
contínua e ninguém leria nada. Amostragem de 14 leituras pegou 13 em posição
exata e só uma em transição.

**Os quatro mostram números diferentes ao mesmo tempo** porque cada coluna tem
`animation-delay` negativo — 0, -3s, -6s, -9s. Delay negativo faz a animação
começar já adiantada, então as quatro rodam o mesmo ciclo em pontos distintos.

**Acessibilidade:** três das quatro colunas repetem o mesmo conteúdo, então vão
com `aria-hidden`. Na coluna que fica legível, o quinto item — a repetição do
primeiro — também. O leitor de tela anuncia os quatro números uma vez cada.

### Faixa em branco e monocromática

O bloco escuro saiu: a faixa agora tem fundo branco, separada da seção seguinte
por uma linha fina em vez de um retângulo de cor.

**Monocromático** — tudo no mesmo azul `rgb(0, 35, 72)`, variando só a
intensidade. É o que dá unidade sem precisar de cor de destaque:

| Elemento | Intensidade |
|---|---|
| Número | 100% |
| Rótulo | 60% |
| Ícone | 42% |

O ícone mais apagado que o texto é proposital: ele apoia a leitura do número,
não disputa com ele.

### Ícones redesenhados

Os quatro eram genéricos — uma pessoa, duas ondas, um coração solto e um escudo
vazio. Não diziam nada do que estava escrito embaixo:

| Rótulo | Antes | Agora |
|---|---|---|
| Hóspedes felizes | uma silhueta | duas pessoas, um casal |
| Cachoeiras próximas | duas ondas | queda d'água sobre um poço, com a onda de baixo mais fraca |
| Hospitalidade regional | coração solto | casa com um coração dentro |
| Segurança e conforto | escudo vazio | escudo com confirmação |

**Erro no caminho:** a substituição do coração rodou com `/g` e trocou também o
ícone do link de localização no rodapé, que usava o mesmo desenho. Ao restaurar,
a linha do texto ficou duplicada e o `<svg>` se perdeu. Ambos corrigidos — e o
rodapé ficou com um alfinete de mapa, que é o ícone certo para um link do Google
Maps; o coração ali nunca fez sentido.

## Seção "sobre" reconstruída

Era uma foto grande e arredondada de um lado e um bloco de texto do outro. Foi
refeita no formato que o próprio site do hotel usa — mosaico de quatro fotos,
selo de tempo de casa e lista de diferenciais.

### Mosaico

Quatro fotos em duas colunas, com **alturas diferentes** (230 / 190 / 210 /
250px) e deslocamento vertical nas duas da direita. Grade de alturas iguais fica
rígida; o degrau dá ritmo sem virar bagunça.

O raio caiu de `var(--r-md)` (16px) para **8px**. Canto muito redondo amolece a
foto e a faz parecer adesivo; 8px arremata sem chamar atenção.

As quatro escolhidas cobrem o que o hotel oferece: café da manhã, fachada à
noite, quarto e salão de refeições.

### Selo "10+ anos"

Fica na emenda das quatro fotos, com borda da cor do fundo para parecer recortado
sobre elas. **O dado é real** — `10+` e `Anos de Experiência` estão no
`alvo/site-content.json`, vindos do site do cliente. Leva `aria-hidden` porque é
reforço visual de algo que o texto ao lado já diz.

### Lista de diferenciais

Os quatro itens vieram do conteúdo do cliente. **O JSON os traz truncados** —
termina em `"Conexão wi-fi de alt"` —, então os dois últimos foram completados
pela captura do site que o dono do trabalho enviou:

- Conexão wi-fi de alta velocidade em todas as áreas
- Quartos equipados com o que há de mais moderno

Cada item tem o ícone do que ele diz, em vez de quatro marcas de confirmação
iguais:

| Item | Ícone |
|---|---|
| Localização estratégica | alfinete de mapa |
| Atendimento personalizado | pessoa |
| Conexão wi-fi | ondas de wi-fi |
| Quartos equipados | cama |

Quatro checks idênticos não acrescentam informação — só confirmam que a lista é
uma lista. Ícone específico dá para ler a linha antes mesmo do texto.

### Sem botão

`Conheça nossa história` saiu a pedido. A seção fecha na lista de diferenciais;
quem quiser reservar tem o botão do cabeçalho, o WhatsApp flutuante e os CTAs
das seções seguintes.

### Hero sem botão de reserva

O "Reservar Agora" saiu do hero a pedido; "Conheça Nossa História" assumiu a
posição dele, alinhado à esquerda com o texto.

**Vale saber o efeito:** o hero deixa de ter caminho direto para reservar. Sobram
três: o botão do cabeçalho, que fica visível o tempo todo; o botão flutuante do
WhatsApp; e os CTAs das seções de acomodações e contato, mais abaixo.

Em página de hotel o botão do hero costuma ser o de maior conversão, porque pega
quem já chegou decidido. Se as reservas caírem, é o primeiro lugar a olhar.

### Cabeçalho em vidro fosco ao rolar

O `backdrop-filter` já estava no CSS, mas **não produzia efeito nenhum**: o
fundo era `rgba(255,255,255,0.96)`, quase opaco, então não sobrava nada por trás
para borrar. Na prática era um cabeçalho branco com uma propriedade inútil.

| | Antes | Agora |
|---|---|---|
| Fundo | branco 96% | branco **68%** |
| Blur | 10px | **18px** |
| Saturação | nenhuma | **170%** |

O `saturate` é o que separa vidro de véu cinza: sem ele o que passa por trás
perde cor e o efeito fica sujo. Com ele, a foto do hero atravessa borrada mas
ainda colorida.

`-webkit-backdrop-filter` incluído para o Safari, que ainda exige o prefixo.

**Fallback:** um bloco `@supports not` devolve o fundo a 95% em navegador sem
`backdrop-filter`. Sem isso, quem não suporta o efeito veria o menu escuro sobre
um fundo 68% transparente com foto por baixo — ilegível.

O estado sobre o hero, antes de rolar, continua totalmente transparente. O vidro
só existe depois que a página desce.

**Custo da transparência alta:** a 45% o que passa por trás começa a interferir
na leitura do menu, que é texto escuro. Em vez de fechar o vidro de novo, o
texto ganhou peso 500 e um halo branco de 1px (`text-shadow` claro). O halo
separa a letra do fundo sem adicionar caixa nem sombra visível.

O blur subiu junto, de 18px para 26px: quanto mais borrado o que está atrás,
mais uniforme fica o fundo sob o texto — o blur atua como estabilizador de
contraste, não só como enfeite.

**Onde ainda pode apertar:** se a pessoa parar a rolagem com uma área bem escura
da foto exatamente sob o menu, o contraste fica no limite. As seções internas
têm fundo claro, então o problema só existe enquanto o hero está atrás — uma
faixa curta da página.

## Cabeçalho que vira pílula ao rolar

Modelo trazido pelo dono do trabalho (site da Wuzi): barra flutuante de canto
arredondado, fundo de vidro, botão em pílula com seta e o menu num botão
circular.

### Dois estados

| | No hero (topo) | Depois de rolar |
|---|---|---|
| Forma | barra comum, largura inteira | pílula solta das bordas |
| Raio | 0 | 999px |
| Fundo | transparente | vidro a 45% com blur 26px |
| Altura | 70px | 58px |
| Texto do menu | branco | escuro, com halo branco |

### Por que a pílula é a `.nav-row` e não o `<header>`

A primeira tentativa transformou o próprio `<header>` em pílula, com
`width`, `left: 50%` e `translateX`. Funciona parado, mas **treme na
transição**: animar largura e posição força o navegador a recalcular layout a
cada quadro.

Agora o `<header>` fica sempre fixo e de largura inteira, e quem muda é a linha
interna — fundo, raio, sombra e altura. São propriedades de pintura, não de
layout, e a transição fica lisa.

### Navegação por largura

- **Até 768px:** os links somem da barra e ficam só na gaveta, aberta pelo botão
  circular.
- **Acima de 768px:** os links aparecem na barra; nem o botão nem a gaveta
  existem.

A gaveta acompanha o novo visual: solta 10px abaixo da barra, canto de 20px e o
mesmo vidro.

## Acomodações refeitas

### Dados alinhados ao site do cliente

Faltava um quarto e dois nomes estavam em inglês:

| | Antes | Agora |
|---|---|---|
| 1º | Standard — R$ 390 | **Padrão** — R$ 390 |
| 2º | Triple Room — R$ 320 | **Quarto triplo** — R$ 320 |
| 3º | Casal — R$ 280 | Casal — R$ 280 |
| 4º | *não existia* | **Solteiro** — R$ 220 |

Cada um ganhou capacidade, metragem e wi-fi, como no site deles.

O eyebrow do site do cliente é "Delegações", que não descreve quartos — deve
ser resquício de outra seção. Ficou "Acomodações", que é o que a seção mostra e
o que o menu já chama.

### O que mudou nos cartões

- **Preço sobre a foto**, no canto inferior, em vez de pílula bege no corpo. É
  a informação que a pessoa procura primeiro. Um véu escuro na base da imagem
  garante contraste do número branco em qualquer foto — sem ele o preço some
  em foto de parede clara.
- **Linha de especificações** com ícone: pessoas, metragem, wi-fi, separada do
  texto por um filete.
- **Cartões da mesma altura**, com o corpo em coluna e o botão colado embaixo —
  antes cada um terminava numa altura, conforme o tamanho do texto.
- Grade de quatro colunas que vira duas abaixo de 1080px e uma abaixo de 560px.

### Botão minimalista

`Detalhes` virou **`Reservar agora`**: texto laranja com um filete que cresce da
esquerda no hover. Quatro botões sólidos lado a lado brigariam entre si e com o
cabeçalho.

Cada um leva ao WhatsApp **com o nome do quarto já na mensagem** — quem clica no
Solteiro abre a conversa dizendo que quer o Solteiro. "Detalhes" antes levava
para a âncora de contato, sem dizer o que a pessoa estava vendo.

### Amenidades no rodapé do cartão

Cada quarto mostra o que oferece, como no site do cliente: **café da manhã,
televisão, wi-fi e ar-condicionado**, à esquerda, com o botão à direita,
separados do texto por um filete.

Só o ícone aparece. O nome de cada amenidade está no HTML, escondido
visualmente por `clip-path` — assim o leitor de tela anuncia "Café da manhã,
Televisão, Wi-fi, Ar-condicionado" em vez de quatro imagens sem rótulo, e o
visual continua limpo. Verificado: os quatro nomes são lidos, e o `<span>` fica
fora da tela sem sumir da árvore de acessibilidade.

No site do cliente esses ícones são coloridos, um laranja e três azuis. Aqui
ficaram todos no mesmo azul a 50% — a cor não distingue nada entre eles, e
quatro cores diferentes numa linha de 17px viram ruído.

### Cartões maiores

Quatro numa linha deixavam cada um com ~230px — estreito demais para foto,
preço, specs, texto e rodapé. Passaram a **2×2**, com 474px cada.

| | Antes | Agora |
|---|---|---|
| Colunas | 4 | 2 |
| Largura do cartão | ~230px | 474px |
| Proporção da foto | 4:3 | 3:2 |
| Nome do quarto | 1,6rem peso 700 | 1,75rem peso 400 |
| Raio | `--r-md` | `--r-lg` |
| Respiro interno | 20px | 24/26px |

O peso do nome caiu de 700 para 400 pelo mesmo motivo dos títulos do site:
Georgia não tem 700 real e o navegador engrossa artificialmente. Em 28px isso
fica pesado.

**Um defeito que só apareceu no tamanho maior:** a foto estava com proporção
2,43 em vez de 1,5, mesmo com `aspect-ratio: 3/2` declarado. O cartão é flex em
coluna, e o flex **encolhia a imagem** para igualar as alturas — `aspect-ratio`
perde para `flex-shrink`. Resolvido com `flex-shrink: 0` na foto. Medido depois:
proporção 1,50, altura 314px, e os quatro cartões continuam da mesma altura.

---

## Refinamento de design, galeria das cachoeiras e revisão de SEO/acessibilidade

Rodada pedida com uma regra explícita: **melhorar o design, não mudar a
comunicação do proprietário**. Nada de hero trocado, nada de seção fora de
lugar, nada de conteúdo apagado. Tudo abaixo respeita isso — o único texto novo
é a linha de créditos das fotos, que é obrigação de licença, não marketing.

### Barra de navegação: o bug e o vidro

A barra tinha `rgba(255,255,255,.45)` com `blur(26px) saturate(180%)`. Isso não
é vidro fosco: com 45% de véu e saturação em 180%, a barra **repetia as cores da
foto em borrão** em vez de filtrar. E o texto do menu, no azul `#003c96`, ficava
ilegível sobre as partes claras da imagem — tanto que havia um
`text-shadow: 0 1px 2px rgba(255,255,255,.75)` ali só para tentar salvar a
leitura. Sombra branca em texto escuro é muleta de contraste ruim, não acabamento.

Medido antes: o menu sobre a parte laranja da foto dava **menos de 3:1**.

A solução não foi engrossar o véu — foi **fazer a cor do texto seguir o que está
atrás**. O `animations.js` já sabia quando a barra tinha rolado; passou a saber
também quando ela ainda está por cima do hero:

```js
const limite = hero.offsetHeight - siteHeader.offsetHeight - 20;
siteHeader.classList.toggle('esta-no-hero', y < limite);
```

Com isso dá para deixar o vidro muito mais fino do que seria possível com uma
cor fixa:

| | Sobre o hero (foto escura) | Sobre o corpo (seções claras) |
|---|---|---|
| Véu branco | **14%** | 40% |
| Texto do menu | branco | `--color-dark` |
| Desfoque | 28px | 28px |
| Saturação | 110% | 110% |
| Contraste medido (pior caso) | **4,60:1** | **6,15:1** |

O pior caso sobre o hero é o menu em cima da parte mais clara do céu; sobre o
corpo é a barra passando por cima de uma foto de quarto. Nas seções brancas e
creme, que são a maioria, dá 15:1.

O `saturate` caiu de 180% para 110% porque era ele que fazia a barra virar
mancha colorida: 180% amplifica a cor da foto atrás em vez de neutralizá-la.
Quem faz o efeito de vidro é o desfoque, não a tinta.

**Sem contorno.** A pílula tinha borda branca e um brilho interno no topo —
dois recursos que *desenham* a forma do vidro. O efeito que o cliente queria
(referência: cabeçalho do site da Wuzi) é o oposto: o vidro não tem contorno
nenhum, ele se dissolve no fundo e quem marca a barra é só o desfoque. Os dois
saíram; sobrou uma sombra externa fraca, que separa a barra das seções claras
sem desenhar nada por cima da foto.

Sem suporte a `backdrop-filter` os dois estados caem para branco a 96% e o texto
volta ao escuro — senão o menu branco ficaria sobre fundo branco.

### Menu e logo maiores

A pedido: logo de 36px para **44px**, menu de 14,4px para **16px** peso 600, e o
botão do cabeçalho de 13,6px para 14,7px. A barra cresceu junto (70→82px no
topo, 58→66px na pílula) para a logo não encostar nas bordas.

**Isso quebrou a faixa de 769–979px:** com os links em 16px, os seis não cabiam
mais na barra — a logo era cortada e "Reservar Agora" quebrava em duas linhas.
O corte do menu mobile subiu de 768 para **980px**: nessa faixa a navegação
passa a ser o botão de menu e a gaveta, que é o comportamento certo em tablet
de qualquer forma.

### Galeria das cachoeiras

A seção Destino listava três atrações com **ícone genérico e nenhuma foto** —
o nome da cachoeira sem a cachoeira. Agora cada uma é um cartão-foto com o nome
e o endereço escritos por cima da imagem, e a descrição do cliente logo abaixo,
no branco, onde se lê sem disputar com a foto.

| Atração | Localização | Foto |
|---|---|---|
| Cachoeira do Santuário | Rodovia AM-240 (estrada de Balbina), km 12 | MTur Destinos — domínio público |
| Cachoeira da Iracema | Rodovia BR-174, km 998 · a 8 km do centro | MTur Destinos — domínio público |
| Caverna Refúgio do Maroaga | Rodovia AM-240 (estrada de Balbina), km 6 | Fabricio Ferreira Silva — CC BY-SA 3.0 |

As fotos vieram do Wikimedia Commons, recortadas em 4:3 e servidas em 480w e
900w. Duas são de domínio público (Ministério do Turismo); a terceira é CC BY-SA
e por isso há uma linha de crédito discreta no fim da galeria. **É crédito de
licença, não enfeite: sem ele o uso comercial da foto fica irregular.**

A galeria é separada da galeria do hotel, que continua na seção seguinte com o
carrossel das fotos do estabelecimento.

**Grafia corrigida com autorização do cliente:** o site dele escreve
"Maruaga", mas o nome da caverna é **Maroaga** — é assim na Área de Proteção
Ambiental Caverna do Maroaga, que é unidade de conservação estadual, e no acervo
do Wikimedia Commons. Foi a única palavra do texto dele alterada nesta rodada, e
só depois de perguntar. Grafia errada de nome próprio de atração custa busca:
quem procura "Maroaga" não encontra a página.

O véu sobre a foto é `rgba(0,20,43,.74)` só na base. No pior caso — nome branco
sobre a parte mais clara de uma cachoeira — dá **7,4:1**.

**Texto do cliente que estava perdido:** o site dele tem a chamada
*"Descubra a Terra das Cachoeiras."* como título da seção, e aqui o H2 era
"Explore o Destino", que só repetia o eyebrow. O título do cliente voltou como
H2 e "Explore o Destino" virou o eyebrow — as duas frases dele continuam na
página, e o H2 passou a ter as palavras que alguém buscaria.

### Contraste do laranja

`#e5670a` com texto branco dá **3,35:1** — abaixo do mínimo de 4,5:1. Isso valia
para *todos* os botões principais: "Reservar Agora", "Verificar Disponibilidade",
"Abrir no Google Maps", "Solicitar reserva".

`--color-cta` foi para **`#c25400`** (4,60:1) e o hover para `#9c4300`. Continua
o laranja da marca, um degrau mais fundo — e um laranja mais fechado lê como
mais caro, não menos. Como o mesmo token pinta o texto dos botões minimalistas
(`Reservar agora` nos cartões de quarto), uma troca resolveu os dois casos.

### Bugs encontrados na revisão

**O formulário oferecia quartos que não existem mais.** O `<select>` de tipo de
quarto ainda dizia *Standard*, *Triple Room* e *Casal* — os nomes antigos, em
inglês — e não tinha o Solteiro. Quem preenchesse mandava para o WhatsApp um
quarto que a seção de acomodações não mostra. Agora são os quatro nomes reais.

**O selo "10+ anos de experiência" estava escondido do leitor de tela.** Tinha
`aria-hidden="true"`, como se fosse enfeite, mas é informação do cliente —
está na lista de números do site dele. E o rótulo em `0.6rem` dava **9,6px**,
pequeno demais para qualquer leitura. Passou para 0,72rem, com o círculo de
104 para 118px para caber.

**A faixa de números ficava em quatro colunas no celular.** Havia regra de duas
colunas entre 450 e 768px, mas nada abaixo de 450 — então em tela de 375px
valiam as quatro colunas do desktop, com 78px cada: "2.500+" aparecia como
".500" e "Premium" como "emiu". Agora são duas colunas abaixo de 450px.

**Espaço duplo no bloco de título.** `.head-block` é flex com `gap: 16px` e o
`.eyebrow` tinha `margin-bottom: 12px` — as duas distâncias somavam. A margem
foi zerada dentro dos blocos que usam gap, e a distância do título para o
conteúdo subiu de 36 para 48px, que é a proporção certa contra os ~96px de
respiro da seção.

**Respiro fixo em 96px sufocava o celular.** Virou `clamp(64px, 7.5vw, 104px)`:
64px em tela pequena, 104px em tela larga.

**O link da logo não dizia para onde vai.** O único conteúdo era a imagem com
`alt="Hotel Calleb"`, o que não informa o destino. Agora o link tem
`aria-label="Hotel Calleb — ir para o início da página"` e o `alt` da imagem
ficou vazio, para o nome não ser anunciado duas vezes. De quebra, o `sizes` da
logo estava em `220px` enquanto ela renderiza com 80px de largura.

### Verificação

Varredura na página inteira depois das mudanças:

- contraste abaixo do mínimo: **0 ocorrências**
- texto abaixo de 11,5px: **0 ocorrências**
- imagem sem `alt`: **0**
- imagem quebrada: **0**
- rolagem horizontal em 375px, 790px e 1280px: **0**
- hierarquia de títulos: um H1, H2 por seção, H3 dentro — sem degrau pulado
- cartões de quarto e de cachoeira: alturas iguais dentro de cada grade

Conferido no desktop (1280px), no tablet (790px) e no celular (375px), com a
gaveta de menu aberta e fechada.

---

## Vidro de iOS, cartões lado a lado no celular e botão de menu sem disco

### O degradê da barra

A referência (cabeçalho da Wuzi) tem um degradê leve puxando para o preto. Aqui
o degradê puxa para o **azul da marca**, não para o laranja: o laranja é a cor
do botão "Reservar Agora", que é a única coisa no cabeçalho que precisa saltar.
Tingir a barra inteira de laranja tiraria dele o contraste que faz o botão
funcionar.

| | Sobre o hero | Sobre o corpo |
|---|---|---|
| Topo | `rgba(214,235,255,.14)` | `rgba(255,255,255,.46)` |
| Base | `rgba(0,32,70,.24)` | `rgba(206,227,255,.32)` |
| Desfoque | 30px | 30px |
| Saturação | 140% | 125% |

A saturação subiu de volta (110% → 125/140%) porque é ela que faz o vidro
*iluminar* o que está atrás, que é o efeito do iOS. Antes ela era problema
porque o texto escuro competia com a cor da foto; sobre o hero o texto é branco,
então a cor pode passar.

**O degradê deixou a barra mais legível, não menos.** Sobre o hero ele escurece
para baixo, e o texto é branco — o pior caso medido subiu de **4,60 para 5,35**.
Nas seções claras fica em 14,4–15,2.

### Cartões lado a lado no celular

Os quartos apareciam um por linha: quem quisesse comparar preço tinha de rolar
entre eles. Agora são **dois por linha**, com ~165px cada. Nessa largura nada
cabia no tamanho de desktop, então tudo encolheu junto:

| | Desktop | Celular |
|---|---|---|
| Colunas | 2 | 2 |
| Largura do cartão | 474px | 165px |
| Proporção da foto | 3:2 | 4:3 |
| Nome do quarto | 28px | 18,9px |
| Preço | 27,2px | 19,2px |
| Respiro interno | 24/26px | 14/13px |
| Rodapé | ícones e botão lado a lado | empilhados |

Os quatro cartões de "Experiência" também foram para duas colunas — são ícone
e duas linhas, cabem bem, e a seção deixou de ser uma pilha de quatro blocos
iguais.

**A galeria das cachoeiras continua de um por linha.** Em 165px o nome
"Caverna Refúgio do Maroaga" e o endereço ficariam abaixo de 11px, que é o
limite de leitura que este projeto adota — e o endereço é justamente o que
essa galeria existe para mostrar.

**Um erro de cascata no caminho:** o bloco `@media (max-width: 560px)` foi
escrito antes das regras base dos cartões. Mesma especificidade, e quem vem
depois ganha — então *nada* dele valia: o nome continuava em 28px e o respiro
em 26px, mesmo com a regra declarada. Só apareceu porque medi os valores
computados em vez de confiar no que estava escrito. O bloco foi para o fim do
CSS, junto das outras media queries.

### Menos arredondado

`--r-lg` de 24px para **14px** e `--r-md` de 16 para 12. Mexer no token e não
nos elementos mantém cartões, painel, mapa, formulário e rodapé no mesmo
desenho — se cada um tivesse o seu valor, a próxima mudança deixaria algum para
trás.

### Botão de menu sem disco

O hambúrguer era um disco azul escuro com os palitos brancos. Agora são **só os
palitos, no laranja da marca**.

Medido antes de aplicar, e o resultado mudou a implementação: laranja sozinho
sobre a foto do hero fica entre **1,0 e 2,5:1** contra céu, folhagem, telhado e
estátua — ou seja, some. E no celular esse botão é a navegação inteira.

O disco era o que resolvia isso. Sem ele, o que devolve a leitura é uma sombra
escura no próprio traço (`drop-shadow(0 1px 3px rgba(0,20,43,.85))`), aplicada
só enquanto a barra está sobre o hero. Contorna os palitos sem desenhar disco
nenhum. Sobre a pílula clara das seções, o laranja dá 4,44:1 e a sombra sai.

O alvo de toque continua com 44px: o que sumiu foi o fundo, não o botão.

### Botão no hero

Voltou um **"Reservar Agora"** no hero, no mesmo estilo de "Conheça Nossa
História" — texto claro, filete que cresce e seta que avança — apontando para
o formulário de reserva.

Ficou **depois** de "Conheça Nossa História", não antes: essa posição foi
escolhida pelo cliente numa rodada anterior, quando ele pediu para mover o
botão de história para o lugar do de reserva. Inverter agora desfaria aquilo
sem ele ter pedido.

A folga entre os dois é de 30px, não 16px: com a seta avançando no hover, 16px
faziam a seta de um quase encostar no texto do outro.

---

## Botão do hero e reordenação do contato

### Do botão de seta ao botão de vidro

O botão de seta saiu a pedido. Tirar só a seta não bastava: o sublinhado dele
**só aparecia no hover**, então sem a seta o botão ficava com cara de texto
comum em repouso — no celular, onde não existe hover, ele nunca teria indicação
de que era clicável.

Então o contorno virou a forma do botão: pílula com o **mesmo vidro da barra de
navegação** — o mesmo degradê azul, o mesmo `blur(30px) saturate(140%)`. Os
valores são os mesmos de propósito: hero e cabeçalho passam a parecer o mesmo
material, em vez de dois efeitos parecidos.

| | Primeira versão | Agora |
|---|---|---|
| Altura | 52px | 42px |
| Respiro | 14/30px | 11/24px |
| Texto | 16px | 14,7px |
| Borda | branca 55% | transparente |
| Fundo | branco 10% | degradê azul + desfoque |

A borda branca saiu pelo mesmo motivo da barra: ela desenha a forma em vez de
deixar o vidro se dissolver no fundo.

A classe passou a se chamar `.hero-btn`. `.btn-arrow` era usada só aqui, então
o bloco inteiro foi substituído em vez de acumular regras mortas — sobraram
zero referências a `btn-arrow` e `arrow-icon` no arquivo.

**"Conheça Nossa História" foi removido** a pedido; o hero ficou com um botão
só. A seção continua acessível pelo menu, então nada ficou sem caminho.

### Contato: formulário antes da alternativa

No celular a ordem era: texto → cartões de contato → formulário. Quem quisesse
reservar via formulário tinha de passar por cima da alternativa primeiro. Agora
é **texto → formulário → WhatsApp**.

Isso não deu para resolver com `order`: o bloco de contato direto estava
*dentro* de `.contact-details`, e `order` só reordena irmãos. Ele saiu para ser
irmão do formulário, e a grade passou a usar **áreas nomeadas**:

```css
grid-template-areas:
  "detalhes formulario"
  "direto   formulario";
```

No desktop nada mudou de lugar — o formulário ocupa a coluna da direita
inteira, como antes. No celular as áreas viram uma coluna só, na ordem pedida.

**Redeclarar as áreas no celular é obrigatório**, não zelo: com as áreas
pedindo duas colunas e `grid-template-columns: 1fr`, o navegador cria uma
segunda coluna implícita e a grade quebra.

**"Ligar para o hotel" foi removido** a pedido. Isso resolve de lado uma dúvida
que estava em aberto desde a primeira rodada: não havia confirmação de que o
`+55 92 8537-2368` atende ligação — ele aparecia no site do cliente como
contato de WhatsApp. O CSS órfão do cartão saiu junto.

### Cartão de quarto no celular, segunda tentativa

A primeira versão de duas colunas cabia, mas ficou feia: em 165px o cartão
virava **seis faixas empilhadas** — foto, nome, specs, divisor, texto, divisor,
ícones, botão — com a foto reduzida a uma tira de 122px no fim de um cartão de
390px. Um cartão de quarto em que a foto ocupa 24% da altura não é um cartão de
quarto, é uma lista com miniatura.

Três mudanças, todas só no celular:

| | Antes | Agora |
|---|---|---|
| Proporção da foto | 4:3 (122px) | **4:5 (203px)** |
| Foto sobre o cartão | 24% | **47%** |
| Divisores | 2 | **1** |
| Linhas das specs | 2 | **1** |
| Véu sobre a foto | 42% | 34% |

O wi-fi estava **repetido** dentro do mesmo cartão: uma vez nas specs, outra no
ícone do rodapé. Em 165px essa repetição jogava as specs para duas linhas, com
"Wi-fi" sozinho na segunda — parecia defeito. Some das specs, fica no rodapé.
Não é conteúdo perdido: o leitor de tela continua anunciando "Wi-fi" pelo rótulo
escondido do ícone, e no desktop, onde cabe, as três specs continuam.

O segundo divisor saiu pelo mesmo motivo: dois filetes horizontais em 165px
picam o cartão em fatias. Sobrou o do rodapé, que separa a ação do conteúdo.

No desktop nada mudou — foto 3:2, três specs, os dois divisores.

---

## Seção "Experiência" sem caixas

Quatro molduras brancas com borda, raio e sombra numa linha é exatamente o
"aparência de dashboard" que estava na lista do que **não** fazer, desde o
briefing. Eram quatro widgets, não quatro diferenciais.

A caixa saiu inteira — fundo, borda, raio e sombra. O que organiza cada coluna
agora é um **filete de 1px em cima**, como numa tabela de características, e o
ícone em laranja. Mesma informação, sem a moldura.

### Os ícones diziam a coisa errada

| | Antes | Agora |
|---|---|---|
| Café da manhã | cúpula abstrata | xícara com vapor |
| Conforto premium | cúpula abstrata | cama com travesseiro |
| Natureza ao redor | coração | folha |
| Reserva simples | balão de conversa | calendário com visto |

Os dois primeiros eram **praticamente o mesmo desenho** — duas cúpulas
arredondadas, lado a lado, sem nada que distinguisse café de quarto. O coração
não diz nada sobre natureza e o balão de conversa servia para qualquer coisa.
Agora cada ícone desenha o que a coluna diz, e o calendário é o mesmo dos botões
de reserva, o que amarra a seção ao resto da página.

### O texto

Este texto **não é do cliente** — a seção "Experiência" não existe no site dele,
foi escrita aqui numa rodada anterior. Confirmado antes de mexer: nenhuma das
quatro frases aparece em `alvo/` ou `copies/`. Por isso pôde ser reescrito; o
texto do proprietário continua intocado onde ele existe.

As frases saíram do genérico para o verificável:

- "Comece o dia com energia e conforto" → "Café regional servido todas as
  manhãs, já na diária" — apoiado nos números do próprio cliente
  ("100% Regional / Cafés da Manhã") e na descrição de todos os quartos.
- "Uma base perfeita para chegar perto das cachoeiras" → "A poucos quilômetros
  das cachoeiras, grutas e trilhas" — concreto, e agora a seção seguinte mostra
  essas cachoeiras com foto e endereço.
- "Fale com nossa equipe e confirme sua estadia com agilidade" → "Sem cadastro e
  sem espera: você fala direto com a equipe pelo WhatsApp" — descreve o que o
  formulário realmente faz.

### Limpeza

Com a seção refeita, `.service-card`, `.feature-card`, `.feature-collection`,
`.gallery-card` e `.mini-icon` ficaram sem nenhum uso no HTML — restos das
versões anteriores desta seção e da seção Destino. Todo o CSS deles saiu,
incluindo `.feature-card` dentro de um seletor agrupado com `.room-card`
(removido com cuidado: apagar uma linha de um seletor agrupado já quebrou o
`.btn-cta` duas vezes neste projeto). Verificado: **zero ocorrências** das cinco
classes no arquivo.

E entre 450 e 768px os quatro diferenciais ainda estavam em quatro colunas —
só havia regra de duas colunas abaixo de 450px. Corrigido.

---

## Paleta de fundo: calor, corpo e grão

O fundo era branco puro (`#ffffff`) alternando com um creme quase branco
(`#fdfbee`). A razão de luminância entre as duas faixas era **1,04** — ou seja,
praticamente nenhuma. A página inteira parecia uma folha só, e o creme não
cumpria o papel de separar uma seção da outra.

| | Antes | Agora |
|---|---|---|
| Faixa clara | `#ffffff` | `#fffdf7` |
| Faixa creme | `#fdfbee` | `#f6efdd` |
| Diferença entre elas | 1,04 | **1,13** |

O claro ganhou calor e o creme ganhou corpo. Nenhum dos dois sai da estética da
casa — continuam o mesmo creme da marca, só que agora se vê onde uma seção
termina e a outra começa. Os cartões continuam em branco puro, o que passou a
dar a eles um pouco de relevo contra o fundo, de graça.

### Grão de papel

Cor sozinha não tira a chapa. O que tira é textura — e textura não estava na
lista de proibições, gradiente estava.

Um véu de ruído cinza cobre a página inteira, inclusive as fotos e o cabeçalho
de vidro, a **5,5%** de opacidade:

```css
--textura-grao: url("data:image/svg+xml,…feTurbulence…feColorMatrix saturate 0…");

body::after {
  content: ""; position: fixed; inset: 0;
  z-index: 60; pointer-events: none;
  background-image: var(--textura-grao);
  opacity: 0.055;
}
```

O ruído é gerado pelo próprio SVG (`feTurbulence`), sem arquivo de imagem —
não há requisição nem peso adicional. O `feColorMatrix` tira a cor do ruído,
senão ele entra colorido e suja a paleta. `pointer-events: none` é o que deixa
o véu ficar por cima de tudo sem bloquear um único clique.

A 5,5% não se enxerga como textura: se percebe como papel em vez de tela chapada.

### Um defeito na minha própria verificação

Ao testar as cores novas, descobri que **a varredura de contraste que venho
rodando estava errada**: ela lia a cor do texto e ignorava a opacidade dela.
Um `rgba(0, 35, 72, 0.6)` era medido como se fosse `#002348` opaco — 14,7:1,
aprovado — quando na tela o valor real é 4,37:1, reprovado.

Corrigida a conta, apareceram duas cores que passavam há rodadas:

| Onde | Cor | Real | Mínimo |
|---|---|---|---|
| Rótulo dos números | `rgba(0,35,72,.6)` | 4,37 | 4,5 |
| Crédito das fotos | `rgba(43,61,85,.72)` | — | 4,5 |

As duas viraram um token sólido, `--color-text-soft: #5a6b80`. Sólido de
propósito: cor com opacidade **muda de contraste conforme o fundo atrás**, e
sobre o creme mais encorpado as duas cairiam mais ainda. Um valor fixo dá 5,36
no claro e 4,76 no creme — passa nos dois.

Varredura refeita com a conta certa, em 375px e 1280px: **zero falhas**.

---

## Cartão de quarto: o mesmo vidro da barra, com um canto

O cartão era uma caixa branca com borda, sombra e os quatro cantos arredondados
— a mesma fórmula que foi retirada da seção de diferenciais por parecer painel
de sistema. Agora ele é **a mesma peça de vidro que já existe no topo da
página**, com um canto só.

### O vidro virou token

O degradê e o desfoque estavam escritos à mão dentro da `.nav-row`. Com dois
lugares usando o mesmo material, valor solto vira divergência na próxima
mexida — basta alguém ajustar um e esquecer o outro.

```css
--vidro: linear-gradient(180deg, rgba(255,255,255,.46), rgba(206,227,255,.32));
--vidro-desfoque: blur(30px) saturate(125%);
--vidro-sombra: 0 6px 26px rgba(0,35,72,.08);
```

Escrito uma vez, usado na pílula e no cartão. Verificado no navegador: o
`background-image` computado dos dois é **a mesma string**, caractere por
caractere.

### Um canto só

`border-radius: 0 0 22px 0` — inferior direito arredondado, os outros três em
ângulo reto. Arredondar os quatro devolve a pastilha de painel; arredondar um
vira gesto de desenho, e repetido nos quatro quartos vira assinatura da seção.

O canto fica no cartão, não na foto: o cartão tem `overflow: hidden` e recorta
a imagem junto. Foi preciso tirar o raio que a foto tinha ganhado na tentativa
anterior, senão haveria dois recortes concorrentes no mesmo lugar.

### O contraste que a mudança quebrou

Na versão sem caixa, o "Reservar agora" passou a assentar **no creme da seção**
em vez do branco do cartão, e o `--color-cta` (`#c25400`) caiu de 4,60 para
**4,01:1** — abaixo do mínimo. Trocado por `--color-orange-ink` (`#b34700`),
que existe no projeto exatamente para texto pequeno laranja sobre fundo claro.

A troca continuou valendo com o vidro: medido no ponto mais escuro do degradê
do cartão sobre o creme, dá **4,59:1**. Se tivesse ficado o `#c25400`, ali
daria 3,8.

Medições do texto sobre o cartão de vidro, no pé do degradê (pior caso):

| | sobre creme | sobre claro |
|---|---|---|
| Nome do quarto | 8,39 | 9,16 |
| Descrição | 9,21 | 10,05 |
| Reservar agora | 4,59 | 5,01 |

De quebra, `.room-cta` tinha **`font-size` declarado duas vezes** (0,92rem e
0,88rem), resto de uma rodada anterior. Ficou o valor que já valia.

Sem suporte a `backdrop-filter` o cartão cai para branco sólido — senão ficaria
translúcido sobre a seção, sem o desfoque que o sustenta.

---

## Galeria interativa das atrações e varredura de responsividade

### As cachoeiras viraram galeria, sem setas

Os três cartões estáticos viraram **uma foto em destaque e três tiras**. Clicar
numa tira promove ela ao destaque: a foto troca com um leve esmaecido, o nome e
o endereço acompanham na legenda sobre a imagem, e a descrição do cliente troca
logo abaixo.

Nada de informação nova: os três nomes, os três endereços e as três descrições
são os mesmos de antes, só que agora cada um aparece junto da foto que lhe
pertence.

**Sem setas, a pedido.** O que avisa que há mais coisa ao lado são três sinais
que funcionam juntos, todos discretos:

1. **Espiada** — a tira ocupa 62% da largura no celular, então a seguinte
   sempre aparece cortada na borda. É o sinal mais forte, e não pede nenhum
   ícone.
2. **Esmaecido** — a faixa desbota nos últimos 16% da borda direita
   (`mask-image`), reforçando que o conteúdo continua.
3. **Linha de dica** — "Arraste para ver as outras", em texto pequeno, que
   **some no primeiro arrasto**: depois disso já cumpriu o papel.

Os três só aparecem quando a faixa realmente transborda. Em tela larga as três
tiras cabem, e aí não há nada para avisar — a dica e o esmaecido somem sozinhos.

A galeria de fotos do hotel perdeu as setas pelo mesmo critério e ganhou o mesmo
esmaecido e a mesma dica. Os pontos continuam, que já eram discretos.

**Teclado e leitor de tela:** a faixa é um `tablist` de verdade — setas
esquerda/direita trocam a atração, Home e End vão às pontas, só a tira ativa
entra na ordem de tabulação, e cada foto em destaque é um `tabpanel` ligado à
sua tira. Não usei modal: o destaque já é grande, e um modal só acrescentaria
uma tecla a mais para sair dele.

### Dois defeitos encontrados na verificação

**O `aspect-ratio` não valia nada nas fotos da galeria.** As miniaturas saíam
213×360 em vez de 16:10. O motivo: o atributo `height="360"` do `<img>` entra
como dica de apresentação e **conta como altura declarada** — e com altura
declarada o navegador ignora `aspect-ratio`. Resolvido com `height: auto`. É a
mesma família de armadilha do `flex-shrink` que já tinha achatado a foto do
cartão de quarto.

**938px de rolagem horizontal em 768px de tela.** Essa é a pior: a largura de
tablet nunca tinha sido testada exatamente (as rodadas anteriores usaram 375,
790, 1180 e 1280). A grade da galeria caía para `grid-template-columns: 1fr` no
celular, e `1fr` é `minmax(auto, 1fr)` — o `auto` impede a coluna de encolher
abaixo do min-content do item. Dentro dela há uma faixa rolável com slides em
porcentagem, cujo min-content é enorme: a coluna ia a **1690px**. A regra padrão
já usava `minmax(0, 1fr)`; as sobrescritas do celular, não. Corrigido ali e nas
outras grades de uma coluna, por precaução.

### Outros ajustes

- **Botão do formulário**: "Verificar Disponibilidade" (texto do cliente) ganhou
  "pelo WhatsApp". A frase dele continua; o que se acrescentou foi para onde o
  clique leva.
- **Alvo de toque dos pontos** da galeria: 22×8px era pequeno demais para o
  dedo. A bolinha continua com 8px — quem cresceu foi a área clicável, para
  34×24, via `content-box` + `background-clip`.
- **Botão flutuante do WhatsApp**: menor no celular (48px), respeitando a barra
  de gestos (`env(safe-area-inset-bottom)`), e o rodapé ganhou 90px de folga
  embaixo para ele não cobrir o último conteúdo da página.

### Varredura final

| Largura | Rolagem horizontal | Contraste | Texto cortado | Texto < 11,5px | Imagem quebrada |
|---|---|---|---|---|---|
| 1440 | 0 | 0 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 0 | 0 | 0 |
| 1024 | 0 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 | 0 | 0 |
| 430 | 0 | 0 | 0 | 0 | 0 |
| 390 | 0 | 0 | 0 | 0 | 0 |
| 375 | 0 | 0 | 0 | 0 | 0 |

Console sem erros. Os seis links de WhatsApp apontam para o número certo com
mensagem preenchida. Os sete campos do formulário têm `label` associado.

### O que NÃO foi feito, e por quê

O briefing pedia depoimentos, comodidades e horários de check-in — **sob a regra
de não inventar nada**. Fui procurar no material do cliente antes:

- **Depoimentos**: não existe nenhum. Em `alvo/` há só "4.9/5 Avaliação Média" e
  "+1k" — nenhum nome, comentário ou nota individual. Seção não criada.
- **Check-in / check-out**: só existem como *rótulos de formulário*. Não há
  horário nenhum. Seção não criada.
- **Comodidades**: as que existem (café da manhã, wi-fi, TV, ar-condicionado,
  estacionamento) já estão nos ícones dos cartões de quarto, na lista da seção
  "sobre" e no JSON-LD. Uma seção nova só repetiria.
- **"Por que se hospedar"**: é a seção "Experiência", que já cumpre esse papel
  com quatro diferenciais. Criar outra seria duplicar.

Todas as quatro dependem de dados que o cliente precisa fornecer. O lugar delas
na página existe; o conteúdo, não.

---

## Fundo orgânico vivo e galerias que passam sozinhas

### Uma camada só

Três manchas orgânicas desfocadas, numa única camada `position: fixed` atrás de
todo o conteúdo. Fixa de propósito: assim a ambientação **não recomeça a cada
seção** — é um fundo contínuo por trás da página inteira.

| | |
|---|---|
| Formas | 3 (esquerda, direita-baixo, direita-cima) |
| Desfoque | 70–86px |
| Opacidade da camada | **0,14** desktop · 0,10 tablet · **0,07** celular |
| Cores | verde `#7f9b7c`, areia `#c4ad78`, azul `#6f8bad` — todos lavados |
| Movimento | só translação, 64–110px **no curso inteiro da página** |

A intensidade toda está num número só (`.ambiente { opacity }`). Se um dia
parecer demais, é esse que baixa — não há efeito espalhado por vários lugares.

**O deslocamento não usa a rolagem em pixels, e sim a fração da página já
percorrida (0 a 1).** Com pixels, uma página de 8000px arrastaria as manchas
para fora da tela; com a fração, o curso total é sempre o mesmo, não importa o
tamanho da página. O JS escreve *uma* custom property por quadro e nada mais —
quem desloca é o CSS, via `transform`, que o compositor resolve sem repintar o
desfoque.

**Duas coisas precisaram abrir passagem para a camada:** as três seções creme
tinham fundo opaco (viraram 90% translúcidas, diferença de menos de 2 pontos de
RGB) e a faixa de números tinha fundo próprio da mesma cor do corpo, que só
servia para tapar. Nenhuma outra mudou.

No celular a camada cai para 7% e a terceira forma some: tela pequena tem menos
área vazia, e o que sobra é justamente onde o texto está.

### As galerias passam sozinhas

Ambas avançam a cada **7 segundos**, e o relógio para assim que a pessoa encosta
— clique, foco ou dedo — voltando depois. O controle manual continua inteiro:
arrastar, clicar na tira, clicar no ponto, setas do teclado.

Também param quando a galeria sai da tela (`IntersectionObserver`) e quando a
aba fica em segundo plano. Animar o que ninguém está vendo é trabalho à toa.

### Três defeitos encontrados no caminho

**O parallax se desligava para sempre.** O tratador de `prefers-reduced-motion`
removia o listener de rolagem quando o visitante pedia menos movimento — e nunca
o recolocava se ele voltasse atrás. Porta de mão única. Apareceu porque a camada
nova simplesmente não se mexia: o painel de testes reportou a preferência uma
vez, e pronto. **O mesmo defeito estava no parallax do hero desde o início** —
provavelmente nunca notado porque depende de a preferência mudar com a página
aberta. Os dois agora consultam a preferência a cada quadro, em vez de decidir
uma vez no começo: ligar ou desligar o movimento no sistema passa a valer na
hora.

**A galeria das atrações nunca começava a passar.** O relógio só era acionado
pelo `IntersectionObserver`, e observador não dispara em documento oculto — se a
aba abrisse em segundo plano, a galeria ficava parada para sempre. Agora nasce
ligada e o observador só a desliga se estiver fora da tela, mais um arranque
explícito no fim da montagem.

**O `aspect-ratio` das fotos da galeria** (documentado na seção anterior) era o
terceiro.

### Verificação

Rolagem horizontal, contraste, texto cortado e imagem quebrada: **zero** em
1440, 1280, 768 e 375. Console limpo. A troca automática foi verificada
desligando os guardas temporariamente — a sequência trocou sozinha
(Iracema → Santuário → Maroaga) e os guardas foram repostos em seguida.

**Uma limitação do ambiente de teste, não do site:** o painel do navegador aqui
fica com `document.hidden = true`, e nesse estado o navegador não roda
`IntersectionObserver` nem anima `scroll-behavior: smooth`. Por isso o avanço
automático da galeria do hotel não pôde ser observado diretamente — o código é
o mesmo que já funcionava antes, com o intervalo de 5s para 7s e o observador
novo por cima. Vale conferir num navegador comum.

---

## Galerias em pilha de cartas e fundo mais próximo da referência

### As duas galerias viraram um baralho

A especificação que o cliente enviou descrevia uma pilha de cartas arrastável.
As duas galerias do site passaram a usar o mesmo componente: carta da frente no
centro, vizinhas abertas em leque, giradas e menores.

| Posição | Deslocamento | Giro | Escala | Opacidade |
|---|---|---|---|---|
| frente | 0 | 0° | 1 | 1 |
| ±1 | ±25% | ±10° | 0,9 | 1 |
| ±2 | ±45% | ±15° | 0,8 | 1 |
| demais | ±55% | ±20° | 0,6 | 0 |

É a tabela da especificação, sem alteração. Ela vive numa função só
(`configuracaoDaCarta`), usada pelas duas pilhas — se um dia mudar, muda nas
duas.

**Sem GSAP.** A especificação pedia GSAP, ScrollTrigger e Draggable — três
arquivos de CDN, ~170 KB. O que a pilha anima são `transform` e `opacity`, que
`transition` do CSS resolve, e o arraste são uns 40 linhas de eventos de
ponteiro. O site hoje não tem nenhuma dependência externa, e o próprio briefing
do cliente pedia para evitar bibliotecas novas e cuidar da performance. Feito em
CSS e JS puro. Se ele preferir a biblioteca, a troca é localizada.

Formas de navegar, todas funcionando: arrastar para os lados, clicar numa carta
lateral para trazê-la à frente, clicar nos pontos, setas do teclado com a carta
em foco, e o avanço automático a cada 7 s que pausa ao primeiro toque.

Nas cartas das atrações o nome e o endereço ficam sobre a foto, e a descrição do
cliente troca junto, abaixo da pilha. As cartas da galeria do hotel são só foto:
não há rótulo para elas no material do cliente, e inventar um seria inventar
conteúdo. **A logo do hotel que ficava ao lado da galeria foi removida**, a
pedido.

### Dois defeitos corrigidos

**O clique numa carta lateral parava de funcionar depois de um arraste.** A
distância percorrida ficava guardada numa variável que só era zerada no
`pointerdown` seguinte — então o guarda "se o dedo andou, foi arraste, não
clique" comparava contra um valor velho. Agora a distância é copiada para uma
variável que o clique consome e descarta.

**`setPointerCapture` podia derrubar o tratador.** Capturar o ponteiro é
conveniência, não requisito: serve para o arraste continuar valendo se o dedo
sair da pilha. Envolvido em `try/catch`, para uma recusa do navegador não abortar
o resto do `pointerdown`.

### O fundo, mais perto da referência

O cliente mandou uma imagem de referência: folhagem fora de foco carregada nas
duas bordas, tom de areia à esquerda, verde mais fundo à direita, centro quase
branco.

Não dá para usar a imagem: não gero imagens, e a regra anterior dele era não
usar fotografia de fundo. Refeito em CSS, que não pesa no carregamento e se
adapta a qualquer tela.

A camada trocou de técnica: saíram as três formas em SVG com `filter: blur()`,
entraram **duas faixas laterais feitas de gradientes radiais empilhados**. Sete
círculos moles sobrepostos por lado dão o mote da folhagem desfocada — manchas
dentro de manchas, como lente aberta — e saem de graça para o compositor, sem
custo de desfoque.

**O que protege a leitura é uma máscara horizontal**: força total nas bordas,
onde não há conteúdo, e zero no meio da página. É o mesmo desenho da referência
— laterais carregadas, centro limpo — e é ele que permitiu subir a presença de
0,14 para **0,95** sem encostar no texto.

| | Desktop | Tablet | Celular |
|---|---|---|---|
| Opacidade | 0,95 | 0,50 | 0,34 |
| Largura da faixa | 44vw | 34vw | 26vw |
| Máscara zera em | 42% | 34% | 26% |

Verificado isolando a camada (todo o conteúdo escondido) para ver o perfil de
intensidade ao longo da largura: a cor viva fica nos ~8% externos de cada lado,
e no ponto onde o texto começa já está quase branca.

### Verificação

Rolagem horizontal, contraste, texto cortado e imagem quebrada: **zero** em
1440, 768, 430 e 375. As duas pilhas montam com o número certo de cartas e
pontos. Arraste, clique em carta lateral, clique em ponto e avanço automático
verificados um a um.

---

## Assinatura da marca no contato e fundo na intensidade da referência

### O cartão do WhatsApp deu lugar à marca

O bloco "Reservar pelo WhatsApp" saiu a pedido. No lugar entrou a **assinatura
da casa**: a logo em 130px com 62% de opacidade sobre um filete, e abaixo
"Presidente Figueiredo · Amazônia" em versalete miúdo. Não é botão nem cartão —
fecha a coluna de texto sem disputar com o formulário ao lado.

Nenhum caminho de conversão se perdeu com a remoção: o botão do formulário agora
diz "Verificar disponibilidade pelo WhatsApp", o botão flutuante continua na
tela e o cabeçalho tem o "Reservar Agora". O CSS órfão do cartão saiu junto
(seis blocos).

### O fundo, na presença da referência

Estava fraco demais. Duas mudanças:

**As manchas entraram mais e ficaram mais encorpadas** — o verde da direita foi
de `rgba(84,108,98,.82)` para `rgba(78,102,92,.9)` no topo e de
`rgba(52,75,70,.84)` para `rgba(46,69,64,.9)` no volume de baixo, com as
posições puxadas para dentro.

**A máscara passou a ser medida em pixels a partir do centro**, não em
porcentagem da tela:

```css
rgba(0,0,0,.62) max(6%, calc(50% - 660px))
rgba(0,0,0,.2)  max(14%, calc(50% - 430px))
transparent     max(26%, calc(50% - 230px))
```

Assim a faixa forte termina sempre logo depois da borda do container (640px do
centro), em vez de esticar ou encolher conforme o monitor. Em tela larga sobra
muito mais borda livre, e a camada pode ser rica ali sem chegar perto do texto.

**Os `max()`/`min()` são a trava, e foram necessários:** na primeira tentativa,
só com `calc()`, abaixo de ~1320px os valores ficavam **negativos** e a máscara
apagava a camada inteira — a tela de 790px ficou completamente branca. Com a
trava, quem manda em tela estreita são as porcentagens.

Conferido isolando a camada (todo o conteúdo escondido): a folhagem aparece
clara nas duas bordas, o centro fica limpo, e no ponto onde o texto começa o
tom já está quase branco.

### Varredura de responsividade

| Largura | Rolagem horiz. | Contraste | Texto cortado | Contato | Carta da pilha |
|---|---|---|---|---|---|
| 1440 | 0 | 0 | 0 | 2 colunas | 320px |
| 1024 | 0 | 0 | 0 | 2 colunas | 320px |
| 790 | 0 | 0 | 0 | 2 colunas | 280px |
| 768 | 0 | 0 | 0 | 1 coluna | 280px |
| 412 | 0 | 0 | 0 | 1 coluna | 227px |

Nada desalinhado nem sobreposto: em uma coluna, texto, formulário e assinatura
começam todos no mesmo x e ocupam a mesma largura. Zero imagem quebrada em
todas as larguras.

---

## Painel removido, cartas maiores com setas de vidro e fundo mais aberto

### O painel da selva saiu

O bloco "Um refúgio moderno em meio à selva." foi removido a pedido, com o
parágrafo e o botão "Solicitar reserva" que vinham dentro dele. Sete blocos de
CSS órfão saíram junto.

**O que se perdeu, para registro:** era o único lugar da seção Destino com um
botão de reserva. A conversão na página continua pelo cabeçalho, pelo hero,
pelos quatro cartões de quarto, pelo formulário e pelo botão flutuante — mas
essa seção agora termina sem chamada.

### Cartas maiores e movimento mais macio

| | Antes | Agora |
|---|---|---|
| Altura no desktop | 480px | **580px** |
| Altura no tablet | 420px | 480px |
| Altura no celular | 340px | 400px |
| Transição | 0,62s | **0,85s** |
| Curva | `cubic-bezier(.22,1,.36,1)` | `cubic-bezier(.16,1,.3,1)` |

A curva mais aberta e o tempo maior fazem o leque **assentar** em vez de travar
no fim do percurso. A centralização não mudou — a pilha ganhou
`max-width: calc(altura * 1.55)`, que é a largura do leque mais folga para as
setas, e continua centrada na seção.

### Setas de vidro

Duas por pilha, nas pontas, no **mesmo material da barra de navegação**: o
degradê, o desfoque e a sombra vêm dos tokens `--vidro`, `--vidro-desfoque` e
`--vidro-sombra`. Ficam fora do leque — verificado em todas as larguras que
nenhuma seta encosta na carta da frente.

Não contradizem o pedido anterior de tirar as setas: aquelas eram círculos
sólidos de borda dura no meio da foto. Estas são vidro translúcido nas pontas,
que é o que foi pedido agora.

### O fundo, mais aberto

A máscara ganhou um degrau a mais de cada lado e a zona morta do meio encolheu
de 48% para 20% da largura:

| | Antes | Agora |
|---|---|---|
| Opacidade (desktop) | 0,95 | **1** |
| Opacidade (tablet) | 0,50 | 0,70 |
| Opacidade (celular) | 0,34 | 0,50 |
| Primeiro degrau | 0,62 | **0,80** |
| Zona morta | 42%–58% | 40%–60% |
| Degraus por lado | 2 | **3** |

Três degraus em vez de dois dão uma queda mais gradual — a folhagem vai
aparecendo em vez de cortar, que é o efeito de vidro na frente da mata.

### A logo do contato

Sem véu (opacidade de volta a 1), 150px, e a linha "Presidente Figueiredo ·
Amazônia" removida junto com o CSS dela. Ficou só a marca, com o brilho próprio.

### Verificação

1440, 1024, 995 e 452: zero rolagem horizontal, zero falha de contraste, zero
texto cortado, zero imagem quebrada. As quatro setas funcionam e nenhuma
sobrepõe a carta da frente em nenhuma largura.

---

## "Essência" quebrada no celular, cachoeiras novas e o fundo na terceira versão

### O bug da "essência": eu mesmo causei

No celular a seção "A nossa essência" aparecia em **duas colunas de 69px**, com
as quatro fotos espremidas e o texto quebrando palavra por palavra.

A causa foi uma limpeza de CSS morto minha, três rodadas atrás. Ao remover
`.gallery-grid`, a expressão pegou um **seletor agrupado**:

```css
.card-grid,
.gallery-grid,      /* <- alvo */
.split,
.contact-wrap,
.field-grid,
.footer-grid { grid-template-columns: 1fr; }
```

Como o padrão casava de `.gallery-grid` até a chave de fechamento, levou junto
`.split`, `.contact-wrap` e `.field-grid`. Abaixo de 449px essas três deixaram
de virar uma coluna. Entre 450 e 768px havia outra regra cobrindo, então só a
faixa de celular quebrou — e as varreduras não pegaram porque elas medem
rolagem horizontal e contraste, não "esta grade devia ter uma coluna".

**É a terceira vez que um seletor agrupado me morde neste projeto** (antes foi
`.btn-cta`, duas vezes). A lição, agora escrita: apagar bloco por expressão
regular é seguro para regra de seletor único e perigoso para grupo.

### Cachoeiras

O Santuário saiu a pedido. Entraram duas, com foto e endereço conferidos:

| Atração | Localização | Foto |
|---|---|---|
| Cachoeira da Iracema | BR-174, km 998 · a 8 km do centro | MTur Destinos — domínio público |
| Cachoeira da Pedra Furada | AM-240, km 57 | Luciano cta — CC BY-SA 3.0 |
| Cachoeira das Lajes | BR-174, km 113 | MTur Destinos — domínio público |
| Caverna Refúgio do Maroaga | AM-240 (Balbina), km 6 | Fabricio Ferreira Silva — CC BY-SA 3.0 |

**As descrições das duas novas não são do cliente.** Ele só escreveu texto para
Santuário, Iracema e Maroaga. As da Pedra Furada e das Lajes saíram de guias de
turismo da região e descrevem o que a própria foto mostra — os furos na rocha e
o poço em meia-lua, as corredeiras de água escura. São curtas de propósito: é
espaço reservado para a copy dele, não copy dele.

### O fundo, terceira versão

As duas anteriores erravam pelo mesmo motivo: **muita forma pequena**. Catorze
gradientes por lado viravam mancha picada — ou sumia, ou aparecia demais, nunca
"profundidade".

Agora são **duas luzes só**, cada uma maior que a tela, ancoradas nos cantos que
a página não usa: uma quente no alto à esquerda, uma verde embaixo à direita.
Como nenhuma tem contorno visível, o que se percebe é a variação de tom, não a
forma — e a máscara horizontal deixou de ser necessária.

**Um erro no caminho:** dei `border-radius: 50%` ao elemento, e a borda dele
cortou o gradiente antes de acabar de desbotar — apareceu um arco duro
atravessando a tela. O formato tem de vir do gradiente, não do elemento.

### O leque saindo da tela

Com as cartas maiores, o leque passou a ultrapassar a largura do container no
celular: **77px de rolagem horizontal**. O corte foi para a seção, com
`overflow-x: clip`, e não para o `body`: `clip` não cria área rolável e não
mexe no eixo vertical, então as cartas giradas continuam inteiras em cima e
embaixo — some só o que escapa pelos lados.

### Verificação

| Largura | Rolagem horiz. | "Essência" | Fotos do mosaico | Contraste |
|---|---|---|---|---|
| 1440 | 0 | 2 colunas | 327px | 0 falhas |
| 1024 | 0 | 2 colunas | 244px | 0 falhas |
| 390 | 0 | 1 coluna | 172px | 0 falhas |
| 375 | 0 | 1 coluna | 165px | 0 falhas |

As setas das duas pilhas avançam e voltam, verificadas uma a uma.

### O ponto ativo virou o ícone da marca

Nas duas pilhas, a posição atual deixou de ser um risco azul e passou a ser o
**ícone do site** — o mesmo que aparece na aba do navegador. A pessoa reconhece
sem precisar aprender nada, e o marcador deixa de ser um elemento genérico de
carrossel para virar assinatura.

Os pontos inativos continuam cinza. O ícone fica quadrado (16px), para não
esticar, e **os 24px de alvo de toque continuam**: o ícone cresce e o respiro
encolhe na mesma medida, então a caixa não muda de altura e os pontos não pulam
ao trocar de carta. Medido: todos os pontos com 24px de altura, ativo ou não.

### As setas não funcionavam de verdade — e o teste é que estava errado

O cliente reportou que os botões não passavam a foto. Eu tinha "verificado"
duas vezes que funcionavam. **O teste é que estava errado**, e escondia o
defeito exatamente.

Eu testava com `elemento.click()`, que dispara só o evento `click`. Um toque de
verdade dispara `pointerdown`, depois `pointerup`, e só então `click` — e era
no meio dessa sequência que tudo quebrava:

1. `pointerdown` no botão sobe até a `.pilha`, que chamava `setPointerCapture`.
2. Com o ponteiro capturado, o navegador passa a entregar o `pointerup` ao
   elemento que capturou — a `.pilha` — e não ao botão onde o dedo desceu.
3. O `click` é disparado no **ancestral comum** do `pointerdown` com o
   `pointerup`. Como o `pointerup` foi para a `.pilha`, o clique caía nela.
4. O botão nunca recebia clique nenhum.

Isso derrubava as setas **e** o clique nas cartas laterais. As duas coisas que
eu tinha dado como verificadas.

**A correção:** a captura só entra depois que o dedo anda 6px. Toque parado
segue o caminho normal do navegador e o clique acontece; arraste captura no
primeiro movimento e continua valendo mesmo se o dedo sair da pilha.

Reteste, agora com a sequência completa de ponteiro e sem `.click()` sintético,
nas duas galerias: seta avança, seta volta, carta lateral vem para a frente,
arraste troca a carta, e a classe de arraste não entra antes do movimento nem
fica presa depois. **Lição: testar interação de ponteiro com `.click()` prova
que o tratador existe, não que o usuário consegue chegar nele.**

---

## Rodapé enxuto e botão flutuante de vidro

### O rodapé

Eram três colunas, cada uma com título ("Links Rápidos", "Contato"), mais a
frase do hero repetida embaixo do nome. Num celular isso virava uma tela inteira
de rodapé.

Agora é **uma linha só**: marca à esquerda, seções no meio, chamada à direita —
que no celular vira uma pilha curta.

| | Antes | Agora |
|---|---|---|
| Colunas | 3 com título cada | 1 linha que quebra |
| Links | um por linha (6 linhas) | em linha, quebrando |
| Altura em 1440 | ~420px | **285px** |

**Dois blocos saíram.** Os títulos "Links Rápidos" e "Contato", porque com os
links em linha e uma chamada só não há o que rotular. E a frase *"Sua melhor
escolha em Presidente Figueiredo, com café da manhã incluso e localização
privilegiada no centro da cidade"*, que era **cópia literal do parágrafo do
hero** — o mesmo texto duas vezes na mesma página não é conteúdo, é repetição.
O texto continua no hero, onde o cliente o escreveu.

O endereço virou link para o mapa e o "Reservar Agora" virou pílula contornada,
com 44px de altura.

### O botão flutuante

Ganhou o vidro da barra de navegação, com uma diferença que foi preciso medir:
a barra só aparece sobre fundo claro ou sobre a foto do hero, mas **este botão
passa por cima de tudo**, inclusive do rodapé azul escuro.

Só com o degradê do vidro, o fundo atrás mandaria na cor final e o ícone ficaria
ilegível metade do tempo:

| Ícone | Sobre seção clara | Sobre o rodapé navy |
|---|---|---|
| Verde da marca `#25d366` | 1,87 | **2,45** |
| Verde escuro `#128c7e` | 3,91 | **1,17** |
| Verde `#0b6b5f` + véu branco | **6,06** | **4,18** |

Nenhum verde sobrevive aos dois extremos com o vidro puro. A saída foi um **véu
branco fixo por baixo do degradê**: o vidro continua translúcido e desfocado,
mas a cor final varia pouco, e aí o verde escuro fecha em 4,18 no pior caso —
acima dos 3:1 que um símbolo precisa.

**Um defeito no caminho:** `.floating-actions a` define `color: #ffffff` e tem
especificidade maior que `.fab-whatsapp` (uma classe mais um tipo contra uma
classe só). O branco de lá vencia e o ícone sumia no vidro claro. Só apareceu
porque medi a cor computada em vez de conferir que a regra estava escrita.

### O disco de vidro voltou

Chegou a sair, a pedido, ficando só o símbolo. O cliente preferiu o disco de
volta depois de ver — então está como estava: mesmo vidro da barra de navegação,
com o véu branco fixo por baixo do degradê, e o ícone em verde escuro.

Fica o registro do porquê do véu, que é o que diferencia este botão da barra:
a barra só aparece sobre fundo claro ou sobre a foto do hero, mas o botão
flutuante passa por cima de tudo, inclusive do rodapé azul escuro. Só com o
degradê, o fundo atrás mandaria na cor final e o ícone ficaria ilegível metade
do tempo. Conferido: o `backdrop-filter` do botão e o da barra são a mesma
string.

---

## Tipografia: Inter em tudo

Georgia saiu; Inter entrou, em títulos e corpo.

### Hospedada aqui, não no Google Fonts

Dois arquivos variáveis, **100 KB no total**, servidos pelo próprio site. É uma
requisição a menos para domínio de terceiros e não depende de serviço externo no
ar.

Só o subset **latin**: conferi caractere por caractere que nada na página cai
fora de `U+0000-00FF` e `U+2000-206F` — o `latin-ext` (mais 177 KB) seria peso
morto. O itálico só é buscado se algum texto em itálico renderizar, e o único é
o *portão de entrada* do título da seção "essência".

Variável: um arquivo cobre de 400 a 700, em vez de um arquivo por peso.

### Os pesos mudaram junto

Georgia **não tem 700 de verdade** — o navegador engrossava o 400 artificialmente,
e era por isso que os títulos deste site estavam todos em peso 400. Inter tem a
escala inteira, então os títulos voltaram a ter peso:

| | Georgia | Inter |
|---|---|---|
| h1 | 400 · -0,04em | **600** · -0,032em |
| h2 | 400 · -0,02em | **600** · -0,024em |
| h3/h4 | 700 do navegador | **600** |
| Nomes de quarto, atração, benefício | 400 | **600** |

O tracking do h1 afrouxou de -0,04 para -0,032: Inter já fecha menos que Georgia
em corpo grande, e -0,04 apertava as junções.

### O que se ganha e o que se perde

Ganha uniformidade e legibilidade em tela — Inter foi desenhada para isso.
**Perde o contraste serifa/sem-serifa** que fazia os títulos lerem como hotel e
não como painel de software. Se em algum momento parecer genérico demais, o
caminho é devolver a serifa só aos títulos: é uma linha, o `--font-heading`.

### Verificação

1440, 1100 e 375: zero rolagem horizontal, zero falha de contraste, zero texto
cortado — a troca de fonte muda a largura do texto, então isso precisava ser
conferido de novo. Itálico confirmado como fonte real, não oblíquo sintetizado.

---

## Pilha no celular, título do hero, mapa em destaque e barra mais fina

### O problema da pilha: as cartas de trás saíam da tela

Medido num iPhone de 390px, antes da mudança:

| carta | borda direita | tela |
|---|---|---|
| frente | 328px | 390px |
| vizinha (d=1) | **411px** | 390px |
| de fora (d=2) | **459px** | 390px |

A carta de fora sobrava **69px** de cada lado. O `overflow-x: clip` da seção
cortava o excedente, então não havia rolagem horizontal — mas a foto aparecia
partida na borda. Era isso que se via no celular.

A carta da frente também estava grande: 400px de altura numa tela de 844px é
quase metade da tela só para uma foto.

### A conta que resolve, em vez de um número por breakpoint

Duas mudanças, e a segunda é a que importa.

**A carta acompanha a tela.** `--carta-altura: clamp(280px, 8rem + 48vw, 400px)`
no lugar dos 400px fixos. Num 390 dá 315px (um quinto menor), num 320 desce até
o piso de 280px, e de ~515px para cima a conta já devolve os 400px de antes —
**tablet e desktop não mudam nada**.

**O leque abre só o que cabe.** A geometria do baralho está em percentuais da
largura da carta (25% para a vizinha, 45% para a de fora), e a carta de fora é
sempre a mais larga das visíveis porque gira 15°. A meia largura da caixa que
envolve uma carta girada é

```
(escala × (cos t + 1,5 × sen t)) ÷ 2
```

— o 1,5 é a altura em larguras de carta, já que a carta é 2×3. Para a carta de
fora isso dá 0,5416 largura de carta. Somando o deslocamento, a borda fica a
`(0,45 × fator + 0,5416)` larguras do centro. Igualando ao espaço disponível até
a borda da tela (menos 8px de respiro) sai o fator, com teto em 1.

Resultado medido depois:

| tela | carta | fator | o leque ocupa | sobra |
|---|---|---|---|---|
| 320 | 282×188 | 0,60 | 8 – 312 | 8px |
| 375 | 308×205 | 0,61 | 8 – 367 | 8px |
| 390 | 315×210 | 0,63 | 8 – 382 | 8px |
| 430 | 334×223 | 0,83 | 9 – 421 | 9px |
| 768 | 480×320 | **1** | 59 – 694 | inalterado |
| 1440 | 580×387 | **1** | 329 – 1096 | inalterado |

No desktop os transforms saem literalmente `25%` e `45%`, como antes: conferi no
DOM. Só o celular mexe.

Por que um fator calculado e não um valor por media query: a largura da carta já
varia com a tela, então qualquer número fixo erraria em metade dos aparelhos. A
conta acerta em 320, em 430 e em qualquer dobrável que apareça depois. É
recalculada no `resize` — testei redimensionando sem recarregar.

Só o **deslocamento** entra no fator. Giro e escala ficam de pé: encolher os três
juntos achataria o baralho num monte de cartas empilhadas.

### O título do hero

Três coisas erradas, todas herança da Georgia.

**O tracking.** Estava em -0,032em. A Inter publica a curva de tracking dela, e
em corpo de título (32–72px) ela pede **-0,022em**, praticamente constante. O
-0,032em vinha da Georgia, que precisa de bem mais aperto em corpo grande — na
Inter colava as letras. Corrigido para o valor da própria fundição.

**O tamanho no celular.** `clamp(2.2rem, 4.2vw, 4.5rem)` travava em 35,2px em
qualquer tela abaixo de 838px. Num 390 isso dava **quatro linhas curtas**. A
curva nova, `clamp(2rem, 1.34rem + 2.71vw, 4.5rem)`, passa pelos mesmos 60,4px a
1440 e pelo mesmo teto de 72px — só o pé desceu, para 32px.

**A quebra.** `text-wrap: balance` no h1 do hero. O navegador reparte as palavras
entre as linhas em vez de encher cada uma até o limite.

| tela | antes | depois |
|---|---|---|
| 390 | 4 linhas, 35,2px | 3 linhas, 32px |
| 430 | 4 linhas | **2 linhas**, 33,1px |
| 1440 | 2 linhas (682/718) | 2 linhas (697/718) |

Onde não houver suporte a `balance`, a quebra volta a ser a comum — nada quebra.

A três linhas o rasgo continua desigual (158 / 249 / 335 num 375) e o "no" fica
pendurado no fim da segunda. Não dá para melhorar sem descer para 28px: a palavra
"Hospitalidade" sozinha ocupa 210px e não se divide. Preferi o título maior.

### Localização: o mapa vira a seção

Era grid de duas colunas — texto em `1fr`, mapa em `1.1fr`, o mapa com 320px de
altura ocupando pouco mais da metade da largura. Agora o mapa ocupa a **largura
inteira** (1280×422 no desktop) e o texto virou um cartão apoiado sobre ele, no
canto esquerdo, com sombra. No lugar do nome escrito entra a **logo**.

O `<h3>` continua ali, com a logo dentro: o sumário da página não perde um nível
e o nome do hotel continua a ser lido, pelo `alt` da imagem.

O cartão fica centrado na vertical e **não desce até o pé do mapa**. Isso não é
estética: a assinatura do Google e os créditos de dados ficam colados no rodapé
do iframe, e o uso do mapa incorporado exige que continuem à vista. Sobra medida:

| tela | cartão | sobra abaixo |
|---|---|---|
| 1440 | 390×284 | 69px |
| 1024 | 390×284 | 69px |
| 820 | 325×310 | 56px |
| 769 | 303×310 | 56px |

Abaixo de 768px o cartão desce para baixo do mapa, inteiro, com 16px de respiro
— **sem sobrepor nem um pouco**, pelo mesmo motivo: numa tela de 390px qualquer
sobreposição cobriria os créditos, que ficam justamente no canto de baixo.

### A assinatura da marca saiu do contato

O bloco com a logo ao pé da coluna de texto do formulário foi removido a pedido:
HTML, CSS e a faixa `"direto"` do grid. A área nomeada tinha de sair junto — uma
faixa sem elemento continuaria no `grid-template-areas`.

### Barra mais fina no celular

Só abaixo de 450px. No desktop continua igual.

| | antes | depois |
|---|---|---|
| barra sobre o hero | 72px | **64px** |
| pílula de vidro (rolada) | 66px | **56px** |
| logo | 44px | **38px** |

Os três descem juntos: baixar só a barra encostaria a logo nas bordas. O alvo de
toque do menu continua com **44×44px** — conferido no DOM. Quem encolheu foi o
respiro em volta, não o botão.

### Verificação

320, 360, 375, 390, 430, 560, 768, 769, 820, 1024, 1280 e 1440: zero rolagem
horizontal em todas.

As setas das galerias testadas com clique real (não `element.click()`, que já
escondeu esse defeito uma vez): direita levou de 5 para 6, esquerda de 6 para 5,
num 390.

### Aberto para o cliente

O título da seção diz "**Estaremos** no coração de Presidente Figueiredo" —
futuro, para um hotel que já está funcionando. Provavelmente é "Estamos". Não
mudei porque é texto de vitrine, não erro de código; fica para o dono decidir.

---

## Redesenho pelo modelo: reserva, quartos, experiência e chamada final

O pedido foi "igual a esse modelo, mas as cores da logo". Então: **layout do
modelo, paleta e tipografia da casa**. Azul `#0047b3` e laranja `#f97300`
continuam, e a Inter continua em tudo.

Cheguei a trocar por verde/dourado e por uma serifada (Cormorant) antes da
correção, e desfiz as duas — os dois arquivos da serifada foram apagados, não
ficaram pesando no projeto.

### A conta que faz o hero e a barra conviverem

Dois pedidos que, lidos rápido, se contradizem: a foto tem que ocupar a tela
inteira ao abrir **e** a barra de reserva tem que ficar por cima da beirada de
baixo dela.

Dá para ter os dois se o hero for mais alto que a tela **exatamente na medida da
sobreposição**:

```
altura do hero  = 100svh + S
margem da barra = -S
topo da barra   = (100svh + S) - S = 100svh  ← a dobra
```

Com `S = 56px` no desktop e `30px` no celular. Medido num iPhone de 375px: hero
com 842px, tela com 812px, topo da barra em 812px. **Zero pixel do cartão na
primeira tela**, e 30px de sobreposição assim que se rola.

Os dois valores saem da mesma variável, `--barra-sobre`, no `:root`. Não é
capricho: se um mudar sem o outro, a ponta do cartão volta a aparecer. Ela fica
no `:root` porque o hero e a barra são **irmãos** — custom property desce pela
árvore, não atravessa irmão.

O indicador "Explore" saiu, a pedido.

### Barra de reserva: um caminho só

Check-in, check-out, hóspedes e quarto. Ela **não envia nada por conta própria**:
copia os quatro campos para o formulário do Contato, leva a pessoa para lá e põe
o foco no primeiro campo que falta. Um único caminho de reserva — o do WhatsApp,
que é o que o hotel usa — em vez de dois que podiam divergir.

"Todos os quartos" é o estado neutro da barra e não existe no formulário
completo, então não viaja.

Desktop: uma linha, filetes entre os campos. Tablet: 2×2 com o botão inteiro
embaixo. Celular: empilhada. O botão é **azul, não laranja** — o laranja já está
no hero logo acima e dois laranjas colados tiram o destaque um do outro.

### Quartos: tudo dentro da foto

Primeiro fiz vitrine + uma lista por extenso embaixo. O pedido depois foi claro:
**tudo na imagem**. A lista saiu e a etiqueta passou a carregar nome, capacidade,
área, ar-condicionado, preço e o botão de reserva.

O ponto crítico de contraste não é a base do degradê, é o **meio**, onde fica o
nome do quarto. Com o meio em 0,55 o branco dava 4,15:1 sobre a roupa de cama
clara — passa como texto grande, mas raspando. Subi para 0,62: **4,7:1**. Na
altura dos dados e do preço o degradê já está em 0,9 e a razão é de **13:1**.

A caixa da etiqueta não recebe ponteiro, senão engoliria o arraste do carrossel;
só o botão de reservar volta a receber.

O carrossel dos quartos é **novo e separado** das duas galerias em pilha — elas
não foram tocadas. Três baralhos iguais na mesma página ficaria repetitivo, e o
modelo mostra uma foto plana aqui. Mesmo vocabulário: setas, pontos, teclado,
arraste. Testado com clique e arraste reais a 375px: setas 2→3→4 e 4→3, arraste
3→4, `transform` em -300% para o índice 3.

### Experiência: faixa escura

Foto da mata atrás, véu do azul da marca por cima, título à esquerda e sete itens
em duas colunas com ícones finos. É a única seção escura no meio da página —
serve de pausa entre os quartos e o destino.

Os sete itens **já existiam no site**: quatro vinham dos cartões desta seção e
três da lista da "essência". Nada foi acrescentado.

### Barra de navegação

Afinada a pedido, e a pílula subiu:

| | antes | agora |
|---|---|---|
| barra sobre o hero (desktop) | 82px | **70px** |
| pílula rolada (desktop) | 66px | **56px** |
| barra sobre o hero (celular) | 64px | **58px** |
| pílula rolada (celular) | 56px | **50px** |
| logo | 44px | **38px** (34 no celular) |
| altura em que a pílula flutua | 14px do topo | **8px** |

O alvo de toque do menu continua **44×44px** — conferido no DOM.

### Verificação

375, 430, 768, 1024 e ~1230: `scrollWidth` nunca passa da largura da tela. O que
o auditor aponta como "fora" são só elementos dentro de contêiner com
`overflow: hidden` — a camada de ambientação, a foto do hero em `scale(1.06)` e
os slides do carrossel que aguardam a vez.

### O que não foi feito, e por quê

**Depoimentos não existem.** O modelo tem um card de avaliação cinco estrelas com
texto de hóspede. **Não há nenhuma avaliação real no projeto.** Inventar uma seria
fabricar prova social para um negócio de verdade. A seção fica de fora até o dono
fornecer os depoimentos.

**Estacionamento não entrou** na lista de comodidades. O modelo mostra, o site
nunca afirmou. Se o hotel tem, é só dizer.

**As duas galerias em pilha ficaram como estavam.** O briefing permitia refinar,
mas elas já tinham sido ajustadas a pedido nas rodadas anteriores e a avaliação
foi "no desktop estão ótimas". Mexer sem pedido seria churn.

**Sobrou CSS órfão** das classes da grade antiga de quartos (`.room-card`,
`.card-image`, `.card-body`, `.beneficio` e vizinhas). Escrevi um limpador que
poda seletor a seletor — para não repetir o acidente do seletor agrupado, que já
quebrou este projeto três vezes — mas ele entrou em laço e foi abortado. O
arquivo ficou intacto. São cerca de 5 KB sem efeito nenhum; fica para depois.

### Aberto para o cliente

Além do que já estava em aberto: os números da faixa de estatísticas
(**2.500+ hóspedes**, **15+ cachoeiras**, **10+ anos**) não têm origem
conhecida — vieram do template original. São exatamente o tipo de número que o
briefing manda não inventar. Valem uma conferência com o dono antes da proposta.

### As setas dos quartos saem de cima da foto no celular

Relato: "no mobile as setas estão atrapalando na hora de escolher um modelo de
quarto". Duas coisas aconteciam ao mesmo tempo, e a segunda é a pior.

**Tapavam o quarto.** No desktop a foto tem 706px e dois discos nas laterais não
incomodam. Num celular ela tem 358px: os mesmos dois discos comiam 24% da largura,
bem em cima da cama.

**Comiam o começo do arraste.** O handler ignora o gesto que nasce sobre uma seta
(senão arrastar a partir dela brigaria com o clique). Só que num celular o dedo
parte justamente do meio da tela — exatamente onde elas estavam. O deslize
simplesmente não pegava em boa parte das tentativas.

Agora descem para a linha dos pontos, uma em cada ponta: `[←]  • • • •  [→]`.
A foto inteira volta a ser arrastável e os botões continuam lá, um pouco maiores
(42px). Fora da foto o vidro não tem o que desfocar, então viram disco sólido com
filete — mais contraste sobre o creme.

**Isso exigiu separar palco de janela.** A janela corta os slides que aguardam a
vez (`overflow: hidden`), e por isso as setas, sendo filhas dela, não tinham como
descer para fora da foto — ficavam presas no recorte. A primeira tentativa falhou
exatamente por isso: `bottom: 0` resolvia contra a janela, não contra a vitrine.
Agora `.carrossel-palco` envolve a janela, não corta nada, e é contra ele que as
setas se posicionam.

Medido a 390px: foto termina em 402, setas em [414, 456], linha dos pontos em
[414, 456] — encaixe exato, nada sobre a foto. Testado com toque e arraste reais
a 375px: seta levou de 2 para 3, e o arraste no meio da foto — o gesto que antes
falhava — levou de 3 para 4. No desktop as setas continuam centradas na foto,
conferido.

### Números no fim, e um botão a menos nos quartos

**A faixa de números foi para o fim**, logo depois do formulário. Ficava abaixo
do hero, antes de a pessoa saber qualquer coisa sobre o hotel — quatro números
soltos como primeira informação da página. No fim ela fecha a visita. A ordem
agora é: hero, reserva, essência, quartos, experiência, destino, galeria,
localização, contato, números, chamada final, rodapé.

**O botão "Reservar agora" da coluna de texto dos quartos saiu.** Depois que
preço e reserva entraram na própria foto, cada quarto passou a ter o seu botão:
o da seção virava um quinto botão apontando para outro lugar, ao lado de quatro
que reservam o quarto certo. A regra `.btn-linha` saiu junto, já que era a única
que a usava.

### A chamada final muda de lugar e perde o botão do WhatsApp

Foi parar **logo depois da galeria das cachoeiras**: é o ponto em que a pessoa
acabou de ver o que há para fazer na região, e o convite chega junto com a
vontade. No fim da página ela vinha depois da faixa de números, já perto do
rodapé, onde o convite chega tarde.

**O botão do WhatsApp saiu** a pedido. Não se perde caminho nenhum: o WhatsApp
continua no hero, no botão flutuante que acompanha a rolagem, no botão de cada
quarto e no próprio envio do formulário. Com um botão só, o laranja fica sem
concorrência e a faixa tem uma ação óbvia.

No celular o botão ocupa a linha inteira (16 a 374 num 390), com 42px de altura.

### O que vem em todos os quartos virou ícone dentro da foto

A frase "Todos os quartos incluem café da manhã, televisão, wi-fi e
ar-condicionado" e o filete que ela desenhava saíram. As quatro comodidades
entraram no cartão de cada quarto **como ícone, sem legenda** — a legenda seria
a mesma nos quatro e comia foto.

Sem texto visível, mas **não sem nome**: cada ícone leva o rótulo em texto oculto,
que é o que o leitor de tela anuncia, e um `title` para a dica no mouse. Ícone
mudo não serve para ninguém. Um filete separa o que é daquele quarto (pessoas,
m²) do que vem em todos.

### A informação encolheu, o preço não

| | antes | agora |
|---|---|---|
| nome do quarto | 1,4rem | **1,15rem** |
| dados | 0,84rem | **0,75rem** |
| respiro de cima da etiqueta | 72px | **52px** |
| **preço** | 1,5rem | **1,5rem** |

O preço ficou onde estava de propósito: é o que a pessoa procura, e continua
sendo o maior texto da etiqueta.

No desktop a etiqueta passou a ocupar **34%** da foto. No celular ainda dava 58%,
mas ali o problema não era o texto e sim a foto: 4:3 numa coluna de 358px dá só
269px de altura. Passando a foto para quadrada no celular ela vai a 358px e a
mesma etiqueta cai para **44%**. O corte é nas laterais, que é onde a foto de um
quarto tem menos informação.

### O cartão do mapa vira peça escura

Mesma posição de antes, sobre a borda esquerda do mapa. O que mudou:

**O botão "Abrir no Google Maps" saiu.** O caminho para o Maps não se perde: o
link continua no rodapé, e o próprio mapa incorporado é clicável.

**O fundo é o mesmo da faixa "Pronto para viver essa experiência"** — a mesma
foto e o mesmo degradê do azul da marca, não um escuro parecido.

O véu daqui é mais fechado que o da faixa (0,96 contra 0,88) por um motivo
técnico: lá a foto entra com `opacity: 0.28` no próprio `img`, e aqui ela é
imagem de fundo, que não aceita opacidade separada. Com 0,88 a foto aparecia
três vezes mais e o cartão ficava lavado. A 0,96 a contribuição dela cai para
perto de 4%, que é a da faixa: mesmo azul, mesma foto quase imperceptível. As duas peças
escuras da página passam a ser do mesmo material. Sobre um mapa colorido o cartão
claro era só mais uma superfície clara; escuro, ele manda na composição. O texto
ficou branco a 0,9, que dá 13:1 sobre o véu.

**O formato é o do painel de reserva do topo:** cantos arredondados nos quatro
lados, no mesmo raio de 12px, e sombra.

**Encolheu junto com o conteúdo.** Sem o botão sobrou logo e uma frase: a largura
caiu de `min(390px, 42%)` para `min(340px, 38%)` e a caixa fechou em 340×202 em
vez de guardar vazio. Continua sem cobrir os créditos do Google — sobram 110px
abaixo dela.

**No celular o cartão vai de ponta a ponta.** Flutuando sobre o mapa ele é um
painel; empilhado numa tela estreita, com 16px sobrando de cada lado, virava um
retângulo escuro solto no meio do creme. De ponta a ponta ele lê como faixa — a
mesma linguagem da "Pronto para viver essa experiência" logo abaixo — e as duas
peças escuras da página passam a se comportar igual.

Os `-16px` de margem são exatamente o respiro lateral do container
(`width: 100% - 32px`), então a caixa chega à borda da tela sem passar dela:
medido a 390px, o cartão ocupa de 0 a 390 e o documento continua com 390 de
largura, zero rolagem horizontal. O mapa continua emoldurado, com as margens.

Vale abaixo de 768px, que é o mesmo corte em que o cartão deixa de flutuar: onde
ele empilha, empilha inteiro. No desktop nada muda — conferido que continua
flutuando em 340×202, com os 110px de folga para os créditos do Google.

### "A nossa essência" desce para depois da Experiência

Nova ordem: hero, reserva, quartos, experiência, **essência**, destino, galeria,
localização, chamada, contato, números, rodapé.

O ritmo de fundos continua alternando, que é o que evita duas faixas iguais
coladas: quartos (creme) → experiência (escura) → essência (fundo base) →
destino (creme) → galeria (base) → localização (creme).

O link "Sobre" da navegação continua funcionando — o `id` foi junto com a seção.
Conferido que nenhum link interno do menu aponta para âncora inexistente.

Ordem final da página: hero, reserva, quartos, experiência, essência, destino,
**chamada**, galeria, localização, contato, números, rodapé. O ritmo de fundos
segue alternando: destino (creme) → chamada (escura) → galeria (base) →
localização (creme).

### Acomodações em fundo branco

A seção saiu da faixa creme e ganhou fundo branco: é a seção em que as fotos de
quarto mandam, e branco é o fundo que menos tinge uma fotografia.

Branco **semitransparente** (0,94), pelo mesmo motivo que a faixa creme é 0,9:
sólido, ele taparia a camada de ambientação e abriria um buraco no meio da
página. A 0,94 a cor resultante fica a menos de 1 ponto de RGB do branco puro.

Uma consequência de ser branco: contra o fundo base da página (`#fffdf7`), que é
o que vem logo acima, a diferença é de cerca de 1,02 de razão — ou seja, a borda
de cima da seção quase não se vê. Quem delimita a seção é a faixa escura da
Experiência, logo abaixo. Se em algum momento parecer que a seção "não começa",
o caminho é essa borda de cima, não o branco.

### O papel da página passa a ser branco

Sobrava uma faixa bege de 30px entre a barra de reserva e as acomodações. Não era
a seção: era o **fundo da página** aparecendo entre duas superfícies brancas. O
`--color-bg` era `#fffdf7`, um branco quente, que lado a lado com branco de
verdade lê como bege.

Duas mudanças:

- `--color-bg` passou a ser `#ffffff`.
- A barra de reserva perdeu o `margin-bottom: 14px`. A seção de baixo já tem o
  respiro dela, e aqueles 14px só serviam para deixar passar o fundo.

O creme das faixas continua com corpo: medida, a razão entre o branco e o creme
é **1,131**, praticamente a mesma de antes — ainda se vê onde uma seção termina.

### As cartas das duas galerias ficam retas

O giro foi a zero em todas as posições da tabela do leque. As cartas de trás
continuam atrás, deslocadas, menores e um pouco mais baixas — a profundidade
passa a vir da **escala e do degrau vertical**, não da inclinação. A animação, o
arraste, as setas, os pontos e o avanço automático não mudaram em nada.

A coluna `giro` continuou na tabela em vez de sumir, porque o resto do código lê
essa tabela. E aí estava um acoplamento que valia corrigir: o cálculo da abertura
do leque repetia os números da carta de fora (`meiaCaixa(0.8, 15)` e `0.45`).
Agora ele pergunta à própria tabela:

```js
const fora = configuracaoDaCarta(2, 0, 5);
... meiaCaixa(fora.escala, fora.giro) ... fora.x / 100
```

Com isso a conta se ajustou sozinha quando o giro caiu para zero — e **o leque
pôde abrir mais**, porque carta reta ocupa menos largura que carta girada. Num
390px a pilha passou a usar de 16 a 374, a coluna inteira.

Verificado: todos os `rotate` renderizados são `0deg`, nas duas galerias, e o
documento continua sem rolagem horizontal. Seta e arraste testados com evento
real a 390px — a seta avançou e o arraste levou de 5 para 6.

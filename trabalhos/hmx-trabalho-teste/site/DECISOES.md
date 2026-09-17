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

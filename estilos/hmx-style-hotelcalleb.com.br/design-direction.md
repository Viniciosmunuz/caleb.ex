# Direção criativa da referência (medida da página real)

> Extraída por computed-styles do HTMLmentor em https://hotelcalleb.com.br/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeQUJ675tC4SoBuPTn1K_s2N4v5AyIVLwW_9iXYTjKq6nn83W6BFw149s_pJA_aem_redB1JcuXn0TFHwVJXUNZw#.
> **Esta é a fonte autoritativa de ESTILO.** Replique paleta, tipografia,
> espaçamento, raios, sombras, botões e a **disposição de elementos por seção**.
> A COPY e as imagens vêm do alvo/novo nicho — não copie os textos da referência.
>
> Elementos medidos: 796. Viewport de captura: 1478px.

## 📷 Design conduzido por FOTOGRAFIA

A referência usa 28 foto(s) grande(s) — cerca de 4 por seção. **A sofisticação dela está nas imagens, não só na cor e no tipo.**

- Reproduzir este layout **sem fotos reais** produz uma página muito
  inferior à referência, ainda que paleta e tipografia estejam perfeitas;
- **nunca** preencha os espaços de imagem com placeholder SVG geométrico
  (elipses, círculos com ícones, figuras abstratas) — clip-art num layout
  editorial é pior que não ter imagem;
- ordem de preferência: (1) fotos reais do alvo/nicho — veja `assets/` do
  pacote de copy e o `images-manifest.json`; (2) se não houver, peça as
  fotos ao cliente e deixe `[FOTO: descrição]` marcado; (3) só em último
  caso, um tratamento **tipográfico contido**, sem tentar imitar as fotos.

## ⚑ Tema predominante: ☀️ CLARO

Base `#ffffff` — 6 seção(ões) clara(s) / 1 escura(s). **A página nova deve ser predominantemente CLARA**, incluindo o hero. Use o tom oposto **apenas** nas seções marcadas com o tom contrário abaixo — não inverta o tema geral por preferência estética do nicho.

## Paleta (por uso real na tela)

| Papel | Cor | Uso | Vividez |
|---|---|---|---|
| surface | `#f5f5f5` | background | 0 |
| bg | `#ffffff` | background | 0 |
| — | `oklab(0.4356 -0.0301778 -0.179942 / 0.4)` | background | 0 |
| — | `#003c96` | background | 1 |
| — | `#0047b3` | background | 1 |
| — | `#f97300` | background | 1 |
| muted | `oklch(0.446 0.03 256.802)` | text | 0 |
| muted | `oklab(0.999994 0.0000455677 0.0000200868 / 0.6)` | text | 0 |
| muted | `#ffffff` | text | 0 |
| muted | `oklab(0.999994 0.0000455677 0.0000200868 / 0.7)` | text | 0 |
| border | `oklch(0.967 0.003 264.542)` | border | 0 |
| border | `oklab(0.999994 0.0000455678 0.0000200868 / 0.1)` | border | 0 |
| primary/accent | `#0047b3` | accent | 1 |
| accent | `#003c96` | accent | 1 |
| accent | `#f97300` | accent | 1 |

> **Cor(es) de acento/marca:** `#0047b3`, `#003c96`, `#f97300` — o accent vívido, que o peso-por-área esconderia. Use como `--color-accent` nos CTAs/destaques.

Tokens `:root` sugeridos:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #003c96;
  --color-heading: #003c96;
  --color-muted: #f97300;
  --color-border: oklch(0.967 0.003 264.542);
  --color-accent: #0047b3;
  --color-primary: #0047b3;
  --color-primary-hover: #002894;
  --font-heading: Georgia;
  --font-body: Inter;
  --radius: 3.35544e+07px;
}
```

## Tipografia

- **Famílias por uso:** `Inter`, `Outfit`, `Georgia`
- **H1:** `Georgia` · 96px · peso 300 · lh 105.6px · ls -2.4px · cor #ffffff
- **H2:** `Georgia` · 60px · peso 300 · lh 75px · cor #003c96
- **H3:** `Outfit` · 30px · peso 700 · lh 36px · cor #ffffff
- **H4:** `Inter` · 12px · peso 700 · lh 16px · ls 2.4px · uppercase · cor #f97300
- **Body:** `Inter` · 14px · peso 700 · lh 20px · cor #ffffff

## Espaçamento, raios e sombras

- **Padding vertical de seção (px):** 80, 96
- **Gaps de grid/flex (px):** 4, 8, 16, 24, 32, 64
- **Larguras máximas de container (px):** 576, 672, 1024, 1280
- **Raios:** 3.35544e+07px, 24px, 12px, 16px, 4px, 40px (dominante: 3.35544e+07px)
- **Sombras:**
  - `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(`
  - `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, `
  - `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(`
  - `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px`
- **Cores de borda:** oklch(0.967 0.003 264.542), oklab(0.999994 0.0000455678 0.0000200868 / 0.1), #0047b3, oklab(0.999994 0.0000455678 0.0000200868 / 0.2), #ffffff, oklab(0.999994 0.0000455678 0.0000200868 / 0.05)
- **Gradientes de fundo:**
  - `linear-gradient(oklab(0 0 0 / 0.6) 0%, rgba(0, 0, 0, 0) 50%, oklab(0 0 0 / 0.6) 100%)`
  - `linear-gradient(to top, oklab(0 0 0 / 0.9) 0%, oklab(0 0 0 / 0.2) 50%, rgba(0, 0, 0, 0) 100%)`
  - `linear-gradient(to top, oklab(0 0 0 / 0.6) 0%, rgba(0, 0, 0, 0) 100%)`

## Botões

- **Primário (`.btn-cta`):** bg #0047b3 · texto #ffffff · raio 3.35544e+07px · padding 8px 24px 8px 24px · fonte 12px/700 · transição color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1)
- **Secundário (`.btn-secondary`):** bg transparent · texto #0047b3 · borda 2px solid #0047b3 · raio 3.35544e+07px · padding 16px 40px 16px 40px · fonte 16px/700 · transição all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## Disposição de elementos por seção

> Medido em desktop (1440px), tablet (768px), mobile (390px).
>
> **Leitura:** `conteúdo` é o container real que segura os elementos (não o
> wrapper de padding). `cards: N × [ partes ]` descreve um grupo repetido e o
> que **cada** card carrega — reproduza essa riqueza (mídia/ícone/número/título/
> texto/lista/botão), **nunca** caixas de texto puro. `forma` é o arranjo da seção.

### 1. hero — Conforto e Hospitalidade no Coração da Amazônia.
`section`
- **tom:** ☀️ claro (bg #ffffff, texto oklch(0.21 0.034 264.665))
- **desktop:** flex horizontal, justify center, align center
- **tablet:** flex horizontal, justify center, align center
- **mobile:** flex horizontal, justify center, align center
- **forma:** 2 cards lado a lado
- **cards: 2 × [ ícone ]** — desktop: flex horizontal, justify center, align center · tablet: flex horizontal, justify center, align center · mobile: flex horizontal, justify center, align center
- **mídia na seção:** 6 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (absolute.inset-0): fluxo padrão (block)
    - `div` (relative.z-20): padding-x 24px, max-width 1024px, centralizado, texto center
    - `div` (absolute.bottom-10): fluxo padrão (block)
    - `div` (absolute.bottom-10): fluxo padrão (block)

### 2. section — 2.500+
`section`
- **tom:** 🌑 escuro (bg #003c96, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 80px/80px
- **tablet:** padding-y 80px/80px
- **mobile:** padding-y 80px/80px
- **forma:** grade de cards
- **conteúdo:** desktop: grid 4 colunas, gap 32px · tablet: grid 4 colunas, gap 32px · mobile: grid 2 colunas, gap 32px
- **cards: 4 × [ ícone + título + texto ]** — desktop: grid 4 colunas, gap 32px · tablet: grid 4 colunas, gap 32px · mobile: grid 2 colunas, gap 32px
- **mídia na seção:** 4 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

### 3. about — Sua melhor escolha
`section #sobre`
- **tom:** ☀️ claro (bg #ffffff, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 96px/96px
- **tablet:** padding-y 96px/96px
- **mobile:** padding-y 96px/96px
- **forma:** split (mídia + texto)
- **conteúdo:** desktop: flex horizontal, gap 64px, align center · tablet: flex vertical, gap 64px, align center · mobile: flex vertical, gap 64px, align center
- **mídia na seção:** 8 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

### 4. section — delegações
`section #quartos`
- **tom:** ☀️ claro (bg #f5f5f5, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 96px/96px
- **tablet:** padding-y 96px/96px
- **mobile:** padding-y 96px/96px
- **forma:** grade de cards
- **conteúdo:** desktop: padding-x 32px, max-width 1280px, centralizado · tablet: padding-x 24px, max-width 1280px · mobile: padding-x 16px, max-width 1280px
- **cards: 3 × [ mídia + título + texto + link/botão ]** — desktop: grid 3 colunas, gap 40px · tablet: grid 2 colunas, gap 40px · mobile: grid 1 coluna, gap 40px
- **mídia na seção:** 28 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

### 5. section — Explore o Destino
`section #turismo`
- **tom:** ☀️ claro (bg #ffffff, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 96px/96px
- **tablet:** padding-y 96px/96px
- **mobile:** padding-y 96px/96px
- **forma:** grade de cards
- **conteúdo:** desktop: padding-x 32px, max-width 1280px, centralizado · tablet: padding-x 24px, max-width 1280px · mobile: padding-x 16px, max-width 1280px
- **cards: 3 × [ mídia + título + texto ]** — desktop: grid 3 colunas, gap 32px · tablet: grid 1 coluna, gap 32px · mobile: grid 1 coluna, gap 32px
- **mídia na seção:** 9 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

### 6. section — Galeria de Fotos
`section #galeria`
- **tom:** ☀️ claro (bg #f5f5f5, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 96px/96px
- **tablet:** padding-y 96px/96px
- **mobile:** padding-y 96px/96px
- **forma:** grade de cards
- **conteúdo:** desktop: padding-x 32px, max-width 1280px, centralizado · tablet: padding-x 24px, max-width 1280px · mobile: padding-x 16px, max-width 1280px
- **cards: 6 × [ mídia ]** — desktop: gap 24px · tablet: gap 24px · mobile: gap 24px
- **mídia na seção:** 16 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

### 7. contact — Reserve sua estadia premium hoje.
`section`
- **tom:** ☀️ claro (bg #ffffff, texto oklch(0.21 0.034 264.665))
- **desktop:** padding-y 96px/96px
- **tablet:** padding-y 96px/96px
- **mobile:** padding-y 96px/96px
- **forma:** split (mídia + texto)
- **conteúdo:** desktop: flex horizontal · tablet: flex vertical · mobile: flex vertical
- **mídia na seção:** 3 elemento(s) visual(is)
  - Filhos diretos:
    - `div` (max-w-7xl.mx-auto): padding-x 32px, max-width 1280px, centralizado

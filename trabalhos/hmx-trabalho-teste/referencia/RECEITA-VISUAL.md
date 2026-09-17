# Receita visual do trabalho

> Direção efetivamente resolvida para **teste**.
> Este arquivo é a fonte autoritativa do visual. Ele registra valores e origem
> de cada decisão; os `design-direction.md` individuais são as evidências.

## Sistemas escolhidos

### Paleta + tema — **hotelcalleb.com.br** · ✓ origem única

tema claro · fundo `#ffffff` · superfície `#f5f5f5` · texto `#003c96` · título `#003c96` · muted `#f97300` · acento `#0047b3` · primária `#0047b3` · borda `oklch(0.967 0.003 264.542)`

Contraste acento/fundo: **8.23:1**.

Evidência estruturada: `referencia/design-direction.json`.

### Tipografia — **hotelcalleb.com.br** · ✓ origem única

principal (títulos): `Georgia` · secundária (corpo/UI): `Inter` · terciária (acentos): `nenhuma`.

A escala de tamanhos/pesos vem de **hotelcalleb.com.br**; as famílias acima são aplicadas por função sobre essa escala.

Evidência estruturada: `referencia/design-direction.json`.

### Espaçamento — **hotelcalleb.com.br** · ✓ origem única

paddings de seção 80px, 96px · gaps 4px, 8px, 16px, 24px, 32px, 64px · containers 576px, 672px, 1024px, 1280px.

Evidência estruturada: `referencia/design-direction.json`.

### Forma — **hotelcalleb.com.br** · ✓ origem única

raios 3.35544e+07px, 24px, 12px, 16px, 4px, 40px (dominante 3.35544e+07px) · 4 sombra(s) medida(s) · botão primário: raio 3.35544e+07px, padding 8px 24px 8px 24px, fundo #0047b3.

Evidência estruturada: `referencia/design-direction.json`.

### Movimento — **hotelcalleb.com.br** · ✓ origem única

31 hovers · 5 invisíveleis após scroll. Evidências: 0 script(s) inline, 0 transição(ões) CSS e 0 interação(ões) nativa(s). Recrie os padrões documentados e preserve `prefers-reduced-motion`.

Evidência estruturada: `referencia/animations.json`.
Especificação: `referencia/animations.md`; observado em runtime: `referencia/animations-observed.md`.

## Origem do layout das seções

| # | papel | layout de | estado | anatomia | evidência |
|---|---|---|---|---|---|
| 1 | hero | **hotelcalleb.com.br** | ✓ única origem | duo: 2 × [ícone] | `referencia/screenshots/sections/01-conforto-e-hospitalidade-no--p01.png` |
| 2 | section | **hotelcalleb.com.br** | ✓ única origem | card-grid: 4 × [ícone+título+texto] | `referencia/screenshots/sections/02-2-500.png` |
| 3 | about | **hotelcalleb.com.br** | ✓ única origem | split | `referencia/screenshots/sections/03-sua-melhor-escolha-p01.png` |
| 4 | section | **hotelcalleb.com.br** | ✓ única origem | card-grid: 3 × [mídia+título+texto (2 parágrafos)+link/botão] | `referencia/screenshots/sections/04-delegacoes-p01.png` |
| 5 | section | **hotelcalleb.com.br** | ✓ única origem | card-grid: 3 × [mídia+título+texto] | `referencia/screenshots/sections/05-explore-o-destino-p01.png` |
| 6 | section | **hotelcalleb.com.br** | ✓ única origem | card-grid: 6 × [mídia] | `referencia/screenshots/sections/06-galeria-de-fotos-p01.png` |
| 7 | contact | **hotelcalleb.com.br** | ✓ única origem | split | `referencia/screenshots/sections/07-reserve-sua-estadia-premium--p01.png` |

O snapshot estruturado equivalente está em `receita-visual.json`. Se uma
referência for reextraída no futuro, este trabalho continua documentando exatamente
a receita que estava visível no momento da montagem.

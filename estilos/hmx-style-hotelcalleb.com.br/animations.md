# Animações da referência (spec para recriar)

> Extraído do HTML/CSS da referência Webflow (sem executar scripts).
> Recrie a **sensação** de movimento com GSAP vendado localmente — não
> simplifique para um fade genérico. Veja a política em `../STARTER.md` §4.

## Bibliotecas de animação detectadas

- Nenhuma biblioteca JS detectada (animações podem ser só CSS).

## Animações de entrada / scroll-reveal

_Nenhum estado inicial inline detectado._

## Interações nativas Webflow (nav / dropdown / accordion)

_Nenhuma encontrada._

## Lottie

_Nenhuma._

## CSS — keyframes e transições

- Keyframes: `fade-in`, `slide-up`, `spin`, `pulse`
- Regras com `transition`: 0
- Regras `:hover`: 31

## Catálogo de hover

| Alvo | Tipo | Propriedades medidas | Contexto |
|---|---|---|---|
| `.group-hover\:translate-y-0:is(:where(.group) *)` | custom | `translate: var(--tw-translate-x) var(--tw-translate-y)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:scale-110:is(:where(.group) *)` | scale | `scale: var(--tw-scale-x) var(--tw-scale-y)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:border-accent:is(:where(.group) *)` | border-shift | `border-color: var(--color-accent)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:bg-accent:is(:where(.group) *)` | color-shift | `background-color: var(--color-accent)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:bg-primary:is(:where(.group) *)` | color-shift | `background-color: var(--color-primary)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:text-accent:is(:where(.group) *)` | color-shift | `color: var(--color-accent)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:text-white:is(:where(.group) *)` | color-shift | `color: var(--color-white)` | @layer components;@layer utilities · @media(hover:hover) |
| `.group-hover\:opacity-100:is(:where(.group) *)` | fade | `opacity: 1` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:scale-105` | scale | `scale: var(--tw-scale-x) var(--tw-scale-y)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:border-primary` | border-shift | `border-color: var(--color-primary)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-accent` | color-shift | `background-color: var(--color-accent)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-accent-light` | color-shift | `background-color: var(--color-accent-light)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-gray-50` | color-shift | `background-color: var(--color-gray-50)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-gray-50\/50` | color-shift | `background-color: #f9fafb80` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-gray-50\/50` | color-shift | `background-color: color-mix(in oklab,var(--color-gray-50) 50%,transparent)` | @layer components;@layer utilities · @media(hover:hover) · @supports (color:color-mix(in lab,red,red)) |
| `.hover\:bg-gray-100` | color-shift | `background-color: var(--color-gray-100)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-primary` | color-shift | `background-color: var(--color-primary)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-primary-dark` | color-shift | `background-color: var(--color-primary-dark)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-red-50` | color-shift | `background-color: var(--color-red-50)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-red-400` | color-shift | `background-color: var(--color-red-400)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-red-400\/10` | color-shift | `background-color: #ff65681a` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-red-400\/10` | color-shift | `background-color: color-mix(in oklab,var(--color-red-400) 10%,transparent)` | @layer components;@layer utilities · @media(hover:hover) · @supports (color:color-mix(in lab,red,red)) |
| `.hover\:bg-red-500` | color-shift | `background-color: var(--color-red-500)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-white\/5` | color-shift | `background-color: #ffffff0d` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:bg-white\/5` | color-shift | `background-color: color-mix(in oklab,var(--color-white) 5%,transparent)` | @layer components;@layer utilities · @media(hover:hover) · @supports (color:color-mix(in lab,red,red)) |
| `.hover\:text-accent` | color-shift | `color: var(--color-accent)` | @layer components;@layer utilities · @media(hover:hover) |
| `.hover\:text-white` | color-shift | `color: var(--color-white)` | @layer components;@layer utilities · @media(hover:hover) |

## Fundos animados e interativos

_Nenhum fundo animado/interativo identificado._

## Galerias e carrosséis

_Nenhuma galeria estruturada identificada._

## Sinais de scripts (sem transportar código de terceiros)

_Nenhum script de animação inline capturado (pode estar em bundle externo)._

A versão reutilizável e filtrável está em `catalogo/patterns.json`.

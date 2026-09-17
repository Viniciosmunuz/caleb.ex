# Animações observadas (página rodando)

> Complementa `animations.md`, que lê o código estático. Aqui está o que
> a página fez de fato durante a captura — inclusive coisas que só existem
> em tempo de execução, como os pins do GSAP.

## Passe de scroll

A página foi percorrida em 14 parada(s) até 9287px. O passeio terminou em 8387px; não voltou ao topo antes dos recortes.

## Revisão visual por seção

Cada tile entrou de fato no viewport, aguardou fontes/mídia/animações finitas,
teve sua geometria relida e passou por validação DOM + pixels.

- **seções revisadas:** 7
- **seções com retry:** 0
- **seções com reveal reparado seletivamente:** 0
- **seções ainda com baixa confiança:** 0

## Overviews de página inteira

São mapas gerais, não a evidência autoritativa de reveals reversíveis.
- **desktop** — qualidade ok, 1 tentativa(s), 1 reveal(s) reparado(s) apenas para o overview.
- **tablet** — qualidade ok, 1 tentativa(s), 1 reveal(s) reparado(s) apenas para o overview.
- **mobile** — qualidade ok, 1 tentativa(s), 1 reveal(s) reparado(s) apenas para o overview.

## Elementos que continuaram invisíveis

Mesmo depois do passe de scroll completo. Eles **existem** no layout e
saem em branco nos prints — não conclua que a seção era vazia. Provavelmente
dependem de uma interação (hover, clique, modal) ou de um trigger que a
captura não consegue disparar.

| elemento | motivo | conteúdo |
|---|---|---|
| `h4.text-accent` | opacity 0 | Explore o Destino |
| `h2.text-primary-dark` | opacity 0 | Descubra a Terra das Cachoeiras . |
| `p.text-white/70` | opacity 0 | Uma das mais famosas, com infraestrutura completa e reserva ecológica. |
| `p.text-white/70` | opacity 0 | Cenário cinematográfico com grutas e paredões de arenito impressionant |
| `p.text-white/70` | opacity 0 | Trilha guiada por cavernas milenares envoltas pela densa selva amazôni |

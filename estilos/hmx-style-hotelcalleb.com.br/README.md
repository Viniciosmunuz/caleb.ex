# Direção criativa — hotelcalleb.com.br

Pasta `hmx-style-hotelcalleb.com.br`, extraída de https://hotelcalleb.com.br/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAaeQUJ675tC4SoBuPTn1K_s2N4v5AyIVLwW_9iXYTjKq6nn83W6BFw149s_pJA_aem_redB1JcuXn0TFHwVJXUNZw#.

Este pacote descreve **como a página se parece e como a copy dela é dimensionada**
— nunca o que ela diz. Nenhum texto daqui deve ser reaproveitado.

## Arquivos

- `design-direction.md`: **a fonte autoritativa de estilo** — paleta por uso real,
  escala tipográfica, ritmo de espaçamento, raios, sombras, botões (com `:hover`)
  e a disposição de cada seção. Disposição medida nos 3 breakpoints (desktop 1440px, tablet 768px, mobile 390px);
- `design-direction.json`: o mesmo, legível por máquina;
- `copy-skeleton.md`: **o molde da copy** — 7 seções,
  ~265 palavras, com o tamanho de cada bloco de texto e a
  anatomia de cada card. É o que faz a copy nova ser escrita sob medida para
  este layout em vez de o layout ter que se deformar para caber nela;
- `copy-skeleton.json`: o mesmo, estruturado — é dele que sai o questionário
  quando um trabalho é montado sem copy;
- `animations.md`: o movimento lido do código estático (Webflow IX2 e GSAP), sem
  executar script nenhum da origem;
- `animations.json`: os mesmos achados de movimento, estruturados e sem completar
  duração, easing ou gatilhos que não puderam ser medidos;
- `catalogo/patterns.json`: catálogo seguro e reutilizável de hover, fundos,
  galerias e movimento — só especificações declarativas, sem transportar scripts;
- `typography/specimens/`: amostras PNG dos nomes renderizados na página de
  origem; são evidência visual local — nenhum WOFF/WOFF2 ou licença de fonte é
  copiado/instalado;
- `animations-observed.md`: o que a página fez **rodando** — seções presas ao
  scroll e elementos que continuaram invisíveis mesmo após o passe completo;
- `screenshots/`: página inteira em desktop, tablet e mobile, mais
  `sequences/` para as seções cuja graça está no scroll;
- `source.html` / `source.css`: fonte crua, para auditar o que foi medido;
- `analysis.json`: estrutura, contagens e metadados;
- `assets-manifest.json`: imagens, fontes e ícones referenciados.

CSS capturado: 49 KB de 1 folha(s).

## Próximo passo

Combine esta pasta com um pacote de copy em **③ Criação do trabalho**. Ela pode ser
reutilizada em quantos projetos você quiser — a identidade visual é independente
do conteúdo que vai vesti-la.

## Limites

- confirme os direitos de uso antes de reproduzir uma identidade visual alheia;
- folhas de estilo cross-origin podem não ter sido lidas — confira `analysis.json`;
- imagens com lazy-load abaixo da dobra podem sair incompletas nos screenshots.

# Screenshots da referência

Página inteira, por breakpoint:

- `desktop.png`
- `tablet.png`
- `mobile.png`

Os arquivos de página inteira são **overviews**. Um quadro único não consegue
manter simultaneamente visíveis vários reveals que revertem ao sair do viewport;
por isso ele não é a autoridade visual das seções.

Cada seção foi isolada em tiles menores que o viewport, em `sections/`. Antes
de cada obturador a captura faz uma abordagem real pelo scroll, centraliza o
trecho, aguarda fontes, imagens e animações finitas, relê a geometria e valida
DOM + pixels. Se o resultado ainda parece vazio, tenta novamente e, como último
recurso, repara apenas elementos com assinatura segura de reveal. O
`index.json` registra tentativas, qualidade e qualquer reparo.

Esses tiles — e as sequências quando há coreografia — são a evidência visual
usada no montador do job.

Se um menu mobile foi detectado, ele foi aberto e fotografado em
`mobile-menu.png` — ver `animations-observed.md` para o gatilho e os itens.

## O que ainda não é capturado

Estados que dependem de interação além do menu: accordion expandido, hover,
slide 2 do carrossel e modais. Iframes cross-origin e fundos carregados por
scripts proprietários também podem exigir conferência manual. Consulte a
qualidade e os avisos no `manifest.json`.

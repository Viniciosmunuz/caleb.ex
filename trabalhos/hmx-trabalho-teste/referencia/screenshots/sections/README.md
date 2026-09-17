# Evidências visuais por seção

Cada arquivo é um recorte real da seção na largura desktop. Cada parte foi
levada ao viewport, aguardou fontes/imagens/animações finitas, teve a geometria
relida e passou por um quality gate antes de ser aceita. O campo
`identity` do índice informa se a ligação veio do marcador exato da medição,
do plano persistido numa recaptura ou de fallback heurístico.
O seletor de design usa estes recortes; os mini-wireframes só aparecem como
fallback em pacotes antigos.

- **1. Conforto e Hospitalidade no Coração da Amazônia.**: `01-conforto-e-hospitalidade-no--p01.png` — hover
- **2. 2.500+**: `02-2-500.png`
- **3. Sua melhor escolha**: `03-sua-melhor-escolha-p01.png` — hover
- **4. delegações**: `04-delegacoes-p01.png` — hover
- **5. Explore o Destino**: `05-explore-o-destino-p01.png`
- **6. Galeria de Fotos**: `06-galeria-de-fotos-p01.png`
- **7. Reserve sua estadia premium hoje.**: `07-reserve-sua-estadia-premium--p01.png` — hover

Uma imagem continua sendo apenas o estado estático. Se a seção tiver
`pin-scroll` ou `sticky-stack`, use também os quadros em
`../sequences/`. Para hover, expansão, vídeo ou canvas, consulte
`animations.json` e `animations-observed.json`.

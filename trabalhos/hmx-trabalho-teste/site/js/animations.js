/* Hotel Calleb — interações da página */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Header: transparente sobre o hero, sólido ao rolar ---------- */
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const hero = document.querySelector('.hero');

  /* Duas coisas de uma vez:
     - is-scrolled: a barra vira pilula de vidro depois dos primeiros 40px;
     - esta-no-hero: enquanto a pilula estiver por cima da foto do hero, o
       menu fica branco e o vidro fica quase invisivel. Sem isto a pelicula
       teria de ser opaca para o texto escuro ler sobre a foto. */
  const syncHeader = () => {
    const y = window.scrollY;
    siteHeader.classList.toggle('is-scrolled', y > 40);
    const limite = hero ? hero.offsetHeight - siteHeader.offsetHeight - 20 : 0;
    siteHeader.classList.toggle('esta-no-hero', y < limite);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader, { passive: true });
}

/* ---------- Parallax do hero ----------
   A foto sobe mais devagar que o texto enquanto a pagina rola.
   Escreve numa custom property para nao brigar com o zoom, que e outra camada. */
const heroMedia = document.querySelector(".hero-media");
const heroSection = document.querySelector(".hero");

if (heroMedia && heroSection && !prefersReducedMotion.matches) {
  const FATOR = 0.28;          // quanto a foto fica para tras do scroll
  let ticking = false;
  let ultimoValor = -1;

  const aplicar = () => {
    ticking = false;
    const y = window.scrollY;
    const altura = heroSection.offsetHeight;
    if (y > altura) return;                       // hero ja saiu da tela
    const deslocamento = Math.round(y * FATOR);
    if (deslocamento === ultimoValor) return;     // nada mudou, nao escreve
    ultimoValor = deslocamento;
    heroMedia.style.setProperty("--parallax", deslocamento + "px");
  };

  const aoRolar = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(aplicar);
    }
  };

  window.addEventListener("scroll", aoRolar, { passive: true });
  window.addEventListener("resize", aoRolar, { passive: true });
  aplicar();

  // se o visitante passar a pedir menos movimento, devolve tudo ao lugar
  prefersReducedMotion.addEventListener("change", (e) => {
    if (e.matches) {
      window.removeEventListener("scroll", aoRolar);
      heroMedia.style.setProperty("--parallax", "0px");
    }
  });
}

/* ---------- Menu mobile ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Revelação das seções ao entrar na tela ---------- */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/* ---------- Galeria ---------- */
const galleryTrack = document.querySelector("#galleryTrack");
const galleryDots = document.querySelector("#galleryDots");

if (galleryTrack) {
  const slides = Array.from(galleryTrack.children);
  let timer = null;

  const passo = () => {
    const s = slides[0];
    if (!s) return galleryTrack.clientWidth;
    const gap = parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
    return s.getBoundingClientRect().width + gap;
  };

  const indiceAtual = () => Math.round(galleryTrack.scrollLeft / passo());
  const fimDaLista = () => galleryTrack.scrollLeft >= galleryTrack.scrollWidth - galleryTrack.clientWidth - 2;

  // um ponto por foto; marca a que esta em foco
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "gallery-dot";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Foto ${i + 1} de ${slides.length}`);
    b.addEventListener("click", () => { irPara(i); reiniciarAuto(); });
    galleryDots && galleryDots.appendChild(b);
  });

  const sincronizar = () => {
    const i = indiceAtual();
    if (galleryDots) {
      Array.from(galleryDots.children).forEach((d, n) =>
        d.setAttribute("aria-selected", String(n === i)));
    }
  };

  const irPara = (i) => {
    galleryTrack.scrollTo({ left: i * passo(), behavior: "smooth" });
  };

  const mover = (dir) => {
    if (dir > 0 && fimDaLista()) irPara(0);            // volta ao inicio no fim
    else if (dir < 0 && galleryTrack.scrollLeft <= 2) irPara(slides.length - 1);
    else galleryTrack.scrollBy({ left: dir * passo(), behavior: "smooth" });
  };

  // teclado: setas navegam quando a faixa esta em foco
  galleryTrack.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); mover(1); reiniciarAuto(); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); mover(-1); reiniciarAuto(); }
  });

  galleryTrack.addEventListener("scroll", () => {
    clearTimeout(galleryTrack._t);
    galleryTrack._t = setTimeout(sincronizar, 90);
  }, { passive: true });

  const pararAuto = () => { if (timer) { clearInterval(timer); timer = null; } };
  const reiniciarAuto = () => {
    pararAuto();
    if (prefersReducedMotion.matches || document.hidden) return;
    timer = setInterval(() => mover(1), 5000);
  };

  ["mouseenter", "focusin", "pointerdown"].forEach((ev) =>
    galleryTrack.addEventListener(ev, pararAuto));
  ["mouseleave", "focusout"].forEach((ev) =>
    galleryTrack.addEventListener(ev, reiniciarAuto));

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pararAuto(); else reiniciarAuto();
  });
  prefersReducedMotion.addEventListener("change", reiniciarAuto);
  /* mesma logica de dica da galeria das atracoes: sem setas, quem avisa que
     ha mais foto ao lado e a espiada na borda mais a linha de dica */
  const areaGaleria = galleryTrack.closest(".gallery-carrossel");
  const conferirGaleria = () => {
    if (!areaGaleria) return;
    const transborda = galleryTrack.scrollWidth > galleryTrack.clientWidth + 4;
    const noFim = fimDaLista();
    areaGaleria.classList.toggle("tem-mais", transborda && !noFim);
  };

  galleryTrack.addEventListener("scroll", () => {
    if (galleryTrack.scrollLeft > 8 && areaGaleria) areaGaleria.classList.add("ja-arrastou");
    conferirGaleria();
  }, { passive: true });

  window.addEventListener("resize", () => { sincronizar(); conferirGaleria(); });

  sincronizar();
  conferirGaleria();
  reiniciarAuto();
}

/* ---------- Galeria das atracoes ----------
   Uma foto em destaque e as outras em tiras. Clicar numa tira promove ela.
   Sem setas: quem indica que ha mais coisa ao lado e a propria tira seguinte
   aparecendo cortada na borda, o esmaecido e a linha de dica — e a dica some
   no primeiro arrasto, porque depois disso ela ja cumpriu o papel. */
const atracaoTiras = document.querySelector("#atracaoTiras");

if (atracaoTiras) {
  const tiras = Array.from(atracaoTiras.querySelectorAll(".atracao-tira"));
  const quadros = Array.from(document.querySelectorAll(".atracao-quadro"));
  const descricao = document.querySelector("#atracaoDesc");
  const area = atracaoTiras.closest(".tiras-area");

  // rola so a faixa, nunca a pagina: scrollIntoView mexeria nas duas
  const trazerAVista = (el) => {
    const faixa = atracaoTiras.getBoundingClientRect();
    const alvo = el.getBoundingClientRect();
    if (alvo.left < faixa.left) {
      atracaoTiras.scrollBy({ left: alvo.left - faixa.left - 10, behavior: "smooth" });
    } else if (alvo.right > faixa.right) {
      atracaoTiras.scrollBy({ left: alvo.right - faixa.right + 10, behavior: "smooth" });
    }
  };

  const mostrar = (i, focar) => {
    tiras.forEach((t, n) => {
      const ativa = n === i;
      t.classList.toggle("is-ativa", ativa);
      t.setAttribute("aria-selected", String(ativa));
      t.tabIndex = ativa ? 0 : -1;
    });
    quadros.forEach((q, n) => {
      q.hidden = n !== i;
      q.classList.toggle("is-ativa", n === i);
    });
    if (descricao && tiras[i].dataset.desc) descricao.textContent = tiras[i].dataset.desc;
    if (focar) tiras[i].focus();
    trazerAVista(tiras[i]);
  };

  tiras.forEach((t, i) => t.addEventListener("click", () => mostrar(i, false)));

  const atual = () => tiras.findIndex((t) => t.getAttribute("aria-selected") === "true");

  atracaoTiras.addEventListener("keydown", (e) => {
    const i = atual();
    if (e.key === "ArrowRight") { e.preventDefault(); mostrar((i + 1) % tiras.length, true); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); mostrar((i - 1 + tiras.length) % tiras.length, true); }
    if (e.key === "Home")       { e.preventDefault(); mostrar(0, true); }
    if (e.key === "End")        { e.preventDefault(); mostrar(tiras.length - 1, true); }
  });

  /* dica e esmaecido so existem enquanto sobra tira para o lado: numa tela
     larga as tres cabem, e ai nao ha nada para avisar */
  const conferir = () => {
    const transborda = atracaoTiras.scrollWidth > atracaoTiras.clientWidth + 4;
    const noFim = atracaoTiras.scrollLeft >= atracaoTiras.scrollWidth - atracaoTiras.clientWidth - 4;
    area.classList.toggle("tem-mais", transborda && !noFim);
  };

  atracaoTiras.addEventListener("scroll", () => {
    if (atracaoTiras.scrollLeft > 8) area.classList.add("ja-arrastou");
    conferir();
  }, { passive: true });

  window.addEventListener("resize", conferir, { passive: true });
  conferir();
}

/* ---------- Formulário de reserva: abre o WhatsApp do hotel ---------- */
const WHATSAPP_NUMERO = '559285372368';
const formReserva = document.querySelector('#formReserva');

if (formReserva) {
  formReserva.addEventListener('submit', (event) => {
    event.preventDefault();

    const dados = new FormData(formReserva);
    const formatarData = (valor) => {
      if (!valor) return '';
      const [ano, mes, dia] = valor.split('-');
      return `${dia}/${mes}/${ano}`;
    };

    const linhas = [
      'Olá! Gostaria de verificar disponibilidade no Hotel Calleb.',
      '',
      `Nome: ${dados.get('nome') || ''}`,
      `Check-in: ${formatarData(dados.get('checkin'))}`,
      `Check-out: ${formatarData(dados.get('checkout'))}`,
      `Hóspedes: ${dados.get('hospedes') || ''}`,
      `Tipo de quarto: ${dados.get('quarto') || ''}`,
      `WhatsApp: ${dados.get('whatsapp') || ''}`,
    ];

    const email = dados.get('email');
    if (email) linhas.push(`E-mail: ${email}`);

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* Hotel Calleb — interações da página */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Header: transparente sobre o hero, sólido ao rolar ---------- */
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const syncHeader = () => {
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
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
const galleryPrev = document.querySelector(".gallery-btn--prev");
const galleryNext = document.querySelector(".gallery-btn--next");

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

  [galleryPrev, galleryNext].forEach((b) => {
    if (!b) return;
    b.addEventListener("click", () => {
      mover(b.dataset.direction === "next" ? 1 : -1);
      reiniciarAuto();
    });
  });

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
  window.addEventListener("resize", sincronizar);

  sincronizar();
  reiniciarAuto();
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

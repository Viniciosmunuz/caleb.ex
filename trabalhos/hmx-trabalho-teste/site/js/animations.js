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
const galleryTrack = document.querySelector('#galleryTrack');
const galleryButtons = document.querySelectorAll('.gallery-btn');

if (galleryTrack) {
  const slides = Array.from(galleryTrack.children);
  let index = 0;
  let timer = null;

  const updateGallery = () => {
    galleryTrack.style.transform = `translateX(-${index * 100}%)`;
  };

  const stopAuto = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  // autoplay só quando o visitante não pediu menos movimento e a aba está visível
  const startAuto = () => {
    stopAuto();
    if (prefersReducedMotion.matches || document.hidden) return;
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      updateGallery();
    }, 5000);
  };

  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction === 'next' ? 1 : -1;
      index = (index + direction + slides.length) % slides.length;
      updateGallery();
      startAuto(); // reinicia a contagem depois de uma ação do visitante
    });
  });

  const gallery = galleryTrack.closest('.gallery-carrossel') || galleryTrack.parentElement;
  if (gallery) {
    gallery.addEventListener('mouseenter', stopAuto);
    gallery.addEventListener('mouseleave', startAuto);
    gallery.addEventListener('focusin', stopAuto);
    gallery.addEventListener('focusout', startAuto);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  prefersReducedMotion.addEventListener('change', startAuto);

  startAuto();
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

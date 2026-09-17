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

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
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

const galleryTrack = document.querySelector('#galleryTrack');
const galleryButtons = document.querySelectorAll('.gallery-btn');

if (galleryTrack) {
  const slides = Array.from(galleryTrack.children);
  let index = 0;

  const updateGallery = () => {
    galleryTrack.style.transform = `translateX(-${index * 100}%)`;
  };

  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.dataset.direction === 'next' ? 1 : -1;
      index = (index + direction + slides.length) % slides.length;
      updateGallery();
    });
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    updateGallery();
  }, 4000);
}

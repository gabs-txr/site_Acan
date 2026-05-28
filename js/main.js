// ============================================================
// SCROLL RESTORATION
// ============================================================
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ============================================================
// HERO SLIDESHOW
// ============================================================
const slides = document.querySelectorAll('.hero__slide');

if (slides.length) {
  let current = 0;
  let autoplay;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  function startAutoplay() {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('heroPrev')?.addEventListener('click', () => {
    clearInterval(autoplay);
    goTo(current - 1);
    startAutoplay();
  });

  document.getElementById('heroNext')?.addEventListener('click', () => {
    clearInterval(autoplay);
    goTo(current + 1);
    startAutoplay();
  });

  startAutoplay();
}

// ============================================================
// HEADER SCROLL SHADOW
// ============================================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================================
// MENU HAMBÚRGUER
// ============================================================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  burger.setAttribute('aria-expanded', isOpen);
});

// Fechar menu ao clicar em link
nav.querySelectorAll('.header__nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// LIGHTBOX
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let galleryImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
  galleryImages = images;
  currentIndex = index;
  lightboxImg.src = galleryImages[currentIndex];
  lightboxImg.alt = `Imagem ${currentIndex + 1} de ${galleryImages.length}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// Inicializar galeria nas páginas de projeto
function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery__item');
  if (!galleryItems.length) return;

  const srcs = Array.from(galleryItems).map(el => el.querySelector('img').src);

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(srcs, i));
    item.style.cursor = 'pointer';
  });
}

initGallery();

// ============================================================
// SERVIÇOS — SCROLL COM SETA
// ============================================================
const servicesGrid = document.querySelector('.services__grid');
const servicesNext = document.getElementById('servicesNext');
const servicesPrev = document.getElementById('servicesPrev');

if (servicesGrid && servicesNext && servicesPrev) {
  function getCardStep() {
    const card = servicesGrid.querySelector('.services__item');
    const gap = parseInt(getComputedStyle(servicesGrid).gap) || 16;
    return card.offsetWidth + gap;
  }

  servicesNext.addEventListener('click', () => {
    servicesGrid.scrollBy({ left: getCardStep(), behavior: 'smooth' });
  });

  servicesPrev.addEventListener('click', () => {
    servicesGrid.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
  });

  servicesGrid.addEventListener('scroll', () => {
    const atStart = servicesGrid.scrollLeft <= 4;
    const atEnd = servicesGrid.scrollLeft + servicesGrid.clientWidth >= servicesGrid.scrollWidth - 4;

    servicesPrev.style.opacity = atStart ? '0' : '1';
    servicesPrev.style.pointerEvents = atStart ? 'none' : 'auto';

    servicesNext.style.opacity = atEnd ? '0' : '1';
    servicesNext.style.pointerEvents = atEnd ? 'none' : 'auto';
  });
}

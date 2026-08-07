document.addEventListener('DOMContentLoaded', () => {

  /* ===== MOBILE NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ===== PROJECT CAROUSEL ===== */
  const carousel = document.getElementById('carousel');
  const cards = carousel.querySelectorAll('.project-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('carouselDots');

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  function scrollToCard(index) {
    const card = cards[index];
    carousel.scrollTo({ left: card.offsetLeft - 4, behavior: 'smooth' });
  }

  function getActiveIndex() {
    let closest = 0;
    let minDiff = Infinity;
    cards.forEach((card, i) => {
      const diff = Math.abs(card.offsetLeft - carousel.scrollLeft);
      if (diff < minDiff) { minDiff = diff; closest = i; }
    });
    return closest;
  }

  function updateDots() {
    const active = getActiveIndex();
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  prevBtn.addEventListener('click', () => {
    const active = getActiveIndex();
    scrollToCard(Math.max(0, active - 1));
  });

  nextBtn.addEventListener('click', () => {
    const active = getActiveIndex();
    scrollToCard(Math.min(cards.length - 1, active + 1));
  });

  carousel.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateDots);
  });

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = sections[0].id;
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });

    /* back to top visibility */
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});

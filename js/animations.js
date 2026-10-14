// Entradas na rolagem independentes da sequência de abertura do envelope.
window.InviteApp = window.InviteApp || {};
window.InviteApp.initAnimations = () => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  // Observa blocos pequenos individualmente, sem animar seus pais ao mesmo tempo.
  // A capa já tem sua própria entrada durante a abertura do convite.
  const elements = document.querySelectorAll(
    '.invitation-section > :not(.schedule__list), .schedule__item, .closing > *'
  );

  let observer;
  function observeEntries() {
    observer?.disconnect();
    // Usa uma faixa da viewport, não uma porcentagem da altura do texto.
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: `0px 0px -${window.innerHeight * 0.15}px 0px` });
    elements.forEach((element) => {
      if (!element.classList.contains('visible')) observer.observe(element);
    });
  }

  elements.forEach((element) => {
    element.classList.add('scroll-reveal');
    // Não deixa controles invisíveis quando alcançados pelo teclado.
    element.addEventListener('focusin', () => {
      element.classList.add('visible');
      observer.unobserve(element);
    });
  });
  observeEntries();
  window.addEventListener('resize', () => {
    if (!reducedMotion.matches) observeEntries();
  });

  // Se a preferência mudar durante a visita, revela tudo sem movimento.
  reducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    elements.forEach((element) => element.classList.add('visible'));
  });
};

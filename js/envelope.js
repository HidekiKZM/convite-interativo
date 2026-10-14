window.InviteApp = window.InviteApp || {};
window.InviteApp.initEnvelope = () => {
  'use strict';

  const opening = document.querySelector('#abertura');
  const envelope = document.querySelector('.envelope');
  const sealLink = document.querySelector('#abrir-convite');
  const content = document.querySelector('#conteudo');
  const closing = document.querySelector('#encerramento');
  const title = document.querySelector('#capa-titulo');
  const hero = document.querySelector('#capa');
  const skipLink = document.querySelector('.skip-link');

  if (!opening || !envelope || !sealLink || !content || !closing || !title || !hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let state = 'closed';

  // Sem JavaScript, o lacre continua sendo um link para o conteúdo visível.
  const seal = document.createElement('button');
  seal.type = 'button';
  seal.id = sealLink.id;
  seal.className = sealLink.className;
  seal.textContent = sealLink.textContent;
  seal.setAttribute('aria-controls', 'conteudo');
  sealLink.replaceWith(seal);

  function setScrollLocked(locked) {
    document.documentElement.classList.toggle('invitation-scroll-locked', locked);
    document.body.classList.toggle('invitation-scroll-locked', locked);
  }

  async function waitForAnimations(element) {
    if (reducedMotion.matches || typeof element.getAnimations !== 'function') return;
    const animations = element.getAnimations({ subtree: true });
    await Promise.allSettled(animations.map((animation) => animation.finished));
  }

  async function showInvitation({ immediate = false } = {}) {
    if (state === 'opened' || (state === 'revealing' && !immediate)) return;
    state = 'revealing';
    content.hidden = false;
    closing.hidden = false;
    opening.hidden = true;
    window.scrollTo({ top: 0, behavior: 'instant' });

    try {
      if (!immediate) {
        document.body.classList.add('invitation--revealing');
        await waitForAnimations(hero);
      }
    } finally {
      // Mesmo se uma animação for cancelada, a página volta a permitir rolagem.
      document.body.classList.remove('invitation--revealing');
      document.body.classList.add('invitation--opened');
      setScrollLocked(false);
      state = 'opened';
    }
    title.focus({ preventScroll: true });
  }

  seal.addEventListener('click', async () => {
    if (state !== 'closed') return;
    state = 'opening';
    seal.disabled = true;
    envelope.classList.add('open');
    opening.classList.add('is-opening');

    // Aguarda as animações CSS, incluindo seus atrasos, sem duplicar os tempos.
    // Cancelamentos também liberam o conteúdo (por exemplo, ao reduzir movimento).
    try {
      await waitForAnimations(opening);
    } finally {
      if (state === 'opening') await showInvitation();
    }
  });

  skipLink?.addEventListener('click', (event) => {
    event.preventDefault();
    showInvitation({ immediate: true });
  });

  // Links diretos a seções dispensam a introdução.
  const destination = document.getElementById(window.location.hash.slice(1));
  if (destination && (content.contains(destination) || closing.contains(destination))) {
    state = 'opened';
    opening.hidden = true;
  } else {
    content.hidden = true;
    closing.hidden = true;
    setScrollLocked(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
};

// Scripts defer executam após o HTML, na ordem declarada em index.html.
(() => {
  'use strict';
  const app = window.InviteApp;
  app.renderContent();
  app.initLinks();
  app.initEnvelope();
  app.initAnimations();
})();

'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
function setup(change = () => {}) {
  const elements = new Map();
  for (const id of ['#como-chegar', '#confirmar-presenca', '#lista-presentes', '#adicionar-agenda']) {
    elements.set(id, {
      hidden: true,
      removeAttribute(name) { delete this[name]; },
      setAttribute(name, value) { this[name] = value; },
    });
  }
  const context = vm.createContext({
    window: {}, URL, URLSearchParams,
    document: { querySelector: (id) => elements.get(id) },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/config.js'), 'utf8'), context);
  change(vm.runInContext('INVITE_CONFIG', context));
  vm.runInContext(fs.readFileSync(path.join(root, 'js/links.js'), 'utf8'), context);
  return { context, elements, init: () => context.window.InviteApp.initLinks() };
}

test('links aguardam inicialização explícita e mantêm presentes sem URL ocultos', () => {
  const { init, elements } = setup();
  assert.equal(elements.get('#como-chegar').href, undefined);
  init();
  assert.equal(elements.get('#como-chegar').hidden, false);
  assert.equal(elements.get('#lista-presentes').hidden, true);
  assert.equal(elements.get('#lista-presentes').href, undefined);
});

test('mapa preserva acentos e endereço na query e WhatsApp recebe os nomes', () => {
  const { init, elements } = setup(); init();
  const maps = new URL(elements.get('#como-chegar').href);
  assert.equal(maps.hostname, 'www.google.com');
  assert.match(maps.searchParams.get('destination'), /Igreja Nossa Senhora de Fátima/);
  const rsvp = new URL(elements.get('#confirmar-presenca').href);
  assert.equal(rsvp.hostname, 'wa.me');
  assert.match(rsvp.searchParams.get('text'), /Maria e João/);
});

test('URLs explícitas substituem destinos gerados', () => {
  const { init, elements } = setup(config => {
    config.links.rsvp = 'https://example.org/confirmar';
    config.links.gifts = 'https://example.org/presentes';
  });
  init();
  assert.equal(elements.get('#confirmar-presenca').href, 'https://example.org/confirmar');
  assert.equal(elements.get('#lista-presentes').hidden, false);
});

test('URL inválida ou executável mantém botão oculto e sem href', () => {
  for (const url of ['javascript:alert(1)', '/incompleto', 'data:text/html,teste']) {
    const { init, elements } = setup(config => { config.links.gifts = url; });
    init();
    assert.equal(elements.get('#lista-presentes').hidden, true);
    assert.equal(elements.get('#lista-presentes').href, undefined);
  }
});

test('calendário preserva datas locais e fuso, incluindo término no dia seguinte', () => {
  const { init, elements } = setup(config => {
    config.event.endDate = '2026-12-13'; config.event.endTime = '01:00';
  });
  init();
  const calendar = new URL(elements.get('#adicionar-agenda').href);
  assert.equal(calendar.searchParams.get('dates'), '20261212T190000/20261213T010000');
  assert.equal(calendar.searchParams.get('ctz'), 'America/Fortaleza');
  assert.equal(calendar.searchParams.get('text'), 'Casamento de Maria e João');
});

test('main inicializa conteúdo antes dos links, envelope e observador', () => {
  const calls = [];
  const app = Object.fromEntries(['renderContent', 'initLinks', 'initEnvelope', 'initAnimations']
    .map(name => [name, () => calls.push(name)]));
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/main.js'), 'utf8'), { window: { InviteApp: app } });
  assert.deepEqual(calls, ['renderContent', 'initLinks', 'initEnvelope', 'initAnimations']);
});

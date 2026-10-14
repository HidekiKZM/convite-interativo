// Preenche o HTML antes das interações e dos observadores.
window.InviteApp = window.InviteApp || {};
window.InviteApp.renderContent = () => {
  'use strict';
  if (typeof INVITE_CONFIG === 'undefined') return;
  const config = INVITE_CONFIG;
  const couple = `${config.couple.firstPerson} e ${config.couple.secondPerson}`;
  const text = (value = '') => String(value).replaceAll('{couple}', couple);
  document.title = text(config.page.title);
  document.querySelector('meta[name="description"]').content = text(config.page.description);
  document.querySelectorAll('[data-config]').forEach((element) => {
    const value = element.dataset.config.split('.').reduce((item, key) => item?.[key], config);
    element.textContent = text(value);
    element.hidden = !value;
  });
  const date = document.querySelector('#evento-data');
  date.dateTime = config.event.date;
  date.textContent = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${config.event.date}T12:00:00Z`));
  const time = document.querySelector('#evento-horario');
  time.dateTime = config.event.time;
  time.textContent = `${config.event.time} (${config.event.timeZoneLabel})`;
  document.querySelector('.location__address').textContent =
    [config.venue.address, config.venue.city].filter(Boolean).join(' — ');

  const schedule = document.querySelector('.schedule__list');
  schedule.replaceChildren();
  config.schedule.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'schedule__item';
    [['time', 'schedule__time', item.time], ['h3', 'schedule__title', item.title],
      ['p', 'schedule__description', item.description]].forEach(([tag, className, value]) => {
      if (!value) return;
      const child = document.createElement(tag);
      child.className = className;
      child.textContent = text(value);
      if (tag === 'time') child.dateTime = value;
      li.append(child);
    });
    schedule.append(li);
  });
  document.querySelector('#programacao').hidden = config.schedule.length === 0;

};

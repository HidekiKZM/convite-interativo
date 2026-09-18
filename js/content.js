// Preenche o HTML antes das interações e dos observadores de rolagem.
(() => {
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

  function setLink(selector, value, label) {
    const link = document.querySelector(selector);
    link.hidden = true;
    link.removeAttribute('href');
    if (!value) return;
    try {
      const url = new URL(value);
      if (!['https:', 'http:'].includes(url.protocol)) return;
      link.href = url.href;
      link.setAttribute('aria-label', `${text(label)} (abre em nova aba)`);
      link.hidden = false;
    } catch { /* URLs incompletas mantêm o botão oculto. */ }
  }
  const destination = [config.venue.name, config.venue.address, config.venue.city, config.venue.country].filter(Boolean).join(', ');
  setLink('#como-chegar', config.links.maps ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
    `${config.buttons.maps}: ${config.venue.name}`);
  setLink('#confirmar-presenca', config.links.rsvp || (config.rsvp.phone ?
    `https://wa.me/${config.rsvp.phone}?text=${encodeURIComponent(text(config.rsvp.message))}` : ''), config.buttons.rsvp);
  setLink('#lista-presentes', config.links.gifts, config.buttons.gifts);
  const calendarDate = (day, hour) => `${day.replaceAll('-', '')}T${hour.replace(':', '')}00`;
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: text(config.event.title),
    dates: `${calendarDate(config.event.date, config.event.time)}/${calendarDate(config.event.endDate || config.event.date, config.event.endTime)}`,
    ctz: config.event.timeZone, location: config.event.location, details: text(config.event.description),
  });
  setLink('#adicionar-agenda', `https://calendar.google.com/calendar/render?${params}`, `${config.buttons.calendar} no Google Calendar`);
})();

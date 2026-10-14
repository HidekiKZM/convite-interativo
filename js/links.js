window.InviteApp = window.InviteApp || {};
window.InviteApp.initLinks = () => {
  'use strict';
  if (typeof INVITE_CONFIG === 'undefined') return;
  const config = INVITE_CONFIG;
  const couple = `${config.couple.firstPerson} e ${config.couple.secondPerson}`;
  const text = (value = '') => String(value).replaceAll('{couple}', couple);

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
};

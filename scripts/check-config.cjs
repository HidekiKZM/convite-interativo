'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Executa somente a configuração local do projeto, nunca arquivos externos.
function validate(config) {
  const errors = [];
  const warnings = [];
  const get = (key) => key.split('.').reduce((value, part) => value?.[part], config);
  for (const key of ['couple.firstPerson', 'couple.secondPerson', 'page.title',
    'page.description', 'event.title', 'event.location', 'event.timeZone',
    'event.timeZoneLabel', 'venue.name']) {
    if (typeof get(key) !== 'string' || !get(key).trim()) errors.push(`${key}: texto obrigatório.`);
  }
  for (const key of ['texts', 'buttons', 'links', 'rsvp', 'venue', 'page', 'event', 'couple']) {
    if (!get(key) || typeof get(key) !== 'object' || Array.isArray(get(key))) errors.push(`${key}: objeto obrigatório.`);
  }
  const validDate = (value) => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  };
  const validTime = (value) => typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  const event = config?.event || {};
  const endDate = event.endDate || event.date;
  if (!validDate(event.date)) errors.push('event.date: data inválida (AAAA-MM-DD).');
  if (!validDate(endDate)) errors.push('event.endDate: data inválida (AAAA-MM-DD).');
  for (const key of ['time', 'endTime']) if (!validTime(event[key])) errors.push(`event.${key}: horário inválido (HH:mm).`);
  if (validDate(event.date) && validDate(endDate) && validTime(event.time) && validTime(event.endTime)
    && `${endDate}T${event.endTime}` <= `${event.date}T${event.time}`) errors.push('O término deve ser posterior ao início; informe endDate se terminar no dia seguinte.');
  try { new Intl.DateTimeFormat('pt-BR', { timeZone: event.timeZone }).format(0); }
  catch { errors.push('event.timeZone: fuso inválido.'); }
  for (const key of ['maps', 'rsvp', 'gifts']) {
    const value = config?.links?.[key];
    if (!value) continue;
    try {
      if (!['http:', 'https:'].includes(new URL(value).protocol)) throw new Error();
    } catch { errors.push(`links.${key}: use uma URL completa HTTP ou HTTPS.`); }
  }
  const phone = config?.rsvp?.phone;
  if (!config?.links?.rsvp && phone && !/^[1-9]\d{7,14}$/.test(phone)) errors.push('rsvp.phone: use 8 a 15 dígitos, com país e DDD.');
  if (!config?.links?.rsvp && !phone) warnings.push('Confirmação de presença sem destino.');
  if (!Array.isArray(config?.schedule)) errors.push('schedule: deve ser uma lista.');
  else config.schedule.forEach((item, index) => {
    if (!item || typeof item.title !== 'string' || !item.title.trim()) errors.push(`schedule[${index}].title: obrigatório.`);
    if (item?.time && !validTime(item.time)) errors.push(`schedule[${index}].time: horário inválido.`);
  });
  if (event.location && config?.venue?.name && event.location !== config.venue.name) warnings.push('Agenda e mapa usam locais diferentes: confirme se representam cerimônia e recepção.');
  if (/a definir|provisório/i.test(JSON.stringify(config))) warnings.push('Existem informações provisórias ou a definir.');
  return { errors, warnings };
}

if (require.main === module) {
  try {
    const source = fs.readFileSync(path.join(__dirname, '../js/config.js'), 'utf8');
    const config = vm.runInNewContext(`${source}\n;INVITE_CONFIG`, {}, { timeout: 1000 });
    const { errors, warnings } = validate(config);
    warnings.forEach((message) => console.warn(`AVISO: ${message}`));
    errors.forEach((message) => console.error(`ERRO: ${message}`));
    console.log(`${errors.length} erro(s); ${warnings.length} aviso(s).`);
    process.exitCode = errors.length ? 1 : 0;
  } catch (error) {
    console.error(`Não foi possível verificar a configuração: ${error.message}`);
    process.exitCode = 1;
  }
}
module.exports = { validate };

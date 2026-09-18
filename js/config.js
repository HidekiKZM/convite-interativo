// Dados do cliente. {couple} é substituído pelos nomes em qualquer texto.
const INVITE_CONFIG = {
  couple: { firstPerson: 'Maria', secondPerson: 'João' },
  page: { title: 'Casamento de {couple}', description: 'Um convite especial. Confira os detalhes do evento e participe conosco.' },
  event: {
    title: 'Casamento de {couple}',
    date: '2026-12-12', // AAAA-MM-DD
    time: '19:00', // HH:mm
    timeZone: 'America/Fortaleza',
    timeZoneLabel: 'horário de Teresina',
    location: 'Finess buffet', // Local da agenda; acrescente o endereço quando disponível.
    endDate: '', // Vazio usa a data de início.
    endTime: '20:00', // Término provisório; ajuste quando definido.
    description: 'Horário de término provisório. Confirme a programação com os anfitriões.',
  },
  venue: {
    name: 'Igreja Nossa Senhora de Fátima',
    address: 'Praça Dom Avelar, Bairro Fátima, CEP 64049-290',
    city: 'Teresina - PI', country: 'Brasil',
  },
  links: {
    maps: '', // Vazio gera o Google Maps a partir de venue.
    rsvp: '', // Vazio gera o WhatsApp a partir de rsvp.
    gifts: '', // URL completa; vazio oculta o botão.
  },
  rsvp: {
    phone: '5586988937021', // País + DDD + número, apenas dígitos.
    message: 'Olá! Gostaria de confirmar minha presença no casamento de {couple}',
    deadline: '', // Texto opcional, por exemplo: Confirme até 1º de dezembro.
  },
  schedule: [
    { time: '', title: 'Recepção dos convidados', description: 'Horário a definir.' },
    { time: '', title: 'Celebração', description: 'Horário a definir.' },
  ],
  texts: {
    skip: 'Ir para o convite', loading: 'Preparando seu convite…',
    openingTitle: 'Um convite especial para você',
    openingDescription: 'Abra o convite para conhecer os detalhes.',
    card: 'Sua presença fará parte desta história.', open: 'Abrir convite',
    heroEyebrow: 'Você está convidado', heroTitle: '{couple}',
    heroDescription: 'Um momento especial para celebrar juntos.',
    messageTitle: 'Uma mensagem para você', message: 'Será uma alegria compartilhar este momento com você.',
    dateTitle: 'Data e horário', dateLabel: 'Data', timeLabel: 'Horário',
    locationTitle: 'Local da celebração', scheduleTitle: 'Programação',
    dressCodeTitle: 'Como se vestir', dressCode: 'Traje a definir.',
    giftsTitle: 'Presentes', gifts: 'Sua presença é nosso maior presente.',
    rsvpTitle: 'Confirme sua presença', rsvpDescription: 'Confirme sua presença enviando uma mensagem pelo WhatsApp.',
    closingTitle: 'Esperamos por você!', closingMessage: 'Obrigado por fazer parte deste momento.',
    closingSignature: '{couple}',
  },
  buttons: { maps: 'Como chegar', calendar: 'Adicionar à agenda', rsvp: 'Confirmar presença', gifts: 'Lista de presentes' },
};

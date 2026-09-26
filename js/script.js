(() => {
  'use strict';
  const config = window.BIO_CONFIG || {};
  const status = document.getElementById('status');
  const safeHttps = value => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch { return null; }
  };
  const phone = String(config.whatsappTelefone || '').replace(/[\s()+-]/g, '');
  const whatsapp = /^[1-9]\d{7,14}$/.test(phone)
    ? `https://wa.me/${phone}?text=${encodeURIComponent(config.whatsappMensagem || 'Olá, Juan!')}`
    : null;
  const destinations = {
    pravo: safeHttps(config.sitePravo),
    whatsapp,
    anastasia: safeHttps(config.linkAnastasia)
  };
  const messages = {
    pravo: 'O site da PRAVO estará disponível por aqui em breve.',
    whatsapp: 'O contato pelo WhatsApp estará disponível por aqui em breve.',
    anastasia: 'O link do AnastasIA estará disponível por aqui em breve.'
  };
  document.querySelectorAll('[data-destination]').forEach(link => {
    const key = link.dataset.destination;
    if (destinations[key]) {
      link.href = destinations[key];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#status';
      link.removeAttribute('target');
      link.addEventListener('click', event => {
        event.preventDefault();
        status.textContent = messages[key];
        status.scrollIntoView({behavior: 'auto', block: 'nearest'});
      });
    }
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();

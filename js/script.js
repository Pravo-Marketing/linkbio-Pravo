(() => {
  'use strict';

  // =====================================
  // LINKS PARA EDITAR
  // Troque somente os valores abaixo.
  // Use URLs completas começando com https://
  // =====================================
  const LINKS = {
    pravo: 'https://pravo.br',
    whatsapp: 'SEU-LINK-AQUI',
    anastasia: 'SEU-LINK-AQUI'
  };

  const status = document.getElementById('status');

  const safeHttps = value => {
    if (!value || value === 'SEU-LINK-AQUI') return null;

    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password
        ? url.href
        : null;
    } catch {
      return null;
    }
  };

  const destinations = {
    pravo: safeHttps(LINKS.pravo),
    whatsapp: safeHttps(LINKS.whatsapp),
    anastasia: safeHttps(LINKS.anastasia)
  };

  const messages = {
    pravo: 'O site da PRAVO estará disponível por aqui em breve.',
    whatsapp: 'O link do WhatsApp ainda precisa ser configurado.',
    anastasia: 'O link do AnastasIA ainda precisa ser configurado.'
  };

  document.querySelectorAll('[data-destination]').forEach(link => {
    const key = link.dataset.destination;
    const destination = destinations[key];

    if (destination) {
      link.href = destination;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return;
    }

    link.href = '#status';
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.addEventListener('click', event => {
      event.preventDefault();
      status.textContent = messages[key] || 'Este link ainda precisa ser configurado.';
      status.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

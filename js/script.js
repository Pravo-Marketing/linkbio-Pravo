(() => {
  'use strict';

  const config = window.JUAN_CONFIG || {};
  const links = config.links || {};
  const products = Array.isArray(config.products) ? config.products : [];
  const status = document.getElementById('status');

  const safeHttps = value => {
    if (!value || value === 'SEU-LINK-AQUI') return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
    } catch {
      return null;
    }
  };

  const messages = {
    pravo: 'O site da PRAVO ainda precisa ser configurado.',
    whatsapp: 'O link do WhatsApp ainda precisa ser configurado.',
    instagram: 'O link do Instagram ainda precisa ser configurado.',
    tiktok: 'O link do TikTok ainda precisa ser configurado.',
    youtube: 'O link do YouTube ainda precisa ser configurado.'
  };

  const showStatus = message => {
    if (!status) return;
    status.textContent = message;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  document.querySelectorAll('[data-destination]').forEach(anchor => {
    const key = anchor.dataset.destination;
    const destination = safeHttps(links[key]);

    if (destination) {
      anchor.href = destination;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      return;
    }

    anchor.href = '#status';
    anchor.addEventListener('click', event => {
      event.preventDefault();
      showStatus(messages[key] || 'Este link ainda precisa ser configurado.');
    });
  });

  const productGrid = document.getElementById('product-grid');
  const productPanel = document.getElementById('products-panel');
  const productToggle = document.getElementById('products-toggle');
  const productCard = document.getElementById('products-card');
  const productCta = document.getElementById('products-cta');

  if (productGrid) {
    products.forEach(product => {
      const item = document.createElement('a');
      item.className = 'product-card';

      const destination = safeHttps(product.url);
      if (destination) {
        item.href = destination;
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      } else {
        item.href = '#status';
        item.addEventListener('click', event => {
          event.preventDefault();
          showStatus(`O link de ${product.title || 'este produto'} ainda precisa ser configurado.`);
        });
      }

      const copy = document.createElement('div');
      const title = document.createElement('h3');
      const description = document.createElement('p');
      const action = document.createElement('span');
      const arrow = document.createElement('span');

      title.textContent = product.title || 'Produto digital';
      description.textContent = product.description || '';
      action.textContent = product.label || 'Ver produto';
      action.className = 'product-action';
      arrow.className = 'product-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';

      copy.append(title, description);
      item.append(copy, action, arrow);
      productGrid.appendChild(item);
    });
  }

  if (productToggle && productPanel) {
    productToggle.addEventListener('click', () => {
      const isOpen = productToggle.getAttribute('aria-expanded') === 'true';
      productToggle.setAttribute('aria-expanded', String(!isOpen));
      productPanel.hidden = isOpen;
      if (productCard) productCard.classList.toggle('is-open', !isOpen);
      if (productCta) productCta.textContent = !isOpen ? 'Fechar produtos' : 'Explorar produtos';

      if (!isOpen) {
        requestAnimationFrame(() => {
          productCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

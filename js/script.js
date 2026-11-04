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
    status.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
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

  const viewer = document.getElementById('product-viewer');
  const thumbnails = document.getElementById('product-thumbnails');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Somente seleção manual: não há temporizador ou troca automática.
  if (viewer && thumbnails) {
    const panel = document.getElementById('product-view');
    const stage = document.getElementById('product-stage');
    const image = document.getElementById('product-image');
    const art = document.getElementById('product-art');
    const artTitle = document.getElementById('product-art-title');
    const link = document.getElementById('product-link');
    const linkLabel = document.getElementById('product-link-label');
    const previous = document.getElementById('product-previous');
    const next = document.getElementById('product-next');
    let active = 0;
    let currentDestination = null;

    const imageSource = value => {
      if (typeof value !== 'string' || !value.trim()) return null;
      try {
        const url = new URL(value, window.location.href);
        return (url.origin === window.location.origin || url.protocol === 'https:') &&
          ['https:', 'http:', 'file:'].includes(url.protocol) && !url.username && !url.password
          ? url.href : null;
      } catch {
        return null;
      }
    };

    const buttons = products.map((product, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'product-thumbnail';
      button.id = `product-tab-${index}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', 'product-view');
      button.setAttribute('aria-label', product.title || 'Produto digital');

      const preview = document.createElement('span');
      preview.className = 'product-thumbnail-preview';
      preview.setAttribute('aria-hidden', 'true');
      const monogram = document.createElement('span');
      monogram.textContent = 'IA';
      preview.appendChild(monogram);
      const source = imageSource(product.image);
      if (source) {
        const thumbnail = document.createElement('img');
        thumbnail.alt = '';
        thumbnail.loading = 'lazy';
        thumbnail.width = 160;
        thumbnail.height = 90;
        thumbnail.addEventListener('error', () => thumbnail.remove(), { once: true });
        thumbnail.src = source;
        preview.appendChild(thumbnail);
      }
      const name = document.createElement('span');
      name.className = 'product-thumbnail-name';
      name.textContent = product.title || 'Produto digital';
      button.append(preview, name);
      button.addEventListener('click', () => choose(index));
      thumbnails.appendChild(button);
      return button;
    });

    const choose = (index, focusTab = false) => {
      if (!products.length) return;
      active = (index + products.length) % products.length;
      const product = products[active];
      const productTitle = product.title || 'Produto digital';
      artTitle.textContent = productTitle;
      linkLabel.textContent = product.label || 'Conhecer produto';
      link.setAttribute('aria-label', `${linkLabel.textContent}: ${productTitle}`);
      currentDestination = safeHttps(product.url);
      link.href = currentDestination || '#status';
      if (currentDestination) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
      panel.setAttribute('aria-labelledby', buttons[active].id);
      buttons.forEach((button, i) => {
        button.setAttribute('aria-selected', String(i === active));
        button.tabIndex = i === active ? 0 : -1;
      });

      image.hidden = true;
      art.hidden = false;
      image.removeAttribute('src');
      image.alt = product.imageAlt || productTitle;
      const source = imageSource(product.image);
      if (source) image.src = source;

      if (focusTab) buttons[active].focus({ preventScroll: true });
      // Role somente a faixa de miniaturas, sem deslocar a página.
      const selected = buttons[active];
      const left = selected.offsetLeft;
      if (left < thumbnails.scrollLeft || left + selected.offsetWidth > thumbnails.scrollLeft + thumbnails.clientWidth) {
        thumbnails.scrollTo({ left: Math.max(0, left - (thumbnails.clientWidth - selected.offsetWidth) / 2), behavior: reducedMotion ? 'instant' : 'smooth' });
      }
    };

    image.addEventListener('load', () => {
      if (image.getAttribute('src') && image.naturalWidth) {
        image.hidden = false;
        art.hidden = true;
      }
    });
    image.addEventListener('error', () => {
      image.hidden = true;
      art.hidden = false;
    });
    link.addEventListener('click', event => {
      if (!currentDestination) {
        event.preventDefault();
        showStatus(`O link de ${products[active]?.title || 'este produto'} ainda precisa ser configurado.`);
      }
    });
    previous.addEventListener('click', () => choose(active - 1));
    next.addEventListener('click', () => choose(active + 1));
    thumbnails.addEventListener('keydown', event => {
      let index;
      if (event.key === 'ArrowRight') index = active + 1;
      else if (event.key === 'ArrowLeft') index = active - 1;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = products.length - 1;
      else return;
      event.preventDefault();
      choose(index, true);
    });

    let touchStart = null;
    stage.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' && !event.target.closest('button')) {
        touchStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
        stage.setPointerCapture(event.pointerId);
      }
    });
    stage.addEventListener('pointerup', event => {
      if (!touchStart || touchStart.id !== event.pointerId) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = null;
      if (products.length > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        choose(active + (dx < 0 ? 1 : -1));
      }
    });
    stage.addEventListener('pointercancel', () => { touchStart = null; });

    viewer.hidden = products.length === 0;
    document.getElementById('products-empty').hidden = products.length > 0;
    document.getElementById('product-navigation').hidden = products.length < 2;
    if (products.length) choose(0);
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

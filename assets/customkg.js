(() => {
  'use strict';

  const root = document.querySelector('[data-ae-personalized-product]');
  if (!root || root.dataset.aeEnhanced === 'true') return;
  root.dataset.aeEnhanced = 'true';

  const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
  const qs = (selector, scope = root) => scope.querySelector(selector);
  const qsa = (selector, scope = root) => [...scope.querySelectorAll(selector)];
  const waitFor = (selector, timeout = 12000) => new Promise((resolve) => {
    const existing = qs(selector);
    if (existing) return resolve(existing);
    const observer = new MutationObserver(() => {
      const element = qs(selector);
      if (!element) return;
      observer.disconnect();
      resolve(element);
    });
    observer.observe(root, { childList: true, subtree: true });
    window.setTimeout(() => { observer.disconnect(); resolve(null); }, timeout);
  });

  const setStep = (step, complete, active = false) => {
    const item = qs(`[data-ae-progress-step="${step}"]`);
    if (!item) return;
    item.classList.toggle('is-complete', complete);
    item.classList.toggle('is-active', active);
  };

  const closestField = (element) => {
    if (!element) return null;
    if (element.matches('.product-form__quantity')) return element;
    return element.closest('.pplr-wrapper, .pplr-field, .pplr-customization, .pplr-option') || element.parentElement;
  };

  function addStepHeading(element, step, title, help = '') {
    const field = closestField(element);
    if (!field || field.querySelector(`.ae-step-heading[data-step="${step}"]`)) return;
    field.classList.add('ae-config-field');
    field.dataset.aeStep = String(step);
    const heading = document.createElement('div');
    heading.className = 'ae-step-heading';
    heading.dataset.step = String(step);
    heading.innerHTML = `<span>${step}</span><div><strong>${title}</strong>${help ? `<small>${help}</small>` : ''}</div>`;
    field.prepend(heading);
  }

  async function getCartQuantity() {
    try {
      const response = await fetch('/cart.js', { credentials: 'same-origin' });
      if (!response.ok) return 0;
      const cart = await response.json();
      return cart.items.reduce((total, item) => {
        const type = String(item.product_type || '').toLowerCase();
        return type.includes('comptagecart') ? total + Number(item.quantity || 0) : total;
      }, 0);
    } catch (_) { return 0; }
  }

  function tierFor(quantity) {
    if (quantity >= 5) return { unit: 5.9, next: 0 };
    if (quantity === 4) return { unit: 6.9, next: 5 };
    if (quantity === 3) return { unit: 7.9, next: 4 };
    if (quantity === 2) return { unit: 8.9, next: 3 };
    return { unit: 9.9, next: 2 };
  }

  function installStickyButton(realButton) {
    if (document.querySelector('.ae-sticky-buy')) return;
    const sticky = document.createElement('div');
    sticky.className = 'ae-sticky-buy';
    sticky.innerHTML = '<div><small>Total</small><strong data-ae-sticky-total></strong></div><button type="button">Ajouter mon sent-bon</button>';
    qs('button', sticky).addEventListener('click', () => realButton.click());
    document.body.append(sticky);
    const observer = new IntersectionObserver(([entry]) => sticky.classList.toggle('is-visible', !entry.isIntersecting), { threshold: 0.15 });
    observer.observe(realButton);
  }

  async function enhanceQuantity() {
    const quantityInput = await waitFor('input.quantity__input');
    const quantityField = qs('.product-form__quantity');
    const realButton = qs('.product-form__submit');
    const realButtonText = realButton?.querySelector('span');
    if (!quantityInput || !quantityField || !realButton || !realButtonText) return null;

    addStepHeading(quantityField, 4, 'Quantité', 'Le prix unitaire baisse automatiquement.');
    [qs('.listprice'), qs('.progress-container'), qs('.kgeco')].forEach((element) => { if (element) element.hidden = true; });

    const summary = document.createElement('div');
    summary.className = 'ae-price-summary';
    summary.innerHTML = '<div class="ae-price-summary__main"><span data-ae-quantity-label></span><strong data-ae-line-total></strong></div><p data-ae-saving></p><div class="ae-tier-track" aria-hidden="true"><i></i><span>1</span><span>2</span><span>3</span><span>4</span><span>5+</span></div>';
    quantityField.append(summary);
    installStickyButton(realButton);
    const cartQuantity = await getCartQuantity();

    const update = () => {
      const lineQuantity = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
      const combinedQuantity = lineQuantity + cartQuantity;
      const tier = tierFor(combinedQuantity);
      const total = lineQuantity * tier.unit;
      const saving = Math.max(0, (lineQuantity * 9.9) - total);
      qs('[data-ae-quantity-label]', summary).textContent = `${lineQuantity} sent-bon${lineQuantity > 1 ? 's' : ''} · ${money.format(tier.unit)} l’unité`;
      qs('[data-ae-line-total]', summary).textContent = money.format(total);
      const savingNode = qs('[data-ae-saving]', summary);
      if (tier.next) {
        const missing = Math.max(1, tier.next - combinedQuantity);
        savingNode.textContent = `Ajoutez ${missing} pièce${missing > 1 ? 's' : ''} pour atteindre la prochaine remise.`;
      } else {
        savingNode.textContent = `Meilleur tarif atteint${saving ? ` · Vous économisez ${money.format(saving)}` : ''}.`;
      }
      qs('.ae-tier-track i', summary).style.width = `${Math.min(100, (combinedQuantity / 5) * 100)}%`;
      realButtonText.textContent = `Ajouter mon sent-bon — ${money.format(total)}`;
      const stickyTotal = document.querySelector('[data-ae-sticky-total]');
      if (stickyTotal) stickyTotal.textContent = money.format(total);
    };

    quantityInput.addEventListener('input', update);
    quantityInput.addEventListener('change', () => {
      update();
      setStep(4, true, false);
    });
    quantityField.addEventListener('click', () => window.setTimeout(update, 0));
    update();
    const productForm = realButton.closest('product-form');
    return { quantityField, buttonBlock: productForm?.parentElement || productForm };
  }

  async function enhanceZepto() {
    const uploadButton = await waitFor('.pplrfileuploadbutton');
    const shapeContainer = await waitFor('.pplr_thumb_image');
    const fragrance = await waitFor('select.pplr_select');

    if (uploadButton) {
      const uploadField = closestField(uploadButton);
      const normalizeUploadControls = () => {
        const buttons = qsa('.pplrfileuploadbutton');
        buttons.forEach((button, index) => {
          button.textContent = 'Importer ma photo';
          button.setAttribute('aria-label', 'Importer une photo à personnaliser');
          if (index === 0) return;
          const duplicateField = closestField(button);
          if (duplicateField && duplicateField !== uploadField) duplicateField.hidden = true;
          else button.hidden = true;
        });
      };
      normalizeUploadControls();
      const uploadObserver = new MutationObserver(normalizeUploadControls);
      uploadObserver.observe(root, { childList: true, subtree: true });
      window.setTimeout(() => uploadObserver.disconnect(), 8000);
      addStepHeading(uploadButton, 1, 'Votre photo', 'JPG, PNG ou HEIC · choisissez une image nette.');
      const fileInput = uploadField?.querySelector('input[type="file"]') || qs('.product-personalizer input[type="file"]');
      if (fileInput) fileInput.addEventListener('change', () => {
        const complete = fileInput.files.length > 0;
        setStep(1, complete, !complete);
        setStep(2, false, complete);
      });
    }

    if (shapeContainer) {
      addStepHeading(shapeContainer, 2, 'Forme', 'Choisissez le format qui convient le mieux à votre photo.');
      const swatches = qsa('.pplr-swatch-element', shapeContainer);
      swatches.forEach((swatch, index) => {
        const raw = swatch.querySelector('.img_dropdown')?.textContent?.trim();
        const label = raw || ['Rond', 'Portrait', 'Paysage', 'Carré'][index] || `Forme ${index + 1}`;
        swatch.setAttribute('role', 'button');
        swatch.setAttribute('aria-label', label);
        if (!swatch.querySelector('.ae-shape-label')) {
          const text = document.createElement('span');
          text.className = 'ae-shape-label';
          text.textContent = label;
          swatch.append(text);
        }
      });
      shapeContainer.addEventListener('click', (event) => {
        const swatch = event.target.closest('.pplr-swatch-element');
        if (!swatch) return;
        qsa('.pplr-swatch-element', shapeContainer).forEach((item) => item.setAttribute('aria-pressed', String(item === swatch)));
        setStep(2, true, false);
        setStep(3, false, true);
      });
      const selected = qs('.pplr-swatch-element.selected', shapeContainer);
      if (selected) selected.setAttribute('aria-pressed', 'true');
    }

    if (fragrance) {
      addStepHeading(fragrance, 3, 'Parfum', 'Sélectionnez la senteur qui vous ressemble.');
      if (![...fragrance.options].some((option) => option.value === '')) {
        fragrance.prepend(new Option('Choisissez votre parfum', '', true, true));
      }
      fragrance.value = '';
      fragrance.required = true;
      fragrance.setAttribute('aria-describedby', 'ae-fragrance-help');
      const help = document.createElement('p');
      help.id = 'ae-fragrance-help';
      help.className = 'ae-field-help';
      help.textContent = 'Votre choix est requis avant l’ajout au panier.';
      fragrance.insertAdjacentElement('afterend', help);
      fragrance.dispatchEvent(new Event('change', { bubbles: true }));
      fragrance.addEventListener('change', () => {
        const complete = Boolean(fragrance.value);
        help.hidden = complete;
        setStep(3, complete, !complete);
        setStep(4, false, complete);
      });

      const form = fragrance.closest('form') || qs('form[action*="/cart/add"]');
      if (form) form.addEventListener('submit', (event) => {
        if (fragrance.value) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        help.hidden = false;
        fragrance.focus();
        fragrance.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, true);
    }
    return { fragrance, fragranceField: closestField(fragrance) };
  }

  function arrangeConfigurator(zepto, quantity) {
    if (!zepto?.fragranceField || !quantity?.quantityField || !quantity?.buttonBlock) return;
    zepto.fragranceField.insertAdjacentElement('afterend', quantity.quantityField);
    quantity.quantityField.insertAdjacentElement('afterend', quantity.buttonBlock);
  }

  async function loadCustomerProof() {
    const proof = qs('[data-ae-product-proof]');
    const grid = qs('[data-ae-product-proof-grid]');
    if (!proof || !grid) return;
    try {
      const url = new URL(proof.dataset.apiUrl);
      if (url.protocol !== 'https:') return;
      url.searchParams.set('action', 'summary');
      url.searchParams.set('product_handle', proof.dataset.productHandle);
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) return;
      const data = await response.json();
      const photos = (data.photos || []).slice(0, 4);
      if (!photos.length) return;
      photos.forEach((source, index) => {
        const image = document.createElement('img');
        image.src = source;
        image.alt = `Création personnalisée d’un client ${index + 1}`;
        image.loading = 'lazy';
        image.width = 180;
        image.height = 180;
        grid.append(image);
      });
      const link = qs('a', proof);
      if (link && data.count) link.textContent = `Voir les ${data.count} avis`;
      proof.hidden = false;
    } catch (_) { proof.hidden = true; }
  }

  Promise.all([enhanceZepto(), enhanceQuantity()])
    .then(([zepto, quantity]) => arrangeConfigurator(zepto, quantity))
    .catch(() => {});
  loadCustomerProof();
})();

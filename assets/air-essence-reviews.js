(() => {
  'use strict';
  if (window.AirEssenceReviewsLoaded) return;
  window.AirEssenceReviewsLoaded = true;

  const qs = (root, selector) => root.querySelector(selector);
  const qsa = (root, selector) => [...root.querySelectorAll(selector)];
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.toString() : '';
    } catch (_) { return ''; }
  };
  const stars = (rating) => `${'★'.repeat(Math.max(0, Math.min(5, rating)))}${'☆'.repeat(Math.max(0, 5 - rating))}`;
  const formatDate = (value) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));

  async function api(url, options = {}) {
    const response = await fetch(url, { ...options, headers: { Accept: 'application/json', ...(options.headers || {}) } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'Une erreur est survenue.');
    return payload;
  }

  function photoButton(url, alt, openPhoto) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ae-photo-button';
    const image = document.createElement('img');
    image.src = url;
    image.alt = alt;
    image.loading = 'lazy';
    image.width = 220;
    image.height = 220;
    button.append(image);
    button.addEventListener('click', () => openPhoto(url));
    return button;
  }

  function reviewCard(review, openPhoto) {
    const article = document.createElement('article');
    article.className = 'ae-review-card';
    const top = document.createElement('div');
    top.className = 'ae-review-card__top';
    const authorWrap = document.createElement('div');
    const author = document.createElement('span');
    author.className = 'ae-review-card__author';
    author.textContent = review.nickname;
    authorWrap.append(author);
    if (review.verified_purchase) {
      const verified = document.createElement('span');
      verified.className = 'ae-verified';
      verified.textContent = 'Achat vérifié';
      authorWrap.append(verified);
    }
    const date = document.createElement('time');
    date.dateTime = review.review_date;
    date.textContent = formatDate(review.review_date);
    top.append(authorWrap, date);
    article.append(top);

    const rating = document.createElement('div');
    rating.className = 'ae-stars ae-review-card__rating';
    rating.setAttribute('aria-label', `${review.rating} étoiles sur 5`);
    rating.textContent = stars(Number(review.rating));
    article.append(rating);

    if (review.title) {
      const title = document.createElement('h3');
      title.className = 'ae-review-card__title';
      title.textContent = review.title;
      article.append(title);
    }
    const body = document.createElement('p');
    body.className = 'ae-review-card__body';
    body.textContent = review.review;
    article.append(body);

    if (review.photos?.length) {
      const photos = document.createElement('div');
      photos.className = 'ae-review-card__photos';
      review.photos.forEach((url) => photos.append(photoButton(url, `Photo de l’avis de ${review.nickname}`, openPhoto)));
      article.append(photos);
    }
    if (review.reply) {
      const reply = document.createElement('div');
      reply.className = 'ae-merchant-reply';
      const label = document.createElement('strong');
      label.textContent = 'Réponse d’Air Essence';
      const text = document.createElement('span');
      text.textContent = review.reply;
      reply.append(label, text);
      article.append(reply);
    }
    return article;
  }

  async function initSummary(root) {
    const base = safeUrl(root.dataset.apiUrl);
    if (!base) { root.hidden = true; return; }
    try {
      const url = new URL(base);
      url.searchParams.set('action', 'summary');
      url.searchParams.set('product_handle', root.dataset.productHandle);
      const data = await api(url);
      if (Number(data.count || 0) <= 0) {
        root.hidden = true;
        return;
      }
      qs(root, '[data-ae-summary-text]').textContent = `${Number(data.average || 0).toFixed(1)}/5 selon ${data.count || 0} avis`;
    } catch (_) {
      root.hidden = true;
    }
  }

  function initReviews(root) {
    const base = safeUrl(root.dataset.apiUrl);
    const loading = qs(root, '[data-ae-loading]');
    const errorBox = qs(root, '[data-ae-error]');
    const content = qs(root, '[data-ae-content]');
    if (!base) {
      loading.hidden = true;
      errorBox.hidden = false;
      errorBox.textContent = 'Le module d’avis doit être connecté dans les paramètres du thème.';
      return;
    }

    const state = { page: 1, rating: '', photos: false, sort: 'recent', loading: false };
    const list = qs(root, '[data-ae-list]');
    const more = qs(root, '[data-ae-load-more]');
    const formDialog = qs(root, '[data-ae-form-dialog]');
    const photoDialog = qs(root, '[data-ae-photo-dialog]');
    const photoLarge = qs(root, '[data-ae-photo-large]');
    const token = new URLSearchParams(location.search).get('review_token') || '';

    const openPhoto = (url) => {
      photoLarge.src = url;
      if (typeof photoDialog.showModal === 'function') photoDialog.showModal();
    };
    qs(root, '[data-ae-photo-close]').addEventListener('click', () => photoDialog.close());
    photoDialog.addEventListener('click', (event) => { if (event.target === photoDialog) photoDialog.close(); });

    function renderOverview(summary) {
      qs(root, '[data-ae-average]').textContent = Number(summary.average || 0).toFixed(1);
      qs(root, '[data-ae-count]').textContent = summary.count || 0;
      const bars = qs(root, '[data-ae-bars]');
      bars.replaceChildren();
      for (let rating = 5; rating >= 1; rating -= 1) {
        const count = Number(summary.distribution?.[rating] || 0);
        const percent = summary.count ? Math.round((count / summary.count) * 100) : 0;
        const row = document.createElement('div');
        row.className = 'ae-rating-row';
        const label = document.createElement('span');
        label.textContent = `${rating} étoiles`;
        const track = document.createElement('div');
        track.className = 'ae-rating-row__track';
        const fill = document.createElement('div');
        fill.className = 'ae-rating-row__fill';
        fill.style.width = `${percent}%`;
        track.append(fill);
        const value = document.createElement('span');
        value.textContent = count;
        row.append(label, track, value);
        bars.append(row);
      }
      const strip = qs(root, '[data-ae-photo-strip]');
      const grid = qs(root, '[data-ae-photo-grid]');
      grid.replaceChildren();
      (summary.photos || []).slice(0, 12).forEach((url) => grid.append(photoButton(url, 'Photo envoyée par un client', openPhoto)));
      strip.hidden = !grid.children.length;
    }

    async function load(reset = false) {
      if (state.loading) return;
      state.loading = true;
      if (reset) { state.page = 1; list.replaceChildren(); }
      more.disabled = true;
      errorBox.hidden = true;
      try {
        const url = new URL(base);
        url.searchParams.set('action', 'list');
        url.searchParams.set('product_handle', root.dataset.productHandle);
        url.searchParams.set('page', state.page);
        url.searchParams.set('per_page', root.dataset.perPage || '10');
        url.searchParams.set('sort', state.sort);
        if (state.rating) url.searchParams.set('rating', state.rating);
        if (state.photos) url.searchParams.set('with_photos', 'true');
        const data = await api(url);
        if (reset) renderOverview(data.summary);
        (data.reviews || []).forEach((review) => list.append(reviewCard(review, openPhoto)));
        if (!list.children.length) {
          const empty = document.createElement('p');
          empty.className = 'ae-empty';
          empty.textContent = 'Aucun avis ne correspond à ce filtre.';
          list.append(empty);
        }
        more.hidden = !data.has_more;
        state.page += 1;
        loading.hidden = true;
        content.hidden = false;
      } catch (error) {
        loading.hidden = true;
        errorBox.hidden = false;
        errorBox.textContent = error.message;
      } finally {
        state.loading = false;
        more.disabled = false;
      }
    }

    qsa(root, '.ae-filter').forEach((button) => button.addEventListener('click', () => {
      qsa(root, '.ae-filter').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      state.rating = button.dataset.rating || '';
      state.photos = button.dataset.photos === 'true';
      load(true);
    }));
    qs(root, '[data-ae-sort]').addEventListener('change', (event) => { state.sort = event.target.value; load(true); });
    more.addEventListener('click', () => load(false));
    qs(root, '[data-ae-open-form]')?.addEventListener('click', () => formDialog.showModal());
    qs(root, '[data-ae-close]').addEventListener('click', () => formDialog.close());
    formDialog.addEventListener('click', (event) => { if (event.target === formDialog) formDialog.close(); });

    const form = qs(root, '[data-ae-form]');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submit = qs(form, '[data-ae-submit]');
      const status = qs(form, '[data-ae-form-status]');
      const files = form.querySelector('[name="photos"]').files;
      if (files.length > 4 || [...files].some((file) => file.size > 5 * 1024 * 1024)) {
        status.className = 'ae-form-status is-error';
        status.textContent = 'Ajoutez au maximum 4 photos de moins de 5 Mo chacune.';
        return;
      }
      submit.disabled = true;
      status.className = 'ae-form-status';
      status.textContent = 'Envoi en cours…';
      const body = new FormData(form);
      body.set('action', 'submit');
      body.set('product_id', root.dataset.productId);
      body.set('product_handle', root.dataset.productHandle);
      body.set('product_title', root.dataset.productTitle);
      body.set('token', token);
      try {
        const data = await api(base, { method: 'POST', body });
        form.reset();
        status.textContent = data.message || 'Merci ! Votre avis a bien été transmis.';
        setTimeout(() => formDialog.close(), 2200);
      } catch (error) {
        status.className = 'ae-form-status is-error';
        status.textContent = error.message;
      } finally { submit.disabled = false; }
    });

    if (token) formDialog.showModal();
    load(true);
  }

  function boot() {
    qsa(document, '[data-ae-review-summary]:not([data-ae-ready])').forEach((el) => { el.dataset.aeReady = 'true'; initSummary(el); });
    qsa(document, '[data-ae-reviews]:not([data-ae-ready])').forEach((el) => { el.dataset.aeReady = 'true'; initReviews(el); });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
  document.addEventListener('shopify:section:load', boot);
})();

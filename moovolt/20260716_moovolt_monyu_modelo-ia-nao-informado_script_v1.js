(function () {
  'use strict';

  const body = document.body;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const progress = document.getElementById('reading-progress');
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sourceFilter = document.getElementById('source-filter');
  const sourceItems = Array.from(document.querySelectorAll('[data-source]'));
  const noSourceResults = document.getElementById('no-source-results');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add('open');
    body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (event) {
      if (!body.classList.contains('nav-open')) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeNav();
        toggle.focus();
      }
    });
  }

  function updateScrollUI() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(100, Math.max(0, scrollTop / scrollable * 100)) : 0;
    if (progress) progress.style.width = ratio + '%';
    if (header) header.classList.toggle('scrolled', scrollTop > 24);
  }

  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 820) closeNav();
    updateScrollUI();
  });

  if ('IntersectionObserver' in window && navLinks.length) {
    const linkedSections = navLinks
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    const observer = new IntersectionObserver(function (entries) {
      const visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (!visible.length) return;
      const id = '#' + visible[0].target.id;
      navLinks.forEach(function (link) {
        const active = link.getAttribute('href') === id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-30% 0px -58% 0px', threshold: [0, .1, .3] });

    linkedSections.forEach(function (section) { observer.observe(section); });
  }

  if (sourceFilter && sourceItems.length) {
    sourceFilter.addEventListener('input', function () {
      const query = sourceFilter.value.trim().toLocaleLowerCase('pt-BR');
      let visibleCount = 0;

      sourceItems.forEach(function (item) {
        const match = !query || item.textContent.toLocaleLowerCase('pt-BR').includes(query);
        item.hidden = !match;
        if (match) visibleCount += 1;
      });

      document.querySelectorAll('.source-group').forEach(function (group) {
        const hasVisible = Array.from(group.querySelectorAll('[data-source]')).some(function (item) {
          return !item.hidden;
        });
        group.hidden = !hasVisible;
      });

      if (noSourceResults) noSourceResults.hidden = visibleCount !== 0;
    });
  }

  document.querySelectorAll('.accordion-list details').forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (!detail.open) return;
      const list = detail.closest('.accordion-list');
      if (!list) return;
      list.querySelectorAll('details[open]').forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });
})();

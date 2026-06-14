/* ===================================================
   DISCOVERY DE INOVAÇÃO — IARIS VENTURES × MONYU
   script_v1.js
   =================================================== */

(function () {
  'use strict';

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── BACK TO TOP ── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── TABS (Patentes / Artigos) ── */
  document.querySelectorAll('.pa-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      document.querySelectorAll('.pa-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pa-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── ACCORDION ── */
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const contentId = btn.getAttribute('aria-controls');
      const content = document.getElementById(contentId);
      if (!content) return;
      const isOpen = btn.classList.toggle('open');
      content.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  /* ── SCORE BARS ANIMATION ── */
  function animateBars() {
    document.querySelectorAll('.score-bar-fill').forEach(bar => {
      const target = bar.dataset.score || '0';
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = target + '%';
      }, 100);
    });
  }

  // Intersection Observer for score section
  const scoreSection = document.getElementById('score');
  if (scoreSection && 'IntersectionObserver' in window) {
    let animated = false;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateBars();
      }
    }, { threshold: 0.2 });
    obs.observe(scoreSection);
  } else if (scoreSection) {
    animateBars();
  }

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 80;
    let current = '';
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── RADAR CHART (Score) ── */
  const radarCanvas = document.getElementById('radar-chart');
  if (radarCanvas && window.Chart) {
    const ctx = radarCanvas.getContext('2d');
    new window.Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Mercado', 'Modelo de\nNegócio', 'Inovação', 'Execução', 'Sustentabi-\nlidade', 'Escalabili-\ndade'],
        datasets: [{
          label: 'Iaris Ventures',
          data: [72, 68, 78, 65, 60, 70],
          backgroundColor: 'rgba(255,0,85,0.15)',
          borderColor: '#ff0055',
          borderWidth: 2,
          pointBackgroundColor: '#ff0055',
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(255,255,255,0.08)' },
            angleLines: { color: 'rgba(255,255,255,0.08)' },
            pointLabels: {
              color: '#888899', font: { size: 11 }
            }
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  /* ── TREND BARS CHART ── */
  const trendCanvas = document.getElementById('trend-chart');
  if (trendCanvas && window.Chart) {
    const ctx2 = trendCanvas.getContext('2d');
    new window.Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [
          'CVBaaS', 'Open Finance', 'Jurimetria AI',
          'RWA/Royalties', 'PI-Stack', 'Martech B2B',
          'ESG Tokeniz.', 'RegTech CVB', 'Deep Tech CVB', 'Gov/EdTech'
        ],
        datasets: [{
          label: 'Relevância Estratégica',
          data: [90, 85, 82, 75, 70, 72, 65, 68, 78, 60],
          backgroundColor: 'rgba(255,0,85,0.7)',
          borderColor: '#ff0055',
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0, max: 100,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#555566', font: { size: 10 } }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#888899', font: { size: 11 } }
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  console.log('[MonyU] Report loaded — Iaris Ventures Discovery v1 · 2026-06-13');
})();

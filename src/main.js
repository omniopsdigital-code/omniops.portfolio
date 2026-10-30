import './style.css';

/* ============================================
   OMNIOPS DIGITAL — MAIN JAVASCRIPT
   Scroll reveals, progress bar, nav, parallax
   ============================================ */

// ── Progress bar ──
function initProgress() {
  const bar = document.querySelector('.progress i');
  if (!bar) return;
  function update() {
    const h = document.documentElement;
    const prog = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.setProperty('--progress', prog.toFixed(4));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Nav hide on scroll ──
function initNav() {
  const nav = document.getElementById('top-bar');
  if (!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('hide', y > lastY && y > 120);
    lastY = y;
  }, { passive: true });
}

// ── Mobile nav ──
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveals ──
function initReveals() {
  if (!document.documentElement.classList.contains('js')) return;
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ── Active nav link ──
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav a[href*="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          const href = a.getAttribute('href');
          a.setAttribute('aria-current', href && href.includes(`#${id}`) ? 'page' : '');
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ── Rail navigation (case study pages) ──
function initRail() {
  const rail = document.querySelector('.rail');
  if (!rail) return;
  const links = rail.querySelectorAll('a[data-rail]');
  const sections = [...links].map(a => document.getElementById(a.dataset.rail)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => {
          a.setAttribute('aria-current', a.dataset.rail === id ? 'true' : '');
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

// ── Parallax blobs ──
function initParallax() {
  const blobs = document.querySelectorAll('[data-depth]');
  if (!blobs.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    blobs.forEach(b => {
      const depth = parseFloat(b.dataset.depth) || 0;
      b.style.translate = `${dx * depth}px ${dy * depth}px`;
    });
  });
}

// ── Accordion ──
function initAccordions() {
  document.querySelectorAll('[data-acc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.item');
      const open = btn.getAttribute('aria-expanded') === 'true';
      // Close siblings
      item.closest('[data-accordion]').querySelectorAll('.item.open').forEach(i => {
        if (i !== item) {
          i.classList.remove('open');
          i.querySelector('[data-acc]')?.setAttribute('aria-expanded', 'false');
        }
      });
      btn.setAttribute('aria-expanded', !open);
      item.classList.toggle('open', !open);
    });
  });
}

// ── Tabs ──
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs = container.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    function activate(tab) {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      panels.forEach(p => {
        const show = p.dataset.panel === target;
        show ? p.removeAttribute('hidden') : p.setAttribute('hidden', '');
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activate(tab));
    });
  });
}

// ── Comparison slider ──
function initCompare() {
  document.querySelectorAll('[data-compare]').forEach(el => {
    const handle = el.querySelector('[data-compare-range]');
    if (!handle) return;

    function update(val) {
      el.style.setProperty('--pos', val + '%');
    }

    handle.addEventListener('input', () => update(handle.value));
    update(50);
  });
}

// ── Segmented control ──
function initSegments() {
  document.querySelectorAll('[data-seg-root]').forEach(root => {
    const btns = root.querySelectorAll('[data-seg]');
    const texts = root.querySelectorAll('[data-seg-text]');

    function activate(seg) {
      btns.forEach(b => b.setAttribute('aria-pressed', b.dataset.seg === seg ? 'true' : 'false'));
      texts.forEach(t => {
        const show = t.dataset.segText === seg;
        show ? t.removeAttribute('hidden') : t.setAttribute('hidden', '');
      });
    }

    btns.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.seg));
    });
  });
}

// ── Fan panels ──
function initFan() {
  document.querySelectorAll('[data-fan]').forEach(fan => {
    const panels = fan.querySelectorAll('[data-fan-item]');

    function activate(panel) {
      panels.forEach(p => {
        const open = p === panel;
        p.classList.toggle('open', open);
        p.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    panels.forEach(panel => {
      panel.addEventListener('click', () => activate(panel));
      panel.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(panel);
        }
      });
    });
  });
}

// ── Carousel ──
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-track]');
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    if (!track || !prev || !next) return;

    const slides = track.querySelectorAll('.slide');
    let current = 0;

    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
    }

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    // Keyboard
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  });
}

// ── Venn diagram ──
function initVenn() {
  document.querySelectorAll('[data-venn]').forEach(root => {
    const dataEl = root.querySelector('[data-venn-data]');
    if (!dataEl) return;
    const data = JSON.parse(dataEl.textContent);
    const panel = root.querySelector('[data-venn-panel]');
    const titleEl = panel?.querySelector('[data-venn-title]');
    const textEl = panel?.querySelector('[data-venn-text]');
    const pointsEl = panel?.querySelector('[data-venn-points]');
    const items = root.querySelectorAll('[data-venn-item]');

    function show(key) {
      const item = key === 'center' ? data.center : data.items[parseInt(key)];
      if (!item || !titleEl) return;
      titleEl.textContent = item.name;
      textEl.textContent = item.blurb;
      if (pointsEl && item.points) {
        pointsEl.innerHTML = item.points.map(p => `<li>${p}</li>`).join('');
      }
    }

    items.forEach(el => {
      const key = el.dataset.vennItem;
      el.addEventListener('mouseenter', () => show(key));
      el.addEventListener('focus', () => show(key));
    });

    show('center');
  });
}

// ── Init everything ──
document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initNav();
  initMobileNav();
  initReveals();
  initActiveNav();
  initRail();
  initParallax();
  initAccordions();
  initTabs();
  initCompare();
  initSegments();
  initFan();
  initCarousels();
  initVenn();
});

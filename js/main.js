/* ============================================================
   BROADVISION EYE CLINIC — main.js v3
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Navbar elevation on scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('elevated', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Mobile drawer ── */
  const burger      = document.getElementById('burger');
  const drawer      = document.getElementById('drawer');
  const drawerBg    = document.getElementById('drawerBg');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (burger) burger.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    if (burger) burger.setAttribute('aria-expanded', 'false');
    setTimeout(function () {
      if (!drawer.classList.contains('open')) drawer.style.display = '';
    }, 400);
  }

  if (burger)      burger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBg)    drawerBg.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── Scroll reveal ── */
  const revEls = document.querySelectorAll('.reveal');
  if (revEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revEls.forEach(function (el) { obs.observe(el); });
  } else {
    revEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        const q = o.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Shop filter + search ── */
  const chips    = document.querySelectorAll('#chips .chip');
  const products = document.querySelectorAll('#prodGrid .prod-card');
  const empty    = document.getElementById('emptyState');
  const countNum = document.getElementById('countNum');
  const search   = document.getElementById('shopSearch');

  function filterProducts() {
    const active = document.querySelector('#chips .chip.active');
    const cat    = active ? active.dataset.f : 'all';
    const q      = search ? search.value.toLowerCase().trim() : '';
    let   count  = 0;

    products.forEach(function (card) {
      const catOk  = cat === 'all' || card.dataset.cat === cat;
      const nameOk = !q || (card.dataset.name || '').toLowerCase().includes(q);
      const show   = catOk && nameOk;
      card.style.display = show ? '' : 'none';
      if (show) { count++; card.style.animation = 'fadeUp .35s ease both'; }
    });

    if (countNum) countNum.textContent = count;
    if (empty)    empty.style.display  = count === 0 ? 'block' : 'none';
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      filterProducts();
    });
  });

  if (search) search.addEventListener('input', filterProducts);

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
      closeDrawer();
    });
  });

  /* ── Form field: clear error on input ── */
  document.querySelectorAll('.form-input').forEach(function (inp) {
    inp.addEventListener('input', function () { this.classList.remove('error'); });
  });

});

/* ── Page load: start animations ── */
window.addEventListener('load', function () {
  document.querySelectorAll('.a-up, .a-in').forEach(function (el) {
    el.style.animationPlayState = 'running';
  });
});

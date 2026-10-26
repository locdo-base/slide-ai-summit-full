/* =========================================================================
   Enterprise AI Summit 2026 — keynote runtime (Task 04 skeleton)

   Navigation, scaling, keyboard, speaker notes, blueprint toggle.
   It does NOT generate slide content: every slide is authored in index.html.
   No framework, no build step, no network.
   ========================================================================= */
(function () {
  'use strict';

  var stage  = document.getElementById('stage');
  var notes  = document.getElementById('notes');
  var hudNum = document.getElementById('hud-num');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var i = 0;

  /* ---- fit the fixed canvas into the viewport ------------------------- */
  function fit() {
    var cs = getComputedStyle(document.documentElement);
    var W = parseFloat(cs.getPropertyValue('--canvas-w')) || 2560;
    var H = parseFloat(cs.getPropertyValue('--canvas-h')) || 1280;
    var reserved = notes.classList.contains('is-open') ? window.innerHeight * 0.32 : 0;
    var s = Math.min(window.innerWidth / W, (window.innerHeight - reserved) / H);
    stage.style.transform = 'scale(' + s + ')';
    stage.style.marginBottom = reserved ? reserved + 'px' : '0';
  }

  /* ---- navigation ----------------------------------------------------- */
  /* ---- build steps ---------------------------------------------------
     An element marked data-build="n" stays hidden until the nth forward step
     on its slide. Forward/back move through a slide's builds before moving
     between slides. Static mode reveals everything, so screenshots and PDF
     never catch a half-built slide. */
  var build = 0;

  function buildMax() {
    var els = slides[i].querySelectorAll('[data-build]');
    var m = 0;
    for (var k = 0; k < els.length; k++) m = Math.max(m, +els[k].dataset.build || 0);
    return m;
  }

  function applyBuild() {
    var isStatic = document.body.classList.contains('is-static');
    var els = slides[i].querySelectorAll('[data-build]');
    for (var k = 0; k < els.length; k++) {
      var n = +els[k].dataset.build || 0;
      els[k].classList.toggle('is-revealed', isStatic || n <= build);
    }
    // Publish the current step on the slide so a slide can style itself per
    // step, not just reveal. Slide 2 uses this to move its amber highlight
    // from component to component. Static resolves to the finished frame.
    slides[i].dataset.buildNow = isStatic ? buildMax() : build;
  }

  function forward() { if (build < buildMax()) { build++; applyBuild(); } else show(i + 1); }
  function back()    { if (build > 0)          { build--; applyBuild(); } else show(i - 1, false, true); }

  function show(n, silent) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    build = 0;
    if (arguments.length > 2 && arguments[2]) build = buildMax();
    applyBuild();
    if (hudNum) hudNum.textContent = (i + 1) + ' / ' + slides.length;
    renderNotes();
    if (!silent) history.replaceState(null, '', '#' + (i + 1));
  }

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  function renderNotes() {
    var s = slides[i];
    var head = 'Slide ' + s.dataset.slide + ' · ' + (s.dataset.type || '');
    notes.innerHTML = '<b>' + esc(head) + '</b>' +
                      esc(s.getAttribute('data-speaker-notes') || '—');
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': forward(); e.preventDefault(); break;
      case 'ArrowLeft':  case 'PageUp':            back();    e.preventDefault(); break;
      case 'Home': show(0); break;
      case 'End':  show(slides.length - 1); break;
      case 'n': case 'N': notes.classList.toggle('is-open'); fit(); break;
      // blueprint: outline the empty regions so the skeleton is reviewable.
      // Off = the real production canvas.
      case 'b': case 'B': document.body.classList.toggle('blueprint'); break;
      // static: finished frame, no presenter chrome — screenshots and PDF
      case 's': case 'S': document.body.classList.toggle('is-static'); applyBuild(); break;
    }
  });

  stage.addEventListener('click', function (e) {
    if (e.clientX < window.innerWidth / 2) back(); else forward();
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', function () {
    var n = parseInt(location.hash.slice(1), 10);
    if (n && n - 1 !== i) show(n - 1, true);
  });

  /* ---- boot ----------------------------------------------------------- */
  // Query flags let the render pipeline ask for an exact frame:
  //   ?static      finished frame, no chrome
  //   ?plain       blueprint off (production canvas)
  var q = location.search;
  if (/(^|[?&])static(&|=|$)/.test(q)) document.body.classList.add('is-static');
  if (!/(^|[?&])plain(&|=|$)/.test(q)) document.body.classList.add('blueprint');

  var start = parseInt(location.hash.slice(1), 10);
  show(isNaN(start) ? 0 : start - 1, true);
  fit();

  // Fonts change metrics; refit once they land so nothing reflows mid-talk.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('beforeprint', function () {
    document.body.classList.add('is-static'); applyBuild();
  });
})();

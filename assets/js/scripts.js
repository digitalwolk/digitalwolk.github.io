(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
  }

  document.querySelectorAll('.has-menu > button').forEach(function (b) {
    b.addEventListener('click', function () { b.parentNode.classList.toggle('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-menu.open').forEach(function (m) { m.classList.remove('open'); });
      if (document.activeElement && document.activeElement.closest('.has-menu')) document.activeElement.blur();
    }
  });

  var ex = document.getElementById('explorer');
  if (!ex) return;
  var tabs = Array.prototype.slice.call(ex.querySelectorAll('[role=tab]'));
  var panels = Array.prototype.slice.call(ex.querySelectorAll('[role=tabpanel]'));
  function select(i, focus) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (focus) tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i, false); });
    t.addEventListener('keydown', function (e) {
      var n = tabs.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % n, true); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + n) % n, true); }
    });
  });
  select(0, false);
})();

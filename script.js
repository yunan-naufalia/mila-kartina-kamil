(function () {
  var root = document.documentElement;
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  // Ukuran huruf dan kontras (diingat di semua halaman)
  var sizeBtns = document.querySelectorAll('.tools button[data-size]');
  var contrast = document.getElementById('kontras');
  function setSize(n) {
    if (n === '0') root.removeAttribute('data-size'); else root.setAttribute('data-size', n);
    sizeBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.size === n)); });
    store('mkk-size', n);
  }
  function setContrast(on) {
    if (on) root.setAttribute('data-contrast', 'high'); else root.removeAttribute('data-contrast');
    if (contrast) contrast.setAttribute('aria-pressed', String(on));
    store('mkk-contrast', on ? '1' : '0');
  }
  sizeBtns.forEach(function (b) { b.addEventListener('click', function () { setSize(b.dataset.size); }); });
  if (contrast) contrast.addEventListener('click', function () { setContrast(contrast.getAttribute('aria-pressed') !== 'true'); });
  var s = load('mkk-size'); if (s) setSize(s);
  if (load('mkk-contrast') === '1') setContrast(true);

  // Filter karya
  var filterBtns = document.querySelectorAll('.filters button');
  var status = document.getElementById('filter-status');
  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter, shown = 0;
      filterBtns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.querySelectorAll('.works .work').forEach(function (w) {
        var ok = f === 'semua' || w.dataset.kind === f;
        w.hidden = !ok; if (ok) shown++;
      });
      if (status) status.textContent = 'Menampilkan ' + shown + ' karya.';
    });
  });
})();

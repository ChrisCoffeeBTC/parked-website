(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-menu');
  if (!header || !toggle || !menu) return;
  const mobile = window.matchMedia('(max-width: 900px)');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = mobile.matches && !open;
    toggle.querySelector('[data-menu-label]').textContent = open ? 'Close' : 'Menu';
  }
  function reset() {
    toggle.hidden = !mobile.matches;
    setOpen(false);
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a') && mobile.matches) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !header.contains(event.target)) setOpen(false);
  });
  header.addEventListener('focusout', event => {
    if (mobile.matches && event.relatedTarget && !header.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', reset);
  reset();
})();

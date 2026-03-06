// theme-toggle.js
const THEMES = ['default','dark','contrast'];
function setTheme(name) {
  const body = document.body;
  THEMES.forEach(t => body.classList.remove('theme-' + t));
  body.classList.add('theme-' + name);
  try { localStorage.setItem('blog-theme', name); } catch (e) {}
  // update active button
  document.querySelectorAll('.theme-controls button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const controls = document.querySelector('.theme-controls');
  if (!controls) return;
  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-theme]');
    if (!btn) return;
    setTheme(btn.dataset.theme);
  });

  const saved = (localStorage.getItem('blog-theme')) || 'default';
  setTheme(saved);
});

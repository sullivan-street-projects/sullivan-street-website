// Vanilla port of TypewriterText.jsx. SSR markup is plain visible text:
//   <span class="italic" data-typewriter>Billion-Dollar Brands</span>
// When JS runs and motion is allowed, the element is restructured into a
// layout-holding ghost (kept in the a11y tree) plus an aria-hidden typed
// overlay — same DOM strategy as the old React component. No JS / legacy
// browsers / reduced motion ⇒ the text simply stays visible.
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup(el) {
  const text = el.textContent;
  const speed = Number(el.dataset.twSpeed || 70);
  const delay = Number(el.dataset.twDelay || 500);

  el.textContent = '';
  el.classList.add('tw');

  const ghost = document.createElement('span');
  ghost.className = 'tw-ghost';
  ghost.textContent = text;
  const spacer = document.createElement('span');
  spacer.className = 'tw-spacer';
  ghost.append(spacer);

  const live = document.createElement('span');
  live.className = 'tw-live';
  live.setAttribute('aria-hidden', 'true');
  const typed = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  live.append(typed, cursor);

  el.append(ghost, live);

  let i = 0;
  let tickTimer = null;
  let startTimer = null;

  const tick = () => {
    typed.textContent = text.slice(0, ++i);
    if (i < text.length) tickTimer = setTimeout(tick, speed);
  };

  // Types on entry, resets on exit — parity with the old IntersectionObserver.
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      cursor.classList.add('tw-cursor-on');
      startTimer = setTimeout(tick, delay);
    } else {
      clearTimeout(tickTimer);
      clearTimeout(startTimer);
      i = 0;
      typed.textContent = '';
      cursor.classList.remove('tw-cursor-on');
    }
  });
  io.observe(el);
}

if (!REDUCED) document.querySelectorAll('[data-typewriter]').forEach(setup);

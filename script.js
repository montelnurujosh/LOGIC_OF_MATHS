// --------------------------
// TOC active link on scroll
// --------------------------
const tocLinks = Array.from(document.querySelectorAll('#toc-list a'));
const posts = tocLinks.map(a => document.querySelector(a.getAttribute('href')));

function onScroll() {
  const offset = window.scrollY + 120;
  let current = null;
  for (let i = 0; i < posts.length; i++) {
    const el = posts[i];
    if (!el) continue;
    if (el.offsetTop <= offset) current = tocLinks[i];
  }
  tocLinks.forEach(l => l.classList.remove('active'));
  if (current) current.classList.add('active');
}

window.addEventListener('scroll', onScroll);

// --------------------------
// Fade-in animation delay
// --------------------------
document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.animationDelay = (i * 60) + 'ms';
});

// --------------------------
// Smooth anchor scrolling with sticky nav offset
// --------------------------
function scrollToTarget(target) {
  const navHeight = document.querySelector('header').offsetHeight;
  const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
  window.scrollTo({ top: targetPos, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '#home') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      scrollToTarget(target);
      history.replaceState(null, null, href);
    }
  });
});

// --------------------------
// Handle page load & back/forward (Math Legends + TOC fix)
// --------------------------
function handleHashOnLoad() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (target) {
    setTimeout(() => {
      scrollToTarget(target);
      tocLinks.forEach(l => l.classList.remove('active'));
      const activeLink = tocLinks.find(a => a.getAttribute('href') === hash);
      if (activeLink) activeLink.classList.add('active');
    }, 50);
  }
}

window.addEventListener('pageshow', handleHashOnLoad);
window.addEventListener('popstate', handleHashOnLoad);

// --------------------------
// Formspree submission + redirect
// --------------------------
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        window.location.href = 'https://logic-of-maths.netlify.app/thank-you.html';
      } else {
        alert('Form submission error');
      }
    } catch (err) {
      console.error(err);
      alert('Form submission failed');
    }
  });
}

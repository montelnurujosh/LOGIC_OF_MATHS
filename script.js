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
// Smooth anchor scrolling
// --------------------------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '#home') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, null, href);
  });
});

// --------------------------
// Formspree submission + redirect
// --------------------------
const form = document.querySelector('.contact-form'); // make sure your form has class="contact-form"

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // prevent default submit
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // redirect manually
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

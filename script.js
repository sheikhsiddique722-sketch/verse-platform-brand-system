// Progress bar
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
}, { passive: true });

// Live clock
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m} GMT`;
}
updateClock();
setInterval(updateClock, 30000);

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Quote reader
const quotes = [
  {
    q: '"I used to believe a photograph was a record of a moment. Now I think it is mostly a record of <em>waiting.</em>"',
    a: 'Hiroko Sano — Conversation, p. 092'
  },
  {
    q: '"The most expensive thing in any room is the thing the architect <em>chose not to add.</em>"',
    a: 'Marco Vallieri — An architecture of pauses, p. 118'
  },
  {
    q: '"I have twelve pieces of clothing. I have never been late, and I have never been <em>uncertain</em> in a mirror."',
    a: 'Lola Tanaka-Vermeer — On an annual wardrobe, p. 146'
  },
  {
    q: '"Slow reading is not a method. It is a kind of <em>respect,</em> and respect cannot be taught quickly."',
    a: "Anya Halberstam — Editor's note, p. 004"
  }
];

const quoteEl = document.getElementById('readerQuote');
const attrEl = document.getElementById('readerAttribution');
const dots = document.querySelectorAll('.reader-dot');
let currentQuote = 0;

function setQuote(i) {
  if (i === currentQuote) return;
  quoteEl.classList.add('fading');
  setTimeout(() => {
    quoteEl.innerHTML = quotes[i].q;
    attrEl.textContent = quotes[i].a;
    quoteEl.classList.remove('fading');
    dots.forEach((d, j) => d.classList.toggle('active', j === i));
    currentQuote = i;
  }, 350);
}

dots.forEach(d => {
  d.addEventListener('click', () => setQuote(parseInt(d.dataset.i)));
});

// Auto-rotate quotes
setInterval(() => {
  setQuote((currentQuote + 1) % quotes.length);
}, 7500);

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.querySelector('.sr-only').textContent = isOpen ? '메뉴 열기' : '메뉴 닫기';
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
    navigation.classList.remove('is-open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation?.classList.contains('is-open')) {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.sr-only').textContent = '메뉴 열기';
    navigation.classList.remove('is-open');
    menuButton?.focus();
  }
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigation?.querySelectorAll('a').forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55%', threshold: 0 }
  );

  document.querySelectorAll('section[id]').forEach((section) => navObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelector('[data-back-to-top]')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#top`);
});

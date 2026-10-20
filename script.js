const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navigationLinks = [...document.querySelectorAll('.site-nav a')];

function closeMenu() {
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});

navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navigationLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${visibleSection.target.id}`);
    });
  },
  { rootMargin: '-30% 0px -55% 0px', threshold: [0.01, 0.25, 0.5] }
);

sections.forEach((section) => sectionObserver.observe(section));

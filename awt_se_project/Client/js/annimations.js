/* =========================================================
   SkillSync – Premium Scroll Animations
   Pure Intersection Observer – no libraries
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HERO ENTRANCE ----------
  const heroImages = document.querySelectorAll('.float');
  const heroContent = document.querySelector('.hero-content');

  // Small delay so the page feels settled
  setTimeout(() => {
    heroImages.forEach(img => img.classList.add('entered'));
    if (heroContent) heroContent.classList.add('entered');

    // Start continuous floating after entrance
    setTimeout(() => {
      heroImages.forEach(img => img.classList.add('floating'));
    }, 1400);
  }, 80);


  // ---------- SCROLL REVEAL ----------
  const revealElements = document.querySelectorAll('[data-reveal]');

  // Auto-stagger cards inside grids
  document.querySelectorAll('.skills-grid, .about-grid, .cards, .steps-container, .faq-list')
    .forEach(grid => {
      const items = grid.querySelectorAll('[data-reveal]');
      items.forEach((el, i) => {
        el.style.setProperty('--stagger', `${i * 0.08}s`);
      });
    });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.2,               // 20% visible
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));



  // ---------- REDUCED MOTION SAFETY ----------
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroImages.forEach(img => {
      img.classList.add('entered', 'floating');
      img.style.animation = 'none';
    });
    if (heroContent) heroContent.classList.add('entered');
    revealElements.forEach(el => el.classList.add('in-view'));
  }
});
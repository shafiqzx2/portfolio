(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const current = saved || 'light';
  if(current === 'light'){ root.setAttribute('data-theme','light'); }
  else { root.removeAttribute('data-theme'); }

  const btn = document.getElementById('themeToggle');
  const setLabel = () => { if(!btn) return; btn.textContent = root.getAttribute('data-theme') === 'light' ? 'Light/Dark' : 'Dark/Light'; };
  setLabel();

  document.addEventListener('click', (e)=>{
    if(e.target && e.target.id === 'themeToggle'){
      const isLight = root.getAttribute('data-theme') === 'light';
      if(isLight){ root.removeAttribute('data-theme'); localStorage.setItem('theme','dark'); }
      else { root.setAttribute('data-theme','light'); localStorage.setItem('theme','light'); }
      setLabel();
    }
  });
})();

(function(){
  const el = document.getElementById('contactForm');
  if(!el) return;
  el.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thanks! Your message has been noted.');
    this.reset();
  });
})();


(function(){
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();


(function() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"][data-target]')];
  const sections = links
    .map(a => document.getElementById(a.dataset.target))
    .filter(Boolean);

  links.forEach(a => {
    a.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      nav.classList.remove('open');
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = nav.querySelector(`a[data-target="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.55, rootMargin: "-40% 0px -40% 0px" });

  sections.forEach(sec => io.observe(sec));

  const initial = location.hash.replace('#','');
  const first = initial ? nav.querySelector(`a[data-target="${initial}"]`) : links[0];
  first && first.classList.add('active');
})();

(function(){
  document.querySelectorAll('[data-toggle]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const sel = btn.getAttribute('data-toggle');
      const panel = document.querySelector(sel);
      if(!panel) return;
      const isOpen = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
})();


(function(){
  const section = document.querySelector('#contact');
  if(!section) return;

  const form  = section.querySelector('.cv4-form form');
  const btn   = section.querySelector('.cv4-form .cv4-btn');
  if(!form || !btn) return;

  const live = document.createElement('div');
  live.setAttribute('aria-live','polite');
  live.style.marginTop = '10px';
  live.style.fontWeight = '700';
  live.style.color = getComputedStyle(section).getPropertyValue('--cv4-accent1') || '#0ea5e9';
  btn.insertAdjacentElement('afterend', live);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const inputs = [...form.querySelectorAll('input[required], textarea[required]')];
    const invalid = inputs.find(i => !i.value.trim());
    if (invalid){
      invalid.focus();
      invalid.reportValidity && invalid.reportValidity();
      return;
    }
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = old;
      live.textContent = 'Thanks! Your message has been sent.';
      form.reset();
      setTimeout(()=> live.textContent = '', 3500);
    }, 800);
  });
})();

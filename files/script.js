/* VEGE-GROUT (VG3S) — Shared behavior across all pages.
   Defensive: every optional section is guarded so this one file works
   whether a given page has a hero, a process/bloom section, staggered
   grids, all of them, or none of them. */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // ---- overlay menu (present on every page) ----
  const menuToggle = document.getElementById('menuToggle');
  const overlayClose = document.getElementById('overlayClose');
  function toggleMenu(open){ body.classList.toggle('menu-open', open); }
  if(menuToggle) menuToggle.addEventListener('click', () => toggleMenu(!body.classList.contains('menu-open')));
  if(overlayClose) overlayClose.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('[data-nav-link]').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // ---- quote modal (present on every page) ----
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  function toggleModal(open){ body.classList.toggle('modal-open', open); }
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault(); toggleMenu(false); toggleModal(true);
  }));
  if(modalClose) modalClose.addEventListener('click', () => toggleModal(false));
  if(modalBackdrop) modalBackdrop.addEventListener('click', (e) => { if(e.target === modalBackdrop) toggleModal(false); });

  const quoteForm = document.getElementById('quoteForm');
  if(quoteForm){
    quoteForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('qName').value;
      const loc = document.getElementById('qLocation').value;
      const size = document.getElementById('qSize').value;
      const msg = document.getElementById('qMessage').value;
      const text = `Hi, I'm ${name}. I'd like a site assessment for a slope at ${loc}` +
                   (size ? ` (approx. ${size} m²)` : '') + (msg ? `. Notes: ${msg}` : '.');
      window.open(`https://wa.me/60123456789?text=${encodeURIComponent(text)}`, '_blank');
      toggleModal(false);
    });
  }

  // ---- authentication (dummy, front-end only — nothing runs until "Log In" is clicked) ----
  let currentUser = null; // in-memory only, resets on reload — intentional for a static demo

  const authBackdrop = document.getElementById('authBackdrop');
  const authClose = document.getElementById('authClose');
  const authTrigger = document.getElementById('authTrigger');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginError = document.getElementById('loginError');
  const signupError = document.getElementById('signupError');
  const accountWrap = document.getElementById('accountWrap');
  const accountChip = document.getElementById('accountChip');
  const accountAvatar = document.getElementById('accountAvatar');
  const accountName = document.getElementById('accountName');
  const accountEmail = document.getElementById('accountEmail');

  function toggleAuth(open){
    body.classList.toggle('auth-open', open);
    if(open && loginForm && signupForm){
      loginForm.classList.remove('hidden'); signupForm.classList.add('hidden');
      if(loginError) loginError.classList.remove('show');
      if(signupError) signupError.classList.remove('show');
    }
  }
  if(authTrigger) authTrigger.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(false); toggleAuth(true); });
  if(authClose) authClose.addEventListener('click', () => toggleAuth(false));
  if(authBackdrop) authBackdrop.addEventListener('click', (e) => { if(e.target === authBackdrop) toggleAuth(false); });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){ toggleModal(false); toggleMenu(false); toggleAuth(false); }
  });

  const toSignup = document.getElementById('toSignup');
  const toLogin = document.getElementById('toLogin');
  if(toSignup) toSignup.addEventListener('click', () => {
    loginForm.classList.add('hidden'); signupForm.classList.remove('hidden'); loginError.classList.remove('show');
  });
  if(toLogin) toLogin.addEventListener('click', () => {
    signupForm.classList.add('hidden'); loginForm.classList.remove('hidden'); signupError.classList.remove('show');
  });

  function setSignedIn(name, email){
    currentUser = { name, email };
    if(authTrigger) authTrigger.style.display = 'none';
    if(accountWrap) accountWrap.style.display = 'flex';
    if(accountChip) accountChip.style.display = 'flex';
    if(accountName) accountName.textContent = name;
    if(accountEmail) accountEmail.textContent = email;
    if(accountAvatar) accountAvatar.textContent = (name.trim().slice(0,1).toUpperCase() || '?');
    toggleAuth(false);
  }
  function setSignedOut(){
    currentUser = null;
    if(authTrigger) authTrigger.style.display = '';
    if(accountWrap){ accountWrap.style.display = 'none'; accountWrap.classList.remove('open'); }
    if(accountChip) accountChip.style.display = 'none';
  }

  if(loginForm){
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('liEmail').value.trim();
      const pass = document.getElementById('liPassword').value;
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!validEmail || pass.length < 6){ loginError.classList.add('show'); return; }
      loginError.classList.remove('show');
      setSignedIn(email.split('@')[0], email);
    });
  }
  if(signupForm){
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('suName').value.trim();
      const email = document.getElementById('suEmail').value.trim();
      const pass = document.getElementById('suPassword').value;
      const confirm = document.getElementById('suConfirm').value;
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!name || !validEmail || pass.length < 6 || pass !== confirm){ signupError.classList.add('show'); return; }
      signupError.classList.remove('show');
      setSignedIn(name, email);
    });
  }
  if(accountChip){
    accountChip.addEventListener('click', () => accountWrap.classList.toggle('open'));
    document.addEventListener('click', (e) => { if(!accountWrap.contains(e.target)) accountWrap.classList.remove('open'); });
  }
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.addEventListener('click', () => setSignedOut());

  // ---- root growth hero reveal — only on pages with #heroSection ----
  const heroSection = document.getElementById('heroSection');
  if(heroSection){
    const heroRootPaths = ['hp1','hp2','hp3','hp4','hp5','hp6'].map(id=>document.getElementById(id)).filter(Boolean);
    const heroNodes = ['hn1','hn2','hn3','hn4'].map(id=>document.getElementById(id)).filter(Boolean);
    const heroTags = ['ht1','ht2','ht3','ht4'].map(id=>document.getElementById(id)).filter(Boolean);
    const heroText = document.getElementById('heroText');
    let heroTimeouts = [];
    function playHero(){
      heroTimeouts.forEach(clearTimeout); heroTimeouts = [];
      heroRootPaths.forEach((p,i)=> heroTimeouts.push(setTimeout(()=>p.classList.add('grown'), 150 + i*110)));
      heroTimeouts.push(setTimeout(()=> heroNodes.forEach(n=>n.classList.add('grown')), 1150));
      heroTags.forEach((t,i)=> heroTimeouts.push(setTimeout(()=>t.classList.add('show'), 1300 + i*120)));
      if(heroText) heroTimeouts.push(setTimeout(()=> heroText.classList.add('in'), 500));
    }
    function resetHero(){
      heroTimeouts.forEach(clearTimeout); heroTimeouts = [];
      heroRootPaths.forEach(p=>p.classList.remove('grown'));
      heroNodes.forEach(n=>n.classList.remove('grown'));
      heroTags.forEach(t=>t.classList.remove('show'));
      if(heroText) heroText.classList.remove('in');
    }
    const heroObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting) playHero(); else resetHero(); });
    }, { threshold: 0.4 });
    heroObserver.observe(heroSection);
  }

  // ---- injection bloom — only on pages with #bloomField ----
  const bloomField = document.getElementById('bloomField');
  if(bloomField){
    const bloomDotsWrap = document.getElementById('bloomDots');
    const steps = bloomField.querySelectorAll('.step');
    let bloomBuilt = false;
    let bloomTimeouts = [];
    function buildBloomDots(){
      const w = bloomField.clientWidth, h = bloomField.clientHeight;
      const cols = 14, rows = 4;
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          const d = document.createElement('div');
          d.className = 'bloom-dot';
          const x = (c+0.5) * (w/cols), y = (r+0.5) * (h/rows);
          d.style.left = (x-2.5)+'px'; d.style.top = (y-2.5)+'px';
          d.dataset.cx = c; d.dataset.cy = r;
          bloomDotsWrap.appendChild(d);
        }
      }
    }
    function playBloom(){
      if(!bloomBuilt){ buildBloomDots(); bloomBuilt = true; }
      bloomTimeouts.forEach(clearTimeout); bloomTimeouts = [];
      const dots = bloomDotsWrap.querySelectorAll('.bloom-dot');
      const originC = 0, originR = 1.5;
      dots.forEach(d=>{
        const dist = Math.hypot(d.dataset.cx-originC, d.dataset.cy-originR);
        bloomTimeouts.push(setTimeout(()=> d.classList.add('bloomed'), dist*70));
      });
      steps.forEach((s,i)=> bloomTimeouts.push(setTimeout(()=> s.classList.add('in'), 120 + i*160)));
    }
    function resetBloom(){
      bloomTimeouts.forEach(clearTimeout); bloomTimeouts = [];
      if(bloomBuilt){ bloomDotsWrap.querySelectorAll('.bloom-dot').forEach(d=>d.classList.remove('bloomed')); }
      steps.forEach(s=>s.classList.remove('in'));
    }
    const bloomObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting) playBloom(); else resetBloom(); });
    }, { threshold: 0.35 });
    bloomObserver.observe(bloomField);
  }

  // ---- generic scroll reveal — safe on any page, including zero matches ----
  const revealEls = document.querySelectorAll('.reveal');
  if(revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('in-view');
        else entry.target.classList.remove('in-view');
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  // ---- generic staggered-grid reveal — reusable for sustainability / product /
  // case-study / team grids. Any container with [data-stagger] and children
  // matching itemSelector will stagger-fade on scroll, in both directions. ----
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const itemSelector = container.dataset.stagger || '.stagger-item';
    const items = container.querySelectorAll(itemSelector);
    if(!items.length) return;
    let timeouts = [];
    function play(){
      timeouts.forEach(clearTimeout); timeouts = [];
      items.forEach((c,i)=> timeouts.push(setTimeout(()=>c.classList.add('in'), i*130)));
    }
    function reset(){
      timeouts.forEach(clearTimeout); timeouts = [];
      items.forEach(c=>c.classList.remove('in'));
    }
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{ if(entry.isIntersecting) play(); else reset(); });
    }, { threshold: 0.25 });
    observer.observe(container);
  });
});

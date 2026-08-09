// ---------- scattered stars (every page) ----------
(function initStars(){
  const starsContainer = document.getElementById('stars');
  if(!starsContainer) return;
  const starCount = 60;
  for(let i=0;i<starCount;i++){
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random()*100 + 'vw';
    s.style.top = Math.random()*100 + 'vh';
    s.style.animationDelay = (Math.random()*4) + 's';
    starsContainer.appendChild(s);
  }
})();

// ---------- scroll reveal (every page) ----------
(function initReveal(){
  const revealEls = document.querySelectorAll('.reveal');
  if(!revealEls.length) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  revealEls.forEach(el => revealObserver.observe(el));
})();

// ---------- interactive checklist ----------
document.querySelectorAll('.check-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('checked'));
});

// ---------- flip cards ----------
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ---------- lightbox (gallery page) ----------
(function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  if(!lightbox) return;
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.frame img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  const closeBtn = document.getElementById('lightboxClose');
  if(closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
})();

// ---------- firework / confetti helpers ----------
function launchFirework(x, y){
  const colors = ['#ffcc66', '#f5dcc8', '#ffe2a3', '#ffd27a', '#f4b942'];
  const color = colors[Math.floor(Math.random()*colors.length)];

  const flash = document.createElement('div');
  flash.className = 'firework-flash';
  flash.style.left = x + 'px';
  flash.style.top = y + 'px';
  document.body.appendChild(flash);
  requestAnimationFrame(()=>{
    flash.style.transform = 'scale(14)';
    flash.style.opacity = '0';
  });
  setTimeout(()=> flash.remove(), 400);

  const particleCount = 22;
  for(let i=0;i<particleCount;i++){
    const angle = (Math.PI * 2 * i) / particleCount + Math.random()*0.3;
    const distance = 60 + Math.random()*70;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    const p = document.createElement('div');
    p.className = 'firework-particle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = color;
    p.style.color = color;
    document.body.appendChild(p);
    requestAnimationFrame(()=>{
      p.style.transform = `translate(${dx}px, ${dy + 40}px) scale(0.3)`;
      p.style.opacity = '0';
    });
    setTimeout(()=> p.remove(), 950);
  }
}

function launchFirecrackers(bursts){
  for(let i=0;i<bursts;i++){
    setTimeout(()=>{
      const x = window.innerWidth * (0.15 + Math.random()*0.7);
      const y = window.innerHeight * (0.15 + Math.random()*0.45);
      launchFirework(x, y);
    }, i * 260 + Math.random()*120);
  }
}

function burstConfetti(count, originXRange){
  const colors = ['#ffcc66', '#ffe2a3', '#f5dcc8', '#f4b942'];
  for(let i=0;i<count;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (originXRange ? originXRange() : Math.random()*100) + 'vw';
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    const duration = 2 + Math.random()*2;
    const drift = (Math.random()-0.5)*200;
    piece.style.transition = `transform ${duration}s ease-in, top ${duration}s ease-in, opacity ${duration}s ease-in`;
    document.body.appendChild(piece);
    requestAnimationFrame(()=>{
      piece.style.top = '110vh';
      piece.style.transform = `translateX(${drift}px) rotate(${Math.random()*720}deg)`;
      piece.style.opacity = '0.2';
    });
    setTimeout(()=> piece.remove(), duration*1000 + 200);
  }
}

function burstEmojis(count){
  const emojis = ['🎇','🎊','🥳','🧨','🎆'];
  for(let i=0;i<count;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece emoji-piece';
    piece.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    piece.style.left = Math.random()*100 + 'vw';
    piece.style.top = (-10 - Math.random()*20) + 'vh';
    const duration = 2.2 + Math.random()*2;
    const drift = (Math.random()-0.5)*220;
    const spin = (Math.random()-0.5)*720;
    piece.style.transition = `transform ${duration}s cubic-bezier(0.2,0.6,0.3,1), top ${duration}s ease-in, opacity ${duration}s ease-in`;
    document.body.appendChild(piece);
    requestAnimationFrame(()=>{
      piece.style.top = '110vh';
      piece.style.transform = `translateX(${drift}px) rotate(${spin}deg) scale(${0.8 + Math.random()*0.8})`;
      piece.style.opacity = '0.15';
    });
    setTimeout(()=> piece.remove(), duration*1000 + 200);
  }
}

// ---------- candle / wish ----------
(function initCandle(){
  const candleBtn = document.getElementById('candleBtn');
  if(!candleBtn) return;
  candleBtn.addEventListener('click', function(){
    document.getElementById('wishText').classList.add('show');
    this.style.display = 'none';
  });
})();

// ---------- gift boxes ----------
(function initGiftBoxes(){
  const boxes = document.querySelectorAll('.gift-box');
  if(!boxes.length) return;
  const boxReveal = document.getElementById('boxReveal');
  boxes.forEach(box => {
    box.addEventListener('click', function(){
      boxReveal.textContent = this.dataset.msg;
      boxes.forEach(b => b.classList.remove('opened'));
      this.classList.add('opened');
      const rect = this.getBoundingClientRect();
      const originVw = (rect.left / window.innerWidth) * 100;
      burstConfetti(24, () => originVw + (Math.random()*8 - 4));
    });
  });
})();

// ---------- celebrate / confetti button ----------
(function initConfettiBtn(){
  const btn = document.getElementById('confettiBtn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    burstConfetti(80);
    burstEmojis(18);
    launchFirecrackers(6);
  });
})();

// ---------- spin wheel ----------
(function initSpinWheel(){
  const wheel = document.getElementById('wheel');
  const spinBtn = document.getElementById('spinBtn');
  if(!wheel || !spinBtn) return;
  const activities = [
    "Order the dessert you never let yourself order.",
    "Text someone you've been meaning to catch up with.",
    "Take one photo today just because you feel good.",
    "Play your favorite song loud, no matter where you are.",
    "Do the thing on your list that keeps getting pushed to tomorrow.",
    "Say yes to something you'd usually overthink."
  ];
  const spinResult = document.getElementById('spinResult');
  let spinRotation = 0;
  spinBtn.addEventListener('click', function(){
    spinRotation += 1080 + Math.floor(Math.random()*360);
    wheel.style.transform = `rotate(${spinRotation}deg)`;
    setTimeout(() => {
      spinResult.textContent = activities[Math.floor(Math.random()*activities.length)];
    }, 1400);
  });
})();

// ---------- compliment generator ----------
(function initCompliments(){
  const complimentBtn = document.getElementById('complimentBtn');
  if(!complimentBtn) return;
  const compliments = [
    "You make hard weeks feel a little lighter just by being around.",
    "Your instincts are better than you give them credit for.",
    "People remember how you made them feel, not just what you said — and yours is always good.",
    "You've got a kind of steadiness that people quietly rely on.",
    "You're allowed to take today off from being 'fine' for everyone else."
  ];
  const complimentResult = document.getElementById('complimentResult');
  complimentBtn.addEventListener('click', function(){
    complimentResult.textContent = compliments[Math.floor(Math.random()*compliments.length)];
  });
})();

// ---------- cover page: slide to reveal ----------
(function initCover(){
  const seal = document.getElementById('coverSeal');
  const face = document.getElementById('coverFace');
  if(!seal || !face) return;
  seal.addEventListener('click', () => {
    seal.classList.add('hidden');
    face.classList.add('open');
  });
})();

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

// ---------- Ik Vaari Aa song: persists across every page, until the tab closes ----------
(function initSuitSuitPlayer(){
  var VIDEO_ID = "y4Ln-14NIBM"; // Ik Vaari Aa — Raabta, Arijit Singh
  var STORAGE_KEY = "suitsuit_state";
  var player, apiReady = false, gateHandled = false, saveInterval, label;

  function getState(){
    try{ return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || { started:false, time:0, muted:false }; }
    catch(e){ return { started:false, time:0, muted:false }; }
  }
  function setState(patch){
    var s = getState();
    Object.assign(s, patch);
    try{ sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }catch(e){}
    return s;
  }

  // Build the gate / hidden player / toggle once per page load.
  var gate = document.createElement('div');
  gate.id = 'suitSuitGate';
  gate.className = 'suitsuit-gate';
  gate.innerHTML = '<div><div class="suitsuit-gate-icon">🎁</div><div class="suitsuit-gate-label">Tap to enter</div></div>';

  var playerHost = document.createElement('div');
  playerHost.id = 'suitSuitPlayer';
  playerHost.className = 'suitsuit-player-hidden';

  var toggleBtn = document.createElement('button');
  toggleBtn.id = 'suitSuitToggle';
  toggleBtn.className = 'suitsuit-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle Ik Vaari Aa song');
  toggleBtn.innerHTML = '🎵 <span id="suitSuitLabel">Playing "Ik Vaari Aa" — tap to mute</span>';

  function mount(){
    document.body.appendChild(playerHost);
    document.body.appendChild(toggleBtn);
    if(!getState().started){
      document.body.appendChild(gate);
    }
  }
  if(document.body){ mount(); } else { document.addEventListener('DOMContentLoaded', mount); }

  function setLabel(unmuted){
    if(!label) label = document.getElementById('suitSuitLabel');
    if(label) label.textContent = unmuted ? 'Playing "Ik Vaari Aa" — tap to mute' : 'Muted — tap to unmute';
  }

  function startSaving(){
    if(saveInterval) clearInterval(saveInterval);
    saveInterval = setInterval(function(){
      if(player && player.getCurrentTime){
        setState({ time: player.getCurrentTime(), muted: player.isMuted() });
      }
    }, 1500);
  }

  window.addEventListener('beforeunload', function(){
    if(player && player.getCurrentTime){
      setState({ time: player.getCurrentTime(), muted: player.isMuted() });
    }
  });

  window.onYouTubeIframeAPIReady = function(){
    apiReady = true;
    player = new YT.Player('suitSuitPlayer', {
      height: '1', width: '1', videoId: VIDEO_ID,
      // Always start muted — muted autoplay is universally allowed. If this page load
      // is a continuation of a session that already began (gate already tapped on an
      // earlier page), we unmute right after playback starts.
      playerVars: { autoplay: 1, mute: 1, controls: 0, disablekb: 1, playsinline: 1 },
      events: {
        onReady: function(){
          toggleBtn.style.display = 'flex';
          var state = getState();
          if(state.started){
            if(state.time && state.time > 0) player.seekTo(state.time, true);
            player.playVideo();
            if(!state.muted){
              setTimeout(function(){ player.unMute(); player.setVolume(100); setLabel(true); }, 150);
            } else {
              setLabel(false);
            }
            startSaving();
          } else {
            player.pauseVideo();
          }
        },
        onStateChange: function(e){
          if(e.data === YT.PlayerState.PLAYING) setLabel(!player.isMuted());
          if(e.data === YT.PlayerState.ENDED){
            // Keep the mood going for as long as they're browsing the site.
            player.seekTo(0, true);
            player.playVideo();
          }
        }
      }
    });
  };

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);

  function handleGateTap(){
    if(gateHandled) return;
    gateHandled = true;
    setState({ started: true, muted: false });
    gate.classList.add('hidden');
    setTimeout(function(){ if(gate.parentNode) gate.parentNode.removeChild(gate); }, 500);
    if(apiReady && player){
      player.seekTo(getState().time || 0, true);
      player.unMute();
      player.setVolume(100);
      player.playVideo();
      setLabel(true);
      startSaving();
    }
    // If the API isn't ready yet, onReady will see started:true and take it from there.
  }

  document.addEventListener('click', function(e){
    if(e.target === gate || gate.contains(e.target)) handleGateTap();
  });

  toggleBtn.addEventListener('click', function(){
    if(!apiReady || !player) return;
    if(player.isMuted()){
      player.unMute();
      player.setVolume(100);
      setLabel(true);
      setState({ muted: false });
    } else {
      player.mute();
      setLabel(false);
      setState({ muted: true });
    }
  });
})();

// ---------- cover page: slide to reveal, now with a light-burst on tap ----------
(function initCover(){
  const seal = document.getElementById('coverSeal');
  const face = document.getElementById('coverFace');
  if(!seal || !face) return;
  seal.addEventListener('click', () => {
    const rect = seal.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if(typeof launchFirework === 'function') launchFirework(cx, cy);

    const burst = document.createElement('div');
    burst.className = 'seal-burst';
    seal.appendChild(burst);
    requestAnimationFrame(() => burst.classList.add('go'));
    setTimeout(() => burst.remove(), 900);

    seal.classList.add('hidden');
    face.classList.add('open');
  });
})();

// ---------- ambient floating embers (every page) ----------
(function initEmbers(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  function spawnEmber(){
    const e = document.createElement('div');
    e.className = 'ember';
    const size = 3 + Math.random() * 4;
    e.style.width = size + 'px';
    e.style.height = size + 'px';
    e.style.left = Math.random() * 100 + 'vw';
    const duration = 9 + Math.random() * 8;
    e.style.animationDuration = duration + 's';
    e.style.setProperty('--drift', (Math.random() * 140 - 70) + 'px');
    document.body.appendChild(e);
    e.addEventListener('animationend', () => e.remove());
  }

  function loop(){
    spawnEmber();
    setTimeout(loop, 550 + Math.random() * 500);
  }
  loop();
})();

// ---------- soft cursor sparkle trail (desktop only) ----------
(function initCursorSparkles(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(reduceMotion || !finePointer) return;

  let last = 0;
  function spark(x, y){
    const now = Date.now();
    if(now - last < 45) return;
    last = now;
    const s = document.createElement('div');
    s.className = 'cursor-spark';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = `translate(${(Math.random()-0.5)*24}px, ${10 + Math.random()*20}px) scale(0.3)`;
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 650);
  }
  document.addEventListener('mousemove', (e) => spark(e.clientX, e.clientY));
})();

// ---------- gallery frame 3D tilt (desktop only) ----------
(function initFrameTilt(){
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(reduceMotion || !finePointer) return;

  document.querySelectorAll('.frame').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(600px) rotateY(${px*10}deg) rotateX(${-py*10}deg) scale(1.03)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  });
})();

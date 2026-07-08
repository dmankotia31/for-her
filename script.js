// ---------- Screen navigation ----------
const screens = document.querySelectorAll('.screen');

function goToScreen(n){
  screens.forEach(s => {
    s.classList.toggle('active', s.dataset.screen === String(n));
  });
  window.scrollTo({top:0, behavior:'smooth'});
}

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    goToScreen(btn.dataset.next);
  });
});

// ---------- Music ----------
// Browsers block audio-with-sound from starting on page load with no
// interaction at all, so the song loads muted+autoplaying immediately,
// then the very first tap/click anywhere on the page unmutes it and makes
// sure it's playing — so it feels like it "just plays" without needing a
// dedicated sound button.
const song = document.getElementById('song');
song.volume = 0.55;

function unlockSong(){
  song.currentTime = 0; // always start from the top, no matter how long they lingered before pressing
  song.muted = false;
  song.play().catch(() => {
    // If it still can't play, try again silently on the next interaction
  });
}

document.addEventListener('click', unlockSong, { once:true });
document.addEventListener('touchstart', unlockSong, { once:true });
document.addEventListener('pointerdown', unlockSong, { once:true });

// ---------- The "No" button that can't be caught ----------
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const choiceRow = document.getElementById('choiceRow');

let origin = null; // captured on first dodge: {x, y} = button's starting center

function captureOrigin(){
  if(origin) return;
  const rect = noBtn.getBoundingClientRect();
  origin = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

function dodge(){
  captureOrigin();

  const margin = 16;
  const w = noBtn.offsetWidth || 100;
  const h = noBtn.offsetHeight || 44;

  const vw = window.visualViewport ? window.visualViewport.width : document.documentElement.clientWidth;
  const vh = window.visualViewport ? window.visualViewport.height : document.documentElement.clientHeight;

  // Scale the roam distance down on smaller screens so it can't get pushed
  // near the edge on a phone — stays visibly nearby on every screen size.
  const roam = Math.max(50, Math.min(130, Math.min(vw, vh) * 0.22));

  // Pick a spot near the origin, then clamp so it never runs off the edge of the screen
  let x = origin.x - w / 2 + (Math.random() * roam * 2 - roam);
  let y = origin.y - h / 2 + (Math.random() * roam * 2 - roam);

  x = Math.min(Math.max(x, margin), vw - w - margin);
  y = Math.min(Math.max(y, margin), vh - h - margin);

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  noBtn.style.transition = 'left .18s ease, top .18s ease';
  noBtn.style.zIndex = 20; // stays below the Yes button (z-index 40), never blocks it
}

// Desktop: run away before the cursor even reaches it — forever, no limit
noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('mousemove', dodge);

// Mobile: every tap just shifts it — never lands, no matter how many tries
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodge();
}, { passive:false });

// Safety net: even if a click ever registers, it just dodges again — Yes is the only way forward
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dodge();
});

// ---------- Yes ----------
yesBtn.addEventListener('click', () => {
  goToScreen(5);
  launchHearts();
});

// ---------- Floating hearts on the final screen ----------
function launchHearts(){
  const layer = document.getElementById('heartsLayer');
  const symbols = ['💗','💕','💖','❤️'];
  const count = 26;

  for(let i = 0; i < count; i++){
    setTimeout(() => {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
      heart.style.animationDuration = (4 + Math.random() * 3) + 's';
      heart.style.fontSize = (14 + Math.random() * 14) + 'px';
      layer.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }, i * 150);
  }
}

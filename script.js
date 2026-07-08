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

let dodging = false;
let dodgeCount = 0;
const catchThreshold = 10; // fixed — no longer random per your request

function dodge(){
  if(dodgeCount >= catchThreshold) return; // it's had enough — let her catch it

  dodging = true;
  dodgeCount++;

  const margin = 24;
  const w = noBtn.offsetWidth || 100;
  const h = noBtn.offsetHeight || 44;

  // Use the actual visible viewport (accounts for mobile browser toolbars
  // showing/hiding) so the button never ends up parked behind them.
  const vw = window.visualViewport ? window.visualViewport.width : document.documentElement.clientWidth;
  const vh = window.visualViewport ? window.visualViewport.height : document.documentElement.clientHeight;

  const maxX = Math.max(margin, vw - w - margin);
  const maxY = Math.max(margin, vh - h - margin);

  const x = margin + Math.random() * (maxX - margin);
  const y = margin + Math.random() * (maxY - margin);

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  noBtn.style.transition = 'left .18s ease, top .18s ease';
  noBtn.style.zIndex = 20; // stays below the Yes button (z-index 40), never blocks it
}

// Desktop: run away before the cursor even reaches it
noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('mousemove', dodge);

// Mobile: run away on touch, unless it's earned the right to be caught
noBtn.addEventListener('touchstart', (e) => {
  if(dodgeCount < catchThreshold){
    e.preventDefault();
    dodge();
  }
}, { passive:false });

// Once it's dodged enough times, a real click/tap lands — but it still
// doesn't take "no" for an answer, it just gently teases and moves on.
noBtn.addEventListener('click', (e) => {
  if(dodgeCount < catchThreshold){
    e.preventDefault();
    dodge();
    return;
  }
  noBtn.textContent = "nice try 🙂";
  setTimeout(() => {
    goToScreen(5);
    launchHearts();
  }, 700);
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

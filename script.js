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
const song = document.getElementById('song');
const soundToggle = document.getElementById('soundToggle');
let audioUnlocked = false;

function tryPlaySong(){
  song.volume = 0.55;
  song.play().then(() => {
    audioUnlocked = true;
    soundToggle.textContent = '🔊';
  }).catch(() => {
    // Autoplay blocked — user can tap the sound icon instead
    soundToggle.textContent = '🔈';
  });
}

document.querySelectorAll('[data-start-audio]').forEach(btn => {
  btn.addEventListener('click', tryPlaySong, { once:true });
});

soundToggle.addEventListener('click', () => {
  if(song.paused){
    tryPlaySong();
  } else {
    song.pause();
    soundToggle.textContent = '🔈';
  }
});

// ---------- The "No" button that can't be caught ----------
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const choiceRow = document.getElementById('choiceRow');

let dodging = false;

function dodge(){
  dodging = true;
  const margin = 24;
  const w = noBtn.offsetWidth || 100;
  const h = noBtn.offsetHeight || 44;

  const maxX = window.innerWidth - w - margin;
  const maxY = window.innerHeight - h - margin;

  const x = Math.max(margin, Math.random() * maxX);
  const y = Math.max(margin, Math.random() * maxY);

  noBtn.style.position = 'fixed';
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
  noBtn.style.transition = 'left .18s ease, top .18s ease';
  noBtn.style.zIndex = 30;
}

// Desktop: run away before the cursor even reaches it
noBtn.addEventListener('mouseenter', dodge);
noBtn.addEventListener('mousemove', dodge);

// Mobile: run away on the first touch attempt, so a tap never lands
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodge();
}, { passive:false });

// Safety net: even if it's ever "clicked", it never proceeds — just dodges again
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dodge();
});

// Occasionally nudge it even without interaction, so it feels alive
setInterval(() => {
  if(document.querySelector('.screen[data-screen="4"]').classList.contains('active') && dodging){
    if(Math.random() < 0.3) dodge();
  }
}, 1600);

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

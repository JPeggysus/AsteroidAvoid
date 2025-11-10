(function () {
  const container = document.getElementById('canvasContainer');
  const volumeToggleIcon = document.createElement('div');
  volumeToggleIcon.innerHTML =
    '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#volume-max-svgrepo-com"></use></svg>';
  volumeToggleIcon.title = 'Toggle Volume';
  volumeToggleIcon.id = 'volumeToggleIcon';
  Object.assign(volumeToggleIcon.style, {
    position: 'absolute',
    top: '-46px',
    left: '0',
    zIndex: '20',
    color: '#fff',
    textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform .1s ease, text-shadow .1s ease'
  });
  let audioMuted = false;
  function toggleAudio () {
    audioMuted = !audioMuted;
    if (typeof gameMusic      !== 'undefined') gameMusic.muted      = audioMuted;
    if (typeof collisionSound !== 'undefined') collisionSound.muted = audioMuted;
    if (typeof heartPathSound !== 'undefined') heartPathSound.muted = audioMuted;
    if (typeof plusOneSound   !== 'undefined') plusOneSound.muted   = audioMuted;
    if (typeof clickSound     !== 'undefined') clickSound.muted     = audioMuted;
    if (typeof countdownAudio !== 'undefined') countdownAudio.muted = audioMuted;
    if (typeof gameoverAudio  !== 'undefined') gameoverAudio.muted  = audioMuted;
    volumeToggleIcon.innerHTML = audioMuted
      ? '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#volume-xmark-svgrepo-com"></use></svg>'
      : '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#volume-max-svgrepo-com"></use></svg>';
  }
  const btnPress   = el => { el.style.transform = 'scale(.9)'; el.style.textShadow = '0 0 2px #0ff'; };
  const btnRelease = el => { el.style.transform = 'scale(1)';  el.style.textShadow = '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff'; };
  volumeToggleIcon.addEventListener('mousedown', () => btnPress(volumeToggleIcon));
  volumeToggleIcon.addEventListener('mouseup',   () => btnRelease(volumeToggleIcon));
  volumeToggleIcon.addEventListener('mouseleave',() => btnRelease(volumeToggleIcon));
  volumeToggleIcon.addEventListener('click',     () => { clickSound.play(); toggleAudio(); });
  container.appendChild(volumeToggleIcon);
  const pausePlayIcon = document.createElement('div');
  pausePlayIcon.innerHTML =
    '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#pause-button-svgrepo-com (1)"></use></svg>';
  pausePlayIcon.title = 'Pause/Play';
  pausePlayIcon.id    = 'pausePlayIcon';
  Object.assign(pausePlayIcon.style, {
    position: 'absolute',
    top: '-46px',
    left: '40px',
    zIndex: '20',
    color: '#fff',
    textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform .1s ease, text-shadow .1s ease',
    display: 'none'
  });
  pausePlayIcon.addEventListener('mousedown', () => btnPress(pausePlayIcon));
  pausePlayIcon.addEventListener('mouseup',   () => btnRelease(pausePlayIcon));
  pausePlayIcon.addEventListener('mouseleave',() => btnRelease(pausePlayIcon));
  function updatePausePlayIcon () {
    pausePlayIcon.innerHTML = window.gamePaused
      ? '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#play-svgrepo-com"></use></svg>'
      : '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#pause-button-svgrepo-com (1)"></use></svg>';
  }
  function togglePausePlay () {
    if (!window.gamePaused) { if (typeof window.pauseGame  === 'function') window.pauseGame(); }
    else                    { if (typeof window.resumeGame === 'function') window.resumeGame(); }
    updatePausePlayIcon();
  }
  pausePlayIcon.addEventListener('click', () => { clickSound.play(); togglePausePlay(); });
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' && !window.countdownActive) {
      clickSound.play();
      togglePausePlay();
      e.preventDefault();
    }
  });
  if (typeof window.showInstructions === 'function') {
    const oldShowInstr = window.showInstructions;
    window.showInstructions = function () { pausePlayIcon.style.display = 'none'; oldShowInstr.apply(this, arguments); };
  }
  if (typeof window.showGameOver === 'function') {
    const oldShowOver = window.showGameOver;
    window.showGameOver = function () { pausePlayIcon.style.display = 'none'; oldShowOver.apply(this, arguments); };
  }
  if (typeof window.startGame === 'function') {
    const oldStartGame = window.startGame;
    window.startGame = function () { oldStartGame.apply(this, arguments); pausePlayIcon.style.display = 'block'; updatePausePlayIcon(); };
  }
  container.appendChild(pausePlayIcon);
  const replayIcon = document.createElement('div');
  replayIcon.innerHTML =
    '<svg class="icon" width="28" height="28" fill="currentColor"><use xlink:href="#icons8-refresh"></use></svg>';
  replayIcon.title = 'Restart';
  replayIcon.id    = 'replayIcon';
  Object.assign(replayIcon.style, {
    position: 'absolute',
    top: '-46px',
    left: '80px',
    zIndex: '20',
    color: '#fff',
    textShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'transform .1s ease, text-shadow .1s ease',
    display: 'none'
  });
  replayIcon.addEventListener('mousedown', () => btnPress(replayIcon));
  replayIcon.addEventListener('mouseup',   () => btnRelease(replayIcon));
  replayIcon.addEventListener('mouseleave',() => btnRelease(replayIcon));
  replayIcon.addEventListener('click', () => {
    clickSound.play();
    if (!window.countdownActive) {
      if (typeof window.endCurrentGame === 'function') window.endCurrentGame();
      window.startCountdown();
    }
  });
  if (typeof window.showInstructions === 'function') {
    const oldShowInstr2 = window.showInstructions;
    window.showInstructions = function () { replayIcon.style.display = 'none'; oldShowInstr2.apply(this, arguments); };
  }
  if (typeof window.showGameOver === 'function') {
    const oldShowOver2 = window.showGameOver;
    window.showGameOver = function () { replayIcon.style.display = 'none'; oldShowOver2.apply(this, arguments); };
  }
  if (typeof window.startGame === 'function') {
    const oldStartGame2 = window.startGame;
    window.startGame = function () { oldStartGame2.apply(this, arguments); replayIcon.style.display = 'block'; };
  }
  container.appendChild(replayIcon);
})();

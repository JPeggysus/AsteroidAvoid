(function () {
  window.countdownActive = false;
  const container        = document.getElementById('canvasContainer');
  const countdownOverlay = document.createElement('div');
  countdownOverlay.id    = 'countdownOverlay';
  countdownOverlay.classList.add('overlay');
  countdownOverlay.style.display   = 'none';
  countdownOverlay.style.fontSize  = '72px';
  countdownOverlay.style.fontFamily= 'Digital80s, Arial, sans-serif';
  container.appendChild(countdownOverlay);
  window.countdownAudio = new Audio('assets/countdown.wav');
  window.startCountdown = function () {
    window.countdownActive = true;
    let count = 3;
    window.countdownAudio.currentTime = 0;
    window.countdownAudio.play();
    countdownOverlay.style.display = 'flex';
    countdownOverlay.textContent  = count;
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownOverlay.textContent = count;
      } else if (count === 0) {
        countdownOverlay.textContent = 'Go!';
      } else {
        clearInterval(countdownInterval);
        window.countdownAudio.pause();
        window.countdownAudio.currentTime = 0;
        countdownOverlay.style.display = 'none';
        window.countdownActive = false;

        function waitForModelAndStart() {
          if (window.botAgent && !window.botAgent.isWarmingUp) {
            if (typeof window.startGame === 'function') window.startGame();
          } else {
            setTimeout(waitForModelAndStart, 100);
          }
        }
        waitForModelAndStart();
      }
    }, 1000);
  };
})();

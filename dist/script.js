// 01. 自動更新頁尾年份
document.querySelector('#current-year').textContent = new Date().getFullYear();

// 06. 同一時間只播放一段影片，避免多段聲音重疊。
document.querySelectorAll('video').forEach((player) => {
  player.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});

// 07. 入場動畫：只播放一次；不預先隱藏內容，JS 不支援時仍可正常閱讀。
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const runningAnimations = new Set();

function revealElement(element, delay = 0) {
  if (motionPreference.matches || !element.animate) return;
  const animation = element.animate(
    [
      { opacity: 0, translate: '0 18px' },
      { opacity: 1, translate: '0 0' }
    ],
    { duration: 700, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
  );
  runningAnimations.add(animation);
  animation.finished.then(
    () => runningAnimations.delete(animation),
    () => runningAnimations.delete(animation)
  );
}

// 首頁文字依次出現。
document.querySelectorAll('.hero-copy > .eyebrow, .hero-copy h1, .hero-description, .hero-buttons')
  .forEach((element, index) => revealElement(element, index * 90));

// 進入畫面才播放，避免對長頁面綁定持續執行的 scroll 事件。
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains('showcase')) {
        entry.target.classList.add('is-in-view');
      } else {
        revealElement(entry.target);
      }
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.showcase, .media-item, .contact-section > .page-width')
    .forEach((element) => revealObserver.observe(element));
}

// 使用者即時開啟「減少動態效果」時，停止未完成的動畫。
motionPreference.addEventListener('change', (event) => {
  if (event.matches) runningAnimations.forEach((animation) => animation.cancel());
});

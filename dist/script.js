// 01. 頁面元素
const video = document.querySelector('#main-video');
const fileInput = document.querySelector('#video-file');
const statusMessage = document.querySelector('#video-status');
let previewUrl = null;

document.querySelector('#current-year').textContent = new Date().getFullYear();

// 03. 本機影片預覽：不會上傳；重新整理頁面後恢復示範影片
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('video/')) {
    statusMessage.textContent = 'Please choose a video file, such as MP4 or WebM.';
    return;
  }
  video.pause();
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  video.src = previewUrl;
  video.load();
  statusMessage.textContent = `Local preview: ${file.name}. Press play to watch.`;
});

function showVideoError() {
  statusMessage.textContent = 'Video unavailable. Check your connection or choose a local H.264 MP4 video.';
}
video.addEventListener('error', showVideoError);
video.querySelector('source').addEventListener('error', showVideoError);

// 06. 同一時間只播放一段影片，避免多段聲音重疊。
document.querySelectorAll('video').forEach((player) => {
  player.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});

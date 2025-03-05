/* eslint-disable no-undef */
pauseBtn.addEventListener("click", function () {
  chrome.tts.pause();
});

resumeBtn.addEventListener("click", function () {
  chrome.tts.resume();
});

stopBtn.addEventListener("click", function () {
  chrome.tts.stop();
});

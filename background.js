/* eslint-disable no-undef */

let chunks = [];
let chunkIndex = 0;
let isPaused = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "speakText",
    title: "Speechify",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "speakText" && info.selectionText) {
    startSpeech(info.selectionText);
  }
});

function splitText(text, maxLength = 200) {
  return text.match(new RegExp(`.{1,${maxLength}}(\\s|$)`, "g")) || [];
}

function startSpeech(text) {
  chunks = splitText(text); 
  
  chunkIndex = 0;
  isPaused = false;
  speakNextChunk();
}

function speakNextChunk() {
  if (chunkIndex >= chunks.length) return;

  chrome.tts.speak(chunks[chunkIndex], {
    voiceName: "Google UK English Female",
    rate: 1.0,
    pitch: 1.1,
    lang: "en-GB",
    onEvent: (event) => {
      if (event.type === "end" && !isPaused) {
        chunkIndex++;
        speakNextChunk();
      }
    },
  });
}

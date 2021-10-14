// background.js

let color = '#3aa757';
let zap_rate = 50
let enabled = false

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ zap_rate })
  chrome.storage.sync.set({ enabled })
  console.log('Default background color set to %cgreen', `color: ${color}`);
});
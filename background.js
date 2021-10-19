
let color = '#3aa757';
let zap_rate = 50
let enabled = false

console.log("Background script loaded")
zapInterval = setInterval(()=>{}, 1000)


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ zap_rate })
  chrome.storage.sync.set({ enabled })
});

async function zapRandom(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: zapRandomInternal,
  });
}

function zapRandomInternal(){
    let elems = document.body.getElementsByTagName("*");
    elem = elems[Math.floor(Math.random()*elems.length)]
    elem.style.display = "none"
}

zap_fun = async function() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(tab)
  if(!tab.url.includes("chrome://")){
    console.log(tab)
    zapRandom(tab)
  }
  chrome.storage.sync.get("zap_rate", ({zap_rate})=>{
    setTimeout(zap_fun, zap_rate)
  })
}

chrome.storage.sync.get("zap_rate", ({zap_rate})=>{
  setTimeout(zap_fun, zap_rate)
})


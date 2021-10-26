
let color = '#3aa757';
let zap_rate = 500
let enabled = false

console.log("Background script loaded")


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
    if(elems.length == 0) return
    elem = elems[Math.floor(Math.random()*elems.length)]
    // elem.style.display = "none"
    elem.remove()
}

zap_fun = async function() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.storage.sync.get("enabled", ({enabled}) => {
    if(enabled && !tab.url.includes("chrome://") && !tab.url.includes("chrome.google.com")){
      try{
        zapRandom(tab)
      }
      catch (err){}
    }
  })
  chrome.storage.sync.get("zap_rate", ({zap_rate})=>{
    // console.log(zap_rate)
    setTimeout(zap_fun, zap_rate)
  })
}

chrome.storage.sync.get("zap_rate", ({zap_rate})=>{
  setTimeout(zap_fun, zap_rate)
})


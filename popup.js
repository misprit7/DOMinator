

var enableToggle = document.getElementById("enableToggle")
var slider = document.getElementById("freqRange");
var freqOutput = document.getElementById("freqOutput");
var zapButton = document.getElementById("zapButton")



// Shouldn't copy paste but cannot for the life of me figure out how to share these
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


chrome.storage.sync.get("enabled", ({enabled}) => {
  enableToggle.checked = enabled
})

chrome.storage.sync.get("zap_rate", ({zap_rate}) => {
  slider.value = 1000 / zap_rate
  freqOutput.innerHTML = 1000 / zap_rate + " Zaps/sec"
})
console.log(chrome.storage.sync.get("zap_rate"))


//Enable toggle
enableToggle.onchange = function() {
  // freqOutput.innerHTML = this.checked;
  chrome.storage.sync.set({"enabled": this.checked})
}

// Zap rate slider
slider.onchange = function() {
  freqOutput.innerHTML = this.value + " Zaps/sec";
  console.log("set")
  chrome.storage.sync.set({"zap_rate": 1000 / parseInt(this.value)})
} 

//Zap once
zapButton.onclick = async function() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(!tab.url.includes("chrome://") && !tab.url.includes("chrome.google.com")){
    zapRandom(tab)
  }
}


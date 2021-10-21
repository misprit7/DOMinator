

var enableToggle = document.getElementById("enableToggle")
var slider = document.getElementById("freqRange");
var freqOutput = document.getElementById("freqOutput");
var zapButton = document.getElementById("zapButton")

var freq = 50


// Shouldn't copy paste but cannot for the life of me figure out how to share these
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


chrome.storage.sync.get("enabled", ({enabled}) => {
  enableToggle.checked = enabled
  if (enabled){
    startRandom()
  }
})

chrome.storage.sync.get("zap_rate", ({zap_rate}) => {
  slider.value = zap_rate
  freqOutput.innerHTML = zap_rate
  freq = zap_rate
})
console.log(chrome.storage.sync.get("zap_rate"))


//Enable toggle
enableToggle.onchange = function() {
  // freqOutput.innerHTML = this.checked;
  chrome.storage.sync.set({"enabled": this.checked})
}

// Zap rate slider
slider.oninput = function() {
  freqOutput.innerHTML = this.value;
  chrome.storage.sync.set({"zap_rate": parseInt(this.value)})
} 

//Zap once
zapButton.onclick = async function() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  zapRandom(tab)
}


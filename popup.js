

var enableToggle = document.getElementById("enableToggle")
var slider = document.getElementById("freqRange");
var freqOutput = document.getElementById("freqOutput");
var zapButton = document.getElementById("zapButton")

var freq = 50



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


enableToggle.onchange = function() {
  // freqOutput.innerHTML = this.checked;
  chrome.storage.sync.set({"enabled": this.checked})
  if(this.checked){
    startRandom()
  }
}

async function startRandom(){
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  zapRandomRepeated(tab, slider.value)
}

slider.oninput = function() {
  freqOutput.innerHTML = this.value;
  chrome.storage.sync.set({"zap_rate": parseInt(this.value)})
} 

zapButton.onclick = async function() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  zapRandom(tab)
}


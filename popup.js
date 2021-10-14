
var enableToggle = document.getElementById("enableToggle")
var slider = document.getElementById("freqRange");
var freqOutput = document.getElementById("freqOutput");
var zapButton = document.getElementById("zapButton")

chrome.storage.sync.get("enabled", ({enabled}) => {
  enableToggle.checked = enabled
})
chrome.storage.sync.get("zap_rate", ({zap_rate}) => {
  slider.value = zap_rate
  freqOutput.innerHTML = zap_rate
})
console.log(chrome.storage.sync.get("zap_rate"))


enableToggle.onchange = function() {
  // freqOutput.innerHTML = this.checked;
  chrome.storage.sync.set({"enabled": this.checked})
  if(this.checked){
    setInterval(function() {
        zapRandom()
    }, slider.value);
  }
}

slider.oninput = function() {
  freqOutput.innerHTML = this.value;
  chrome.storage.sync.set({"zap_rate": this.value})
} 

zapButton.onclick = function() {
  zapRandom()
}


async function zapRandom() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      let elems = document.body.getElementsByTagName("*");
      elem = elems[Math.floor(Math.random()*elems.length)]
      elem.style.display = "none"
      console.log("zap")
    },
  });
}
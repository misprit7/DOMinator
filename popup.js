// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: setPageBackgroundColor,
//   });
// });

// // The body of this function will be executed as a content script inside the
// // current page
// function setPageBackgroundColor() {
//   chrome.storage.sync.get("color", ({ color }) => {
//     document.body.style.backgroundColor = color;
//   });
// }

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
}

// Update the current slider value (each time you drag the slider handle)
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

async function zapRandomRepeated(tab){
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      chrome.storage.sync.get("zap_rate", (zap_rate)=>{
        setInterval(function() {
            zapRandomInternal()
        }, zap_rate);
      });
    },
  });
}

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
    console.log("zap")

}

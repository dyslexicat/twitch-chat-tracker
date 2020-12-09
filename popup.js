let inputText = document.getElementById("searchword");
let formElement = document.querySelector("form");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  sendWord(inputText.value);
});

function sendWord(searchWord) {
    let params = {
        active: true,
        currentWindow: true
    }

  chrome.tabs.query(params, gotTabs);

  function gotTabs(tabs) {
    let msg = { searchWord: searchWord };
    chrome.tabs.sendMessage(tabs[0].id, msg);
  }
}

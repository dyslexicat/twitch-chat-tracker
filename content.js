console.log("we are working");
var targetNode;
var url = location.href;
var twitch_observer;

// twitch has different CSS classes for VODs and livestreams
// get the targetNode depending on VOD or livestream
observeChat();

chrome.runtime.onMessage.addListener(gotMessage);

// enter a word to track from the popup
function gotMessage(message, sender, sendResponse) {
  searchWord = message.searchWord;
  if (!targetNode) {
    return;
  }

  if (twitch_observer) {
    // remove the previous observer
    twitch_observer.disconnect();
    twitch_observer = targetExists(searchWord);
  } else {
    twitch_observer = targetExists(searchWord);
  }

  twitch_observer.observe(targetNode, { childList: true });
}

function observeChat() {
  var observer = new MutationObserver(function (_, me) {
    url.includes("videos")
      ? (targetNode = document.querySelector(
          ".video-chat__message-list-wrapper > div > ul"
        ))
      : (targetNode = document.querySelector(
          ".chat-scrollable-area__message-container"
        ));

    if (targetNode) {
      console.log("target exists");
      me.disconnect();
      return;
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

function targetExists(searchWord) {
  var re = new RegExp(searchWord, "g");
  var twitch_observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // assume there is only one node added at each mutation;
      const addedNode = mutation.addedNodes[0];
      if (addedNode) {
        const textSpan = addedNode.querySelector(".message");
        if (textSpan) {
          const text = textSpan.innerText.trim();
          if (text.length > 0 && text.match(re)) {
            console.log(text);
          }
        }
      }
    });
  });

  return twitch_observer;
}

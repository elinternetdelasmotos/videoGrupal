chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlMatches: 'twitch.tv|youtube.com'},
        }),
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function ordena_a_youtube (accion){
    var youtube_tab = parseInt(localStorage.getItem('youtube_tab'));
    chrome.tabs.sendMessage(youtube_tab, {greeting: accion});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
        ordena_a_youtube(request.greeting["texto"]);
  }
);

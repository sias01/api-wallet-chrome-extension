console.log("Service worker is running...");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPlatform") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const url = new URL(tabs[0].url);
        sendResponse({ platform: url.hostname });
      }
    });
    return true;
  }
});

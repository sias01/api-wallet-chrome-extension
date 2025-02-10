// Import the chrome namespace.  This is necessary because the code uses chrome APIs without explicitly importing them.
// In a more complex project, you would likely use a more structured import mechanism.
const chrome = chrome

chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Remove automatic API detection to prevent unwanted data
    // Only store APIs that are explicitly added through the popup
  },
  { urls: ["<all_urls>"] },
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPlatform") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const url = new URL(tabs[0].url)
        sendResponse({ platform: url.hostname })
      }
    })
    return true
  }
})


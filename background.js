chrome.runtime.onInstalled.addListener(() => {
  console.log("API Wallet extension installed.")
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getPlatform") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const url = new URL(tabs[0].url)
        sendResponse({ platform: url.hostname })
      } else {
        sendResponse({ platform: "Unknown" })
      }
    })
    return true // Keeps the message channel open for async response
  }
})


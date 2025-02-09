chrome.webRequest.onCompleted.addListener(
    (details) => {
      const url = new URL(details.url);
      const platform = url.hostname;
  
      // Check if the request contains API-like keywords
      if (details.url.includes("/api/") || details.url.includes("v1") || details.url.includes(".json")) {
        chrome.storage.sync.get("apiData", (data) => {
          const apiData = data.apiData || {};
          apiData[platform] = details.url;
          chrome.storage.sync.set({ apiData });
        });
      }
    },
    { urls: ["<all_urls>"] }
  );
  
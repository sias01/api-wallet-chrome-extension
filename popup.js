document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage({ action: "getPlatform" }, function (response) {
      if (response && response.platform) {
        document.getElementById("platform").value = response.platform;
      }
    });
    loadApiList();
  });
  
  document.getElementById("addApi").addEventListener("click", function () {
    const platform = document.getElementById("platform").value;
    const apiKey = document.getElementById("apiKey").value;
    if (platform && apiKey) {
      chrome.storage.sync.get("apiData", (data) => {
        const apiData = data.apiData || {};
        apiData[platform] = apiKey;
        chrome.storage.sync.set({ apiData }, loadApiList);
      });
    }
  });
  
  function loadApiList() {
    chrome.storage.sync.get("apiData", (data) => {
      const apiList = document.getElementById("apiList");
      apiList.innerHTML = "";
      print(data);
      for (let platform in data.apiData) {
        const li = document.createElement("li");
        li.textContent = `${platform}: ${data.apiData[platform]}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
          deleteApi(platform);
        };
        li.appendChild(deleteBtn);
        apiList.appendChild(li);
      }
    });
  }
  
  function deleteApi(platform) {
    chrome.storage.sync.get("apiData", (data) => {
      delete data.apiData[platform];
      chrome.storage.sync.set({ apiData: data.apiData }, loadApiList);
    });
  }
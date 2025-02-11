document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getPlatform" }, (response) => {
    if (response?.platform) {
      document.getElementById("platform").value = response.platform;
    }
  });

  loadApiList();
});

document.getElementById("addApi").addEventListener("click", () => {
  const platform = document.getElementById("platform").value.trim();
  const apiKey = document.getElementById("apiKey").value.trim();

  if (!platform || !apiKey) {
    alert("Platform and API key cannot be empty.");
    return;
  }

  chrome.storage.sync.get("apiData", (data) => {
    const apiData = data.apiData || {};

    if (apiData[platform]) {
      const confirmed = confirm(`Update existing API key for ${platform}?`);
      if (!confirmed) return;
    }

    apiData[platform] = apiKey;
    chrome.storage.sync.set({ apiData }, () => {
      if (chrome.runtime.lastError) {
        alert("Error saving API key. Try a shorter key.");
      } else {
        loadApiList();
        document.getElementById("apiKey").value = "";
      }
    });
  });
});

function loadApiList() {
  chrome.storage.sync.get("apiData", (data) => {
    const apiList = document.getElementById("apiList");
    apiList.innerHTML = "";

    if (data.apiData && Object.keys(data.apiData).length > 0) {
      Object.entries(data.apiData).forEach(([platform, apiKey]) => {
        const li = document.createElement("li");

        const maskedKey = apiKey.length > 8
          ? apiKey.substring(0, 4) + "..." + apiKey.slice(-4)
          : "*".repeat(apiKey.length);

        li.textContent = `${platform}: ${maskedKey}`;
        li.addEventListener("click", () => showApiModal(apiKey));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " &#128465 Delete";
        deleteBtn.innerHTML = " &#128465; Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = (event) => {
          event.stopPropagation();
          deleteApi(platform);
        };

        li.appendChild(deleteBtn);
        apiList.appendChild(li);
      });
    } else {
      apiList.innerHTML = "<li>No saved APIs.</li>";
    }
  });
}

function showApiModal(apiKey) {
  document.getElementById("fullApiKey").textContent = apiKey;
  document.getElementById("apiModal").style.display = "block";
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("apiModal").style.display = "none";
});

document.getElementById("copyApiKey").addEventListener("click", () => {
  const apiKey = document.getElementById("fullApiKey").textContent;
  navigator.clipboard.writeText(apiKey).then(() => {
    alert("Copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy.");
  });
});

function deleteApi(platform) {
  chrome.storage.sync.get("apiData", (data) => {
    if (data.apiData && data.apiData[platform]) {
      delete data.apiData[platform];
      chrome.storage.sync.set({ apiData: data.apiData }, () => loadApiList());
    }
  });
}

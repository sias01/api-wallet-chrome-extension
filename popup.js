document.addEventListener("DOMContentLoaded", () => {
  // Get the active tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const url = new URL(tabs[0].url)
      const platform = url.hostname
      document.getElementById("platform").value = platform
    }
  })

  loadApiList()
})

document.getElementById("addApi").addEventListener("click", () => {
  const platform = document.getElementById("platform").value
  const apiKey = document.getElementById("apiKey").value

  if (platform && apiKey) {
    // First get existing data
    chrome.storage.sync.get("apiData", (data) => {
      try {
        const apiData = data.apiData || {}

        // Check if we're updating an existing entry
        if (apiData[platform]) {
          const confirmed = confirm(`Update existing API key for ${platform}?`)
          if (!confirmed) return
        }

        // Update or add new entry
        apiData[platform] = apiKey

        // Store data with error handling
        chrome.storage.sync.set({ apiData }, () => {
          if (chrome.runtime.lastError) {
            console.error("Storage error:", chrome.runtime.lastError)
            alert("Error saving API key. Please try a shorter key.")
          } else {
            loadApiList()
            document.getElementById("apiKey").value = "" // Clear input after successful save
          }
        })
      } catch (error) {
        console.error("Error processing data:", error)
        alert("Error processing data. Please try again.")
      }
    })
  }
})

function loadApiList() {
  chrome.storage.sync.get("apiData", (data) => {
    try {
      const apiList = document.getElementById("apiList")
      apiList.innerHTML = ""

      // Show all saved API keys
      if (data.apiData && Object.keys(data.apiData).length > 0) {
        Object.entries(data.apiData).forEach(([platform, apiKey]) => {
          const li = document.createElement("li")
          // Mask the API key for security
          const maskedKey = apiKey.substring(0, 4) + "..." + apiKey.slice(-4)
          li.textContent = `${platform}: ${maskedKey}`

          const deleteBtn = document.createElement("button")
          deleteBtn.textContent = "Delete"
          deleteBtn.onclick = () => {
            deleteApi(platform)
          }

          li.appendChild(deleteBtn)
          apiList.appendChild(li)
        })
      }
    } catch (error) {
      console.error("Error loading API list:", error)
      const apiList = document.getElementById("apiList")
      apiList.innerHTML = ""
    }
  })
}

function deleteApi(platform) {
  chrome.storage.sync.get("apiData", (data) => {
    if (data.apiData && data.apiData[platform]) {
      delete data.apiData[platform]
      chrome.storage.sync.set({ apiData: data.apiData }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error deleting API key:", chrome.runtime.lastError)
          alert("Error deleting API key. Please try again.")
        } else {
          loadApiList()
        }
      })
    }
  })
}


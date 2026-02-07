let currentContext = null;
const iframe = document.getElementById("content-frame");
const loading = document.getElementById("loading");

async function updateContext() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (!tab || !tab.url) return;

    const newContext = tab.url.includes("instagram.com")
      ? "instagram"
      : "dashboard";

    if (currentContext !== newContext) {
      currentContext = newContext;
      const targetUrl =
        newContext === "instagram"
          ? "http://localhost:3000/apps/instagram"
          : "http://localhost:3000/dashboard";

      loading.style.display = "flex";
      loading.innerText =
        newContext === "instagram"
          ? "Loading Instagram Manager..."
          : "Loading Dashboard...";
      iframe.style.display = "none";
      iframe.src = targetUrl;
    }
  } catch (error) {
    console.error("Error updating context:", error);
  }
}

// Global iframe load handler
iframe.onload = () => {
  loading.style.display = "none";
  iframe.style.display = "block";
};

// Listen for tab updates (URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    updateContext();
  }
});

// Listen for tab activation (switching tabs)
chrome.tabs.onActivated.addListener(() => {
  updateContext();
});

// Initial check when the side panel is opened
updateContext();

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
          ? "https://socialvault.zallyy.com/apps/instagram"
          : "https://socialvault.zallyy.com/dashboard";

      loading.style.display = "flex";
      loading.innerText =
        newContext === "instagram"
          ? "Loading Instagram Manager..."
          : "Loading Dashboard...";
      iframe.style.display = "none";
      iframe.src = targetUrl;
    }
  } catch {
    // Error handling
  }
}

// Global iframe load handler
iframe.onload = () => {
  loading.style.display = "none";
  iframe.style.display = "block";
};

// ... listener
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
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

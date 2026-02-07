// Set side panel behavior to open on extension icon click
// This is a global setting
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// We no longer handle contextual switching here to avoid reloading the iframe on every tab switch.
// The sidepanel.js now handles context switching internally when needed.

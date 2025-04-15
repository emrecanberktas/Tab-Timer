chrome.runtime.sendMessage(
  { action: "getTabTime", tabId: chrome.runtime.id },
  (response) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tab-timer-tooltip";
    tooltip.textContent = `Bu sekme ${formatTime(response.time)} açık`;
    document.body.appendChild(tooltip);

    function formatTime(ms: number) {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      return `${hours}s ${minutes % 60}dk ${seconds % 60}s`;
    }
  }
);

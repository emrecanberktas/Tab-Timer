document.addEventListener("DOMContentLoaded", function () {
  const timerElement = document.getElementById("timer");

  function updateTimer() {
    chrome.runtime.sendMessage({ action: "getTabTime" }, function (response) {
      if (response && response.time) {
        timerElement.textContent = formatTime(response.time);
      }
    });
  }

  function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}min ${seconds % 60}s`;
  }

  // Update timer immediately and then every second
  updateTimer();
  setInterval(updateTimer, 1000);
});

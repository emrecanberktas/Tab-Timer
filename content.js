chrome.runtime.sendMessage({ action: "getTabTime", tabId: chrome.runtime.id }, function (response) {
    var tooltip = document.createElement("div");
    tooltip.className = "tab-timer-tooltip";
    tooltip.textContent = "Bu sekme ".concat(formatTime(response.time), " a\u00E7\u0131k");
    document.body.appendChild(tooltip);
    function formatTime(ms) {
        var seconds = Math.floor(ms / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        return "".concat(hours, "s ").concat(minutes % 60, "dk ").concat(seconds % 60, "s");
    }
});

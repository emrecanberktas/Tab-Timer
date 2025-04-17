// chrome.runtime.sendMessage(
//   { action: "getTabTime", tabId: chrome.runtime.id },
//   function (response) {
//     var tooltip = document.createElement("div");
//     tooltip.className = "tab-timer-tooltip";

//     function updateTooltip() {
//       chrome.runtime.sendMessage(
//         { action: "getTabTime", tabId: chrome.runtime.id },
//         function (response) {
//           tooltip.textContent = "This tab has been open for ".concat(
//             formatTime(response.time)
//           );
//         }
//       );
//     }

//     // Update immediately and then every second
//     updateTooltip();
//     setInterval(updateTooltip, 1000);

//     document.body.appendChild(tooltip);

//     function formatTime(ms) {
//       var seconds = Math.floor(ms / 1000);
//       var minutes = Math.floor(seconds / 60);
//       var hours = Math.floor(minutes / 60);
//       return ""
//         .concat(hours, "h ")
//         .concat(minutes % 60, "m ")
//         .concat(seconds % 60, "s");
//     }
//   }
// );

/// <reference types="chrome"/>
var tabTimes = {};

function getDomain(url) {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return "";
  }
}

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.id !== undefined) {
    tabTimes[tab.id] = {
      startTime: Date.now(),
      title: tab.title || "New Tab",
      domain: getDomain(tab.url),
    };
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const newDomain = getDomain(tab.url);
    const existingTab = tabTimes[tabId];

    // Only reset the timer if it's a new tab or the domain has changed
    if (!existingTab || existingTab.domain !== newDomain) {
      tabTimes[tabId] = {
        startTime: Date.now(),
        title: tab.title || "Loading...",
        domain: newDomain,
      };
    } else {
      // Update just the title if it's the same domain
      tabTimes[tabId].title = tab.title || "Loading...";
    }
  }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
  delete tabTimes[tabId];
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getTabTime") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        var timeElapsed =
          Date.now() - (tabTimes[tabs[0].id]?.startTime || Date.now());
        sendResponse({ time: timeElapsed });
      }
    });
    return true;
  } else if (request.action === "getAllTabs") {
    chrome.tabs.query({}, function (tabs) {
      var tabsData = tabs.map(function (tab) {
        return {
          id: tab.id,
          title: tab.title,
          time: Date.now() - (tabTimes[tab.id]?.startTime || Date.now()),
        };
      });
      sendResponse({ tabs: tabsData });
    });
    return true;
  }
});

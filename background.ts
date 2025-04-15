/// <reference types="chrome"/>

interface TabInfo {
  startTime: number;
  title: string;
}

const tabTimes: Record<number, TabInfo> = {};

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id !== undefined) {
    tabTimes[tab.id] = { startTime: Date.now(), title: tab.title || "New Tab" };
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    tabTimes[tabId] = {
      startTime: Date.now(),
      title: tab.title || "Loading...",
    };
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabTimes[tabId];
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabTime") {
    const timeElapsed =
      Date.now() - (tabTimes[request.tabId]?.startTime || Date.now());
    sendResponse({ time: timeElapsed });
  } else if (request.action === "getAllTabs") {
    chrome.tabs.query({}, (tabs) => {
      const tabsData = tabs.map((tab) => ({
        id: tab.id,
        title: tab.title,
        time: Date.now() - (tabTimes[request.tabId]?.startTime || Date.now()),
      }));
      sendResponse({ tabs: tabsData });
    });
    return true;
  }
});

interface Tab {
  id: number;
  title: string;
  time: number;
}

interface TabResponse {
  tabs: Tab[];
}

document.addEventListener("DOMContentLoaded", () => {
  function fetchTabs() {
    chrome.runtime.sendMessage(
      { action: "getAllTabs" },
      (response: TabResponse) => {
        const tabList = document.getElementById("tab-list");
        if (tabList) {
          tabList.innerHTML = ""; // Listeyi temizle
          response.tabs.forEach((tab: Tab) => {
            const li = document.createElement("li");
            li.className = "tab-item";
            li.dataset.tabId = tab.id.toString();
            li.innerHTML = `
              <span class="tab-title">${tab.title}</span>
              <span class="tab-time">${formatTime(tab.time)}</span>
            `;
            tabList.appendChild(li);
          });
        }
      }
    );
  }

  function formatTime(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}s ${minutes % 60}dk ${seconds % 60}s`;
  }

  // İlk yüklemede sekmeleri al
  fetchTabs();

  // Her saniye güncelle
  setInterval(fetchTabs, 1000);
});

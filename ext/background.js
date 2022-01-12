chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

const ACTIVE_TAB = { active: true, currentWindow: true };
const ALL_TABS = {};

const getTabs = (options, cb) => chrome.tabs.query(options, cb);

const cycleBetweenSameDomainTabs = () => {
  getTabs(ACTIVE_TAB, (tabs) => {
    const currentURL = new URL(tabs[0].url);
    const url = `${currentURL?.origin}/*`;
    chrome.tabs.query({ currentWindow: true, url }, (sameOriginTabs) => {
      const currentTabIdx = sameOriginTabs.findIndex((t) => t.active);
      if (sameOriginTabs.length) {
        const nextTabIdx =
          currentTabIdx === sameOriginTabs.length - 1 ? 0 : currentTabIdx + 1;
        const nextTabId = sameOriginTabs[nextTabIdx]["id"];
        chrome.tabs.update(nextTabId, { active: true });
      }
    });
  });
};

const cycleBetweenFavoriteTabs = () => {
  getTabs(ALL_TABS, (tabs) => {
    const currentTabIdx = tabs.findIndex((t) => t.active);
    chrome.storage.local.get(["quick-switch"], (data = {}) => {
      const { shortcuts } = data["quick-switch"] || {};
      const favoriteShortcuts = shortcuts.filter((i) => i.favorite);

      let idx = currentTabIdx + 1;

      while (idx !== currentTabIdx) {
        const item = tabs[idx];
        const match = favoriteShortcuts.some(({ url }) =>
          item.url.includes(url)
        );
        if (match) {
          chrome.tabs.update(item.id, { active: true });
          break;
        } else {
          idx = idx === tabs.length - 1 ? 0 : idx + 1;
        }
      }
    });
  });
};

chrome.commands.onCommand.addListener((command) => {
  // console.log(`Command: ${command}`);
  switch (command) {
    case "cycle-same-domain-tabs":
      cycleBetweenSameDomainTabs();
      break;
    case "cycle-favorite-tabs":
      cycleBetweenFavoriteTabs();
      break;
    case "toggle-app":
    default:
      chrome.tabs.query({}, (tabList) => {
        getTabs(ACTIVE_TAB, (tabs) =>
          chrome.tabs.sendMessage(tabs[0].id, { command, tabList })
        );
      });
      break;
  }
});

chrome.runtime.onMessage.addListener((obj) => {
  const { tabId, shortcutObj, action } = obj;
  if (action === "activate-tab") {
    getTabs(ALL_TABS, (tabs) => {
      // console.log("allTabs::-", tabs);

      const match = tabs.find((tab) => tab.url.includes(shortcutObj.url));

      if (match) chrome.tabs.update(match.id, { active: true });
      else
        chrome.tabs.create({
          url: `https://${shortcutObj.url}`,
        });
    });
  }
});

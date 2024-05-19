chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("lightning.force.com/lightning/r/Contact")) {
      const urlParts = tab.url.split("Contact/");

      if (urlParts.length > 1) {
          const contactId = urlParts[1].split('/')[0];

          chrome.tabs.sendMessage(tabId, {
              type: "NEW",
              contactId: contactId
          });
      }
  }
});

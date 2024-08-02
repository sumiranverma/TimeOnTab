// track how long the user stays on a page

let pageStartTime = Date.now();

window.addEventListener('beforeunload', () => {
  let timeSpent = Date.now() - pageStartTime;
  chrome.storage.sync.get('totalTime', (data) => {
    let totalTime = data.totalTime || 0;
    totalTime += timeSpent;
    chrome.storage.sync.set({ totalTime });
  });
});

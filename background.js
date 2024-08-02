let startTime = null;
let isTracking = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ totalTime: 0, isTracking: false, timestamps: [] });
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get(['isTracking'], (data) => {
    isTracking = !data.isTracking;
    if (isTracking) {
      startTime = Date.now();
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.storage.sync.set({ startUrl: tabs[0].url });
      });
      chrome.action.setBadgeText({ text: 'ON' });
    } else {
      chrome.storage.sync.get(['totalTime', 'timestamps', 'startUrl'], (data) => {
        const totalTime = (data.totalTime || 0) + (Date.now() - startTime);
        const timestamps = data.timestamps || [];
        timestamps.push({ start: startTime, end: Date.now() });
        chrome.storage.sync.set({ totalTime, timestamps });
        chrome.action.setBadgeText({ text: '' });
      });
    }
    chrome.storage.sync.set({ isTracking });
  });
});

function sendNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'TimeOnTab Alert',
    message: 'You have been interrupted from your usual work hours.',
    priority: 2
  });
}

setInterval(() => {
  chrome.storage.sync.get(['isTracking'], (data) => {
    if (data.isTracking) {
      sendNotification();
    }
  });
}, 5000); // 5 seconds

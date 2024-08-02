let isTracking = false;
let startTime = null;

chrome.storage.sync.get(['isTracking', 'totalTime'], (data) => {
  isTracking = data.isTracking || false;
  document.getElementById('startStopBtn').innerText = isTracking ? 'Stop' : 'Start';
  document.getElementById('timeSpent').innerText = `Time Spent: ${Math.floor((data.totalTime || 0) / 1000)} seconds`;
});

document.getElementById('startStopBtn').addEventListener('click', () => {
  chrome.storage.sync.get(['isTracking', 'totalTime', 'timestamps'], (data) => {
    isTracking = !data.isTracking;
    chrome.storage.sync.set({ isTracking });

    if (isTracking) {
      startTime = Date.now();
      document.getElementById('startStopBtn').innerText = 'Stop';
    } else {
      const totalTime = (data.totalTime || 0) + (Date.now() - startTime);
      const timestamps = data.timestamps || [];
      timestamps.push({ start: startTime, end: Date.now() });
      chrome.storage.sync.set({ totalTime, timestamps });
      document.getElementById('timeSpent').innerText = `Time Spent: ${Math.floor(totalTime / 1000)} seconds`;
      document.getElementById('startStopBtn').innerText = 'Start';
    }
  });
});

document.getElementById('viewSpreadsheetBtn').addEventListener('click', () => {
  chrome.tabs.create({ url: 'spreadsheet.html' });
});

document.getElementById('startStopBtn').addEventListener('click', () => {
    chrome.action.onClicked.dispatch();
  });
  
  document.getElementById('viewSpreadsheetBtn').addEventListener('click', () => {
    chrome.windows.create({
      url: 'spreadsheet.html',
      type: 'popup',
      width: 800,
      height: 600
    });
  });
  
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['timestamps'], (data) => {
      const timestamps = data.timestamps || [];
      const tableBody = document.getElementById('timestampsTable').querySelector('tbody');
  
      timestamps.forEach((timestamp, index) => {
        const row = document.createElement('tr');
  
        // Serial Number
        const snoCell = document.createElement('td');
        snoCell.textContent = index + 1; // Serial number starting from 1
        row.appendChild(snoCell);
  
        // Start Time
        const startCell = document.createElement('td');
        startCell.textContent = new Date(timestamp.start).toLocaleString();
        row.appendChild(startCell);
  
        // End Time
        const endCell = document.createElement('td');
        endCell.textContent = new Date(timestamp.end).toLocaleString();
        row.appendChild(endCell);
  
        // Total Time Spent
        const totalTimeCell = document.createElement('td');
        const totalTimeMillis = timestamp.end - timestamp.start;
        const totalTimeSeconds = Math.round(totalTimeMillis / 1000);
        const totalTimeMinutes = Math.floor(totalTimeSeconds / 60);
        const totalTimeHours = Math.floor(totalTimeMinutes / 60);
  
        totalTimeCell.textContent = `${totalTimeSeconds} sec (${totalTimeMinutes} min, ${totalTimeHours} hr)`;
        row.appendChild(totalTimeCell);
  
        tableBody.appendChild(row);
      });
    });
  });
  
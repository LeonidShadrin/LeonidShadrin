import fs from 'fs';

export function getFileData(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function writeFileData(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


export function parseData(input) {
    const lines = input.trim().split('\n');
    const result = [];
    for (const line of lines) {
        const match = line.replace(/[\t]/g, ' ').match(/^(\d+)\.\s+.*?(.*)\d+\s+(.*)/);
        const full = match[3].trim();
        const surname = full.split(' ').slice(-2)[0];
        const fullName = surname + ' ' + full.split(' ').slice(-1)[0];
        const initials = full.split(' ').slice(-1)[0].split('.');
   
        if (match) {
            result.push({
                id: match[1],
                full,
                fullName,
                surname,
                initials
            });
        }
    }

    return result;
}

export function getDatesInMonth(year, month) {
  const result = [];

  // Note: JavaScript months are 0-based (January is 0, June is 5)
  const date = new Date(year, month - 1, 1);

  while (date.getMonth() === month - 1) {
    // Get local year, month, and day
    const localYear = date.getFullYear();
    const localMonth = String(date.getMonth() + 1).padStart(2, '0'); // convert back to 1-based
    const localDay = String(date.getDate()).padStart(2, '0');

    const dateString = `${localYear}-${localMonth}-${localDay}`;
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    result.push({
      date: dateString,
      weekday: weekday
    });

    date.setDate(date.getDate() + 1);
  }

  return result;
}

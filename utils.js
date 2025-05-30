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
        const fullName = full.split(' ').slice(-2)[0] + ' ' + full.split(' ').slice(-1)[0];
        if (match) {
            result.push({
                id: match[1],
                full,
                fullName
            });
        }
    }

    return result;
}

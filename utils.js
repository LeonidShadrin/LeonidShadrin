import fs from 'fs';
import XLSX from 'xlsx';
import path from 'path';

/**
 * Зчитує дані з Excel файлу
 * @param {string} filePath Шлях до файлу
 * @param {string} sheetName Назва аркуша
 * @returns {Array<Object>} Масив об'єктів (рядків)
 */
export function readExcelFile(filePath, sheetName) {
    try {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            console.error(`Помилка: Аркуш "${sheetName}" не знайдено у файлі ${filePath}`);
            return [];
        }
        // Перетворюємо аркуш у масив JSON об'єктів
        return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
        console.error(`Помилка при читанні файлу ${filePath}:`, error.message);
        return [];
    }
}

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
      const match = line.trim().replace(/\t|\r/g, ' ').replace(/[\s]/g, ' ').match(/^(\d+)\.\s+.*?(.*)\d+\s+(.*)/);    
      if(!match) continue;
        let full;
        try {
          full = match[3].trim().replace(/\t|(\s{2,10})/g, ' ');
        } catch (error) {
          console.log([line]);
          console.log(match);
          throw error;
        }    
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

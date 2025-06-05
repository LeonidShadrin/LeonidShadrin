import { getDatesInMonth } from './utils.js';
import { renderTable } from './renderTable.js';
import fs from 'fs';

// Example usage
const year = 2025;
const month = 6;

const days = getDatesInMonth(year, month).map(day => ({
  ...day,
  ITV: { total: 3, park: false, asist: false},
  VZNP: { total: 0, park: false, asist: false, p4: false },
  VMZ: { total: 0, park: false, asist: false },
  NachSIZ: { total: 0, park: false, asist: false },
  NachProd: { total: 0, park: false, asist: false },
  NachKTP: { total: 0, park: false, asist: false },
}));

for (const day of days) {
  if(day.weekday === 'Monday' || day.weekday === 'Wednesday' || day.weekday === 'Friday') {
    day.VMZ.park = true;
    day.VMZ.total ++;
  }
  if(day.weekday === 'Thursday' || day.weekday === 'Saturday') {
    day.VZNP.park = true;
    day.VZNP.total ++;
  }
  if(day.weekday === 'Tuesday') {
    day.NachKTP.park = true;
    day.NachKTP.total ++;
  }
  if(day.weekday === 'Sunday') {
    day.ITV.park = true;
    day.ITV.total ++;
  }
}

console.log(days);
var json = JSON.stringify(days);

fs.writeFile('myjsonfile.json', json, 'utf8', ()=> {});
// Drawing the table
const keysToShow = ['Date', 'ITV', 'VZNP', 'VMZ', 'NachSIZ', 'NachProd', 'NachKTP'];
for (const day of days) {
  '┌' + '┬'
}
// renderTable(days);

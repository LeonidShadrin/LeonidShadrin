import { getDatesInMonth } from './getDates.js';

export function getTableData (month, year){
  const days = getDatesInMonth(year, month).map(day => ({
    ...day,
    divisions: {
      ITV: { total: 3, park: false, asist: false},
      VZNP: { total: 0, park: false, asist: false, p4: false },
      VMZ: { total: 0, park: false, asist: false },
      NachSIZ: { total: 0, park: false, asist: false },
      NachProd: { total: 0, park: false, asist: false },
      NachKTP: { total: 0, park: false, asist: false },
    }
  }));
  
  for (const day of days) { // проставляем известные дежурства на парк
    if(day.weekday === 'Monday' || day.weekday === 'Wednesday' || day.weekday === 'Friday') {
      day.divisions.VMZ.park = true;
      day.divisions.VMZ.total ++;
    }
    if(day.weekday === 'Thursday' || day.weekday === 'Saturday') {
      day.divisions.VZNP.park = true;
      day.divisions.VZNP.total ++;
    }
    if(day.weekday === 'Tuesday') {
      day.divisions.NachKTP.park = true;
      day.divisions.NachKTP.total ++;
    }
    if(day.weekday === 'Sunday') {
      day.divisions.ITV.park = true;
      day.divisions.ITV.total ++;
    }
  }

  for (const day of days) { // доставляем недостающие дежурства парк
    
  }
  
  return days;
}

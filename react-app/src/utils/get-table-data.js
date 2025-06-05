import { getDatesInMonth } from './getDates.js';

const divisionsForAsist = ['ITV', 'VZNP', 'VMZ', 'NachSIZ', 'NachProd'];

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
    },
    addItem(division, item){
      this.divisions[division][item] = true;
      this.divisions[division].total ++;
    }
  }));
  
  for (const day of days) { // проставляем известные дежурства на парк
    if(day.weekday === 'Monday' || day.weekday === 'Wednesday' || day.weekday === 'Friday') {
      day.addItem('VMZ', 'park');
    }
    if(day.weekday === 'Thursday' || day.weekday === 'Saturday') {
      day.addItem('VZNP', 'park');
    }
    if(day.weekday === 'Tuesday') {
      day.addItem('NachKTP', 'park');
    }
    if(day.weekday === 'Sunday') {
      day.addItem('ITV', 'park');
    }
  }

  days[0].addItem('VZNP', 'asist');
  // days[1].addItem('VMZ', 'asist');

  for (let idx = 0; idx < days.length; idx++) { // доставляем недостающие дежурства парк
    const day = days[idx];
    for (const division of divisionsForAsist) {
      if (!day.divisions[division].asist) {
        const dayHasAsist = divisionsForAsist.some(d => day.divisions[d].asist);
        if (dayHasAsist) continue;
        if (days[idx - 1] && days[idx - 1].divisions[division].asist) continue;
        if (days[idx - 2] && days[idx - 2].divisions[division].asist) continue;
        if (days[idx - 3] && days[idx - 3].divisions[division].asist) continue;
        // if (days[idx - 4] && days[idx - 4].divisions[division].asist) continue;
        if (day.divisions[division].park) continue;
        day.addItem(division, 'asist');
      }
    }
  }
  
  return days;
}




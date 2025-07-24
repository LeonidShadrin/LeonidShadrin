import { getDatesInMonth } from './getDates.js';

const divisionsForPark = ['VZNP', 'VMZ', 'Yelisey' ];
const onceAWeekPark = ['Yelisey', 'Pravenko', 'Priadko'];
const divisionsForAsist = ['ITV', 'VZNP', 'VMZ', 'NachSIZ', 'NachProd']; // 'NachProd'
const onceAWeekAsist = ['NachSIZ', 'NachProd'];

function checkOnceAWeekAsist (days, idx, division) {
  if (onceAWeekAsist.includes(division) && days[idx].weekday === 'Sunday') return true;

  if (onceAWeekAsist.includes(division) && days[idx - 1] && days[idx - 1].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 2] && days[idx - 2].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 3] && days[idx - 3].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 4] && days[idx - 4].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 5] && days[idx - 5].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 6] && days[idx - 6].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx - 7] && days[idx - 7].divisions[division].asist) return true;

  if (onceAWeekAsist.includes(division) && days[idx + 1] && days[idx + 1].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 2] && days[idx + 2].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 3] && days[idx + 3].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 4] && days[idx + 4].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 5] && days[idx + 5].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 6] && days[idx + 6].divisions[division].asist) return true;
  if (onceAWeekAsist.includes(division) && days[idx + 7] && days[idx + 7].divisions[division].asist) return true;
}

function checkOnceAWeekPark (days, idx, division) {
  if (onceAWeekPark.includes(division) && days[idx].weekday === 'Sunday') return true;
  if (onceAWeekPark.includes(division) && days[idx].weekday === 'Saturday') return true;

  if (onceAWeekPark.includes(division) && days[idx - 1] && days[idx - 1].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 2] && days[idx - 2].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 3] && days[idx - 3].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 4] && days[idx - 4].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 5] && days[idx - 5].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 6] && days[idx - 6].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx - 7] && days[idx - 7].divisions[division].park) return true;

  if (onceAWeekPark.includes(division) && days[idx + 1] && days[idx + 1].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx + 2] && days[idx + 2].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx + 3] && days[idx + 3].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx + 4] && days[idx + 4].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx + 6] && days[idx + 6].divisions[division].park) return true;
  if (onceAWeekPark.includes(division) && days[idx + 7] && days[idx + 7].divisions[division].park) return true;
}  

export function getTableData (month, year){
  const days = getDatesInMonth(year, month).map(day => ({
    ...day,
    divisions: {
      ITV: { total: 3, park: false, asist: false},
      VZNP: { total: 1, park: false, asist: false, p4: false },
      VMZ: { total: 0, park: false, asist: false },
      NachSIZ: { total: 0, park: false, asist: false },
      NachProd: { total: 0, park: false, asist: false },
      Yelisey: { total: 0, park: false, asist: false },
      Pravenko: { total: 0, park: false, asist: false },
      Priadko: { total: 0, park: false, asist: false },
      // NachKTP: { total: 0, park: false, asist: false },
    },
    addItem(division, item){
      if (this.divisions[division][item]) return;
      this.divisions[division][item] = true;
      this.divisions[division].total ++;
    },
    addSoldier(division, total = 1) {
      this.divisions[division].total += total;
    }
  }));
  
  // for (const day of days) { // проставляем известные дежурства на парк
  //   if(day.weekday === 'Monday' || day.weekday === 'Wednesday' || day.weekday === 'Friday') {
  //     day.addItem('VMZ', 'park');
  //   }
  //   if(day.weekday === 'Thursday' || day.weekday === 'Saturday') {
  //     day.addItem('VZNP', 'park');
  //   }
  //   // if(day.weekday === 'Tuesday') {
  //   //   day.addItem('NachKTP', 'park');
  //   // }
  //   // if(day.weekday === 'Sunday') {
  //   //   day.addItem('ITV', 'park');
  //   // }
  // }

  for (let round = 0; round < 7; round++) { // проставляем парк, там, где не проставили
    console.log(`Round ${round}`);
    
    for (let idx = 0; idx < days.length; idx++) {
      const day = days[idx];
      for (const division of divisionsForPark) {
        if (!day.divisions[division].park) {
          // --- each try ---
          const dayHasPark = divisionsForPark.some(d => day.divisions[d].park);
          if (dayHasPark) continue;

          if (days[idx - 1] && days[idx - 1].divisions[division].park) continue;
          if (days[idx + 1] && days[idx + 1].divisions[division].park) continue;
          if (round < 4 && days[idx - 2] && days[idx - 2].divisions[division].park) continue;
          if (round < 4 && days[idx + 2] && days[idx + 2].divisions[division].park) continue;
          if (round < 3 && days[idx - 3] && days[idx - 3].divisions[division].park) continue;
          // if (round < 3 && days[idx + 3] && days[idx + 3].divisions[division].park) continue;
          // if (round < 2 && days[idx - 4] && days[idx - 4].divisions[division].park) continue;
          // if (round < 2 && days[idx + 4] && days[idx + 4].divisions[division].park) continue;

          if (checkOnceAWeekPark (days, idx, division)) continue;

          
          day.addItem(division, 'park');
        }
      }
    }
  }

  //--- добавляем дежурства на asist вручную, где\если это надо
  // days[0].addItem('VZNP', 'asist');
  // days[1].addItem('VMZ', 'asist');
  // ---\\

  
  for (let round = 0; round < 7; round++) { // проставляем ЧЧ
    console.log(`Round ${round}`);
    
    for (let idx = 0; idx < days.length; idx++) {
      const day = days[idx];
      for (const division of divisionsForAsist) {
        if (!day.divisions[division].asist) {
          // --- each try ---
          const dayHasAsist = divisionsForAsist.some(d => day.divisions[d].asist);
          if (dayHasAsist) continue;

          if (days[idx - 1] && days[idx - 1].divisions[division].asist) continue;
          if (days[idx + 1] && days[idx + 1].divisions[division].asist) continue;
          if (round < 4 && days[idx - 2] && days[idx - 2].divisions[division].asist) continue;
          if (round < 4 && days[idx + 2] && days[idx + 2].divisions[division].asist) continue;
          if (round < 3 && days[idx - 3] && days[idx - 3].divisions[division].asist) continue;
          if (round < 3 && days[idx + 3] && days[idx + 3].divisions[division].asist) continue;

          // if (round < 2 && days[idx - 4] && days[idx - 4].divisions[division].asist) continue;
          // if (round < 2 && days[idx + 4] && days[idx + 4].divisions[division].asist) continue;

          if ( ['ITV'].includes(division) && (() => {
            for (let tmpIdx = 0; tmpIdx < 4; tmpIdx++) {
              if ( days[idx - tmpIdx] && days[idx - tmpIdx].divisions[division].asist) return true;
              if ( days[idx + tmpIdx] && days[idx + tmpIdx].divisions[division].asist) return true;
            }
          })() === true) continue;
          // if (['ITV'].includes(division) && days[idx - 5] && days[idx - 5].divisions[division].asist) continue;
          // if (['ITV'].includes(division) && days[idx + 5] && days[idx + 5].divisions[division].asist) continue;

          if (checkOnceAWeekAsist (days, idx, division)) continue;

          if (division === 'ITV' && round < 1 && day.divisions[division].park) continue;

          
          day.addItem(division, 'asist');
        }
      }
    }
  }

  // for (const day of days) {
  //   const totalForDay = Object.values(day.divisions).reduce((acc, division) => acc + division.total, 0);
  //   switch (totalForDay) {
  //     case 4:
  //       day.addSoldier('VZNP', 2);
  //       day.addSoldier('VMZ', 1);
  //       break;
  //     case 5:
  //         day.addSoldier('VZNP', );
  //         // day.addSoldier('VMZ', 1);
  //         break;
  //     case 6:
  //         day.addSoldier('VZNP', 1);
  //         // day.addSoldier('VMZ', 1);
  //         break;
  //     default:
  //       break;
  //   }
  // }

  return days;
}




import { getDatesInMonth } from './getDates.js';

const surnames = [
  "Рогак",
  "Лисий",
  "Горошко",
  "Глущенко",
  "Перепадя",
  "Євтуховський",
  "Пяста",
  "Марецький",
  "Бичкова",
  "Бабинець",
  "Янковський",
  "Нетрян",
];

const rotnye = [
  "Рогак",
  "Глущенко",
  "Бабинець",
  "Янковський"
];

// const totals = surnames.reduce((acc, surname) => {
//       acc[surname] = { total: 0 };
//       return acc;
//     }, {});

export function getTableData(month, year) {

  const totals = {
    "Рогак": { total: 0, max: 1, saturday: false, sunday: false },
    "Лисий": { total: 0, max: 4, saturday: false, sunday: false },
    "Горошко": { total: 0, max: 4, saturday: false, sunday: false },
    "Глущенко": { total: 0, max: 1, saturday: false, sunday: false },
    "Перепадя": { total: 0, max: 4, saturday: false, sunday: false },
    "Євтуховський": { total: 0, max: 3, saturday: false, sunday: false },
    "Пяста": { total: 0, max: 3, saturday: false, sunday: false },
    "Марецький": { total: 0, max: 3, saturday: false, sunday: false },
    "Бичкова": { total: 0, max: 2, saturday: false, sunday: false },
    "Бабинець": { total: 0, max: 2, saturday: false, sunday: false },
    "Янковський": { total: 0, max: 1, saturday: false, sunday: false },
    "Нетрян": { total: 0, max: 2, saturday: false, sunday: false },
  };

  const days = getDatesInMonth(year, month).map(day => ({
    ...day,
    divisions: surnames.reduce((acc, surname) => {
      acc[surname] = { asist: false };
      return acc;
    }, {}),

    setOne(division, item) {
      if (this.divisions[division][item]) return;
      this.divisions[division][item] = true;
    },
    addAsist(division) {
      
      if (this.divisions[division]['asist']) return;
      // this.setOne(division, 'asist');
      this.divisions[division]['asist'] = true;
      totals[division].total ++;
      if (this.weekday === 'Saturday') totals[division].saturday = true;
      if (this.weekday === 'Sunday') totals[division].sunday = true;
      // console.log('addAsist', division, totals[division], this.divisions);
    },
  }));

   //--- добавляем вручную
  days[0].addAsist('Пяста');
  days[1].addAsist('Марецький');
  days[2].addAsist('Євтуховський');
  days[3].addAsist('Бичкова');
  days[5].addAsist('Янковський');
  days[7].addAsist('Лисий');
  days[10].addAsist('Бичкова');
  days[19].addAsist('Янковський');
  
  // ---\\

  for (let round = 0; round < 8; round++) { // проставляем ЧЧ
    console.log(`======================Round ${round}`);

    for (let idx = 0; idx < days.length; idx++) {
      const day = days[idx];
      for (const division of surnames) {
        if (!day.divisions[division].asist) {
          // --- each try ---
          const dayHasAsist = surnames.some(d => day.divisions[d].asist);
          if (dayHasAsist) continue;

          if (totals[division].total >= totals[division].max) continue;
          if (totals[division].saturday && day.weekday === 'Saturday') continue;
          if (totals[division].sunday && day.weekday === 'Sunday') continue;

          if (rotnye.includes(division) && (day.weekday === 'Sunday' || day.weekday === 'Monday')) continue;
          
          if(division === 'Нетрян' && (day.weekday === 'Saturday' || day.weekday === 'Sunday' || day.weekday === 'Monday')) continue;

          if(division === 'Пяста') continue;

          if (days[idx - 1] && days[idx - 1].divisions[division].asist) continue;
          if (days[idx + 1] && days[idx + 1].divisions[division].asist) continue;
          if (round < 7 && days[idx - 2] && days[idx - 2].divisions[division].asist) continue;
          if (round < 7 && days[idx + 2] && days[idx + 2].divisions[division].asist) continue;
          if (round < 6 && days[idx - 3] && days[idx - 3].divisions[division].asist) continue;
          if (round < 6 && days[idx + 3] && days[idx + 3].divisions[division].asist) continue;
          if (round < 5 && days[idx - 4] && days[idx - 4].divisions[division].asist) continue;
          if (round < 5 && days[idx + 4] && days[idx + 4].divisions[division].asist) continue;
          if (round < 4 && days[idx - 5] && days[idx - 5].divisions[division].asist) continue;
          if (round < 4 && days[idx + 5] && days[idx + 5].divisions[division].asist) continue;
          if (round < 3 && days[idx - 6] && days[idx - 6].divisions[division].asist) continue;
          if (round < 3 && days[idx + 6] && days[idx + 6].divisions[division].asist) continue;
          if (round < 2 && days[idx - 7] && days[idx - 7].divisions[division].asist) continue;
          if (round < 2 && days[idx + 7] && days[idx + 7].divisions[division].asist) continue;

          if(division === 'Марецький' && idx >7 && idx < 22  ) continue;


          // if (round < 2 && days[idx - 4] && days[idx - 4].divisions[division].asist) continue;
          // if (round < 2 && days[idx + 4] && days[idx + 4].divisions[division].asist) continue;

          // if (checkOnceAWeekAsist(days, idx, division)) continue;

          day.addAsist(division);
        }
      }
    }
  }
  console.log({ totals } );
  console.log({ days } );
  return days;
  
}



// function checkOnceAWeekAsist(days, idx, division) {
  
//   if (surnames.includes(division) && (() => {
//     for (let tmpIdx = 0; tmpIdx < 12; tmpIdx++) {
//       if (days[idx - tmpIdx] && days[idx - tmpIdx].divisions[division].asist) return true;
//       if (days[idx + tmpIdx] && days[idx + tmpIdx].divisions[division].asist) return true;
//     }
//   })() === true) return true;

// }


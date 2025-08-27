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
  "Нетрян",
  "Янковський"
];


// const totals = surnames.reduce((acc, surname) => {
//       acc[surname] = { total: 0 };
//       return acc;
//     }, {});

export function getTableData(month, year) {

  const totals = {
    "Рогак": { total: 0, max: 1 },
    "Лисий": { total: 0, max: 4 },
    "Горошко": { total: 0, max: 4 },
    "Глущенко": { total: 0, max: 2 },
    "Перепадя": { total: 0, max: 4 },
    "Євтуховський": { total: 0, max: 3 },
    "Пяста": { total: 0, max: 3 },
    "Марецький": { total: 0, max: 3 },
    "Бичкова": { total: 0, max: 2 },
    "Бабинець": { total: 0, max: 2 },
    "Янковський": { total: 0, max: 1 },
    "Нетрян": { total: 0, max: 2 },
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
      console.log('addAsist', division, totals[division], this.divisions);
    },
  }));

   //--- добавляем вручную
  days[0].addAsist('Пяста');
  days[1].addAsist('Глущенко');
  days[2].addAsist('Євтуховський');
  days[3].addAsist('Бичкова');
  days[22].addAsist('Бичкова');
  // ---\\

  for (let round = 0; round < 7; round++) { // проставляем ЧЧ
    console.log(`======================Round ${round}`);

    for (let idx = 0; idx < days.length; idx++) {
      const day = days[idx];
      for (const division of surnames) {
        if (!day.divisions[division].asist) {
          // --- each try ---
          const dayHasAsist = surnames.some(d => day.divisions[d].asist);
          if (dayHasAsist) continue;

          if (totals[division].total >= totals[division].max) continue;

          if (days[idx - 1] && days[idx - 1].divisions[division].asist) continue;
          if (days[idx + 1] && days[idx + 1].divisions[division].asist) continue;
          if (round < 4 && days[idx - 2] && days[idx - 2].divisions[division].asist) continue;
          if (round < 4 && days[idx + 2] && days[idx + 2].divisions[division].asist) continue;
          if (round < 3 && days[idx - 3] && days[idx - 3].divisions[division].asist) continue;
          if (round < 3 && days[idx + 3] && days[idx + 3].divisions[division].asist) continue;

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
//   if (totals[division].total >= totals[division].max) return true;
  
//   if (surnames.includes(division) && (() => {
//     for (let tmpIdx = 0; tmpIdx < 12; tmpIdx++) {
//       if (days[idx - tmpIdx] && days[idx - tmpIdx].divisions[division].asist) return true;
//       if (days[idx + tmpIdx] && days[idx + tmpIdx].divisions[division].asist) return true;
//     }
//   })() === true) return true;

// }


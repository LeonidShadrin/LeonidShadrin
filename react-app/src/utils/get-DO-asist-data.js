import { getDatesInMonth } from './getDates.js';

const surnames = [
    "ЯВОРСЬКИЙ",
    "ЯКУБОВСЬКИЙ",
    "КОВТУЦЬКИЙ",
    "МАЛИШОК",
    "БЕЗУГЛИЙ",
    "БРИЖАТИЙ",
    "ФЕДОТОВ",
];

const onceAWeekAsist = ['КОВТУЦЬКИЙ', 'МАЛИШОК', 'ЯВОРСЬКИЙ', 'ЯКУБОВСЬКИЙ'];

// const totals = surnames.reduce((acc, surname) => {
//       acc[surname] = { total: 0 };
//       return acc;
//     }, {});

export function getTableData(month, year) {

  const totals = {
    "ЯВОРСЬКИЙ": { total: 0, max: 3, saturday: false, sunday: false },
    "ЯКУБОВСЬКИЙ": { total: 0, max: 3, saturday: false, sunday: false },
    "КОВТУЦЬКИЙ": { total: 0, max: 3, saturday: false, sunday: false },
    "МАЛИШОК": { total: 0, max: 3, saturday: false, sunday: false },
    "БЕЗУГЛИЙ": { total: 0, max: 6, saturday: false, sunday: false },
    "БРИЖАТИЙ": { total: 0, max: 6, saturday: false, sunday: false },
    "ФЕДОТОВ": { total: 0, max: 6, saturday: false, sunday: false },
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
      console.log('addAsist', division, totals[division], this.divisions);
    },
  }));

  //--- добавляем вручную
  // days[0].addAsist('БЕЗУГЛИЙ');
  // days[1].addAsist('ФЕДОТОВ');
  // days[2].addAsist('БРИЖАТИЙ');

  days[0].addAsist('КОВТУЦЬКИЙ');
  // days[4].addAsist('МАЛИШОК');
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

          if (round < 4 && totals[division].saturday && day.weekday === 'Saturday') continue;
          if (round < 4 && totals[division].sunday && day.weekday === 'Sunday') continue;

          if (days[idx - 1] && days[idx - 1].divisions[division].asist) continue;
          if (days[idx + 1] && days[idx + 1].divisions[division].asist) continue;
          if (round < 6 && days[idx - 2] && days[idx - 2].divisions[division].asist) continue;
          if (round < 6 && days[idx + 2] && days[idx + 2].divisions[division].asist) continue;
          if (round < 5 && days[idx - 3] && days[idx - 3].divisions[division].asist) continue;
          if (round < 5 && days[idx + 3] && days[idx + 3].divisions[division].asist) continue;
          if (round < 4 && days[idx - 4] && days[idx - 4].divisions[division].asist) continue;
          if (round < 4 && days[idx + 4] && days[idx + 4].divisions[division].asist) continue;
          if (round < 3 && days[idx - 5] && days[idx - 5].divisions[division].asist) continue;
          if (round < 3 && days[idx + 5] && days[idx + 5].divisions[division].asist) continue;
          if (round < 2 && days[idx - 6] && days[idx - 6].divisions[division].asist) continue;
          if (round < 2 && days[idx + 6] && days[idx + 6].divisions[division].asist) continue;

          // if (onceAWeekAsist.includes(division) && (() => {
          //   for (let tmpIdx = 0; tmpIdx < 5; tmpIdx++) {
          //     if (days[idx - tmpIdx] && days[idx - tmpIdx].divisions[division].asist) return true;
          //     if (days[idx + tmpIdx] && days[idx + tmpIdx].divisions[division].asist) return true;
          //   }
          // })() === true) continue;


          // if (onceAWeekAsist.includes(division) && days[idx].weekday === 'Sunday') continue;
          // if (onceAWeekAsist.includes(division) && days[idx].weekday === 'Saturday') continue;



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
  
//   if (onceAWeekAsist.includes(division) && (() => {
//     for (let tmpIdx = 0; tmpIdx < 12; tmpIdx++) {
//       if (days[idx - tmpIdx] && days[idx - tmpIdx].divisions[division].asist) return true;
//       if (days[idx + tmpIdx] && days[idx + tmpIdx].divisions[division].asist) return true;
//     }
//   })() === true) return true;

// }


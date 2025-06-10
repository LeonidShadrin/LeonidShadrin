import { getFileData, writeFileData, parseData } from '../utils.js';
import { mapping } from '../mapping-VZNP-on-4.js';

function findByInitials(item, names) {
  for (const name of names) {
    const initials = name.replace(/[\t]/g, ' ').trim().split(' ').slice(-3); // [ 'Пяста', 'Павло', 'Анатолійович' ]
    
    const result = name.replace(/[\t]/g, ' ').trim().split(' ').slice(0, -3).join(' ')
      + ' ' + initials[1] + ' ' + initials[0].toUpperCase() + ' ';
    // console.log(result);
    
    if (initials[0] === item.surname ){
      // console.log(`Found: ${name} for ${item.surname}`);
      
      if (initials[1][0] === item.initials[0] && initials[2][0] === item.initials[1]) {
        return result;
      } else {
        console.log('same surname', initials[0] , `${initials[1][0]}.${initials[2][0]}.`, `${item.initials[0]}.${item.initials[1]}`);
        
      }
    }
  }
}

function processTemplate(table, names) {
  const signers = [];
  const weekSigners = [];
  for (const item of table) {
    if (mapping[item.id]?.signer || mapping[item.id]?.week_signer) {
      const match = findByInitials(item, names);
      // const match = names.find(str => str.includes(item.surname));
      if (match) {
        mapping[item.id]?.signer ? signers.push(match) : weekSigners.push(match);
        // console.log(match);
      } else {
        console.log(`===== No template found for: '${item.surname}'`);
      }
    }
  }

  return { signers, weekSigners };
}

async function init() {
  try {
    const tableStr = await getFileData('../table.txt');
    const table = parseData(tableStr);
    
    const namesStr = await getFileData('../templates/name-templates.txt');
    const names = namesStr.trim().split('\n');

    // Process current and previous data
    const { signers, weekSigners } = processTemplate(table, names);

    let result = 'Signers:\n' + signers.join('\n') + '\n\nWeek Signers:\n' + weekSigners.join('\n');
    // Write final file
    await writeFileData('./signers.txt', result);
    console.log('Done.');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

import { getFileData, writeFileData, parseData } from '../utils.js';
import { mapping } from '../mapping/mapping.js';
import { ranks } from '../mapping/ranks-mapping.js';

const DATE = '19.07.2025';

function findByInitials(item, names) {
  for (const name of names) {
    const initials = name.replace(/[\t]/g, ' ').trim().split(' ').slice(-3); // [ 'Пяста', 'Павло', 'Анатолійович' ]
    const rank = name.replace(/[\t]/g, ' ').replace(/\s+/g, ' ').trim().split(' ').slice(0, -3).join(' ')
        .replace('ст.', 'старший ')
        .replace('мол.', 'молодший ')
        .replace('гол.', 'головний');
    const match = rank + '\t' + initials[1] + ' ' + initials[0].toUpperCase() + '\n' + DATE + '\n';
    
    if (initials[0] === item.surname ){
      // console.log(`Found: ${name} for ${item.surname}`);
      
      if (initials[1][0] === item.initials[0] && initials[2][0] === item.initials[1]) {
        // console.log( { match, rank: rank.replace(/\s+/g, '') }); // DEBUG
        // return { match, rank: rank.replace(/\s+/g, '') }; // DEBUG
        return { match, rank: ranks[rank.replace(/\s+/g, '')] };
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
      const result = findByInitials(item, names);
      if  (!result) {
        console.log(`===== No match found for: '${item.surname}'`);
        continue;
      }
      //  console.log('result: ', result);
      console.log({ t:result.rank});
      if (result.match) {
        signers.push(result)
        if (mapping[item.id]?.week_signer) {
          weekSigners.push(result)
        }
      } else {
        console.log(`===== No template found for: '${item.surname}'`);
      }
    }
  }

  return { signers: signers.sort((a, b) => b.rank - a.rank), weekSigners };
}

async function init() {
  try {
    const tableStr = await getFileData('../table.txt');
    const table = parseData(tableStr);
    
    const namesStr = await getFileData('../templates/signers-templates.txt');
    const names = namesStr.trim().split('\n');

    // Process current and previous data
    const { signers, weekSigners } = processTemplate(table, names);

    let result = 'Signers:\n' + signers.map(({match}) => match).join('\n') 
      + '\n\n\n\n=====================\nWeek Signers:\n' 
      + weekSigners.map(({match}) => match).join('\n');
    // Write final file
    await writeFileData('./signers.txt', result);
    console.log('Done.');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

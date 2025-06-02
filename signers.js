import { getFileData, writeFileData, parseData } from './utils.js';
import { mapping } from './mapping.js';

function findByInitials(item, names) {
  for (const name of names) {
    const initials = name.replace(/[\t]/g, ' ').trim().split(' ').slice(-3); // [ 'Пяста', 'Павло', 'Анатолійович' ]
    // console.log(initials);
    
    if (initials[0] === item.surname ){
      // console.log(`Found: ${name} for ${item.surname}`);
      
      if (initials[1][0] === item.initials[0] && initials[2][0] === item.initials[1]) {
        return name;
      } else {
        console.log(initials[1][0], item.initials[0], initials[2][0], item.initials[1]);
        
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
        console.log(match);
      } else {
        console.log(`===== No template found for: '${item.surname}'`);
      }
      // return;
    }
  }

  return;
}

async function init() {
  try {

    const tableStr = await getFileData('./table.txt');
    const table = parseData(tableStr);
    
    const namesStr = await getFileData('./templates/name-templates.txt');
    const names = namesStr.trim().split('\n');

    // Process current and previous data
    const result = processTemplate(table, names);

    // Write final file
    // await writeFileData('./signers.txt', result);
    console.log('Done.');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

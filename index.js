import { getFileData, writeFileData, parseData } from './utils.js';
import { mapping } from './mapping.js';

async function init() {

  const templatesFromFile = await getFileData('./templates/templates.txt');
  const templates = templatesFromFile.trim().split('\n');
  let nakazTemplate = await getFileData('./templates/nakaz-template.txt');

  const data = await getFileData('./table.txt');
  const parsed = parseData(data);

  const dataPrev = await getFileData('./table-prev.txt');
  const parsedPrev = parseData(dataPrev);
  

  for (const item of parsed) {
    if (mapping[item.id] && mapping[item.id].search) {
      const match = templates.find(str => str.includes(item.fullName));

      if (match) {
        nakazTemplate = nakazTemplate.replace(`{-${item.id}-}`, match.trim());
      } else {
        console.log(`{-${item.id}-}`, `No template found for: '${item.fullName}'`);
      }
    } else {
      if (item.full.includes('ст.')){
        item.full = item.full.replace('ст.', 'старший');
      }
      if (item.full.includes('мл.')){
        item.full = item.full.replace('мл.', 'молодший');
      }
      nakazTemplate = nakazTemplate.replace(`{-${item.id}-}`, item.full);
    }
  }

  for (const item of parsedPrev) {
    if (mapping[item.id] && mapping[item.id].search) {
      const match = templates.find(str => str.includes(item.fullName));

      if (match) {
        nakazTemplate = nakazTemplate.replace(`{-old-${item.id}-}`, match.trim());
      } else {
        console.log(`{-old-${item.id}-}`, `No template found for: '${item.fullName}'`);
      }
    } else {
      if (item.full.includes('ст.')){
        item.full = item.full.replace('ст.', 'старший');
      }
      if (item.full.includes('мл.')){
        item.full = item.full.replace('мл.', 'молодший');
      }
      nakazTemplate = nakazTemplate.replace(`{-old-${item.id}-}`, item.full);
    }
  }

  // console.log(nakazTemplate);

  writeFileData('./nakaz.txt', nakazTemplate)
    .then(() => {
      console.log('File written successfully');
    })
    .catch((err) => {
      console.error('Error writing file:', err);
    });

}


init();

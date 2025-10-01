import { getFileData, writeFileData, parseData } from '../utils.js';
import { getRandomName, getRandomFathersName } from '../getRandomNames.js';
import { mapping } from '../mapping/mapping.js';

function findByInitials(item, templates) {
  for (const template of templates) {
    const initials = template.replace(/[\t]/g, ' ').trim().split(' ').slice(-3); // [ 'Іванов', 'Іван', 'Іванович' ]
    
    if (initials[0] === item.surname.toUpperCase() ){
      if (initials[1][0] === item.initials[0] && initials[2][0] === item.initials[1]) {
        return template;
      } else {
        console.log('skiping same surname', initials[0] , `${initials[1][0]}.${initials[2][0]}.`, `${item.initials[0]}.${item.initials[1]}`);
        
      }
    }
  }
}

// Utility function to process replacements in template
function processTemplate(template, parsedData, templatesList, kursantsTemplatesList, prefix = '') {
  return parsedData.reduce((output, item) => {
    const key = `${prefix}${item.id}`;
    const placeholder = `{-${key}-}`;

    if (mapping[item.id]?.search) {
      const match = findByInitials(item, templatesList);
      if (match) {
        return output.replace(placeholder, match.trim()
          .split(item.fullName).join(item.fullName.toUpperCase()));
      } else {
        console.log(placeholder, `========> No template found for: '${item.fullName}'`);
        return output;
      }
    } else {
      const match = findByInitials(item, mapping[item.id]?.kursant ? kursantsTemplatesList : templatesList);
      if (match) {
        return output.replace(placeholder, 
          (mapping[item.id]?.kursant ? 'курсант навчального взводу навчальної роти військової частини А4631 ' : '')
          + match.trim()
          .split(item.fullName).join(item.fullName.toUpperCase()));
      } else {
        console.log(placeholder, `Leaving as is: '${item.fullName}'`);
        let full = item.full
          .replace('ст.', 'старший ')
          .replace('мол.', 'молодший ')
          .replace('гол.', 'головний ');

        return output.replace(placeholder, 
          (mapping[item.id]?.kursant ? 'курсант навчального взводу навчальної роти військової частини А4631 ' : '')
          + `${full.split(item.surname)[0]} ${item.surname.toUpperCase()} ${getRandomName(item.initials[0])} ${getRandomFathersName(item.initials[1])}`);
      }
    }
  }, template);
}

async function init() {
  try {
    // Load all needed files in parallel
    const [templatesStr, kursantsTempStr, nakazTemplate, dataStr, dataPrevStr] = await Promise.all([
      getFileData('../templates/templates.txt'),
      getFileData('../templates/kursants-templates.txt'),
      getFileData('../templates/nakaz-template.txt'),
      getFileData('../table.txt'),
      getFileData('../table-prev.txt')
    ]);

    const templates = templatesStr.trim().split('\n');
    const kursantsTemplates = kursantsTempStr.trim().split('\n');
    const parsed = parseData(dataStr);
    const parsedPrev = parseData(dataPrevStr);

    // Process current and previous data
    let result = processTemplate(nakazTemplate, parsed, templates, kursantsTemplates);
    result = processTemplate(result, parsedPrev, templates, kursantsTemplates, 'old-');

    // Write final file
    await writeFileData('./nakaz.txt', result);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

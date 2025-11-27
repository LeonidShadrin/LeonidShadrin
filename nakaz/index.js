import { getFileData, writeFileData, parseData } from '../utils.js';
import { getRandomName, getRandomFathersName } from '../getRandomNames.js';
import { mapping } from '../mapping/mapping.js';

function findByInitials(item, templates, debug = false) {
  // if (debug === true) console.log('findByInitials', templates.slice(-3));
  for (const template of templates) {
    if (item.id === 12) console.log(template);
    
    const initials = template.replace(/\t|(\s{2,10})/g, ' ').trim().split(' ').slice(-3); // [ 'Іванов', 'Іван', 'Іванович' ]
    // if (debug === true) console.log('initials', initials);
    // if (item.fullName === 'Сорочинський О.В.') console.log('initials', initials);
    
    if (initials[0].toUpperCase() === item.surname.toUpperCase()){
      
      try {
        if (initials[1][0] === item.initials[0] && initials[2][0] === item.initials[1]) {
          return template;
        } else {
          console.log('skiping same surname', initials[0] , `${initials[1][0]}.${initials[2][0]}.`, `${item.initials[0]}.${item.initials[1]}`);
          
        }
        
      } catch (error) {
        console.log(item);
        console.log([template]);
        console.log(initials);
        
        throw error;
      }
    }
  }
}

function findBySurname(item, templates) {
  for (const template of templates) {
    const initials = template.replace(/[\t]/g, ' ').trim().split(' ').slice(-3); // [ 'Іванов', 'Іван', 'Іванович' ]
    
    if (initials[0] === item.surname.toUpperCase()){
      console.log(`for ${item.surname} found: ${template}`);
      return template;
    }
  }
}

// Utility function to process replacements in template
function processTemplate(template, parsedData, templatesList, kursantsTemplatesList, prefix = '') {
  return parsedData.reduce((output, item) => {
    const key = `${prefix}${item.id}`;
    const placeholder = `{-${key}-}`;

    if (item.surname === 'delete') {
      return output.replace(placeholder, item.fullName.toUpperCase());
    }
    if (mapping[item.id]?.search) {
      // console.log(templatesList.slice(-3));
      const match = findByInitials(item, templatesList, true);
      if (match) {
        return output.replace(placeholder, match.trim()
          .split(item.fullName).join(item.fullName.toUpperCase()));
      } else {
        console.log(placeholder, `========> No template found for: '${item.fullName}'`);
        return output;
      }
    } else {
      const templates = mapping[item.id]?.kursant ? kursantsTemplatesList : templatesList;
      const match = mapping[item.id]?.kursant ? findByInitials(item, templates) : findByInitials(item, templates) || findBySurname(item, templates);
      if (match) {
        return output.replace(placeholder, 
          (mapping[item.id]?.kursant ? 'курсант навчального взводу навчальної роти військової частини А4631 ' : '')
          + match.trim()
          .split(item.fullName).join(item.fullName.toUpperCase()));
      } else {
        // console.log(placeholder, `Leaving as is: '${item.fullName}'`);
        let full = item.full
          .replace('ст.', 'старший ')
          .replace('мол.', 'молодший ')
          .replace('гол.', 'головний ');

        return output.replace(placeholder, 
          (mapping[item.id]?.kursant ? 'курсант навчального взводу навчальної роти військової частини А4631 ' : '')
          // + `${full.split(item.surname)[0]} ${item.surname.toUpperCase()} ${item.initials[0]}.${item.initials[1]}.`);SS
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
    // result = processTemplate(result, parsedPrev, templates, kursantsTemplates, 'old-');

    // Write final file
    await writeFileData('./nakaz.txt', result);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

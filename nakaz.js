import { getFileData, writeFileData, parseData } from './utils.js';
import { mapping } from './mapping.js';

// Utility function to process replacements in template
function processTemplate(template, parsedData, templatesList, prefix = '') {
  return parsedData.reduce((output, item) => {
    const key = `${prefix}${item.id}`;
    const placeholder = `{-${key}-}`;

    if (mapping[item.id]?.search) {
      const match = templatesList.find(str => str.includes(item.fullName));
      if (match) {
        return output.replace(placeholder, match.trim());
      } else {
        console.log(placeholder, `No template found for: '${item.fullName}'`);
        return output.replace(placeholder, '');
      }
    } else {
      let fullName = item.full
        .replace('ст.', 'старший ')
        .replace('мол.', 'молодший ');

      return output.replace(placeholder, fullName);
    }
  }, template);
}

async function init() {
  try {
    // Load all needed files in parallel
    const [templatesStr, nakazTemplate, dataStr, dataPrevStr] = await Promise.all([
      getFileData('./templates/templates.txt'),
      getFileData('./templates/nakaz-special.txt'),
      getFileData('./table.txt'),
      getFileData('./table-prev.txt')
    ]);

    const templates = templatesStr.trim().split('\n');
    const parsed = parseData(dataStr);
    const parsedPrev = parseData(dataPrevStr);

    // Process current and previous data
    let result = processTemplate(nakazTemplate, parsed, templates);
    result = processTemplate(result, parsedPrev, templates, 'old-');

    // Write final file
    await writeFileData('./nakaz.txt', result);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error during execution:', err);
  }
}

init();

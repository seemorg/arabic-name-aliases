import * as fs from 'fs';

const output = JSON.parse(fs.readFileSync('output.json', 'utf8'));

const convertToJsonMinimal = (originalJson) => Object.keys(originalJson).reduce((acc, key) => {
  const translations = new Set();

  // Check if originalJson[key][key] is not undefined or null
  if (originalJson[key] && originalJson[key][key]) {
    Object.values(originalJson[key][key]).forEach(langArray => {
      if (Array.isArray(langArray)) { // Additional check to ensure langArray is an array
        langArray.forEach(translation => translations.add(translation));
      }
    });
  }

  acc[key] = [...translations]; // Spread operator to convert Set to Array
  return acc;
}, {});

const minimalJson = convertToJsonMinimal(output);

fs.writeFileSync('output-minimal.json', JSON.stringify(minimalJson, null, 2), 'utf8');

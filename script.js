// Given an input.json with a list of arabic names, create an output.json with the same list of names but in english, turkish, and french.

import * as fs from 'fs';
import OpenAI from 'openai';

const input = JSON.parse(fs.readFileSync('input.json', 'utf8'));


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Create the first entry in the json file
const output = JSON.parse(fs.readFileSync('output.json', 'utf8'));

const badOutput = {};

// Function to validate the output schema
const isValidNameSchema = (input) => {
  // Check if the input is an object
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return false;
  }

  // Iterate over each key in the object
  for (let name in input) {
    const languages = input[name];

    // Check if the value for each name is an object
    if (typeof languages !== 'object' || languages === null || Array.isArray(languages)) {
      return false;
    }

    // Iterate over each language key in the languages object
    for (let lang in languages) {
      const variations = languages[lang];

      // Check if the value for each language is an array
      if (!Array.isArray(variations)) {
        return false;
      }

      // Check if every item in the array is a string
      if (!variations.every(variation => typeof variation === 'string')) {
        return false;
      }
    }
  }

  // If all checks pass, return true
  return true;
}

// For each name in the input file, if it's already in the output file, skip it. If it's not, call openai
for (const name of input) {
  if (output[name] !== undefined) {
    console.log("skipping", name)
    continue;
  }

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an assistant that takes an Arabic name as input, and returns a json with that name as the key and array of different spelling of that name in english, turkish, and french. 

The schema should match the following: 

{"محمد": {
    "english": ["Mohammed", "Muhammad", "Mohammad"],
    "turkish": ["Mehmet"],
    "french": ["Mohammed", "Mohamed", "Muhammad"]
  }}

The more popular names should appear first in the array.`,
      },
      { role: "user", content: name },
    ],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" },
  });
  try {
  output[name] = JSON.parse(completion.choices[0].message.content);
  console.log("writing", name)
  // prettify the output and write it to the file
  fs.writeFileSync('output.json', JSON.stringify(output, null, 2));
  }
  catch (e) {
    console.log(e)
  }
}

// Validate each of the items and log the invalid ones
for (const name in output) {
  if (!isValidNameSchema(output[name])) {
    badOutput[name] = output[name];
    delete output[name];
  }
}

// Log the invalid items
console.log("Invalid items:", badOutput);

// Write the output to a file
fs.writeFileSync('output.json', JSON.stringify(output, null, 2));


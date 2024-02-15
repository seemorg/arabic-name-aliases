
# Arabic Name Spellings

This Node.js script leverages GPT-4 to generate various spellings for Arabic names in Latin characters. It's an invaluable tool for creating search aliases or accurately looking up names across different languages, focusing on the complexity and variability of Arabic name transliteration into Latin script.

## Features

- Generate multiple spellings for Arabic names in English, Turkish, and French.
- Customizable input from any list of names.
- Option to convert detailed output into a minimal format.

## Installation

Ensure Node.js is installed on your system to use this script. Follow these steps to get started:

1. **Clone the repository:**

   ```bash
   git clone seemorg/arabic-name-aliases
   ```

2. **Navigate to the project directory:**

   ```bash
   cd arabic-name-spellings
   ```

## Usage

1. **Prepare the Input List:** Create an `input.json` file with the names you wish to process. For example, to generate spellings for "محمد", your `input.json` should look like this:

   ```json
     ["محمد"]
   ```

2. **Generate Spellings:** Run the script to generate different spellings for the names:

   ```bash
   node script.js
   ```

   This will produce an `output.json` with the structure:

   ```json
   {
     "محمد": {
       "english": ["Mohammed", "Muhammad", "Mohammad"],
       "turkish": ["Mehmet"],
       "french": ["Mohammed", "Mohamed", "Muhammad"]
     }
   }
   ```

3. **Optional - Minimal Format Conversion:** To convert the detailed output into a minimal format, run:

   ```bash
   node convert-to-minimal.js
   ```

   This produces an `output-minimal.json` like:

   ```json
   "محمد": ["Muhammad", "Mohammed", "Mohammad", "Mehmet", "Mohamed"]
   ```

### Customizing Input

To generate spellings for other names, simply modify the `input.json` file accordingly. The script is designed to handle lists of names, so you can include as many as needed:

```json
["محمد", "أحمد", "يوسف"]
```

## Contributions

Contributions to the Arabic Name Spellings project are welcomed. Please create a PR with any bug fixes or improvements

## License

This project is open source and available under the [MIT License](LICENSE.md).
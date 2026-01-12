import * as file from "node:fs";

/**
 * Validates and extracts data from a JSON file based on a specified property type.
 *
 * @param args - An array containing two elements:
 *   - args[0]: The property type to extract, prefixed with "--" (e.g., "--myProperty")
 *   - args[1]: The file path to the JSON file to be read
 *
 * @returns An array of values extracted from the specified property in the JSON file
 *
 * @throws {TypeError} If the specified property does not exist in the JSON file
 * @throws {TypeError} If the specified property is not an array
 * @throws {SyntaxError} If the file does not contain valid JSON
 * @throws {Error} If the file cannot be read (e.g., file not found, permission denied)
 *
 * @example
 * ```typescript
 * // Given a JSON file "data.json" with content: { "items": ["a", "b", "c"] }
 * const result = isValidJson(["--items", "data.json"]);
 * // Returns: ["a", "b", "c"]
 * ```
 */

export const isValidJson = (args: Array<string>): Array<string> => {
  const type = args[0].replace("--", "");
  const source = args[1];

  console.log('===========:', __dirname);

  const raw = file.readFileSync(source, { encoding: "utf8" });
  const json = JSON.parse(raw);

  if (!json.hasOwnProperty(type)) {
    throw new TypeError(`${type} property does not exist in supplied JSON.`);
  }

  const data = json[type];

  if (!Array.isArray(data)) {
    throw new TypeError(
      `${type} property is not an Array of values in the JSON file as expected`
    );
  }

  return data;
};

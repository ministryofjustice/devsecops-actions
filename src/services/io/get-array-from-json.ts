import * as file from "node:fs";

import { sanitiseArgumentProperty } from "../../helpers";

/**
 * Extracts an array from a JSON file based on a specified property name.
 *
 * @param args - An array containing two elements:
 *               - args[0]: The property name prefixed with "--" (e.g., "--items")
 *               - args[1]: The file path to the JSON file to read
 *
 * @returns An array of strings extracted from the specified property in the JSON file
 *
 * @throws {TypeError} If the specified property does not exist in the JSON file
 * @throws {TypeError} If the specified property is not an array
 * @throws {Error} If the file cannot be read or parsed as valid JSON
 *
 * @example
 * ```typescript
 * // Given a JSON file at './config.json' with content: { "tags": ["tag1", "tag2"] }
 * const tags = getArrayFromJson(["--tags", "./config.json"]);
 * // Returns: ["tag1", "tag2"]
 * ```
 */
const getArrayFromJson = (args: Array<string>): Array<string> => {
  const type = sanitiseArgumentProperty(args[0]);
  const source = args[1];

  const raw = file.readFileSync(source, { encoding: "utf8" });
  const json = JSON.parse(raw);

  if (!Object.hasOwn(json, type)) {
    throw new TypeError(`${type} property does not exist in supplied JSON.`);
  }

  const data = json[type];

  if (!Array.isArray(data)) {
    throw new TypeError(
      `${type} property is not an Array of values in the JSON file as expected.`,
    );
  }

  return data;
};

export default getArrayFromJson;

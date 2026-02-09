import { statSync } from "node:fs";
import { resolve, extname } from "node:path";

import { SOURCES_FILE_EXTENSION } from "../constants";

/**
 * Validates that the provided image arguments contain a valid file with an acceptable extension.
 *
 * @param {Array<string>} args - The command arguments array where args[1] should contain the file path
 * @returns {boolean} True if the file exists, is a regular file, and has a valid extension; false otherwise
 *
 * @example
 * ```ts
 * const isValid = areImageArgumentsValid(['command', './path/to/image.dockerfile']);
 * ```
 *
 * @remarks
 * - Resolves the file path relative to the current working directory
 * - Checks if the path points to a file (not a directory)
 * - Validates the file extension against SOURCES_FILE_EXTENSION enum values
 * - Logs errors to console if file reading fails
 */
const areImageArgumentsValid = (args: Array<string>): boolean => {
  try {
    const source = args[1];

    const path = resolve(process.cwd(), source);
    const file = statSync(path);

    const isValidFile = file.isFile();
    const isValidExtension = Object.values(SOURCES_FILE_EXTENSION).includes(
      extname(path),
    );

    if (!isValidFile || !isValidExtension) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ An error has occurred while reading file %o", error);
    return false;
  }
};

export default areImageArgumentsValid;

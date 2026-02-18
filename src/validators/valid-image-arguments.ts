/**
 * @fileoverview Validates Docker image scanning arguments.
 *
 * @module validators/valid-image-arguments
 */

import { statSync } from "node:fs";
import { resolve, extname } from "node:path";

import { SOURCES_FILE_EXTENSION } from "../constants";

/**
 * Validates that the provided image arguments contain a valid JSON file with an acceptable extension.
 *
 * Resolves the file path relative to the current working directory, checks if the path points
 * to a file (not a directory), and validates the file extension against allowed extensions.
 *
 * @param args - The command arguments array where args[1] should contain the file path
 * @returns `true` if the file exists, is a regular file, and has a valid `.json` extension; `false` otherwise
 *
 * @example
 * ```typescript
 * const isValid = areImageArgumentsValid(['--images', './images.json']);
 * // Returns: true
 * ```
 *
 * @remarks
 * This function does not throw errors but catches them internally and returns `false`.
 * Errors are logged to the console for debugging purposes.
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

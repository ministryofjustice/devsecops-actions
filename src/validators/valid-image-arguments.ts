import { statSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Validates that the second argument is a path to an existing file.
 *
 * Resolves the path relative to the current working directory and checks if it points
 * to a valid file (not a directory or other type).
 *
 * @param args - The argument list where index 1 is expected to be the file path
 * @returns `true` if the path resolves to a file; otherwise `false`
 *
 * @example
 * ```typescript
 * const valid = areImageArgumentsValid(['--images', './images.json']);
 * // Returns: true if images.json exists and is a file
 * ```
 */
const areImageArgumentsValid = (args: Array<string>): boolean => {
  try {
    const source = args[1];

    const path = resolve(process.cwd(), source);
    const file = statSync(path);

    const isValidFile = file.isFile();

    if (!isValidFile) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ An error has occurred while reading file %o", error);
    return false;
  }
};

export default areImageArgumentsValid;

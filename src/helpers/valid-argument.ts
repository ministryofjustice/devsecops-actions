import { resolve } from "node:path";

/**
 * Validates the command-line arguments for type and source path.
 *
 * @param args - An array of string arguments where the first element is the type
 *               and the second element is the source path.
 * @returns `true` if both the type is valid (exists in the types set) and the source
 *          path is valid (can be resolved), otherwise returns `false`.
 *
 * @remarks
 * This function checks:
 * - The first argument against a `types` collection
 * - The second argument is resolved as a valid path from the current working directory
 */

export const validateArguments = (args: Array<string>): boolean => {
  const types = new Set(["--images"]);
  const type = args[0];
  const source = args[1];

  const isValidType = types.has(type);
  const isValidSource = resolve(process.cwd(), source);

  if (!isValidType || !isValidSource) {
    return false;
  }

  return true;
};

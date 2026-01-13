/**
 * Retrieves command-line arguments passed to the process, excluding the first two default arguments.
 *
 * The function extracts arguments from `process.argv`, skipping the first two elements which are
 * typically the Node.js executable path and the script file path.
 *
 * @returns An array of string arguments or an Error if validation fails
 * @throws {Error} When fewer than the minimum required number of arguments are provided
 *
 * @example
 * ```typescript
 * // If process.argv = ['node', 'script.js', 'arg1', 'arg2']
 * const args = getArguments();
 * // Returns: ['arg1', 'arg2']
 * ```
 */

export const getArguments = (): Array<string> => {
  // Node.js arguments
  const ignoreArguments = 2;
  const minimumArguments = 2;
  /**
   * Start reading from 3rd argument.
   * First two being implicit arguments.
   */
  const args = process.argv.slice(ignoreArguments);

  if (args.length < minimumArguments) {
    throw new TypeError("Invalid arguments provided.");
  }

  return args;
};

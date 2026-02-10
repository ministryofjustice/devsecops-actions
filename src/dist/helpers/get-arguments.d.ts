/**
 * Retrieves command-line arguments passed to the process, excluding the first two default arguments.
 *
 * The function extracts arguments from `process.argv`, skipping the first two elements which are
 * typically the Node.js executable path and the script file path.
 *
 * @returns An array of string arguments
 * @throws {TypeError} When fewer than the minimum required number of arguments are provided
 *
 * @example
 * ```typescript
 * // If process.argv = ['node', 'script.js', 'arg1', 'arg2']
 * const args = getArguments();
 * // Returns: ['arg1', 'arg2']
 * ```
 */
declare const getArguments: () => Array<string>;
export default getArguments;
//# sourceMappingURL=get-arguments.d.ts.map
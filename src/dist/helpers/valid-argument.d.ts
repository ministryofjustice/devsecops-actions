/**
 * Validates command-line arguments for the application.
 *
 * @param args - An array of command-line arguments where:
 *   - args[0] is the type flag (e.g., "--images")
 *   - args[1] is the source file path
 *
 * @returns `true` if the arguments are valid (type is recognized and source is a valid file), `false` otherwise
 *
 * @remarks
 * This function checks if:
 * - The type argument matches one of the supported types (currently only "--images")
 * - The source path resolves to an existing file
 *
 * @example
 * ```typescript
 * validateArguments(['--images', './path/to/image.txt']); // returns true if file exists
 * validateArguments(['--invalid', './path/to/file']); // returns false
 * ```
 */
declare const validateArguments: (args: Array<string>) => boolean;
export default validateArguments;
//# sourceMappingURL=valid-argument.d.ts.map
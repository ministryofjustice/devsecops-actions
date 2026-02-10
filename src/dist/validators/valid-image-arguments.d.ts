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
declare const areImageArgumentsValid: (args: Array<string>) => boolean;
export default areImageArgumentsValid;
//# sourceMappingURL=valid-image-arguments.d.ts.map
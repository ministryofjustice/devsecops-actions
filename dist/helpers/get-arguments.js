"use strict";
/**
 * @fileoverview Retrieves command-line arguments for CLI processing.
 *
 * @module helpers/get-arguments
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Retrieves command-line arguments passed to the process, excluding the first two default arguments.
 *
 * Extracts arguments from `process.argv`, skipping the first two elements which are
 * typically the Node.js executable path and the script file path.
 *
 * @returns An array of string arguments provided to the command-line interface
 * @throws {TypeError} When fewer than two arguments are provided (minimum required)
 *
 * @example
 * ```typescript
 * // Given: process.argv = ['node', 'script.js', '--images', 'config.json']
 * const args = getArguments();
 * // Returns: ['--images', 'config.json']
 * ```
 */
const getArguments = () => {
    const ignoreArguments = 2;
    const minimumArguments = 2;
    const args = process.argv.slice(ignoreArguments);
    if (args.length < minimumArguments) {
        throw new TypeError("Invalid arguments provided.");
    }
    return args;
};
exports.default = getArguments;

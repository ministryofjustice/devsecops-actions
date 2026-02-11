"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const constants_1 = require("../constants");
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
const areImageArgumentsValid = (args) => {
    try {
        const source = args[1];
        const path = (0, node_path_1.resolve)(process.cwd(), source);
        const file = (0, node_fs_1.statSync)(path);
        const isValidFile = file.isFile();
        const isValidExtension = Object.values(constants_1.SOURCES_FILE_EXTENSION).includes((0, node_path_1.extname)(path));
        if (!isValidFile || !isValidExtension) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("❌ An error has occurred while reading file %o", error);
        return false;
    }
};
exports.default = areImageArgumentsValid;

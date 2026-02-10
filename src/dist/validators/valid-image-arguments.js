"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const constants_1 = require("../constants");
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
//# sourceMappingURL=valid-image-arguments.js.map
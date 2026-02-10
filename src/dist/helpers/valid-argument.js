"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
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
const validateArguments = (args) => {
    try {
        const types = new Set(["--images"]);
        const type = args[0];
        const source = args[1];
        const path = (0, node_path_1.resolve)(process.cwd(), source);
        const file = (0, node_fs_1.statSync)(path);
        const isValidType = types.has(type);
        const isValidFile = file.isFile();
        if (!isValidType || !isValidFile) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("❌ An error has occurred while reading file %o", error);
        return false;
    }
};
exports.default = validateArguments;
//# sourceMappingURL=valid-argument.js.map
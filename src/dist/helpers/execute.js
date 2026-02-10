"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const get_command_1 = __importDefault(require("./get-command"));
/**
 * Executes a command for each value in the provided array and reports the results.
 *
 * @param type - The type of command to execute, used to determine the command via getCommand()
 * @param values - An array of string values (e.g., image names) to process
 * @returns A Promise that resolves to void on success, or rejects with a TypeError if any scans fail
 * @throws {TypeError} Throws a TypeError with message "Image scanning failed" if one or more values fail to scan
 *
 * @remarks
 * This function:
 * - Executes commands asynchronously for all values in parallel
 * - Logs success (✅) or failure (❌) for each individual value
 * - Collects all results and reports failed scans at the end
 * - Throws an error if any scans failed, listing all failed values
 *
 * @example
 * ```typescript
 * await execute('scan', ['image1:latest', 'image2:latest']);
 * // Logs: ✅ Successfully scanned image1:latest
 * // Logs: ✅ Successfully scanned image2:latest
 * // Logs: ✅ All 2 images have been successfully scanned.
 * ```
 */
const execute = async (type, values) => {
    const execAsync = (0, node_util_1.promisify)(node_child_process_1.exec);
    const promises = values.map(async (value) => {
        try {
            const command = (0, get_command_1.default)(type, value);
            await execAsync(command);
            console.info("✅ Successfully scanned %s", value);
            return { image: value, success: true };
        }
        catch (error) {
            console.error("❌ Failed to scan %s with the provided command %o", value, error);
            return { image: value, success: false };
        }
    });
    const results = await Promise.all(promises);
    const failed = results.filter((scan) => !scan.success);
    if (failed.length) {
        console.error("\n\r\n\r❌ %i images did not scan successfully: \n\r", failed.length);
        failed.forEach(({ image }, index) => {
            console.error("%i. %s", index + 1, image);
        });
        throw new TypeError("Image scanning failed");
    }
    else {
        console.info("\n\r\n\r✅ All %i images have been successfully scanned.", values.length);
    }
};
exports.default = execute;
//# sourceMappingURL=execute.js.map
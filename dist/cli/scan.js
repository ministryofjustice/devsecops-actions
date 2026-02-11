"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const index_1 = require("../helpers/index");
const scans_1 = require("./scans");
/**
 * Executes a scan based on CLI arguments, delegating to the appropriate scan handler.
 *
 * Parses command-line arguments to determine the scan type (Docker or GitHub) and
 * invokes the corresponding scanner implementation. Supported scan types are defined
 * in the `SCAN` constant.
 *
 * @returns A promise that resolves when the scan completes successfully
 * @throws {TypeError} When the scan fails or an invalid scan type is supplied
 *
 * @example
 * ```typescript
 * // For Docker image scanning:
 * // Command: node dist/index.js --images ./images.json
 * await scan();
 *
 * // For GitHub repository archival scanning:
 * // Command: node dist/index.js --github archive --days 90 --email user@gov.uk
 * //          --key api-key --template-id template-123 --repository-name my-repo
 * await scan();
 * ```
 */
const scan = async () => {
    try {
        const args = (0, index_1.getArguments)();
        const type = (0, index_1.getScanType)(args);
        switch (type) {
            case constants_1.SCAN.DOCKER:
                await (0, scans_1.docker)(args);
                break;
            case constants_1.SCAN.GITHUB:
                await (0, scans_1.github)(args);
                break;
            default:
                throw new TypeError("Invalid scan type argument supplied");
        }
    }
    catch (error) {
        console.error("❌ An error has occurred during execution %s", error);
        throw new TypeError(`Scanning failed: ${error}`);
    }
};
exports.default = scan;

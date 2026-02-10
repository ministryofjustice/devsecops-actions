"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const validators_1 = require("../../validators");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
/**
 * Processes GitHub scan CLI arguments and initiates the appropriate GitHub scan operation.
 *
 * Validates the provided arguments and delegates to the specific scan handler based on
 * the scan type (e.g., archive scanning).
 *
 * @param args - CLI arguments containing scan type, days threshold, email, and API key
 * @returns A promise that resolves when the scan completes
 * @throws {TypeError} If the provided arguments are invalid or missing required values
 *
 * @example
 * ```typescript
 * await github(['--github', '--archive', '--days', '90', '--email', 'team@example.gov.uk', '--key', 'api-key', '--template-id', '123', '--repository-name', 'repository']);
 * // Initiates GitHub repository archival scanning
 * ```
 */
const github = async (args) => {
    const valid = (0, validators_1.areGitHubArgumentsValid)(args);
    if (!valid) {
        throw new TypeError("Invalid arguments provided.\n\r\n\r\n\rUsage: scan --github --archive --days <days> --email <email> --key <key> --template-id <id> --repository-name <name>");
    }
    const type = (0, helpers_1.sanitiseArgumentProperty)(args[1]);
    if (type === constants_1.GITHUB_SCANS.ARCHIVE) {
        const days = Number(args[3]);
        const email = args[5];
        const key = args[7];
        const template = args[9];
        const name = args[11];
        console.info("⚡️ Scanning %s repository for archival", name);
        await (0, services_1.scanGithub)(name, days, email, key, template);
    }
};
exports.default = github;
//# sourceMappingURL=github.js.map
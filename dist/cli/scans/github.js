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
 * the scan type (currently supports `archive` scanning only).
 *
 * @param args - CLI arguments array containing scan configuration:
 *   - `args[0]`: `'--github'` flag
 *   - `args[1]`: Scan type (e.g., `'archive'`)
 *   - `args[2]`: `'--days'` flag
 *   - `args[3]`: Number of days threshold
 *   - `args[4]`: `'--email'` flag
 *   - `args[5]`: Notification email address
 *   - `args[6]`: `'--key'` flag
 *   - `args[7]`: GOV.UK Notify API key
 *   - `args[8]`: `'--template-id'` flag
 *   - `args[9]`: GOV.UK Notify template identifier
 *   - `args[10]`: `'--repository-name'` flag
 *   - `args[11]`: Repository name
 * @returns A promise that resolves when the scan completes
 * @throws {TypeError} If the provided arguments are invalid or missing required values
 *
 * @example
 * ```typescript
 * await github([
 *   '--github', 'archive', '--days', '90',
 *   '--email', 'team@example.gov.uk', '--key', 'api-key',
 *   '--template-id', 'template-123', '--repository-name', 'my-repository'
 * ]);
 * // Logs: ⚡️ Scanning my-repository repository for archival
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

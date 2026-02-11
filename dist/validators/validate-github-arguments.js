"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_email_1 = __importDefault(require("./is-valid-email"));
const helpers_1 = require("../helpers");
const constants_1 = require("../constants");
/**
 * Validates GitHub CLI-style arguments for repository archive scanning.
 *
 * Ensures that the scan type is valid (`archive`), days threshold is a positive number,
 * email address is properly formatted, API key is present, template identifier is provided,
 * and repository name is specified.
 *
 * @param args - Argument list with the following structure:
 *   - `args[0]`: `'--github'` flag
 *   - `args[1]`: Scan type (e.g., `'archive'`)
 *   - `args[2]`: `'--days'` flag
 *   - `args[3]`: Number of days threshold
 *   - `args[4]`: `'--email'` flag
 *   - `args[5]`: Email address
 *   - `args[6]`: `'--key'` flag
 *   - `args[7]`: GOV.UK Notify API key
 *   - `args[8]`: `'--template-id'` flag
 *   - `args[9]`: GOV.UK Notify template identifier
 *   - `args[10]`: `'--repository-name'` flag
 *   - `args[11]`: Repository name
 * @returns `true` when all arguments are valid; `false` otherwise
 *
 * @example
 * ```typescript
 * const valid = areGitHubArgumentsValid([
 *   '--github', 'archive', '--days', '90',
 *   '--email', 'test@gov.uk', '--key', 'key123',
 *   '--template-id', 'template-123', '--repository-name', 'my-repo'
 * ]);
 * // Returns: true
 * ```
 *
 * @remarks
 * This function catches validation errors internally and logs them to the console,
 * returning `false` instead of throwing exceptions.
 */
const areGitHubArgumentsValid = (args) => {
    try {
        const type = (0, helpers_1.sanitiseArgumentProperty)(args[1]);
        const days = Number(args[3]);
        const email = args[5];
        const key = args[7];
        const template = args[9];
        const name = args[11];
        if (!Object.values(constants_1.GITHUB_SCANS).includes(type)) {
            throw new Error("Invalid --github scan type argument.");
        }
        if (days <= 0 || Number.isNaN(days)) {
            throw new Error("Invalid --days argument value, it must be more than zero days.");
        }
        if (!(0, is_valid_email_1.default)(email)) {
            throw new Error("Invalid --email argument value, must be a valid email address.");
        }
        if (!key?.trim()) {
            throw new Error("Invalid --key argument value, must be a valid API key.");
        }
        if (!template?.trim()) {
            throw new Error("Invalid --template-id argument value, must be a valid GovNotify template identifier.");
        }
        if (!name?.trim()) {
            throw new Error("Invalid --repository-name argument value, must be a valid name.");
        }
        return true;
    }
    catch (error) {
        console.error("❌ An error has occurred while validating GitHub CLI arguments %o", error);
        return false;
    }
};
exports.default = areGitHubArgumentsValid;

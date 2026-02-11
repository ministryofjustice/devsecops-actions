"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const notifications_1 = __importDefault(require("../notifications"));
/**
 * Scans a GitHub repository to determine if it should be archived based on commit age.
 *
 * Checks the timestamp of the last commit and compares it to the specified threshold.
 * If the repository exceeds the threshold, sends a notification email via GOV.UK Notify.
 *
 * @param name - Repository name
 * @param days - The maximum number of days since last commit before archival notification
 * @param email - The email address to notify if the repository should be archived
 * @param key - The GOV.UK Notify API key for sending notification emails
 * @param template - The GOV.UK Notify template identifier
 * @returns A promise that resolves to `true` if repository is active (within threshold), or `false` if archival notification was sent
 * @throws {TypeError} If the git command fails or cannot be executed
 *
 * @example
 * ```typescript
 * const isActive = await scanGithub('repository-name', 90, 'user@gov.uk', 'api-key-123', 'template-id');
 * // Returns: true
 * // Logs: ✅ Repository repository-name is not due for archival, last commit was 45 day(s) ago on [date]
 * ```
 */
const scanGithub = async (name, days, email, key, template) => {
    try {
        const command = "git";
        const argument = ["log", "-1", "--format=%ct"];
        const date = (0, node_child_process_1.execFileSync)(command, argument, {
            encoding: "utf8",
        });
        const DAYS_MS = 24 * 60 * 60 * 1000;
        const lastCommitMs = Number(date) * 1000;
        const nowMs = Date.now();
        const differenceMs = nowMs - lastCommitMs;
        const differenceDays = Math.floor(differenceMs / DAYS_MS);
        if (differenceDays > days) {
            console.warn("⚠️ Repository %s is %i day(s) old, last commit was on %s", name, differenceDays, new Date(lastCommitMs));
            const options = {
                personalisation: {
                    date: String(new Date(lastCommitMs)),
                    name,
                },
                reference: `${name}-${lastCommitMs}-${nowMs}`,
            };
            // Notify team
            await (0, notifications_1.default)(email, key, template, options);
            return false;
        }
        console.info("✅ Repository %s is not due for archival, last commit was %i day(s) ago on %s", name, differenceDays, new Date(lastCommitMs));
        return true;
    }
    catch (error) {
        console.error("❌ Failed to scan the GitHub repository for archival action", error);
        throw new TypeError(`Failed to scan the GitHub repository for archival action: ${error}`);
    }
};
exports.default = scanGithub;

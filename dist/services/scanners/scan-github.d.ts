/**
 * Scans a GitHub repository to determine if it should be archived based on commit age.
 *
 * Checks the timestamp of the last commit and compares it to the specified threshold.
 * If the repository exceeds the threshold, sends a notification email.
 *
 * @param name - Repository name
 * @param days - The maximum number of days since last commit before archival notification
 * @param email - The email address to notify if the repository should be archived
 * @param key - The GOV.UK Notify API key for sending notification emails
 * @param template - The GOV.UK Notify template id
 * @returns A promise that resolves when the scan completes
 * @throws {Error} If the git command fails or cannot be executed
 *
 * @example
 * ```typescript
 * await scanGithub('repository-name', 90, 'user@gov.uk', 'api-key-123', 'template-id');
 * // Logs: ✅ Repository is not due for archival, last commit was 45 day(s) ago.
 * ```
 */
declare const scanGithub: (name: string, days: number, email: string, key: string, template: string) => Promise<boolean>;
export default scanGithub;
//# sourceMappingURL=scan-github.d.ts.map
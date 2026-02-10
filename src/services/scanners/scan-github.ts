import { execFileSync } from "node:child_process";

import sendEmail from "../notifications";
import { EmailOptions } from "../../types/notifications";

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
const scanGithub = async (
  name: string,
  days: number,
  email: string,
  key: string,
  template: string,
): Promise<boolean> => {
  try {
    const command = "git";
    const argument = ["log", "-1", "--format=%ct"];

    const date = execFileSync(command, argument, {
      encoding: "utf8",
    });

    const DAYS_MS = 24 * 60 * 60 * 1000;

    const lastCommitMs = Number(date) * 1000;
    const nowMs = Date.now();
    const differenceMs = nowMs - lastCommitMs;
    const differenceDays = Math.floor(differenceMs / DAYS_MS);

    if (differenceDays > days) {
      console.warn(
        "⚠️ Repository %s is %i day(s) old, last commit was on %s",
        name,
        differenceDays,
        new Date(lastCommitMs),
      );

      const options: EmailOptions = {
        personalisation: {
          date: String(new Date(lastCommitMs)),
          name,
        },
        reference: `${name}-${lastCommitMs}-${nowMs}`,
      };

      // Notify team
      await sendEmail(email, key, template, options);

      return false;
    }

    console.info(
      "✅ Repository %s is not due for archival, last commit was %i day(s) ago.",
      name,
      differenceDays,
    );

    return true;
  } catch (error) {
    console.error(
      "❌ Failed to scan the GitHub repository for archival action",
      error,
    );

    return false;
  }
};

export default scanGithub;

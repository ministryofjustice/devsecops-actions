import { NotifyClient } from "notifications-node-client";
import { EmailOptions } from "../../types/notifications";

/**
 * Sends an email notification using the GOV.UK Notify service.
 *
 * Dispatches archival notifications to repository teams via the GOV.UK Notify API.
 * The email uses a pre-configured template with personalised variables.
 *
 * @param email - The recipient email address
 * @param key - The GOV.UK Notify API key for authentication
 * @param template - The GOV.UK Notify template identifier
 * @param options - Additional email options including personalisation data and reference
 * @returns A promise that resolves when the email is sent successfully
 * @throws {Error} If the API request fails or the key is invalid
 *
 * @example
 * ```typescript
 * await sendEmail('team@example.gov.uk', 'notify-api-key-123', 'template-id', {
 *   personalisation: { name: 'repo-name', date: '2026-02-10' },
 *   reference: 'repo-name-archival-notification'
 * });
 * // Logs: 📧 Email has been dispatched.
 * ```
 */
const sendEmail = async (
  email: string,
  key: string,
  template: string,
  options: EmailOptions,
): Promise<void> => {
  try {
    const client = new NotifyClient(key);
    await client.sendEmail(template, email, options);

    console.info("📧 Email has been dispatched.");
  } catch (error) {
    console.error("❌ Unable to send an email %o", error);
    throw new Error("Unable to send email");
  }
};

export default sendEmail;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_node_client_1 = require("notifications-node-client");
/**
 * Sends an email notification using GOV.UK Notify service.
 *
 * Sends archival notifications to repository teams via the GOV.UK Notify API.
 *
 * @param email - The recipient email address
 * @param key - The GOV.UK Notify API key for authentication
 * @param template - The GOV.UK Notify template ID
 * @param options - Additional email options including personalisation data and reference
 * @returns A promise that resolves when the email is sent successfully
 * @throws {Error} If the API request fails or the key is invalid
 *
 * @example
 * ```typescript
 * await sendEmail('team@example.gov.uk', 'notify-api-key-123', 'template-id', {
 *   personalisation: { name: 'repo-name', date: new Date() },
 *   reference: 'notification-ref'
 * });
 * // Logs: 📧 Email has been dispatched.
 * ```
 */
const sendEmail = async (email, key, template, options) => {
    try {
        const client = new notifications_node_client_1.NotifyClient(key);
        await client.sendEmail(template, email, options);
        console.info("📧 Email has been dispatched.");
    }
    catch (error) {
        console.error("❌ Unable to send an email %o", error);
        throw new Error("Unable to send email");
    }
};
exports.default = sendEmail;

/**
 * @fileoverview Type declarations for the GOV.UK Notify Node.js client library.
 *
 * Provides TypeScript type definitions for the notifications-node-client package,
 * enabling type-safe interactions with the GOV.UK Notify API service for sending
 * emails, SMS, and retrieving notification data.
 *
 * @module types/notifications-node-client
 */

declare module "notifications-node-client" {
  /**
   * GOV.UK Notify API client for sending notifications.
   *
   * Provides methods for sending emails and SMS, retrieving notifications,
   * managing templates, and configuring proxy settings.
   */
  class NotifyClient {
    /**
     * Creates a new NotifyClient instance.
     *
     * @param {string} apiKey - GOV.UK Notify API key for authentication
     */
    constructor(apiKey: string);

    /**
     * Sends an email notification using a template.
     *
     * @param {string} templateId - The UUID of the email template
     * @param {string} emailAddress - Recipient email address
     * @param {object} options - Email configuration options
     * @param {object} options.personalisation - Template variable substitutions
     * @param {string} options.reference - Unique reference for tracking
     * @param {string} [options.emailReplyToId] - Optional reply-to email address ID
     * @returns {Promise<unknown>} Response from the Notify API
     */
    sendEmail(
      templateId: string,
      emailAddress: string,
      options: {
        personalisation: object;
        reference: string;
        emailReplyToId?: string;
      },
    ): Promise<unknown>;

    /**
     * Retrieves a notification by its ID.
     *
     * @param {string} notificationId - The UUID of the notification
     * @returns {Promise<unknown>} Notification details
     */
    getNotificationById(notificationId: string): Promise<unknown>;

    /**
     * Retrieves a list of notifications with optional filters.
     *
     * @param {string} [templateType] - Filter by template type (e.g., 'email', 'sms')
     * @param {string} [status] - Filter by notification status
     * @param {string} [reference] - Filter by reference identifier
     * @param {string} [olderThanId] - Return notifications older than this ID
     * @returns {Promise<unknown>} List of notifications
     */
    getNotifications(
      templateType?: string,
      status?: string,
      reference?: string,
      olderThanId?: string,
    ): Promise<unknown>;

    /**
     * Retrieves a template by its ID.
     *
     * @param {string} templateId - The UUID of the template
     * @returns {Promise<unknown>} Template details
     */
    getTemplateById(templateId: string): Promise<unknown>;

    /**
     * Retrieves a specific version of a template.
     *
     * @param {string} templateId - The UUID of the template
     * @param {number} version - The version number of the template
     * @returns {Promise<unknown>} Template details for the specified version
     */
    getTemplateByIdAndVersion(
      templateId: string,
      version: number,
    ): Promise<unknown>;

    /**
     * Retrieves all templates, optionally filtered by type.
     *
     * @param {string} [templateType] - Filter by template type (e.g., 'email', 'sms')
     * @returns {Promise<unknown>} List of templates
     */
    getAllTemplates(templateType?: string): Promise<unknown>;

    /**
     * Previews a template with personalisation applied.
     *
     * @param {string} templateId - The UUID of the template
     * @param {unknown} [personalisation] - Template variable substitutions
     * @returns {Promise<unknown>} Preview of the rendered template
     */
    previewTemplateById(
      templateId: string,
      personalisation?: unknown,
    ): Promise<unknown>;

    /**
     * Configures proxy settings for API requests.
     *
     * @param {unknown} proxyConfig - Proxy configuration object
     * @returns {void}
     */
    setProxy(proxyConfig: unknown): void;
  }

  export = {
    NotifyClient,
  };

  /**
   * Options for sending notifications via GOV.UK Notify.
   *
   * Configuration interface for email and SMS notification operations,
   * including template personalisation and tracking references.
   *
   * @property {unknown} [personalisation] - Key-value pairs for template variables
   * @property {string} [reference] - Unique reference identifier for tracking
   * @property {string} [emailReplyToId] - Reply-to email address ID for emails
   * @property {string} [smsSenderId] - Sender ID for SMS notifications
   */
  export interface NotificationSendOptions {
    personalisation?: unknown;
    reference?: string;
    emailReplyToId?: string;
    smsSenderId?: string;
  }
}

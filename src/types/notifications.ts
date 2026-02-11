/**
 * @fileoverview Type definitions for GOV.UK Notify email service.
 *
 * Provides TypeScript interfaces for configuring and sending email notifications
 * through the GOV.UK Notify API service.
 *
 * @module types/notifications
 */

/**
 * Options for sending an email via GOV.UK Notify.
 *
 * Configuration object passed to the Notify client for email operations.
 * Includes template personalisation, tracking reference, and optional reply-to settings.
 *
 * @example
 * ```typescript
 * const emailOptions: EmailOptions = {
 *   personalisation: { name: 'my-repo', date: '2026-02-10' },
 *   reference: 'archive-notification-12345',
 *   emailReplyToId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
 * };
 * ```
 */
export interface EmailOptions {
  /**
   * Key-value pairs for template variable substitutions.
   * All values must be strings as required by the GOV.UK Notify API.
   */
  personalisation: Record<string, string>;

  /**
   * Unique reference identifier for tracking the notification.
   * Used for audit trails and debugging purposes.
   */
  reference: string;

  /**
   * Optional GOV.UK Notify reply-to email address identifier.
   * When provided, replies to the notification email will be sent to this address.
   */
  emailReplyToId?: string;
}

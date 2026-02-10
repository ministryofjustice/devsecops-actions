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
 * @property {Record<string, string>} personalisation - Key-value pairs for template variable substitutions
 * @property {string} reference - Unique reference identifier for tracking the notification
 * @property {string} [emailReplyToId] - Optional GOV.UK Notify reply-to email address ID
 *
 * @example
 * ```typescript
 * const emailOptions: EmailOptions = {
 *   personalisation: { name: 'my-repo', date: new Date() },
 *   reference: 'archive-notification-12345',
 *   emailReplyToId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
 * };
 * ```
 */
export interface EmailOptions {
  personalisation: Record<string, string>;
  reference: string;
  emailReplyToId?: string;
}

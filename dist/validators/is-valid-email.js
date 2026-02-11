"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks whether the provided string is a syntactically valid email address.
 *
 * Trims leading and trailing whitespace from the input and validates the result
 * against a basic email pattern using regular expressions.
 *
 * @param email - The email address string to validate
 * @returns `true` if the trimmed input matches the email pattern; `false` otherwise
 *
 * @example
 * ```typescript
 * const valid = isValidEmail('user@example.gov.uk');
 * // Returns: true
 *
 * const invalid = isValidEmail('not-an-email');
 * // Returns: false
 *
 * const withSpaces = isValidEmail('  user@example.gov.uk  ');
 * // Returns: true (whitespace is trimmed)
 * ```
 *
 * @remarks
 * This function uses a basic email validation pattern and may not catch all
 * invalid email formats. For production use, consider more robust validation.
 */
const isValidEmail = (email) => {
    const trimmed = email?.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
        return false;
    }
    return regex.test(trimmed);
};
exports.default = isValidEmail;

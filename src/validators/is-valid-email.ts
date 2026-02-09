/**
 * Checks whether the provided string is a syntactically valid email address.
 *
 * Trims leading and trailing whitespace and validates the result against
 * a basic email pattern.
 *
 * @param email - The email address to validate
 * @returns `true` if the trimmed input matches the email pattern; otherwise `false`
 *
 * @example
 * ```typescript
 * const valid = isValidEmail('user@example.gov.uk');
 * // Returns: true
 * ```
 */
const isValidEmail = (email: string): boolean => {
  const trimmed = email?.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) {
    return false;
  }

  return regex.test(trimmed);
};

export default isValidEmail;

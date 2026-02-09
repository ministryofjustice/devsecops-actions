/**
 * Removes all occurrences of double hyphens from the provided argument string.
 *
 * Used to clean CLI argument flags by stripping the `--` prefix.
 *
 * @param arg - The argument string to sanitise
 * @returns The sanitised argument with all `--` substrings removed
 *
 * @example
 * ```typescript
 * const clean = sanitiseArgumentProperty('--images');
 * // Returns: 'images'
 * ```
 */
const sanitiseArgumentProperty = (arg: string = ""): string =>
  arg.replaceAll("--", "");

export default sanitiseArgumentProperty;

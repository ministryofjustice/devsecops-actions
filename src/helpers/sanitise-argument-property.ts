/**
 * @fileoverview Sanitises CLI argument properties by removing double hyphens.
 *
 * @module helpers/sanitise-argument-property
 */

/**
 * Removes all occurrences of double hyphens from the provided argument string.
 *
 * Used to clean CLI argument flags by stripping the `--` prefix, typically for
 * converting command-line flags into property names.
 *
 * @param arg - The argument string to sanitise (defaults to empty string if not provided)
 * @returns The sanitised argument with all `--` substrings removed
 *
 * @example
 * ```typescript
 * const clean = sanitiseArgumentProperty('--images');
 * // Returns: 'images'
 *
 * const alreadyClean = sanitiseArgumentProperty('images');
 * // Returns: 'images'
 *
 * const empty = sanitiseArgumentProperty();
 * // Returns: ''
 * ```
 */
const sanitiseArgumentProperty = (arg: string = ""): string =>
  arg.replaceAll("--", "");

export default sanitiseArgumentProperty;

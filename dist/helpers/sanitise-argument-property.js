"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const sanitiseArgumentProperty = (arg = "") => arg.replaceAll("--", "");
exports.default = sanitiseArgumentProperty;

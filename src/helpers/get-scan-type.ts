import sanitiseArgumentProperty from "./sanitise-argument-property";

/**
 * Determines the scan type based on the first CLI argument.
 *
 * Extracts the scan type from the first argument by removing any leading `--` prefix
 * using the `sanitiseArgumentProperty` helper function.
 *
 * @param args - The list of CLI arguments
 * @returns The scan type derived from the first argument with leading `--` removed, or an empty string if the array is empty
 *
 * @example
 * ```typescript
 * const type = getScanType(['--images', 'config.json']);
 * // Returns: 'images'
 *
 * const emptyType = getScanType([]);
 * // Returns: ''
 * ```
 */
const getScanType = (args: Array<string>): string =>
  args[0] ? sanitiseArgumentProperty(args[0]) : "";

export default getScanType;

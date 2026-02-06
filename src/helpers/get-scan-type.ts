/**
 * Determines the scan type based on the first CLI argument.
 *
 * Extracts the scan type from the first argument by removing any leading `--` prefix.
 *
 * @param args - The list of CLI arguments
 * @returns The scan type derived from the first argument with any leading `--` removed, or an empty string if no arguments are provided
 *
 * @example
 * ```typescript
 * const type = getScanType(['--images', 'config.json']);
 * // Returns: 'images'
 * ```
 */
const getScanType = (args: Array<string>): string => {
  if (args[0]) {
    return args[0].replace("--", "");
  }

  return "";
};

export default getScanType;

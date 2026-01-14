import {
  getArguments,
  validateArguments,
  getArrayFromJson,
  execute,
} from "../helpers/index.ts";

/**
 * Scans the provided source based on the specified type.
 *
 * This function processes command-line arguments to perform a scan operation.
 * It validates the arguments, checks if the source is valid JSON, and executes
 * the scan based on the specified type.
 *
 * @throws {TypeError} When invalid arguments are provided. The error message
 * includes usage instructions for the scan command.
 * @throws {Error} When scanning fails due to any error during execution.
 *
 * @example
 * ```bash
 * # Command-line usage
 * scan --images source.json
 * ```
 *
 * @remarks
 * Expected arguments format:
 * - First argument: `--images` (scan type)
 * - Second argument: Path to a JSON file containing the source data
 *
 * The function will log errors to the console before throwing an exception
 * if any part of the scanning process fails.
 */

export const scan = async (): Promise<void | TypeError> => {
  try {
    const args = getArguments();
    const valid = validateArguments(args);

    if (!valid) {
      throw new TypeError(
        "Invalid arguments provided.\n\rFirst argument: --images\n\rSecond argument: Source JSON\n\r\n\rUsage: scan <type> <source>\n\rUsage: scan --images source.json\n\r"
      );
    }

    const values = getArrayFromJson(args);
    const type = args[0];

    await execute(type, values);
  } catch (error) {
    console.error("❌ An error has occurred during execution %s", error);
    throw new TypeError(`Scanning failed: ${error}`);
  }
};

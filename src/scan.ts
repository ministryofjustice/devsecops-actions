import {
  getArguments,
  validateArguments,
  isValidJson,
  execute,
} from "./helpers";

try {
  const args = getArguments();
  /**
   * Validates the scan arguments to ensure all required parameters are present and correctly formatted.
   * @param args - The scan arguments object containing configuration for the security scan
   * @returns A boolean indicating whether the arguments are valid (true) or invalid (false)
   */
  const valid = validateArguments(args);

  if (!valid) {
    throw new TypeError(
      "Invalid arguments provided.\n\rFirst argument: --images\n\rSecond argument: Source JSON\n\r\n\rUsage: scan <type> <source>\n\rUsage: scan --images source.json\n\r"
    );
  }

  const values = isValidJson(args);
  const type = args[0];

  execute(type, values);
} catch (error) {
  console.error("❌ An error has occurred during execution %s", error);
  process.exitCode = 1;
}

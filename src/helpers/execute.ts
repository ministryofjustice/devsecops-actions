import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getCommand } from "./get-command.ts";

/**
 * Executes a command for each value in the provided array and reports the results.
 *
 * @param type - The type of command to execute, used to determine the command via getCommand()
 * @param values - An array of string values (e.g., image names) to process
 * @returns A Promise that resolves to void on success, or rejects with a TypeError if any scans fail
 * @throws {TypeError} Throws a TypeError with message "Image scanning failed" if one or more values fail to scan
 *
 * @remarks
 * This function:
 * - Executes commands asynchronously for all values in parallel
 * - Logs success (✅) or failure (❌) for each individual value
 * - Collects all results and reports failed scans at the end
 * - Throws an error if any scans failed, listing all failed values
 *
 * @example
 * ```typescript
 * await execute('scan', ['image1:latest', 'image2:latest']);
 * // Logs: ✅ Successfully scanned image1:latest
 * // Logs: ✅ Successfully scanned image2:latest
 * // Logs: ✅ All 2 images have been successfully scanned.
 * ```
 */

export const execute = async (
  type: string,
  values: Array<string>
): Promise<void | TypeError> => {
  const execAsync = promisify(exec);

  const promises = values.map(async (value) => {
    try {
      const command = getCommand(type, value);

      await execAsync(command);

      console.log("✅ Successfully scanned %s", value);
      return { image: value, success: true };
    } catch (error) {
      console.error(
        "❌ Failed to scan %s with the provided command %o",
        value,
        error
      );
      return { image: value, success: false };
    }
  });

  const results = await Promise.all(promises);

  const failed = results.filter((scan) => !scan.success);

  if (failed.length) {
    console.error(
      "\n\r\n\r❌ %i images did not scan successfully: \n\r",
      failed.length
    );
    failed.forEach(({ image }, index) => {
      console.error("%i. %s", index + 1, image);
    });

    throw new TypeError("Image scanning failed");
  } else {
    console.log(
      "\n\r\n\r✅ All %i images have been successfully scanned.",
      values.length
    );
  }
};

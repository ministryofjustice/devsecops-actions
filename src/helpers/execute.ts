import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getCommand } from "./get-command";

/**
 * Executes scanning commands for multiple values (e.g., container images) in parallel.
 * 
 * @param type - The type of scan to execute, used to determine the appropriate command
 * @param values - An array of values (e.g., image names) to scan
 * 
 * @returns A promise that resolves when all scans are complete
 * 
 * @throws Will exit the process with code 1 if any scans fail
 * 
 * @remarks
 * This function:
 * - Executes scan commands asynchronously for each value in parallel
 * - Logs success or failure for each individual scan
 * - Collects all results and reports overall success or failure
 * - Exits the process if any scans fail, listing all failed items
 * 
 * @example
 * ```typescript
 * await execute('container', ['image1:latest', 'image2:latest']);
 * ```
 */
export const execute = async (type: string, values: Array<string>) => {
  const execAsync = promisify(exec);

  const promises = values.map(async (value) => {
    try {
      const command = getCommand(type, value);

      await execAsync(command);

      console.log("✅ Successfully scanned %s", value);
      return { image: value, success: true };
    } catch (error) {
      console.log("❌ Failed to scan %s with command %s %o", value, error);
      return { image: value, success: false };
    }
  });

  const results = await Promise.all(promises);

  const failed = results.filter((scan) => !scan.success);

  if (failed.length) {
    console.log(
      "\n\r\n\r❌ %i images did not scan successfully: \n\r",
      failed.length
    );
    failed.forEach(({ image }, index) => {
      console.error("%i. %s", index + 1, image);
    });

    process.exit(1);
  } else {
    console.log(
      "\n\r\n\r✅ All %i images have been successfully scanned.",
      values.length
    );
  }
};

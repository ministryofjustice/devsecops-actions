/**
 * @fileoverview Docker image scanning CLI handler.
 *
 * @module cli/scans/docker
 */

import { areImageArgumentsValid } from "../../validators";
import { getArrayFromJson, scanImages } from "../../services";

/**
 * Parses and validates CLI arguments for Docker image scanning, then executes the scan.
 *
 * Validates that the provided arguments point to a valid JSON file containing Docker image URIs,
 * then performs SBOM generation for each image using Syft.
 *
 * @param args - CLI arguments array with two elements:
 *   - `args[0]`: The scan type flag (e.g., `'--images'`)
 *   - `args[1]`: The path to the JSON source file
 * @returns A promise that resolves when all scans have completed successfully
 * @throws {TypeError} If the provided arguments are invalid, the file does not exist, or scanning fails
 *
 * @example
 * ```typescript
 * await docker(['--images', './images.json']);
 * // Logs: ⚡️ Docker images scanning
 * // Logs: ✅ Successfully scanned nginx:latest
 * // Logs: ✅ All 1 images have been successfully scanned.
 * ```
 */
const docker = async (args: Array<string>): Promise<void> => {
  const valid = areImageArgumentsValid(args);

  if (!valid) {
    throw new TypeError(
      "Invalid arguments provided.\n\r\n\rUsage: scan --images <source>",
    );
  }

  console.info("⚡️ Docker images scanning");

  const values = getArrayFromJson(args);

  await scanImages(values);
};

export default docker;

import { SCAN } from "../constants";

import { getArguments, getScanType } from "../helpers/index";
import { docker, github } from "./scans";

/**
 * Executes a scan based on CLI arguments, delegating to the appropriate scan handler.
 *
 * Parses command-line arguments to determine the scan type (Docker or GitHub) and
 * invokes the corresponding scanner implementation.
 *
 * @returns A promise that resolves when the scan completes
 * @throws {TypeError} When the scan fails or an invalid scan type is supplied
 *
 * @example
 * ```typescript
 * // For Docker scanning: node scan.js --images ./images.json
 * // For GitHub scanning: node scan.js --github --archive --days 90 --email user@gov.uk --key key123 --template-id 123 --repository-name repository
 * await scan();
 * ```
 */
const scan = async (): Promise<void> => {
  try {
    const args = getArguments();
    const type = getScanType(args);

    switch (type) {
      case SCAN.DOCKER:
        await docker(args);
        break;
      case SCAN.GITHUB:
        await github(args);
        break;
      default:
        throw new TypeError("Invalid scan type argument supplied");
    }
  } catch (error) {
    console.error("❌ An error has occurred during execution %s", error);
    throw new TypeError(`Scanning failed: ${error}`);
  }
};

export default scan;

import { SCAN } from "../constants";

import { getArguments, getScanType } from "../helpers/index";
import { docker, github } from "./scans";

/**
 * Executes a scan based on CLI arguments, delegating to the appropriate scan handler.
 *
 * Parses command-line arguments to determine the scan type (Docker or GitHub) and
 * invokes the corresponding scanner implementation. Supported scan types are defined
 * in the `SCAN` constant.
 *
 * @returns A promise that resolves when the scan completes successfully
 * @throws {TypeError} When the scan fails or an invalid scan type is supplied
 *
 * @example
 * ```typescript
 * // For Docker image scanning:
 * // Command: node dist/index.js --images ./images.json
 * await scan();
 *
 * // For GitHub repository archival scanning:
 * // Command: node dist/index.js --github archive --days 90 --email user@gov.uk
 * //          --key api-key --template-id template-123 --repository-name my-repo
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

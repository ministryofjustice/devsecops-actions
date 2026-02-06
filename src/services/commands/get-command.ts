import { resolve } from "node:path";
import { SCAN, GITHUB_SCANS } from "../../constants";
import { sanitiseArgumentProperty } from "../../helpers";

/**
 * Builds a shell command string based on the provided scan type and value.
 *
 * Generates the appropriate CLI command for Docker image scanning using Syft or
 * GitHub repository analysis using git commands.
 *
 * @param type - The scan type used to determine which command to generate
 * @param value - Optional value used by certain scan types (e.g., Docker image tag)
 * @returns The command string for the requested scan type, or an empty string if unsupported
 *
 * @example
 * ```typescript
 * const cmd = getCommand('images', 'nginx:latest');
 * // Returns: 'syft scan nginx:latest --source-name nginx:latest ...'
 * ```
 */
const getCommand = (type: string, value: string = ""): string => {
  const source = sanitiseArgumentProperty(type);
  const sbom = resolve(process.cwd(), "sca", "sbom");
  const image = value.split(":");

  switch (source) {
    case SCAN.DOCKER:
      return `syft scan ${value} --config ${sbom}/config.yml --source-name "${image[0]}" --source-version "${image[1]}" --output cyclonedx-json=sca-sbom-${image[1]}.cdx.json`;
    case GITHUB_SCANS.ARCHIVE:
      return "git log -1 --format=%ct";
    default:
      return "";
  }
};

export default getCommand;

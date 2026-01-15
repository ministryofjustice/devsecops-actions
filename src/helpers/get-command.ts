import { resolve } from "node:path";

/**
 * Generates a command string for scanning based on the provided type and value.
 *
 * @param type - The type of scan to perform (e.g., "--images"). The "--" prefix is removed during processing.
 * @param value - The value to scan. For image scans, this should be in the format "name:version".
 *
 * @returns A command string for executing the scan with syft, or an empty string if the type is not supported.
 *
 * @example
 * ```typescript
 * const cmd = getCommand("--images", "myapp:1.0.0");
 * // Returns: 'syft scan myapp:1.0.0 --source-name myapp:1.0.0 --config .../SBOM/config.yml --source-name "myapp" --source-version "1.0.0" --output cyclonedx-json=sca-sbom-1.0.0.cdx.json'
 * ```
 */

export const getCommand = (type: string, value: string): string => {
  const source = type.replace("--", "");
  const sbom = resolve(process.cwd(), "sca", "sbom");
  const image = value.split(":");

  switch (source) {
    case "images":
      return `syft scan ${value} --source-name ${value} --config ${sbom}/config.yml --source-name "${image[0]}" --source-version "${image[1]}" --output cyclonedx-json=sca-sbom-${image[1]}.cdx.json`;
    default:
      return "";
  }
};

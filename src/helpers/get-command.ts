import { resolve } from "node:path";

/**
 * Generates a command string for scanning software components based on the specified type.
 *
 * @param type - The type of scan source (e.g., "--images"). The "--" prefix will be removed during processing.
 * @param value - The value to be scanned. For image types, this should be in the format "name:version".
 * @returns A string containing the syft scan command with appropriate parameters for the specified type,
 *          or an empty string if the type is not recognized.
 *
 * @example
 * ```typescript
 * const command = getCommand("--images", "nginx:latest");
 * // Returns: syft scan nginx:latest --source-name nginx:latest --config .../SBOM/config.yml
 * //          --source-name "nginx" --source-version "latest" --output cyclonedx-json=sca-sbom-[random].cdx.json
 * ```
 */

export const getCommand = (type: string, value: string): string => {
  const source = type.replace("--", "");
  const sbom = resolve(__dirname, "..", "..", "sca", "steps", "SBOM");
  const image = value.split(":");

  switch (source) {
    case "images":
      return `syft scan ${value} --source-name ${value} --config ${sbom}/config.yml --source-name "${
        image[0]
      }" --source-version "${
        image[1]
      }" --output cyclonedx-json=sca-sbom-${Math.random()}.cdx.json`;
    default:
      return "";
  }
};

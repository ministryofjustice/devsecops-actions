"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
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
const getCommand = (type, value = "") => {
    const source = (0, helpers_1.sanitiseArgumentProperty)(type);
    const sbom = (0, node_path_1.resolve)(process.cwd(), "sca", "sbom");
    const image = value.split(":");
    switch (source) {
        case constants_1.SCAN.DOCKER:
            return `syft scan ${value} --config ${sbom}/config.yml --source-name "${image[0]}" --source-version "${image[1]}" --output cyclonedx-json=sca-sbom-${image[1]}.cdx.json`;
        case constants_1.GITHUB_SCANS.ARCHIVE:
            return "git log -1 --format=%ct";
        default:
            return "";
    }
};
exports.default = getCommand;
//# sourceMappingURL=get-command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../validators");
const services_1 = require("../../services");
/**
 * Parses and validates CLI arguments for a Docker scan, then executes the scan with
 * the resolved type and values.
 *
 * Validates that the provided arguments point to a valid JSON file containing image tags,
 * then performs SBOM generation for each image using Syft.
 *
 * @param args - CLI arguments where the first element is the scan type (e.g., `--images`)
 * and the second element is the path to the JSON source file
 * @returns A promise that resolves when the scan has completed
 * @throws {TypeError} If the provided arguments are invalid or the file does not exist
 *
 * @example
 * ```typescript
 * await docker(['--images', './images.json']);
 * // Logs: ⚡️ Docker images scanning
 * // Logs: ✅ Successfully scanned nginx:latest
 * ```
 */
const docker = async (args) => {
    const valid = (0, validators_1.areImageArgumentsValid)(args);
    if (!valid) {
        throw new TypeError("Invalid arguments provided.\n\r\n\rUsage: scan --images <source>");
    }
    console.info("⚡️ Docker images scanning");
    const values = (0, services_1.getArrayFromJson)(args);
    await (0, services_1.scanImages)(values);
};
exports.default = docker;

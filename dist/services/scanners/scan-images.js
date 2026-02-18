"use strict";
/**
 * @fileoverview Docker image scanner using Syft for SBOM generation.
 *
 * @module services/scanners/scan-images
 */
Object.defineProperty(exports, "__esModule", { value: true });
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const node_path_1 = require("node:path");
/**
 * Executes a scanning command for each Docker image in the provided array and reports the results.
 *
 * Processes all images in parallel using Syft to generate CycloneDX SBOM files.
 * Collects results for successful and failed scans, logging individual outcomes.
 * Throws an error if any scans fail.
 *
 * @param values - An array of Docker image URIs with tags (e.g., `['nginx:latest', 'alpine:3.18']`)
 * @returns A promise that resolves when all scans complete successfully
 * @throws {TypeError} If one or more images fail to scan successfully
 *
 * @example
 * ```typescript
 * await scanImages(['nginx:latest', 'alpine:3.18']);
 * // Logs: ✅ Successfully scanned nginx:latest
 * // Logs: ✅ Successfully scanned alpine:3.18
 * // Logs: ✅ All 2 images have been successfully scanned.
 * ```
 */
const scanImages = async (values) => {
    const execAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
    const promises = values.map(async (value) => {
        try {
            const sbom = (0, node_path_1.resolve)(process.cwd(), "sca", "sbom");
            const image = value.split(":");
            const epoch = Date.now();
            const command = "syft";
            const argument = [
                "scan",
                value,
                "--config",
                `${sbom}/config.yml`,
                "--source-name",
                image[0],
                "--source-version",
                image[1],
                "--output",
                `cyclonedx-json=sca-sbom-${image[1]}-${epoch}.cdx.json`,
            ];
            await execAsync(command, argument, {
                encoding: "utf8",
            });
            console.info("✅ Successfully scanned %s", value);
            return { image: value, success: true };
        }
        catch (error) {
            console.error("❌ Failed to scan %s with the provided command %o", value, error);
            return { image: value, success: false };
        }
    });
    const results = await Promise.all(promises);
    const failed = results.filter((scan) => !scan.success);
    if (failed.length) {
        console.error("\n\r\n\r❌ %i images did not scan successfully: \n\r", failed.length);
        failed.forEach(({ image }, index) => {
            console.error("%i. %s", index + 1, image);
        });
        throw new TypeError("Image scanning failed");
    }
    else {
        console.info("\n\r\n\r✅ All %i images have been successfully scanned.", values.length);
    }
};
exports.default = scanImages;

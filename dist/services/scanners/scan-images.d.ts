/**
 * Executes a scanning command for each Docker image in the provided array and reports the results.
 *
 * Processes all images in parallel, collecting results for successful and failed scans.
 * Logs individual scan outcomes and throws an error if any scans fail.
 *
 * @param values - An array of string values (e.g., Docker image names with tags) to process
 * @returns A promise that resolves to void on success, or rejects with a TypeError if any scans fail
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
declare const scanImages: (values: Array<string>) => Promise<void>;
export default scanImages;
//# sourceMappingURL=scan-images.d.ts.map
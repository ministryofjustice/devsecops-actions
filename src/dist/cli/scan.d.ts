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
declare const scan: () => Promise<void>;
export default scan;
//# sourceMappingURL=scan.d.ts.map
/**
 * Processes GitHub scan CLI arguments and initiates the appropriate GitHub scan operation.
 *
 * Validates the provided arguments and delegates to the specific scan handler based on
 * the scan type (e.g., archive scanning).
 *
 * @param args - CLI arguments containing scan type, days threshold, email, and API key
 * @returns A promise that resolves when the scan completes
 * @throws {TypeError} If the provided arguments are invalid or missing required values
 *
 * @example
 * ```typescript
 * await github(['--github', '--archive', '--days', '90', '--email', 'team@example.gov.uk', '--key', 'api-key', '--template-id', '123', '--repository-name', 'repository']);
 * // Initiates GitHub repository archival scanning
 * ```
 */
declare const github: (args: Array<string>) => Promise<void>;
export default github;
//# sourceMappingURL=github.d.ts.map
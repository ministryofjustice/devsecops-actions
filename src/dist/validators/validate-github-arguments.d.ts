/**
 * Validates GitHub CLI-style arguments for scan type, days threshold, email, and API key.
 *
 * Ensures that the scan type is valid, days is a positive number, email is properly formatted,
 * and the API key is present.
 *
 * @param args - Argument list where type is at index 1, days at index 3, email at index 5, and key at index 7
 * @returns `true` when all arguments are valid; otherwise `false`
 *
 * @example
 * ```typescript
 * const valid = areGitHubArgumentsValid(['--github', 'archive', '--days', '90', '--email', 'test@gov.uk', '--key', 'key123', '--template-id', '123', '--repository-name', 'test']);
 * // Returns: true
 * ```
 */
declare const areGitHubArgumentsValid: (args: Array<string>) => boolean;
export default areGitHubArgumentsValid;
//# sourceMappingURL=validate-github-arguments.d.ts.map
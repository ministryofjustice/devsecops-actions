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
declare const getCommand: (type: string, value?: string) => string;
export default getCommand;
//# sourceMappingURL=get-command.d.ts.map
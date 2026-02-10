/**
 * Executes a command for each value in the provided array and reports the results.
 *
 * @param type - The type of command to execute, used to determine the command via getCommand()
 * @param values - An array of string values (e.g., image names) to process
 * @returns A Promise that resolves to void on success, or rejects with a TypeError if any scans fail
 * @throws {TypeError} Throws a TypeError with message "Image scanning failed" if one or more values fail to scan
 *
 * @remarks
 * This function:
 * - Executes commands asynchronously for all values in parallel
 * - Logs success (✅) or failure (❌) for each individual value
 * - Collects all results and reports failed scans at the end
 * - Throws an error if any scans failed, listing all failed values
 *
 * @example
 * ```typescript
 * await execute('scan', ['image1:latest', 'image2:latest']);
 * // Logs: ✅ Successfully scanned image1:latest
 * // Logs: ✅ Successfully scanned image2:latest
 * // Logs: ✅ All 2 images have been successfully scanned.
 * ```
 */
declare const execute: (type: string, values: Array<string>) => Promise<void | TypeError>;
export default execute;
//# sourceMappingURL=execute.d.ts.map
/**
 * Main entry point for the DevSecOps actions CLI tool.
 * 
 * Executes the scan command and handles any errors that occur during execution.
 * If an error is encountered, it logs the error details and exits the process with
 * a non-zero status code.
 * 
 * @throws {Error} Exits the process with code 1 if the scan operation fails
 */
import { scan } from "./cli/index.ts";

try {
  await scan();
} catch (error) {
  console.error("❌ CLI execution failure %o", error);
  process.exit(1);
}

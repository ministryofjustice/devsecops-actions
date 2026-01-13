/**
 * Entry point for the DevSecOps actions CLI.
 * 
 * Executes the scan command and handles any errors that occur during execution.
 * If an error occurs, it logs the error details and exits the process with a non-zero status code.
 * 
 * @remarks
 * This module serves as the main entry point for the CLI tool. It wraps the scan
 * function call in a try-catch block to ensure proper error handling and logging.
 * 
 * @throws {Error} Catches and logs any errors thrown during the scan execution
 * @process Exits with code 1 if an error occurs during scan execution
 */

import { scan } from "./cli";

try {
  scan();
} catch (error) {
  console.error("❌ CLI execution failure %o", error);
  process.exit(1);
}

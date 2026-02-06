/**
 * @fileoverview Main entry point for the DevSecOps CLI scanner application.
 *
 * Runs the CLI scan entry point and exits the process with a non-zero code on failure.
 * Uses IIFE (Immediately Invoked Function Expression) pattern for async execution.
 *
 * @module index
 */
import scan from "./cli/index";

(async () => {
  try {
    await scan();
  } catch (error) {
    console.error("❌ CLI execution failure %o", error);
    process.exit(1);
  }
})();

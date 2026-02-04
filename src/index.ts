/**
 * Runs the CLI scan entry point and exits the process with a non-zero code on failure.
 * Uses IIFE pattern.
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

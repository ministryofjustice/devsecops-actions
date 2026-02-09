/**
 * @fileoverview Type constants for scan operations and GitHub-specific scans.
 *
 * @module constants/types
 */

/**
 * Scan type constants for supported scan operations.
 *
 * Defines the available top-level scan types that can be invoked via CLI.
 */
const SCAN = {
  DOCKER: "images",
  GITHUB: "github",
};

/**
 * GitHub-specific scan type constants.
 *
 * Defines the available GitHub repository scan operations.
 */
const GITHUB_SCANS = {
  ARCHIVE: "archive",
};

const SOURCES_FILE_EXTENSION = {
  JSON: ".json",
};

export { SCAN, GITHUB_SCANS, SOURCES_FILE_EXTENSION };
